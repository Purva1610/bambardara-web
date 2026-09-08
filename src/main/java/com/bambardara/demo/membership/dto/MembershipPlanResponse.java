package com.bambardara.demo.membership.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Response DTO for membership plan with benefits.
 * 
 * Used for:
 * - Public plan browsing (GET /api/memberships/plans)
 * - Admin plan management
 * - Plan comparison
 */
public class MembershipPlanResponse {

    private Integer id;
    private String name;
    private BigDecimal price;
    private Integer durationYears;
    private Integer stayDays;
    private Integer familySize;
    private String description;
    private List<BenefitResponse> benefits;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructors

    public MembershipPlanResponse() {
    }

    public MembershipPlanResponse(Integer id, String name, BigDecimal price, Integer durationYears,
                                  Integer stayDays, Integer familySize, String description,
                                  List<BenefitResponse> benefits, Boolean isActive,
                                  LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.durationYears = durationYears;
        this.stayDays = stayDays;
        this.familySize = familySize;
        this.description = description;
        this.benefits = benefits;
        this.isActive = isActive;
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

    public List<BenefitResponse> getBenefits() {
        return benefits;
    }

    public void setBenefits(List<BenefitResponse> benefits) {
        this.benefits = benefits;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
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
