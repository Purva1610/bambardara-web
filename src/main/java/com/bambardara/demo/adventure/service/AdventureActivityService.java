package com.bambardara.demo.adventure.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bambardara.demo.adventure.dto.AdventureActivityResponse;
import com.bambardara.demo.adventure.dto.CreateAdventureActivityRequest;
import com.bambardara.demo.adventure.entity.ActivityType;
import com.bambardara.demo.adventure.entity.AdventureActivity;
import com.bambardara.demo.adventure.repository.AdventureActivityRepository;

/**
 * Service for managing adventure activities.
 */
@Service
public class AdventureActivityService {

    private final AdventureActivityRepository activityRepository;

    public AdventureActivityService(AdventureActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    /**
     * Get all active activities (public access).
     */
    @Transactional(readOnly = true)
    public List<AdventureActivityResponse> getAllActiveActivities() {
        return activityRepository.findByIsActiveTrueOrderByNameAsc()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get activity by ID.
     */
    @Transactional(readOnly = true)
    public AdventureActivityResponse getActivityById(Integer id) {
        AdventureActivity activity = activityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Activity not found with id: " + id));
        return mapToResponse(activity);
    }

    /**
     * Get activity entity by ID (internal use).
     */
    @Transactional(readOnly = true)
    public AdventureActivity getActivityEntityById(Integer id) {
        return activityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Activity not found with id: " + id));
    }

    /**
     * Get activity by activity type.
     */
    @Transactional(readOnly = true)
    public AdventureActivityResponse getActivityByType(ActivityType activityType) {
        AdventureActivity activity = activityRepository.findByActivityType(activityType)
                .orElseThrow(() -> new RuntimeException(
                        "Activity not found for type: " + activityType));
        return mapToResponse(activity);
    }

    /**
     * Create new activity (Admin only).
     */
    @Transactional
    public AdventureActivityResponse createActivity(CreateAdventureActivityRequest request) {
        // Validate min/max participants
        if (request.getMinParticipants() > request.getMaxParticipants()) {
            throw new IllegalArgumentException(
                    "Minimum participants cannot exceed maximum participants");
        }

        // Check if activity type already exists
        if (activityRepository.findByActivityType(request.getActivityType()).isPresent()) {
            throw new IllegalArgumentException(
                    "Activity already exists for type: " + request.getActivityType());
        }

        AdventureActivity activity = new AdventureActivity();
        activity.setActivityType(request.getActivityType());
        activity.setName(request.getName());
        activity.setDescription(request.getDescription());
        activity.setPricePerPerson(request.getPricePerPerson());
        activity.setMinParticipants(request.getMinParticipants());
        activity.setMaxParticipants(request.getMaxParticipants());
        activity.setDurationMinutes(request.getDurationMinutes());
        activity.setMinAge(request.getMinAge());
        activity.setMaxAge(request.getMaxAge());
        activity.setDifficultyLevel(request.getDifficultyLevel());
        activity.setSafetyRequirements(request.getSafetyRequirements());
        activity.setEquipmentProvided(request.getEquipmentProvided());
        activity.setIsActive(request.getIsActive());
        activity.setCreatedAt(LocalDateTime.now());
        activity.setUpdatedAt(LocalDateTime.now());

        AdventureActivity saved = activityRepository.save(activity);
        return mapToResponse(saved);
    }

    /**
     * Update activity (Admin only).
     */
    @Transactional
    public AdventureActivityResponse updateActivity(Integer id, CreateAdventureActivityRequest request) {
        AdventureActivity activity = getActivityEntityById(id);

        // Validate min/max participants
        if (request.getMinParticipants() > request.getMaxParticipants()) {
            throw new IllegalArgumentException(
                    "Minimum participants cannot exceed maximum participants");
        }

        // If changing activity type, check for conflicts
        if (!activity.getActivityType().equals(request.getActivityType())) {
            if (activityRepository.findByActivityType(request.getActivityType()).isPresent()) {
                throw new IllegalArgumentException(
                        "Activity already exists for type: " + request.getActivityType());
            }
        }

        activity.setActivityType(request.getActivityType());
        activity.setName(request.getName());
        activity.setDescription(request.getDescription());
        activity.setPricePerPerson(request.getPricePerPerson());
        activity.setMinParticipants(request.getMinParticipants());
        activity.setMaxParticipants(request.getMaxParticipants());
        activity.setDurationMinutes(request.getDurationMinutes());
        activity.setMinAge(request.getMinAge());
        activity.setMaxAge(request.getMaxAge());
        activity.setDifficultyLevel(request.getDifficultyLevel());
        activity.setSafetyRequirements(request.getSafetyRequirements());
        activity.setEquipmentProvided(request.getEquipmentProvided());
        activity.setIsActive(request.getIsActive());
        activity.setUpdatedAt(LocalDateTime.now());

        AdventureActivity updated = activityRepository.save(activity);
        return mapToResponse(updated);
    }

    /**
     * Delete activity (Admin only).
     * Soft delete by setting isActive to false.
     */
    @Transactional
    public void deleteActivity(Integer id) {
        AdventureActivity activity = getActivityEntityById(id);
        activity.setIsActive(false);
        activity.setUpdatedAt(LocalDateTime.now());
        activityRepository.save(activity);
    }

    /**
     * Get all activities including inactive (Admin only).
     */
    @Transactional(readOnly = true)
    public List<AdventureActivityResponse> getAllActivities() {
        return activityRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Map entity to response DTO.
     */
    private AdventureActivityResponse mapToResponse(AdventureActivity activity) {
        AdventureActivityResponse response = new AdventureActivityResponse();
        response.setId(activity.getId());
        response.setActivityType(activity.getActivityType());
        response.setName(activity.getName());
        response.setDescription(activity.getDescription());
        response.setPricePerPerson(activity.getPricePerPerson());
        response.setMinParticipants(activity.getMinParticipants());
        response.setMaxParticipants(activity.getMaxParticipants());
        response.setDurationMinutes(activity.getDurationMinutes());
        response.setMinAge(activity.getMinAge());
        response.setMaxAge(activity.getMaxAge());
        response.setDifficultyLevel(activity.getDifficultyLevel());
        response.setSafetyRequirements(activity.getSafetyRequirements());
        response.setEquipmentProvided(activity.getEquipmentProvided());
        response.setIsActive(activity.getIsActive());
        return response;
    }
}
