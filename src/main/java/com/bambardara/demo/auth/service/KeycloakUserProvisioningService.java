package com.bambardara.demo.auth.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.bambardara.demo.auth.entity.User;
import com.bambardara.demo.auth.repository.UserRepository;

/**
 * Finds or provisions the local {@link User} for a Keycloak-authenticated
 * request, isolated from {@link com.bambardara.demo.auth.config.KeycloakJwtProvisioningFilter}
 * so the provisioning policy can be revisited later (linking an existing
 * legacy account by email on first Keycloak login, richer default-role
 * rules, etc.) without touching request-filtering logic.
 *
 * Safety rules:
 * - Lookup is only ever by keycloak_subject (the OIDC "sub" claim), never by
 *   email - email is not a stable, spoofing-resistant identity key.
 * - A newly provisioned user always gets the safe default role (USER).
 *   Nothing in the JWT - including any role claim - can grant a privileged
 *   role to a brand-new user; role elevation is a separate, deliberate
 *   administrative action.
 */
@Service
public class KeycloakUserProvisioningService {

    private static final Logger logger = LoggerFactory.getLogger(KeycloakUserProvisioningService.class);

    private final UserRepository userRepository;

    public KeycloakUserProvisioningService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * @param subject  the validated JWT's "sub" claim (never null/blank)
     * @param email    the JWT's "email" claim, may be null
     * @param name     a display name derived from "name"/"preferred_username"/
     *                 given+family name, may be null
     * @return the existing local user for this Keycloak subject, or a newly
     *         provisioned one with the safe default role
     */
    public User findOrProvisionUser(String subject, String email, String name) {

        return userRepository.findByKeycloakSubject(subject)
                .orElseGet(() -> provisionNewUser(subject, email, name));
    }

    private User provisionNewUser(String subject, String email, String name) {

        logger.info("Provisioning new local user for Keycloak subject: {}", subject);

        String displayName = (name != null && !name.isBlank())
                ? name
                : (email != null && !email.isBlank() ? email.split("@")[0] : "User");

        // Placeholder: rare, but the email claim is optional per the OIDC spec.
        String userEmail = (email != null && !email.isBlank())
                ? email
                : subject + "@keycloak.local";

        User newUser = User.forKeycloakSubject(subject, displayName, userEmail);

        try {
            return userRepository.saveAndFlush(newUser);
        } catch (DataIntegrityViolationException e) {
            // Race condition: another request provisioned the same subject
            // concurrently. Re-fetch rather than fail the request.
            return userRepository.findByKeycloakSubject(subject)
                    .orElseThrow(() -> new IllegalStateException(
                            "Failed to create or find user for Keycloak subject: " + subject));
        }
    }
}
