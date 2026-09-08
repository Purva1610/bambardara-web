package com.bambardara.demo.adventure.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bambardara.demo.adventure.entity.AdventureSlot;

/**
 * Repository for AdventureSlot entity with availability queries.
 */
@Repository
public interface AdventureSlotRepository extends JpaRepository<AdventureSlot, Integer> {

    /**
     * Find all available slots for a specific activity.
     */
    @Query("SELECT s FROM AdventureSlot s WHERE s.activity.id = :activityId " +
           "AND s.isAvailable = true AND s.slotDate >= :fromDate " +
           "ORDER BY s.slotDate ASC, s.startTime ASC")
    List<AdventureSlot> findAvailableSlotsForActivity(
            @Param("activityId") Integer activityId,
            @Param("fromDate") LocalDate fromDate
    );

    /**
     * Find all slots for a specific activity on a specific date.
     */
    @Query("SELECT s FROM AdventureSlot s WHERE s.activity.id = :activityId " +
           "AND s.slotDate = :date " +
           "ORDER BY s.startTime ASC")
    List<AdventureSlot> findSlotsByActivityAndDate(
            @Param("activityId") Integer activityId,
            @Param("date") LocalDate date
    );

    /**
     * Find available slots with sufficient capacity.
     */
    @Query("SELECT s FROM AdventureSlot s WHERE s.activity.id = :activityId " +
           "AND s.slotDate = :date AND s.isAvailable = true " +
           "AND (s.maxCapacity - s.currentBookings) >= :requiredCapacity " +
           "ORDER BY s.startTime ASC")
    List<AdventureSlot> findAvailableSlotsWithCapacity(
            @Param("activityId") Integer activityId,
            @Param("date") LocalDate date,
            @Param("requiredCapacity") Integer requiredCapacity
    );

    /**
     * Find all slots ordered by date and time.
     */
    List<AdventureSlot> findAllByOrderBySlotDateDescStartTimeDesc();

    /**
     * Find slots by activity ID ordered by date.
     */
    List<AdventureSlot> findByActivity_IdOrderBySlotDateAscStartTimeAsc(Integer activityId);

    /**
     * Find upcoming slots (from today onwards).
     */
    @Query("SELECT s FROM AdventureSlot s WHERE s.slotDate >= :fromDate " +
           "ORDER BY s.slotDate ASC, s.startTime ASC")
    List<AdventureSlot> findUpcomingSlots(@Param("fromDate") LocalDate fromDate);
}
