package com.bambardara.demo.rbac.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bambardara.demo.auth.entity.User;
import com.bambardara.demo.common.exception.ResourceNotFoundException;
import com.bambardara.demo.rbac.dto.CreateRoleRequest;
import com.bambardara.demo.rbac.dto.RoleResponse;
import com.bambardara.demo.rbac.dto.UpdateRoleRequest;
import com.bambardara.demo.rbac.entity.Role;
import com.bambardara.demo.rbac.exception.DuplicateResourceException;
import com.bambardara.demo.rbac.repository.RoleRepository;

/**
 * Role management for /api/super-admin/roles/**. Does not expose role
 * deletion - not part of this phase's API surface (see V16 migration and the
 * implementation plan) - so system roles are protected simply by never being
 * editable beyond name/description (see {@link #updateRole}).
 */
@Service
public class RoleService {

    private final RoleRepository roleRepository;
    private final AuditLogService auditLogService;

    public RoleService(RoleRepository roleRepository, AuditLogService auditLogService) {
        this.roleRepository = roleRepository;
        this.auditLogService = auditLogService;
    }

    @Transactional(readOnly = true)
    public List<RoleResponse> getAllRoles() {
        return roleRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public RoleResponse getRoleById(Integer id) {
        return toResponse(findByIdOrThrow(id));
    }

    @Transactional
    public RoleResponse createRole(User actor, CreateRoleRequest request) {

        if (roleRepository.existsByCode(request.getCode())) {
            throw new DuplicateResourceException("A role with code '" + request.getCode() + "' already exists");
        }

        Role role = new Role(request.getName(), request.getCode(), request.getDescription(), false);
        role = roleRepository.save(role);

        auditLogService.record(actor, "ROLE_CREATED", "ROLE", role.getCode(),
                null, describeRole(role), "Created role " + role.getCode());

        return toResponse(role);
    }

    @Transactional
    public RoleResponse updateRole(User actor, Integer id, UpdateRoleRequest request) {

        Role role = findByIdOrThrow(id);
        String before = describeRole(role);

        role.setName(request.getName());
        role.setDescription(request.getDescription());
        role = roleRepository.save(role);

        auditLogService.record(actor, "ROLE_UPDATED", "ROLE", role.getCode(),
                before, describeRole(role), "Updated role " + role.getCode());

        return toResponse(role);
    }

    @Transactional(readOnly = true)
    public Role findByIdOrThrow(Integer id) {
        return roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role", id));
    }

    @Transactional(readOnly = true)
    public Role findByCodeOrThrow(String code) {
        return roleRepository.findByCode(code)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found with code: " + code));
    }

    private String describeRole(Role role) {
        return "name=" + role.getName() + ", code=" + role.getCode() + ", description=" + role.getDescription();
    }

    private RoleResponse toResponse(Role role) {
        return new RoleResponse(
                role.getId(),
                role.getName(),
                role.getCode(),
                role.getDescription(),
                role.isSystemRole(),
                role.getCreatedAt(),
                role.getUpdatedAt());
    }
}
