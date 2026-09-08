package com.bambardara.demo.wellness.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bambardara.demo.wellness.entity.MassageCategory;
import com.bambardara.demo.wellness.entity.MassageType;
import com.bambardara.demo.wellness.entity.SpaService;

/**
 * Repository for spa services.
 */
public interface SpaServiceRepository extends JpaRepository<SpaService, Integer> {

    /**
     * Find service by massage type.
     */
    Optional<SpaService> findByMassageType(MassageType massageType);

    /**
     * Find all active services.
     */
    List<SpaService> findByIsActiveTrueOrderByMassageCategoryAscNameAsc();

    /**
     * Find services by category.
     */
    List<SpaService> findByMassageCategoryAndIsActiveTrueOrderByName(MassageCategory category);

    /**
     * Find all services (including inactive).
     */
    List<SpaService> findAllByOrderByMassageCategoryAscNameAsc();
}
