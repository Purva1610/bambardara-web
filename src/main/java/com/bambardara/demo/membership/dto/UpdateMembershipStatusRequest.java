package com.bambardara.demo.membership.dto;

import com.bambardara.demo.membership.entity.MembershipStatus;

import jakarta.validation.constraints.NotNull;

/**
 * Request DTO for updating membership status (admin only).
 * 
 * Valid transitions:
 * - PENDING → ACTIVE, CANCELLED
 * - ACTIVE → EXPIRED, CANCELLED
 * - EXPIRED, CANCELLED → (no transitions, terminal states)
 * 
 * Example request:
 * {
 *   "status": "ACTIVE"
 * }
 */
public class UpdateMembershipStatusRequest {

    @NotNull(message = "Status is required")
    private MembershipStatus status;

    // Constructors

    public UpdateMembershipStatusRequest() {
    }

    public UpdateMembershipStatusRequest(MembershipStatus status) {
        this.status = status;
    }

    // Getters and Setters

    public MembershipStatus getStatus() {
        return status;
    }

    public void setStatus(MembershipStatus status) {
        this.status = status;
    }
}
