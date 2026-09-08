package com.bambardara.demo.wellness.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.bambardara.demo.wellness.entity.TherapistPreference;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/**
 * Request DTO for creating a spa appointment.
 */
public class CreateSpaAppointmentRequest {

    @NotNull(message = "Service ID is required")
    private Integer serviceId;

    // Guest Information
    @NotBlank(message = "Guest name is required")
    @Size(max = 100, message = "Guest name must not exceed 100 characters")
    private String guestName;

    @NotBlank(message = "Guest email is required")
    @Email(message = "Invalid email format")
    @Size(max = 255, message = "Email must not exceed 255 characters")
    private String guestEmail;

    @NotBlank(message = "Guest mobile is required")
    @Pattern(regexp = "^[0-9]{10,15}$", message = "Mobile number must be 10-15 digits")
    private String guestMobile;

    // Appointment Details
    @NotNull(message = "Appointment date is required")
    @Future(message = "Appointment date must be in the future")
    private LocalDate appointmentDate;

    @NotNull(message = "Appointment time is required")
    private LocalTime appointmentTime;

    @NotNull(message = "Duration is required")
    @Min(value = 30, message = "Duration must be at least 30 minutes")
    private Integer durationMinutes;

    @NotNull(message = "Therapist preference is required")
    private TherapistPreference therapistPreference;

    @NotNull(message = "Number of people is required")
    @Min(value = 1, message = "At least 1 person is required")
    private Integer numberOfPeople = 1;

    // Additional
    @Size(max = 2000, message = "Special request must not exceed 2000 characters")
    private String specialRequest;

    public CreateSpaAppointmentRequest() {
    }

    // Getters and Setters

    public Integer getServiceId() {
        return serviceId;
    }

    public void setServiceId(Integer serviceId) {
        this.serviceId = serviceId;
    }

    public String getGuestName() {
        return guestName;
    }

    public void setGuestName(String guestName) {
        this.guestName = guestName;
    }

    public String getGuestEmail() {
        return guestEmail;
    }

    public void setGuestEmail(String guestEmail) {
        this.guestEmail = guestEmail;
    }

    public String getGuestMobile() {
        return guestMobile;
    }

    public void setGuestMobile(String guestMobile) {
        this.guestMobile = guestMobile;
    }

    public LocalDate getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(LocalDate appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public LocalTime getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(LocalTime appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public Integer getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public TherapistPreference getTherapistPreference() {
        return therapistPreference;
    }

    public void setTherapistPreference(TherapistPreference therapistPreference) {
        this.therapistPreference = therapistPreference;
    }

    public Integer getNumberOfPeople() {
        return numberOfPeople;
    }

    public void setNumberOfPeople(Integer numberOfPeople) {
        this.numberOfPeople = numberOfPeople;
    }

    public String getSpecialRequest() {
        return specialRequest;
    }

    public void setSpecialRequest(String specialRequest) {
        this.specialRequest = specialRequest;
    }
}
