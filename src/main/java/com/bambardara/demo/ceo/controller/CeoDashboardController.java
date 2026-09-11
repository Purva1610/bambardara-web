package com.bambardara.demo.ceo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bambardara.demo.ceo.dto.CeoDashboardResponse;
import com.bambardara.demo.ceo.service.CeoDashboardService;

/**
 * The CEO Overview read-model endpoint. Thin by design - all aggregation
 * lives in {@link CeoDashboardService}; this class does not touch a
 * repository or perform any calculation itself.
 *
 * Access: CEO realm role only, same convention as {@code /api/admin/**}
 * (see SecurityConfig's {@code /api/ceo/**} matcher, enforced redundantly
 * here via {@code @PreAuthorize}).
 */
@RestController
@RequestMapping("/api/ceo")
@PreAuthorize("hasRole('CEO')")
public class CeoDashboardController {

    private final CeoDashboardService dashboardService;

    public CeoDashboardController(CeoDashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<CeoDashboardResponse> getDashboard() {

        return ResponseEntity.ok(dashboardService.getDashboard());
    }
}