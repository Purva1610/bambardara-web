package com.bambardara.demo.contact.dto;

/**
 * Acknowledgement returned to the user after submitting the contact form.
 */
public class ContactResponse {

    private String message;

    // Reference the user can quote when following up.
    private Integer concernId;

    private String status;

    public ContactResponse() {

    }

    public ContactResponse(String message, Integer concernId, String status) {

        this.message = message;
        this.concernId = concernId;
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
     * @return Integer return the concernId
     */
    public Integer getConcernId() {
        return concernId;
    }

    /**
     * @param concernId the concernId to set
     */
    public void setConcernId(Integer concernId) {
        this.concernId = concernId;
    }

    /**
     * @return String return the status
     */
    public String getStatus() {
        return status;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(String status) {
        this.status = status;
    }

}
