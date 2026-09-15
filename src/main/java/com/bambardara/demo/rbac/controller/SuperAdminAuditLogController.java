package com.bambardara.demo.rbac.controller;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bambardara.demo.rbac.dto.AuditLogResponse;
import com.bambardara.demo.rbac.service.AuditLogService;

/**
 * Read-only access to the authorization-management audit trail. SUPER_ADMIN
 * only, enforced both at SecurityConfig's {@code /api/super-admin/**}
 * matcher and here via {@code @PreAuthorize}, same convention as every
 * other Super Admin controller. Newest entries first by default.
 */
@RestController
@RequestMapping("/api/super-admin/audit-logs")
@PreAuthorize("hasRole('SUPER_ADMIN')")
public class SuperAdminAuditLogController {

    private final AuditLogService auditLogService;

    public SuperAdminAuditLogController(AuditLogService auditLogService) {
        this.auditLogService = auditLogService;
    }

    @GetMapping
    public ResponseEntity<Page<AuditLogResponse>> getAuditLogs(
            @RequestParam(required = false) String user,
            @RequestParam(required = false) String action,
            @RequestParam(required = false) String module,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateFrom,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateTo,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        int safeSize = (size < 1 || size > 100) ? 20 : size;
        int safePage = Math.max(page, 0);

        Pageable pageable = PageRequest.of(safePage, safeSize, Sort.by(Sort.Direction.DESC, "createdAt"));

        return ResponseEntity.ok(auditLogService.search(user, action, module, dateFrom, dateTo, pageable));
    }
}
