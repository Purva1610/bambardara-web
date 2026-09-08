package com.bambardara.demo.membership.exception;

/**
 * Exception thrown when an invalid membership status transition is attempted.
 * 
 * HTTP Status: 400 Bad Request
 * 
 * Thrown when:
 * - Admin tries to transition from terminal state (EXPIRED, CANCELLED)
 * - Invalid status flow (e.g., PENDING → EXPIRED without going through ACTIVE)
 * 
 * Valid transitions:
 * - PENDING → ACTIVE, CANCELLED
 * - ACTIVE → EXPIRED, CANCELLED
 * - EXPIRED → (none, terminal)
 * - CANCELLED → (none, terminal)
 */
public class InvalidMembershipStatusTransitionException extends RuntimeException {

    public InvalidMembershipStatusTransitionException(String message) {
        super(message);
    }

    public InvalidMembershipStatusTransitionException(String message, Throwable cause) {
        super(message, cause);
    }
}
