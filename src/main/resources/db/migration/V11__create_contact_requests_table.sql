-- =============================================================================
-- V11: Create contact_requests table
-- =============================================================================
-- Backs ContactRequest (com.bambardara.demo.contact.entity.ContactRequest).
-- No prior migration created this table even though the entity/controllers
-- referencing it have existed for a while -- a genuine gap in migration
-- history (consistent with the missing V4/V5 version numbers).
-- =============================================================================

CREATE TABLE IF NOT EXISTS contact_requests (
    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL,

    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mobile_number VARCHAR(15),

    concern_type VARCHAR(40) NOT NULL,
    details JSONB,
    message VARCHAR(2000) NOT NULL,

    status VARCHAR(20) NOT NULL DEFAULT 'NEW',
    marketing_email_sent BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE contact_requests
ADD CONSTRAINT fk_contact_requests_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE RESTRICT;

ALTER TABLE contact_requests
ADD CONSTRAINT contact_requests_concern_type_check
CHECK (concern_type IN (
    'BOOKING_ENQUIRY', 'STAY_AND_HOSPITALITY', 'ACTIVITIES_AND_ADVENTURE',
    'EVENTS_AND_CELEBRATIONS', 'FARM_AND_NATURE_TOURS', 'PAYMENT_OR_REFUND',
    'FEEDBACK_OR_COMPLAINT', 'MEMBERSHIP_PLAN', 'INVESTMENT', 'OTHER'
));

ALTER TABLE contact_requests
ADD CONSTRAINT contact_requests_status_check
CHECK (status IN ('NEW', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'));

CREATE INDEX idx_contact_requests_user ON contact_requests(user_id);
CREATE INDEX idx_contact_requests_status ON contact_requests(status);
CREATE INDEX idx_contact_requests_created_at ON contact_requests(created_at DESC);

COMMENT ON TABLE contact_requests IS 'Submissions of the contact-us form';
COMMENT ON COLUMN contact_requests.user_id IS 'Authenticated user from the security context (never from the request body)';
