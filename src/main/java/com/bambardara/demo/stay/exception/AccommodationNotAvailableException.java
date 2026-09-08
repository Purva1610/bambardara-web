package com.bambardara.demo.stay.exception;

/**
 * Exception thrown when a stay accommodation is not available for the requested dates.
 * Results in HTTP 409 Conflict response.
 */
public class AccommodationNotAvailableException extends RuntimeException {

    public AccommodationNotAvailableException(String message) {
        super(message);
    }

    public AccommodationNotAvailableException(Integer accommodationId, String dates) {
        super(String.format("Accommodation %d is not available for dates: %s", 
                accommodationId, dates));
    }
}
