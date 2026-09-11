package com.bambardara.demo.contact.dto;

import java.util.Map;

import com.bambardara.demo.common.validation.EnumValue;
import com.bambardara.demo.contact.entity.ConcernType;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/**
 * Body of POST /api/enquire.
 *
 * Public endpoint for enquiries from the landing page.
 * No user account required.
 */
public class PublicEnquiryRequest {

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid Email format")
    private String email;

    @Pattern(regexp = "^$|^[0-9+\\-\\s]{7,15}$", message = "Enter a valid phone number")
    private String phone;

    @NotBlank(message = "Purpose is required")
    @EnumValue(enumClass = ConcernType.class, message = "Select a valid purpose")
    private String purpose;

    @NotBlank(message = "Message is required")
    @Size(min = 10, max = 2000, message = "Message must be between 10 and 2000 characters")
    private String message;

    private Map<String, Object> details;

    public PublicEnquiryRequest() {
    }

    public PublicEnquiryRequest(
            String name,
            String email,
            String phone,
            String purpose,
            String message,
            Map<String, Object> details) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.purpose = purpose;
        this.message = message;
        this.details = details;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Map<String, Object> getDetails() {
        return details;
    }

    public void setDetails(Map<String, Object> details) {
        this.details = details;
    }
}
