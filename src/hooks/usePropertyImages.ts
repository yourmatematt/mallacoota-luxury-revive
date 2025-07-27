import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const usePropertyImages = (imageFolder?: string) => {
  return useQuery({
    queryKey: ['property-images', imageFolder],
    queryFn: async () => {
      if (!imageFolder) return [];
      
      const { data, error } = await supabase.storage
        .from('hammond-properties')
        .list(imageFolder, { limit: 100 });
      
      if (error) throw error;
      
      // Generate the storage URLs
      const imagesWithUrls = (data || []).map((file, index) => {
        const { data: urlData } = supabase.storage
          .from('hammond-properties')
          .getPublicUrl(`${imageFolder}/${file.name}`);
        
        return {
          id: file.name,
          file_name: file.name,
          url: urlData.publicUrl,
          sort_order: index,
        };
      });
      
      return imagesWithUrls;
    },
    enabled: !!imageFolder,
  });
};