package com.bambardara.demo.rbac.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bambardara.demo.rbac.dto.ModulePermissionsResponse;
import com.bambardara.demo.rbac.service.PermissionService;

/**
 * The permission catalogue - every permission the system knows about,
 * grouped by module. SUPER_ADMIN only, enforced both at SecurityConfig's
 * {@code /api/super-admin/**} matcher and here via {@code @PreAuthorize},
 * same convention as the other Super Admin controllers.
 */
@RestController
@RequestMapping("/api/super-admin/permissions")
@PreAuthorize("hasRole('SUPER_ADMIN')")
public class SuperAdminPermissionController {

    private final PermissionService permissionService;

    public SuperAdminPermissionController(PermissionService permissionService) {
        this.permissionService = permissionService;
    }

    @GetMapping
    public ResponseEntity<List<ModulePermissionsResponse>> getPermissionCatalog() {
        return ResponseEntity.ok(permissionService.getCatalog());
    }
}
