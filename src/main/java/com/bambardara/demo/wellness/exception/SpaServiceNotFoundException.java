package com.bambardara.demo.wellness.exception;

import com.bambardara.demo.common.exception.ResourceNotFoundException;

/**
 * Exception thrown when a spa service is not found.
 * Results in HTTP 404 Not Found response.
 */
public class SpaServiceNotFoundException extends ResourceNotFoundException {

    public SpaServiceNotFoundException(Integer id) {
        super("Spa service", id);
    }

    public SpaServiceNotFoundException(String message) {
        super(message);
    }
}
