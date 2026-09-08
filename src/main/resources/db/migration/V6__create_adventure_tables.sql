-- =============================================================================
-- V6: Create Adventure & Fun Tables
-- =============================================================================
-- Creates tables for adventure activities, configurable time slots, and bookings
-- Follows existing conventions from V1, V2, and V3
-- =============================================================================

-- =============================================================================
-- TABLE: adventure_activities
-- =============================================================================
CREATE TABLE IF NOT EXISTS adventure_activities (
    id SERIAL PRIMARY KEY,
    
    -- Activity type (10 predefined activities)
    activity_type VARCHAR(30) NOT NULL UNIQUE,
    
    -- Display information
    name VARCHAR(100) NOT NULL,
    description TEXT,
    
    -- Pricing (NEVER use double/float for money)
    price_per_person NUMERIC(10, 2) NOT NULL,
    
    -- Capacity constraints
    min_participants INTEGER NOT NULL,
    max_participants INTEGER NOT NULL,
    
    -- Duration in minutes
    duration_minutes INTEGER NOT NULL,
    
    -- Age restrictions
    min_age INTEGER,
    max_age INTEGER,
    
    -- Additional metadata
    difficulty_level VARCHAR(20),
    safety_requirements TEXT,
    equipment_provided TEXT,
    
    -- Soft delete
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    
    -- Timestamps
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Constraints
ALTER TABLE adventure_activities
ADD CONSTRAINT adventure_activities_price_positive
CHECK (price_per_person > 0);

ALTER TABLE adventure_activities
ADD CONSTRAINT adventure_activities_min_participants_positive
CHECK (min_participants > 0);

ALTER TABLE adventure_activities
ADD CONSTRAINT adventure_activities_max_participants_positive
CHECK (max_participants > 0);

ALTER TABLE adventure_activities
ADD CONSTRAINT adventure_activities_min_max_valid
CHECK (min_participants <= max_participants);

ALTER TABLE adventure_activities
ADD CONSTRAINT adventure_activities_duration_positive
CHECK (duration_minutes > 0);

ALTER TABLE adventure_activities
ADD CONSTRAINT adventure_activities_type_valid
CHECK (activity_type IN ('ZIPLINE', 'ATV', 'ROCK_CLIMBING', 'TREKKING', 
                         'HORSE_RIDING', 'CYCLING', 'CAMPING', 'NIGHT_SAFARI', 
                         'ARCHERY', 'ROPE_COURSE'));

-- Indexes
CREATE INDEX idx_adventure_activities_active ON adventure_activities(is_active);
CREATE INDEX idx_adventure_activities_type ON adventure_activities(activity_type);

-- Comments
COMMENT ON TABLE adventure_activities IS 'Master data for 10 adventure activities at Bambardara Estate';
COMMENT ON COLUMN adventure_activities.activity_type IS 'One of 10 predefined activity types (ZIPLINE, ATV, etc.)';
COMMENT ON COLUMN adventure_activities.min_participants IS 'Minimum participants required for the activity';
COMMENT ON COLUMN adventure_activities.max_participants IS 'Maximum participants allowed for the activity';

-- =============================================================================
-- TABLE: adventure_slots
-- =============================================================================
CREATE TABLE IF NOT EXISTS adventure_slots (
    id SERIAL PRIMARY KEY,
    
    -- Foreign key to activity
    activity_id INTEGER NOT NULL,
    
    -- Slot timing (configurable, not hardcoded)
    slot_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    
    -- Capacity management
    max_capacity INTEGER NOT NULL,
    current_bookings INTEGER NOT NULL DEFAULT 0,
    
    -- Availability
    is_available BOOLEAN NOT NULL DEFAULT TRUE,
    cancellation_reason TEXT,
    
    -- Timestamps
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Foreign key constraints
ALTER TABLE adventure_slots
ADD CONSTRAINT fk_adventure_slots_activity
    FOREIGN KEY (activity_id)
    REFERENCES adventure_activities(id)
    ON DELETE RESTRICT;

-- Check constraints
ALTER TABLE adventure_slots
ADD CONSTRAINT adventure_slots_capacity_positive
CHECK (max_capacity > 0);

ALTER TABLE adventure_slots
ADD CONSTRAINT adventure_slots_bookings_non_negative
CHECK (current_bookings >= 0);

ALTER TABLE adventure_slots
ADD CONSTRAINT adventure_slots_bookings_within_capacity
CHECK (current_bookings <= max_capacity);

ALTER TABLE adventure_slots
ADD CONSTRAINT adventure_slots_times_valid
CHECK (end_time > start_time);

-- Indexes
CREATE INDEX idx_adventure_slots_activity ON adventure_slots(activity_id);
CREATE INDEX idx_adventure_slots_date ON adventure_slots(slot_date);
CREATE INDEX idx_adventure_slots_available ON adventure_slots(is_available);

-- Composite index for availability queries
CREATE INDEX idx_adventure_slots_availability 
ON adventure_slots(activity_id, slot_date, is_available, current_bookings, max_capacity)
WHERE is_available = true;

-- Comments
COMMENT ON TABLE adventure_slots IS 'Configurable time slots for adventure activities (not hardcoded)';
COMMENT ON COLUMN adventure_slots.current_bookings IS 'Current number of participants booked (for capacity tracking)';
COMMENT ON COLUMN adventure_slots.max_capacity IS 'Maximum participants allowed for this specific slot';

-- =============================================================================
-- TABLE: adventure_bookings
-- =============================================================================
CREATE TABLE IF NOT EXISTS adventure_bookings (
    id SERIAL PRIMARY KEY,
    
    -- Foreign keys (RESTRICT to prevent data loss)
    user_id INTEGER NOT NULL,
    slot_id INTEGER NOT NULL,
    
    -- Participant information
    number_of_participants INTEGER NOT NULL,
    lead_participant_name VARCHAR(100) NOT NULL,
    lead_participant_email VARCHAR(255) NOT NULL,
    lead_participant_mobile VARCHAR(15) NOT NULL,
    
    -- Additional participant details (flexible JSONB storage)
    participants_details JSONB,
    
    -- Health & Safety
    emergency_contact_name VARCHAR(100),
    emergency_contact_mobile VARCHAR(15),
    health_conditions TEXT,
    
    -- Terms acceptance (required)
    terms_accepted BOOLEAN NOT NULL DEFAULT FALSE,
    
    -- Special requests
    special_request TEXT,
    
    -- Booking lifecycle
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    
    -- Total Amount (SERVER-CALCULATED, preserved for historical record)
    total_amount NUMERIC(10, 2) NOT NULL,
    
    -- Timestamps
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Foreign key constraints
ALTER TABLE adventure_bookings
ADD CONSTRAINT fk_adventure_bookings_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE RESTRICT;

ALTER TABLE adventure_bookings
ADD CONSTRAINT fk_adventure_bookings_slot
    FOREIGN KEY (slot_id)
    REFERENCES adventure_slots(id)
    ON DELETE RESTRICT;

-- Check constraints
ALTER TABLE adventure_bookings
ADD CONSTRAINT adventure_bookings_participants_positive
CHECK (number_of_participants > 0);

ALTER TABLE adventure_bookings
ADD CONSTRAINT adventure_bookings_total_non_negative
CHECK (total_amount >= 0);

ALTER TABLE adventure_bookings
ADD CONSTRAINT adventure_bookings_status_valid
CHECK (status IN ('PENDING', 'CONFIRMED', 'CANCELLED', 'REJECTED', 'CHECKED_IN', 'COMPLETED'));

ALTER TABLE adventure_bookings
ADD CONSTRAINT adventure_bookings_terms_required
CHECK (terms_accepted = true);

-- Indexes
CREATE INDEX idx_adventure_bookings_user ON adventure_bookings(user_id);
CREATE INDEX idx_adventure_bookings_slot ON adventure_bookings(slot_id);
CREATE INDEX idx_adventure_bookings_status ON adventure_bookings(status);
CREATE INDEX idx_adventure_bookings_created_at ON adventure_bookings(created_at DESC);

-- Composite index for active bookings
CREATE INDEX idx_adventure_bookings_active 
ON adventure_bookings(slot_id, status)
WHERE status IN ('PENDING', 'CONFIRMED', 'CHECKED_IN');

-- Comments
COMMENT ON TABLE adventure_bookings IS 'Adventure activity bookings (authenticated users only)';
COMMENT ON COLUMN adventure_bookings.user_id IS 'Authenticated user from Firebase/security context (NEVER from request body)';
COMMENT ON COLUMN adventure_bookings.participants_details IS 'JSONB array of participant details [{name, age, ...}, ...]';
COMMENT ON COLUMN adventure_bookings.total_amount IS 'Server-calculated total preserved at booking time';
COMMENT ON COLUMN adventure_bookings.terms_accepted IS 'Must be true for booking to be created';

-- =============================================================================
-- TRIGGER: Auto-update updated_at timestamp
-- =============================================================================

CREATE OR REPLACE FUNCTION update_adventure_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER adventure_activities_updated_at_trigger
    BEFORE UPDATE ON adventure_activities
    FOR EACH ROW
    EXECUTE FUNCTION update_adventure_updated_at();

CREATE TRIGGER adventure_slots_updated_at_trigger
    BEFORE UPDATE ON adventure_slots
    FOR EACH ROW
    EXECUTE FUNCTION update_adventure_updated_at();

CREATE TRIGGER adventure_bookings_updated_at_trigger
    BEFORE UPDATE ON adventure_bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_adventure_updated_at();

-- =============================================================================
-- SUCCESS MESSAGE
-- =============================================================================

DO $$
BEGIN
    RAISE NOTICE 'V6 Migration completed: Adventure & Fun tables created successfully';
    RAISE NOTICE '  - adventure_activities (10 activity types: ZIPLINE, ATV, ROCK_CLIMBING, etc.)';
    RAISE NOTICE '  - adventure_slots (configurable time slots with capacity tracking)';
    RAISE NOTICE '  - adventure_bookings (with participant details, health/safety info)';
    RAISE NOTICE '  - Indexes, constraints, and triggers applied';
    RAISE NOTICE '  - Capacity management: current_bookings tracked for availability';
END $$;
