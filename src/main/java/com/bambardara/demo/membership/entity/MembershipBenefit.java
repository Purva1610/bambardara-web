package com.bambardara.demo.membership.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

/**
 * Entity representing a benefit associated with a membership plan.
 * 
 * Benefits are configurable and avoid boolean explosion pattern.
 * Instead of: hasSpa, hasGym, hasFishing, etc.
 * We use: benefitType enum with plan-to-benefit relationship.
 * 
 * Example benefits:
 * - STAY, SAFARI, AGRO_ACTIVITIES (Plan 1)
 * - WATER_PARK, SPA, GYM, HORSE_RIDING, FISHING (Plan 2)
 * - VIP, PREMIUM_BENEFITS (Plan 3)
 */
@Entity
@Table(name = "membership_plan_benefits", 
       uniqueConstraints = @UniqueConstraint(columnNames = {"plan_id", "benefit_type"}))
public class MembershipBenefit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plan_id", nullable = false)
    private MembershipPlan plan;

    @Enumerated(EnumType.STRING)
    @Column(name = "benefit_type", nullable = false, length = 30)
    private BenefitType benefitType;

    @Column(columnDefinition = "TEXT")
    private String description;

    // Constructors

    public MembershipBenefit() {
    }

    public MembershipBenefit(BenefitType benefitType, String description) {
        this.benefitType = benefitType;
        this.description = description;
    }

    public MembershipBenefit(MembershipPlan plan, BenefitType benefitType, String description) {
        this.plan = plan;
        this.benefitType = benefitType;
        this.description = description;
    }

    // Getters and Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public MembershipPlan getPlan() {
        return plan;
    }

    public void setPlan(MembershipPlan plan) {
        this.plan = plan;
    }

    public BenefitType getBenefitType() {
        return benefitType;
    }

    public void setBenefitType(BenefitType benefitType) {
        this.benefitType = benefitType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof MembershipBenefit)) return false;
        MembershipBenefit that = (MembershipBenefit) o;
        return benefitType == that.benefitType;
    }

    @Override
    public int hashCode() {
        return benefitType != null ? benefitType.hashCode() : 0;
    }
}
