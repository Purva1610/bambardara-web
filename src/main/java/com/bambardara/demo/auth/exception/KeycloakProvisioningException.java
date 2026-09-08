package com.bambardara.demo.auth.exception;

/**
 * Thrown when creating a user in Keycloak fails for a reason other than the
 * email/username already existing (that case is translated to
 * {@link EmailAlreadyExistsException} instead) — Keycloak unreachable, the
 * admin service account misconfigured, or any other unexpected response.
 * Maps to HTTP 502: the failure is upstream, not the caller's request.
 */
public class KeycloakProvisioningException extends RuntimeException {

    public KeycloakProvisioningException(String message) {
        super(message);
    }

    public KeycloakProvisioningException(String message, Throwable cause) {
        super(message, cause);
    }

}
