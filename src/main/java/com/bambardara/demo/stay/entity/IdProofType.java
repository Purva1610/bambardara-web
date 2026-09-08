package com.bambardara.demo.stay.entity;

/**
 * Types of ID proof accepted for stay bookings.
 * 
 * Used for guest identification and security purposes.
 * Only metadata/reference is stored, NOT the actual document.
 */
public enum IdProofType {
    /**
     * Aadhaar Card - Indian government-issued identity.
     */
    AADHAAR,
    
    /**
     * Passport - International identification document.
     */
    PASSPORT,
    
    /**
     * Driving Licence - Government-issued driving license.
     */
    DRIVING_LICENCE,
    
    /**
     * Voter ID - Election Commission of India voter identification.
     */
    VOTER_ID,
    
    /**
     * Other valid government-issued ID.
     */
    OTHER
}
