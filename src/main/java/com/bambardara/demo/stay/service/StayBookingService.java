package com.bambardara.demo.stay.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bambardara.demo.common.entity.BookingStatus;
import com.bambardara.demo.stay.dto.CreateStayBookingRequest;
import com.bambardara.demo.stay.dto.StayBookingResponse;
import com.bambardara.demo.stay.entity.StayAccommodation;
import com.bambardara.demo.stay.entity.StayBooking;
import com.bambardara.demo.stay.exception.AccommodationNotAvailableException;
import com.bambardara.demo.stay.exception.InvalidBookingStatusTransitionException;
import com.bambardara.demo.stay.exception.StayBookingNotFoundException;
import com.bambardara.demo.stay.repository.StayBookingRepository;

/**
 * Service for managing stay bookings.
 * 
 * Handles booking creation, retrieval, cancellation, and ownership validation.
 * Enforces availability checks to prevent double-booking.
 */
@Service
public class StayBookingService {

    private final StayBookingRepository bookingRepository;
    private final StayAccommodationService accommodationService;
    private final StayAvailabilityService availabilityService;

    public StayBookingService(
            StayBookingRepository bookingRepository,
            StayAccommodationService accommodationService,
            StayAvailabilityService availabilityService) {
        this.bookingRepository = bookingRepository;
        this.accommodationService = accommodationService;
        this.availabilityService = availabilityService;
    }

    /**
     * Create a new stay booking.
     * 
     * Validates:
     * - Accommodation exists and is active
     * - Dates are valid
     * - Guest count doesn't exceed max capacity
     * - Accommodation is available for selected dates
     * 
     * @param request booking request
     * @param user authenticated user (see SecurityConfig)
     * @return created booking details
     * @throws RuntimeException if validation fails or accommodation unavailable
     */
    @Transactional
    public StayBookingResponse createBooking(CreateStayBookingRequest request, com.bambardara.demo.auth.entity.User user) {
        // Validate terms accepted
        if (request.getTermsAccepted() == null || !request.getTermsAccepted()) {
            throw new IllegalArgumentException("Terms and conditions must be accepted");
        }

        // Validate dates
        availabilityService.validateDateRange(request.getCheckInDate(), request.getCheckOutDate());

        // Validate guest count matches
        Integer totalGuests = (request.getNumberOfAdults() != null ? request.getNumberOfAdults() : 0) +
                             (request.getNumberOfChildren() != null ? request.getNumberOfChildren() : 0);
        
        if (!totalGuests.equals(request.getNumberOfGuests())) {
            throw new IllegalArgumentException("Number of guests must equal adults + children");
        }

        // Get accommodation
        StayAccommodation accommodation = accommodationService.getAccommodationEntityById(
                request.getAccommodationId()
        );

        // Validate accommodation is active
        if (!accommodation.getIsActive()) {
            throw new IllegalArgumentException("This accommodation is currently unavailable");
        }

        // Validate guest count doesn't exceed capacity
        if (request.getNumberOfGuests() > accommodation.getMaxGuests()) {
            throw new IllegalArgumentException(
                    String.format("Number of guests (%d) exceeds maximum capacity (%d)",
                            request.getNumberOfGuests(), accommodation.getMaxGuests())
            );
        }

        // Check availability (synchronized to prevent race conditions)
        synchronized (this) {
            boolean available = availabilityService.isAvailable(
                    accommodation.getId(),
                    request.getCheckInDate(),
                    request.getCheckOutDate()
            );

            if (!available) {
                throw new AccommodationNotAvailableException(
                        "Accommodation is not available for the selected dates"
                );
            }

            // Calculate total amount (server-side calculation for security)
            BigDecimal totalAmount = calculateTotalAmount(
                    accommodation.getPricePerNight(),
                    request.getCheckInDate(),
                    request.getCheckOutDate()
            );

            // Create booking entity
            StayBooking booking = new StayBooking();
            booking.setUser(user);
            booking.setAccommodation(accommodation);
            booking.setGuestName(request.getGuestName());
            booking.setGuestEmail(request.getGuestEmail());
            booking.setGuestMobile(request.getGuestMobile());
            booking.setIdProofType(request.getIdProofType());
            booking.setIdProofReference(request.getIdProofReference());
            booking.setNumberOfGuests(request.getNumberOfGuests());
            booking.setNumberOfAdults(request.getNumberOfAdults());
            booking.setNumberOfChildren(request.getNumberOfChildren());
            booking.setCheckInDate(request.getCheckInDate());
            booking.setCheckInTime(request.getCheckInTime());
            booking.setCheckOutDate(request.getCheckOutDate());
            booking.setCheckOutTime(request.getCheckOutTime());
            booking.setSpecialRequest(request.getSpecialRequest());
            booking.setStatus(BookingStatus.PENDING);
            booking.setTotalAmount(totalAmount);
            booking.setCreatedAt(LocalDateTime.now());
            booking.setUpdatedAt(LocalDateTime.now());

            // Save booking
            StayBooking savedBooking = bookingRepository.save(booking);

            return mapToResponse(savedBooking);
        }
    }

