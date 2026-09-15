package com.bambardara.demo.auth.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.bambardara.demo.auth.entity.User;

/**
 * {@link JpaSpecificationExecutor} backs the Super Admin user search/filter
 * API (see com.bambardara.demo.rbac.repository.UserSpecifications and
 * SuperAdminUserService) - database-level filtering by name/email/business
 * role/status with pagination, rather than loading every user into memory.
 */
public interface UserRepository extends JpaRepository<User, Integer>, JpaSpecificationExecutor<User> {

    /**
     * Find user by email (used by existing JWT authentication).
     */
    Optional<User> findByEmail(String email);

    /**
     * Find user by Keycloak subject (the OIDC "sub" claim). Primary lookup
     * for Keycloak-authenticated users.
     *
     * Eagerly fetches {@code businessRole}: the caller,
     * {@link com.bambardara.demo.auth.config.KeycloakJwtProvisioningFilter},
     * reads {@code user.getBusinessRole().getCode()} to build the request's
     * Spring Security authorities after the provisioning transaction has
     * already closed, so a lazy proxy there would throw
     * LazyInitializationException. {@code businessRole} stays LAZY on the
     * entity itself (see {@link User#getBusinessRole()}) - only this
     * request-authentication lookup needs it eagerly, not every query that
     * touches a User.
     */
    @EntityGraph(attributePaths = "businessRole")
    Optional<User> findByKeycloakSubject(String keycloakSubject);

    /**
     * Users currently holding a given Bambardara business role. Used by
     * RoleService/SuperAdminUserService to check "is this the last user
     * with this role" before removing a role assignment or deleting a role.
     */
    Page<User> findByBusinessRoleId(Integer roleId, Pageable pageable);

    long countByBusinessRoleId(Integer roleId);
}