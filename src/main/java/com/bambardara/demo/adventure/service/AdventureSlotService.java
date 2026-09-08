package com.bambardara.demo.adventure.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bambardara.demo.adventure.dto.AdventureSlotResponse;
import com.bambardara.demo.adventure.dto.CreateAdventureSlotRequest;
import com.bambardara.demo.adventure.entity.AdventureActivity;
import com.bambardara.demo.adventure.entity.AdventureSlot;
import com.bambardara.demo.adventure.repository.AdventureSlotRepository;

/**
 * Service for managing adventure time slots.
 */
@Service
public class AdventureSlotService {

    private final AdventureSlotRepository slotRepository;
    private final AdventureActivityService activityService;

    public AdventureSlotService(
            AdventureSlotRepository slotRepository,
            AdventureActivityService activityService) {
        this.slotRepository = slotRepository;
        this.activityService = activityService;
    }

    /**
     * Get available slots for an activity from a specific date onwards.
     */
    @Transactional(readOnly = true)
    public List<AdventureSlotResponse> getAvailableSlotsForActivity(
            Integer activityId, LocalDate fromDate) {
        LocalDate searchDate = fromDate != null ? fromDate : LocalDate.now();
        return slotRepository.findAvailableSlotsForActivity(activityId, searchDate)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get all slots for an activity on a specific date.
     */
    @Transactional(readOnly = true)
    public List<AdventureSlotResponse> getSlotsByActivityAndDate(
            Integer activityId, LocalDate date) {
        return slotRepository.findSlotsByActivityAndDate(activityId, date)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get available slots with sufficient capacity.
     */
    @Transactional(readOnly = true)
    public List<AdventureSlotResponse> getAvailableSlotsWithCapacity(
            Integer activityId, LocalDate date, Integer requiredCapacity) {
        return slotRepository.findAvailableSlotsWithCapacity(activityId, date, requiredCapacity)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get slot by ID.
     */
    @Transactional(readOnly = true)
    public AdventureSlotResponse getSlotById(Integer id) {
        AdventureSlot slot = slotRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Slot not found with id: " + id));
        return mapToResponse(slot);
    }

    /**
     * Get slot entity by ID (internal use).
     */
    @Transactional(readOnly = true)
    public AdventureSlot getSlotEntityById(Integer id) {
        return slotRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Slot not found with id: " + id));
    }

    /**
     * Check if slot has capacity for given number of participants.
     */
    @Transactional(readOnly = true)
    public boolean hasCapacity(Integer slotId, Integer participants) {
        AdventureSlot slot = getSlotEntityById(slotId);
        return slot.getIsAvailable() && slot.hasCapacityFor(participants);
    }

    /**
     * Create new slot (Admin only).
     */
    @Transactional
    public AdventureSlotResponse createSlot(CreateAdventureSlotRequest request) {
        // Validate times
        if (!request.getEndTime().isAfter(request.getStartTime())) {
            throw new IllegalArgumentException("End time must be after start time");
        }

        // Validate date is in future
        if (request.getSlotDate().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Slot date must be in the future");
        }

        // Get activity
        AdventureActivity activity = activityService.getActivityEntityById(
                request.getActivityId());

        AdventureSlot slot = new AdventureSlot();
        slot.setActivity(activity);
        slot.setSlotDate(request.getSlotDate());
        slot.setStartTime(request.getStartTime());
        slot.setEndTime(request.getEndTime());
        slot.setMaxCapacity(request.getMaxCapacity());
        slot.setCurrentBookings(0);
        slot.setIsAvailable(request.getIsAvailable());
        slot.setCancellationReason(request.getCancellationReason());
        slot.setCreatedAt(LocalDateTime.now());
        slot.setUpdatedAt(LocalDateTime.now());

        AdventureSlot saved = slotRepository.save(slot);
        return mapToResponse(saved);
    }

    /**
     * Update slot (Admin only).
     */
    @Transactional
    public AdventureSlotResponse updateSlot(Integer id, CreateAdventureSlotRequest request) {
        AdventureSlot slot = getSlotEntityById(id);

        // Validate times
        if (!request.getEndTime().isAfter(request.getStartTime())) {
            throw new IllegalArgumentException("End time must be after start time");
        }

        // Validate new capacity doesn't conflict with existing bookings
        if (request.getMaxCapacity() < slot.getCurrentBookings()) {
            throw new IllegalArgumentException(
                    String.format("Cannot reduce capacity to %d. Current bookings: %d",
                            request.getMaxCapacity(), slot.getCurrentBookings()));
        }

        // Get activity (may have changed)
        AdventureActivity activity = activityService.getActivityEntityById(
                request.getActivityId());

        slot.setActivity(activity);
        slot.setSlotDate(request.getSlotDate());
        slot.setStartTime(request.getStartTime());
        slot.setEndTime(request.getEndTime());
        slot.setMaxCapacity(request.getMaxCapacity());
        slot.setIsAvailable(request.getIsAvailable());
        slot.setCancellationReason(request.getCancellationReason());
        slot.setUpdatedAt(LocalDateTime.now());

        AdventureSlot updated = slotRepository.save(slot);
        return mapToResponse(updated);
    }

    /**
     * Delete slot (Admin only).
     * Can only delete if no active bookings.
     */
    @Transactional
    public void deleteSlot(Integer id) {
        AdventureSlot slot = getSlotEntityById(id);
        
        if (slot.getCurrentBookings() > 0) {
            throw new IllegalStateException(
                    "Cannot delete slot with active bookings. Current bookings: " +
                    slot.getCurrentBookings());
        }

        slotRepository.deleteById(id);
    }

    /**
     * Cancel slot (Admin only).
     * Sets availability to false with reason.
     */
    @Transactional
    public AdventureSlotResponse cancelSlot(Integer id, String reason) {
        AdventureSlot slot = getSlotEntityById(id);
        slot.setIsAvailable(false);
        slot.setCancellationReason(reason);
        slot.setUpdatedAt(LocalDateTime.now());

        AdventureSlot updated = slotRepository.save(slot);
        return mapToResponse(updated);
    }

    /**
     * Get all upcoming slots (Admin only).
     */
    @Transactional(readOnly = true)
    public List<AdventureSlotResponse> getUpcomingSlots() {
        return slotRepository.findUpcomingSlots(LocalDate.now())
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get all slots for an activity (Admin only).
     */
    @Transactional(readOnly = true)
    public List<AdventureSlotResponse> getSlotsByActivity(Integer activityId) {
        return slotRepository.findByActivity_IdOrderBySlotDateAscStartTimeAsc(activityId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Map entity to response DTO.
     */
    private AdventureSlotResponse mapToResponse(AdventureSlot slot) {
        AdventureSlotResponse response = new AdventureSlotResponse();
        response.setId(slot.getId());
        response.setActivityId(slot.getActivity().getId());
        response.setActivityType(slot.getActivity().getActivityType());
        response.setActivityName(slot.getActivity().getName());
        response.setSlotDate(slot.getSlotDate());
        response.setStartTime(slot.getStartTime());
        response.setEndTime(slot.getEndTime());
        response.setMaxCapacity(slot.getMaxCapacity());
        response.setCurrentBookings(slot.getCurrentBookings());
        response.setAvailableCapacity(slot.getAvailableCapacity());
        response.setIsAvailable(slot.getIsAvailable());
        response.setCancellationReason(slot.getCancellationReason());
        return response;
    }
}
