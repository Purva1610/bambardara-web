package com.bambardara.demo.auth.exception;

/**
 * Thrown when an OAuth authorization code is invalid, expired, already used,
 * or does not exist.
 * 
 * This prevents replay attacks and ensures codes are single-use and
 * time-limited.
 */
public class InvalidAuthorizationCodeException extends RuntimeException {

    public InvalidAuthorizationCodeException() {
        super("Invalid or expired authorization code");
    }

    public InvalidAuthorizationCodeException(String message) {
        super(message);
    }
}
