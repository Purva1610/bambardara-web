package com.bambardara.demo.adventure.exception;

/**
 * Exception thrown when a slot is not available for booking.
 * Results in HTTP 409 Conflict response.
 */
public class SlotNotAvailableException extends RuntimeException {

    public SlotNotAvailableException(String message) {
        super(message);
    }

    public SlotNotAvailableException(Integer slotId, String reason) {
        super(String.format("Slot %d is not available. Reason: %s", slotId, reason));
    }
}
