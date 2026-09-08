package com.bambardara.demo.adventure.dto;

import java.math.BigDecimal;

import com.bambardara.demo.adventure.entity.ActivityType;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * Request DTO for creating/updating an adventure activity (Admin only).
 */
public class CreateAdventureActivityRequest {

    @NotNull(message = "Activity type is required")
    private ActivityType activityType;

    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name must not exceed 100 characters")
    private String name;

    private String description;

    @NotNull(message = "Price per person is required")
    @Min(value = 0, message = "Price must be non-negative")
    private BigDecimal pricePerPerson;

    @NotNull(message = "Minimum participants is required")
    @Min(value = 1, message = "Minimum participants must be at least 1")
    private Integer minParticipants;

    @NotNull(message = "Maximum participants is required")
    @Min(value = 1, message = "Maximum participants must be at least 1")
    private Integer maxParticipants;

    @NotNull(message = "Duration is required")
    @Min(value = 30, message = "Duration must be at least 30 minutes")
    private Integer durationMinutes;

    private Integer minAge;
    private Integer maxAge;

    @Size(max = 20, message = "Difficulty level must not exceed 20 characters")
    private String difficultyLevel;

    private String safetyRequirements;
    private String equipmentProvided;

    private Boolean isActive = true;

    // Getters and Setters

    public ActivityType getActivityType() {
        return activityType;
    }

    public void setActivityType(ActivityType activityType) {
        this.activityType = activityType;
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

    public BigDecimal getPricePerPerson() {
        return pricePerPerson;
    }

    public void setPricePerPerson(BigDecimal pricePerPerson) {
        this.pricePerPerson = pricePerPerson;
    }

    public Integer getMinParticipants() {
        return minParticipants;
    }

    public void setMinParticipants(Integer minParticipants) {
        this.minParticipants = minParticipants;
    }

    public Integer getMaxParticipants() {
        return maxParticipants;
    }

    public void setMaxParticipants(Integer maxParticipants) {
        this.maxParticipants = maxParticipants;
    }

    public Integer getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public Integer getMinAge() {
        return minAge;
    }

    public void setMinAge(Integer minAge) {
        this.minAge = minAge;
    }

    public Integer getMaxAge() {
        return maxAge;
    }

    public void setMaxAge(Integer maxAge) {
        this.maxAge = maxAge;
    }

    public String getDifficultyLevel() {
        return difficultyLevel;
    }

    public void setDifficultyLevel(String difficultyLevel) {
        this.difficultyLevel = difficultyLevel;
    }

    public String getSafetyRequirements() {
        return safetyRequirements;
    }

    public void setSafetyRequirements(String safetyRequirements) {
        this.safetyRequirements = safetyRequirements;
    }

    public String getEquipmentProvided() {
        return equipmentProvided;
    }

    public void setEquipmentProvided(String equipmentProvided) {
        this.equipmentProvided = equipmentProvided;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
}
