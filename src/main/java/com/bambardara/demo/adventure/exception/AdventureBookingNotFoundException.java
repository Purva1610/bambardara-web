package com.bambardara.demo.adventure.exception;

import com.bambardara.demo.common.exception.ResourceNotFoundException;

/**
 * Exception thrown when an adventure booking is not found.
 * Results in HTTP 404 Not Found response.
 */
public class AdventureBookingNotFoundException extends ResourceNotFoundException {

    public AdventureBookingNotFoundException(Integer id) {
        super("Adventure booking", id);
    }

    public AdventureBookingNotFoundException(String message) {
        super(message);
    }
}
