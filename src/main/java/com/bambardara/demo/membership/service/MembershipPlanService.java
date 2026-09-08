package com.bambardara.demo.membership.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bambardara.demo.membership.dto.BenefitResponse;
import com.bambardara.demo.membership.dto.MembershipCalculateRequest;
import com.bambardara.demo.membership.dto.MembershipCalculateResponse;
import com.bambardara.demo.membership.dto.MembershipPlanRequest;
import com.bambardara.demo.membership.dto.MembershipPlanResponse;
import com.bambardara.demo.membership.entity.BenefitType;
import com.bambardara.demo.membership.entity.MembershipBenefit;
import com.bambardara.demo.membership.entity.MembershipPlan;
import com.bambardara.demo.membership.exception.MembershipPlanNotFoundException;
import com.bambardara.demo.membership.exception.PlanNotActiveException;
import com.bambardara.demo.membership.repository.MembershipBenefitRepository;
import com.bambardara.demo.membership.repository.MembershipPlanRepository;

/**
 * Service for managing membership plans.
 * 
 * Handles:
 * - Plan CRUD operations (admin)
 * - Plan browsing (public/user)
 * - Benefit management
 * - Membership calculator (EMI breakdown)
 */
@Service
public class MembershipPlanService {

    private final MembershipPlanRepository planRepository;
    private final MembershipBenefitRepository benefitRepository;

    public MembershipPlanService(MembershipPlanRepository planRepository,
                                 MembershipBenefitRepository benefitRepository) {
        this.planRepository = planRepository;
        this.benefitRepository = benefitRepository;
    }

    // ========== Public/User APIs ==========

    /**
     * Get all active plans (public API).
     */
    @Transactional(readOnly = true)
    public List<MembershipPlanResponse> getActivePlans() {
        List<MembershipPlan> plans = planRepository.findActiveWithBenefits();
        return plans.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get plan by ID (public API).
     */
    @Transactional(readOnly = true)
    public MembershipPlanResponse getPlanById(Integer id) {
        MembershipPlan plan = planRepository.findByIdWithBenefits(id)
                .orElseThrow(() -> new MembershipPlanNotFoundException("Plan not found with ID: " + id));
        return toResponse(plan);
    }

    /**
     * Get active plan by ID (for purchase validation).
     */
    @Transactional(readOnly = true)
    public MembershipPlan getActivePlanEntity(Integer id) {
        MembershipPlan plan = planRepository.findByIdAndIsActiveTrue(id)
                .orElseThrow(() -> new PlanNotActiveException("Plan is not active or does not exist: " + id));
        return plan;
    }

    /**
     * Calculate EMI breakdown (optional feature).
     * Simple division without interest rate (not specified by client).
     */
    @Transactional(readOnly = true)
    public MembershipCalculateResponse calculateEmi(MembershipCalculateRequest request) {
        MembershipPlan plan = planRepository.findByIdAndIsActiveTrue(request.getPlanId())
                .orElseThrow(() -> new PlanNotActiveException("Plan is not active or does not exist: " + request.getPlanId()));

        BigDecimal totalPrice = plan.getPrice();
        Integer emiMonths = request.getEmiMonths();
        Integer durationYears = plan.getDurationYears();

        // Simple EMI calculation (no interest)
        BigDecimal emiAmount = totalPrice.divide(
                BigDecimal.valueOf(emiMonths), 
                2, 
                RoundingMode.HALF_UP
        );

        // Calculate per-year cost
        BigDecimal pricePerYear = totalPrice.divide(
                BigDecimal.valueOf(durationYears), 
                2, 
                RoundingMode.HALF_UP
        );

        // Calculate per-day cost (365 days * years)
        BigDecimal totalDays = BigDecimal.valueOf(durationYears).multiply(BigDecimal.valueOf(365));
        BigDecimal pricePerDay = totalPrice.divide(totalDays, 2, RoundingMode.HALF_UP);

        return new MembershipCalculateResponse(
                plan.getId(),
                plan.getName(),
                totalPrice,
                emiMonths,
                emiAmount,
                pricePerYear,
                pricePerDay
        );
    }

    // ========== Admin APIs ==========

    /**
     * Get all plans including inactive (admin).
     */
    @Transactional(readOnly = true)
    public List<MembershipPlanResponse> getAllPlans() {
        List<MembershipPlan> plans = planRepository.findAllWithBenefits();
        return plans.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Create new membership plan (admin).
     */
    @Transactional
    public MembershipPlanResponse createPlan(MembershipPlanRequest request) {
        // Create plan entity
        MembershipPlan plan = new MembershipPlan(
                request.getName(),
                request.getPrice(),
                request.getDurationYears(),
                request.getStayDays(),
                request.getFamilySize(),
                request.getDescription(),
                request.getIsActive()
        );

        // Save plan first to get ID
        plan = planRepository.save(plan);

        // Create benefit entities
        for (BenefitType benefitType : request.getBenefits()) {
            MembershipBenefit benefit = new MembershipBenefit(benefitType, null);
            plan.addBenefit(benefit);
        }

        // Save with benefits
        plan = planRepository.save(plan);

        return toResponse(plan);
    }

    /**
     * Update membership plan (admin).
     */
    @Transactional
    public MembershipPlanResponse updatePlan(Integer id, MembershipPlanRequest request) {
        MembershipPlan plan = planRepository.findByIdWithBenefits(id)
                .orElseThrow(() -> new MembershipPlanNotFoundException("Plan not found with ID: " + id));

        // Update plan fields
        plan.setName(request.getName());
        plan.setPrice(request.getPrice());
        plan.setDurationYears(request.getDurationYears());
        plan.setStayDays(request.getStayDays());
        plan.setFamilySize(request.getFamilySize());
        plan.setDescription(request.getDescription());
        plan.setIsActive(request.getIsActive());

        // Update benefits: clear existing and add new
        plan.getBenefits().clear();
        planRepository.flush(); // Flush to trigger orphan removal

        for (BenefitType benefitType : request.getBenefits()) {
            MembershipBenefit benefit = new MembershipBenefit(benefitType, null);
            plan.addBenefit(benefit);
        }

        plan = planRepository.save(plan);

        return toResponse(plan);
    }

    /**
     * Soft-delete membership plan (admin).
     * Sets isActive to false.
     */
    @Transactional
    public void deletePlan(Integer id) {
        MembershipPlan plan = planRepository.findById(id)
                .orElseThrow(() -> new MembershipPlanNotFoundException("Plan not found with ID: " + id));

        plan.setIsActive(false);
        planRepository.save(plan);
    }

    // ========== Mapping Methods ==========

    private MembershipPlanResponse toResponse(MembershipPlan plan) {
        List<BenefitResponse> benefits = plan.getBenefits().stream()
                .map(b -> new BenefitResponse(b.getId(), b.getBenefitType(), b.getDescription()))
                .collect(Collectors.toList());

        return new MembershipPlanResponse(
                plan.getId(),
                plan.getName(),
                plan.getPrice(),
                plan.getDurationYears(),
                plan.getStayDays(),
                plan.getFamilySize(),
                plan.getDescription(),
                benefits,
                plan.getIsActive(),
                plan.getCreatedAt(),
                plan.getUpdatedAt()
        );
    }
}
