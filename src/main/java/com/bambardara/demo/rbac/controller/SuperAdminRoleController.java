package com.bambardara.demo.rbac.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bambardara.demo.auth.entity.User;
import com.bambardara.demo.rbac.dto.CreateRoleRequest;
import com.bambardara.demo.rbac.dto.PermissionResponse;
import com.bambardara.demo.rbac.dto.RoleModuleResponse;
import com.bambardara.demo.rbac.dto.RoleModulesUpdateRequest;
import com.bambardara.demo.rbac.dto.RolePermissionsUpdateRequest;
import com.bambardara.demo.rbac.dto.RoleResponse;
import com.bambardara.demo.rbac.dto.UpdateRoleRequest;
import com.bambardara.demo.rbac.service.RoleAccessService;
import com.bambardara.demo.rbac.service.RoleService;

import jakarta.validation.Valid;

/**
 * Role, role-module-access and role-permission management for the SUPER_ADMIN
 * dashboard. Enforced both at SecurityConfig's {@code /api/super-admin/**}
 * matcher and here via {@code @PreAuthorize}, same defense-in-depth
 * convention as {@code AdminUserController}/{@code CeoDashboardController}.
 */
@RestController
@RequestMapping("/api/super-admin/roles")
@PreAuthorize("hasRole('SUPER_ADMIN')")
public class SuperAdminRoleController {

    private final RoleService roleService;
    private final RoleAccessService roleAccessService;

    public SuperAdminRoleController(RoleService roleService, RoleAccessService roleAccessService) {
        this.roleService = roleService;
        this.roleAccessService = roleAccessService;
    }

    @GetMapping
    public ResponseEntity<List<RoleResponse>> getRoles() {
        return ResponseEntity.ok(roleService.getAllRoles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoleResponse> getRole(@PathVariable Integer id) {
        return ResponseEntity.ok(roleService.getRoleById(id));
    }

    @PostMapping
    public ResponseEntity<RoleResponse> createRole(
            @AuthenticationPrincipal User actor,
            @Valid @RequestBody CreateRoleRequest request) {

        RoleResponse response = roleService.createRole(actor, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoleResponse> updateRole(
            @AuthenticationPrincipal User actor,
            @PathVariable Integer id,
            @Valid @RequestBody UpdateRoleRequest request) {

        return ResponseEntity.ok(roleService.updateRole(actor, id, request));
    }

    @GetMapping("/{roleId}/modules")
    public ResponseEntity<List<RoleModuleResponse>> getRoleModules(@PathVariable Integer roleId) {
        return ResponseEntity.ok(roleAccessService.getModuleAccess(roleId));
    }

    @PutMapping("/{roleId}/modules")
    public ResponseEntity<List<RoleModuleResponse>> updateRoleModules(
            @AuthenticationPrincipal User actor,
            @PathVariable Integer roleId,
            @Valid @RequestBody RoleModulesUpdateRequest request) {

        return ResponseEntity.ok(roleAccessService.setModuleAccess(actor, roleId, request.getModules()));
    }

    @GetMapping("/{roleId}/permissions")
    public ResponseEntity<List<PermissionResponse>> getRolePermissions(@PathVariable Integer roleId) {
        return ResponseEntity.ok(roleAccessService.getPermissions(roleId));
    }

    @PutMapping("/{roleId}/permissions")
    public ResponseEntity<List<PermissionResponse>> updateRolePermissions(
            @AuthenticationPrincipal User actor,
            @PathVariable Integer roleId,
            @Valid @RequestBody RolePermissionsUpdateRequest request) {

        return ResponseEntity.ok(roleAccessService.setPermissions(actor, roleId, request.getPermissions()));
    }
}
