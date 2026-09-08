package com.bambardara.demo.stay.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bambardara.demo.common.entity.BookingStatus;
import com.bambardara.demo.stay.entity.StayBooking;

/**
 * Repository for stay bookings.
 * 
 * Includes critical availability checking queries.
 */
public interface StayBookingRepository extends JpaRepository<StayBooking, Integer> {

    /**
     * Find all bookings for a user, ordered by creation date descending.
     */
    List<StayBooking> findByUserIdOrderByCreatedAtDesc(Integer userId);

    /**
     * Find bookings by status.
     */
    List<StayBooking> findByStatusOrderByCreatedAtDesc(BookingStatus status);

    /**
     * Find all bookings ordered by creation date descending.
     */
    List<StayBooking> findAllByOrderByCreatedAtDesc();

    /**
     * Check for overlapping bookings (CRITICAL for availability).
     * 
     * A booking overlaps if:
     * 1. New check-in is during existing booking: checkIn >= existing.checkIn AND checkIn < existing.checkOut
     * 2. New check-out is during existing booking: checkOut > existing.checkIn AND checkOut <= existing.checkOut
     * 3. New booking completely contains existing: checkIn <= existing.checkIn AND checkOut >= existing.checkOut
     * 
     * Status filter: only check PENDING, CONFIRMED, CHECKED_IN bookings.
     * CANCELLED and REJECTED bookings don't block availability.
     * 
     * @param accommodationId accommodation to check
     * @param checkInDate proposed check-in date
     * @param checkOutDate proposed check-out date
     * @param statuses statuses to consider (typically PENDING, CONFIRMED, CHECKED_IN)
     * @return list of overlapping bookings (empty if available)
     */
    @Query("SELECT b FROM StayBooking b WHERE b.accommodation.id = :accommodationId " +
           "AND b.status IN :statuses " +
           "AND (" +
           "  (b.checkInDate <= :checkInDate AND b.checkOutDate > :checkInDate) OR " +
           "  (b.checkInDate < :checkOutDate AND b.checkOutDate >= :checkOutDate) OR " +
           "  (b.checkInDate >= :checkInDate AND b.checkOutDate <= :checkOutDate)" +
           ")")
    List<StayBooking> findOverlappingBookings(
            @Param("accommodationId") Integer accommodationId,
            @Param("checkInDate") LocalDate checkInDate,
            @Param("checkOutDate") LocalDate checkOutDate,
            @Param("statuses") List<BookingStatus> statuses
    );
}
