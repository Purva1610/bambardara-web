-- Fix existing users without roles
-- Run this in your PostgreSQL database before testing

-- Set all NULL roles to 'USER' (default)
UPDATE users SET role = 'USER' WHERE role IS NULL;

-- Verify the update
SELECT uid, email, role FROM users;
