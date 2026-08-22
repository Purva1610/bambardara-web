package com.bambardara.demo.contact.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bambardara.demo.auth.entity.User;
import com.bambardara.demo.contact.dto.ContactFormRequest;
import com.bambardara.demo.contact.dto.ContactRequestView;
import com.bambardara.demo.contact.dto.ContactResponse;
import com.bambardara.demo.contact.service.ConcernQueryService;
import com.bambardara.demo.contact.service.ConcernSubmissionService;

import jakarta.validation.Valid;

/**
 * Contact-us endpoints.
 *
 * POST /api/contact is public to allow anonymous enquiries.
 * GET /api/contact/my requires authentication to show a user's own submissions.
 */
@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ConcernSubmissionService submissionService;
    private final ConcernQueryService queryService;

    public ContactController(
            ConcernSubmissionService submissionService,
            ConcernQueryService queryService) {

        this.submissionService = submissionService;
        this.queryService = queryService;
    }

    /**
     * Submit an enquiry/concern.
     * 
     * Works for both authenticated and anonymous users. When authenticated,
     * the user parameter is populated; when anonymous, it is null.
     */
    @PostMapping
    public ResponseEntity<ContactResponse> submit(
            @AuthenticationPrincipal(errorOnInvalidType = false) User user,
            @Valid @RequestBody ContactFormRequest request) {

        ContactResponse response = submissionService.submit(user, request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    /**
     * List the authenticated user's own submissions.
     * 
     * Requires authentication - user parameter is never null here.
     */
    @GetMapping("/my")
    public ResponseEntity<List<ContactRequestView>> myConcerns(
            @AuthenticationPrincipal User user) {

        return ResponseEntity.ok(queryService.findForUser(user));
    }

}
