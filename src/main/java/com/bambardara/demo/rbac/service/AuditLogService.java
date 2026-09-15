package com.bambardara.demo.rbac.service;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bambardara.demo.auth.entity.User;
import com.bambardara.demo.rbac.dto.AuditLogResponse;
import com.bambardara.demo.rbac.entity.AuditLog;
import com.bambardara.demo.rbac.repository.AuditLogRepository;
import com.bambardara.demo.rbac.repository.AuditLogSpecifications;

/**
 * The only place an {@link AuditLog} row is written (see {@link #record}) -
 * callers pass plain strings for old/new value, never a raw entity, so
 * there is never a risk of a password, Keycloak secret, or token ending up
 * in the audit trail. Also serves GET /api/super-admin/audit-logs' read
 * side (see {@link #search}).
 */
@Service
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;

    public AuditLogService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    @Transactional
    public void record(User actor, String action, String targetType, String targetId,
            String oldValue, String newValue, String description) {

        AuditLog log = new AuditLog(actor, action, targetType, targetId, oldValue, newValue, description);
        auditLogRepository.save(log);
    }

    /**
     * @param user     optional case-insensitive substring match against the
     *                 acting user's name or email
     * @param action   optional case-insensitive substring match against the
     *                 action code (e.g. "USER" matches every user-related action)
     * @param module   optional exact match against the target type (e.g. "ROLE", "USER")
     * @param dateFrom optional inclusive lower bound (start of day)
     * @param dateTo   optional inclusive upper bound (end of day)
     * @return a database-filtered, paginated audit log list, mapped to a
     *         DTO that never exposes anything beyond what {@link #record}
     *         ever wrote
     */
    @Transactional(readOnly = true)
    public Page<AuditLogResponse> search(String user, String action, String module,
            LocalDate dateFrom, LocalDate dateTo, Pageable pageable) {

        Specification<AuditLog> spec = Specification
                .where(AuditLogSpecifications.actorMatches(user))
                .and(AuditLogSpecifications.actionMatches(action))
                .and(AuditLogSpecifications.targetTypeEquals(module))
                .and(AuditLogSpecifications.createdOnOrAfter(dateFrom))
                .and(AuditLogSpecifications.createdOnOrBefore(dateTo));

        return auditLogRepository.findAll(spec, pageable).map(this::toResponse);
    }

    private AuditLogResponse toResponse(AuditLog log) {

        User actor = log.getActor();

        return new AuditLogResponse(
                log.getId(),
                actor != null ? actor.getId() : null,
                actor != null ? actor.getName() : null,
                actor != null ? actor.getEmail() : null,
                log.getAction(),
                log.getTargetType(),
                log.getTargetId(),
                log.getOldValue(),
                log.getNewValue(),
                log.getDescription(),
                log.getCreatedAt());
    }
}
