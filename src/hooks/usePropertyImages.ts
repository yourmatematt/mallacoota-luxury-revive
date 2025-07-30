import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type PropertyImage = {
  name: string;
  url: string;
  order: number;
};

export const usePropertyImages = (imageFolder: string) => {
  const imagePath = imageFolder; // single-level folder structure

  console.log("📦 usePropertyImages called with:", imageFolder);

  return useQuery({
    queryKey: ['property-images', imageFolder],
    queryFn: async (): Promise<PropertyImage[]> => {
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

      const validImages: PropertyImage[] = files
        .filter(file => /^image_\d+\.jpg$/i.test(file.name))
        .map(file => {
          const match = file.name.match(/image_(\d+)/i);
          const imageNumber = match ? parseInt(match[1]) : 999;

          const { data: urlData } = supabase.storage
            .from('hammond-properties')
            .getPublicUrl(`${imagePath}/${file.name}`);

          const publicUrl = urlData?.publicUrl || '';

          console.log("🖼️ Found:", `${imagePath}/${file.name}`);
          console.log("🔗 Public URL:", publicUrl);

          return {
            name: file.name,
            url: publicUrl,
            order: imageNumber,
          };
        })
        .filter(image => image.url)
        .sort((a, b) => a.order - b.order);

      console.info(`✅ Loaded ${validImages.length} image(s) from ${imagePath}`);
      return validImages;
    },
    enabled: !!imageFolder,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// === Sub-hooks ===

export const usePropertyHeroImage = (imageFolder: string) => {
  const { data: allImages, ...rest } = usePropertyImages(imageFolder);
  return {
    ...rest,
    data: allImages?.find(img => img.name.toLowerCase() === 'image_1.jpg') || null,
  };
};

export const usePropertyCardImages = (imageFolder: string) => {
  const { data: allImages, ...rest } = usePropertyImages(imageFolder);
  return {
    ...rest,
    data: allImages?.filter(img => img.order <= 3).slice(0, 3) || [],
  };
};

export const usePropertyGalleryImages = (imageFolder: string) => {
  const { data: allImages, ...rest } = usePropertyImages(imageFolder);
  return {
    ...rest,
    data: allImages?.filter(img => img.order > 1) || [],
  };
};

export const getPropertyImagesByType = (
  images: PropertyImage[] | undefined,
  type: 'hero' | 'card' | 'gallery'
): PropertyImage[] => {
  if (!images) return [];

  switch (type) {
    case 'hero':
      return images.filter(img => img.name.toLowerCase() === 'image_1.jpg');
    case 'card':
      return images.filter(img => img.order <= 3).slice(0, 3);
    case 'gallery':
      return images.filter(img => img.order > 1);
    default:
      return images;
  }
};
