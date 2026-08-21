package com.bambardara.demo.contact.entity;

import java.time.LocalDateTime;
import java.util.Map;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import com.bambardara.demo.auth.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

/**
 * One submission of the contact-us form.
 *
 * The name/email/mobile columns hold what the user typed, which may differ from
 * their profile: the form is prefilled but editable, and marketing needs to
 * reply to the details actually given. {@link #user} is the account that was
 * logged in, taken from the bearer token and never from the request body.
 */
@Entity
@Table(name = "contact_requests")
public class ContactRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // LAZY so listing concerns does not drag a full User row along for each one.
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false)
    private String email;

    // Optional on the form, so nullable here. Text for the same reason as on
    // User: leading zeros and country prefixes must survive.
    @Column(name = "mobile_number", length = 15)
    private String mobileNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "concern_type", nullable = false, length = 40)
    private ConcernType concernType;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private Map<String, Object> details;

    @Column(nullable = false, length = 2000)
    private String message;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ConcernStatus status;

    // Whether the notification to the marketing team actually went out. Set on
    // a background thread after the row is committed, so admins can tell a
    // delivered concern from one that only reached the database.
    @Column(name = "marketing_email_sent", nullable = false)
    private boolean marketingEmailSent;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public ContactRequest() {

    }

    public ContactRequest(
            User user,
            String name,
            String email,
            String mobileNumber,
            ConcernType concernType,
            Map<String, Object> details,
            String message) {

        this.user = user;
        this.name = name;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.concernType = concernType;
        this.details = details;
        this.message = message;
        this.status = ConcernStatus.NEW;
        this.marketingEmailSent = false;

    }

    /**
     * Stamped by the database session rather than the client, so a wrong clock
     * on the user's machine cannot backdate a concern.
     */
    @PrePersist
    void onCreate() {

        if (createdAt == null) {

            createdAt = LocalDateTime.now();
        }

        if (status == null) {

            status = ConcernStatus.NEW;
        }
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
     * @return User return the user
     */
    public User getUser() {
        return user;
    }

    /**
     * @param user the user to set
     */
    public void setUser(User user) {
        this.user = user;
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
     * @return Map return the details
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
     * @return boolean return whether the marketing email was sent
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
