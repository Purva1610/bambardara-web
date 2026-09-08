package com.bambardara.demo.membership.entity;

/**
 * Status of a membership throughout its lifecycle.
 * 
 * Status transition rules:
 * - PENDING → ACTIVE (payment confirmed, membership activated)
 * - PENDING → CANCELLED (user/admin cancels before activation)
 * - ACTIVE → EXPIRED (end date reached)
 * - ACTIVE → CANCELLED (admin cancels active membership)
 * - EXPIRED → (terminal, no further transitions)
 * - CANCELLED → (terminal, no further transitions)
 */
public enum MembershipStatus {
    /**
     * Initial status when membership is created.
     * Awaiting payment confirmation or admin approval.
     */
    PENDING,
    
    /**
     * Membership is active and user can avail benefits.
     * Valid from start_date to end_date.
     */
    ACTIVE,
    
    /**
     * Membership has expired (past end_date).
     * Terminal state - user needs to renew/purchase new membership.
     */
    EXPIRED,
    
    /**
     * Membership has been cancelled by user or admin.
     * Terminal state - no further changes allowed.
     */
    CANCELLED
}
