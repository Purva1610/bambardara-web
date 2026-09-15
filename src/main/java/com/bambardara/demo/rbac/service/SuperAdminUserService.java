package com.bambardara.demo.rbac.service;

import java.security.SecureRandom;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bambardara.demo.auth.entity.User;
import com.bambardara.demo.auth.entity.UserStatus;
import com.bambardara.demo.auth.exception.EmailAlreadyExistsException;
import com.bambardara.demo.auth.repository.UserRepository;
import com.bambardara.demo.auth.service.KeycloakAdminService;
import com.bambardara.demo.common.exception.ResourceNotFoundException;
import com.bambardara.demo.rbac.dto.CreateSuperAdminUserRequest;
import com.bambardara.demo.rbac.dto.SuperAdminUserResponse;
import com.bambardara.demo.rbac.dto.UpdateSuperAdminUserRequest;
import com.bambardara.demo.rbac.entity.Role;
import com.bambardara.demo.rbac.repository.RoleRepository;
import com.bambardara.demo.rbac.repository.UserSpecifications;

/**
 * User management for /api/super-admin/users/**. Identity/credentials
 * remain entirely Keycloak's responsibility (via {@link KeycloakAdminService},
 * the same mechanism {@code AuthService.register} already uses) - this
 * service never stores a password.
 */
@Service
public class SuperAdminUserService {

    private static final String SUPER_ADMIN_CODE = "SUPER_ADMIN";
    private static final SecureRandom RANDOM = new SecureRandom();

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final KeycloakAdminService keycloakAdminService;
    private final AuditLogService auditLogService;

    public SuperAdminUserService(
            UserRepository userRepository,
            RoleRepository roleRepository,
            KeycloakAdminService keycloakAdminService,
            AuditLogService auditLogService) {

        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.keycloakAdminService = keycloakAdminService;
        this.auditLogService = auditLogService;
    }

    /**
     * @param search   optional case-insensitive substring match against name
     *                 or email
     * @param roleCode optional exact match against the user's business role
     *                 code (e.g. "MD"); a code with no matching users simply
     *                 yields an empty page, not an error
     * @param status   optional "ACTIVE"/"DISABLED" filter; any other
     *                 non-blank value is rejected as a bad request
     * @return a database-filtered, paginated user list - never loads every
     *         user into memory to filter in Java
     */
    @Transactional(readOnly = true)
    public Page<SuperAdminUserResponse> getAllUsers(String search, String roleCode, String status, Pageable pageable) {

        Specification<User> spec = Specification
                .where(UserSpecifications.search(search))
                .and(UserSpecifications.hasRoleCode(roleCode))
                .and(UserSpecifications.hasStatus(parseOptionalStatus(status)));

        return userRepository.findAll(spec, pageable).map(this::toResponse);
    }

    @Transactional(readOnly = true)
    public SuperAdminUserResponse getUserById(Integer id) {
        return toResponse(findByIdOrThrow(id));
    }

    @Transactional
    public SuperAdminUserResponse createUser(User actor, CreateSuperAdminUserRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException();
        }

        Role role = findRoleByCodeOrThrow(request.getRoleCode());

        String password = (request.getTemporaryPassword() != null && !request.getTemporaryPassword().isBlank())
                ? request.getTemporaryPassword()
                : generateTemporaryPassword();

        String keycloakSubject = keycloakAdminService.createUser(request.getEmail(), password, request.getName());

        User user = User.forKeycloakSubject(keycloakSubject, request.getName(), request.getEmail());
        user.setBusinessRole(role);
        user.setStatus(parseStatusOrDefault(request.getStatus()));

        User saved;
        try {
            saved = userRepository.saveAndFlush(user);
        } catch (DataIntegrityViolationException e) {
            // The Keycloak-side user created just above is left in place -
            // matching AuthService.register's existing handling of this rare
            // concurrent-signup race; no compensating cleanup in this phase.
            throw new EmailAlreadyExistsException();
        }

        auditLogService.record(actor, "USER_CREATED", "USER", String.valueOf(saved.getId()),
                null, "role=" + role.getCode() + ", status=" + saved.getStatus(),
                "Created user " + saved.getEmail() + " with role " + role.getCode());

        return toResponse(saved);
    }

    @Transactional
    public SuperAdminUserResponse updateUser(User actor, Integer id, UpdateSuperAdminUserRequest request) {

        User user = findByIdOrThrow(id);
        Role newRole = findRoleByCodeOrThrow(request.getRoleCode());

        Role previousRole = user.getBusinessRole();
        String before = "name=" + user.getName() + ", role="
                + (previousRole != null ? previousRole.getCode() : "none");

        if (isLastSuperAdmin(user) && !SUPER_ADMIN_CODE.equals(newRole.getCode())) {
            throw new IllegalStateException(
                    "Cannot remove the last SUPER_ADMIN - assign SUPER_ADMIN to another user first");
        }

        user.setName(request.getName());
        user.setBusinessRole(newRole);
        User saved = userRepository.save(user);

        auditLogService.record(actor, "USER_ROLE_ASSIGNED", "USER", String.valueOf(saved.getId()),
                before, "name=" + saved.getName() + ", role=" + newRole.getCode(),
                "Updated user " + saved.getEmail());

        return toResponse(saved);
    }

    @Transactional
    public SuperAdminUserResponse updateStatus(User actor, Integer id, UserStatus newStatus) {

        User user = findByIdOrThrow(id);
        UserStatus before = user.getStatus();

        if (before == newStatus) {
            return toResponse(user);
        }

        if (newStatus == UserStatus.DISABLED && isLastSuperAdmin(user)) {
            throw new IllegalStateException(
                    "Cannot disable the last SUPER_ADMIN - assign SUPER_ADMIN to another user first");
        }

        user.setStatus(newStatus);
        User saved = userRepository.save(user);

        String action = newStatus == UserStatus.DISABLED ? "USER_DISABLED" : "USER_ENABLED";

        auditLogService.record(actor, action, "USER", String.valueOf(saved.getId()),
                before.name(), newStatus.name(),
                "Status of " + saved.getEmail() + " changed: " + before + " -> " + newStatus);

        return toResponse(saved);
    }

    private boolean isLastSuperAdmin(User user) {

        Role businessRole = user.getBusinessRole();

        if (businessRole == null || !SUPER_ADMIN_CODE.equals(businessRole.getCode())) {
            return false;
        }

        return userRepository.countByBusinessRoleId(businessRole.getId()) <= 1;
    }

    private Role findRoleByCodeOrThrow(String code) {
        return roleRepository.findByCode(code)
                .orElseThrow(() -> new IllegalArgumentException("Unknown role code: " + code));
    }

    private User findByIdOrThrow(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", id));
    }

    private UserStatus parseStatusOrDefault(String status) {

        if (status == null || status.isBlank()) {
            return UserStatus.ACTIVE;
        }

        return parseStatusOrThrow(status);
    }

    /** @return null if {@code status} is blank (no filter), otherwise the parsed enum. */
    private UserStatus parseOptionalStatus(String status) {

        if (status == null || status.isBlank()) {
            return null;
        }

        return parseStatusOrThrow(status);
    }

    private UserStatus parseStatusOrThrow(String status) {

        try {
            return UserStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid status: " + status);
        }
    }

    private String generateTemporaryPassword() {
        return "Bmb-" + new java.math.BigInteger(80, RANDOM).toString(36);
    }

    private SuperAdminUserResponse toResponse(User user) {

        Role role = user.getBusinessRole();

        return new SuperAdminUserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                role != null ? role.getCode() : null,
                role != null ? role.getName() : null,
                user.getStatus().name());
    }
}
