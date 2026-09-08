package com.bambardara.demo.membership.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bambardara.demo.membership.entity.MembershipPlan;

/**
 * Repository for MembershipPlan entity.
 * 
 * Provides queries for:
 * - Finding active plans (public API)
 * - Admin operations (all plans)
 * - Checking plan existence and availability
 */
@Repository
public interface MembershipPlanRepository extends JpaRepository<MembershipPlan, Integer> {

    /**
     * Find all active membership plans.
     * Used for public/user-facing plan browsing.
     * 
     * @return list of active plans
     */
    List<MembershipPlan> findByIsActiveTrue();

    /**
     * Find active plan by ID.
     * Used for validating plan availability before purchase.
     * 
     * @param id plan ID
     * @return optional containing plan if active
     */
    Optional<MembershipPlan> findByIdAndIsActiveTrue(Integer id);

    /**
     * Find plan by ID with benefits eagerly loaded.
     * Avoids N+1 query problem when fetching plan details.
     * 
     * @param id plan ID
     * @return optional containing plan with benefits
     */
    @Query("SELECT p FROM MembershipPlan p LEFT JOIN FETCH p.benefits WHERE p.id = :id")
    Optional<MembershipPlan> findByIdWithBenefits(Integer id);

    /**
     * Find all plans with benefits eagerly loaded.
     * Used for admin dashboard and plan comparison.
     * 
     * @return list of plans with benefits
     */
    @Query("SELECT DISTINCT p FROM MembershipPlan p LEFT JOIN FETCH p.benefits")
    List<MembershipPlan> findAllWithBenefits();

    /**
     * Find active plans with benefits eagerly loaded.
     * Used for public plan listing with full details.
     * 
     * @return list of active plans with benefits
     */
    @Query("SELECT DISTINCT p FROM MembershipPlan p LEFT JOIN FETCH p.benefits WHERE p.isActive = true")
    List<MembershipPlan> findActiveWithBenefits();
}
