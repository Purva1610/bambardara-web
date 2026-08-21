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
 * Contact-us endpoints for signed-in users.
 *
 * Both routes fall under {@code anyRequest().authenticated()}, so an absent or
 * expired token is turned into a 401 by the security chain before any of this
 * runs; {@code user} is therefore never null here.
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

    @PostMapping
    public ResponseEntity<ContactResponse> submit(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody ContactFormRequest request) {

        ContactResponse response = submissionService.submit(user, request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping("/my")
    public ResponseEntity<List<ContactRequestView>> myConcerns(
            @AuthenticationPrincipal User user) {

        return ResponseEntity.ok(queryService.findForUser(user));
    }

}
