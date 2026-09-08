package com.bambardara.demo.adventure.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bambardara.demo.adventure.dto.AdventureBookingResponse;
import com.bambardara.demo.adventure.dto.CreateAdventureBookingRequest;
import com.bambardara.demo.adventure.entity.AdventureActivity;
import com.bambardara.demo.adventure.entity.AdventureBooking;
import com.bambardara.demo.adventure.entity.AdventureSlot;
import com.bambardara.demo.adventure.repository.AdventureBookingRepository;
import com.bambardara.demo.auth.entity.User;
import com.bambardara.demo.common.entity.BookingStatus;

/**
 * Service for managing adventure bookings with availability logic.
 * 
 * Handles booking creation, cancellation, and ownership validation.
 * Prevents overbooking through synchronized capacity checks.
 */
@Service
public class AdventureBookingService {

    private final AdventureBookingRepository bookingRepository;
    private final AdventureSlotService slotService;

    public AdventureBookingService(
            AdventureBookingRepository bookingRepository,
            AdventureSlotService slotService) {
        this.bookingRepository = bookingRepository;
        this.slotService = slotService;
    }

    /**
     * Create new booking (authenticated users only).
     * 
     * Validates:
     * - Terms acceptance
     * - Slot exists and is available
     * - Sufficient capacity
     * - Participant count within activity limits
     * 
     * Updates slot capacity atomically to prevent race conditions.
     */
    @Transactional
    public AdventureBookingResponse createBooking(
            CreateAdventureBookingRequest request, User user) {

        // Validate terms accepted
        if (request.getTermsAccepted() == null || !request.getTermsAccepted()) {
            throw new IllegalArgumentException("Terms and conditions must be accepted");
        }

        // Get slot with activity
        AdventureSlot slot = slotService.getSlotEntityById(request.getSlotId());
        AdventureActivity activity = slot.getActivity();

        // Validate slot is available
        if (!slot.getIsAvailable()) {
            throw new RuntimeException(
                    "This slot is not available. Reason: " + 
                    (slot.getCancellationReason() != null ? slot.getCancellationReason() : "Unavailable"));
        }

        // Validate participant count against activity limits
        Integer participants = request.getNumberOfParticipants();
        if (participants < activity.getMinParticipants()) {
            throw new IllegalArgumentException(
                    String.format("Minimum %d participants required for this activity",
                            activity.getMinParticipants()));
        }
        if (participants > activity.getMaxParticipants()) {
            throw new IllegalArgumentException(
                    String.format("Maximum %d participants allowed for this activity",
                            activity.getMaxParticipants()));
        }

        // Synchronized capacity check and update (prevent race conditions)
        synchronized (this) {
            // Refresh slot to get latest capacity
            AdventureSlot freshSlot = slotService.getSlotEntityById(request.getSlotId());
            
            if (!freshSlot.hasCapacityFor(participants)) {
                throw new RuntimeException(
                        String.format("Insufficient capacity. Available: %d, Requested: %d",
                                freshSlot.getAvailableCapacity(), participants));
            }

            // Calculate total amount (server-side calculation for security)
            BigDecimal totalAmount = activity.getPricePerPerson()
                    .multiply(BigDecimal.valueOf(participants));

            // Create booking
            AdventureBooking booking = new AdventureBooking();
            booking.setUser(user);
            booking.setSlot(freshSlot);
            booking.setNumberOfParticipants(participants);
            booking.setLeadParticipantName(request.getLeadParticipantName());
            booking.setLeadParticipantEmail(request.getLeadParticipantEmail());
            booking.setLeadParticipantMobile(request.getLeadParticipantMobile());
            booking.setParticipantsDetails(request.getParticipantsDetails());
            booking.setEmergencyContactName(request.getEmergencyContactName());
            booking.setEmergencyContactMobile(request.getEmergencyContactMobile());
            booking.setHealthConditions(request.getHealthConditions());
            booking.setTermsAccepted(true);
            booking.setSpecialRequest(request.getSpecialRequest());
            booking.setStatus(BookingStatus.PENDING);
            booking.setTotalAmount(totalAmount);
            booking.setCreatedAt(LocalDateTime.now());
            booking.setUpdatedAt(LocalDateTime.now());

            // Update slot capacity
            freshSlot.setCurrentBookings(freshSlot.getCurrentBookings() + participants);
            freshSlot.setUpdatedAt(LocalDateTime.now());

            // Save booking and slot in same transaction
            AdventureBooking savedBooking = bookingRepository.save(booking);

            return mapToResponse(savedBooking);
        }
    }

    /**
     * Get all bookings for a user.
     */
    @Transactional(readOnly = true)
    public List<AdventureBookingResponse> getUserBookings(Integer userId) {
        return bookingRepository.findByUser_IdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get booking by ID.
     * Validates ownership.
     */
    @Transactional(readOnly = true)
    public AdventureBookingResponse getBookingById(Integer bookingId, Integer userId) {
        AdventureBooking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + bookingId));

        // Validate ownership
        if (!booking.getUser().getId().equals(userId)) {
            throw new SecurityException("You are not authorized to access this booking");
        }

