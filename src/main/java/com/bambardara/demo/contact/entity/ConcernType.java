package com.bambardara.demo.contact.entity;

/**
 * The "type of concern" dropdown on the contact page. Adding a value here is
 * safe; renaming or removing one breaks rows already stored under the old name,
 * because the column holds the enum name as text.
 * 
 * IMPORTANT: These values are aligned with the frontend enquiry form.
 * Each enum value maps to a specific concern type displayed to users.
 */
public enum ConcernType {

    /** Booking enquiry */
    BOOKING,
    
    /** Stay and hospitality */
    STAY_HOSPITALITY,
    
    /** Activities and adventure */
    ACTIVITIES_ADVENTURE,
    
    /** Farm and nature trails */
    FARM_NATURE_TRAILS,
    
    /** Payment or refund */
    PAYMENT_REFUND,
    
    /** Feedback or complaint */
    FEEDBACK_COMPLAINT,
    
    /** Investment plans */
    INVESTMENT_PLANS,
    
    /** Membership plans */
    MEMBERSHIP_PLANS,
    
    /** Other/General enquiry */
    OTHER
}
