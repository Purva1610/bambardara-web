package com.bambardara.demo.adventure.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.hibernate.annotations.Type;

import com.bambardara.demo.auth.entity.User;
import com.bambardara.demo.common.entity.BookingStatus;

import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**
 * Entity representing an adventure activity booking.
 * 
 * Only authenticated users can book adventures.
 * Tracks participant details, health/safety information, and booking lifecycle.
 */
@Entity
@Table(name = "adventure_bookings")
public class AdventureBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "slot_id", nullable = false)
    private AdventureSlot slot;

    @Column(name = "number_of_participants", nullable = false)
    private Integer numberOfParticipants;

    @Column(name = "lead_participant_name", nullable = false, length = 100)
    private String leadParticipantName;

    @Column(name = "lead_participant_email", nullable = false, length = 255)
    private String leadParticipantEmail;

    @Column(name = "lead_participant_mobile", nullable = false, length = 15)
    private String leadParticipantMobile;

    @Type(JsonType.class)
    @Column(name = "participants_details", columnDefinition = "jsonb")
    private String participantsDetails;

    @Column(name = "emergency_contact_name", length = 100)
    private String emergencyContactName;

    @Column(name = "emergency_contact_mobile", length = 15)
    private String emergencyContactMobile;

    @Column(name = "health_conditions", columnDefinition = "TEXT")
    private String healthConditions;

    @Column(name = "terms_accepted", nullable = false)
    private Boolean termsAccepted = false;

    @Column(name = "special_request", columnDefinition = "TEXT")
    private String specialRequest;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private BookingStatus status = BookingStatus.PENDING;

    @Column(name = "total_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    // Getters and Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public AdventureSlot getSlot() {
        return slot;
    }

    public void setSlot(AdventureSlot slot) {
        this.slot = slot;
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

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
