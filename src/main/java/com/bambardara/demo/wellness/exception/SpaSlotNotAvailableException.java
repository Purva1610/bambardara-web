package com.bambardara.demo.wellness.exception;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * Exception thrown when a spa time slot is not available.
 * Results in HTTP 409 Conflict response.
 */
public class SpaSlotNotAvailableException extends RuntimeException {

    public SpaSlotNotAvailableException(String message) {
        super(message);
    }

    public SpaSlotNotAvailableException(LocalDate date, LocalTime time) {
        super(String.format("Time slot not available on %s at %s", date, time));
    }
}
