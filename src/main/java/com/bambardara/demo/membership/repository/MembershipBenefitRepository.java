package com.bambardara.demo.membership.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bambardara.demo.membership.entity.MembershipBenefit;

/**
 * Repository for MembershipBenefit entity.
 * 
 * Handles plan-benefit relationship operations:
 * - Finding benefits by plan
 * - Deleting benefits when plan is updated
 * - Bulk operations for benefit management
 */
@Repository
public interface MembershipBenefitRepository extends JpaRepository<MembershipBenefit, Integer> {

    /**
     * Find all benefits for a specific plan.
     * 
     * @param planId membership plan ID
     * @return list of benefits
     */
    @Query("SELECT b FROM MembershipBenefit b WHERE b.plan.id = :planId")
    List<MembershipBenefit> findByPlanId(Integer planId);

    /**
     * Delete all benefits for a specific plan.
     * Used when updating plan benefits (delete all, then insert new).
     * 
     * @param planId membership plan ID
     */
    @Modifying
    @Query("DELETE FROM MembershipBenefit b WHERE b.plan.id = :planId")
    void deleteByPlanId(Integer planId);

    /**
     * Count benefits for a plan.
     * Used for validation and statistics.
     * 
     * @param planId membership plan ID
     * @return count of benefits
     */
    @Query("SELECT COUNT(b) FROM MembershipBenefit b WHERE b.plan.id = :planId")
    long countByPlanId(Integer planId);
}
