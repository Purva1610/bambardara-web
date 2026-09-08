package com.bambardara.demo.wellness.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bambardara.demo.auth.entity.User;
import com.bambardara.demo.wellness.dto.CreateSpaAppointmentRequest;
import com.bambardara.demo.wellness.dto.SpaAppointmentResponse;
import com.bambardara.demo.wellness.service.SpaAppointmentService;

import jakarta.validation.Valid;

/**
 * User API for spa appointments.
 * 
 * Authenticated users can create, view, and cancel their own appointments.
 * 
 * Access: Authenticated users only (enforced by Spring Security).
 */
@RestController
@RequestMapping("/api/wellness/spa/appointments")
public class SpaAppointmentController {

    private final SpaAppointmentService appointmentService;

    public SpaAppointmentController(SpaAppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    /**
     * Create a new spa appointment.
     * 
     * POST /api/wellness/spa/appointments
     * 
     * Request body:
     * {
     *   "serviceId": 1,
     *   "guestName": "Jane Doe",
     *   "guestEmail": "jane@example.com",
     *   "guestMobile": "1234567890",
     *   "appointmentDate": "2026-09-01",
     *   "appointmentTime": "10:00",
     *   "durationMinutes": 60,
     *   "therapistPreference": "FEMALE",
     *   "numberOfPeople": 1,
     *   "specialRequest": "Prefer quiet room"
     * }
     * 
     * @param user authenticated user (see SecurityConfig)
     * @param request appointment request
     * @return created appointment details
     */
    @PostMapping
    public ResponseEntity<SpaAppointmentResponse> createAppointment(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody CreateSpaAppointmentRequest request) {

        SpaAppointmentResponse appointment = appointmentService.createAppointment(
                request,
                user
        );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(appointment);
    }

    /**
     * Get all appointments for the authenticated user.
     * 
     * GET /api/wellness/spa/appointments/my
     * 
     * @param user authenticated user
     * @return list of user's appointments
     */
    @GetMapping("/my")
    public ResponseEntity<List<SpaAppointmentResponse>> getMyAppointments(
            @AuthenticationPrincipal User user) {

        List<SpaAppointmentResponse> appointments = 
                appointmentService.getUserAppointments(user.getId());
        return ResponseEntity.ok(appointments);
    }

    /**
     * Get a specific appointment by ID.
     * 
     * GET /api/wellness/spa/appointments/{id}
     * 
     * Validates that the appointment belongs to the authenticated user.
     * 
     * @param id appointment ID
     * @param user authenticated user
     * @return appointment details
     */
    @GetMapping("/{id}")
    public ResponseEntity<SpaAppointmentResponse> getAppointmentById(
            @PathVariable Integer id,
            @AuthenticationPrincipal User user) {

        SpaAppointmentResponse appointment = appointmentService.getAppointmentById(
                id,
                user.getId()
        );
        return ResponseEntity.ok(appointment);
    }

    /**
     * Cancel an appointment.
     * 
     * PATCH /api/wellness/spa/appointments/{id}/cancel
     * 
     * Only PENDING or CONFIRMED appointments can be cancelled.
     * Validates ownership.
     * 
     * @param id appointment ID
     * @param user authenticated user
     * @return updated appointment details
     */
    @PatchMapping("/{id}/cancel")
    public ResponseEntity<SpaAppointmentResponse> cancelAppointment(
            @PathVariable Integer id,
            @AuthenticationPrincipal User user) {

        SpaAppointmentResponse appointment = appointmentService.cancelAppointment(
                id,
                user.getId()
        );
        return ResponseEntity.ok(appointment);
    }
}
