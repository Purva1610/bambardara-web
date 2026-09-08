package com.bambardara.demo.adventure.exception;

import com.bambardara.demo.common.entity.BookingStatus;

/**
 * Exception thrown when an invalid booking status transition is attempted.
 * Results in HTTP 400 Bad Request response.
 */
public class InvalidBookingStatusTransitionException extends IllegalStateException {

    public InvalidBookingStatusTransitionException(BookingStatus from, BookingStatus to) {
        super(String.format("Invalid status transition from %s to %s", from, to));
    }

    public InvalidBookingStatusTransitionException(String message) {
        super(message);
    }
}
