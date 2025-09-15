-- Migration to make phone number required in all enquiry tables
-- Created: 2025-09-15

-- First, update any existing NULL values to a placeholder
UPDATE public.contact_enquiries
SET phone = 'Not provided'
WHERE phone IS NULL OR phone = '';

UPDATE public.enquiries
SET phone = 'Not provided'
WHERE phone IS NULL OR phone = '';

-- Now make the phone column NOT NULL in both tables
ALTER TABLE public.contact_enquiries
ALTER COLUMN phone SET NOT NULL;

ALTER TABLE public.enquiries
ALTER COLUMN phone SET NOT NULL;

-- Add comments to document the change
COMMENT ON COLUMN public.contact_enquiries.phone IS 'Customer phone number - required for all enquiries';
COMMENT ON COLUMN public.enquiries.phone IS 'Customer phone number - required for all property enquiries';