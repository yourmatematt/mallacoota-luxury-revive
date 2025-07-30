-- Allow anonymous users to list files in hammond-properties bucket
CREATE POLICY "Allow public listing for hammond-properties" ON storage.objects
FOR SELECT USING (bucket_id = 'hammond-properties');