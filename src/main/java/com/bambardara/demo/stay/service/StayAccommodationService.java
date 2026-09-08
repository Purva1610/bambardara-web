package com.bambardara.demo.stay.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bambardara.demo.stay.dto.StayAccommodationResponse;
import com.bambardara.demo.stay.entity.StayAccommodation;
import com.bambardara.demo.stay.exception.AccommodationNotFoundException;
import com.bambardara.demo.stay.repository.StayAccommodationRepository;

/**
 * Service for managing stay accommodations.
 * 
 * Provides accommodation listing and details for public view.
 */
@Service
public class StayAccommodationService {

    private final StayAccommodationRepository accommodationRepository;

    public StayAccommodationService(StayAccommodationRepository accommodationRepository) {
        this.accommodationRepository = accommodationRepository;
    }

    /**
     * Get all active accommodations.
     * 
     * @return list of active accommodations
     */
    @Transactional(readOnly = true)
    public List<StayAccommodationResponse> getAllActiveAccommodations() {
        return accommodationRepository.findByIsActiveTrueOrderByName()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get accommodation by ID.
     * 
     * @param id accommodation ID
     * @return accommodation details
     * @throws AccommodationNotFoundException if not found
     */
    @Transactional(readOnly = true)
    public StayAccommodationResponse getAccommodationById(Integer id) {
        StayAccommodation accommodation = accommodationRepository.findById(id)
                .orElseThrow(() -> new AccommodationNotFoundException(id));

        return mapToResponse(accommodation);
    }

    /**
     * Get accommodation entity by ID (internal use).
     * 
     * @param id accommodation ID
     * @return accommodation entity
     * @throws AccommodationNotFoundException if not found
     */
    @Transactional(readOnly = true)
    public StayAccommodation getAccommodationEntityById(Integer id) {
        return accommodationRepository.findById(id)
                .orElseThrow(() -> new AccommodationNotFoundException(id));
    }

    /**
     * Map entity to response DTO.
     */
    private StayAccommodationResponse mapToResponse(StayAccommodation accommodation) {
        return new StayAccommodationResponse(
                accommodation.getId(),
                accommodation.getAccommodationType(),
                accommodation.getName(),
                accommodation.getDescription(),
                accommodation.getPricePerNight(),
                accommodation.getMaxGuests(),
                accommodation.getAmenities(),
                accommodation.getIsActive()
        );
    }
}
