package com.bambardara.demo.auth.exception;

/**
 * Thrown when the email exists but the password does not match. Maps to HTTP 401.
 */
public class InvalidCredentialsException extends RuntimeException {

    public InvalidCredentialsException() {
        super("Invalid email or password");
    }

    public InvalidCredentialsException(String message) {
        super(message);
    }

}
