-- Create function to get property amenities with category details
CREATE OR REPLACE FUNCTION public.get_property_amenities(p_property_id UUID)
RETURNS TABLE(
  id UUID,
  amenity_id UUID,
  property_id UUID,
  custom_description TEXT,
  amenity_name TEXT,
  amenity_description TEXT,
  is_premium BOOLEAN,
  category_id UUID,
  category_name TEXT,
  category_icon TEXT,
  category_display_order INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pa.id,
    pa.amenity_id,
    pa.property_id,
    pa.custom_description,
    a.name as amenity_name,
    a.description as amenity_description,
    a.is_premium,
    ac.id as category_id,
    ac.name as category_name,
    ac.icon as category_icon,
    ac.display_order as category_display_order
  FROM property_amenities pa
  JOIN amenities a ON pa.amenity_id = a.id
  LEFT JOIN amenity_categories ac ON a.category_id = ac.id
  WHERE pa.property_id = p_property_id
  ORDER BY ac.display_order ASC, a.name ASC;
END;
$$;