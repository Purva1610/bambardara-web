package com.bambardara.demo.rbac.service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bambardara.demo.rbac.dto.ModulePermissionsResponse;
import com.bambardara.demo.rbac.dto.PermissionResponse;
import com.bambardara.demo.rbac.entity.Module;
import com.bambardara.demo.rbac.entity.Permission;
import com.bambardara.demo.rbac.repository.PermissionRepository;

/**
 * Read-only permission catalogue for GET /api/super-admin/permissions.
 * Sourced directly from the {@code permissions} table (every permission
 * that exists in the system) - never derived from what happens to be
 * granted to any one role.
 */
@Service
public class PermissionService {

    private final PermissionRepository permissionRepository;

    public PermissionService(PermissionRepository permissionRepository) {
        this.permissionRepository = permissionRepository;
    }

    /**
     * @return every permission, grouped by its owning module, in module
     *         display-order then permission-code order - ready for the
     *         frontend to render Module -> [View, Create, Edit, ...]
     *         without further sorting/grouping.
     */
    @Transactional(readOnly = true)
    public List<ModulePermissionsResponse> getCatalog() {

        List<Permission> permissions = permissionRepository.findAllByOrderByModule_DisplayOrderAscCodeAsc();

        Map<Integer, ModulePermissionsResponse> byModuleId = new LinkedHashMap<>();

        for (Permission permission : permissions) {

            Module module = permission.getModule();

            ModulePermissionsResponse group = byModuleId.computeIfAbsent(module.getId(), id -> new ModulePermissionsResponse(
                    module.getId(), module.getCode(), module.getName(), new ArrayList<>()));

            group.getPermissions().add(toPermissionResponse(permission));
        }

        return new ArrayList<>(byModuleId.values());
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
