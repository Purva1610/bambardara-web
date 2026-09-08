package com.bambardara.demo.membership.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bambardara.demo.membership.dto.MembershipPlanRequest;
import com.bambardara.demo.membership.dto.MembershipPlanResponse;
import com.bambardara.demo.membership.service.MembershipPlanService;

import jakarta.validation.Valid;

/**
 * Admin API for managing membership plans.
 * 
 * Access: ADMIN role only.
 * 
 * Admins can:
 * - Create/update/delete plans
 * - Configure benefits
 * - Activate/deactivate plans
 * - View all plans including inactive
 */
@RestController
@RequestMapping("/api/admin/memberships/plans")
@PreAuthorize("hasRole('ADMIN')")
public class AdminMembershipPlanController {

    private final MembershipPlanService planService;

    public AdminMembershipPlanController(MembershipPlanService planService) {
        this.planService = planService;
    }

    /**
     * Get all membership plans including inactive.
     * 
     * GET /api/admin/memberships/plans
     * 
     * Returns all plans (active and inactive) for admin management.
     * 
     * @return list of all plans with benefits
     */
    @GetMapping
    public ResponseEntity<List<MembershipPlanResponse>> getAllPlans() {
        List<MembershipPlanResponse> plans = planService.getAllPlans();
        return ResponseEntity.ok(plans);
    }

    /**
     * Get specific plan by ID.
     * 
     * GET /api/admin/memberships/plans/{id}
     * 
     * @param id plan ID
     * @return plan details with benefits
     */
    @GetMapping("/{id}")
    public ResponseEntity<MembershipPlanResponse> getPlanById(@PathVariable Integer id) {
        MembershipPlanResponse plan = planService.getPlanById(id);
        return ResponseEntity.ok(plan);
    }

    /**
     * Create new membership plan.
     * 
     * POST /api/admin/memberships/plans
     * 
     * Admin creates one of the 3 client-specified plans:
     * 
     * Plan 1 Example:
     * {
     *   "name": "Classic 6-Year Plan",
     *   "price": 120000.00,
     *   "durationYears": 6,
     *   "stayDays": 10,
     *   "familySize": 4,
     *   "description": "Perfect for families...",
     *   "benefits": ["STAY", "SAFARI", "AGRO_ACTIVITIES"],
     *   "isActive": true
     * }
     * 
     * Plan 2 Example:
     * {
     *   "name": "Premium 15-Year Plan",
     *   "price": 240000.00,
     *   "durationYears": 15,
     *   "stayDays": 15,
     *   "familySize": null,
     *   "description": "15 years of luxury benefits...",
     *   "benefits": ["STAY", "WATER_PARK", "SPA", "GYM", "HORSE_RIDING", "FISHING", "ALL_ACTIVITIES", "LUXURY_BENEFITS"],
     *   "isActive": true
     * }
     * 
     * Plan 3 Example:
     * {
     *   "name": "VIP 30-Year Membership",
     *   "price": 500000.00,
     *   "durationYears": 30,
     *   "stayDays": 999,
     *   "familySize": null,
     *   "description": "Lifetime luxury experience...",
     *   "benefits": ["STAY", "VIP", "PREMIUM_BENEFITS", "ALL_ACTIVITIES", "WATER_PARK", "SPA", "GYM", "LUXURY_BENEFITS"],
     *   "isActive": true
     * }
     * 
     * @param request plan creation request
     * @return created plan with benefits
     */
    @PostMapping
    public ResponseEntity<MembershipPlanResponse> createPlan(
            @Valid @RequestBody MembershipPlanRequest request) {

        MembershipPlanResponse plan = planService.createPlan(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(plan);
    }

    /**
     * Update membership plan.
     * 
     * PUT /api/admin/memberships/plans/{id}
     * 
     * Updates plan details and benefits.
     * Benefits are replaced (not merged).
     * 
     * @param id plan ID
     * @param request plan update request
     * @return updated plan
     */
    @PutMapping("/{id}")
    public ResponseEntity<MembershipPlanResponse> updatePlan(
            @PathVariable Integer id,
            @Valid @RequestBody MembershipPlanRequest request) {

        MembershipPlanResponse plan = planService.updatePlan(id, request);
        return ResponseEntity.ok(plan);
    }

    /**
     * Delete membership plan (soft delete).
     * 
     * DELETE /api/admin/memberships/plans/{id}
     * 
     * Sets isActive to false.
     * Plan is hidden from public but existing memberships are preserved.
     * 
     * @param id plan ID
     * @return no content
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlan(@PathVariable Integer id) {
        planService.deletePlan(id);
        return ResponseEntity.noContent().build();
    }
}
