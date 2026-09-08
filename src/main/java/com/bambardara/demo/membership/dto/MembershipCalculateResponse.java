package com.bambardara.demo.membership.dto;

import java.math.BigDecimal;

/**
 * Response DTO for membership calculator.
 * 
 * Provides EMI breakdown and cost analysis.
 * NO interest rate applied (client hasn't specified).
 * Simple calculation: emiAmount = totalPrice / emiMonths
 * 
 * Example response:
 * {
 *   "planId": 2,
 *   "planName": "Premium 15-Year Plan",
 *   "totalPrice": 240000.00,
 *   "emiMonths": 12,
 *   "emiAmount": 20000.00,
 *   "pricePerYear": 16000.00,
 *   "pricePerDay": 43.84
 * }
 */
public class MembershipCalculateResponse {

    private Integer planId;
    private String planName;
    private BigDecimal totalPrice;
    private Integer emiMonths;
    private BigDecimal emiAmount;
    private BigDecimal pricePerYear;
    private BigDecimal pricePerDay;

    // Constructors

    public MembershipCalculateResponse() {
    }

    public MembershipCalculateResponse(Integer planId, String planName, BigDecimal totalPrice,
                                      Integer emiMonths, BigDecimal emiAmount,
                                      BigDecimal pricePerYear, BigDecimal pricePerDay) {
        this.planId = planId;
        this.planName = planName;
        this.totalPrice = totalPrice;
        this.emiMonths = emiMonths;
        this.emiAmount = emiAmount;
        this.pricePerYear = pricePerYear;
        this.pricePerDay = pricePerDay;
    }

    // Getters and Setters

    public Integer getPlanId() {
        return planId;
    }

    public void setPlanId(Integer planId) {
        this.planId = planId;
    }

    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
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

    public BigDecimal getPricePerYear() {
        return pricePerYear;
    }

    public void setPricePerYear(BigDecimal pricePerYear) {
        this.pricePerYear = pricePerYear;
    }

    public BigDecimal getPricePerDay() {
        return pricePerDay;
    }

    public void setPricePerDay(BigDecimal pricePerDay) {
        this.pricePerDay = pricePerDay;
    }
}
