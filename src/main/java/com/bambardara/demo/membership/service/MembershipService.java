package com.bambardara.demo.membership.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.Year;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bambardara.demo.auth.entity.User;
import com.bambardara.demo.membership.dto.BenefitResponse;
import com.bambardara.demo.membership.dto.CreateMembershipRequest;
import com.bambardara.demo.membership.dto.MembershipPlanResponse;
import com.bambardara.demo.membership.dto.MembershipResponse;
import com.bambardara.demo.membership.dto.UpdateMembershipStatusRequest;
import com.bambardara.demo.membership.entity.Membership;
import com.bambardara.demo.membership.entity.MembershipPlan;
import com.bambardara.demo.membership.entity.MembershipStatus;
import com.bambardara.demo.membership.exception.InvalidMembershipStatusTransitionException;
import com.bambardara.demo.membership.exception.MembershipNotFoundException;
import com.bambardara.demo.membership.exception.PlanNotActiveException;
import com.bambardara.demo.membership.repository.MembershipPlanRepository;
import com.bambardara.demo.membership.repository.MembershipRepository;

/**
 * Service for managing user memberships.
 * 
 * Handles:
 * - Membership purchase (user)
 * - Membership viewing with ownership validation
 * - Status management (admin)
 * - Membership number generation
 * - EMI calculation
 */
@Service
public class MembershipService {

    private final MembershipRepository membershipRepository;
    private final MembershipPlanRepository planRepository;

    public MembershipService(MembershipRepository membershipRepository,
                            MembershipPlanRepository planRepository) {
        this.membershipRepository = membershipRepository;
        this.planRepository = planRepository;
    }

    // ========== User APIs ==========

    /**
     * Create membership (user purchase).
     * 
     * User identity comes from @AuthenticationPrincipal User.
     * NEVER trust userId from request body.
     */
    @Transactional
    public MembershipResponse createMembership(CreateMembershipRequest request, User user) {
        // 1. Validate plan is active
        MembershipPlan plan = planRepository.findByIdAndIsActiveTrue(request.getPlanId())
                .orElseThrow(() -> new PlanNotActiveException("Plan is not active or does not exist: " + request.getPlanId()));

        // 2. Calculate end date
        LocalDate startDate = request.getStartDate();
        LocalDate endDate = startDate.plusYears(plan.getDurationYears());

        // 3. Calculate purchase amount (use plan price)
        BigDecimal purchaseAmount = plan.getPrice();

        // 4. Calculate EMI if enabled
        BigDecimal emiAmount = null;
        if (request.getEmiEnabled() && request.getEmiMonths() != null && request.getEmiMonths() > 0) {
            // Simple division, no interest rate
            emiAmount = purchaseAmount.divide(
                    BigDecimal.valueOf(request.getEmiMonths()), 
                    2, 
                    RoundingMode.HALF_UP
            );
        }

        // 5. Generate unique membership number
        String membershipNumber = generateMembershipNumber();

        // 6. Create membership entity
        Membership membership = new Membership(
                user,
                plan,
                membershipNumber,
                startDate,
                endDate,
                purchaseAmount,
                MembershipStatus.PENDING,
                request.getEmiEnabled(),
                request.getEmiMonths(),
                emiAmount
        );

        membership = membershipRepository.save(membership);

        return toResponse(membership);
    }

