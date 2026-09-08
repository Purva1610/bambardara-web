package com.bambardara.demo.stay.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bambardara.demo.auth.entity.User;
import com.bambardara.demo.stay.dto.CreateStayBookingRequest;
import com.bambardara.demo.stay.dto.StayBookingResponse;
import com.bambardara.demo.stay.service.StayBookingService;

import jakarta.validation.Valid;

/**
 * User API for stay bookings.
 * 
 * Authenticated users can create, view, and cancel their own bookings.
 * 
 * Access: Authenticated users only (enforced by Spring Security).
 */
@RestController
@RequestMapping("/api/stays/bookings")
public class StayBookingController {

    private final StayBookingService bookingService;

    public StayBookingController(StayBookingService bookingService) {
        this.bookingService = bookingService;
    }

    /**
     * Create a new stay booking.
     * 
     * POST /api/stays/bookings
     * 
     * Request body:
     * {
     *   "accommodationId": 1,
     *   "guestName": "John Doe",
     *   "guestEmail": "john@example.com",
     *   "guestMobile": "1234567890",
     *   "idProofType": "AADHAAR",
     *   "idProofReference": "123456789012",
     *   "numberOfGuests": 2,
     *   "numberOfAdults": 2,
     *   "numberOfChildren": 0,
     *   "checkInDate": "2026-09-01",
     *   "checkInTime": "14:00",
     *   "checkOutDate": "2026-09-05",
     *   "checkOutTime": "11:00",
     *   "specialRequest": "Late check-in",
     *   "termsAccepted": true
     * }
     * 
     * @param user authenticated user (see SecurityConfig)
     * @param request booking request
     * @return created booking details
     */
    @PostMapping
    public ResponseEntity<StayBookingResponse> createBooking(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody CreateStayBookingRequest request) {

        StayBookingResponse booking = bookingService.createBooking(request, user);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(booking);
    }

    /**
     * Get all bookings for the authenticated user.
     * 
     * GET /api/stays/bookings/my
     * 
     * @param user authenticated user
     * @return list of user's bookings
     */
    @GetMapping("/my")
    public ResponseEntity<List<StayBookingResponse>> getMyBookings(
            @AuthenticationPrincipal User user) {

        List<StayBookingResponse> bookings = bookingService.getUserBookings(user.getId());
        return ResponseEntity.ok(bookings);
    }

    /**
     * Get a specific booking by ID.
     * 
     * GET /api/stays/bookings/{id}
     * 
     * Validates that the booking belongs to the authenticated user.
     * 
     * @param id booking ID
     * @param user authenticated user
     * @return booking details
     */
    @GetMapping("/{id}")
    public ResponseEntity<StayBookingResponse> getBookingById(
            @PathVariable Integer id,
            @AuthenticationPrincipal User user) {

        StayBookingResponse booking = bookingService.getBookingById(id, user.getId());
        return ResponseEntity.ok(booking);
    }

    /**
     * Cancel a booking.
     * 
     * PATCH /api/stays/bookings/{id}/cancel
     * 
     * Only PENDING or CONFIRMED bookings can be cancelled.
     * Validates ownership.
     * 
     * @param id booking ID
     * @param user authenticated user
     * @return updated booking details
     */
    @PatchMapping("/{id}/cancel")
    public ResponseEntity<StayBookingResponse> cancelBooking(
            @PathVariable Integer id,
            @AuthenticationPrincipal User user) {

        StayBookingResponse booking = bookingService.cancelBooking(id, user.getId());
        return ResponseEntity.ok(booking);
    }
}
