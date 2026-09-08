 package com.bambardara.demo.membership.entity;

/**
 * Types of benefits that can be included in a membership plan.
 * 
 * Based on client-specified benefits across 3 membership tiers:
 * - Plan 1: STAY, SAFARI, AGRO_ACTIVITIES
 * - Plan 2: STAY, WATER_PARK, SPA, GYM, HORSE_RIDING, FISHING, ALL_ACTIVITIES, LUXURY_BENEFITS
 * - Plan 3: VIP, PREMIUM_BENEFITS (lifetime luxury experience)
 */
public enum BenefitType {
    /**
     * Accommodation stay benefits.
     * Plan 1: 10 days, Plan 2: 15 days, Plan 3: VIP stay
     */
    STAY,
    
    /**
     * Safari experience.
     * Included in Plan 1, 2, 3 (via ALL_ACTIVITIES)
     */
    SAFARI,
    
    /**
     * Agro-tourism activities (farm visits, dairy, organic farming).
     * Included in Plan 1, 2, 3 (via ALL_ACTIVITIES)
     */
    AGRO_ACTIVITIES,
    
    /**
     * Water park access.
     * Included in Plan 2, 3
     */
    WATER_PARK,
    
    /**
     * Spa and wellness services.
     * Included in Plan 2, 3
     */
    SPA,
    
    /**
     * Gym and fitness facilities.
     * Included in Plan 2, 3
     */
    GYM,
    
    /**
     * Horse riding activities.
     * Included in Plan 2, 3 (via ALL_ACTIVITIES)
     */
    HORSE_RIDING,
    
    /**
     * Fishing activities.
     * Included in Plan 2, 3 (via ALL_ACTIVITIES)
     */
    FISHING,
    
    /**
     * Access to all adventure and recreational activities.
     * Included in Plan 2, 3
     */
    ALL_ACTIVITIES,
    
    /**
     * VIP membership privileges.
     * Exclusive to Plan 3 (30-year VIP membership)
     */
    VIP,
    
    /**
     * Premium benefits package.
     * Included in Plan 3
     */
    PREMIUM_BENEFITS,
    
    /**
     * Luxury benefits and experiences.
     * Included in Plan 2, 3
     */
    LUXURY_BENEFITS
}
