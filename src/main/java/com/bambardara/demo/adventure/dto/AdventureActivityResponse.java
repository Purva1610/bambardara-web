package com.bambardara.demo.adventure.dto;

import java.math.BigDecimal;

import com.bambardara.demo.adventure.entity.ActivityType;

/**
 * Response DTO for adventure activity information.
 */
public class AdventureActivityResponse {

    private Integer id;
    private ActivityType activityType;
    private String name;
    private String description;
    private BigDecimal pricePerPerson;
    private Integer minParticipants;
    private Integer maxParticipants;
    private Integer durationMinutes;
    private Integer minAge;
    private Integer maxAge;
    private String difficultyLevel;
    private String safetyRequirements;
    private String equipmentProvided;
    private Boolean isActive;

    // Getters and Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

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
