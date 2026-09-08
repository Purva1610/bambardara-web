package com.bambardara.demo.wellness.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

/**
 * Request DTO for checking spa availability.
 */
public class SpaAvailabilityRequest {

    @NotNull(message = "Appointment date is required")
    @Future(message = "Appointment date must be in the future")
    private LocalDate appointmentDate;

    @NotNull(message = "Duration is required")
    @Min(value = 30, message = "Duration must be at least 30 minutes")
    private Integer durationMinutes;

    public SpaAvailabilityRequest() {
    }

    public SpaAvailabilityRequest(LocalDate appointmentDate, Integer durationMinutes) {
        this.appointmentDate = appointmentDate;
        this.durationMinutes = durationMinutes;
    }

    // Getters and Setters

    public LocalDate getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(LocalDate appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public Integer getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }
}
