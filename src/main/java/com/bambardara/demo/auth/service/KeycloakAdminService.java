package com.bambardara.demo.auth.service;

import java.net.URI;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import com.bambardara.demo.auth.exception.EmailAlreadyExistsException;
import com.bambardara.demo.auth.exception.KeycloakProvisioningException;

/**
 * Creates the Keycloak-side identity for a new Bambardara user via the
 * Keycloak Admin REST API, authenticating itself with the {@code
 * bambardara-api} client's own service account (client-credentials grant) —
 * never with a user's password, and never with a secret exposed to the
 * browser (see {@code app.keycloak.admin-client-secret}, read only here on
 * the backend).
 *
 * This is the only place the frontend's registration flow touches Keycloak
 * server-to-server; sign-in itself goes directly from the browser to
 * Keycloak's token endpoint (Direct Grant — see the frontend's
 * src/lib/keycloak.js).
 */
@Service
public class KeycloakAdminService {

    private static final Logger logger = LoggerFactory.getLogger(KeycloakAdminService.class);

    private final RestClient restClient = RestClient.create();

    @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri:}")
    private String issuerUri;

    @Value("${app.keycloak.admin-client-id:}")
    private String adminClientId;

    @Value("${app.keycloak.admin-client-secret:}")
    private String adminClientSecret;

    /**
     * @return the new user's Keycloak subject (the id later carried as the
     *         JWT "sub" claim on every token they obtain)
     * @throws EmailAlreadyExistsException   if Keycloak already has a user
     *                                        with this email/username
     * @throws KeycloakProvisioningException if Keycloak is not configured,
     *                                        unreachable, or returns an
     *                                        unexpected response
     */
    public String createUser(String email, String password, String name) {

        requireConfigured();

        String adminToken = fetchServiceAccountToken();

        String[] nameParts = splitName(name);

        Map<String, Object> body = Map.of(
                "username", email,
                "email", email,
                "enabled", true,
                "emailVerified", true,
                "firstName", nameParts[0],
                "lastName", nameParts[1],
                "credentials", List.of(Map.of(
                        "type", "password",
                        "value", password,
                        "temporary", false
                ))
        );

        try {

            ResponseEntity<Void> response = restClient.post()
                    .uri(adminUsersUri())
                    .header("Authorization", "Bearer " + adminToken)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(body)
                    .retrieve()
                    .onStatus(status -> status.value() == 409, (req, res) -> {
                        throw new EmailAlreadyExistsException();
                    })
                    .toBodilessEntity();

            URI location = response.getHeaders().getLocation();

            if (location == null) {
                throw new KeycloakProvisioningException(
                        "Keycloak did not return a Location header for the created user");
            }

            String path = location.getPath();
            return path.substring(path.lastIndexOf('/') + 1);

        } catch (EmailAlreadyExistsException e) {
            throw e;
        } catch (RestClientException e) {
            logger.warn("Keycloak user creation failed: {}", e.getMessage());
            throw new KeycloakProvisioningException("Failed to create Keycloak user", e);
        }
    }

    private String fetchServiceAccountToken() {

        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("grant_type", "client_credentials");
        form.add("client_id", adminClientId);
        form.add("client_secret", adminClientSecret);

        try {

            @SuppressWarnings("unchecked")
            Map<String, Object> tokenResponse = restClient.post()
                    .uri(issuerUri + "/protocol/openid-connect/token")
                    .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                    .body(form)
                    .retrieve()
                    .body(Map.class);

            Object accessToken = tokenResponse != null ? tokenResponse.get("access_token") : null;

            if (!(accessToken instanceof String token) || token.isBlank()) {
                throw new KeycloakProvisioningException(
                        "Keycloak did not return an access token for the admin service account");
            }

            return token;

        } catch (RestClientException e) {
            logger.warn("Failed to obtain a Keycloak admin service-account token: {}", e.getMessage());
            throw new KeycloakProvisioningException("Failed to authenticate with Keycloak", e);
        }
    }

    private String adminUsersUri() {

        // issuerUri looks like http://localhost:8081/realms/bambardara ->
        // admin API lives at http://localhost:8081/admin/realms/bambardara/users
        int realmsIndex = issuerUri.lastIndexOf("/realms/");
        String baseUrl = issuerUri.substring(0, realmsIndex);
        String realm = issuerUri.substring(realmsIndex + "/realms/".length());
        return baseUrl + "/admin/realms/" + realm + "/users";
    }

    /**
     * The signup form (and the local User entity) only ever collects one
     * "name" field, but Keycloak's declarative user profile requires both
     * firstName and lastName to be non-blank for a self-registered account
     * to be considered fully set up (a blank lastName otherwise leaves
     * Direct Grant login failing with "Account is not fully set up").
     * Splits on the first space; a single-word name is used as both parts
     * rather than left with a blank lastName.
     */
    private static String[] splitName(String name) {

        String trimmed = name != null ? name.trim() : "";

        if (trimmed.isEmpty()) {
            return new String[] { "User", "User" };
        }

        int spaceIndex = trimmed.indexOf(' ');

        if (spaceIndex < 0) {
            return new String[] { trimmed, trimmed };
        }

        String first = trimmed.substring(0, spaceIndex);
        String last = trimmed.substring(spaceIndex + 1).trim();

        return new String[] { first, last.isEmpty() ? first : last };
    }

    private void requireConfigured() {

        if (!StringUtils.hasText(issuerUri)
                || !StringUtils.hasText(adminClientId)
                || !StringUtils.hasText(adminClientSecret)) {

            throw new KeycloakProvisioningException(
                    "Keycloak is not configured (KEYCLOAK_ISSUER_URI / "
                    + "KEYCLOAK_ADMIN_CLIENT_ID / KEYCLOAK_ADMIN_CLIENT_SECRET)");
        }
    }
}
