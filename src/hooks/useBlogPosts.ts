import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  meta_title?: string;
  meta_description?: string;
  hero_image_url?: string;
  published_date: string;
  updated_at?: string;
  seasons?: string;
  audiences?: string;
  activity_levels?: string;
  Categories_id?: string;
  category_name?: string;
  category_slug?: string;
  blog_audiences?: Array<{ audience_id: string }>;
  blog_seasons?: Array<{ season_id: string }>;
}

export const useBlogPosts = (filters?: {
  categoryId?: string;
  seasonId?: string;
  activityLevelId?: string;
  audienceId?: string;
}) => {
  return useQuery({
    queryKey: ['blog-posts', filters],
    queryFn: async () => {
      let query = supabase
        .from('Discover Mallacoota Blogs')
        .select(`
          *,
          blog_audiences (
            audience_id
          ),
          blog_seasons (
            season_id
          )
        `)
        .order('published_date', { ascending: false });

      if (filters?.categoryId) {
        query = query.eq('Categories_id', filters.categoryId);
      }

      // Note: For seasons, activity levels, and audiences, we'll need to join with the linking tables
      // For now, using the direct fields on the blog table
      if (filters?.seasonId) {
        query = query.like('seasons', `%${filters.seasonId}%`);
      }
      if (filters?.activityLevelId) {
        query = query.like('activity_levels', `%${filters.activityLevelId}%`);
      }
      if (filters?.audienceId) {
        query = query.like('audiences', `%${filters.audienceId}%`);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data as BlogPost[];
    },
  });
};

export const useBlogPostBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Discover Mallacoota Blogs')
        .select(`
          *,
          blog_audiences (
            audience_id
          ),
          blog_seasons (
            season_id
          )
        `)
        .eq('slug', slug)
        .single();
      
      if (error) {
        console.error('Error fetching blog post:', error);
        throw error;
      }
      
      return data as BlogPost;
    },
    enabled: !!slug,
    retry: 1,
  });
};

export const useBlogPostsBySlugs = (slugs: string[]) => {
  return useQuery({
    queryKey: ['blog-posts-by-slugs', slugs],
    queryFn: async () => {
      if (!slugs || slugs.length === 0) return [];

      const { data, error } = await supabase
        .from('Discover Mallacoota Blogs')
        .select(`
          id,
          title,
          slug,
          excerpt,
          meta_title,
          meta_description,
          hero_image_url,
          published_date,
          Categories_id,
          category_name,
          category_slug
        `)
        .in('slug', slugs)
        .order('published_date', { ascending: false });

      if (error) {
        console.error('Error fetching related blog posts:', error);
        throw error;
      }

      return data as BlogPost[];
    },
    enabled: slugs && slugs.length > 0,
    retry: 1,
  });
};