package com.bambardara.demo.rbac.dto;

import java.util.List;

import jakarta.validation.constraints.NotNull;

public class RolePermissionsUpdateRequest {

    /**
     * The complete desired set of permission codes for this role - not a
     * delta. Missing codes are revoked, new codes are granted (see
     * RoleAccessService.setPermissions).
     */
    @NotNull
    private List<String> permissions;

    public List<String> getPermissions() {
        return permissions;
    }

    public void setPermissions(List<String> permissions) {
        this.permissions = permissions;
    }
}
