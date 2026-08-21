package com.bambardara.demo.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class LoginRequest {

    @NotBlank(message = "email is required")
    @Email(message = "Invalid Email format ")
    private String email;

    @NotBlank(message = "password is required")
    private String password;

    public LoginRequest() {

    }

    public LoginRequest(String email, String password) {

        this.email = email;
        this.password = password;

    }

    /**
     * @return String return the email
     */
    public String getEmail() {
        return email;
    }

    /**
     * @param email the email to set
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * @return String return the password
     */
    public String getPassword() {
        return password;
    }

    /**
     * @param password the password to set
     */
    public void setPassword(String password) {
        this.password = password;
    }

}