    /**
     * Get all bookings for a specific user.
     * 
     * @param userId user ID (Integer)
     * @return list of user's bookings
     */
    @Transactional(readOnly = true)
    public List<StayBookingResponse> getUserBookings(Integer userId) {
        return bookingRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get booking by ID.
     * 
     * Validates that the booking belongs to the requesting user.
     * 
     * @param bookingId booking ID
     * @param userId authenticated user ID (Integer)
     * @return booking details
     * @throws StayBookingNotFoundException if not found
     * @throws SecurityException if user doesn't own booking
     */
    @Transactional(readOnly = true)
    public StayBookingResponse getBookingById(Integer bookingId, Integer userId) {
        StayBooking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new StayBookingNotFoundException(bookingId));

        // Validate ownership
        if (!booking.getUser().getId().equals(userId)) {
            throw new SecurityException("You are not authorized to access this booking");
        }

        return mapToResponse(booking);
    }

    /**
     * Cancel a booking.
     * 
     * Only PENDING or CONFIRMED bookings can be cancelled by users.
     * Validates ownership.
     * 
     * @param bookingId booking ID
     * @param userId authenticated user ID (Integer)
     * @return updated booking details
     * @throws StayBookingNotFoundException if not found
     * @throws SecurityException if unauthorized
     * @throws InvalidBookingStatusTransitionException if invalid status
     */
    @Transactional
    public StayBookingResponse cancelBooking(Integer bookingId, Integer userId) {
        StayBooking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new StayBookingNotFoundException(bookingId));

        // Validate ownership
        if (!booking.getUser().getId().equals(userId)) {
            throw new SecurityException("You are not authorized to cancel this booking");
        }

        // Validate status
        if (booking.getStatus() != BookingStatus.PENDING && 
            booking.getStatus() != BookingStatus.CONFIRMED) {
            throw new InvalidBookingStatusTransitionException(
                    "Only PENDING or CONFIRMED bookings can be cancelled. Current status: " + 
                    booking.getStatus()
            );
        }

        // Update status
        booking.setStatus(BookingStatus.CANCELLED);
        booking.setUpdatedAt(LocalDateTime.now());

        StayBooking updatedBooking = bookingRepository.save(booking);

        return mapToResponse(updatedBooking);
    }

    /**
     * Calculate total amount based on price per night and number of nights.
     * 
     * @param pricePerNight price per night
     * @param checkInDate check-in date
     * @param checkOutDate check-out date
     * @return total amount
     */
    private BigDecimal calculateTotalAmount(BigDecimal pricePerNight, 
                                           LocalDate checkInDate, 
                                           LocalDate checkOutDate) {
        if (pricePerNight == null || checkInDate == null || checkOutDate == null) {
            return BigDecimal.ZERO;
        }

        long nights = java.time.temporal.ChronoUnit.DAYS.between(checkInDate, checkOutDate);
        
        if (nights <= 0) {
            return BigDecimal.ZERO;
        }

        return pricePerNight.multiply(BigDecimal.valueOf(nights));
    }

    /**
     * Map entity to response DTO.
     */
    private StayBookingResponse mapToResponse(StayBooking booking) {
        StayBookingResponse response = new StayBookingResponse();
        response.setId(booking.getId());
        response.setAccommodationId(booking.getAccommodation().getId());
        response.setAccommodationType(booking.getAccommodation().getAccommodationType());
        response.setAccommodationName(booking.getAccommodation().getName());
        response.setGuestName(booking.getGuestName());
        response.setGuestEmail(booking.getGuestEmail());
        response.setGuestMobile(booking.getGuestMobile());
        response.setIdProofType(booking.getIdProofType());
        response.setNumberOfGuests(booking.getNumberOfGuests());
        response.setNumberOfAdults(booking.getNumberOfAdults());
        response.setNumberOfChildren(booking.getNumberOfChildren());
        response.setCheckInDate(booking.getCheckInDate());
        response.setCheckInTime(booking.getCheckInTime());
        response.setCheckOutDate(booking.getCheckOutDate());
        response.setCheckOutTime(booking.getCheckOutTime());
        response.setSpecialRequest(booking.getSpecialRequest());
        response.setStatus(booking.getStatus());
        response.setTotalAmount(booking.getTotalAmount());
        response.setCreatedAt(booking.getCreatedAt());
        return response;
    }
}
