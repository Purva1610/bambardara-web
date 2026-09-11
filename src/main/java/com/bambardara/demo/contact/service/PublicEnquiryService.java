package com.bambardara.demo.contact.service;

import org.springframework.stereotype.Service;

import com.bambardara.demo.contact.dto.ContactResponse;
import com.bambardara.demo.contact.dto.PublicEnquiryRequest;
import com.bambardara.demo.contact.entity.ContactRequest;
import com.bambardara.demo.contact.entity.ConcernType;
import com.bambardara.demo.contact.repository.ContactRequestRepository;

/**
 * Handles public enquiries from the landing page (unauthenticated).
 *
 * Stores the enquiry and triggers email notification to marketing team.
 */
@Service
public class PublicEnquiryService {

    private final ContactRequestRepository contactRequestRepository;
    private final ContactEmailService contactEmailService;

    public PublicEnquiryService(
            ContactRequestRepository contactRequestRepository,
            ContactEmailService contactEmailService) {

        this.contactRequestRepository = contactRequestRepository;
        this.contactEmailService = contactEmailService;
    }

    /**
     * Stores the enquiry, then hands the notification off to a background thread.
     *
     * Not @Transactional on purpose: saveAndFlush commits before the async email
     * runs, so the background thread is guaranteed to find the row.
     */
    public ContactResponse submit(PublicEnquiryRequest request) {

        ContactRequest enquiry = new ContactRequest(
                null,
                request.getName().trim(),
                request.getEmail().trim(),
                normalizePhone(request.getPhone()),
                ConcernType.valueOf(request.getPurpose()),
                request.getDetails(),
                request.getMessage().trim()
        );

        ContactRequest saved = contactRequestRepository.saveAndFlush(enquiry);

        contactEmailService.sendConcernToMarketing(saved.getId());

        return new ContactResponse(
                "Thank you for your enquiry. Our team will get back to you shortly.",
                saved.getId(),
                saved.getStatus().name()
        );
    }

    private String normalizePhone(String phone) {

        if (phone == null || phone.isBlank()) {
            return null;
        }

        return phone.trim();
    }
}
