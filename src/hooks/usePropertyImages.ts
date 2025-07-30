import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type PropertyImage = {
  name: string;
  url: string;
  order: number;
};

// Hook to get all images for a property (bypassing broken list API)
export const usePropertyImages = (imageFolder: string) => {
  return useQuery({
    queryKey: ['property-images', imageFolder],
    queryFn: async () => {
      if (!imageFolder) return [];

      // Since list API isn't working but public URLs are, let's try known filenames
      const knownImageNames = [];
      
      // Check for both .jpg, .JPG, and .png extensions
      for (let i = 1; i <= 23; i++) {
        knownImageNames.push(`image_${i}.jpg`);
        knownImageNames.push(`image_${i}.JPG`);
        knownImageNames.push(`image_${i}.png`);
      }

      const validImages = [];

      // Test each potential image to see if it exists
      for (let i = 0; i < knownImageNames.length; i++) {
        const imageName = knownImageNames[i];
        const { data: urlData } = supabase.storage
          .from('hammond-properties')
          .getPublicUrl(`${imageFolder}/${imageName}`);

        try {
          const response = await fetch(urlData.publicUrl, { method: 'HEAD' });
          if (response.ok) {
            // Extract the number from filename for proper ordering
            const match = imageName.match(/image_(\d+)/);
            const imageNumber = match ? parseInt(match[1]) : 999;
            
            validImages.push({
              name: imageName,
              url: urlData.publicUrl,
              order: imageNumber
            });
          }
        } catch (err) {
          // Image doesn't exist, skip it
        }
      }

      // Sort by order to ensure image_1 comes before image_2, etc.
      validImages.sort((a, b) => a.order - b.order);

      return validImages;
    },
    enabled: !!imageFolder,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook to get just the hero image (image_1)
export const usePropertyHeroImage = (imageFolder: string) => {
  const { data: allImages, ...rest } = usePropertyImages(imageFolder);
  
  return {
    ...rest,
    data: allImages?.find(img => img.name.includes('image_1')) || null
  };
};

// Hook to get property card gallery images (image_1, image_2, image_3)
export const usePropertyCardImages = (imageFolder: string) => {
  const { data: allImages, ...rest } = usePropertyImages(imageFolder);
  
  return {
    ...rest,
    data: allImages?.filter(img => {
      const match = img.name.match(/image_(\d+)/);
      const imageNumber = match ? parseInt(match[1]) : 999;
      return imageNumber <= 3;
    }).slice(0, 3) || []
  };
};

// Hook to get gallery images (all except image_1)
export const usePropertyGalleryImages = (imageFolder: string) => {
  const { data: allImages, ...rest } = usePropertyImages(imageFolder);
  
  return {
    ...rest,
    data: allImages?.filter(img => !img.name.includes('image_1')) || []
  };
};

// Utility function to get property images by use case
export const getPropertyImagesByType = (
  images: PropertyImage[] | undefined,
  type: 'hero' | 'card' | 'gallery'
) => {
  if (!images) return [];

  switch (type) {
    case 'hero':
      return images.filter(img => img.name.includes('image_1'));
    case 'card':
      return images.filter(img => {
        const match = img.name.match(/image_(\d+)/);
        const imageNumber = match ? parseInt(match[1]) : 999;
        return imageNumber <= 3;
      }).slice(0, 3);
    case 'gallery':
      return images.filter(img => !img.name.includes('image_1'));
    default:
      return images;
  }
};