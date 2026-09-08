package com.bambardara.demo.membership.exception;

/**
 * Exception thrown when a membership plan is not found.
 * 
 * HTTP Status: 404 Not Found
 * 
 * Thrown when:
 * - Plan ID does not exist
 * - Plan is requested but not in database
 */
public class MembershipPlanNotFoundException extends RuntimeException {

    public MembershipPlanNotFoundException(String message) {
        super(message);
    }

    public MembershipPlanNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
