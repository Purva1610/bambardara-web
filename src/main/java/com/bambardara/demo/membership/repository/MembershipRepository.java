package com.bambardara.demo.membership.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bambardara.demo.membership.entity.Membership;
import com.bambardara.demo.membership.entity.MembershipStatus;

/**
 * Repository for Membership entity.
 * 
 * Provides queries for:
 * - User membership access (ownership validation)
 * - Admin dashboard statistics
 * - Membership management
 * - Status-based filtering
 */
@Repository
public interface MembershipRepository extends JpaRepository<Membership, Integer> {

    /**
     * Find all memberships for a specific user.
     * Used for "My Memberships" page.
     * 
     * @param userId user ID
     * @return list of user's memberships ordered by creation date
     */
    @Query("SELECT m FROM Membership m WHERE m.user.id = :userId ORDER BY m.createdAt DESC")
    List<Membership> findByUserId(Integer userId);

    /**
     * Find membership by ID with user and plan eagerly loaded.
     * Avoids N+1 query problem.
     * 
     * @param id membership ID
     * @return optional containing membership with relations
     */
    @Query("SELECT m FROM Membership m " +
           "LEFT JOIN FETCH m.user " +
           "LEFT JOIN FETCH m.plan " +
           "WHERE m.id = :id")
    Optional<Membership> findByIdWithDetails(Integer id);

    /**
     * Find membership by ID and user ID (ownership validation).
     * Used to ensure user can only access their own memberships.
     * 
     * @param id membership ID
     * @param userId user ID
     * @return optional containing membership if owned by user
     */
    @Query("SELECT m FROM Membership m WHERE m.id = :id AND m.user.id = :userId")
    Optional<Membership> findByIdAndUserId(Integer id, Integer userId);

    /**
     * Find all memberships with user and plan details.
     * Used for admin dashboard.
     * 
     * @return list of all memberships with relations
     */
    @Query("SELECT m FROM Membership m " +
           "LEFT JOIN FETCH m.user " +
           "LEFT JOIN FETCH m.plan " +
           "ORDER BY m.createdAt DESC")
    List<Membership> findAllWithDetails();

    /**
     * Find memberships by status.
     * Used for admin filtering (pending, active, expired, cancelled).
     * 
     * @param status membership status
     * @return list of memberships with given status
     */
    List<Membership> findByStatus(MembershipStatus status);

    /**
     * Find memberships by plan ID.
     * Used for admin analytics (which plan is most popular).
     * 
     * @param planId plan ID
     * @return list of memberships for the plan
     */
    @Query("SELECT m FROM Membership m WHERE m.plan.id = :planId")
    List<Membership> findByPlanId(Integer planId);

    /**
     * Count memberships by status.
     * Used for admin dashboard statistics.
     * 
     * @param status membership status
     * @return count of memberships
     */
    long countByStatus(MembershipStatus status);

    /**
     * Count active memberships for a user.
     * Can be used to prevent duplicate active memberships.
     * 
     * @param userId user ID
     * @return count of active memberships
     */
    @Query("SELECT COUNT(m) FROM Membership m WHERE m.user.id = :userId AND m.status = 'ACTIVE'")
    long countActiveByUserId(Integer userId);

    /**
     * Find expired memberships (end date passed, but status still ACTIVE).
     * Used for batch job to mark memberships as EXPIRED.
     * 
     * @param currentDate current date
     * @return list of memberships to expire
     */
    @Query("SELECT m FROM Membership m WHERE m.status = 'ACTIVE' AND m.endDate < :currentDate")
    List<Membership> findExpiredMemberships(LocalDate currentDate);

    /**
     * Find the latest membership number for auto-generation.
     * Format: MEM-YYYY-NNNNN
     * 
     * @return latest membership number or null if no memberships exist
     */
    @Query("SELECT m.membershipNumber FROM Membership m ORDER BY m.id DESC LIMIT 1")
    Optional<String> findLatestMembershipNumber();

    /**
     * Check if membership number already exists.
     * 
     * @param membershipNumber membership number
     * @return true if exists
     */
    boolean existsByMembershipNumber(String membershipNumber);
}
