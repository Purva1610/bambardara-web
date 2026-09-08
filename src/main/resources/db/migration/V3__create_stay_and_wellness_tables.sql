-- =============================================================================
-- V3: Create Stay & Hospitality Tables
-- =============================================================================
-- Creates tables for Stay accommodations/bookings and Wellness spa services/appointments
-- Follows existing conventions from V1 and V2
-- =============================================================================

-- =============================================================================
-- TABLE: stay_accommodations
-- =============================================================================
CREATE TABLE IF NOT EXISTS stay_accommodations (
    id SERIAL PRIMARY KEY,
    
    -- Accommodation type (FARMHOUSE, RIVERSIDE_CAMPING, LUXURY_SUITE, VILLA)
    accommodation_type VARCHAR(30) NOT NULL UNIQUE,
    
    -- Display information
    name VARCHAR(100) NOT NULL,
    description TEXT,
    
    -- Pricing (NEVER use double/float for money)
    price_per_night NUMERIC(10, 2) NOT NULL,
    
    -- Capacity
    max_guests INTEGER NOT NULL,
    
    -- Flexible amenities storage (WiFi, AC, Pool, etc.)
    amenities JSONB,
    
    -- Soft delete
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    
    -- Timestamps
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Constraints
ALTER TABLE stay_accommodations
ADD CONSTRAINT stay_accommodations_price_positive
CHECK (price_per_night > 0);

ALTER TABLE stay_accommodations
ADD CONSTRAINT stay_accommodations_max_guests_positive
CHECK (max_guests > 0);

-- Indexes
CREATE INDEX idx_stay_accommodations_active ON stay_accommodations(is_active);
CREATE INDEX idx_stay_accommodations_type ON stay_accommodations(accommodation_type);

-- Comments
COMMENT ON TABLE stay_accommodations IS 'Available stay accommodations at Bambardara Estate';
COMMENT ON COLUMN stay_accommodations.amenities IS 'JSONB storage for flexible amenities (WiFi, AC, TV, etc.)';

-- =============================================================================
-- TABLE: stay_bookings
-- =============================================================================
CREATE TABLE IF NOT EXISTS stay_bookings (
    id SERIAL PRIMARY KEY,
    
    -- Foreign keys (RESTRICT to prevent deletion of referenced data)
    user_id INTEGER NOT NULL,
    accommodation_id INTEGER NOT NULL,
    
    -- Guest Information (may differ from user profile)
    guest_name VARCHAR(100) NOT NULL,
    guest_email VARCHAR(255) NOT NULL,
    guest_mobile VARCHAR(15) NOT NULL,
    
    -- ID Proof (metadata only, NOT actual document)
    id_proof_type VARCHAR(20) NOT NULL,
    id_proof_reference VARCHAR(100),
    
    -- Guest Count
    number_of_guests INTEGER NOT NULL,
    number_of_adults INTEGER NOT NULL,
    number_of_children INTEGER NOT NULL DEFAULT 0,
    
    -- Stay Details
    check_in_date DATE NOT NULL,
    check_in_time TIME,
    check_out_date DATE NOT NULL,
    check_out_time TIME,
    
    -- Additional Information
    special_request TEXT,
    terms_accepted BOOLEAN NOT NULL DEFAULT FALSE,
    
    -- Booking Lifecycle
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    
    -- Total Amount (SERVER-CALCULATED, preserved for historical record)
    total_amount NUMERIC(10, 2) NOT NULL,
    
    -- Timestamps
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Foreign key constraints
ALTER TABLE stay_bookings
ADD CONSTRAINT fk_stay_bookings_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE RESTRICT;

ALTER TABLE stay_bookings
ADD CONSTRAINT fk_stay_bookings_accommodation
    FOREIGN KEY (accommodation_id)
    REFERENCES stay_accommodations(id)
    ON DELETE RESTRICT;

-- Check constraints
ALTER TABLE stay_bookings
ADD CONSTRAINT stay_bookings_guests_positive
CHECK (number_of_guests > 0);

ALTER TABLE stay_bookings
ADD CONSTRAINT stay_bookings_adults_positive
CHECK (number_of_adults > 0);

ALTER TABLE stay_bookings
ADD CONSTRAINT stay_bookings_children_non_negative
CHECK (number_of_children >= 0);

ALTER TABLE stay_bookings
ADD CONSTRAINT stay_bookings_guests_sum_valid
CHECK (number_of_guests = number_of_adults + number_of_children);

ALTER TABLE stay_bookings
ADD CONSTRAINT stay_bookings_dates_valid
CHECK (check_out_date > check_in_date);

ALTER TABLE stay_bookings
ADD CONSTRAINT stay_bookings_total_non_negative
CHECK (total_amount >= 0);

ALTER TABLE stay_bookings
ADD CONSTRAINT stay_bookings_status_valid
CHECK (status IN ('PENDING', 'CONFIRMED', 'CANCELLED', 'REJECTED', 'CHECKED_IN', 'COMPLETED'));

ALTER TABLE stay_bookings
ADD CONSTRAINT stay_bookings_id_proof_type_valid
CHECK (id_proof_type IN ('AADHAAR', 'PASSPORT', 'DRIVING_LICENCE', 'VOTER_ID', 'OTHER'));

-- Indexes (CRITICAL for availability checking and performance)
CREATE INDEX idx_stay_bookings_user ON stay_bookings(user_id);
CREATE INDEX idx_stay_bookings_accommodation ON stay_bookings(accommodation_id);
CREATE INDEX idx_stay_bookings_status ON stay_bookings(status);
CREATE INDEX idx_stay_bookings_created_at ON stay_bookings(created_at DESC);

-- Composite index for availability checking (prevents overlapping bookings)
CREATE INDEX idx_stay_bookings_availability 
ON stay_bookings(accommodation_id, check_in_date, check_out_date, status)
WHERE status IN ('PENDING', 'CONFIRMED', 'CHECKED_IN');

-- Comments
COMMENT ON TABLE stay_bookings IS 'Stay accommodation bookings';
COMMENT ON COLUMN stay_bookings.user_id IS 'Authenticated user from Firebase/security context (NEVER from request body)';
COMMENT ON COLUMN stay_bookings.id_proof_reference IS 'Metadata/reference for ID proof (NOT the actual document)';
COMMENT ON COLUMN stay_bookings.total_amount IS 'Server-calculated total preserved at booking time';

-- =============================================================================
-- TABLE: spa_services
-- =============================================================================
CREATE TABLE IF NOT EXISTS spa_services (
    id SERIAL PRIMARY KEY,
    
    -- Massage classification
    massage_category VARCHAR(20) NOT NULL,
    massage_type VARCHAR(30) NOT NULL UNIQUE,
    
    -- Service information
    name VARCHAR(100) NOT NULL,
    description TEXT,
    
    -- Pricing and duration
    price_per_session NUMERIC(10, 2) NOT NULL,
    duration_minutes INTEGER NOT NULL,
    
    -- Soft delete
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    
    -- Timestamps
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Constraints
ALTER TABLE spa_services
ADD CONSTRAINT spa_services_category_valid
CHECK (massage_category IN ('COMMON_SPA', 'TRADITIONAL'));

ALTER TABLE spa_services
ADD CONSTRAINT spa_services_price_positive
CHECK (price_per_session > 0);

ALTER TABLE spa_services
ADD CONSTRAINT spa_services_duration_valid
CHECK (duration_minutes IN (30, 60, 90));

-- Indexes
CREATE INDEX idx_spa_services_active ON spa_services(is_active);
CREATE INDEX idx_spa_services_category ON spa_services(massage_category);
CREATE INDEX idx_spa_services_type ON spa_services(massage_type);

-- Comments
COMMENT ON TABLE spa_services IS 'Spa massage services available at Bambardara Wellness Center';
COMMENT ON COLUMN spa_services.massage_category IS 'COMMON_SPA (Swedish, Deep Tissue, etc.) or TRADITIONAL (Abhyanga, Shirodhara, etc.)';

-- =============================================================================
-- TABLE: spa_appointments
-- =============================================================================
CREATE TABLE IF NOT EXISTS spa_appointments (
    id SERIAL PRIMARY KEY,
    
    -- Foreign keys
    user_id INTEGER NOT NULL,
    service_id INTEGER NOT NULL,
    
    -- Guest Information
    guest_name VARCHAR(100) NOT NULL,
    guest_email VARCHAR(255) NOT NULL,
    guest_mobile VARCHAR(15) NOT NULL,
    
    -- Appointment Details
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    duration_minutes INTEGER NOT NULL,
    therapist_preference VARCHAR(20) NOT NULL,
    number_of_people INTEGER NOT NULL DEFAULT 1,
    
    -- Additional Information
    special_request TEXT,
    
    -- Lifecycle
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    
    -- Total Amount (SERVER-CALCULATED)
    total_amount NUMERIC(10, 2) NOT NULL,
    
    -- Timestamps
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Foreign key constraints
ALTER TABLE spa_appointments
ADD CONSTRAINT fk_spa_appointments_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE RESTRICT;

ALTER TABLE spa_appointments
ADD CONSTRAINT fk_spa_appointments_service
    FOREIGN KEY (service_id)
    REFERENCES spa_services(id)
    ON DELETE RESTRICT;

-- Check constraints
ALTER TABLE spa_appointments
ADD CONSTRAINT spa_appointments_duration_valid
CHECK (duration_minutes IN (30, 60, 90));

ALTER TABLE spa_appointments
ADD CONSTRAINT spa_appointments_people_positive
CHECK (number_of_people > 0);

ALTER TABLE spa_appointments
ADD CONSTRAINT spa_appointments_total_non_negative
CHECK (total_amount >= 0);

ALTER TABLE spa_appointments
ADD CONSTRAINT spa_appointments_status_valid
CHECK (status IN ('PENDING', 'CONFIRMED', 'CANCELLED', 'REJECTED', 'COMPLETED'));

ALTER TABLE spa_appointments
ADD CONSTRAINT spa_appointments_therapist_valid
CHECK (therapist_preference IN ('MALE', 'FEMALE', 'NO_PREFERENCE'));

-- Indexes
CREATE INDEX idx_spa_appointments_user ON spa_appointments(user_id);
CREATE INDEX idx_spa_appointments_service ON spa_appointments(service_id);
CREATE INDEX idx_spa_appointments_status ON spa_appointments(status);
CREATE INDEX idx_spa_appointments_created_at ON spa_appointments(created_at DESC);
CREATE INDEX idx_spa_appointments_date ON spa_appointments(appointment_date);

-- Composite index for availability checking
CREATE INDEX idx_spa_appointments_availability 
ON spa_appointments(service_id, appointment_date, appointment_time, status)
WHERE status IN ('PENDING', 'CONFIRMED');

-- Comments
COMMENT ON TABLE spa_appointments IS 'Spa massage appointments';
COMMENT ON COLUMN spa_appointments.user_id IS 'Authenticated user from Firebase/security context';
COMMENT ON COLUMN spa_appointments.therapist_preference IS 'MALE, FEMALE, or NO_PREFERENCE';

-- =============================================================================
-- TRIGGER: Auto-update updated_at timestamp
-- =============================================================================

CREATE OR REPLACE FUNCTION update_stay_wellness_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER stay_accommodations_updated_at_trigger
    BEFORE UPDATE ON stay_accommodations
    FOR EACH ROW
    EXECUTE FUNCTION update_stay_wellness_updated_at();

CREATE TRIGGER stay_bookings_updated_at_trigger
    BEFORE UPDATE ON stay_bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_stay_wellness_updated_at();

CREATE TRIGGER spa_services_updated_at_trigger
    BEFORE UPDATE ON spa_services
    FOR EACH ROW
    EXECUTE FUNCTION update_stay_wellness_updated_at();

CREATE TRIGGER spa_appointments_updated_at_trigger
    BEFORE UPDATE ON spa_appointments
    FOR EACH ROW
    EXECUTE FUNCTION update_stay_wellness_updated_at();

-- =============================================================================
-- SUCCESS MESSAGE
-- =============================================================================

DO $$
BEGIN
    RAISE NOTICE 'V3 Migration completed: Stay & Hospitality tables created successfully';
    RAISE NOTICE '  - stay_accommodations (FARMHOUSE, RIVERSIDE_CAMPING, LUXURY_SUITE, VILLA)';
    RAISE NOTICE '  - stay_bookings (with availability indexes)';
    RAISE NOTICE '  - spa_services (COMMON_SPA and TRADITIONAL massages)';
    RAISE NOTICE '  - spa_appointments (with time slot management)';
    RAISE NOTICE '  - Indexes, constraints, and triggers applied';
END $$;
