package com.bambardara.demo.membership.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

/**
 * Entity representing a membership plan offered at Bambardara Estate.
 * 
 * Plans are configurable by admins and stored in the database.
 * Client specified 3 plans:
 * - Plan 1: ₹1,20,000 / 6 years / 10 days stay / Family of 4
 * - Plan 2: ₹2,40,000 / 15 years / 15 days stay / Luxury benefits
 * - Plan 3: ₹5,00,000 / 30 years / VIP membership / Premium benefits
 * 
 * Each plan has configurable benefits (separate entity).
 */
@Entity
@Table(name = "membership_plans")
public class MembershipPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "duration_years", nullable = false)
    private Integer durationYears;

    @Column(name = "stay_days", nullable = false)
    private Integer stayDays;

    @Column(name = "family_size")
    private Integer familySize;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @OneToMany(mappedBy = "plan", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MembershipBenefit> benefits = new ArrayList<>();

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Constructors

    public MembershipPlan() {
    }

    public MembershipPlan(String name, BigDecimal price, Integer durationYears, Integer stayDays, 
                          Integer familySize, String description, Boolean isActive) {
        this.name = name;
        this.price = price;
        this.durationYears = durationYears;
        this.stayDays = stayDays;
        this.familySize = familySize;
        this.description = description;
        this.isActive = isActive;
    }

    // Helper methods for bidirectional relationship

    public void addBenefit(MembershipBenefit benefit) {
        benefits.add(benefit);
        benefit.setPlan(this);
    }

    public void removeBenefit(MembershipBenefit benefit) {
        benefits.remove(benefit);
        benefit.setPlan(null);
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

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public List<MembershipBenefit> getBenefits() {
        return benefits;
    }

    public void setBenefits(List<MembershipBenefit> benefits) {
        this.benefits = benefits;
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
