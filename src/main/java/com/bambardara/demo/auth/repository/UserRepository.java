package com.bambardara.demo.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bambardara.demo.auth.entity.User;

public interface UserRepository extends JpaRepository<User, Integer>  {

    /**
     * Find user by email (used by existing JWT authentication).
     */
    Optional<User> findByEmail(String email);

    /**
     * Find user by Keycloak subject (the OIDC "sub" claim). Primary lookup
     * for Keycloak-authenticated users.
     */
    Optional<User> findByKeycloakSubject(String keycloakSubject);
}