package com.bambardara.demo.membership.dto;

import java.math.BigDecimal;
import java.util.List;

import com.bambardara.demo.membership.entity.BenefitType;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

/**
 * Request DTO for creating or updating a membership plan.
 * 
 * Used by admin to configure the 3 membership plans in the database.
 * Example:
 * {
 *   "name": "Premium 15-Year Plan",
 *   "price": 240000.00,
 *   "durationYears": 15,
 *   "stayDays": 15,
 *   "familySize": null,
 *   "description": "15 years of luxury benefits...",
 *   "benefits": ["STAY", "WATER_PARK", "SPA", "GYM", "HORSE_RIDING", "FISHING", "ALL_ACTIVITIES", "LUXURY_BENEFITS"],
 *   "isActive": true
 * }
 */
public class MembershipPlanRequest {

    @NotBlank(message = "Plan name is required")
    @Size(max = 100, message = "Name must not exceed 100 characters")
    private String name;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private BigDecimal price;

    @NotNull(message = "Duration in years is required")
    @Min(value = 1, message = "Duration must be at least 1 year")
    private Integer durationYears;

    @NotNull(message = "Stay days is required")
    @Min(value = 1, message = "Stay days must be at least 1")
    private Integer stayDays;

    @Min(value = 1, message = "Family size must be at least 1 if specified")
    private Integer familySize;

    private String description;

    @NotEmpty(message = "At least one benefit is required")
    private List<BenefitType> benefits;

    @NotNull(message = "Active status is required")
    private Boolean isActive;

    // Constructors

    public MembershipPlanRequest() {
    }

    public MembershipPlanRequest(String name, BigDecimal price, Integer durationYears,
                                 Integer stayDays, Integer familySize, String description,
                                 List<BenefitType> benefits, Boolean isActive) {
        this.name = name;
        this.price = price;
        this.durationYears = durationYears;
        this.stayDays = stayDays;
        this.familySize = familySize;
        this.description = description;
        this.benefits = benefits;
        this.isActive = isActive;
    }

    // Getters and Setters

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getDurationYears() {
        return durationYears;
    }

    public void setDurationYears(Integer durationYears) {
        this.durationYears = durationYears;
    }

    public Integer getStayDays() {
        return stayDays;
    }

    public void setStayDays(Integer stayDays) {
        this.stayDays = stayDays;
    }

    public Integer getFamilySize() {
        return familySize;
    }

    public void setFamilySize(Integer familySize) {
        this.familySize = familySize;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<BenefitType> getBenefits() {
        return benefits;
    }

    public void setBenefits(List<BenefitType> benefits) {
        this.benefits = benefits;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
}
