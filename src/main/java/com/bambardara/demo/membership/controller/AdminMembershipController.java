package com.bambardara.demo.membership.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bambardara.demo.membership.dto.MembershipResponse;
import com.bambardara.demo.membership.dto.UpdateMembershipStatusRequest;
import com.bambardara.demo.membership.entity.MembershipStatus;
import com.bambardara.demo.membership.service.MembershipService;

import jakarta.validation.Valid;

/**
 * Admin API for managing user memberships.
 * 
 * Access: ADMIN role only.
 * 
 * Admins can:
 * - View all memberships
 * - Filter by status
 * - Update membership status
 * - View statistics
 */
@RestController
@RequestMapping("/api/admin/memberships")
@PreAuthorize("hasRole('ADMIN')")
public class AdminMembershipController {

    private final MembershipService membershipService;

    public AdminMembershipController(MembershipService membershipService) {
        this.membershipService = membershipService;
    }

    /**
     * Get all memberships with optional status filter.
     * 
     * GET /api/admin/memberships
     * GET /api/admin/memberships?status=ACTIVE
     * GET /api/admin/memberships?status=PENDING
     * 
     * Returns all memberships for admin dashboard.
     * Optional query param to filter by status.
     * 
     * @param status optional status filter
     * @return list of memberships
     */
    @GetMapping
    public ResponseEntity<List<MembershipResponse>> getAllMemberships(
            @RequestParam(required = false) MembershipStatus status) {

        if (status != null) {
            List<MembershipResponse> memberships = membershipService.getMembershipsByStatus(status);
            return ResponseEntity.ok(memberships);
        }

        List<MembershipResponse> memberships = membershipService.getAllMemberships();
        return ResponseEntity.ok(memberships);
    }

    /**
     * Get specific membership by ID.
     * 
     * GET /api/admin/memberships/{id}
     * 
     * No ownership check (admin can view any membership).
     * 
     * @param id membership ID
     * @return membership details
     */
    @GetMapping("/{id}")
    public ResponseEntity<MembershipResponse> getMembershipById(@PathVariable Integer id) {
        MembershipResponse membership = membershipService.getMembershipByIdAdmin(id);
        return ResponseEntity.ok(membership);
    }

    /**
     * Update membership status.
     * 
     * PATCH /api/admin/memberships/{id}/status
     * 
     * Admin can transition membership status:
     * - PENDING → ACTIVE (payment confirmed)
     * - PENDING → CANCELLED (rejected/cancelled before activation)
     * - ACTIVE → EXPIRED (membership period ended)
     * - ACTIVE → CANCELLED (admin cancels active membership)
     * 
     * Terminal states (EXPIRED, CANCELLED) cannot transition.
     * 
     * Request body:
     * {
     *   "status": "ACTIVE"
     * }
     * 
     * @param id membership ID
     * @param request status update request
     * @return updated membership
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<MembershipResponse> updateMembershipStatus(
            @PathVariable Integer id,
            @Valid @RequestBody UpdateMembershipStatusRequest request) {

        MembershipResponse membership = membershipService.updateMembershipStatus(id, request);
        return ResponseEntity.ok(membership);
    }

    /**
     * Get membership count by status.
     * 
     * GET /api/admin/memberships/count?status=ACTIVE
     * 
     * Used for admin dashboard statistics:
     * - Total active memberships
     * - Pending memberships (awaiting confirmation)
     * - Expired memberships
     * - Cancelled memberships
     * 
     * @param status membership status
     * @return count of memberships
     */
    @GetMapping("/count")
    public ResponseEntity<Long> getMembershipCountByStatus(
            @RequestParam MembershipStatus status) {

        long count = membershipService.countMembershipsByStatus(status);
        return ResponseEntity.ok(count);
    }
}
