package com.bambardara.demo.wellness.dto;

import java.math.BigDecimal;

import com.bambardara.demo.wellness.entity.MassageCategory;
import com.bambardara.demo.wellness.entity.MassageType;

/**
 * Response DTO for spa service (public view).
 */
public class SpaServiceResponse {

    private Integer id;
    private MassageCategory massageCategory;
    private MassageType massageType;
    private String name;
    private String description;
    private BigDecimal pricePerSession;
    private Integer durationMinutes;
    private Boolean isActive;

    public SpaServiceResponse() {
    }

    // Getters and Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public MassageCategory getMassageCategory() {
        return massageCategory;
    }

    public void setMassageCategory(MassageCategory massageCategory) {
        this.massageCategory = massageCategory;
    }

    public MassageType getMassageType() {
        return massageType;
    }

    public void setMassageType(MassageType massageType) {
        this.massageType = massageType;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPricePerSession() {
        return pricePerSession;
    }

    public void setPricePerSession(BigDecimal pricePerSession) {
        this.pricePerSession = pricePerSession;
    }

    public Integer getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
}
