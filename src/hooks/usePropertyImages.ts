import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type PropertyImage = {
  name: string;
  url: string;
  order: number;
};

// Hook to get all images for a property
export const usePropertyImages = (imageFolder: string) => {
  return useQuery({
    queryKey: ['property-images', imageFolder],
    queryFn: async () => {
      if (!imageFolder) return [];

      const { data, error } = await supabase.storage
        .from('hammond-properties')
        .list(imageFolder);

      if (error) throw error;

      // Filter only image files and sort by name
      const imageFiles = (data || [])
        .filter(file => file.name.match(/\.(jpg|jpeg|png|webp)$/i))
        .sort((a, b) => {
          // Extract number from filename (image_1.jpg -> 1)
          const getImageNumber = (filename: string) => {
            const match = filename.match(/image_(\d+)/);
            return match ? parseInt(match[1]) : 999;
          };
          return getImageNumber(a.name) - getImageNumber(b.name);
        });

      // Get signed URLs for each image (since bucket is private)
      const imagesWithUrls = await Promise.all(
        imageFiles.map(async (file, index) => {
          const { data: urlData } = await supabase.storage
            .from('hammond-properties')
            .createSignedUrl(`${imageFolder}/${file.name}`, 3600); // 1 hour expiry

          return {
            name: file.name,
            url: urlData?.signedUrl || '',
            order: index + 1
          };
        })
      );

      return imagesWithUrls.filter(img => img.url); // Remove any failed URLs
    },
    enabled: !!imageFolder,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
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