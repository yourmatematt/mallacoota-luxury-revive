-- Fix database security issues by updating all functions with proper search_path

-- Update update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER SET search_path = ''
AS $function$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$function$;

-- Update get_property_amenities function
CREATE OR REPLACE FUNCTION public.get_property_amenities(p_property_id uuid)
 RETURNS TABLE(id uuid, amenity_id uuid, property_id uuid, custom_description text, amenity_name text, amenity_description text, is_premium boolean, category_id uuid, category_name text, category_icon text, category_display_order integer)
 LANGUAGE plpgsql
 SECURITY DEFINER SET search_path = ''
AS $function$
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
  FROM public.property_amenities pa
  JOIN public.amenities a ON pa.amenity_id = a.id
  LEFT JOIN public.amenity_categories ac ON a.category_id = ac.id
  WHERE pa.property_id = p_property_id
  ORDER BY ac.display_order ASC, a.name ASC;
END;
$function$;

-- Update get_filter_counts function
CREATE OR REPLACE FUNCTION public.get_filter_counts()
 RETURNS TABLE(filter_type text, value text, label text, count bigint)
 LANGUAGE plpgsql
 SECURITY DEFINER SET search_path = ''
AS $function$
BEGIN
  RETURN QUERY
  -- Get audience counts
  SELECT 
    'audience'::text as filter_type,
    a.slug as value,
    a.name as label,
    COUNT(ba.blog_id) as count
  FROM public."Audiences" a
  LEFT JOIN public.blog_audiences ba ON a.id = ba.audience_id
  GROUP BY a.slug, a.name
  
  UNION ALL
  
  -- Get season counts
  SELECT 
    'season'::text as filter_type,
    s.slug as value,
    s.name as label,
    COUNT(bs.blog_id) as count
  FROM public."Seasons" s
  LEFT JOIN public.blog_seasons bs ON s.id = bs.season_id
  GROUP BY s.slug, s.name
  
  UNION ALL
  
  -- Get activity level counts
  SELECT 
    'activity_level'::text as filter_type,
    al.slug as value,
    al.name as label,
    COUNT(bal.blog_id) as count
  FROM public."Activity Levels" al
  LEFT JOIN public.blog_activity_levels bal ON al.id = bal.activity_level_id
  GROUP BY al.slug, al.name
  
  UNION ALL
  
  -- Get category counts
  SELECT 
    'category'::text as filter_type,
    c.slug as value,
    c.name as label,
    COUNT(CASE WHEN dmb."Categories_id" = c.id THEN 1 END) as count
  FROM public."Categories" c
  LEFT JOIN public."Discover Mallacoota Blogs" dmb ON c.id = dmb."Categories_id"
  GROUP BY c.slug, c.name;
END;
$function$;

-- Update filter_blogs_advanced function
CREATE OR REPLACE FUNCTION public.filter_blogs_advanced(audience_slugs text[] DEFAULT NULL::text[], season_slugs text[] DEFAULT NULL::text[], activity_slugs text[] DEFAULT NULL::text[], category_slugs text[] DEFAULT NULL::text[])
 RETURNS SETOF "Discover Mallacoota Blogs"
 LANGUAGE plpgsql
 SECURITY DEFINER SET search_path = ''
AS $function$
BEGIN
  RETURN QUERY
  SELECT DISTINCT dmb.*
  FROM public."Discover Mallacoota Blogs" dmb
  LEFT JOIN public.blog_audiences ba ON dmb.id = ba.blog_id
  LEFT JOIN public."Audiences" a ON ba.audience_id = a.id
  LEFT JOIN public.blog_seasons bs ON dmb.id = bs.blog_id
  LEFT JOIN public."Seasons" s ON bs.season_id = s.id
  LEFT JOIN public.blog_activity_levels bal ON dmb.id = bal.blog_id
  LEFT JOIN public."Activity Levels" al ON bal.activity_level_id = al.id
  LEFT JOIN public."Categories" c ON dmb."Categories_id" = c.id
  WHERE 
    (audience_slugs IS NULL OR a.slug = ANY(audience_slugs))
    AND (season_slugs IS NULL OR s.slug = ANY(season_slugs))
    AND (activity_slugs IS NULL OR al.slug = ANY(activity_slugs))
    AND (category_slugs IS NULL OR c.slug = ANY(category_slugs))
  ORDER BY dmb.published_date DESC;
END;
$function$;

-- Update get_blogs_with_relationships function
CREATE OR REPLACE FUNCTION public.get_blogs_with_relationships()
 RETURNS TABLE(id text, slug text, title text, excerpt text, content text, hero_image_url text, meta_title text, meta_description text, published_date timestamp with time zone, category_id text, category_name text, category_slug text, audiences jsonb, seasons jsonb, activity_levels jsonb)
 LANGUAGE plpgsql
 SECURITY DEFINER SET search_path = ''
AS $function$
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
       FROM public.blog_audiences ba 
       JOIN public."Audiences" a ON ba.audience_id = a.id 
       WHERE ba.blog_id = dmb.id), 
      '[]'::jsonb
    ) as audiences,
    COALESCE(
      (SELECT jsonb_agg(jsonb_build_object('id', s.id, 'name', s.name, 'slug', s.slug))
       FROM public.blog_seasons bs 
       JOIN public."Seasons" s ON bs.season_id = s.id 
       WHERE bs.blog_id = dmb.id), 
      '[]'::jsonb
    ) as seasons,
    COALESCE(
      (SELECT jsonb_agg(jsonb_build_object('id', al.id, 'name', al.name, 'slug', al.slug))
       FROM public.blog_activity_levels bal 
       JOIN public."Activity Levels" al ON bal.activity_level_id = al.id 
       WHERE bal.blog_id = dmb.id), 
      '[]'::jsonb
    ) as activity_levels
  FROM public."Discover Mallacoota Blogs" dmb
  LEFT JOIN public."Categories" c ON dmb."Categories_id" = c.id
  ORDER BY dmb.published_date DESC;
END;
$function$;