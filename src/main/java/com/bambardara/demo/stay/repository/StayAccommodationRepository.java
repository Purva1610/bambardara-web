package com.bambardara.demo.stay.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bambardara.demo.stay.entity.AccommodationType;
import com.bambardara.demo.stay.entity.StayAccommodation;

/**
 * Repository for stay accommodations.
 */
public interface StayAccommodationRepository extends JpaRepository<StayAccommodation, Integer> {

    /**
     * Find accommodation by type.
     */
    Optional<StayAccommodation> findByAccommodationType(AccommodationType type);

    /**
     * Find all active accommodations.
     */
    List<StayAccommodation> findByIsActiveTrueOrderByName();

    /**
     * Find all accommodations (including inactive).
     */
    List<StayAccommodation> findAllByOrderByName();
}
