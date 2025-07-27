-- Enable public read access for Properties table
DROP POLICY IF EXISTS "Enable read access for all users" ON public."Properties";
CREATE POLICY "Enable read access for all users" 
ON public."Properties" 
FOR SELECT 
USING (true);

-- Enable public read access for Airbnb Reviews table  
DROP POLICY IF EXISTS "Enable read access for all users" ON public."Airbnb Reviews";
CREATE POLICY "Enable read access for all users" 
ON public."Airbnb Reviews" 
FOR SELECT 
USING (true);

-- Enable public read access for Discover Mallacoota Blogs table
DROP POLICY IF EXISTS "Enable read access for all users" ON public."Discover Mallacoota Blogs";
CREATE POLICY "Enable read access for all users" 
ON public."Discover Mallacoota Blogs" 
FOR SELECT 
USING (true);

-- Enable public read access for Categories table
DROP POLICY IF EXISTS "Enable read access for all users" ON public."Categories";
CREATE POLICY "Enable read access for all users" 
ON public."Categories" 
FOR SELECT 
USING (true);

-- Enable public read access for Seasons table
DROP POLICY IF EXISTS "Enable read access for all users" ON public."Seasons";
CREATE POLICY "Enable read access for all users" 
ON public."Seasons" 
FOR SELECT 
USING (true);

-- Enable public read access for Activity Levels table
DROP POLICY IF EXISTS "Enable read access for all users" ON public."Activity Levels";
CREATE POLICY "Enable read access for all users" 
ON public."Activity Levels" 
FOR SELECT 
USING (true);

-- Enable public read access for Audiences table
DROP POLICY IF EXISTS "Enable read access for all users" ON public."Audiences";
CREATE POLICY "Enable read access for all users" 
ON public."Audiences" 
FOR SELECT 
USING (true);