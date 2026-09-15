-- =============================================================================
-- V16: Dynamic Role-Based Access Control (RBAC) schema
-- =============================================================================
-- Purely additive. Does not touch the existing users.role (UserRole enum:
-- USER/ADMIN/MARKETING) column, and does not touch the Keycloak-only CEO
-- realm role - both keep working exactly as before. This migration adds a
-- second, independent authorization axis ("Bambardara business role") on top
-- of them:
--
--   users.role         -> legacy enum, still drives hasRole('ADMIN')
--   Keycloak realm role -> still drives hasRole('CEO')
--   users.role_id       -> NEW. Points at roles(id) below. Drives the dynamic
--                          module/permission checks introduced in this
--                          migration and nothing else.
--
-- Seed data intentionally grants every module and permission to SUPER_ADMIN
-- only. Every other seeded role (CEO, CFO, MD, PROJECT_DIRECTOR, MANAGER,
-- EMPLOYEE) starts with zero enabled modules and zero permissions - per the
-- spec, access is explicitly configured by a SUPER_ADMIN via the
-- /api/super-admin/roles/{roleId}/modules and .../permissions APIs, never
-- inherited automatically from the hierarchy.
-- =============================================================================

-- =============================================================================
-- TABLE: roles
-- =============================================================================
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) NOT NULL,
    description VARCHAR(500),

    is_system_role BOOLEAN NOT NULL DEFAULT false,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE roles ADD CONSTRAINT roles_code_unique UNIQUE (code);

COMMENT ON TABLE roles IS 'Bambardara business roles (SUPER_ADMIN, CEO, CFO, MD, ...) - independent of the legacy users.role enum and of Keycloak realm roles.';
COMMENT ON COLUMN roles.code IS 'Stable machine-readable identifier, e.g. SUPER_ADMIN, PROJECT_DIRECTOR. Never renamed once referenced by role_modules/role_permissions.';
COMMENT ON COLUMN roles.is_system_role IS 'System-seeded roles cannot be deleted (enforced in RoleService), so the initial hierarchy cannot be accidentally removed.';

-- =============================================================================
-- TABLE: modules
-- =============================================================================
CREATE TABLE IF NOT EXISTS modules (
    id SERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) NOT NULL,
    description VARCHAR(500),

    parent_id INTEGER,
    display_order INTEGER NOT NULL DEFAULT 0,
    active BOOLEAN NOT NULL DEFAULT true,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE modules ADD CONSTRAINT modules_code_unique UNIQUE (code);

ALTER TABLE modules
ADD CONSTRAINT fk_modules_parent
    FOREIGN KEY (parent_id)
    REFERENCES modules(id)
    ON DELETE RESTRICT;

CREATE INDEX idx_modules_parent_id ON modules(parent_id);

COMMENT ON TABLE modules IS 'Business management modules a role can be granted access to. parent_id allows future nested submodules; unused for now.';

