package com.bambardara.demo.membership.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

/**
 * Request DTO for creating a membership (user purchase).
 * 
 * User identity comes from @AuthenticationPrincipal User (Spring Security).
 * NEVER trust userId from request body.
 * 
 * Example request:
 * {
 *   "planId": 2,
 *   "startDate": "2026-09-01",
 *   "emiEnabled": true,
 *   "emiMonths": 12
 * }
 */
public class CreateMembershipRequest {

    @NotNull(message = "Plan ID is required")
    private Integer planId;

    @NotNull(message = "Start date is required")
    @Future(message = "Start date must be in the future")
    private LocalDate startDate;

    @NotNull(message = "EMI enabled flag is required")
    private Boolean emiEnabled;

    @Min(value = 1, message = "EMI months must be at least 1 if EMI is enabled")
    private Integer emiMonths;

    // Constructors

    public CreateMembershipRequest() {
    }

    public CreateMembershipRequest(Integer planId, LocalDate startDate, Boolean emiEnabled, Integer emiMonths) {
        this.planId = planId;
        this.startDate = startDate;
        this.emiEnabled = emiEnabled;
        this.emiMonths = emiMonths;
    }

    // Getters and Setters

    public Integer getPlanId() {
        return planId;
    }

    public void setPlanId(Integer planId) {
        this.planId = planId;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
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
}
