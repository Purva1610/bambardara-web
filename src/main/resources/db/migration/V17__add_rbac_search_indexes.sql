-- =============================================================================
-- V17: Indexes supporting the new Super Admin search/filter queries
-- =============================================================================
-- Purely additive: no table structure changes, no data changes. Adds
-- functional indexes matching the exact predicates the new
-- GET /api/super-admin/users (search by lower(name)/lower(email)) and
-- GET /api/super-admin/audit-logs (filter by action) queries now issue -
-- see UserSpecifications and AuditLogSpecifications.
--
-- users.email already has a unique constraint (from earlier migrations),
-- but that indexes the exact value, not lower(email); a case-insensitive
-- LIKE search does not use it, hence the separate functional index below.
-- =============================================================================

CREATE INDEX idx_users_name_lower ON users (LOWER(name));
CREATE INDEX idx_users_email_lower ON users (LOWER(email));

CREATE INDEX idx_audit_logs_action ON audit_logs (action);
