package com.bambardara.demo.wellness.exception;

import com.bambardara.demo.common.entity.BookingStatus;

/**
 * Exception thrown when an invalid appointment status transition is attempted.
 * Results in HTTP 400 Bad Request response.
 */
public class InvalidAppointmentStatusTransitionException extends IllegalStateException {

    public InvalidAppointmentStatusTransitionException(BookingStatus from, BookingStatus to) {
        super(String.format("Invalid status transition from %s to %s", from, to));
    }

    public InvalidAppointmentStatusTransitionException(String message) {
        super(message);
    }
}
