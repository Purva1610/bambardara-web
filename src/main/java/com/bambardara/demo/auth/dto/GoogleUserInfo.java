package com.bambardara.demo.auth.dto;

/**
 * Data extracted from Google OAuth2 authentication.
 * 
 * Holds the verified user information returned by Google after successful
 * authentication. This DTO is stored temporarily with the authorization code
 * and later used to create or identify the user.
 */
public class GoogleUserInfo {

    private final String email;
    private final String name;
    // Google's stable user identifier (the "sub" claim from the ID token)
    private final String googleId;

    public GoogleUserInfo(String email, String name, String googleId) {
        this.email = email;
        this.name = name;
        this.googleId = googleId;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public String getGoogleId() {
        return googleId;
    }
}
