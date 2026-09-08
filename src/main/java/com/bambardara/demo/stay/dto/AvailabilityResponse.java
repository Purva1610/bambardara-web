package com.bambardara.demo.stay.dto;

/**
 * Response DTO for availability check.
 */
public class AvailabilityResponse {

    private boolean available;
    private String message;

    public AvailabilityResponse() {
    }

    public AvailabilityResponse(boolean available, String message) {
        this.available = available;
        this.message = message;
    }

    public static AvailabilityResponse available() {
        return new AvailabilityResponse(true, "Accommodation is available for selected dates");
    }

    public static AvailabilityResponse unavailable(String reason) {
        return new AvailabilityResponse(false, reason);
    }

    // Getters and Setters

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
