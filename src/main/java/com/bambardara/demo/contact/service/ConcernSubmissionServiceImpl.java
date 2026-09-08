package com.bambardara.demo.contact.service;

import org.springframework.stereotype.Service;

import com.bambardara.demo.auth.entity.User;
import com.bambardara.demo.contact.dto.ContactFormRequest;
import com.bambardara.demo.contact.dto.ContactResponse;
import com.bambardara.demo.contact.entity.ContactRequest;
import com.bambardara.demo.contact.mapper.ContactRequestMapper;
import com.bambardara.demo.contact.notification.ConcernNotifier;
import com.bambardara.demo.contact.repository.ContactRequestRepository;

@Service
public class ConcernSubmissionServiceImpl implements ConcernSubmissionService {

    private final ContactRequestRepository contactRequestRepository;
    private final ContactRequestMapper mapper;
    private final ConcernNotifier notifier;

    public ConcernSubmissionServiceImpl(
            ContactRequestRepository contactRequestRepository,
            ContactRequestMapper mapper,
            ConcernNotifier notifier) {

        this.contactRequestRepository = contactRequestRepository;
        this.mapper = mapper;
        this.notifier = notifier;
    }

    /**
     * Stores the concern, then hands the notification off.
     *
     * Not {@code @Transactional} on purpose: saveAndFlush commits before the
     * notifier runs, so an asynchronous implementation is guaranteed to find
     * the row. Wrapping this in a transaction would let the notification fire
     * against a row that is not committed yet.
     */
    @Override
    public ContactResponse submit(User user, ContactFormRequest request) {

        ContactRequest saved = contactRequestRepository.saveAndFlush(
                mapper.toEntity(user, request)
        );

        notifier.notifyOf(saved.getId());

        return new ContactResponse(
                "Thanks for reaching out. Our team will get back to you shortly.",
                saved.getId(),
                saved.getStatus().name()
        );
    }
}
