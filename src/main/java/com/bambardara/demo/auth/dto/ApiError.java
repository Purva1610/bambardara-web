package com.bambardara.demo.auth.dto;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * Shared error body returned by GlobalExceptionHandler.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiError {

    private int status;

    private String message;

    // Only populated for validation failures: field name -> message.
    private Map<String, String> fieldErrors;

    public ApiError() {

    }

    public ApiError(int status, String message) {

        this.status = status;
        this.message = message;

    }

    public ApiError(int status, String message, Map<String, String> fieldErrors) {

        this.status = status;
        this.message = message;
        this.fieldErrors = fieldErrors;

    }

    /**
     * @return int return the status
     */
    public int getStatus() {
        return status;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(int status) {
        this.status = status;
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
     * @return Map<String, String> return the fieldErrors
     */
    public Map<String, String> getFieldErrors() {
        return fieldErrors;
    }

    /**
     * @param fieldErrors the fieldErrors to set
     */
    public void setFieldErrors(Map<String, String> fieldErrors) {
        this.fieldErrors = fieldErrors;
    }

}
