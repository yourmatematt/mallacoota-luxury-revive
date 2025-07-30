import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type PropertyImage = {
  name: string;
  url: string;
  order: number;
};

export const usePropertyImages = (imageFolder: string) => {
  console.log("📦 usePropertyImages called with:", imageFolder);

  return useQuery({
    queryKey: ['property-images', imageFolder],
    queryFn: async (): Promise<PropertyImage[]> => {
      if (!imageFolder) {
        console.warn("⚠️ No imageFolder passed");
        return [];
      }

      const { data: files, error } = await supabase.storage
        .from('hammond-properties')
        .list(imageFolder, {
          limit: 100,
        });

      if (error) {
        console.error(`❌ Error listing files in ${imageFolder}:`, error);
        return [];
      }

      if (!files || files.length === 0) {
        console.warn(`⚠️ No files found in: ${imageFolder}`);
        return [];
      }

      console.log("📂 Raw files returned by Supabase:", files);

      const validImages: PropertyImage[] = files
        .filter(file => {
          return file.name && /^image_\d+\.jpg$/i.test(file.name); // Only exact match
        })
        .map(file => {
          const match = file.name.match(/image_(\d+)/i);
          const imageNumber = match ? parseInt(match[1]) : 999;

          const { data: urlData } = supabase.storage
            .from('hammond-properties')
            .getPublicUrl(`${imageFolder}/${file.name}`);

          const publicUrl = urlData?.publicUrl || '';

          return {
            name: file.name,
            url: publicUrl,
            order: imageNumber,
          };
        })
        .sort((a, b) => a.order - b.order);

      console.log(`✅ ${validImages.length} image(s) found in: ${imageFolder}`);
      return validImages;
    },
    enabled: !!imageFolder,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
