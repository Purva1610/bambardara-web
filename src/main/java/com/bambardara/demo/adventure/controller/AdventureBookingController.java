package com.bambardara.demo.adventure.controller;

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

import com.bambardara.demo.adventure.dto.AdventureBookingResponse;
import com.bambardara.demo.adventure.dto.CreateAdventureBookingRequest;
import com.bambardara.demo.adventure.service.AdventureBookingService;
import com.bambardara.demo.auth.entity.User;

import jakarta.validation.Valid;

/**
 * User API for adventure bookings.
 * 
 * Authenticated users can create, view, and cancel their own bookings.
 */
@RestController
@RequestMapping("/api/adventures/bookings")
public class AdventureBookingController {

    private final AdventureBookingService bookingService;

    public AdventureBookingController(AdventureBookingService bookingService) {
        this.bookingService = bookingService;
    }

    /**
     * Create a new adventure booking.
     * 
     * POST /api/adventures/bookings
     * 
     * Request body:
     * {
     *   "slotId": 1,
     *   "numberOfParticipants": 2,
     *   "leadParticipantName": "John Doe",
     *   "leadParticipantEmail": "john@example.com",
     *   "leadParticipantMobile": "1234567890",
     *   "participantsDetails": "[{\"name\":\"John\",\"age\":30},{\"name\":\"Jane\",\"age\":28}]",
     *   "emergencyContactName": "Emergency Contact",
     *   "emergencyContactMobile": "9876543210",
     *   "healthConditions": "None",
     *   "termsAccepted": true,
     *   "specialRequest": "Prefer morning slot"
     * }
     * 
     * @param user authenticated user (see SecurityConfig)
     * @param request booking request
     * @return created booking details
     */
    @PostMapping
    public ResponseEntity<AdventureBookingResponse> createBooking(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody CreateAdventureBookingRequest request) {

        AdventureBookingResponse booking = bookingService.createBooking(request, user);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(booking);
    }

    /**
     * Get all bookings for the authenticated user.
     * 
     * GET /api/adventures/bookings/my
     * 
     * @param user authenticated user
     * @return list of user's bookings
     */
    @GetMapping("/my")
    public ResponseEntity<List<AdventureBookingResponse>> getMyBookings(
            @AuthenticationPrincipal User user) {

        List<AdventureBookingResponse> bookings = bookingService.getUserBookings(user.getId());
        return ResponseEntity.ok(bookings);
    }

    /**
     * Get a specific booking by ID.
     * 
     * GET /api/adventures/bookings/{id}
     * 
     * Validates that the booking belongs to the authenticated user.
     * 
     * @param id booking ID
     * @param user authenticated user
     * @return booking details
     */
    @GetMapping("/{id}")
    public ResponseEntity<AdventureBookingResponse> getBookingById(
            @PathVariable Integer id,
            @AuthenticationPrincipal User user) {

        AdventureBookingResponse booking = bookingService.getBookingById(id, user.getId());
        return ResponseEntity.ok(booking);
    }

    /**
     * Cancel a booking.
     * 
     * PATCH /api/adventures/bookings/{id}/cancel
     * 
     * Only PENDING or CONFIRMED bookings can be cancelled.
     * Validates ownership and returns capacity back to the slot.
     * 
     * @param id booking ID
     * @param user authenticated user
     * @return updated booking details
     */
    @PatchMapping("/{id}/cancel")
    public ResponseEntity<AdventureBookingResponse> cancelBooking(
            @PathVariable Integer id,
            @AuthenticationPrincipal User user) {

        AdventureBookingResponse booking = bookingService.cancelBooking(id, user.getId());
        return ResponseEntity.ok(booking);
    }
}
