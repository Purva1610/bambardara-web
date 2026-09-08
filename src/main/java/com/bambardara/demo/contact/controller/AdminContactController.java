package com.bambardara.demo.contact.controller;

import java.util.List;
import java.util.Locale;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bambardara.demo.admin.dto.AdminContactDetailResponse;
import com.bambardara.demo.admin.dto.UpdateContactStatusRequest;
import com.bambardara.demo.admin.service.AdminContactService;
import com.bambardara.demo.contact.dto.ContactRequestView;
import com.bambardara.demo.contact.entity.ConcernStatus;
import com.bambardara.demo.contact.exception.InvalidConcernStatusException;
import com.bambardara.demo.contact.service.ConcernQueryService;

import jakarta.validation.Valid;

/**
 * Admin view of submitted concerns.
 *
 * Provides contact request listing, filtering, detail viewing, and status updates.
 *
 * Access: ADMIN role only (enforced by Spring Security).
 */
@RestController
@RequestMapping("/api/admin/contact-requests")
@PreAuthorize("hasRole('ADMIN')")
public class AdminContactController {

    private final ConcernQueryService queryService;
    private final AdminContactService adminContactService;

    public AdminContactController(
            ConcernQueryService queryService,
            AdminContactService adminContactService) {

        this.queryService = queryService;
        this.adminContactService = adminContactService;
    }

    /**
     * Get all contact requests (simple list, no pagination).
     * 
     * GET /api/admin/contact-requests
     * GET /api/admin/contact-requests?status=NEW
     * 
     * @param status optional filter, e.g. ?status=NEW. Bound as a String so an
     *               unknown value comes back as the same ApiError body as every
     *               other 400, instead of Spring's enum conversion failure.
     * @return list of contact requests
     */
    @GetMapping
    public ResponseEntity<List<ContactRequestView>> list(
            @RequestParam(required = false) String status) {

        return ResponseEntity.ok(queryService.findAll(parseStatus(status)));
    }

    /**
     * Get paginated contact requests.
     * 
     * GET /api/admin/contacts?page=0&size=20
     * GET /api/admin/contacts?status=NEW&page=0&size=20
     * 
     * @param status optional status filter
     * @param page page number (default: 0)
     * @param size page size (default: 20)
     * @return paginated contact requests
     */
    @GetMapping("/paginated")
    public ResponseEntity<Page<AdminContactDetailResponse>> getContactsPaginated(
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        // Validate pagination parameters
        if (page < 0) {
            page = 0;
        }
        if (size < 1 || size > 100) {
            size = 20;
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));

        Page<AdminContactDetailResponse> contacts;
        if (status != null && !status.trim().isEmpty()) {
            ConcernStatus concernStatus = parseStatus(status);
            contacts = adminContactService.getContactsByStatus(concernStatus, pageable);
        } else {
            contacts = adminContactService.getAllContacts(pageable);
        }

        return ResponseEntity.ok(contacts);
    }

    /**
     * Get detailed information about a specific contact request.
     * 
     * GET /api/admin/contacts/{id}
     * 
     * @param id contact request ID
     * @return contact details
     */
    @GetMapping("/{id}")
    public ResponseEntity<AdminContactDetailResponse> getContactById(
            @PathVariable Integer id) {

        AdminContactDetailResponse contact = adminContactService.getContactById(id);
        return ResponseEntity.ok(contact);
    }

    /**
     * Update the status of a contact request.
     * 
     * PATCH /api/admin/contacts/{id}/status
     * 
     * Request body:
     * {
     *   "status": "IN_PROGRESS"
     * }
     * 
     * @param id contact request ID
     * @param request status update request
     * @return updated contact details
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<AdminContactDetailResponse> updateContactStatus(
            @PathVariable Integer id,
            @Valid @RequestBody UpdateContactStatusRequest request) {

        AdminContactDetailResponse updated = adminContactService.updateContactStatus(
                id,
                request.getStatus()
        );

        return ResponseEntity.ok(updated);
    }

    /**
     * Parse status string to ConcernStatus enum.
     * 
     * @param status status string (nullable)
     * @return ConcernStatus enum or null
     * @throws InvalidConcernStatusException if status is invalid
     */
    private ConcernStatus parseStatus(String status) {

        if (status == null || status.isBlank()) {

            return null;
        }

        try {

            return ConcernStatus.valueOf(status.trim().toUpperCase(Locale.ROOT));

        } catch (IllegalArgumentException e) {

            throw new InvalidConcernStatusException(status);
        }
    }

}
