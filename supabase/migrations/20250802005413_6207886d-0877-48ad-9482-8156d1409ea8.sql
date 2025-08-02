-- Create enquiries table to store property enquiry submissions
CREATE TABLE public.enquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id TEXT NOT NULL,
  property_title TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  check_in DATE,
  check_out DATE,
  guests INTEGER,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public insertions (for enquiry submissions)
CREATE POLICY "Anyone can submit enquiries" 
ON public.enquiries 
FOR INSERT 
WITH CHECK (true);

-- Create policy to prevent public reads (admin only access)
CREATE POLICY "No public read access to enquiries" 
ON public.enquiries 
FOR SELECT 
USING (false);