package com.bambardara.demo.wellness.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bambardara.demo.common.entity.BookingStatus;
import com.bambardara.demo.wellness.dto.SpaAppointmentResponse;
import com.bambardara.demo.wellness.entity.SpaAppointment;
import com.bambardara.demo.wellness.exception.InvalidAppointmentStatusTransitionException;
import com.bambardara.demo.wellness.exception.SpaAppointmentNotFoundException;
import com.bambardara.demo.wellness.repository.SpaAppointmentRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

/**
 * Admin API for spa/wellness management.
 * 
 * Provides admin access to all appointments and status management.
 * 
 * Access: ADMIN role only (enforced by @PreAuthorize).
 */
@RestController
@RequestMapping("/api/admin/wellness/spa")
@PreAuthorize("hasRole('ADMIN')")
public class AdminSpaController {

    private final SpaAppointmentRepository appointmentRepository;

    public AdminSpaController(SpaAppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    /**
     * Get all spa appointments (admin view).
     * 
     * GET /api/admin/wellness/spa/appointments
     * 
     * @return list of all appointments
     */
    @GetMapping("/appointments")
    public ResponseEntity<List<SpaAppointmentResponse>> getAllAppointments() {
        List<SpaAppointment> appointments = appointmentRepository.findAllByOrderByAppointmentDateDesc();

        List<SpaAppointmentResponse> responses = appointments.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());

        return ResponseEntity.ok(responses);
    }

    /**
     * Get appointment by ID (admin view).
     * 
     * GET /api/admin/wellness/spa/appointments/{id}
     * 
     * @param id appointment ID
     * @return appointment details
     */
    @GetMapping("/appointments/{id}")
    public ResponseEntity<SpaAppointmentResponse> getAppointmentById(@PathVariable Integer id) {
        SpaAppointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new SpaAppointmentNotFoundException(id));

        return ResponseEntity.ok(mapToResponse(appointment));
    }

    /**
     * Update appointment status.
     * 
     * PATCH /api/admin/wellness/spa/appointments/{id}/status
     * 
     * Request body:
     * {
     *   "status": "CONFIRMED"
     * }
     * 
     * Valid transitions:
     * - PENDING -> CONFIRMED, REJECTED, CANCELLED
     * - CONFIRMED -> CHECKED_IN, CANCELLED
     * - CHECKED_IN -> COMPLETED
     * 
     * @param id appointment ID
     * @param request status update request
     * @return updated appointment details
     */
    @PatchMapping("/appointments/{id}/status")
    public ResponseEntity<SpaAppointmentResponse> updateAppointmentStatus(
            @PathVariable Integer id,
            @Valid @RequestBody UpdateStatusRequest request) {

        SpaAppointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new SpaAppointmentNotFoundException(id));

        // Validate status transition
        validateStatusTransition(appointment.getStatus(), request.getStatus());

        // Update status
        appointment.setStatus(request.getStatus());
        appointment.setUpdatedAt(LocalDateTime.now());

        SpaAppointment updated = appointmentRepository.save(appointment);

        return ResponseEntity.ok(mapToResponse(updated));
    }

    /**
     * Get appointments by status.
     * 
     * GET /api/admin/wellness/spa/appointments/status/{status}
     * 
     * @param status appointment status (PENDING, CONFIRMED, etc.)
     * @return list of appointments with specified status
     */
    @GetMapping("/appointments/status/{status}")
    public ResponseEntity<List<SpaAppointmentResponse>> getAppointmentsByStatus(
            @PathVariable String status) {

        BookingStatus bookingStatus;
        try {
            bookingStatus = BookingStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid status: " + status);
        }

        List<SpaAppointment> appointments = 
                appointmentRepository.findByStatusOrderByAppointmentDateDesc(bookingStatus);

        List<SpaAppointmentResponse> responses = appointments.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());

        return ResponseEntity.ok(responses);
    }

    /**
     * Validate status transitions based on business rules.
     * 
     * @param currentStatus current appointment status
     * @param newStatus requested new status
     * @throws IllegalStateException if transition is invalid
     */
    private void validateStatusTransition(BookingStatus currentStatus, BookingStatus newStatus) {
        // Allow same status (no-op)
        if (currentStatus == newStatus) {
            return;
        }

        // Define valid transitions
        boolean isValid = false;

        switch (currentStatus) {
            case PENDING:
                isValid = (newStatus == BookingStatus.CONFIRMED ||
                          newStatus == BookingStatus.REJECTED ||
                          newStatus == BookingStatus.CANCELLED);
                break;

            case CONFIRMED:
                isValid = (newStatus == BookingStatus.CHECKED_IN ||
                          newStatus == BookingStatus.CANCELLED);
                break;

            case CHECKED_IN:
                isValid = (newStatus == BookingStatus.COMPLETED);
                break;

            case REJECTED:
            case CANCELLED:
            case COMPLETED:
                // Terminal states - no transitions allowed
                isValid = false;
                break;
        }

        if (!isValid) {
            throw new InvalidAppointmentStatusTransitionException(currentStatus, newStatus);
        }
    }

    /**
     * Map entity to response DTO.
     */
    private SpaAppointmentResponse mapToResponse(SpaAppointment appointment) {
        SpaAppointmentResponse response = new SpaAppointmentResponse();
        response.setId(appointment.getId());
        response.setServiceId(appointment.getService().getId());
        response.setMassageCategory(appointment.getService().getMassageCategory());
        response.setMassageType(appointment.getService().getMassageType());
        response.setServiceName(appointment.getService().getName());
        response.setGuestName(appointment.getGuestName());
        response.setGuestEmail(appointment.getGuestEmail());
        response.setGuestMobile(appointment.getGuestMobile());
        response.setAppointmentDate(appointment.getAppointmentDate());
        response.setAppointmentTime(appointment.getAppointmentTime());
        response.setDurationMinutes(appointment.getDurationMinutes());
        response.setTherapistPreference(appointment.getTherapistPreference());
        response.setNumberOfPeople(appointment.getNumberOfPeople());
        response.setSpecialRequest(appointment.getSpecialRequest());
        response.setStatus(appointment.getStatus());
        response.setTotalAmount(appointment.getTotalAmount());
        response.setCreatedAt(appointment.getCreatedAt());
        return response;
    }

    /**
     * DTO for status update requests.
     */
    public static class UpdateStatusRequest {
        @NotNull(message = "Status is required")
        private BookingStatus status;

        public BookingStatus getStatus() {
            return status;
        }

        public void setStatus(BookingStatus status) {
            this.status = status;
        }
    }
}
