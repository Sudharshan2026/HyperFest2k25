-- Add OAuth related columns to users table
ALTER TABLE users 
ADD COLUMN is_oauth_user BOOLEAN DEFAULT 0,
ADD COLUMN oauth_provider VARCHAR(50) DEFAULT NULL,
ADD COLUMN oauth_id VARCHAR(255) DEFAULT NULL;

-- Add index for faster OAuth lookups
CREATE INDEX idx_oauth ON users(oauth_provider, oauth_id);