package com.bambardara.demo.contact.dto;

import java.util.Map;

import com.bambardara.demo.common.validation.EnumValue;
import com.bambardara.demo.contact.entity.ConcernType;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/**
 * Body of POST /api/contact.
 *
 * Deliberately has no userId field: the account is taken from the bearer token,
 * so a client cannot file a concern in someone else's name.
 */
public class ContactFormRequest {

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid Email format")
    private String email;

    // Optional field on the form. @Pattern skips null, so an omitted number
    // passes while a supplied one still has to be a real 10-digit mobile.
    // An empty string is normalised to null in ContactService.
    @Pattern(regexp = "^$|^[6-9]\\d{9}$", message = "Enter a valid 10-digit mobile number")
    private String mobileNumber;

    // Bound as a String rather than the ConcernType enum so that an unknown
    // value produces a normal validation error instead of a Jackson parse
    // failure, matching how RegisterRequest handles gender.
    //
    // @EnumValue reads the allowed names off ConcernType, so adding a concern
    // type is a one-line change to that enum and nothing here.
    @NotBlank(message = "Type of concern is required")
    @EnumValue(enumClass = ConcernType.class, message = "Select a valid type of concern")
    private String concernType;

    @NotBlank(message = "Message is required")
    @Size(min = 10, max = 2000, message = "Message must be between 10 and 2000 characters")
    private String message;

    private Map<String, Object> details;

    public ContactFormRequest() {

    }

    public ContactFormRequest(
            String name,
            String email,
            String mobileNumber,
            String concernType,
            Map<String, Object> details,
            String message) {

        this.name = name;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.concernType = concernType;
        this.details = details;
        this.message = message;

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
     * @return String return the concernType
     */
    public String getConcernType() {
        return concernType;
    }

    /**
     * @param concernType the concernType to set
     */
    public void setConcernType(String concernType) {
        this.concernType = concernType;
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

}
