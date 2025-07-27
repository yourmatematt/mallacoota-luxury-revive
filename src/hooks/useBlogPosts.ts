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
  seasons?: string;
  audiences?: string;
  activity_levels?: string;
  Categories_id?: string;
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
        .select('*')
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
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) throw error;
      return data as BlogPost;
    },
    enabled: !!slug,
  });
};