-- =============================================================================
-- TABLE: permissions
-- =============================================================================
CREATE TABLE IF NOT EXISTS permissions (
    id SERIAL PRIMARY KEY,

    name VARCHAR(150) NOT NULL,
    code VARCHAR(60) NOT NULL,
    description VARCHAR(500),

    module_id INTEGER NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE permissions ADD CONSTRAINT permissions_code_unique UNIQUE (code);

ALTER TABLE permissions
ADD CONSTRAINT fk_permissions_module
    FOREIGN KEY (module_id)
    REFERENCES modules(id)
    ON DELETE RESTRICT;

CREATE INDEX idx_permissions_module_id ON permissions(module_id);

COMMENT ON TABLE permissions IS 'Action-based permissions (VIEW/CREATE/EDIT/DELETE/APPROVE/EXPORT), each scoped to one module.';

-- =============================================================================
-- TABLE: role_modules  (the Super Admin toggle)
-- =============================================================================
CREATE TABLE IF NOT EXISTS role_modules (
    id SERIAL PRIMARY KEY,

    role_id INTEGER NOT NULL,
    module_id INTEGER NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT false,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE role_modules
ADD CONSTRAINT fk_role_modules_role
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE CASCADE;

ALTER TABLE role_modules
ADD CONSTRAINT fk_role_modules_module
    FOREIGN KEY (module_id)
    REFERENCES modules(id)
    ON DELETE RESTRICT;

ALTER TABLE role_modules
ADD CONSTRAINT role_modules_role_module_unique
UNIQUE (role_id, module_id);

CREATE INDEX idx_role_modules_role_id ON role_modules(role_id);

COMMENT ON TABLE role_modules IS 'Which modules are enabled for which role. One row per (role, module); enabled toggled by SUPER_ADMIN via PUT /api/super-admin/roles/{roleId}/modules.';

-- =============================================================================
-- TABLE: role_permissions
-- =============================================================================
CREATE TABLE IF NOT EXISTS role_permissions (
    id SERIAL PRIMARY KEY,

    role_id INTEGER NOT NULL,
    permission_id INTEGER NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE role_permissions
ADD CONSTRAINT fk_role_permissions_role
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE CASCADE;

ALTER TABLE role_permissions
ADD CONSTRAINT fk_role_permissions_permission
    FOREIGN KEY (permission_id)
    REFERENCES permissions(id)
    ON DELETE RESTRICT;

ALTER TABLE role_permissions
ADD CONSTRAINT role_permissions_role_permission_unique
UNIQUE (role_id, permission_id);

CREATE INDEX idx_role_permissions_role_id ON role_permissions(role_id);

COMMENT ON TABLE role_permissions IS 'Which permissions a role holds. Presence of a row = granted; there is no enabled flag here (absence means not granted).';

-- =============================================================================
-- TABLE: audit_logs
-- =============================================================================
CREATE TABLE IF NOT EXISTS audit_logs (
    id BIGSERIAL PRIMARY KEY,

    actor_user_id INTEGER NOT NULL,
    action VARCHAR(100) NOT NULL,
    target_type VARCHAR(50) NOT NULL,
    target_id VARCHAR(100),
    old_value TEXT,
    new_value TEXT,
    description VARCHAR(1000),

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE audit_logs
ADD CONSTRAINT fk_audit_logs_actor
    FOREIGN KEY (actor_user_id)
    REFERENCES users(id)
    ON DELETE RESTRICT;

CREATE INDEX idx_audit_logs_actor_user_id ON audit_logs(actor_user_id);
CREATE INDEX idx_audit_logs_target ON audit_logs(target_type, target_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);

COMMENT ON TABLE audit_logs IS 'Authorization-management change history (role/module/permission/user changes). Never stores passwords, secrets or tokens.';

-- =============================================================================
-- users: add role_id (new Bambardara business role) and status
-- =============================================================================
-- Nullable: existing users are not auto-assigned any business role. status
-- defaults every existing row to ACTIVE, matching current (implicit) behavior.

ALTER TABLE users ADD COLUMN role_id INTEGER;
ALTER TABLE users ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE';

ALTER TABLE users
ADD CONSTRAINT fk_users_role
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE RESTRICT;

ALTER TABLE users
ADD CONSTRAINT users_status_valid
CHECK (status IN ('ACTIVE', 'DISABLED'));

CREATE INDEX idx_users_role_id ON users(role_id);
CREATE INDEX idx_users_status ON users(status);

COMMENT ON COLUMN users.role_id IS 'Bambardara business role (see roles table). Independent of the legacy role enum column. NULL = no business role assigned.';
COMMENT ON COLUMN users.status IS 'ACTIVE or DISABLED. A DISABLED user is rejected at authentication time regardless of role.';

-- =============================================================================
-- TRIGGER: auto-update updated_at
-- =============================================================================

CREATE OR REPLACE FUNCTION update_rbac_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER roles_updated_at_trigger
    BEFORE UPDATE ON roles
    FOR EACH ROW
    EXECUTE FUNCTION update_rbac_updated_at();

CREATE TRIGGER modules_updated_at_trigger
    BEFORE UPDATE ON modules
    FOR EACH ROW
    EXECUTE FUNCTION update_rbac_updated_at();

CREATE TRIGGER permissions_updated_at_trigger
    BEFORE UPDATE ON permissions
    FOR EACH ROW
    EXECUTE FUNCTION update_rbac_updated_at();

CREATE TRIGGER role_modules_updated_at_trigger
    BEFORE UPDATE ON role_modules
    FOR EACH ROW
    EXECUTE FUNCTION update_rbac_updated_at();

CREATE TRIGGER role_permissions_updated_at_trigger
    BEFORE UPDATE ON role_permissions
    FOR EACH ROW
    EXECUTE FUNCTION update_rbac_updated_at();

-- =============================================================================
-- SEED: roles (business hierarchy)
-- =============================================================================
INSERT INTO roles (name, code, description, is_system_role) VALUES
    ('Super Admin', 'SUPER_ADMIN', 'Highest authorization-management role. Manages users, roles, module access and permissions.', true),
    ('Chief Executive Officer', 'CEO', 'Top business role, reports to Super Admin.', true),
    ('Chief Financial Officer', 'CFO', 'Reports to CEO.', true),
    ('Managing Director', 'MD', 'Reports to CEO.', true),
    ('Project Director', 'PROJECT_DIRECTOR', 'Reports to MD.', true),
    ('Manager', 'MANAGER', 'Reports to Project Director.', true),
    ('Employee', 'EMPLOYEE', 'Reports to Manager.', true);

-- =============================================================================
-- SEED: modules (Bambardara management system)
-- =============================================================================
INSERT INTO modules (name, code, description, display_order) VALUES
    ('Dashboard', 'DASHBOARD', 'Overview dashboard.', 1),
    ('Projects', 'PROJECTS', 'Project management.', 2),
    ('Construction', 'CONSTRUCTION', 'Construction tracking.', 3),
    ('Finance', 'FINANCE', 'Financial management.', 4),
    ('Procurement', 'PROCUREMENT', 'Procurement management.', 5),
    ('Vendors', 'VENDORS', 'Vendor management.', 6),
    ('Sales & Marketing', 'SALES_MARKETING', 'Sales and marketing.', 7),
    ('HR', 'HR', 'Human resources.', 8),
    ('Approvals', 'APPROVALS', 'Approval workflows.', 9),
    ('Reports', 'REPORTS', 'Reporting and analytics.', 10),
    ('Risks', 'RISKS', 'Risk management.', 11),
    ('Documents', 'DOCUMENTS', 'Document management.', 12),
    ('Calendar', 'CALENDAR', 'Calendar and scheduling.', 13),
    ('Communication', 'COMMUNICATION', 'Internal communication.', 14),
    ('Settings', 'SETTINGS', 'System and user-management settings.', 15);

-- =============================================================================
-- SEED: permissions (kept intentionally small - only where it makes sense)
-- =============================================================================
INSERT INTO permissions (name, code, description, module_id) VALUES
    ('View Dashboard', 'DASHBOARD_VIEW', 'View the dashboard.', (SELECT id FROM modules WHERE code = 'DASHBOARD')),

    ('View Projects', 'PROJECT_VIEW', 'View projects.', (SELECT id FROM modules WHERE code = 'PROJECTS')),
    ('Create Projects', 'PROJECT_CREATE', 'Create projects.', (SELECT id FROM modules WHERE code = 'PROJECTS')),
    ('Edit Projects', 'PROJECT_EDIT', 'Edit projects.', (SELECT id FROM modules WHERE code = 'PROJECTS')),
    ('Delete Projects', 'PROJECT_DELETE', 'Delete projects.', (SELECT id FROM modules WHERE code = 'PROJECTS')),

    ('View Construction', 'CONSTRUCTION_VIEW', 'View construction progress.', (SELECT id FROM modules WHERE code = 'CONSTRUCTION')),
    ('Edit Construction', 'CONSTRUCTION_EDIT', 'Update construction progress.', (SELECT id FROM modules WHERE code = 'CONSTRUCTION')),

    ('View Finance', 'FINANCE_VIEW', 'View financial data.', (SELECT id FROM modules WHERE code = 'FINANCE')),
    ('Create Finance Records', 'FINANCE_CREATE', 'Create financial records.', (SELECT id FROM modules WHERE code = 'FINANCE')),
    ('Edit Finance Records', 'FINANCE_EDIT', 'Edit financial records.', (SELECT id FROM modules WHERE code = 'FINANCE')),
    ('Approve Finance', 'FINANCE_APPROVE', 'Approve financial transactions.', (SELECT id FROM modules WHERE code = 'FINANCE')),
    ('Export Finance', 'FINANCE_EXPORT', 'Export financial data.', (SELECT id FROM modules WHERE code = 'FINANCE')),

    ('View Procurement', 'PROCUREMENT_VIEW', 'View procurement records.', (SELECT id FROM modules WHERE code = 'PROCUREMENT')),
    ('Create Procurement', 'PROCUREMENT_CREATE', 'Create procurement requests.', (SELECT id FROM modules WHERE code = 'PROCUREMENT')),
    ('Approve Procurement', 'PROCUREMENT_APPROVE', 'Approve procurement requests.', (SELECT id FROM modules WHERE code = 'PROCUREMENT')),

    ('View Vendors', 'VENDOR_VIEW', 'View vendors.', (SELECT id FROM modules WHERE code = 'VENDORS')),
    ('Create Vendors', 'VENDOR_CREATE', 'Add vendors.', (SELECT id FROM modules WHERE code = 'VENDORS')),
    ('Edit Vendors', 'VENDOR_EDIT', 'Edit vendors.', (SELECT id FROM modules WHERE code = 'VENDORS')),

    ('View Sales & Marketing', 'SALES_VIEW', 'View sales and marketing data.', (SELECT id FROM modules WHERE code = 'SALES_MARKETING')),
    ('Create Sales & Marketing Records', 'SALES_CREATE', 'Create sales/marketing records.', (SELECT id FROM modules WHERE code = 'SALES_MARKETING')),

    ('View HR', 'HR_VIEW', 'View HR records.', (SELECT id FROM modules WHERE code = 'HR')),
    ('Create HR Records', 'HR_CREATE', 'Create HR records.', (SELECT id FROM modules WHERE code = 'HR')),
    ('Edit HR Records', 'HR_EDIT', 'Edit HR records.', (SELECT id FROM modules WHERE code = 'HR')),

    ('View Approvals', 'APPROVAL_VIEW', 'View pending approvals.', (SELECT id FROM modules WHERE code = 'APPROVALS')),
    ('Act on Approvals', 'APPROVAL_ACTION', 'Approve or reject items.', (SELECT id FROM modules WHERE code = 'APPROVALS')),

    ('View Reports', 'REPORT_VIEW', 'View reports.', (SELECT id FROM modules WHERE code = 'REPORTS')),
    ('Export Reports', 'REPORT_EXPORT', 'Export reports.', (SELECT id FROM modules WHERE code = 'REPORTS')),

    ('View Risks', 'RISK_VIEW', 'View risk register.', (SELECT id FROM modules WHERE code = 'RISKS')),
    ('Create Risks', 'RISK_CREATE', 'Log new risks.', (SELECT id FROM modules WHERE code = 'RISKS')),

    ('View Documents', 'DOCUMENT_VIEW', 'View documents.', (SELECT id FROM modules WHERE code = 'DOCUMENTS')),
    ('Upload Documents', 'DOCUMENT_UPLOAD', 'Upload documents.', (SELECT id FROM modules WHERE code = 'DOCUMENTS')),

    ('View Calendar', 'CALENDAR_VIEW', 'View calendar.', (SELECT id FROM modules WHERE code = 'CALENDAR')),

    ('View Communication', 'COMMUNICATION_VIEW', 'View internal communication.', (SELECT id FROM modules WHERE code = 'COMMUNICATION')),
    ('Send Communication', 'COMMUNICATION_SEND', 'Send internal communication.', (SELECT id FROM modules WHERE code = 'COMMUNICATION')),

    ('View Settings', 'SETTINGS_VIEW', 'View system settings.', (SELECT id FROM modules WHERE code = 'SETTINGS')),
    ('Edit Settings', 'SETTINGS_EDIT', 'Edit system settings.', (SELECT id FROM modules WHERE code = 'SETTINGS')),

    ('View Users', 'USER_VIEW', 'View user accounts.', (SELECT id FROM modules WHERE code = 'SETTINGS')),
    ('Create Users', 'USER_CREATE', 'Create user accounts.', (SELECT id FROM modules WHERE code = 'SETTINGS')),
    ('Edit Users', 'USER_EDIT', 'Edit user accounts.', (SELECT id FROM modules WHERE code = 'SETTINGS')),
    ('Disable Users', 'USER_DISABLE', 'Disable user accounts.', (SELECT id FROM modules WHERE code = 'SETTINGS'));

-- =============================================================================
-- SEED: role_modules - SUPER_ADMIN gets every module enabled; every other
-- seeded role starts with every module disabled (explicit configuration only).
-- =============================================================================
INSERT INTO role_modules (role_id, module_id, enabled)
SELECT r.id, m.id, (r.code = 'SUPER_ADMIN')
FROM roles r
CROSS JOIN modules m;

-- =============================================================================
-- SEED: role_permissions - SUPER_ADMIN only, everyone else starts with none.
-- =============================================================================
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.code = 'SUPER_ADMIN';

-- =============================================================================
-- SUCCESS MESSAGE
-- =============================================================================
DO $$
BEGIN
    RAISE NOTICE 'V16 Migration completed: RBAC schema created successfully';
    RAISE NOTICE '  - roles, modules, permissions, role_modules, role_permissions, audit_logs';
    RAISE NOTICE '  - users.role_id, users.status added (additive, existing role enum untouched)';
    RAISE NOTICE '  - Seeded 7 roles, 15 modules, permissions; SUPER_ADMIN granted full access';
    RAISE NOTICE '  - No existing user was assigned SUPER_ADMIN - do this manually:';
    RAISE NOTICE '      UPDATE users SET role_id = (SELECT id FROM roles WHERE code = ''SUPER_ADMIN'') WHERE email = ''<your-email>'';';
END $$;
