package com.bambardara.demo.rbac;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.bambardara.demo.auth.entity.User;
import com.bambardara.demo.auth.repository.UserRepository;
import com.bambardara.demo.rbac.entity.Role;
import com.bambardara.demo.rbac.repository.RoleRepository;

/**
 * Regression test for the LazyInitializationException that
 * KeycloakJwtProvisioningFilter.buildAuthorities hit when reading
 * {@code user.getBusinessRole().getCode()}: UserRepository.findByKeycloakSubject
 * opens and closes its own Hibernate session on each call (it is not called
 * from within a broader transaction in the authentication filter), so a LAZY
 * businessRole proxy returned from it was unusable by the time
 * buildAuthorities accessed it - exactly this test's shape, deliberately
 * without a test-level @Transactional, which would otherwise keep a session
 * open across the whole test and hide the bug.
 *
 * Fixed via @EntityGraph(attributePaths = "businessRole") on
 * findByKeycloakSubject (see UserRepository) - businessRole stays LAZY on
 * the entity itself; only this authentication lookup fetches it eagerly.
 */
@SpringBootTest
class KeycloakUserLookupLazyLoadingTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Test
    void businessRoleIsAccessible_afterTheRepositorySessionHasClosed() {

        Role employeeRole = roleRepository.findByCode("EMPLOYEE").orElseThrow();
        String subject = "lazy-loading-test-subject-" + UUID.randomUUID();

        User user = User.forKeycloakSubject(subject, "Lazy Loading Test User", subject + "@keycloak.local");
        user.setBusinessRole(employeeRole);
        userRepository.saveAndFlush(user);

        try {

            // findByKeycloakSubject's own (now closed) transaction/session
            // ended the instant this call returned - buildAuthorities in
            // KeycloakJwtProvisioningFilter accesses businessRole in exactly
            // this state, outside of any repository call.
            User reloaded = userRepository.findByKeycloakSubject(subject).orElseThrow();

            String roleCode = assertDoesNotThrow(
                    () -> reloaded.getBusinessRole().getCode(),
                    "businessRole should be eagerly fetched by findByKeycloakSubject, "
                            + "not a lazy proxy that throws LazyInitializationException here");

            assertEquals("EMPLOYEE", roleCode);

        } finally {
            userRepository.delete(user);
        }
    }
}
