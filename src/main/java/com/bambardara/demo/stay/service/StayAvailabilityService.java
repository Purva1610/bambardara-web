package com.bambardara.demo.stay.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bambardara.demo.common.entity.BookingStatus;
import com.bambardara.demo.stay.entity.StayBooking;
import com.bambardara.demo.stay.repository.StayBookingRepository;

/**
 * Service for checking stay accommodation availability.
 * 
 * Prevents overlapping bookings for the same accommodation.
 */
@Service
public class StayAvailabilityService {

    private final StayBookingRepository bookingRepository;

    public StayAvailabilityService(StayBookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    /**
     * Check if accommodation is available for the requested dates.
     * 
     * An accommodation is unavailable if there are any PENDING, CONFIRMED, or CHECKED_IN
     * bookings that overlap with the requested date range.
     * 
     * @param accommodationId accommodation ID
     * @param checkInDate requested check-in date
     * @param checkOutDate requested check-out date
     * @return true if available, false if unavailable
     */
    @Transactional(readOnly = true)
    public boolean isAvailable(Integer accommodationId, LocalDate checkInDate, LocalDate checkOutDate) {
        // Validate dates
        if (checkInDate == null || checkOutDate == null) {
            return false;
        }

        if (!checkOutDate.isAfter(checkInDate)) {
            return false;
        }

        // Check for overlapping bookings
        List<StayBooking> overlappingBookings = bookingRepository.findOverlappingBookings(
                accommodationId,
                checkInDate,
                checkOutDate,
                List.of(BookingStatus.PENDING, BookingStatus.CONFIRMED, BookingStatus.CHECKED_IN)
        );

        return overlappingBookings.isEmpty();
    }

    /**
     * Check if accommodation is available, excluding a specific booking ID.
     * 
     * Useful for update operations where we want to check availability
     * but ignore the booking being updated.
     * 
     * @param accommodationId accommodation ID
     * @param checkInDate requested check-in date
     * @param checkOutDate requested check-out date
     * @param excludeBookingId booking ID to exclude from check
     * @return true if available, false if unavailable
     */
    @Transactional(readOnly = true)
    public boolean isAvailableExcluding(Integer accommodationId, LocalDate checkInDate, 
                                       LocalDate checkOutDate, Integer excludeBookingId) {
        // Validate dates
        if (checkInDate == null || checkOutDate == null) {
            return false;
        }

        if (!checkOutDate.isAfter(checkInDate)) {
            return false;
        }

        // Check for overlapping bookings
        List<StayBooking> overlappingBookings = bookingRepository.findOverlappingBookings(
                accommodationId,
                checkInDate,
                checkOutDate,
                List.of(BookingStatus.PENDING, BookingStatus.CONFIRMED, BookingStatus.CHECKED_IN)
        );

        // Filter out the booking being updated
        return overlappingBookings.stream()
                .noneMatch(booking -> !booking.getId().equals(excludeBookingId));
    }

    /**
     * Validate date range is logical.
     * 
     * @param checkInDate check-in date
     * @param checkOutDate check-out date
     * @throws IllegalArgumentException if dates are invalid
     */
    public void validateDateRange(LocalDate checkInDate, LocalDate checkOutDate) {
        if (checkInDate == null) {
            throw new IllegalArgumentException("Check-in date is required");
        }

        if (checkOutDate == null) {
            throw new IllegalArgumentException("Check-out date is required");
        }

        if (!checkOutDate.isAfter(checkInDate)) {
            throw new IllegalArgumentException("Check-out date must be after check-in date");
        }

        if (checkInDate.isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Check-in date must be in the future");
        }
    }
}
