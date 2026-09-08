package com.bambardara.demo.membership.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.bambardara.demo.auth.entity.User;

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
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

/**
 * Entity representing a user's purchased membership.
 * 
 * Captures the membership purchase at a point in time with:
 * - Immutable reference to the plan (plan_id)
 * - Purchase amount (preserved even if plan price changes)
 * - Membership number (unique identifier)
 * - Validity period (start_date to end_date)
 * - EMI details (if applicable)
 * - Status (PENDING, ACTIVE, EXPIRED, CANCELLED)
 * 
 * User identity comes from the authenticated Spring Security context.
 * NEVER trust userId from request body.
 */
@Entity
@Table(name = "memberships")
public class Membership {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plan_id", nullable = false)
    private MembershipPlan plan;

    @Column(name = "membership_number", unique = true, nullable = false, length = 20)
    private String membershipNumber;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Column(name = "purchase_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal purchaseAmount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private MembershipStatus status = MembershipStatus.PENDING;

    @Column(name = "emi_enabled", nullable = false)
    private Boolean emiEnabled = false;

    @Column(name = "emi_months")
    private Integer emiMonths;

    @Column(name = "emi_amount", precision = 10, scale = 2)
    private BigDecimal emiAmount;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Constructors

    public Membership() {
    }

    public Membership(User user, MembershipPlan plan, String membershipNumber, 
                     LocalDate startDate, LocalDate endDate, BigDecimal purchaseAmount,
                     MembershipStatus status, Boolean emiEnabled, Integer emiMonths, 
                     BigDecimal emiAmount) {
        this.user = user;
        this.plan = plan;
        this.membershipNumber = membershipNumber;
        this.startDate = startDate;
        this.endDate = endDate;
        this.purchaseAmount = purchaseAmount;
        this.status = status;
        this.emiEnabled = emiEnabled;
        this.emiMonths = emiMonths;
        this.emiAmount = emiAmount;
    }

    // Business logic methods

    /**
     * Check if this membership belongs to the given user.
     */
    public boolean belongsToUser(Integer userId) {
        return this.user.getId().equals(userId);
    }

    /**
     * Check if status can transition from current to target.
     */
    public boolean canTransitionTo(MembershipStatus targetStatus) {
        if (this.status == targetStatus) {
            return false; // No transition needed
        }

        return switch (this.status) {
            case PENDING -> targetStatus == MembershipStatus.ACTIVE 
                         || targetStatus == MembershipStatus.CANCELLED;
            case ACTIVE -> targetStatus == MembershipStatus.EXPIRED 
                        || targetStatus == MembershipStatus.CANCELLED;
            case EXPIRED, CANCELLED -> false; // Terminal states
        };
    }

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

    public MembershipPlan getPlan() {
        return plan;
    }

    public void setPlan(MembershipPlan plan) {
        this.plan = plan;
    }

    public String getMembershipNumber() {
        return membershipNumber;
    }

    public void setMembershipNumber(String membershipNumber) {
        this.membershipNumber = membershipNumber;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public BigDecimal getPurchaseAmount() {
        return purchaseAmount;
    }

    public void setPurchaseAmount(BigDecimal purchaseAmount) {
        this.purchaseAmount = purchaseAmount;
    }

    public MembershipStatus getStatus() {
        return status;
    }

    public void setStatus(MembershipStatus status) {
        this.status = status;
    }

    public Boolean getEmiEnabled() {
        return emiEnabled;
    }

    public void setEmiEnabled(Boolean emiEnabled) {
        this.emiEnabled = emiEnabled;
    }

    public Integer getEmiMonths() {
        return emiMonths;
    }

    public void setEmiMonths(Integer emiMonths) {
        this.emiMonths = emiMonths;
    }

    public BigDecimal getEmiAmount() {
        return emiAmount;
    }

    public void setEmiAmount(BigDecimal emiAmount) {
        this.emiAmount = emiAmount;
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
