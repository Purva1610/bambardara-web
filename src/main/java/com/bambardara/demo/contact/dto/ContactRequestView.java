package com.bambardara.demo.contact.dto;

import java.time.LocalDateTime;
import java.util.Map;

/**
 * One row of the concern list.
 *
 * A separate type rather than the entity itself: serialising ContactRequest
 * directly would pull the whole User across the wire, password hash included.
 *
 * Read-only, so it has getters but no setters, and it knows nothing about the
 * entity it was built from - see ContactRequestMapper.
 */
public class ContactRequestView {

    private final Integer id;

    private final String name;

    private final String email;

    private final String mobileNumber;

    private final String concernType;

    private final Map<String, Object> details;

    private final String message;

    private final String status;

    private final boolean marketingEmailSent;

    private final LocalDateTime createdAt;

    // The account that was logged in when the form was submitted, which is not
    // necessarily the same as the contact details typed into it.
    private final Integer userId;

    private final String userEmail;

    public ContactRequestView(
            Integer id,
            String name,
            String email,
            String mobileNumber,
            String concernType,
            Map<String, Object> details,
            String message,
            String status,
            boolean marketingEmailSent,
            LocalDateTime createdAt,
            Integer userId,
            String userEmail) {

        this.id = id;
        this.name = name;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.concernType = concernType;
        this.details = details;
        this.message = message;
        this.status = status;
        this.marketingEmailSent = marketingEmailSent;
        this.createdAt = createdAt;
        this.userId = userId;
        this.userEmail = userEmail;

    }

    /**
     * @return Integer return the id
     */
    public Integer getId() {
        return id;
    }

    /**
     * @return String return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @return String return the email
     */
    public String getEmail() {
        return email;
    }

    /**
     * @return String return the mobileNumber
     */
    public String getMobileNumber() {
        return mobileNumber;
    }

    /**
     * @return String return the concernType
     */
    public String getConcernType() {
        return concernType;
    }

    /**
     * @return Map return the details
     */
    public Map<String, Object> getDetails() {
        return details;
    }

    /**
     * @return String return the message
     */
    public String getMessage() {
        return message;
    }

    /**
     * @return String return the status
     */
    public String getStatus() {
        return status;
    }

    /**
     * @return boolean return whether the marketing email was sent
     */
    public boolean isMarketingEmailSent() {
        return marketingEmailSent;
    }

    /**
     * @return LocalDateTime return the createdAt
     */
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    /**
     * @return Integer return the userId
     */
    public Integer getUserId() {
        return userId;
    }

    /**
     * @return String return the userEmail
     */
    public String getUserEmail() {
        return userEmail;
    }

}
