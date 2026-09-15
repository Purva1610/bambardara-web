package com.bambardara.demo.rbac.dto;

import jakarta.validation.constraints.Pattern;

public class UpdateUserStatusRequest {

    @Pattern(regexp = "ACTIVE|DISABLED", message = "status must be ACTIVE or DISABLED")
    private String status;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
