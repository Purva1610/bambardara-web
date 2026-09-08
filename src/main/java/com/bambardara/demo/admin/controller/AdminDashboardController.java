package com.bambardara.demo.admin.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bambardara.demo.admin.dto.DashboardStatsResponse;
import com.bambardara.demo.admin.service.AdminDashboardService;
import com.bambardara.demo.auth.dto.UserProfileResponse;
import com.bambardara.demo.auth.entity.User;

/**
 * Admin dashboard controller.
 * 
 * Provides aggregated statistics and metrics for admin overview.
 * 
 * Security: ADMIN role only (enforced by Spring Security).
 */
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminDashboardController {

    private final AdminDashboardService dashboardService;

    public AdminDashboardController(AdminDashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    /**
     * Get dashboard statistics.
     * 
     * GET /api/admin/dashboard/stats
     * 
     * Returns:
     * - Total users
     * - Total contact requests
     * - Requests by status (NEW, IN_PROGRESS, RESOLVED, CLOSED)
     * - Recent contact requests (last 10)
     * 
     * @return dashboard statistics
     */
    @GetMapping("/dashboard/stats")
    public ResponseEntity<DashboardStatsResponse> getDashboardStats() {
        DashboardStatsResponse stats = dashboardService.getDashboardStats();
        return ResponseEntity.ok(stats);
    }

    /**
     * Get current admin user profile.
     * 
     * GET /api/admin/me
     * 
     * Returns the currently authenticated admin's profile information.
     * This endpoint verifies the user has ADMIN role.
     * 
     * @param user authenticated admin user
     * @return admin profile
     */
    @GetMapping("/me")
    public ResponseEntity<UserProfileResponse> getCurrentAdmin(
            @AuthenticationPrincipal User user) {

        UserProfileResponse response = new UserProfileResponse(
                user.getId(),
                user.getFirebaseUid(),
                user.getName(),
                user.getEmail(),
                user.getMobileNumber(),
                user.getAddress(),
                user.getGender(),
                user.getRole()
        );

        return ResponseEntity.ok(response);
    }
}
