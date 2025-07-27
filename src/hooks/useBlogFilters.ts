import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
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
      return data;
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
      return data;
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
      return data;
    },
  });
};