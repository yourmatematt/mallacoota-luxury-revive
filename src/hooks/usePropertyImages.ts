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

      console.log('=== BYPASSING LIST API ===');
      console.log('Using direct URLs for folder:', imageFolder);

      // Since list API isn't working but public URLs are, let's try known filenames
      const knownImageNames = [
        'image_1.jpg', 'image_2.jpg', 'image_3.jpg', 'image_4.jpg', 'image_5.jpg',
        'image_6.jpg', 'image_7.jpg', 'image_8.jpg', 'image_9.jpg', 'image_10.jpg',
        'image_11.jpg', 'image_12.jpg', 'image_13.jpg', 'image_14.jpg', 'image_15.jpg',
        'image_16.jpg', 'image_17.jpg', 'image_18.jpg', 'image_19.jpg', 'image_20.jpg',
        'image_21.jpg', 'image_22.jpg', 'image_23.jpg'
      ];

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
            validImages.push({
              name: imageName,
              url: urlData.publicUrl,
              order: i + 1
            });
            console.log(`✅ Found: ${imageName}`);
          }
        } catch (err) {
          // Image doesn't exist, skip it
          console.log(`❌ Not found: ${imageName}`);
        }
      }

      console.log('Valid images found:', validImages.length);
      return validImages;
    },
    enabled: !!imageFolder,
    staleTime: 0, // Don't use cache
    gcTime: 0, // Don't store in cache
    refetchOnMount: true, // Always refetch
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