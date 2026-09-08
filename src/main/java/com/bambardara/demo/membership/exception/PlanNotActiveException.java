package com.bambardara.demo.membership.exception;

/**
 * Exception thrown when a user tries to purchase an inactive plan.
 * 
 * HTTP Status: 409 Conflict
 * 
 * Thrown when:
 * - Plan exists but isActive = false
 * - User attempts to create membership for inactive plan
 * - Prevents purchasing discontinued/hidden plans
 */
public class PlanNotActiveException extends RuntimeException {

    public PlanNotActiveException(String message) {
        super(message);
    }

    public PlanNotActiveException(String message, Throwable cause) {
        super(message, cause);
    }
}
