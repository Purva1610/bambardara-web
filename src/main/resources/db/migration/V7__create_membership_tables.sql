-- =============================================================================
-- V7: Create Club Membership Tables
-- =============================================================================
-- Creates tables for membership plans, benefits, and user memberships
-- Follows existing conventions from V1, V2, V3, and V6
-- =============================================================================

-- =============================================================================
-- TABLE: membership_plans
-- =============================================================================
CREATE TABLE IF NOT EXISTS membership_plans (
    id SERIAL PRIMARY KEY,
    
    -- Plan details
    name VARCHAR(100) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    duration_years INTEGER NOT NULL,
    stay_days INTEGER NOT NULL,
    family_size INTEGER,
    description TEXT,
    
    -- Soft delete
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    
    -- Timestamps
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Constraints
ALTER TABLE membership_plans
ADD CONSTRAINT membership_plans_price_positive
CHECK (price > 0);

ALTER TABLE membership_plans
ADD CONSTRAINT membership_plans_duration_positive
CHECK (duration_years > 0);

ALTER TABLE membership_plans
ADD CONSTRAINT membership_plans_stay_days_positive
CHECK (stay_days > 0);

ALTER TABLE membership_plans
ADD CONSTRAINT membership_plans_family_size_positive
CHECK (family_size IS NULL OR family_size > 0);

-- Indexes
CREATE INDEX idx_membership_plans_active ON membership_plans(is_active);

-- Comments
COMMENT ON TABLE membership_plans IS 'Membership plan master data configured by admin (not hardcoded)';
COMMENT ON COLUMN membership_plans.price IS 'Plan price in INR (e.g., 120000.00, 240000.00, 500000.00)';
COMMENT ON COLUMN membership_plans.duration_years IS 'Membership validity in years (e.g., 6, 15, 30)';
COMMENT ON COLUMN membership_plans.stay_days IS 'Number of stay days included per year';
COMMENT ON COLUMN membership_plans.family_size IS 'Maximum family members (e.g., 4 for Plan 1, NULL for others)';

-- =============================================================================
-- TABLE: membership_plan_benefits
-- =============================================================================
CREATE TABLE IF NOT EXISTS membership_plan_benefits (
    id SERIAL PRIMARY KEY,
    
    -- Foreign key to plan
    plan_id INTEGER NOT NULL,
    
    -- Benefit type (enum: STAY, SAFARI, AGRO_ACTIVITIES, etc.)
    benefit_type VARCHAR(30) NOT NULL,
    
    -- Optional benefit description
    description TEXT,
    
    -- Ensure unique benefit per plan
    CONSTRAINT uq_plan_benefit UNIQUE (plan_id, benefit_type)
);

-- Foreign key constraints
ALTER TABLE membership_plan_benefits
ADD CONSTRAINT fk_membership_plan_benefits_plan
    FOREIGN KEY (plan_id)
    REFERENCES membership_plans(id)
    ON DELETE CASCADE;

-- Check constraints for valid benefit types
ALTER TABLE membership_plan_benefits
ADD CONSTRAINT membership_plan_benefits_type_valid
CHECK (benefit_type IN (
    'STAY', 'SAFARI', 'AGRO_ACTIVITIES', 'WATER_PARK', 'SPA', 'GYM',
    'HORSE_RIDING', 'FISHING', 'ALL_ACTIVITIES', 'VIP', 
    'PREMIUM_BENEFITS', 'LUXURY_BENEFITS'
));

-- Indexes
CREATE INDEX idx_membership_plan_benefits_plan ON membership_plan_benefits(plan_id);
CREATE INDEX idx_membership_plan_benefits_type ON membership_plan_benefits(benefit_type);

-- Comments
COMMENT ON TABLE membership_plan_benefits IS 'Configurable benefits for each membership plan (avoids boolean explosion)';
COMMENT ON COLUMN membership_plan_benefits.benefit_type IS 'Benefit enum: STAY, SAFARI, AGRO_ACTIVITIES, WATER_PARK, SPA, GYM, etc.';

-- =============================================================================
-- TABLE: memberships
-- =============================================================================
CREATE TABLE IF NOT EXISTS memberships (
    id SERIAL PRIMARY KEY,
    
    -- Foreign keys (user from Firebase/Spring Security context)
    user_id INTEGER NOT NULL,
    plan_id INTEGER NOT NULL,
    
    -- Unique membership identifier
    membership_number VARCHAR(20) UNIQUE NOT NULL,
    
    -- Validity period
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    
    -- Purchase amount (preserved from plan price at purchase time)
    purchase_amount NUMERIC(10, 2) NOT NULL,
    
    -- Status (PENDING, ACTIVE, EXPIRED, CANCELLED)
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    
    -- EMI details (optional)
    emi_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    emi_months INTEGER,
    emi_amount NUMERIC(10, 2),
    
    -- Timestamps
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Foreign key constraints
ALTER TABLE memberships
ADD CONSTRAINT fk_memberships_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE RESTRICT;

ALTER TABLE memberships
ADD CONSTRAINT fk_memberships_plan
    FOREIGN KEY (plan_id)
    REFERENCES membership_plans(id)
    ON DELETE RESTRICT;

-- Check constraints
ALTER TABLE memberships
ADD CONSTRAINT memberships_purchase_amount_non_negative
CHECK (purchase_amount >= 0);

ALTER TABLE memberships
ADD CONSTRAINT memberships_end_after_start
CHECK (end_date > start_date);

ALTER TABLE memberships
ADD CONSTRAINT memberships_status_valid
CHECK (status IN ('PENDING', 'ACTIVE', 'EXPIRED', 'CANCELLED'));

ALTER TABLE memberships
ADD CONSTRAINT memberships_emi_months_positive
CHECK (emi_months IS NULL OR emi_months > 0);

ALTER TABLE memberships
ADD CONSTRAINT memberships_emi_amount_non_negative
CHECK (emi_amount IS NULL OR emi_amount >= 0);

-- Indexes
CREATE INDEX idx_memberships_user ON memberships(user_id);
CREATE INDEX idx_memberships_plan ON memberships(plan_id);
CREATE INDEX idx_memberships_status ON memberships(status);
CREATE INDEX idx_memberships_number ON memberships(membership_number);
CREATE INDEX idx_memberships_dates ON memberships(start_date, end_date);
CREATE INDEX idx_memberships_created_at ON memberships(created_at DESC);

-- Composite index for active memberships
CREATE INDEX idx_memberships_active 
ON memberships(user_id, status)
WHERE status = 'ACTIVE';

-- Composite index for expired membership detection
CREATE INDEX idx_memberships_to_expire 
ON memberships(status, end_date)
WHERE status = 'ACTIVE';

-- Comments
COMMENT ON TABLE memberships IS 'User membership purchases (authenticated users only)';
COMMENT ON COLUMN memberships.user_id IS 'Authenticated user from Firebase/Spring Security (NEVER from request body)';
COMMENT ON COLUMN memberships.membership_number IS 'Unique identifier format: MEM-YYYY-NNNNN (e.g., MEM-2026-00001)';
COMMENT ON COLUMN memberships.purchase_amount IS 'Server-calculated from plan price at purchase time (preserved)';
COMMENT ON COLUMN memberships.emi_enabled IS 'Whether user opted for EMI payment';
COMMENT ON COLUMN memberships.emi_months IS 'Number of EMI installments (NULL if emi_enabled=false)';
COMMENT ON COLUMN memberships.emi_amount IS 'Monthly EMI amount (simple division, no interest rate)';

-- =============================================================================
-- TRIGGER: Auto-update updated_at timestamp
-- =============================================================================

CREATE OR REPLACE FUNCTION update_membership_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER membership_plans_updated_at_trigger
    BEFORE UPDATE ON membership_plans
    FOR EACH ROW
    EXECUTE FUNCTION update_membership_updated_at();

CREATE TRIGGER memberships_updated_at_trigger
    BEFORE UPDATE ON memberships
    FOR EACH ROW
    EXECUTE FUNCTION update_membership_updated_at();

-- =============================================================================
-- DATA: Insert Client-Specified Plans (Optional - can be done via Admin API)
-- =============================================================================
-- Uncomment below to pre-populate the 3 client-specified plans
-- Admin can also create these via POST /api/admin/memberships/plans

-- Plan 1: Classic 6-Year Plan (₹1,20,000)
-- INSERT INTO membership_plans (name, price, duration_years, stay_days, family_size, description, is_active)
-- VALUES (
--     'Classic 6-Year Plan',
--     120000.00,
--     6,
--     10,
--     4,
--     'Perfect for families of four with 10 days of stay per year, including Safari and Agro Activities access for 6 years.',
--     TRUE
-- );

-- INSERT INTO membership_plan_benefits (plan_id, benefit_type, description)
-- SELECT id, 'STAY', 'Accommodation stay benefits'
-- FROM membership_plans WHERE name = 'Classic 6-Year Plan';

-- INSERT INTO membership_plan_benefits (plan_id, benefit_type, description)
-- SELECT id, 'SAFARI', 'Safari experience'
-- FROM membership_plans WHERE name = 'Classic 6-Year Plan';

-- INSERT INTO membership_plan_benefits (plan_id, benefit_type, description)
-- SELECT id, 'AGRO_ACTIVITIES', 'Agro-tourism activities'
-- FROM membership_plans WHERE name = 'Classic 6-Year Plan';

-- Plan 2: Premium 15-Year Plan (₹2,40,000)
-- INSERT INTO membership_plans (name, price, duration_years, stay_days, family_size, description, is_active)
-- VALUES (
--     'Premium 15-Year Plan',
--     240000.00,
--     15,
--     15,
--     NULL,
--     'Experience 15 years of luxury with 15 days stay per year, including Water Park, Spa, Gym, Horse Riding, Fishing, and all activities.',
--     TRUE
-- );

-- INSERT INTO membership_plan_benefits (plan_id, benefit_type, description)
-- SELECT id, unnest(ARRAY['STAY', 'WATER_PARK', 'SPA', 'GYM', 'HORSE_RIDING', 'FISHING', 'ALL_ACTIVITIES', 'LUXURY_BENEFITS']), NULL
-- FROM membership_plans WHERE name = 'Premium 15-Year Plan';

-- Plan 3: VIP 30-Year Membership (₹5,00,000)
-- INSERT INTO membership_plans (name, price, duration_years, stay_days, family_size, description, is_active)
-- VALUES (
--     'VIP 30-Year Membership',
--     500000.00,
--     30,
--     999,
--     NULL,
--     'Lifetime luxury experience with VIP membership for 30 years, including all premium benefits and unlimited access.',
--     TRUE
-- );

-- INSERT INTO membership_plan_benefits (plan_id, benefit_type, description)
-- SELECT id, unnest(ARRAY['STAY', 'VIP', 'PREMIUM_BENEFITS', 'ALL_ACTIVITIES', 'WATER_PARK', 'SPA', 'GYM', 'LUXURY_BENEFITS']), NULL
-- FROM membership_plans WHERE name = 'VIP 30-Year Membership';

-- =============================================================================
-- SUCCESS MESSAGE
-- =============================================================================

DO $$
BEGIN
    RAISE NOTICE 'V7 Migration completed: Club Membership tables created successfully';
    RAISE NOTICE '  - membership_plans (configurable plan master data)';
    RAISE NOTICE '  - membership_plan_benefits (avoid boolean explosion pattern)';
    RAISE NOTICE '  - memberships (user purchases with EMI support)';
    RAISE NOTICE '  - Indexes, constraints, and triggers applied';
    RAISE NOTICE '  - Admin can create 3 plans via API: POST /api/admin/memberships/plans';
    RAISE NOTICE '  - Plan 1: ₹1,20,000 / 6 years / 10 days / Family of 4';
    RAISE NOTICE '  - Plan 2: ₹2,40,000 / 15 years / 15 days / Luxury Benefits';
    RAISE NOTICE '  - Plan 3: ₹5,00,000 / 30 years / VIP / Premium Benefits';
END $$;
