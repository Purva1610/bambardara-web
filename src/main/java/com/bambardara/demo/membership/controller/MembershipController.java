package com.bambardara.demo.membership.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bambardara.demo.auth.entity.User;
import com.bambardara.demo.membership.dto.CreateMembershipRequest;
import com.bambardara.demo.membership.dto.MembershipResponse;
import com.bambardara.demo.membership.service.MembershipService;

import jakarta.validation.Valid;

/**
 * User API for membership purchase and management.
 * 
 * Requires authentication (Spring Security).
 * User can only access their own memberships.
 */
@RestController
@RequestMapping("/api/memberships")
public class MembershipController {

    private final MembershipService membershipService;

    public MembershipController(MembershipService membershipService) {
        this.membershipService = membershipService;
    }

    /**
     * Create membership (purchase).
     * 
     * POST /api/memberships
     * 
     * User identity comes from @AuthenticationPrincipal User (see SecurityConfig).
     * NEVER trust userId from request body.
     * 
     * Request body:
     * {
     *   "planId": 2,
     *   "startDate": "2026-09-01",
     *   "emiEnabled": true,
     *   "emiMonths": 12
     * }
     * 
     * Response:
     * - 201 Created with membership details
     * - Membership number generated automatically (MEM-2026-00001)
     * - Status: PENDING (awaiting payment/admin confirmation)
     * - End date calculated from start date + plan duration
     * - Purchase amount locked at current plan price
     * - EMI amount calculated if enabled
     * 
     * @param user authenticated user (see SecurityConfig)
     * @param request membership creation request
     * @return created membership details
     */
    @PostMapping
    public ResponseEntity<MembershipResponse> createMembership(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody CreateMembershipRequest request) {

        MembershipResponse membership = membershipService.createMembership(request, user);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(membership);
    }

    /**
     * Get authenticated user's memberships.
     * 
     * GET /api/memberships/my
     * 
     * Returns all memberships owned by the authenticated user.
     * Ordered by creation date (newest first).
     * 
     * @param user authenticated user
     * @return list of user's memberships
     */
    @GetMapping("/my")
    public ResponseEntity<List<MembershipResponse>> getMyMemberships(
            @AuthenticationPrincipal User user) {

        List<MembershipResponse> memberships = membershipService.getUserMemberships(user.getId());
        return ResponseEntity.ok(memberships);
    }

    /**
     * Get specific membership by ID.
     * 
     * GET /api/memberships/{id}
     * 
     * Validates ownership: user can only access their own memberships.
     * Returns 403 Forbidden if membership belongs to another user.
     * 
     * @param id membership ID
     * @param user authenticated user
     * @return membership details
     */
    @GetMapping("/{id}")
    public ResponseEntity<MembershipResponse> getMembershipById(
            @PathVariable Integer id,
            @AuthenticationPrincipal User user) {

        MembershipResponse membership = membershipService.getMembershipById(id, user.getId());
        return ResponseEntity.ok(membership);
    }
}
