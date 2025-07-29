import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Types for better TypeScript support
type FilterItem = {
  value: string;
  label: string;
  count: number;
};

type FilterOptions = {
  audiences: FilterItem[];
  seasons: FilterItem[];
  activityLevels: FilterItem[];
  categories: FilterItem[];
};

type RawFilterItem = {
  filter_type: string;
  value: string;
  label: string;
  count: number;
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Categories')
        .select('*')
        .order('name');

      if (error) throw error;
      return data || [];
    },
  });
};

export const useSeasons = () => {
  return useQuery({
    queryKey: ['seasons'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Seasons')
        .select('*')
        .order('name');

      if (error) throw error;
      return data || [];
    },
  });
};

export const useActivityLevels = () => {
  return useQuery({
    queryKey: ['activity-levels'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Activity Levels')
        .select('*')
        .order('name');

      if (error) throw error;
      return data || [];
    },
  });
};

export const useAudiences = () => {
  return useQuery({
    queryKey: ['audiences'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Audiences')
        .select('*')
        .order('name');

      if (error) throw error;
      return data || [];
    },
  });
};

// New advanced filtering hooks
export const useFilteredBlogs = (
  audienceSlugs: string[] = [],
  seasonSlugs: string[] = [],
  activitySlugs: string[] = [],
  categorySlugs: string[] = []
) => {
  return useQuery({
    queryKey: ['filtered-blogs', audienceSlugs, seasonSlugs, activitySlugs, categorySlugs],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('filter_blogs_advanced', {
        audience_slugs: audienceSlugs.length > 0 ? audienceSlugs : null,
        season_slugs: seasonSlugs.length > 0 ? seasonSlugs : null,
        activity_slugs: activitySlugs.length > 0 ? activitySlugs : null,
        category_slugs: categorySlugs.length > 0 ? categorySlugs : null,
      });

      if (error) throw error;
      return data || [];
    },
    enabled: true, // Always enabled, will return all blogs if no filters
  });
};

export const useFilterCounts = () => {
  return useQuery<FilterOptions>({
    queryKey: ['filter-counts'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_filter_counts');

      if (error) throw error;
      
      const rawData = (data as RawFilterItem[]) || [];
      
      // Initialize the result object
      const result: FilterOptions = {
        audiences: [],
        seasons: [],
        activityLevels: [],
        categories: []
      };

      // Group the results by filter type
      rawData.forEach((item) => {
        const filterItem: FilterItem = {
          value: item.value,
          label: item.label,
          count: item.count
        };

        switch (item.filter_type) {
          case 'audience':
            result.audiences.push(filterItem);
            break;
          case 'season':
            result.seasons.push(filterItem);
            break;
          case 'activity_level':
            result.activityLevels.push(filterItem);
            break;
          case 'category':
            result.categories.push(filterItem);
            break;
        }
      });

      return result;
    },
  });
};

export const useBlogsWithRelationships = () => {
  return useQuery({
    queryKey: ['blogs-with-relationships'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_blogs_with_relationships');

      if (error) throw error;
      return data || [];
    },
  });
};

// Convenience hook for getting all blogs (no filters)
export const useAllBlogs = () => {
  return useFilteredBlogs([], [], [], []);
};