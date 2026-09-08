package com.bambardara.demo.adventure.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bambardara.demo.adventure.dto.AdventureBookingResponse;
import com.bambardara.demo.adventure.service.AdventureBookingService;
import com.bambardara.demo.common.entity.BookingStatus;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

/**
 * Admin API for managing adventure bookings.
 * 
 * Access: ADMIN role only.
 */
@RestController
@RequestMapping("/api/admin/adventures/bookings")
@PreAuthorize("hasRole('ADMIN')")
public class AdminAdventureBookingController {

    private final AdventureBookingService bookingService;

    public AdminAdventureBookingController(AdventureBookingService bookingService) {
        this.bookingService = bookingService;
    }

    /**
     * Get all bookings.
     * 
     * GET /api/admin/adventures/bookings
     * 
     * @return list of all bookings
     */
    @GetMapping
    public ResponseEntity<List<AdventureBookingResponse>> getAllBookings() {
        List<AdventureBookingResponse> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }

    /**
     * Get booking by ID.
     * 
     * GET /api/admin/adventures/bookings/{id}
     * 
     * @param id booking ID
     * @return booking details
     */
    @GetMapping("/{id}")
    public ResponseEntity<AdventureBookingResponse> getBookingById(@PathVariable Integer id) {
        AdventureBookingResponse booking = bookingService.getBookingByIdAdmin(id);
        return ResponseEntity.ok(booking);
    }

    /**
     * Get bookings by status.
     * 
     * GET /api/admin/adventures/bookings/status/{status}
     * 
     * @param status booking status (PENDING, CONFIRMED, etc.)
     * @return list of bookings with specified status
     */
    @GetMapping("/status/{status}")
    public ResponseEntity<List<AdventureBookingResponse>> getBookingsByStatus(
            @PathVariable String status) {

        BookingStatus bookingStatus;
        try {
            bookingStatus = BookingStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid status: " + status);
        }

        List<AdventureBookingResponse> bookings = bookingService.getBookingsByStatus(bookingStatus);
        return ResponseEntity.ok(bookings);
    }

    /**
     * Update booking status.
     * 
     * PATCH /api/admin/adventures/bookings/{id}/status
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
    @PatchMapping("/{id}/status")
    public ResponseEntity<AdventureBookingResponse> updateBookingStatus(
            @PathVariable Integer id,
            @Valid @RequestBody UpdateStatusRequest request) {

        AdventureBookingResponse booking = bookingService.updateBookingStatus(
                id, request.getStatus());
        return ResponseEntity.ok(booking);
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
