-- Add role column to users table
-- Default all existing users to USER role
-- Admin role must be explicitly set via Firebase custom claims

ALTER TABLE users 
ADD COLUMN IF NOT EXISTS role VARCHAR(20) NOT NULL DEFAULT 'USER';

-- Add check constraint to ensure valid role values
ALTER TABLE users
ADD CONSTRAINT users_role_check 
CHECK (role IN ('USER', 'ADMIN'));

-- Create index for role-based queries (optional, for performance)
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Log migration
COMMENT ON COLUMN users.role IS 'User role for authorization. Set via Firebase custom claims: {admin: true}';
