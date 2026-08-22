package com.bambardara.demo.auth.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * Request payload for exchanging an OAuth authorization code for a JWT.
 * 
 * The frontend receives a one-time authorization code after successful Google
 * authentication and sends it back to this endpoint to obtain the application's
 * JWT token.
 */
public class CodeExchangeRequest {

    @NotBlank(message = "Authorization code is required")
    private String code;

    public CodeExchangeRequest() {
    }

    public CodeExchangeRequest(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
