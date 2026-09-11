package com.bambardara.demo.admin.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bambardara.demo.admin.dto.AdminContactDetailResponse;
import com.bambardara.demo.contact.entity.ConcernStatus;
import com.bambardara.demo.contact.entity.ContactRequest;
import com.bambardara.demo.contact.repository.ContactRequestRepository;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for admin contact request management.
 * 
 * Provides contact listing, filtering, detail viewing, and status updates.
 * Reuses existing ContactRequestRepository.
 */
@Service
public class AdminContactService {

    private final ContactRequestRepository contactRequestRepository;

    public AdminContactService(ContactRequestRepository contactRequestRepository) {
        this.contactRequestRepository = contactRequestRepository;
    }

    /**
     * Get paginated list of all contact requests.
     * 
     * @param pageable pagination parameters
     * @return page of contact requests
     */
    @Transactional(readOnly = true)
    public Page<AdminContactDetailResponse> getAllContacts(Pageable pageable) {
        List<ContactRequest> allRequests = contactRequestRepository.findAllByOrderByCreatedAtDesc();
        
        return paginateList(
                allRequests.stream()
                        .map(this::mapToDetailResponse)
                        .collect(Collectors.toList()),
                pageable
        );
    }

    /**
     * Get paginated list of contact requests filtered by status.
     * 
     * @param status filter by status
     * @param pageable pagination parameters
     * @return page of filtered contact requests
     */
    @Transactional(readOnly = true)
    public Page<AdminContactDetailResponse> getContactsByStatus(
            ConcernStatus status,
            Pageable pageable) {
        
        List<ContactRequest> requests = contactRequestRepository
                .findByStatusOrderByCreatedAtDesc(status);
        
        return paginateList(
                requests.stream()
                        .map(this::mapToDetailResponse)
                        .collect(Collectors.toList()),
                pageable
        );
    }

    /**
     * Get detailed information about a specific contact request.
     * 
     * @param contactId contact request ID
     * @return contact details
     * @throws RuntimeException if contact not found
     */
    @Transactional(readOnly = true)
    public AdminContactDetailResponse getContactById(Integer contactId) {
        ContactRequest request = contactRequestRepository.findById(contactId)
                .orElseThrow(() -> new RuntimeException(
                        "Contact request not found with id: " + contactId));

        return mapToDetailResponse(request);
    }

    /**
     * Update the status of a contact request.
     * 
     * @param contactId contact request ID
     * @param newStatus new status
     * @return updated contact details
     * @throws RuntimeException if contact not found
     */
    @Transactional
    public AdminContactDetailResponse updateContactStatus(
            Integer contactId,
            ConcernStatus newStatus) {
        
        ContactRequest request = contactRequestRepository.findById(contactId)
                .orElseThrow(() -> new RuntimeException(
                        "Contact request not found with id: " + contactId));

        request.setStatus(newStatus);
        ContactRequest updated = contactRequestRepository.save(request);

        return mapToDetailResponse(updated);
    }

    /**
     * Map ContactRequest entity to detailed admin response.
     */
    private AdminContactDetailResponse mapToDetailResponse(ContactRequest request) {
        return new AdminContactDetailResponse(
                request.getId(),
                request.getUser() == null ? null : request.getUser().getId(),
                request.getUser() == null ? null : request.getUser().getName(),
                request.getUser() == null ? null : request.getUser().getEmail(),
                request.getName(),
                request.getEmail(),
                request.getMobileNumber(),
                request.getConcernType(),
                request.getDetails(),
                request.getMessage(),
                request.getStatus(),
                request.isMarketingEmailSent(),
                request.getCreatedAt()
        );
    }

    /**
     * Manually paginate a list (since we're using List instead of Page from repo).
     */
    private <T> Page<T> paginateList(List<T> list, Pageable pageable) {
        int start = (int) pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), list.size());
        
        if (start > list.size()) {
            return new PageImpl<>(List.of(), pageable, list.size());
        }
        
        return new PageImpl<>(
                list.subList(start, end),
                pageable,
                list.size()
        );
    }
}
