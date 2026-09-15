package com.bambardara.demo.rbac.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import org.springframework.data.jpa.domain.Specification;

import com.bambardara.demo.rbac.entity.AuditLog;

/**
 * Database-level filters for GET /api/super-admin/audit-logs. Each returns
 * null when its filter is not requested, so they compose cleanly via
 * {@code Specification.where(...).and(...)} (see AuditLogService).
 */
public final class AuditLogSpecifications {

    private AuditLogSpecifications() {
    }

    /** Case-insensitive substring match against the actor's name or email. */
    public static Specification<AuditLog> actorMatches(String user) {

        if (user == null || user.isBlank()) {
            return null;
        }

        String pattern = "%" + user.trim().toLowerCase() + "%";

        return (root, query, cb) -> cb.or(
                cb.like(cb.lower(root.get("actor").get("name")), pattern),
                cb.like(cb.lower(root.get("actor").get("email")), pattern));
    }

    /** Case-insensitive substring match against the action code (e.g. "USER_CREATED"). */
    public static Specification<AuditLog> actionMatches(String action) {

        if (action == null || action.isBlank()) {
            return null;
        }

        String pattern = "%" + action.trim().toLowerCase() + "%";

        return (root, query, cb) -> cb.like(cb.lower(root.get("action")), pattern);
    }

    /** Exact (case-insensitive) match against the target type (e.g. "ROLE", "USER", "ROLE_MODULE"). */
    public static Specification<AuditLog> targetTypeEquals(String module) {

        if (module == null || module.isBlank()) {
            return null;
        }

        return (root, query, cb) -> cb.equal(cb.upper(root.get("targetType")), module.trim().toUpperCase());
    }

    /** Inclusive lower bound on createdAt, at the start of {@code dateFrom}. */
    public static Specification<AuditLog> createdOnOrAfter(LocalDate dateFrom) {

        if (dateFrom == null) {
            return null;
        }

        LocalDateTime from = dateFrom.atStartOfDay();
        return (root, query, cb) -> cb.greaterThanOrEqualTo(root.get("createdAt"), from);
    }

    /** Inclusive upper bound on createdAt, at the end of {@code dateTo}. */
    public static Specification<AuditLog> createdOnOrBefore(LocalDate dateTo) {

        if (dateTo == null) {
            return null;
        }

        LocalDateTime to = LocalDateTime.of(dateTo, LocalTime.MAX);
        return (root, query, cb) -> cb.lessThanOrEqualTo(root.get("createdAt"), to);
    }
}
