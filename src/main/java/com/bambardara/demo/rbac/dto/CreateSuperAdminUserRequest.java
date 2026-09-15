package com.bambardara.demo.rbac.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CreateSuperAdminUserRequest {

    @NotBlank
    @Size(max = 100)
    private String name;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String roleCode;

    /**
     * Optional initial status; defaults to ACTIVE in the service if omitted.
     */
    private String status;

    /**
     * Sent straight through to Keycloak's admin API to provision the
     * account's credential (see KeycloakAdminService) - never persisted in
     * Postgres. If omitted, a random temporary password is generated and
     * discarded after provisioning (the new user resets it via Keycloak's
     * forgot-password flow).
     */
    private String temporaryPassword;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRoleCode() {
        return roleCode;
    }

    public void setRoleCode(String roleCode) {
        this.roleCode = roleCode;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTemporaryPassword() {
        return temporaryPassword;
    }

    public void setTemporaryPassword(String temporaryPassword) {
        this.temporaryPassword = temporaryPassword;
    }
}
