-- Drop existing functions first
DROP FUNCTION IF EXISTS filter_blogs_advanced(text[], text[], text[], text[]);
DROP FUNCTION IF EXISTS get_filter_counts();
DROP FUNCTION IF EXISTS get_blogs_with_relationships();

-- Create function to get filter counts for blog filtering
CREATE OR REPLACE FUNCTION get_filter_counts()
RETURNS TABLE (
  filter_type text,
  value text,
  label text,
  count bigint
) AS $$
BEGIN
  RETURN QUERY
  -- Get audience counts
  SELECT 
    'audience'::text as filter_type,
    a.slug as value,
    a.name as label,
    COUNT(ba.blog_id) as count
  FROM "Audiences" a
  LEFT JOIN blog_audiences ba ON a.id = ba.audience_id
  GROUP BY a.slug, a.name
  
  UNION ALL
  
  -- Get season counts
  SELECT 
    'season'::text as filter_type,
    s.slug as value,
    s.name as label,
    COUNT(bs.blog_id) as count
  FROM "Seasons" s
  LEFT JOIN blog_seasons bs ON s.id = bs.season_id
  GROUP BY s.slug, s.name
  
  UNION ALL
  
  -- Get activity level counts
  SELECT 
    'activity_level'::text as filter_type,
    al.slug as value,
    al.name as label,
    COUNT(bal.blog_id) as count
  FROM "Activity Levels" al
  LEFT JOIN blog_activity_levels bal ON al.id = bal.activity_level_id
  GROUP BY al.slug, al.name
  
  UNION ALL
  
  -- Get category counts
  SELECT 
    'category'::text as filter_type,
    c.slug as value,
    c.name as label,
    COUNT(CASE WHEN dmb."Categories_id" = c.id THEN 1 END) as count
  FROM "Categories" c
  LEFT JOIN "Discover Mallacoota Blogs" dmb ON c.id = dmb."Categories_id"
  GROUP BY c.slug, c.name;
END;
$$ LANGUAGE plpgsql;

-- Create function to filter blogs with advanced filtering
CREATE OR REPLACE FUNCTION filter_blogs_advanced(
  audience_slugs text[] DEFAULT NULL,
  season_slugs text[] DEFAULT NULL,
  activity_slugs text[] DEFAULT NULL,
  category_slugs text[] DEFAULT NULL
)
RETURNS SETOF "Discover Mallacoota Blogs" AS $$
BEGIN
  RETURN QUERY
  SELECT DISTINCT dmb.*
  FROM "Discover Mallacoota Blogs" dmb
  LEFT JOIN blog_audiences ba ON dmb.id = ba.blog_id
  LEFT JOIN "Audiences" a ON ba.audience_id = a.id
  LEFT JOIN blog_seasons bs ON dmb.id = bs.blog_id
  LEFT JOIN "Seasons" s ON bs.season_id = s.id
  LEFT JOIN blog_activity_levels bal ON dmb.id = bal.blog_id
  LEFT JOIN "Activity Levels" al ON bal.activity_level_id = al.id
  LEFT JOIN "Categories" c ON dmb."Categories_id" = c.id
  WHERE 
    (audience_slugs IS NULL OR a.slug = ANY(audience_slugs))
    AND (season_slugs IS NULL OR s.slug = ANY(season_slugs))
    AND (activity_slugs IS NULL OR al.slug = ANY(activity_slugs))
    AND (category_slugs IS NULL OR c.slug = ANY(category_slugs))
  ORDER BY dmb.published_date DESC;
END;
$$ LANGUAGE plpgsql;

-- Create function to get blogs with their relationships
CREATE OR REPLACE FUNCTION get_blogs_with_relationships()
RETURNS TABLE (
  id text,
  slug text,
  title text,
  excerpt text,
  content text,
  hero_image_url text,
  meta_title text,
  meta_description text,
  published_date timestamp with time zone,
  category_id text,
  category_name text,
  category_slug text,
  audiences jsonb,
  seasons jsonb,
  activity_levels jsonb
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    dmb.id,
    dmb.slug,
    dmb.title,
    dmb.excerpt,
    dmb.content,
    dmb.hero_image_url,
    dmb.meta_title,
    dmb.meta_description,
    dmb.published_date,
    dmb."Categories_id" as category_id,
    c.name as category_name,
    c.slug as category_slug,
    COALESCE(
      (SELECT jsonb_agg(jsonb_build_object('id', a.id, 'name', a.name, 'slug', a.slug))
       FROM blog_audiences ba 
       JOIN "Audiences" a ON ba.audience_id = a.id 
       WHERE ba.blog_id = dmb.id), 
      '[]'::jsonb
    ) as audiences,
    COALESCE(
      (SELECT jsonb_agg(jsonb_build_object('id', s.id, 'name', s.name, 'slug', s.slug))
       FROM blog_seasons bs 
       JOIN "Seasons" s ON bs.season_id = s.id 
       WHERE bs.blog_id = dmb.id), 
      '[]'::jsonb
    ) as seasons,
    COALESCE(
      (SELECT jsonb_agg(jsonb_build_object('id', al.id, 'name', al.name, 'slug', al.slug))
       FROM blog_activity_levels bal 
       JOIN "Activity Levels" al ON bal.activity_level_id = al.id 
       WHERE bal.blog_id = dmb.id), 
      '[]'::jsonb
    ) as activity_levels
  FROM "Discover Mallacoota Blogs" dmb
  LEFT JOIN "Categories" c ON dmb."Categories_id" = c.id
  ORDER BY dmb.published_date DESC;
END;
$$ LANGUAGE plpgsql;