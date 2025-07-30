import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type PropertyImage = {
  name: string;
  url: string;
  order: number;
};

// Core hook to get ordered images from Supabase Storage
export const usePropertyImages = (imageFolder: string) => {
  const imagePath = imageFolder; // ✅ NOT nested

  console.log("📦 usePropertyImages called with:", imageFolder);

  return useQuery({
    queryKey: ['property-images', imageFolder],
    queryFn: async () => {
      if (!imageFolder) {
        console.warn("⚠️ No imageFolder passed to usePropertyImages");
        return [];
      }

      const { data: files, error } = await supabase.storage
        .from('hammond-properties')
        .list(imagePath, {
          limit: 100,
          offset: 0,
        });

      if (error) {
        console.error(`❌ Error listing images for "${imagePath}":`, error);
        return [];
      }

      if (!files || files.length === 0) {
        console.warn(`⚠️ No images found in: hammond-properties/${imagePath}`);
        return [];
      }

      const validImages = files
        .filter(file => /^image_\d+\.jpg$/i.test(file.name))
        .map(file => {
          const match = file.name.match(/image_(\d+)/i);
          const imageNumber = match ? parseInt(match[1]) : 999;

          const { data: urlData } = supabas
