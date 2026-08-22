package com.bambardara.demo.auth.exception;

/**
 * Thrown when a user attempts to sign in with Google using an email that
 * already exists as a local (email/password) account.
 * 
 * Prevents automatic account linking for security reasons. The user must
 * sign in with their password or explicitly link accounts from their profile.
 */
public class AccountLinkingRequiredException extends RuntimeException {

    public AccountLinkingRequiredException() {
        super("This email is already registered with a password. Please sign in using your password, or contact support to link your Google account.");
    }

    public AccountLinkingRequiredException(String message) {
        super(message);
    }
}
