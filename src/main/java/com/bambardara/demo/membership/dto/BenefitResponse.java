package com.bambardara.demo.membership.dto;

import com.bambardara.demo.membership.entity.BenefitType;

/**
 * Response DTO for membership plan benefit.
 * 
 * Used in MembershipPlanResponse to show benefit details.
 */
public class BenefitResponse {

    private Integer id;
    private BenefitType type;
    private String description;

    // Constructors

    public BenefitResponse() {
    }

    public BenefitResponse(Integer id, BenefitType type, String description) {
        this.id = id;
        this.type = type;
        this.description = description;
    }

    // Getters and Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public BenefitType getType() {
        return type;
    }

    public void setType(BenefitType type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
