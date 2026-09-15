package com.bambardara.demo.rbac.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bambardara.demo.auth.entity.User;
import com.bambardara.demo.auth.entity.UserStatus;
import com.bambardara.demo.rbac.dto.CreateSuperAdminUserRequest;
import com.bambardara.demo.rbac.dto.SuperAdminUserResponse;
import com.bambardara.demo.rbac.dto.UpdateSuperAdminUserRequest;
import com.bambardara.demo.rbac.dto.UpdateUserStatusRequest;
import com.bambardara.demo.rbac.service.SuperAdminUserService;

import jakarta.validation.Valid;

/**
 * User management for the SUPER_ADMIN dashboard: create users, assign
 * Bambardara business roles, enable/disable accounts. Identity/credentials
 * stay entirely Keycloak's responsibility - see SuperAdminUserService.
 */
@RestController
@RequestMapping("/api/super-admin/users")
@PreAuthorize("hasRole('SUPER_ADMIN')")
public class SuperAdminUserController {

    private final SuperAdminUserService userService;

    public SuperAdminUserController(SuperAdminUserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<Page<SuperAdminUserResponse>> getUsers(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        int safeSize = (size < 1 || size > 100) ? 20 : size;
        int safePage = Math.max(page, 0);

        Pageable pageable = PageRequest.of(safePage, safeSize, Sort.by(Sort.Direction.DESC, "id"));

        return ResponseEntity.ok(userService.getAllUsers(search, role, status, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SuperAdminUserResponse> getUser(@PathVariable Integer id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PostMapping
    public ResponseEntity<SuperAdminUserResponse> createUser(
            @AuthenticationPrincipal User actor,
            @Valid @RequestBody CreateSuperAdminUserRequest request) {

        SuperAdminUserResponse response = userService.createUser(actor, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SuperAdminUserResponse> updateUser(
            @AuthenticationPrincipal User actor,
            @PathVariable Integer id,
            @Valid @RequestBody UpdateSuperAdminUserRequest request) {

        return ResponseEntity.ok(userService.updateUser(actor, id, request));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<SuperAdminUserResponse> updateStatus(
            @AuthenticationPrincipal User actor,
            @PathVariable Integer id,
            @Valid @RequestBody UpdateUserStatusRequest request) {

        UserStatus status = UserStatus.valueOf(request.getStatus());
        return ResponseEntity.ok(userService.updateStatus(actor, id, status));
    }
}
