package com.bambardara.demo.stay.exception;

import com.bambardara.demo.common.exception.ResourceNotFoundException;

/**
 * Exception thrown when a stay booking is not found.
 * Results in HTTP 404 Not Found response.
 */
public class StayBookingNotFoundException extends ResourceNotFoundException {

    public StayBookingNotFoundException(Integer id) {
        super("Stay booking", id);
    }

    public StayBookingNotFoundException(String message) {
        super(message);
    }
}
