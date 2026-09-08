package com.bambardara.demo.stay.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bambardara.demo.stay.dto.AvailabilityResponse;
import com.bambardara.demo.stay.dto.CheckAvailabilityRequest;
import com.bambardara.demo.stay.dto.StayAccommodationResponse;
import com.bambardara.demo.stay.service.StayAccommodationService;
import com.bambardara.demo.stay.service.StayAvailabilityService;

import jakarta.validation.Valid;

/**
 * Public API for stay accommodations.
 * 
 * Provides accommodation listing, details, and availability checking.
 * No authentication required for browsing.
 */
@RestController
@RequestMapping("/api/stays/accommodations")
public class StayAccommodationController {

    private final StayAccommodationService accommodationService;
    private final StayAvailabilityService availabilityService;

    public StayAccommodationController(
            StayAccommodationService accommodationService,
            StayAvailabilityService availabilityService) {
        this.accommodationService = accommodationService;
        this.availabilityService = availabilityService;
    }

    /**
     * Get all active accommodations.
     * 
     * GET /api/stays/accommodations
     * 
     * @return list of active accommodations
     */
    @GetMapping
    public ResponseEntity<List<StayAccommodationResponse>> getAllAccommodations() {
        List<StayAccommodationResponse> accommodations = 
                accommodationService.getAllActiveAccommodations();
        return ResponseEntity.ok(accommodations);
    }

    /**
     * Get accommodation details by ID.
     * 
     * GET /api/stays/accommodations/{id}
     * 
     * @param id accommodation ID
     * @return accommodation details
     */
    @GetMapping("/{id}")
    public ResponseEntity<StayAccommodationResponse> getAccommodationById(
            @PathVariable Integer id) {
        StayAccommodationResponse accommodation = accommodationService.getAccommodationById(id);
        return ResponseEntity.ok(accommodation);
    }

    /**
     * Check availability for an accommodation.
     * 
     * POST /api/stays/accommodations/{id}/check-availability
     * 
     * Request body:
     * {
     *   "checkInDate": "2026-09-01",
     *   "checkOutDate": "2026-09-05"
     * }
     * 
     * @param id accommodation ID
     * @param request availability check request
     * @return availability status
     */
    @PostMapping("/{id}/check-availability")
    public ResponseEntity<AvailabilityResponse> checkAvailability(
            @PathVariable Integer id,
            @Valid @RequestBody CheckAvailabilityRequest request) {

        try {
            // Validate accommodation exists
            accommodationService.getAccommodationById(id);

            // Validate dates
            availabilityService.validateDateRange(
                    request.getCheckInDate(),
                    request.getCheckOutDate()
            );

            // Check availability
            boolean available = availabilityService.isAvailable(
                    id,
                    request.getCheckInDate(),
                    request.getCheckOutDate()
            );

            if (available) {
                return ResponseEntity.ok(AvailabilityResponse.available());
            } else {
                return ResponseEntity.ok(
                        AvailabilityResponse.unavailable(
                                "Accommodation is already booked for the selected dates"
                        )
                );
            }

        } catch (IllegalArgumentException e) {
            return ResponseEntity.ok(
                    AvailabilityResponse.unavailable(e.getMessage())
            );
        }
    }
}
