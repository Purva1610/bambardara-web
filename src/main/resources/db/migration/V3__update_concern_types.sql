-- Migration to align concern types with frontend requirements
-- This updates existing enum values to the new standardized format

-- Update existing records to new enum values (if any exist)
UPDATE contact_requests 
SET concern_type = 'BOOKING' 
WHERE concern_type = 'BOOKING_ENQUIRY';

UPDATE contact_requests 
SET concern_type = 'STAY_HOSPITALITY' 
WHERE concern_type = 'STAY_AND_HOSPITALITY';

UPDATE contact_requests 
SET concern_type = 'ACTIVITIES_ADVENTURE' 
WHERE concern_type = 'ACTIVITIES_AND_ADVENTURE';

UPDATE contact_requests 
SET concern_type = 'FARM_NATURE_TRAILS' 
WHERE concern_type = 'FARM_AND_NATURE_TOURS';

UPDATE contact_requests 
SET concern_type = 'PAYMENT_REFUND' 
WHERE concern_type = 'PAYMENT_OR_REFUND';

UPDATE contact_requests 
SET concern_type = 'FEEDBACK_COMPLAINT' 
WHERE concern_type = 'FEEDBACK_OR_COMPLAINT';

UPDATE contact_requests 
SET concern_type = 'INVESTMENT_PLANS' 
WHERE concern_type = 'INVESTMENT';

UPDATE contact_requests 
SET concern_type = 'MEMBERSHIP_PLANS' 
WHERE concern_type = 'MEMBERSHIP_PLAN';

-- EVENTS_AND_CELEBRATIONS doesn't map to any frontend option, keep as OTHER
UPDATE contact_requests 
SET concern_type = 'OTHER' 
WHERE concern_type = 'EVENTS_AND_CELEBRATIONS';

-- PARTNERSHIP doesn't map to any frontend option, keep as OTHER
UPDATE contact_requests 
SET concern_type = 'OTHER' 
WHERE concern_type = 'PARTNERSHIP';

-- Drop the old check constraint
ALTER TABLE contact_requests DROP CONSTRAINT IF EXISTS contact_requests_concern_type_check;

-- Add new check constraint with updated values
ALTER TABLE contact_requests ADD CONSTRAINT contact_requests_concern_type_check 
CHECK (concern_type IN (
    'BOOKING',
    'STAY_HOSPITALITY',
    'ACTIVITIES_ADVENTURE',
    'FARM_NATURE_TRAILS',
    'PAYMENT_REFUND',
    'FEEDBACK_COMPLAINT',
    'INVESTMENT_PLANS',
    'MEMBERSHIP_PLANS',
    'OTHER'
));

-- Verify migration
SELECT concern_type, COUNT(*) as count 
FROM contact_requests 
GROUP BY concern_type 
ORDER BY concern_type;
