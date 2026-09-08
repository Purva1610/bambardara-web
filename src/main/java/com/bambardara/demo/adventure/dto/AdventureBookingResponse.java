package com.bambardara.demo.adventure.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import com.bambardara.demo.adventure.entity.ActivityType;
import com.bambardara.demo.common.entity.BookingStatus;

/**
 * Response DTO for adventure booking information.
 */
public class AdventureBookingResponse {

    private Integer id;
    private Integer slotId;
    private Integer activityId;
    private ActivityType activityType;
    private String activityName;
    private LocalDate slotDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private Integer numberOfParticipants;
    private String leadParticipantName;
    private String leadParticipantEmail;
    private String leadParticipantMobile;
    private String participantsDetails;
    private String emergencyContactName;
    private String emergencyContactMobile;
    private String healthConditions;
    private String specialRequest;
    private BookingStatus status;
    private BigDecimal totalAmount;
    private LocalDateTime createdAt;

    // Getters and Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getSlotId() {
        return slotId;
    }

    public void setSlotId(Integer slotId) {
        this.slotId = slotId;
    }

    public Integer getActivityId() {
        return activityId;
    }

    public void setActivityId(Integer activityId) {
        this.activityId = activityId;
    }

    public ActivityType getActivityType() {
        return activityType;
    }

    public void setActivityType(ActivityType activityType) {
        this.activityType = activityType;
    }

    public String getActivityName() {
        return activityName;
    }

    public void setActivityName(String activityName) {
        this.activityName = activityName;
    }

    public LocalDate getSlotDate() {
        return slotDate;
    }

    public void setSlotDate(LocalDate slotDate) {
        this.slotDate = slotDate;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
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

    public String getSpecialRequest() {
        return specialRequest;
    }

    public void setSpecialRequest(String specialRequest) {
        this.specialRequest = specialRequest;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public void setStatus(BookingStatus status) {
        this.status = status;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
