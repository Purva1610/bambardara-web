-- =============================================================================
-- V14: Create Investment Domain Tables
-- =============================================================================
-- Creates tables for funding rounds, investors, and investments.
-- Follows existing conventions from V1, V3, V6, V7.
--
-- Model: FundingRound (1) --< Investment >-- (1) Investor
-- Investment is the join between an Investor and a FundingRound: one row
-- per investor's commitment to one round.
--
-- Deliberately does NOT store a "raised amount" column on funding_rounds -
-- that figure is always SUM(investments.amount) for the round and is
-- computed at query time (see InvestmentService), never persisted, so it
-- can never drift out of sync with the investments that actually back it.
-- =============================================================================

-- =============================================================================
-- TABLE: funding_rounds
-- =============================================================================
CREATE TABLE IF NOT EXISTS funding_rounds (
    id SERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    -- Short machine-friendly identifier ("SEED", "ROUND_A", ...). Free text,
    -- not a CHECK-constrained enum: new rounds are expected over time.
    code VARCHAR(30) NOT NULL,

    target_amount NUMERIC(14, 2) NOT NULL,

    status VARCHAR(20) NOT NULL DEFAULT 'OPEN',

    start_date DATE,
    end_date DATE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE funding_rounds
ADD CONSTRAINT funding_rounds_code_unique
UNIQUE (code);

ALTER TABLE funding_rounds
ADD CONSTRAINT funding_rounds_target_amount_positive
CHECK (target_amount > 0);

ALTER TABLE funding_rounds
ADD CONSTRAINT funding_rounds_status_valid
CHECK (status IN ('OPEN', 'CLOSED'));

ALTER TABLE funding_rounds
ADD CONSTRAINT funding_rounds_end_after_start
CHECK (end_date IS NULL OR start_date IS NULL OR end_date >= start_date);

CREATE INDEX idx_funding_rounds_status ON funding_rounds(status);

COMMENT ON TABLE funding_rounds IS 'A capital-raising round (Seed, Round A, Round B, ...). No raised-amount column - always derived from investments.';
COMMENT ON COLUMN funding_rounds.target_amount IS 'Target capital for this round, in INR';
COMMENT ON COLUMN funding_rounds.code IS 'Short machine identifier, e.g. SEED, ROUND_A, ROUND_B';

-- =============================================================================
-- TABLE: investors
-- =============================================================================
CREATE TABLE IF NOT EXISTS investors (
    id SERIAL PRIMARY KEY,

    name VARCHAR(150) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    organization VARCHAR(150),

    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Nullable + UNIQUE: Postgres allows any number of NULLs under a unique
-- constraint (NULL is never equal to NULL), so investors without an email
-- on file are unaffected; two investors sharing one real email are not.
ALTER TABLE investors
ADD CONSTRAINT investors_email_unique
UNIQUE (email);

ALTER TABLE investors
ADD CONSTRAINT investors_status_valid
CHECK (status IN ('ACTIVE', 'UNDER_DOCS', 'WITHDRAWN'));

CREATE INDEX idx_investors_name ON investors(name);
CREATE INDEX idx_investors_status ON investors(status);

COMMENT ON TABLE investors IS 'A person or company that has committed capital to Bambardara. Not a users row - an investor need not ever log into the guest-facing app.';

-- =============================================================================
-- TABLE: investments
-- =============================================================================
CREATE TABLE IF NOT EXISTS investments (
    id SERIAL PRIMARY KEY,

    investor_id INTEGER NOT NULL,
    funding_round_id INTEGER NOT NULL,

    amount NUMERIC(14, 2) NOT NULL,

    -- Nullable: not every commitment has an equity stake finalized yet.
    stake_percent NUMERIC(5, 2),

    invested_date DATE NOT NULL,

    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE investments
ADD CONSTRAINT fk_investments_investor
    FOREIGN KEY (investor_id)
    REFERENCES investors(id)
    ON DELETE RESTRICT;

ALTER TABLE investments
ADD CONSTRAINT fk_investments_funding_round
    FOREIGN KEY (funding_round_id)
    REFERENCES funding_rounds(id)
    ON DELETE RESTRICT;

ALTER TABLE investments
ADD CONSTRAINT investments_amount_positive
CHECK (amount > 0);

ALTER TABLE investments
ADD CONSTRAINT investments_stake_percent_valid
CHECK (stake_percent IS NULL OR (stake_percent >= 0 AND stake_percent <= 100));

ALTER TABLE investments
ADD CONSTRAINT investments_status_valid
CHECK (status IN ('ACTIVE', 'UNDER_DOCS', 'WITHDRAWN'));

CREATE INDEX idx_investments_investor ON investments(investor_id);
CREATE INDEX idx_investments_funding_round ON investments(funding_round_id);
CREATE INDEX idx_investments_status ON investments(status);
CREATE INDEX idx_investments_invested_date ON investments(invested_date DESC);

-- Speeds the two dashboard aggregates (sumActiveAmount, sumActiveAmountByFundingRound)
-- that filter on status = 'ACTIVE' specifically.
CREATE INDEX idx_investments_active
ON investments(funding_round_id, amount)
WHERE status = 'ACTIVE';

COMMENT ON TABLE investments IS 'One investor''s capital commitment to one funding round - the join between investors and funding_rounds.';
COMMENT ON COLUMN investments.amount IS 'Server-validated positive amount, in INR. Never trusted from a client-calculated value.';
COMMENT ON COLUMN investments.stake_percent IS 'Equity stake, 0-100. NULL while still UNDER_DOCS / not yet finalized.';

-- =============================================================================
-- TRIGGER: Auto-update updated_at timestamp
-- =============================================================================

CREATE OR REPLACE FUNCTION update_investment_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER funding_rounds_updated_at_trigger
    BEFORE UPDATE ON funding_rounds
    FOR EACH ROW
    EXECUTE FUNCTION update_investment_updated_at();

CREATE TRIGGER investors_updated_at_trigger
    BEFORE UPDATE ON investors
    FOR EACH ROW
    EXECUTE FUNCTION update_investment_updated_at();

CREATE TRIGGER investments_updated_at_trigger
    BEFORE UPDATE ON investments
    FOR EACH ROW
    EXECUTE FUNCTION update_investment_updated_at();

-- =============================================================================
-- DATA: Seed the three named funding rounds
-- =============================================================================
-- Reference/master data (not a calculated dashboard value): the round names,
-- codes and targets are the estate's actual fundraising structure, matching
-- what every prior CEO Dashboard analysis in this project found the frontend
-- already assumes exists (Seed / Round A / Round B). No POST /funding-rounds
-- endpoint exists in this implementation slice, so without this seed
-- GET /api/ceo/funding-rounds would have nothing to return. Target amounts
-- should be confirmed against the real business figures and adjusted via a
-- later migration or admin endpoint if they are wrong.

INSERT INTO funding_rounds (name, code, target_amount, status, start_date)
VALUES
    ('Seed Round', 'SEED', 12000000.00, 'CLOSED', '2026-03-01'),
    ('Round A', 'ROUND_A', 45000000.00, 'OPEN', '2026-06-01'),
    ('Round B', 'ROUND_B', 63000000.00, 'OPEN', NULL);

-- =============================================================================
-- SUCCESS MESSAGE
-- =============================================================================

DO $$
BEGIN
    RAISE NOTICE 'V14 Migration completed: Investment domain tables created successfully';
    RAISE NOTICE '  - funding_rounds (Seed/Round A/Round B seeded)';
    RAISE NOTICE '  - investors';
    RAISE NOTICE '  - investments (join: investor <-> funding_round)';
    RAISE NOTICE '  - Indexes, constraints, and triggers applied';
END $$;
