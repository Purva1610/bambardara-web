package com.bambardara.demo.admin.dto;

import java.time.LocalDateTime;
import java.util.Map;

import com.bambardara.demo.contact.entity.ConcernStatus;
import com.bambardara.demo.contact.entity.ConcernType;

/**
 * Detailed contact request response for admin view.
 * 
 * Includes all information submitted by the user.
 */
public class AdminContactDetailResponse {

    private Integer id;
    private Integer userId;
    private String userName;
    private String userEmail;
    private String name;
    private String email;
    private String mobileNumber;
    private ConcernType concernType;
    private Map<String, Object> details;
    private String message;
    private ConcernStatus status;
    private boolean marketingEmailSent;
    private LocalDateTime createdAt;

    public AdminContactDetailResponse() {
    }

    public AdminContactDetailResponse(
            Integer id,
            Integer userId,
            String userName,
            String userEmail,
            String name,
            String email,
            String mobileNumber,
            ConcernType concernType,
            Map<String, Object> details,
            String message,
            ConcernStatus status,
            boolean marketingEmailSent,
            LocalDateTime createdAt) {
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.name = name;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.concernType = concernType;
        this.details = details;
        this.message = message;
        this.status = status;
        this.marketingEmailSent = marketingEmailSent;
        this.createdAt = createdAt;
    }

    /**
     * @return Integer return the id
     */
    public Integer getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * @return Integer return the userId
     */
    public Integer getUserId() {
        return userId;
    }

    /**
     * @param userId the userId to set
     */
    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    /**
     * @return String return the userName
     */
    public String getUserName() {
        return userName;
    }

    /**
     * @param userName the userName to set
     */
    public void setUserName(String userName) {
        this.userName = userName;
    }

    /**
     * @return String return the userEmail
     */
    public String getUserEmail() {
        return userEmail;
    }

    /**
     * @param userEmail the userEmail to set
     */
    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    /**
     * @return String return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return String return the email
     */
    public String getEmail() {
        return email;
    }

    /**
     * @param email the email to set
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * @return String return the mobileNumber
     */
    public String getMobileNumber() {
        return mobileNumber;
    }

    /**
     * @param mobileNumber the mobileNumber to set
     */
    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    /**
     * @return ConcernType return the concernType
     */
    public ConcernType getConcernType() {
        return concernType;
    }

    /**
     * @param concernType the concernType to set
     */
    public void setConcernType(ConcernType concernType) {
        this.concernType = concernType;
    }

    /**
     * @return Map<String,Object> return the details
     */
    public Map<String, Object> getDetails() {
        return details;
    }

    /**
     * @param details the details to set
     */
    public void setDetails(Map<String, Object> details) {
        this.details = details;
    }

    /**
     * @return String return the message
     */
    public String getMessage() {
        return message;
    }

    /**
     * @param message the message to set
     */
    public void setMessage(String message) {
        this.message = message;
    }

    /**
     * @return ConcernStatus return the status
     */
    public ConcernStatus getStatus() {
        return status;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(ConcernStatus status) {
        this.status = status;
    }

    /**
     * @return boolean return the marketingEmailSent
     */
    public boolean isMarketingEmailSent() {
        return marketingEmailSent;
    }

    /**
     * @param marketingEmailSent the marketingEmailSent to set
     */
    public void setMarketingEmailSent(boolean marketingEmailSent) {
        this.marketingEmailSent = marketingEmailSent;
    }

    /**
     * @return LocalDateTime return the createdAt
     */
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    /**
     * @param createdAt the createdAt to set
     */
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
