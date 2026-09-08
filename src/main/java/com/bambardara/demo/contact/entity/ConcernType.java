package com.bambardara.demo.contact.entity;

/**
 * The "type of concern" dropdown on the contact page. Adding a value here is
 * safe; renaming or removing one breaks rows already stored under the old name,
 * because the column holds the enum name as text.
 */
public enum ConcernType {

    BOOKING_ENQUIRY,
    STAY_AND_HOSPITALITY,
    ACTIVITIES_AND_ADVENTURE,
    EVENTS_AND_CELEBRATIONS,
    FARM_AND_NATURE_TOURS,
    PAYMENT_OR_REFUND,
    FEEDBACK_OR_COMPLAINT,
    MEMBERSHIP_PLAN,
    INVESTMENT,
    OTHER
}
