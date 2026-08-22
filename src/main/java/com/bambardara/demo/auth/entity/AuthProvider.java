package com.bambardara.demo.auth.entity;

/**
 * Authentication provider type.
 * 
 * Tracks how a user account was created and which authentication method
 * they use to sign in.
 * 
 * - LOCAL: Traditional email/password authentication
 * - GOOGLE: Google OAuth2 authentication
 */
public enum AuthProvider {
    LOCAL,
    GOOGLE
}
