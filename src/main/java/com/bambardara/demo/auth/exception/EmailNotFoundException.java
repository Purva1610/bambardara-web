package com.bambardara.demo.auth.exception;

/**
 * Thrown when an email address is not registered. Maps to HTTP 404.
 */
public class EmailNotFoundException extends RuntimeException {

    public EmailNotFoundException() {
        super("Email not found, please sign up");
    }

    public EmailNotFoundException(String message) {
        super(message);
    }

}
