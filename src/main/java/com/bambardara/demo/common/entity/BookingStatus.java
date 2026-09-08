package com.bambardara.demo.common.entity;

/**
 * Booking status enum used across all booking types:
 * - Stay bookings
 * - Adventure bookings
 * - Agro tourism bookings
 * - Wellness bookings
 * 
 * Represents the lifecycle of a booking from creation to completion.
 */
public enum BookingStatus {
    /**
     * Initial status when booking is created.
     * Awaiting admin review/confirmation.
     */
    PENDING,
    
    /**
     * Admin has confirmed the booking.
     * Customer can proceed with payment or preparation.
     */
    CONFIRMED,
    
    /**
     * Booking has been cancelled by user or admin.
     * Terminal state - no further changes allowed.
     */
    CANCELLED,
    
    /**
     * Admin has rejected the booking.
     * Terminal state - no further changes allowed.
     */
    REJECTED,
    
    /**
     * Booking has been checked in (for stay bookings).
     * Used when guest arrives.
     */
    CHECKED_IN,
    
    /**
     * Booking has been completed/fulfilled.
     * Terminal state - no further changes allowed.
     */
    COMPLETED
}
