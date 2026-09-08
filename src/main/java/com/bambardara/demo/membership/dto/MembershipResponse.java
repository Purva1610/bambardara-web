package com.bambardara.demo.membership.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.bambardara.demo.membership.entity.MembershipStatus;

/**
 * Response DTO for user membership.
 * 
 * Includes full plan details to avoid additional API calls.
 * Used for:
 * - User's membership list (GET /api/memberships/my)
 * - Admin membership management
 * - Membership details view
 */
public class MembershipResponse {

    private Integer id;
    private Integer userId;
    private String userName;
    private String userEmail;
    private String membershipNumber;
    private MembershipPlanResponse plan;
    private LocalDate startDate;
    private LocalDate endDate;
    private BigDecimal purchaseAmount;
    private MembershipStatus status;
    private Boolean emiEnabled;
    private Integer emiMonths;
    private BigDecimal emiAmount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructors

    public MembershipResponse() {
    }

    public MembershipResponse(Integer id, Integer userId, String userName, String userEmail,
                             String membershipNumber, MembershipPlanResponse plan,
                             LocalDate startDate, LocalDate endDate, BigDecimal purchaseAmount,
                             MembershipStatus status, Boolean emiEnabled, Integer emiMonths,
                             BigDecimal emiAmount, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.membershipNumber = membershipNumber;
        this.plan = plan;
        this.startDate = startDate;
        this.endDate = endDate;
        this.purchaseAmount = purchaseAmount;
        this.status = status;
        this.emiEnabled = emiEnabled;
        this.emiMonths = emiMonths;
        this.emiAmount = emiAmount;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters and Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getMembershipNumber() {
        return membershipNumber;
    }

    public void setMembershipNumber(String membershipNumber) {
        this.membershipNumber = membershipNumber;
    }

    public MembershipPlanResponse getPlan() {
        return plan;
    }

    public void setPlan(MembershipPlanResponse plan) {
        this.plan = plan;
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
