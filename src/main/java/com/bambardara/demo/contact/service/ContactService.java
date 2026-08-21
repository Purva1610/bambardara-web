package com.bambardara.demo.contact.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bambardara.demo.auth.entity.User;
import com.bambardara.demo.contact.dto.ContactFormRequest;
import com.bambardara.demo.contact.dto.ContactRequestView;
import com.bambardara.demo.contact.dto.ContactResponse;
import com.bambardara.demo.contact.entity.ConcernStatus;
import com.bambardara.demo.contact.entity.ConcernType;
import com.bambardara.demo.contact.entity.ContactRequest;
import com.bambardara.demo.contact.mapper.ContactRequestMapper;
import com.bambardara.demo.contact.repository.ContactRequestRepository;

@Service
public class ContactService {

    private final ContactRequestRepository contactRequestRepository;
    private final ContactEmailService contactEmailService;
    private final ContactRequestMapper contactRequestMapper;

    public ContactService(
            ContactRequestRepository contactRequestRepository,
            ContactEmailService contactEmailService,
            ContactRequestMapper contactRequestMapper) {

        this.contactRequestRepository = contactRequestRepository;
        this.contactEmailService = contactEmailService;
        this.contactRequestMapper = contactRequestMapper;
    }

    /**
     * Stores the concern, then hands the notification off to a background
     * thread.
     *
     * Not {@code @Transactional} on purpose: saveAndFlush commits before the
     * async email runs, so the background thread is guaranteed to find the row.
     * Wrapping this in a transaction would let the email fire against a row
     * that is not committed yet.
     */
    public ContactResponse submit(User user, ContactFormRequest request) {

        ContactRequest concern = new ContactRequest(
                user,
                request.getName().trim(),
                request.getEmail().trim(),
                normaliseMobile(request.getMobileNumber()),
                ConcernType.valueOf(request.getConcernType()),
                request.getDetails(),
                request.getMessage().trim()
        );

        ContactRequest saved = contactRequestRepository.saveAndFlush(concern);

        contactEmailService.sendConcernToMarketing(saved.getId());

        return new ContactResponse(
                "Thanks for reaching out. Our team will get back to you shortly.",
                saved.getId(),
                saved.getStatus().name()
        );
    }

    public List<ContactRequestView> listAll(ConcernStatus status) {

        List<ContactRequest> concerns = status == null
                ? contactRequestRepository.findAllByOrderByCreatedAtDesc()
                : contactRequestRepository.findByStatusOrderByCreatedAtDesc(status);

        return concerns.stream()
                .map(contactRequestMapper::toView)
                .toList();
    }

    /**
     * The signed-in user's own submissions, so the contact page can show a
     * history without exposing anyone else's concerns.
     */
    public List<ContactRequestView> listForUser(User user) {

        return contactRequestRepository
                .findByUserIdOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(contactRequestMapper::toView)
                .toList();
    }

    /**
     * The form leaves the optional mobile field as "" rather than omitting it,
     * so collapse blanks to null and keep the column meaningfully empty.
     */
    private String normaliseMobile(String mobileNumber) {

        if (mobileNumber == null || mobileNumber.isBlank()) {

            return null;
        }

        return mobileNumber.trim();
    }
}
