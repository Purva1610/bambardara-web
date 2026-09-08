package com.bambardara.demo.stay.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.bambardara.demo.stay.entity.IdProofType;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/**
 * Request DTO for creating a stay booking.
 * 
 * All fields are validated. Guest details may differ from authenticated user's profile.
 */
public class CreateStayBookingRequest {

    @NotNull(message = "Accommodation ID is required")
    private Integer accommodationId;

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

    @NotNull(message = "ID proof type is required")
    private IdProofType idProofType;

    @Size(max = 100, message = "ID proof reference must not exceed 100 characters")
    private String idProofReference;

    // Guest Count
    @NotNull(message = "Number of guests is required")
    @Min(value = 1, message = "At least 1 guest is required")
    private Integer numberOfGuests;

    @NotNull(message = "Number of adults is required")
    @Min(value = 1, message = "At least 1 adult is required")
    private Integer numberOfAdults;

    @Min(value = 0, message = "Number of children cannot be negative")
    private Integer numberOfChildren = 0;

    // Stay Details
    @NotNull(message = "Check-in date is required")
    @Future(message = "Check-in date must be in the future")
    private LocalDate checkInDate;

    private LocalTime checkInTime;

    @NotNull(message = "Check-out date is required")
    private LocalDate checkOutDate;

    private LocalTime checkOutTime;

    // Additional
    @Size(max = 2000, message = "Special request must not exceed 2000 characters")
    private String specialRequest;

    @NotNull(message = "Terms and conditions must be accepted")
    private Boolean termsAccepted;

    public CreateStayBookingRequest() {
    }

    // Getters and Setters

    public Integer getAccommodationId() {
        return accommodationId;
    }

    public void setAccommodationId(Integer accommodationId) {
        this.accommodationId = accommodationId;
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

    public IdProofType getIdProofType() {
        return idProofType;
    }

    public void setIdProofType(IdProofType idProofType) {
        this.idProofType = idProofType;
    }

    public String getIdProofReference() {
        return idProofReference;
    }

    public void setIdProofReference(String idProofReference) {
        this.idProofReference = idProofReference;
    }

    public Integer getNumberOfGuests() {
        return numberOfGuests;
    }

    public void setNumberOfGuests(Integer numberOfGuests) {
        this.numberOfGuests = numberOfGuests;
    }

    public Integer getNumberOfAdults() {
        return numberOfAdults;
    }

    public void setNumberOfAdults(Integer numberOfAdults) {
        this.numberOfAdults = numberOfAdults;
    }

    public Integer getNumberOfChildren() {
        return numberOfChildren;
    }

    public void setNumberOfChildren(Integer numberOfChildren) {
        this.numberOfChildren = numberOfChildren;
    }

    public LocalDate getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(LocalDate checkInDate) {
        this.checkInDate = checkInDate;
    }

    public LocalTime getCheckInTime() {
        return checkInTime;
    }

    public void setCheckInTime(LocalTime checkInTime) {
        this.checkInTime = checkInTime;
    }

    public LocalDate getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(LocalDate checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    public LocalTime getCheckOutTime() {
        return checkOutTime;
    }

    public void setCheckOutTime(LocalTime checkOutTime) {
        this.checkOutTime = checkOutTime;
    }

    public String getSpecialRequest() {
        return specialRequest;
    }

    public void setSpecialRequest(String specialRequest) {
        this.specialRequest = specialRequest;
    }

    public Boolean getTermsAccepted() {
        return termsAccepted;
    }

    public void setTermsAccepted(Boolean termsAccepted) {
        this.termsAccepted = termsAccepted;
    }
}
