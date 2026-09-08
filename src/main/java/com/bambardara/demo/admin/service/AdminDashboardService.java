package com.bambardara.demo.admin.service;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bambardara.demo.admin.dto.DashboardStatsResponse;
import com.bambardara.demo.admin.dto.DashboardStatsResponse.RecentContactRequest;
import com.bambardara.demo.auth.repository.UserRepository;
import com.bambardara.demo.contact.entity.ConcernStatus;
import com.bambardara.demo.contact.entity.ContactRequest;
import com.bambardara.demo.contact.repository.ContactRequestRepository;

/**
 * Service for admin dashboard statistics and metrics.
 * 
 * Aggregates data from multiple repositories to provide
 * an overview of system activity and user engagement.
 */
@Service
public class AdminDashboardService {

    private static final DateTimeFormatter DATE_TIME_FORMATTER = 
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    private final UserRepository userRepository;
    private final ContactRequestRepository contactRequestRepository;

    public AdminDashboardService(
            UserRepository userRepository,
            ContactRequestRepository contactRequestRepository) {
        this.userRepository = userRepository;
        this.contactRequestRepository = contactRequestRepository;
    }

    /**
     * Get dashboard statistics including user counts, request counts by status,
     * and recent activity.
     * 
     * @return dashboard statistics
     */
    @Transactional(readOnly = true)
    public DashboardStatsResponse getDashboardStats() {
        // Count total users
        long totalUsers = userRepository.count();

        // Get all contact requests for statistics
        List<ContactRequest> allRequests = contactRequestRepository.findAll();

        // Total requests
        long totalRequests = allRequests.size();

        // Count by status
        long newRequests = allRequests.stream()
                .filter(r -> r.getStatus() == ConcernStatus.NEW)
                .count();

        long inProgressRequests = allRequests.stream()
                .filter(r -> r.getStatus() == ConcernStatus.IN_PROGRESS)
                .count();

        long resolvedRequests = allRequests.stream()
                .filter(r -> r.getStatus() == ConcernStatus.RESOLVED)
                .count();

        long closedRequests = allRequests.stream()
                .filter(r -> r.getStatus() == ConcernStatus.CLOSED)
                .count();

        // Get 10 most recent requests (already ordered by createdAt desc)
        List<RecentContactRequest> recentRequests = contactRequestRepository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .limit(10)
                .map(this::mapToRecentRequest)
                .collect(Collectors.toList());

        return new DashboardStatsResponse(
                totalUsers,
                totalRequests,
                newRequests,
                inProgressRequests,
                resolvedRequests,
                closedRequests,
                recentRequests
        );
    }

    /**
     * Map ContactRequest entity to simplified RecentContactRequest DTO.
     */
    private RecentContactRequest mapToRecentRequest(ContactRequest request) {
        return new RecentContactRequest(
                request.getId(),
                request.getName(),
                request.getEmail(),
                request.getConcernType().name(),
                request.getStatus().name(),
                request.getCreatedAt().format(DATE_TIME_FORMATTER)
        );
    }
}
