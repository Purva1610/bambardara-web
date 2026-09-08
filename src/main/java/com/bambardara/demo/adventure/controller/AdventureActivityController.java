package com.bambardara.demo.adventure.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bambardara.demo.adventure.dto.AdventureActivityResponse;
import com.bambardara.demo.adventure.dto.AdventureSlotResponse;
import com.bambardara.demo.adventure.entity.ActivityType;
import com.bambardara.demo.adventure.service.AdventureActivityService;
import com.bambardara.demo.adventure.service.AdventureSlotService;

/**
 * Public API for adventure activities.
 * 
 * No authentication required for browsing activities and available slots.
 */
@RestController
@RequestMapping("/api/adventures/activities")
public class AdventureActivityController {

    private final AdventureActivityService activityService;
    private final AdventureSlotService slotService;

    public AdventureActivityController(
            AdventureActivityService activityService,
            AdventureSlotService slotService) {
        this.activityService = activityService;
        this.slotService = slotService;
    }

    /**
     * Get all active adventure activities.
     * 
     * GET /api/adventures/activities
     * 
     * @return list of active activities
     */
    @GetMapping
    public ResponseEntity<List<AdventureActivityResponse>> getAllActivities() {
        List<AdventureActivityResponse> activities = activityService.getAllActiveActivities();
        return ResponseEntity.ok(activities);
    }

    /**
     * Get activity by ID.
     * 
     * GET /api/adventures/activities/{id}
     * 
     * @param id activity ID
     * @return activity details
     */
    @GetMapping("/{id}")
    public ResponseEntity<AdventureActivityResponse> getActivityById(@PathVariable Integer id) {
        AdventureActivityResponse activity = activityService.getActivityById(id);
        return ResponseEntity.ok(activity);
    }

    /**
     * Get activity by type.
     * 
     * GET /api/adventures/activities/type/{type}
     * 
     * @param type activity type (ZIPLINE, ATV, etc.)
     * @return activity details
     */
    @GetMapping("/type/{type}")
    public ResponseEntity<AdventureActivityResponse> getActivityByType(
            @PathVariable ActivityType type) {
        AdventureActivityResponse activity = activityService.getActivityByType(type);
        return ResponseEntity.ok(activity);
    }

    /**
     * Get available slots for an activity.
     * 
     * GET /api/adventures/activities/{id}/slots?fromDate=2026-09-01
     * 
     * @param id activity ID
     * @param fromDate optional starting date (defaults to today)
     * @return list of available slots
     */
    @GetMapping("/{id}/slots")
    public ResponseEntity<List<AdventureSlotResponse>> getAvailableSlots(
            @PathVariable Integer id,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fromDate) {

        LocalDate searchDate = fromDate != null ? fromDate : LocalDate.now();
        List<AdventureSlotResponse> slots = slotService.getAvailableSlotsForActivity(id, searchDate);
        return ResponseEntity.ok(slots);
    }

    /**
     * Get slots for an activity on a specific date.
     * 
     * GET /api/adventures/activities/{id}/slots/date?date=2026-09-01
     * 
     * @param id activity ID
     * @param date specific date
     * @return list of slots on that date
     */
    @GetMapping("/{id}/slots/date")
    public ResponseEntity<List<AdventureSlotResponse>> getSlotsByDate(
            @PathVariable Integer id,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        List<AdventureSlotResponse> slots = slotService.getSlotsByActivityAndDate(id, date);
        return ResponseEntity.ok(slots);
    }
}
