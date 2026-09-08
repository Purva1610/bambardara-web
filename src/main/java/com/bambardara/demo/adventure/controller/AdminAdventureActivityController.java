package com.bambardara.demo.adventure.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bambardara.demo.adventure.dto.AdventureActivityResponse;
import com.bambardara.demo.adventure.dto.CreateAdventureActivityRequest;
import com.bambardara.demo.adventure.service.AdventureActivityService;

import jakarta.validation.Valid;

/**
 * Admin API for managing adventure activities.
 * 
 * Access: ADMIN role only.
 */
@RestController
@RequestMapping("/api/admin/adventures/activities")
@PreAuthorize("hasRole('ADMIN')")
public class AdminAdventureActivityController {

    private final AdventureActivityService activityService;

    public AdminAdventureActivityController(AdventureActivityService activityService) {
        this.activityService = activityService;
    }

    /**
     * Get all activities including inactive.
     * 
     * GET /api/admin/adventures/activities
     * 
     * @return list of all activities
     */
    @GetMapping
    public ResponseEntity<List<AdventureActivityResponse>> getAllActivities() {
        List<AdventureActivityResponse> activities = activityService.getAllActivities();
        return ResponseEntity.ok(activities);
    }

    /**
     * Get activity by ID.
     * 
     * GET /api/admin/adventures/activities/{id}
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
     * Create new activity.
     * 
     * POST /api/admin/adventures/activities
     * 
     * Request body:
     * {
     *   "activityType": "ZIPLINE",
     *   "name": "Zip-lining Adventure",
     *   "description": "Experience thrilling zip-lining...",
     *   "pricePerPerson": 1500.00,
     *   "minParticipants": 1,
     *   "maxParticipants": 10,
     *   "durationMinutes": 120,
     *   "minAge": 12,
     *   "maxAge": 60,
     *   "difficultyLevel": "MODERATE",
     *   "safetyRequirements": "Must wear safety gear...",
     *   "equipmentProvided": "Harness, helmet, gloves",
     *   "isActive": true
     * }
     * 
     * @param request activity creation request
     * @return created activity
     */
    @PostMapping
    public ResponseEntity<AdventureActivityResponse> createActivity(
            @Valid @RequestBody CreateAdventureActivityRequest request) {

        AdventureActivityResponse activity = activityService.createActivity(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(activity);
    }

    /**
     * Update activity.
     * 
     * PUT /api/admin/adventures/activities/{id}
     * 
     * @param id activity ID
     * @param request activity update request
     * @return updated activity
     */
    @PutMapping("/{id}")
    public ResponseEntity<AdventureActivityResponse> updateActivity(
            @PathVariable Integer id,
            @Valid @RequestBody CreateAdventureActivityRequest request) {

        AdventureActivityResponse activity = activityService.updateActivity(id, request);
        return ResponseEntity.ok(activity);
    }

    /**
     * Delete activity (soft delete).
     * 
     * DELETE /api/admin/adventures/activities/{id}
     * 
     * Sets isActive to false.
     * 
     * @param id activity ID
     * @return no content
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteActivity(@PathVariable Integer id) {
        activityService.deleteActivity(id);
        return ResponseEntity.noContent().build();
    }
}
