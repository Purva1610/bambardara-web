package com.bambardara.demo.auth.exception;

/**
 * Thrown when registering an email that is already taken. Maps to HTTP 409.
 */
public class EmailAlreadyExistsException extends RuntimeException {

    public EmailAlreadyExistsException() {
        super("An account with this email already exists");
    }

    public EmailAlreadyExistsException(String message) {
        super(message);
    }

}
