package com.bambardara.demo.adventure.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bambardara.demo.adventure.entity.AdventureBooking;
import com.bambardara.demo.common.entity.BookingStatus;

/**
 * Repository for AdventureBooking entity.
 */
@Repository
public interface AdventureBookingRepository extends JpaRepository<AdventureBooking, Integer> {

    /**
     * Find all bookings for a user, ordered by creation date descending.
     */
    List<AdventureBooking> findByUser_IdOrderByCreatedAtDesc(Integer userId);

    /**
     * Find all bookings ordered by creation date descending.
     */
    List<AdventureBooking> findAllByOrderByCreatedAtDesc();

    /**
     * Find bookings by status.
     */
    List<AdventureBooking> findByStatusOrderByCreatedAtDesc(BookingStatus status);

    /**
     * Find bookings for a specific slot.
     */
    List<AdventureBooking> findBySlot_IdOrderByCreatedAtDesc(Integer slotId);

    /**
     * Find active bookings for a slot (PENDING, CONFIRMED, CHECKED_IN).
     */
    @Query("SELECT b FROM AdventureBooking b WHERE b.slot.id = :slotId " +
           "AND b.status IN ('PENDING', 'CONFIRMED', 'CHECKED_IN') " +
           "ORDER BY b.createdAt DESC")
    List<AdventureBooking> findActiveBookingsForSlot(@Param("slotId") Integer slotId);

    /**
     * Count active bookings for a slot.
     */
    @Query("SELECT COALESCE(SUM(b.numberOfParticipants), 0) FROM AdventureBooking b " +
           "WHERE b.slot.id = :slotId " +
           "AND b.status IN ('PENDING', 'CONFIRMED', 'CHECKED_IN')")
    Integer countActiveParticipantsForSlot(@Param("slotId") Integer slotId);

    /**
     * Find bookings for a specific activity.
     */
    @Query("SELECT b FROM AdventureBooking b WHERE b.slot.activity.id = :activityId " +
           "ORDER BY b.createdAt DESC")
    List<AdventureBooking> findByActivityId(@Param("activityId") Integer activityId);
}
