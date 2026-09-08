package com.bambardara.demo.wellness.exception;

import com.bambardara.demo.common.exception.ResourceNotFoundException;

/**
 * Exception thrown when a spa appointment is not found.
 * Results in HTTP 404 Not Found response.
 */
public class SpaAppointmentNotFoundException extends ResourceNotFoundException {

    public SpaAppointmentNotFoundException(Integer id) {
        super("Spa appointment", id);
    }

    public SpaAppointmentNotFoundException(String message) {
        super(message);
    }
}
