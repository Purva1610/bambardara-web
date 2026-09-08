package com.bambardara.demo.adventure.exception;

import com.bambardara.demo.common.exception.ResourceNotFoundException;

/**
 * Exception thrown when an adventure slot is not found.
 * Results in HTTP 404 Not Found response.
 */
public class AdventureSlotNotFoundException extends ResourceNotFoundException {

    public AdventureSlotNotFoundException(Integer id) {
        super("Adventure slot", id);
    }

    public AdventureSlotNotFoundException(String message) {
        super(message);
    }
}
