package com.bambardara.demo.admin.dto;

import com.bambardara.demo.contact.entity.ConcernStatus;

import jakarta.validation.constraints.NotNull;

/**
 * Request to update contact request status.
 * 
 * Admin can change the status of a contact request.
 */
public class UpdateContactStatusRequest {

    @NotNull(message = "Status is required")
    private ConcernStatus status;

    public UpdateContactStatusRequest() {
    }

    public UpdateContactStatusRequest(ConcernStatus status) {
        this.status = status;
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
}