    /**
     * Get user's own memberships.
     */
    @Transactional(readOnly = true)
    public List<MembershipResponse> getUserMemberships(Integer userId) {
        List<Membership> memberships = membershipRepository.findByUserId(userId);
        return memberships.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get membership by ID with ownership validation.
     * User can only access their own memberships.
     */
    @Transactional(readOnly = true)
    public MembershipResponse getMembershipById(Integer id, Integer userId) {
        Membership membership = membershipRepository.findByIdWithDetails(id)
                .orElseThrow(() -> new MembershipNotFoundException("Membership not found with ID: " + id));

        // Ownership validation
        if (!membership.belongsToUser(userId)) {
            throw new AccessDeniedException("You do not have permission to access this membership");
        }

        return toResponse(membership);
    }

    // ========== Admin APIs ==========

    /**
     * Get all memberships (admin).
     */
    @Transactional(readOnly = true)
    public List<MembershipResponse> getAllMemberships() {
        List<Membership> memberships = membershipRepository.findAllWithDetails();
        return memberships.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get membership by ID (admin, no ownership check).
     */
    @Transactional(readOnly = true)
    public MembershipResponse getMembershipByIdAdmin(Integer id) {
        Membership membership = membershipRepository.findByIdWithDetails(id)
                .orElseThrow(() -> new MembershipNotFoundException("Membership not found with ID: " + id));

        return toResponse(membership);
    }

    /**
     * Update membership status (admin).
     * Validates status transitions.
     */
    @Transactional
    public MembershipResponse updateMembershipStatus(Integer id, UpdateMembershipStatusRequest request) {
        Membership membership = membershipRepository.findByIdWithDetails(id)
                .orElseThrow(() -> new MembershipNotFoundException("Membership not found with ID: " + id));

        MembershipStatus currentStatus = membership.getStatus();
        MembershipStatus targetStatus = request.getStatus();

        // Validate status transition
        if (!membership.canTransitionTo(targetStatus)) {
            throw new InvalidMembershipStatusTransitionException(
                    "Cannot transition from " + currentStatus + " to " + targetStatus
            );
        }

        membership.setStatus(targetStatus);
        membership = membershipRepository.save(membership);

        return toResponse(membership);
    }

    /**
     * Get memberships by status (admin).
     */
    @Transactional(readOnly = true)
    public List<MembershipResponse> getMembershipsByStatus(MembershipStatus status) {
        List<Membership> memberships = membershipRepository.findByStatus(status);
        return memberships.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Count memberships by status (admin dashboard).
     */
    @Transactional(readOnly = true)
    public long countMembershipsByStatus(MembershipStatus status) {
        return membershipRepository.countByStatus(status);
    }

    // ========== Helper Methods ==========

    /**
     * Generate unique membership number.
     * Format: MEM-YYYY-NNNNN (e.g., MEM-2026-00001)
     */
    private String generateMembershipNumber() {
        String yearPart = String.valueOf(Year.now().getValue());
        String latestNumber = membershipRepository.findLatestMembershipNumber().orElse(null);

        int sequence = 1;

        if (latestNumber != null && latestNumber.startsWith("MEM-" + yearPart)) {
            // Extract sequence from latest: MEM-2026-00001 → 00001 → 1
            String sequencePart = latestNumber.substring(latestNumber.lastIndexOf('-') + 1);
            try {
                sequence = Integer.parseInt(sequencePart) + 1;
            } catch (NumberFormatException e) {
                // If parsing fails, start from 1
                sequence = 1;
            }
        }

        // Format: MEM-YYYY-NNNNN (5-digit sequence)
        String membershipNumber = String.format("MEM-%s-%05d", yearPart, sequence);

        // Ensure uniqueness (extremely rare collision)
        while (membershipRepository.existsByMembershipNumber(membershipNumber)) {
            sequence++;
            membershipNumber = String.format("MEM-%s-%05d", yearPart, sequence);
        }

        return membershipNumber;
    }

    // ========== Mapping Methods ==========

    private MembershipResponse toResponse(Membership membership) {
        // Map plan
        MembershipPlan plan = membership.getPlan();
        List<BenefitResponse> benefits = plan.getBenefits().stream()
                .map(b -> new BenefitResponse(b.getId(), b.getBenefitType(), b.getDescription()))
                .collect(Collectors.toList());

        MembershipPlanResponse planResponse = new MembershipPlanResponse(
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

        // Map membership
        User user = membership.getUser();

        return new MembershipResponse(
                membership.getId(),
                user.getId(),
                user.getName(),
                user.getEmail(),
                membership.getMembershipNumber(),
                planResponse,
                membership.getStartDate(),
                membership.getEndDate(),
                membership.getPurchaseAmount(),
                membership.getStatus(),
                membership.getEmiEnabled(),
                membership.getEmiMonths(),
                membership.getEmiAmount(),
                membership.getCreatedAt(),
                membership.getUpdatedAt()
        );
    }
}
