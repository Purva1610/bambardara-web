package com.bambardara.demo.wellness.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bambardara.demo.common.entity.BookingStatus;
import com.bambardara.demo.wellness.entity.SpaAppointment;
import com.bambardara.demo.wellness.repository.SpaAppointmentRepository;

/**
 * Service for checking spa appointment availability.
 * 
 * Prevents conflicting appointments at the same time slot.
 */
@Service
public class SpaAvailabilityService {

    private final SpaAppointmentRepository appointmentRepository;

    // Business hours (configurable in production)
    private static final LocalTime SPA_OPEN_TIME = LocalTime.of(9, 0);
    private static final LocalTime SPA_CLOSE_TIME = LocalTime.of(20, 0);

    public SpaAvailabilityService(SpaAppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    /**
     * Check if a time slot is available.
     * 
     * A slot is unavailable if there are any PENDING, CONFIRMED, or CHECKED_IN
     * appointments that conflict with the requested time.
     * 
     * NOTE: This simplified implementation checks for exact time conflicts.
     * Production would consider service-specific resources, therapists, and rooms.
     * 
     * @param appointmentDate appointment date
     * @param appointmentTime appointment start time
     * @param durationMinutes duration in minutes
     * @return true if available, false if unavailable
     */
    @Transactional(readOnly = true)
    public boolean isSlotAvailable(LocalDate appointmentDate, 
                                  LocalTime appointmentTime, 
                                  Integer durationMinutes) {
        // Validate inputs
        if (appointmentDate == null || appointmentTime == null || durationMinutes == null) {
            return false;
        }

        if (durationMinutes < 30) {
            return false;
        }

        // Validate business hours
        if (!isWithinBusinessHours(appointmentTime, durationMinutes)) {
            return false;
        }

        // Simplified availability check: check if ANY appointment exists at this exact time
        // Production would check per-service or per-therapist availability
        List<SpaAppointment> allAppointments = appointmentRepository.findAll();
        
        for (SpaAppointment existing : allAppointments) {
            // Only check active appointments
            if (existing.getStatus() != BookingStatus.PENDING &&
                existing.getStatus() != BookingStatus.CONFIRMED &&
                existing.getStatus() != BookingStatus.CHECKED_IN) {
                continue;
            }
            
            // Check if on same date
            if (!existing.getAppointmentDate().equals(appointmentDate)) {
                continue;
            }
            
            // Check for time overlap
            LocalTime existingStart = existing.getAppointmentTime();
            LocalTime existingEnd = existingStart.plusMinutes(existing.getDurationMinutes());
            LocalTime requestedEnd = appointmentTime.plusMinutes(durationMinutes);
            
            // Overlap if: (requestStart < existingEnd) AND (requestEnd > existingStart)
            if (appointmentTime.isBefore(existingEnd) && requestedEnd.isAfter(existingStart)) {
                return false; // Conflict found
            }
        }

        return true; // No conflicts
    }

    /**
     * Check if a time slot is available, excluding a specific appointment.
     * 
     * Useful for update operations.
     * 
     * @param appointmentDate appointment date
     * @param appointmentTime appointment start time
     * @param durationMinutes duration in minutes
     * @param excludeAppointmentId appointment ID to exclude
     * @return true if available, false if unavailable
     */
    @Transactional(readOnly = true)
    public boolean isSlotAvailableExcluding(LocalDate appointmentDate,
                                           LocalTime appointmentTime,
                                           Integer durationMinutes,
                                           Integer excludeAppointmentId) {
        // Validate inputs
        if (appointmentDate == null || appointmentTime == null || durationMinutes == null) {
            return false;
        }

        if (durationMinutes < 30) {
            return false;
        }

        // Validate business hours
        if (!isWithinBusinessHours(appointmentTime, durationMinutes)) {
            return false;
        }

        // Check for conflicts, excluding the specified appointment
        List<SpaAppointment> allAppointments = appointmentRepository.findAll();
        
        for (SpaAppointment existing : allAppointments) {
            // Skip the excluded appointment
            if (existing.getId().equals(excludeAppointmentId)) {
                continue;
            }
            
            // Only check active appointments
            if (existing.getStatus() != BookingStatus.PENDING &&
                existing.getStatus() != BookingStatus.CONFIRMED &&
                existing.getStatus() != BookingStatus.CHECKED_IN) {
                continue;
            }
            
            // Check if on same date
            if (!existing.getAppointmentDate().equals(appointmentDate)) {
                continue;
            }
            
            // Check for time overlap
            LocalTime existingStart = existing.getAppointmentTime();
            LocalTime existingEnd = existingStart.plusMinutes(existing.getDurationMinutes());
            LocalTime requestedEnd = appointmentTime.plusMinutes(durationMinutes);
            
            // Overlap if: (requestStart < existingEnd) AND (requestEnd > existingStart)
            if (appointmentTime.isBefore(existingEnd) && requestedEnd.isAfter(existingStart)) {
                return false; // Conflict found
            }
        }

        return true; // No conflicts
    }

    /**
     * Get available time slots for a given date and duration.
     * 
     * This is a simplified implementation. Production would consider:
     * - Multiple therapists/rooms
     * - Therapist schedules
     * - Buffer times between appointments
     * 
     * @param date appointment date
     * @param durationMinutes duration in minutes
     * @return list of available start times
     */
    @Transactional(readOnly = true)
    public List<LocalTime> getAvailableSlots(LocalDate date, Integer durationMinutes) {
        List<LocalTime> availableSlots = new ArrayList<>();

        if (date == null || durationMinutes == null || durationMinutes < 30) {
            return availableSlots;
        }

        // Generate slots every 30 minutes
        LocalTime currentSlot = SPA_OPEN_TIME;
        
        while (currentSlot.isBefore(SPA_CLOSE_TIME)) {
            LocalTime endTime = currentSlot.plusMinutes(durationMinutes);
            
            // Check if slot fits within business hours
            if (endTime.isAfter(SPA_CLOSE_TIME)) {
                break;
            }

            // Check availability
            if (isSlotAvailable(date, currentSlot, durationMinutes)) {
                availableSlots.add(currentSlot);
            }

            // Move to next slot (30-minute intervals)
            currentSlot = currentSlot.plusMinutes(30);
        }

        return availableSlots;
    }

    /**
     * Validate that appointment is within business hours.
     * 
     * @param appointmentTime start time
     * @param durationMinutes duration
     * @return true if within hours, false otherwise
     */
    public boolean isWithinBusinessHours(LocalTime appointmentTime, Integer durationMinutes) {
        if (appointmentTime == null || durationMinutes == null) {
            return false;
        }

        LocalTime endTime = appointmentTime.plusMinutes(durationMinutes);

        return !appointmentTime.isBefore(SPA_OPEN_TIME) && 
               !endTime.isAfter(SPA_CLOSE_TIME);
    }

    /**
     * Validate appointment date and time.
     * 
     * @param appointmentDate date
     * @param appointmentTime time
     * @param durationMinutes duration
     * @throws IllegalArgumentException if invalid
     */
    public void validateAppointmentDateTime(LocalDate appointmentDate, 
                                           LocalTime appointmentTime, 
                                           Integer durationMinutes) {
        if (appointmentDate == null) {
            throw new IllegalArgumentException("Appointment date is required");
        }

        if (appointmentTime == null) {
            throw new IllegalArgumentException("Appointment time is required");
        }

        if (durationMinutes == null || durationMinutes < 30) {
            throw new IllegalArgumentException("Duration must be at least 30 minutes");
        }

        // Check if in the past
        LocalDateTime appointmentDateTime = LocalDateTime.of(appointmentDate, appointmentTime);
        if (appointmentDateTime.isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Appointment must be in the future");
        }

        // Check business hours
        if (!isWithinBusinessHours(appointmentTime, durationMinutes)) {
            throw new IllegalArgumentException(
                    String.format("Appointment must be within business hours (%s - %s)",
                            SPA_OPEN_TIME, SPA_CLOSE_TIME)
            );
        }
    }
}
