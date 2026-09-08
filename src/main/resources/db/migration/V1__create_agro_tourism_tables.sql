-- =============================================================================
-- V1: Create Agro Tourism Tables
-- =============================================================================
-- Creates agro_tourism_experiences and agro_tourism_bookings tables
-- with proper constraints, indexes, and JSONB support for PostgreSQL.
--
-- IMPORTANT: This migration is designed for your existing PostgreSQL database
-- running in Docker (bambardara-postgres container, port 5433).
-- =============================================================================

-- =============================================================================
-- TABLE: agro_tourism_experiences
-- =============================================================================
-- Stores configurable agro tourism experiences available at Bambardara Estate.
-- All pricing, duration, and capacity is admin-configurable, NOT hard-coded.
-- =============================================================================

CREATE TABLE IF NOT EXISTS agro_tourism_experiences (
    id SERIAL PRIMARY KEY,
    
    -- Experience type (ORGANIC_FARMING, COW_FARM, etc.) - unique per type
    experience_type VARCHAR(30) NOT NULL UNIQUE,
    
    -- Display name and description
    name VARCHAR(100) NOT NULL,
    description TEXT,
    
    -- Price per person (BigDecimal - NEVER use double/float for money)
    -- Admin can update this; new bookings use new price, old bookings keep original
    price NUMERIC(10, 2) NOT NULL,
    
    -- Duration in minutes (configurable by admin)
    duration_minutes INTEGER NOT NULL,
    
    -- Maximum participants per time slot (for availability checking)
    capacity INTEGER NOT NULL,
    
    -- Available time slots stored as JSON array
    -- Example: ["09:00-11:00", "14:00-16:00", "16:00-18:00"]
    available_time_slots JSONB,
    
    -- Whether this experience is active (soft delete alternative)
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    
    -- Timestamps
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Add check constraints for data integrity
ALTER TABLE agro_tourism_experiences
ADD CONSTRAINT agro_experiences_price_positive
CHECK (price > 0);

ALTER TABLE agro_tourism_experiences
ADD CONSTRAINT agro_experiences_duration_positive
CHECK (duration_minutes > 0);

ALTER TABLE agro_tourism_experiences
ADD CONSTRAINT agro_experiences_capacity_positive
CHECK (capacity > 0);

-- Create indexes for common queries
CREATE INDEX idx_agro_experiences_active ON agro_tourism_experiences(is_active);
CREATE INDEX idx_agro_experiences_type ON agro_tourism_experiences(experience_type);

-- Add comments
COMMENT ON TABLE agro_tourism_experiences IS 'Agro tourism experiences available for booking at Bambardara Estate';
COMMENT ON COLUMN agro_tourism_experiences.price IS 'Price per person (Rupees). Changes do NOT affect existing bookings.';
COMMENT ON COLUMN agro_tourism_experiences.available_time_slots IS 'JSON array of time slots, e.g., ["09:00-11:00", "14:00-16:00"]';


-- =============================================================================
-- TABLE: agro_tourism_bookings
-- =============================================================================
-- Stores user bookings for agro tourism experiences.
--
-- SECURITY: user_id comes from authenticated session, NEVER from request body.
-- PRICING: total_amount is calculated server-side: experience.price × participants
-- HISTORICAL: total_amount is stored at booking time and never changes
-- =============================================================================

CREATE TABLE IF NOT EXISTS agro_tourism_bookings (
    id SERIAL PRIMARY KEY,
    
    -- Foreign keys
    user_id INTEGER NOT NULL,
    experience_id INTEGER NOT NULL,
    
    -- Booking details
    experience_date DATE NOT NULL,
    time_slot VARCHAR(50) NOT NULL,
    number_of_participants INTEGER NOT NULL,
    
    -- Guest information (may differ from user profile)
    guest_name VARCHAR(100) NOT NULL,
    guest_email VARCHAR(255) NOT NULL,
    guest_mobile VARCHAR(15) NOT NULL,
    special_request TEXT,
    
    -- Booking lifecycle
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    
    -- Total amount (SERVER-CALCULATED, NEVER from frontend)
    -- Formula: experience.price × number_of_participants
    -- Stored at booking time to preserve historical pricing
    total_amount NUMERIC(10, 2) NOT NULL,
    
    -- Timestamps
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Add foreign key constraints
-- Use RESTRICT to prevent deletion of experiences/users with bookings
ALTER TABLE agro_tourism_bookings
ADD CONSTRAINT fk_agro_bookings_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE RESTRICT;

ALTER TABLE agro_tourism_bookings
ADD CONSTRAINT fk_agro_bookings_experience
    FOREIGN KEY (experience_id)
    REFERENCES agro_tourism_experiences(id)
    ON DELETE RESTRICT;

-- Add check constraints
ALTER TABLE agro_tourism_bookings
ADD CONSTRAINT agro_bookings_participants_positive
CHECK (number_of_participants > 0);

ALTER TABLE agro_tourism_bookings
ADD CONSTRAINT agro_bookings_total_positive
CHECK (total_amount >= 0);

ALTER TABLE agro_tourism_bookings
ADD CONSTRAINT agro_bookings_status_valid
CHECK (status IN ('PENDING', 'CONFIRMED', 'CANCELLED', 'REJECTED', 'COMPLETED'));

-- Create indexes for common queries
CREATE INDEX idx_agro_bookings_user ON agro_tourism_bookings(user_id);
CREATE INDEX idx_agro_bookings_experience ON agro_tourism_bookings(experience_id);
CREATE INDEX idx_agro_bookings_status ON agro_tourism_bookings(status);
CREATE INDEX idx_agro_bookings_created_at ON agro_tourism_bookings(created_at DESC);
CREATE INDEX idx_agro_bookings_experience_date ON agro_tourism_bookings(experience_date);

-- Composite index for availability checking (CRITICAL for preventing overbooking)
CREATE INDEX idx_agro_bookings_availability 
ON agro_tourism_bookings(experience_id, experience_date, time_slot, status);

-- Add comments
COMMENT ON TABLE agro_tourism_bookings IS 'Agro tourism experience bookings';
COMMENT ON COLUMN agro_tourism_bookings.user_id IS 'Authenticated user (from security context, NOT from request body)';
COMMENT ON COLUMN agro_tourism_bookings.total_amount IS 'Server-calculated: experience.price × participants. Preserved even if experience price changes.';
COMMENT ON COLUMN agro_tourism_bookings.status IS 'Booking status: PENDING, CONFIRMED, CANCELLED, REJECTED, COMPLETED';

-- =============================================================================
-- TRIGGER: Auto-update updated_at timestamp
-- =============================================================================

CREATE OR REPLACE FUNCTION update_agro_tourism_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER agro_experiences_updated_at_trigger
    BEFORE UPDATE ON agro_tourism_experiences
    FOR EACH ROW
    EXECUTE FUNCTION update_agro_tourism_updated_at();

CREATE TRIGGER agro_bookings_updated_at_trigger
    BEFORE UPDATE ON agro_tourism_bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_agro_tourism_updated_at();

-- =============================================================================
-- SUCCESS MESSAGE
-- =============================================================================

DO $$
BEGIN
    RAISE NOTICE 'V1 Migration completed: Agro Tourism tables created successfully';
    RAISE NOTICE '  - agro_tourism_experiences (with JSONB time slots)';
    RAISE NOTICE '  - agro_tourism_bookings (with server-side pricing)';
    RAISE NOTICE '  - Indexes and constraints applied';
    RAISE NOTICE '  - Triggers for updated_at added';
END $$;
