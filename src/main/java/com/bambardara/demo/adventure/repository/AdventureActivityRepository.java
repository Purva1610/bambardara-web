package com.bambardara.demo.adventure.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bambardara.demo.adventure.entity.ActivityType;
import com.bambardara.demo.adventure.entity.AdventureActivity;

/**
 * Repository for AdventureActivity entity.
 */
@Repository
public interface AdventureActivityRepository extends JpaRepository<AdventureActivity, Integer> {

    /**
     * Find all active activities ordered by name.
     */
    List<AdventureActivity> findByIsActiveTrueOrderByNameAsc();

    /**
     * Find activity by activity type.
     */
    Optional<AdventureActivity> findByActivityType(ActivityType activityType);

    /**
     * Find all activities ordered by creation date descending.
     */
    List<AdventureActivity> findAllByOrderByCreatedAtDesc();
}
