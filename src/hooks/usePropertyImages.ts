import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const usePropertyImages = (propertyId?: string) => {
  return useQuery({
    queryKey: ['property-images', propertyId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hammond_properties')
        .select('*')
        .eq('property_id', propertyId)
        .order('sort_order');
      
      if (error) throw error;
      
      // Generate the storage URLs
      const imagesWithUrls = await Promise.all(
        (data || []).map(async (image: any) => {
          const { data: urlData } = supabase.storage
            .from('hammond-properties')
            .getPublicUrl(image.file_name);
          
          return {
            ...image,
            url: urlData.publicUrl,
          };
        })
      );
      
      return imagesWithUrls;
    },
    enabled: !!propertyId,
  });
};