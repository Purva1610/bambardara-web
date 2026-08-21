package com.bambardara.demo.contact.controller;

import java.util.List;
import java.util.Locale;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bambardara.demo.contact.dto.ContactRequestView;
import com.bambardara.demo.contact.entity.ConcernStatus;
import com.bambardara.demo.contact.exception.InvalidConcernStatusException;
import com.bambardara.demo.contact.service.ConcernQueryService;

/**
 * Admin view of submitted concerns.
 *
 * Injects only {@link ConcernQueryService}: nothing here submits, so nothing
 * here should be able to.
 *
 * TODO: this is permitAll in SecurityConfig until User gains a role. Add the
 * role check before this reaches production - right now anyone who knows the
 * URL can read every concern, including the users' contact details.
 */
@RestController
@RequestMapping("/api/admin/contact-requests")
public class AdminContactController {

    private final ConcernQueryService queryService;

    public AdminContactController(ConcernQueryService queryService) {

        this.queryService = queryService;
    }

    /**
     * @param status optional filter, e.g. ?status=NEW. Bound as a String so an
     *               unknown value comes back as the same ApiError body as every
     *               other 400, instead of Spring's enum conversion failure.
     */
    @GetMapping
    public ResponseEntity<List<ContactRequestView>> list(
            @RequestParam(required = false) String status) {

        return ResponseEntity.ok(queryService.findAll(parseStatus(status)));
    }

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
