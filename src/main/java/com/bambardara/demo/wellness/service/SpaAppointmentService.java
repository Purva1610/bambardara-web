package com.bambardara.demo.wellness.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bambardara.demo.common.entity.BookingStatus;
import com.bambardara.demo.wellness.dto.CreateSpaAppointmentRequest;
import com.bambardara.demo.wellness.dto.SpaAppointmentResponse;
import com.bambardara.demo.wellness.entity.SpaAppointment;
import com.bambardara.demo.wellness.entity.SpaService;
import com.bambardara.demo.wellness.exception.InvalidAppointmentStatusTransitionException;
import com.bambardara.demo.wellness.exception.SpaAppointmentNotFoundException;
import com.bambardara.demo.wellness.exception.SpaSlotNotAvailableException;
import com.bambardara.demo.wellness.repository.SpaAppointmentRepository;

/**
 * Service for managing spa appointments.
 * 
 * Handles appointment creation, retrieval, cancellation, and ownership validation.
 * Enforces availability checks to prevent conflicting appointments.
 */
@Service
public class SpaAppointmentService {

    private final SpaAppointmentRepository appointmentRepository;
    private final SpaServiceService spaServiceService;
    private final SpaAvailabilityService availabilityService;

    public SpaAppointmentService(
            SpaAppointmentRepository appointmentRepository,
            SpaServiceService spaServiceService,
            SpaAvailabilityService availabilityService) {
        this.appointmentRepository = appointmentRepository;
        this.spaServiceService = spaServiceService;
        this.availabilityService = availabilityService;
    }

    /**
     * Create a new spa appointment.
     * 
     * Validates:
     * - Service exists and is active
     * - Date/time is valid and in future
     * - Appointment is within business hours
     * - Duration matches service duration
     * - Time slot is available
     * 
     * @param request appointment request
     * @param user authenticated user (see SecurityConfig)
     * @return created appointment details
     * @throws RuntimeException if validation fails or slot unavailable
     */
    @Transactional
    public SpaAppointmentResponse createAppointment(CreateSpaAppointmentRequest request, com.bambardara.demo.auth.entity.User user) {
        // Validate date/time
        availabilityService.validateAppointmentDateTime(
                request.getAppointmentDate(),
                request.getAppointmentTime(),
                request.getDurationMinutes()
        );

        // Get service
        SpaService service = spaServiceService.getServiceEntityById(request.getServiceId());

        // Validate service is active
        if (!service.getIsActive()) {
            throw new IllegalArgumentException("This spa service is currently unavailable");
        }

        // Validate duration matches service duration (with some tolerance)
        if (!request.getDurationMinutes().equals(service.getDurationMinutes())) {
            throw new IllegalArgumentException(
                    String.format("Invalid duration. This service requires %d minutes",
                            service.getDurationMinutes())
            );
        }

        // Validate massage type/category consistency (already enforced by enum, but double-check)
        spaServiceService.validateMassageTypeCategory(service);

        // Check slot availability (synchronized to prevent race conditions)
        synchronized (this) {
            boolean available = availabilityService.isSlotAvailable(
                    request.getAppointmentDate(),
                    request.getAppointmentTime(),
                    request.getDurationMinutes()
            );

            if (!available) {
                throw new SpaSlotNotAvailableException("This time slot is not available");
            }

            // Calculate total amount (server-side calculation)
            BigDecimal totalAmount = calculateTotalAmount(
                    service.getPricePerSession(),
                    request.getNumberOfPeople()
            );

            // Create appointment entity
            SpaAppointment appointment = new SpaAppointment();
            appointment.setUser(user);
            appointment.setService(service);
            appointment.setGuestName(request.getGuestName());
            appointment.setGuestEmail(request.getGuestEmail());
            appointment.setGuestMobile(request.getGuestMobile());
            appointment.setAppointmentDate(request.getAppointmentDate());
            appointment.setAppointmentTime(request.getAppointmentTime());
            appointment.setDurationMinutes(request.getDurationMinutes());
            appointment.setTherapistPreference(request.getTherapistPreference());
            appointment.setNumberOfPeople(request.getNumberOfPeople());
            appointment.setSpecialRequest(request.getSpecialRequest());
            appointment.setStatus(BookingStatus.PENDING);
            appointment.setTotalAmount(totalAmount);
            appointment.setCreatedAt(LocalDateTime.now());
            appointment.setUpdatedAt(LocalDateTime.now());

            // Save appointment
            SpaAppointment savedAppointment = appointmentRepository.save(appointment);

            return mapToResponse(savedAppointment);
        }
    }

    /**
     * Get all appointments for a specific user.
     * 
     * @param userId user ID (Integer)
     * @return list of user's appointments
     */
    @Transactional(readOnly = true)
    public List<SpaAppointmentResponse> getUserAppointments(Integer userId) {
        return appointmentRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get appointment by ID.
     * 
     * Validates that the appointment belongs to the requesting user.
     * 
     * @param appointmentId appointment ID
     * @param userId authenticated user ID (Integer)
     * @return appointment details
     * @throws SpaAppointmentNotFoundException if not found
     * @throws SecurityException if user doesn't own appointment
     */
    @Transactional(readOnly = true)
    public SpaAppointmentResponse getAppointmentById(Integer appointmentId, Integer userId) {
        SpaAppointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new SpaAppointmentNotFoundException(appointmentId));

        // Validate ownership
        if (!appointment.getUser().getId().equals(userId)) {
            throw new SecurityException("You are not authorized to access this appointment");
        }

        return mapToResponse(appointment);
    }

    /**
     * Cancel an appointment.
     * 
     * Only PENDING or CONFIRMED appointments can be cancelled by users.
     * Validates ownership.
     * 
     * @param appointmentId appointment ID
     * @param userId authenticated user ID (Integer)
     * @return updated appointment details
     * @throws SpaAppointmentNotFoundException if not found
     * @throws SecurityException if unauthorized
     * @throws InvalidAppointmentStatusTransitionException if invalid status
     */
    @Transactional
    public SpaAppointmentResponse cancelAppointment(Integer appointmentId, Integer userId) {
        SpaAppointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new SpaAppointmentNotFoundException(appointmentId));

        // Validate ownership
        if (!appointment.getUser().getId().equals(userId)) {
            throw new SecurityException("You are not authorized to cancel this appointment");
        }

        // Validate status
        if (appointment.getStatus() != BookingStatus.PENDING &&
            appointment.getStatus() != BookingStatus.CONFIRMED) {
            throw new InvalidAppointmentStatusTransitionException(
                    "Only PENDING or CONFIRMED appointments can be cancelled. Current status: " +
                    appointment.getStatus()
            );
        }

        // Update status
        appointment.setStatus(BookingStatus.CANCELLED);
        appointment.setUpdatedAt(LocalDateTime.now());

        SpaAppointment updatedAppointment = appointmentRepository.save(appointment);

        return mapToResponse(updatedAppointment);
    }

    /**
     * Calculate total amount based on price per session and number of people.
     * 
     * @param pricePerSession price per session
     * @param numberOfPeople number of people
     * @return total amount
     */
    private BigDecimal calculateTotalAmount(BigDecimal pricePerSession, Integer numberOfPeople) {
        if (pricePerSession == null || numberOfPeople == null || numberOfPeople < 1) {
            return BigDecimal.ZERO;
        }

        return pricePerSession.multiply(BigDecimal.valueOf(numberOfPeople));
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
}
