package com.bambardara.demo.contact.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bambardara.demo.contact.dto.ContactResponse;
import com.bambardara.demo.contact.dto.PublicEnquiryRequest;
import com.bambardara.demo.contact.service.PublicEnquiryService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/enquire")
public class PublicEnquiryController {

    private final PublicEnquiryService enquiryService;

    public PublicEnquiryController(PublicEnquiryService enquiryService) {
        this.enquiryService = enquiryService;
    }

    @PostMapping
    public ResponseEntity<ContactResponse> submit(
            @Valid @RequestBody PublicEnquiryRequest request) {

        ContactResponse response = enquiryService.submit(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
}
