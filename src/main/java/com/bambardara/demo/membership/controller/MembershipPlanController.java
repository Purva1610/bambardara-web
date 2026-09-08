package com.bambardara.demo.membership.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bambardara.demo.membership.dto.MembershipCalculateRequest;
import com.bambardara.demo.membership.dto.MembershipCalculateResponse;
import com.bambardara.demo.membership.dto.MembershipPlanResponse;
import com.bambardara.demo.membership.service.MembershipPlanService;

import jakarta.validation.Valid;

/**
 * Public/User API for browsing membership plans.
 * 
 * No authentication required for browsing plans.
 * Provides plan comparison and EMI calculator.
 */
@RestController
@RequestMapping("/api/memberships/plans")
public class MembershipPlanController {

    private final MembershipPlanService planService;

    public MembershipPlanController(MembershipPlanService planService) {
        this.planService = planService;
    }

    /**
     * Get all active membership plans.
     * 
     * GET /api/memberships/plans
     * 
     * Used for:
     * - Public plan browsing
     * - Plan comparison
     * - Homepage display
     * 
     * @return list of active plans with benefits
     */
    @GetMapping
    public ResponseEntity<List<MembershipPlanResponse>> getActivePlans() {
        List<MembershipPlanResponse> plans = planService.getActivePlans();
        return ResponseEntity.ok(plans);
    }

    /**
     * Get specific plan details by ID.
     * 
     * GET /api/memberships/plans/{id}
     * 
     * Used for plan detail page with full benefit list.
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
     * Calculate membership EMI breakdown.
     * 
     * POST /api/memberships/calculate
     * 
     * Optional feature for membership calculator.
     * Client can use this or calculate on frontend.
     * 
     * Request body:
     * {
     *   "planId": 2,
     *   "emiMonths": 12
     * }
     * 
     * Response:
     * {
     *   "planId": 2,
     *   "planName": "Premium 15-Year Plan",
     *   "totalPrice": 240000.00,
     *   "emiMonths": 12,
     *   "emiAmount": 20000.00,
     *   "pricePerYear": 16000.00,
     *   "pricePerDay": 43.84
     * }
     * 
     * @param request calculation request
     * @return EMI breakdown
     */
    @PostMapping("/calculate")
    public ResponseEntity<MembershipCalculateResponse> calculateEmi(
            @Valid @RequestBody MembershipCalculateRequest request) {
        
        MembershipCalculateResponse response = planService.calculateEmi(request);
        return ResponseEntity.ok(response);
    }
}
