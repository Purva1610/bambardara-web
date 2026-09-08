package com.bambardara.demo.membership.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

/**
 * Request DTO for membership calculator (optional feature).
 * 
 * Used to calculate EMI breakdown without creating actual membership.
 * Client hasn't specified interest rate, so calculation is simple division.
 * 
 * Example request:
 * {
 *   "planId": 2,
 *   "emiMonths": 12
 * }
 */
public class MembershipCalculateRequest {

    @NotNull(message = "Plan ID is required")
    private Integer planId;

    @NotNull(message = "EMI months is required")
    @Min(value = 1, message = "EMI months must be at least 1")
    private Integer emiMonths;

    // Constructors

    public MembershipCalculateRequest() {
    }

    public MembershipCalculateRequest(Integer planId, Integer emiMonths) {
        this.planId = planId;
        this.emiMonths = emiMonths;
    }

    // Getters and Setters

    public Integer getPlanId() {
        return planId;
    }

    public void setPlanId(Integer planId) {
        this.planId = planId;
    }

    public Integer getEmiMonths() {
        return emiMonths;
    }

    public void setEmiMonths(Integer emiMonths) {
        this.emiMonths = emiMonths;
    }
}
