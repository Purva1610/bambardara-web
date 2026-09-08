package com.bambardara.demo.membership.exception;

/**
 * Exception thrown when a membership is not found.
 * 
 * HTTP Status: 404 Not Found
 * 
 * Thrown when:
 * - Membership ID does not exist
 * - User tries to access non-existent membership
 */
public class MembershipNotFoundException extends RuntimeException {

    public MembershipNotFoundException(String message) {
        super(message);
    }

    public MembershipNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
