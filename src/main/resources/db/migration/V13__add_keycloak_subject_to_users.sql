-- =============================================================================
-- V13: Add keycloak_subject to users (Keycloak migration, Phase 1)
-- =============================================================================
-- Purely additive and non-destructive: adds one nullable, unique column.
-- Does not touch firebase_uid, password, role, or any existing row.
--
-- keycloak_subject stores the OIDC "sub" claim from a validated Keycloak
-- access token - the stable external identity for a user once they have
-- authenticated through Keycloak at least once. Nullable because existing
-- Firebase/legacy-JWT users have not done so yet.
-- =============================================================================

ALTER TABLE users ADD COLUMN keycloak_subject VARCHAR(255);

ALTER TABLE users ADD CONSTRAINT users_keycloak_subject_unique UNIQUE (keycloak_subject);

CREATE INDEX idx_users_keycloak_subject ON users(keycloak_subject);

COMMENT ON COLUMN users.keycloak_subject IS 'Keycloak OIDC "sub" claim - stable identifier linking this user to their Keycloak identity';
