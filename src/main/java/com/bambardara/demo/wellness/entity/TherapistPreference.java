package com.bambardara.demo.wellness.entity;

/**
 * Therapist gender preference for spa appointments.
 * 
 * Allows guests to specify their preference without forcing a choice.
 */
public enum TherapistPreference {
    /**
     * Prefer male therapist.
     */
    MALE,
    
    /**
     * Prefer female therapist.
     */
    FEMALE,
    
    /**
     * No gender preference - any available therapist is acceptable.
     */
    NO_PREFERENCE
}
