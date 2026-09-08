package com.bambardara.demo.stay.exception;

import com.bambardara.demo.common.exception.ResourceNotFoundException;

/**
 * Exception thrown when a stay accommodation is not found.
 * Results in HTTP 404 Not Found response.
 */
public class AccommodationNotFoundException extends ResourceNotFoundException {

    public AccommodationNotFoundException(Integer id) {
        super("Stay accommodation", id);
    }

    public AccommodationNotFoundException(String message) {
        super(message);
    }
}
