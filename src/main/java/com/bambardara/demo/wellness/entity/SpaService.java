package com.bambardara.demo.wellness.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

/**
 * Spa service/massage offering entity.
 * 
 * Represents different massage services available at Bambardara Wellness Center.
 * Each service has a category (COMMON_SPA or TRADITIONAL) and specific type.
 * 
 * VALIDATION: massageType must match massageCategory (enforced by MassageType enum).
 */
@Entity
@Table(name = "spa_services")
public class SpaService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name = "massage_category", nullable = false, length = 20)
    private MassageCategory massageCategory;

    @Enumerated(EnumType.STRING)
    @Column(name = "massage_type", nullable = false, unique = true, length = 30)
    private MassageType massageType;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "price_per_session", nullable = false, precision = 10, scale = 2)
    private BigDecimal pricePerSession;

    @Column(name = "duration_minutes", nullable = false)
    private Integer durationMinutes;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public SpaService() {
    }

    public SpaService(
            MassageType massageType,
            String name,
            String description,
            BigDecimal pricePerSession,
            Integer durationMinutes) {
        this.massageType = massageType;
        this.massageCategory = massageType.getCategory(); // Auto-set from type
        this.name = name;
        this.description = description;
        this.pricePerSession = pricePerSession;
        this.durationMinutes = durationMinutes;
        this.isActive = true;
    }

    @PrePersist
    void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (updatedAt == null) {
            updatedAt = LocalDateTime.now();
        }
        if (isActive == null) {
            isActive = true;
        }
        // Ensure category matches type
        if (massageType != null && massageCategory != massageType.getCategory()) {
            massageCategory = massageType.getCategory();
        }
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
        // Auto-update category when type changes
        if (massageType != null) {
            this.massageCategory = massageType.getCategory();
        }
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
