package com.bambardara.demo.rbac.service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bambardara.demo.auth.entity.User;
import com.bambardara.demo.rbac.entity.Role;
import com.bambardara.demo.rbac.repository.RoleModuleRepository;
import com.bambardara.demo.rbac.repository.RolePermissionRepository;

/**
 * The single source of truth for "what is this user allowed to do" under
 * the dynamic RBAC model: resolves a user's Bambardara business role to its
 * enabled modules and granted permissions.
 *
 * Consumed by {@code GET /api/me/access} (read) and available as the
 * {@code authz} bean for {@code @PreAuthorize("@authz.hasPermission(...)")}
 * checks on future controllers (write - see {@link #hasPermission}).
 * A user with no business role assigned has no modules and no permissions.
 */
@Service("authz")
public class AuthorizationService {

    private final RoleModuleRepository roleModuleRepository;
    private final RolePermissionRepository rolePermissionRepository;

    public AuthorizationService(
            RoleModuleRepository roleModuleRepository,
            RolePermissionRepository rolePermissionRepository) {

        this.roleModuleRepository = roleModuleRepository;
        this.rolePermissionRepository = rolePermissionRepository;
    }

    @Transactional(readOnly = true)
    public List<String> getEnabledModuleCodes(User user) {

        Role role = user.getBusinessRole();

        if (role == null) {
            return List.of();
        }

        return roleModuleRepository.findByRoleIdAndEnabledTrue(role.getId()).stream()
                .map(rm -> rm.getModule().getCode())
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<String> getPermissionCodes(User user) {

        Role role = user.getBusinessRole();

        if (role == null) {
            return List.of();
        }

        return rolePermissionRepository.findByRoleId(role.getId()).stream()
                .map(rp -> rp.getPermission().getCode())
                .collect(Collectors.toList());
    }

    /**
     * @return true if {@code user} currently holds {@code permissionCode}
     *         via their assigned business role. Intended for
     *         {@code @PreAuthorize("@authz.hasPermission(#user, 'FINANCE_VIEW')")}
     *         style checks on future module controllers.
     */
    @Transactional(readOnly = true)
    public boolean hasPermission(User user, String permissionCode) {

        if (user == null || permissionCode == null) {
            return false;
        }

        Set<String> granted = Set.copyOf(getPermissionCodes(user));
        return granted.contains(permissionCode);
    }

    /**
     * @return true if {@code user}'s role has {@code moduleCode} enabled.
     */
    @Transactional(readOnly = true)
    public boolean hasModule(User user, String moduleCode) {

        if (user == null || moduleCode == null) {
            return false;
        }

        Set<String> enabled = Set.copyOf(getEnabledModuleCodes(user));
        return enabled.contains(moduleCode);
    }
}
