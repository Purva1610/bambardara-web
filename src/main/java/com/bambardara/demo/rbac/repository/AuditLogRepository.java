package com.bambardara.demo.rbac.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.bambardara.demo.rbac.entity.AuditLog;

/**
 * {@link JpaSpecificationExecutor} backs GET /api/super-admin/audit-logs'
 * filtering (see AuditLogSpecifications and AuditLogService.search) -
 * database-level filtering with pagination, never "load everything and
 * filter in Java".
 */
public interface AuditLogRepository extends JpaRepository<AuditLog, Long>, JpaSpecificationExecutor<AuditLog> {

    Page<AuditLog> findAllByOrderByCreatedAtDesc(Pageable pageable);
}
