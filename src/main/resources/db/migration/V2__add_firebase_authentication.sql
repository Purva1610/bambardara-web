-- =============================================================================
-- V2: Add Firebase Authentication Support
-- =============================================================================
-- Adds Firebase UID and role columns to support Firebase authentication
-- while preserving existing password-based authentication for migration safety.
--
-- MIGRATION STRATEGY:
-- 1. Existing users keep their passwords (nullable for new Firebase users)
-- 2. firebaseUid is added as unique but nullable (for gradual migration)
-- 3. role is added with default 'USER' for all existing users
-- 4. Optional fields (mobile, address, gender) made nullable for Firebase users
--
-- LINKING STRATEGY:
-- - New Firebase users → created with firebaseUid
-- - Existing users → firebaseUid added on first Firebase login
-- - No duplicate users created
-- =============================================================================

-- Add Firebase UID column (unique but nullable during migration)
ALTER TABLE users ADD COLUMN firebase_uid VARCHAR(128);

-- Add unique constraint for Firebase UID
ALTER TABLE users ADD CONSTRAINT users_firebase_uid_unique UNIQUE (firebase_uid);

-- Add role column with default USER
ALTER TABLE users ADD COLUMN role VARCHAR(20) NOT NULL DEFAULT 'USER';

-- Add check constraint for valid roles
ALTER TABLE users ADD CONSTRAINT users_role_check 
CHECK (role IN ('USER', 'ADMIN', 'MARKETING'));

-- Make password nullable (Firebase users don't need password in PostgreSQL)
ALTER TABLE users ALTER COLUMN password DROP NOT NULL;

-- Make optional profile fields nullable (Firebase might not provide them)
ALTER TABLE users ALTER COLUMN mobile_number DROP NOT NULL;
ALTER TABLE users ALTER COLUMN address DROP NOT NULL;
ALTER TABLE users ALTER COLUMN gender DROP NOT NULL;

-- Create index for fast Firebase UID lookups
CREATE INDEX idx_users_firebase_uid ON users(firebase_uid);

-- Create index for role-based queries
CREATE INDEX idx_users_role ON users(role);

-- Add comments for documentation
COMMENT ON COLUMN users.firebase_uid IS 'Firebase Authentication UID - stable identifier linking PostgreSQL user to Firebase identity';
COMMENT ON COLUMN users.role IS 'User role for authorization: USER (default), ADMIN, MARKETING. Synced from Firebase custom claims.';
COMMENT ON COLUMN users.password IS 'BCrypt password hash. Null for Firebase-only users who authenticate via Firebase (email/Google/etc).';

-- Update existing users to have USER role (already set by DEFAULT, but explicit for clarity)
UPDATE users SET role = 'USER' WHERE role IS NULL;

-- Log migration completion
DO $$
BEGIN
    RAISE NOTICE 'V2 Migration completed: Firebase authentication support added';
    RAISE NOTICE '  - firebase_uid column added (unique, nullable)';
    RAISE NOTICE '  - role column added (default: USER)';
    RAISE NOTICE '  - password made nullable for Firebase users';
    RAISE NOTICE '  - Existing users preserved with default USER role';
    RAISE NOTICE '  - Ready for gradual migration from JWT to Firebase';
END $$;