        return mapToResponse(booking);
    }

    /**
     * Cancel booking.
     * Only PENDING or CONFIRMED bookings can be cancelled.
     * Returns capacity back to slot.
     */
    @Transactional
    public AdventureBookingResponse cancelBooking(Integer bookingId, Integer userId) {
        AdventureBooking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + bookingId));

        // Validate ownership
        if (!booking.getUser().getId().equals(userId)) {
            throw new SecurityException("You are not authorized to cancel this booking");
        }

        // Validate status
        if (booking.getStatus() != BookingStatus.PENDING &&
            booking.getStatus() != BookingStatus.CONFIRMED) {
            throw new IllegalStateException(
                    "Only PENDING or CONFIRMED bookings can be cancelled. Current status: " +
                    booking.getStatus());
        }

        // Update status
        booking.setStatus(BookingStatus.CANCELLED);
        booking.setUpdatedAt(LocalDateTime.now());

        // Return capacity to slot
        AdventureSlot slot = booking.getSlot();
        slot.setCurrentBookings(
                Math.max(0, slot.getCurrentBookings() - booking.getNumberOfParticipants()));
        slot.setUpdatedAt(LocalDateTime.now());

        AdventureBooking updatedBooking = bookingRepository.save(booking);

        return mapToResponse(updatedBooking);
    }

    /**
     * Get all bookings (Admin only).
     */
    @Transactional(readOnly = true)
    public List<AdventureBookingResponse> getAllBookings() {
        return bookingRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get bookings by status (Admin only).
     */
    @Transactional(readOnly = true)
    public List<AdventureBookingResponse> getBookingsByStatus(BookingStatus status) {
        return bookingRepository.findByStatusOrderByCreatedAtDesc(status)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get booking by ID (Admin only, no ownership check).
     */
    @Transactional(readOnly = true)
    public AdventureBookingResponse getBookingByIdAdmin(Integer bookingId) {
        AdventureBooking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + bookingId));
        return mapToResponse(booking);
    }

    /**
     * Update booking status (Admin only).
     * Handles capacity adjustments for cancellations/rejections.
     */
    @Transactional
    public AdventureBookingResponse updateBookingStatus(
            Integer bookingId, BookingStatus newStatus) {

        AdventureBooking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + bookingId));

        BookingStatus oldStatus = booking.getStatus();

        // Validate status transition
        validateStatusTransition(oldStatus, newStatus);

        // If transitioning to CANCELLED or REJECTED, return capacity
        if ((oldStatus == BookingStatus.PENDING || oldStatus == BookingStatus.CONFIRMED) &&
            (newStatus == BookingStatus.CANCELLED || newStatus == BookingStatus.REJECTED)) {
            
            AdventureSlot slot = booking.getSlot();
            slot.setCurrentBookings(
                    Math.max(0, slot.getCurrentBookings() - booking.getNumberOfParticipants()));
            slot.setUpdatedAt(LocalDateTime.now());
        }

        booking.setStatus(newStatus);
        booking.setUpdatedAt(LocalDateTime.now());

        AdventureBooking updated = bookingRepository.save(booking);
        return mapToResponse(updated);
    }

    /**
     * Validate booking status transitions.
     */
    private void validateStatusTransition(BookingStatus current, BookingStatus target) {
        if (current == target) {
            return; // No change
        }

        boolean isValid = false;

        switch (current) {
            case PENDING:
                isValid = (target == BookingStatus.CONFIRMED ||
                          target == BookingStatus.REJECTED ||
                          target == BookingStatus.CANCELLED);
                break;

            case CONFIRMED:
                isValid = (target == BookingStatus.CHECKED_IN ||
                          target == BookingStatus.CANCELLED);
                break;

            case CHECKED_IN:
                isValid = (target == BookingStatus.COMPLETED);
                break;

            case REJECTED:
            case CANCELLED:
            case COMPLETED:
                // Terminal states
                isValid = false;
                break;
        }

        if (!isValid) {
            throw new IllegalStateException(
                    String.format("Invalid status transition from %s to %s", current, target));
        }
    }

    /**
     * Map entity to response DTO.
     */
    private AdventureBookingResponse mapToResponse(AdventureBooking booking) {
        AdventureSlot slot = booking.getSlot();
        AdventureActivity activity = slot.getActivity();

        AdventureBookingResponse response = new AdventureBookingResponse();
        response.setId(booking.getId());
        response.setSlotId(slot.getId());
        response.setActivityId(activity.getId());
        response.setActivityType(activity.getActivityType());
        response.setActivityName(activity.getName());
        response.setSlotDate(slot.getSlotDate());
        response.setStartTime(slot.getStartTime());
        response.setEndTime(slot.getEndTime());
        response.setNumberOfParticipants(booking.getNumberOfParticipants());
        response.setLeadParticipantName(booking.getLeadParticipantName());
        response.setLeadParticipantEmail(booking.getLeadParticipantEmail());
        response.setLeadParticipantMobile(booking.getLeadParticipantMobile());
        response.setParticipantsDetails(booking.getParticipantsDetails());
        response.setEmergencyContactName(booking.getEmergencyContactName());
        response.setEmergencyContactMobile(booking.getEmergencyContactMobile());
        response.setHealthConditions(booking.getHealthConditions());
        response.setSpecialRequest(booking.getSpecialRequest());
        response.setStatus(booking.getStatus());
        response.setTotalAmount(booking.getTotalAmount());
        response.setCreatedAt(booking.getCreatedAt());
        return response;
    }
}
