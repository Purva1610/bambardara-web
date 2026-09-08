-- =============================================================================
-- V12: Create password_reset_otps table
-- =============================================================================
-- Backs PasswordResetOtp (com.bambardara.demo.auth.entity.PasswordResetOtp),
-- used by OtpService.sendOtp. No prior migration created this table -- another
-- gap in migration history, same as contact_requests (see V11).
--
-- Column names follow Hibernate's default physical naming strategy for the
-- entity's unannotated fields: email, otp, expiryTime -> expiry_time, verified.
-- =============================================================================

CREATE TABLE IF NOT EXISTS password_reset_otps (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    otp VARCHAR(10) NOT NULL,
    expiry_time TIMESTAMP NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE INDEX idx_password_reset_otps_email ON password_reset_otps(email);

COMMENT ON TABLE password_reset_otps IS 'One-time codes issued for the forgot-password flow';
