package com.bambardara.demo.wellness.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bambardara.demo.wellness.dto.SpaServiceResponse;
import com.bambardara.demo.wellness.service.SpaAvailabilityService;
import com.bambardara.demo.wellness.service.SpaServiceService;

/**
 * Public API for spa services.
 * 
 * Provides spa service listing, details, and available time slots.
 * No authentication required for browsing.
 */
@RestController
@RequestMapping("/api/wellness/spa/services")
public class SpaServiceController {

    private final SpaServiceService spaServiceService;
    private final SpaAvailabilityService availabilityService;

    public SpaServiceController(
            SpaServiceService spaServiceService,
            SpaAvailabilityService availabilityService) {
        this.spaServiceService = spaServiceService;
        this.availabilityService = availabilityService;
    }

    /**
     * Get all active spa services.
     * 
     * GET /api/wellness/spa/services
     * 
     * @return list of active spa services
     */
    @GetMapping
    public ResponseEntity<List<SpaServiceResponse>> getAllServices() {
        List<SpaServiceResponse> services = spaServiceService.getAllActiveServices();
        return ResponseEntity.ok(services);
    }

    /**
     * Get spa service details by ID.
     * 
     * GET /api/wellness/spa/services/{id}
     * 
     * @param id service ID
     * @return service details
     */
    @GetMapping("/{id}")
    public ResponseEntity<SpaServiceResponse> getServiceById(@PathVariable Integer id) {
        SpaServiceResponse service = spaServiceService.getServiceById(id);
        return ResponseEntity.ok(service);
    }

    /**
     * Get available time slots for a service on a specific date.
     * 
     * GET /api/wellness/spa/services/{id}/available-slots?date=2026-09-01
     * 
     * @param id service ID
     * @param date appointment date
     * @return list of available time slots
     */
    @GetMapping("/{id}/available-slots")
    public ResponseEntity<List<LocalTime>> getAvailableSlots(
            @PathVariable Integer id,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        // Get service to retrieve duration
        SpaServiceResponse service = spaServiceService.getServiceById(id);

        // Get available slots
        List<LocalTime> slots = availabilityService.getAvailableSlots(
                date,
                service.getDurationMinutes()
        );

        return ResponseEntity.ok(slots);
    }
}
