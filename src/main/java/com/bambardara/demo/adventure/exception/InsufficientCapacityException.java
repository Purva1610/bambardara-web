package com.bambardara.demo.adventure.exception;

/**
 * Exception thrown when a slot does not have sufficient capacity.
 * Results in HTTP 409 Conflict response.
 */
public class InsufficientCapacityException extends RuntimeException {

    public InsufficientCapacityException(String message) {
        super(message);
    }

    public InsufficientCapacityException(Integer available, Integer requested) {
        super(String.format("Insufficient capacity. Available: %d, Requested: %d",
                available, requested));
    }
}
