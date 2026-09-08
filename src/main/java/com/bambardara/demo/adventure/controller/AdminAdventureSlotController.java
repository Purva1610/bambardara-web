package com.bambardara.demo.adventure.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bambardara.demo.adventure.dto.AdventureSlotResponse;
import com.bambardara.demo.adventure.dto.CreateAdventureSlotRequest;
import com.bambardara.demo.adventure.service.AdventureSlotService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

/**
 * Admin API for managing adventure slots.
 * 
 * Access: ADMIN role only.
 */
@RestController
@RequestMapping("/api/admin/adventures/slots")
@PreAuthorize("hasRole('ADMIN')")
public class AdminAdventureSlotController {

    private final AdventureSlotService slotService;

    public AdminAdventureSlotController(AdventureSlotService slotService) {
        this.slotService = slotService;
    }

    /**
     * Get all upcoming slots.
     * 
     * GET /api/admin/adventures/slots
     * 
     * @return list of upcoming slots
     */
    @GetMapping
    public ResponseEntity<List<AdventureSlotResponse>> getUpcomingSlots() {
        List<AdventureSlotResponse> slots = slotService.getUpcomingSlots();
        return ResponseEntity.ok(slots);
    }

    /**
     * Get slot by ID.
     * 
     * GET /api/admin/adventures/slots/{id}
     * 
     * @param id slot ID
     * @return slot details
     */
    @GetMapping("/{id}")
    public ResponseEntity<AdventureSlotResponse> getSlotById(@PathVariable Integer id) {
        AdventureSlotResponse slot = slotService.getSlotById(id);
        return ResponseEntity.ok(slot);
    }

    /**
     * Get all slots for a specific activity.
     * 
     * GET /api/admin/adventures/slots/activity/{activityId}
     * 
     * @param activityId activity ID
     * @return list of slots for the activity
     */
    @GetMapping("/activity/{activityId}")
    public ResponseEntity<List<AdventureSlotResponse>> getSlotsByActivity(
            @PathVariable Integer activityId) {
        List<AdventureSlotResponse> slots = slotService.getSlotsByActivity(activityId);
        return ResponseEntity.ok(slots);
    }

    /**
     * Create new slot.
     * 
     * POST /api/admin/adventures/slots
     * 
     * Request body:
     * {
     *   "activityId": 1,
     *   "slotDate": "2026-09-15",
     *   "startTime": "09:00",
     *   "endTime": "11:00",
     *   "maxCapacity": 10,
     *   "isAvailable": true
     * }
     * 
     * @param request slot creation request
     * @return created slot
     */
    @PostMapping
    public ResponseEntity<AdventureSlotResponse> createSlot(
            @Valid @RequestBody CreateAdventureSlotRequest request) {

        AdventureSlotResponse slot = slotService.createSlot(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(slot);
    }

    /**
     * Update slot.
     * 
     * PUT /api/admin/adventures/slots/{id}
     * 
     * @param id slot ID
     * @param request slot update request
     * @return updated slot
     */
    @PutMapping("/{id}")
    public ResponseEntity<AdventureSlotResponse> updateSlot(
            @PathVariable Integer id,
            @Valid @RequestBody CreateAdventureSlotRequest request) {

        AdventureSlotResponse slot = slotService.updateSlot(id, request);
        return ResponseEntity.ok(slot);
    }

    /**
     * Cancel slot.
     * 
     * PATCH /api/admin/adventures/slots/{id}/cancel
     * 
     * Request body:
     * {
     *   "reason": "Weather conditions"
     * }
     * 
     * @param id slot ID
     * @param request cancellation request
     * @return updated slot
     */
    @PatchMapping("/{id}/cancel")
    public ResponseEntity<AdventureSlotResponse> cancelSlot(
            @PathVariable Integer id,
            @Valid @RequestBody CancelSlotRequest request) {

        AdventureSlotResponse slot = slotService.cancelSlot(id, request.getReason());
        return ResponseEntity.ok(slot);
    }

    /**
     * Delete slot.
     * 
     * DELETE /api/admin/adventures/slots/{id}
     * 
     * Can only delete if no active bookings.
     * 
     * @param id slot ID
     * @return no content
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSlot(@PathVariable Integer id) {
        slotService.deleteSlot(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * DTO for slot cancellation request.
     */
    public static class CancelSlotRequest {
        @NotBlank(message = "Cancellation reason is required")
        private String reason;

        public String getReason() {
            return reason;
        }

        public void setReason(String reason) {
            this.reason = reason;
        }
    }
}
