package com.bambardara.demo.stay.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bambardara.demo.common.entity.BookingStatus;
import com.bambardara.demo.stay.dto.StayBookingResponse;
import com.bambardara.demo.stay.entity.StayBooking;
import com.bambardara.demo.stay.exception.InvalidBookingStatusTransitionException;
import com.bambardara.demo.stay.exception.StayBookingNotFoundException;
import com.bambardara.demo.stay.repository.StayBookingRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

/**
 * Admin API for stay management.
 * 
 * Provides admin access to all bookings and status management.
 * 
 * Access: ADMIN role only (enforced by @PreAuthorize).
 */
@RestController
@RequestMapping("/api/admin/stays")
@PreAuthorize("hasRole('ADMIN')")
public class AdminStayController {

    private final StayBookingRepository bookingRepository;

    public AdminStayController(StayBookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    /**
     * Get all stay bookings (admin view).
     * 
     * GET /api/admin/stays/bookings
     * 
     * @return list of all bookings
     */
    @GetMapping("/bookings")
    public ResponseEntity<List<StayBookingResponse>> getAllBookings() {
        List<StayBooking> bookings = bookingRepository.findAllByOrderByCreatedAtDesc();
        
        List<StayBookingResponse> responses = bookings.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());

        return ResponseEntity.ok(responses);
    }

    /**
     * Get booking by ID (admin view).
     * 
     * GET /api/admin/stays/bookings/{id}
     * 
     * @param id booking ID
     * @return booking details
     */
    @GetMapping("/bookings/{id}")
    public ResponseEntity<StayBookingResponse> getBookingById(@PathVariable Integer id) {
        StayBooking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new StayBookingNotFoundException(id));

        return ResponseEntity.ok(mapToResponse(booking));
    }

    /**
     * Update booking status.
     * 
     * PATCH /api/admin/stays/bookings/{id}/status
     * 
     * Request body:
     * {
     *   "status": "CONFIRMED"
     * }
     * 
     * Valid transitions:
     * - PENDING -> CONFIRMED, REJECTED, CANCELLED
     * - CONFIRMED -> CHECKED_IN, CANCELLED
     * - CHECKED_IN -> COMPLETED
     * 
     * @param id booking ID
     * @param request status update request
     * @return updated booking details
     */
    @PatchMapping("/bookings/{id}/status")
    public ResponseEntity<StayBookingResponse> updateBookingStatus(
            @PathVariable Integer id,
            @Valid @RequestBody UpdateStatusRequest request) {

        StayBooking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new StayBookingNotFoundException(id));

        // Validate status transition
        validateStatusTransition(booking.getStatus(), request.getStatus());

        // Update status
        booking.setStatus(request.getStatus());
        booking.setUpdatedAt(LocalDateTime.now());

        StayBooking updated = bookingRepository.save(booking);

        return ResponseEntity.ok(mapToResponse(updated));
    }

    /**
     * Get bookings by status.
     * 
     * GET /api/admin/stays/bookings/status/{status}
     * 
     * @param status booking status (PENDING, CONFIRMED, etc.)
     * @return list of bookings with specified status
     */
    @GetMapping("/bookings/status/{status}")
    public ResponseEntity<List<StayBookingResponse>> getBookingsByStatus(
            @PathVariable String status) {

        BookingStatus bookingStatus;
        try {
            bookingStatus = BookingStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid status: " + status);
        }

        List<StayBooking> bookings = bookingRepository.findByStatusOrderByCreatedAtDesc(bookingStatus);

        List<StayBookingResponse> responses = bookings.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());

        return ResponseEntity.ok(responses);
    }

    /**
     * Validate status transitions based on business rules.
     * 
     * @param currentStatus current booking status
     * @param newStatus requested new status
     * @throws IllegalStateException if transition is invalid
     */
    private void validateStatusTransition(BookingStatus currentStatus, BookingStatus newStatus) {
        // Allow same status (no-op)
        if (currentStatus == newStatus) {
            return;
        }

        // Define valid transitions
        boolean isValid = false;

        switch (currentStatus) {
            case PENDING:
                isValid = (newStatus == BookingStatus.CONFIRMED ||
                          newStatus == BookingStatus.REJECTED ||
                          newStatus == BookingStatus.CANCELLED);
                break;

            case CONFIRMED:
                isValid = (newStatus == BookingStatus.CHECKED_IN ||
                          newStatus == BookingStatus.CANCELLED);
                break;

            case CHECKED_IN:
                isValid = (newStatus == BookingStatus.COMPLETED);
                break;

            case REJECTED:
            case CANCELLED:
            case COMPLETED:
                // Terminal states - no transitions allowed
                isValid = false;
                break;
        }

        if (!isValid) {
            throw new InvalidBookingStatusTransitionException(currentStatus, newStatus);
        }
    }

    /**
     * Map entity to response DTO.
     */
    private StayBookingResponse mapToResponse(StayBooking booking) {
        StayBookingResponse response = new StayBookingResponse();
        response.setId(booking.getId());
        response.setAccommodationId(booking.getAccommodation().getId());
        response.setAccommodationType(booking.getAccommodation().getAccommodationType());
        response.setAccommodationName(booking.getAccommodation().getName());
        response.setGuestName(booking.getGuestName());
        response.setGuestEmail(booking.getGuestEmail());
        response.setGuestMobile(booking.getGuestMobile());
        response.setIdProofType(booking.getIdProofType());
        response.setNumberOfGuests(booking.getNumberOfGuests());
        response.setNumberOfAdults(booking.getNumberOfAdults());
        response.setNumberOfChildren(booking.getNumberOfChildren());
        response.setCheckInDate(booking.getCheckInDate());
        response.setCheckInTime(booking.getCheckInTime());
        response.setCheckOutDate(booking.getCheckOutDate());
        response.setCheckOutTime(booking.getCheckOutTime());
        response.setSpecialRequest(booking.getSpecialRequest());
        response.setStatus(booking.getStatus());
        response.setTotalAmount(booking.getTotalAmount());
        response.setCreatedAt(booking.getCreatedAt());
        return response;
    }

    /**
     * DTO for status update requests.
     */
    public static class UpdateStatusRequest {
        @NotNull(message = "Status is required")
        private BookingStatus status;

        public BookingStatus getStatus() {
            return status;
        }

        public void setStatus(BookingStatus status) {
            this.status = status;
        }
    }
}
