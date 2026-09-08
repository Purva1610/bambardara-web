package com.bambardara.demo.adventure.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * Request DTO for creating an adventure booking.
 */
public class CreateAdventureBookingRequest {

    @NotNull(message = "Slot ID is required")
    private Integer slotId;

    @NotNull(message = "Number of participants is required")
    @Min(value = 1, message = "At least 1 participant is required")
    private Integer numberOfParticipants;

    @NotBlank(message = "Lead participant name is required")
    @Size(max = 100, message = "Name must not exceed 100 characters")
    private String leadParticipantName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Size(max = 255, message = "Email must not exceed 255 characters")
    private String leadParticipantEmail;

    @NotBlank(message = "Mobile number is required")
    @Size(max = 15, message = "Mobile number must not exceed 15 characters")
    private String leadParticipantMobile;

    private String participantsDetails;  // JSON array of participant details

    @Size(max = 100, message = "Emergency contact name must not exceed 100 characters")
    private String emergencyContactName;

    @Size(max = 15, message = "Emergency contact mobile must not exceed 15 characters")
    private String emergencyContactMobile;

    private String healthConditions;

    @NotNull(message = "Terms acceptance is required")
    private Boolean termsAccepted;

    private String specialRequest;

    // Getters and Setters

    public Integer getSlotId() {
        return slotId;
    }

    public void setSlotId(Integer slotId) {
        this.slotId = slotId;
    }

    public Integer getNumberOfParticipants() {
        return numberOfParticipants;
    }

    public void setNumberOfParticipants(Integer numberOfParticipants) {
        this.numberOfParticipants = numberOfParticipants;
    }

    public String getLeadParticipantName() {
        return leadParticipantName;
    }

    public void setLeadParticipantName(String leadParticipantName) {
        this.leadParticipantName = leadParticipantName;
    }

    public String getLeadParticipantEmail() {
        return leadParticipantEmail;
    }

    public void setLeadParticipantEmail(String leadParticipantEmail) {
        this.leadParticipantEmail = leadParticipantEmail;
    }

    public String getLeadParticipantMobile() {
        return leadParticipantMobile;
    }

    public void setLeadParticipantMobile(String leadParticipantMobile) {
        this.leadParticipantMobile = leadParticipantMobile;
    }

    public String getParticipantsDetails() {
        return participantsDetails;
    }

    public void setParticipantsDetails(String participantsDetails) {
        this.participantsDetails = participantsDetails;
    }

    public String getEmergencyContactName() {
        return emergencyContactName;
    }

    public void setEmergencyContactName(String emergencyContactName) {
        this.emergencyContactName = emergencyContactName;
    }

    public String getEmergencyContactMobile() {
        return emergencyContactMobile;
    }

    public void setEmergencyContactMobile(String emergencyContactMobile) {
        this.emergencyContactMobile = emergencyContactMobile;
    }

    public String getHealthConditions() {
        return healthConditions;
    }

    public void setHealthConditions(String healthConditions) {
        this.healthConditions = healthConditions;
    }

    public Boolean getTermsAccepted() {
        return termsAccepted;
    }

    public void setTermsAccepted(Boolean termsAccepted) {
        this.termsAccepted = termsAccepted;
    }

    public String getSpecialRequest() {
        return specialRequest;
    }

    public void setSpecialRequest(String specialRequest) {
        this.specialRequest = specialRequest;
    }
}
