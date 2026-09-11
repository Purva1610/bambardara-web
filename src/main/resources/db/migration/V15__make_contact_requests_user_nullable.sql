-- =============================================================================
-- V15: Make user_id nullable in contact_requests table
-- =============================================================================
-- Support public enquiries from the landing page (unauthenticated users).
-- The user_id is now optional for enquiries that originate from the public
-- /api/enquire endpoint rather than from authenticated users.
-- =============================================================================

-- Drop the foreign key constraint to allow modification
ALTER TABLE contact_requests
DROP CONSTRAINT fk_contact_requests_user;

-- Alter the column to be nullable
ALTER TABLE contact_requests
ALTER COLUMN user_id DROP NOT NULL;

-- Recreate the foreign key with ON DELETE SET NULL
ALTER TABLE contact_requests
ADD CONSTRAINT fk_contact_requests_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE SET NULL;

-- Update the comment to reflect the change
COMMENT ON COLUMN contact_requests.user_id IS 'Authenticated user from the security context (optional for public enquiries)';
