-- =============================================================================
-- V0: Create users table
-- =============================================================================
-- The users table has never been part of this repo's Flyway history: V1 and
-- later migrations reference it via foreign key but none of them create it.
-- Historically it existed only because it was created out-of-band (manual
-- DDL / an environment that predates Flyway) against long-lived databases.
-- On any environment provisioned purely from these migrations (a fresh dev
-- DB, CI, a new environment), V1 fails with "relation users does not exist".
--
-- This recreates the table in the shape V2__add_firebase_authentication.sql
-- already assumes as its starting point (password/mobile_number/address/
-- gender all NOT NULL before V2 relaxes them), so the existing migration
-- history continues to apply unchanged on top of it.
-- =============================================================================

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mobile_number VARCHAR(15) NOT NULL,
    address VARCHAR(500) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    password VARCHAR(255) NOT NULL
);

ALTER TABLE users ADD CONSTRAINT users_email_unique UNIQUE (email);

ALTER TABLE users ADD CONSTRAINT users_gender_check
CHECK (gender IN ('MALE', 'FEMALE', 'OTHER'));

COMMENT ON TABLE users IS 'Bambardara application users';
