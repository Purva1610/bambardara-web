package com.bambardara.demo.rbac.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bambardara.demo.auth.entity.User;
import com.bambardara.demo.rbac.dto.ModuleToggleItem;
import com.bambardara.demo.rbac.dto.PermissionResponse;
import com.bambardara.demo.rbac.dto.RoleModuleResponse;
import com.bambardara.demo.rbac.entity.Module;
import com.bambardara.demo.rbac.entity.Permission;
import com.bambardara.demo.rbac.entity.Role;
import com.bambardara.demo.rbac.entity.RoleModule;
import com.bambardara.demo.rbac.entity.RolePermission;
import com.bambardara.demo.rbac.repository.ModuleRepository;
import com.bambardara.demo.rbac.repository.PermissionRepository;
import com.bambardara.demo.rbac.repository.RoleModuleRepository;
import com.bambardara.demo.rbac.repository.RolePermissionRepository;

/**
 * Backs the two Super Admin toggle APIs: which modules a role can see, and
 * which permissions a role holds. Every mutating call writes an audit log -
 * this is the actual authorization-management source of truth (a frontend
 * toggle is never itself a security mechanism - see AuthorizationService for
 * the read side other controllers will enforce against).
 */
@Service
public class RoleAccessService {

    private final RoleService roleService;
    private final ModuleService moduleService;
    private final ModuleRepository moduleRepository;
    private final PermissionRepository permissionRepository;
    private final RoleModuleRepository roleModuleRepository;
    private final RolePermissionRepository rolePermissionRepository;
    private final AuditLogService auditLogService;

    public RoleAccessService(
            RoleService roleService,
            ModuleService moduleService,
            ModuleRepository moduleRepository,
            PermissionRepository permissionRepository,
            RoleModuleRepository roleModuleRepository,
            RolePermissionRepository rolePermissionRepository,
            AuditLogService auditLogService) {

        this.roleService = roleService;
        this.moduleService = moduleService;
        this.moduleRepository = moduleRepository;
        this.permissionRepository = permissionRepository;
        this.roleModuleRepository = roleModuleRepository;
        this.rolePermissionRepository = rolePermissionRepository;
        this.auditLogService = auditLogService;
    }

    // ========== Modules ==========

    @Transactional(readOnly = true)
    public List<RoleModuleResponse> getModuleAccess(Integer roleId) {

        Role role = roleService.findByIdOrThrow(roleId);

        Set<Integer> enabledModuleIds = roleModuleRepository.findByRoleId(role.getId()).stream()
                .filter(RoleModule::isEnabled)
                .map(rm -> rm.getModule().getId())
                .collect(Collectors.toSet());

        return moduleRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(module -> new RoleModuleResponse(
                        module.getCode(),
                        module.getName(),
                        enabledModuleIds.contains(module.getId())))
                .collect(Collectors.toList());
    }

    @Transactional
    public List<RoleModuleResponse> setModuleAccess(User actor, Integer roleId, List<ModuleToggleItem> items) {

        Role role = roleService.findByIdOrThrow(roleId);

        Set<String> seenCodes = new HashSet<>();

        for (ModuleToggleItem item : items) {

            if (item.getModuleCode() == null || item.getModuleCode().isBlank()) {
                throw new IllegalArgumentException("moduleCode is required for every entry");
            }

            if (!seenCodes.add(item.getModuleCode())) {
                throw new IllegalArgumentException("Duplicate module entry: " + item.getModuleCode());
            }

            if (item.getEnabled() == null) {
                throw new IllegalArgumentException("enabled is required for module: " + item.getModuleCode());
            }
        }

        for (ModuleToggleItem item : items) {

            Module module = moduleService.findByCodeOrThrow(item.getModuleCode());

            RoleModule roleModule = roleModuleRepository.findByRoleIdAndModuleId(role.getId(), module.getId())
                    .orElseGet(() -> new RoleModule(role, module, false));

            boolean before = roleModule.isEnabled();
            boolean after = item.getEnabled();

            if (before != after) {

                roleModule.setEnabled(after);
                roleModuleRepository.save(roleModule);

                auditLogService.record(actor, "ROLE_MODULE_TOGGLED", "ROLE_MODULE",
                        role.getCode() + ":" + module.getCode(),
                        String.valueOf(before), String.valueOf(after),
                        String.format("%s access to %s changed: %s -> %s",
                                role.getCode(), module.getCode(), before, after));
            }
        }

        return getModuleAccess(roleId);
    }

    // ========== Permissions ==========

    @Transactional(readOnly = true)
    public List<PermissionResponse> getPermissions(Integer roleId) {

        Role role = roleService.findByIdOrThrow(roleId);

        return rolePermissionRepository.findByRoleId(role.getId()).stream()
                .map(RolePermission::getPermission)
                .map(this::toPermissionResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public List<PermissionResponse> setPermissions(User actor, Integer roleId, List<String> permissionCodes) {

        Role role = roleService.findByIdOrThrow(roleId);

        Set<String> requestedCodes = new HashSet<>();
        for (String code : permissionCodes) {

            if (code == null || code.isBlank()) {
                throw new IllegalArgumentException("Permission codes must not be blank");
            }

            if (!requestedCodes.add(code)) {
                throw new IllegalArgumentException("Duplicate permission entry: " + code);
            }
        }

        List<Permission> requestedPermissions = permissionRepository.findByCodeIn(List.copyOf(requestedCodes));

        if (requestedPermissions.size() != requestedCodes.size()) {

            Set<String> found = requestedPermissions.stream().map(Permission::getCode).collect(Collectors.toSet());
            Set<String> unknown = new HashSet<>(requestedCodes);
            unknown.removeAll(found);
            throw new IllegalArgumentException("Unknown permission code(s): " + unknown);
        }

        List<RolePermission> current = rolePermissionRepository.findByRoleId(role.getId());
        Set<String> currentCodes = current.stream()
                .map(rp -> rp.getPermission().getCode())
                .collect(Collectors.toSet());

        // Revoke anything not in the requested set.
        for (RolePermission rp : current) {
            if (!requestedCodes.contains(rp.getPermission().getCode())) {

                rolePermissionRepository.delete(rp);

                auditLogService.record(actor, "ROLE_PERMISSION_REVOKED", "ROLE_PERMISSION",
                        role.getCode() + ":" + rp.getPermission().getCode(),
                        rp.getPermission().getCode(), null,
                        String.format("%s permission revoked: %s", role.getCode(), rp.getPermission().getCode()));
            }
        }

        // Grant anything newly requested.
        for (Permission permission : requestedPermissions) {
            if (!currentCodes.contains(permission.getCode())) {

                rolePermissionRepository.save(new RolePermission(role, permission));

                auditLogService.record(actor, "ROLE_PERMISSION_GRANTED", "ROLE_PERMISSION",
                        role.getCode() + ":" + permission.getCode(),
                        null, permission.getCode(),
                        String.format("%s permission granted: %s", role.getCode(), permission.getCode()));
            }
        }

        return getPermissions(roleId);
    }

    private PermissionResponse toPermissionResponse(Permission permission) {
        return new PermissionResponse(
                permission.getId(),
                permission.getName(),
                permission.getCode(),
                permission.getDescription(),
                permission.getModule().getCode());
    }
}
