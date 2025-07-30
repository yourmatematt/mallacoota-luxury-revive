import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type PropertyImage = {
  name: string;
  url: string;
  order: number;
};

// Optimized hook to get all images for a property using Supabase storage list API
export const usePropertyImages = (imageFolder: string) => {
  return useQuery({
    queryKey: ['property-images', imageFolder],
    queryFn: async () => {
      if (!imageFolder) return [];

      // Use Supabase storage list API to get all files in the folder
      const { data: files, error } = await supabase.storage
        .from('hammond-properties')
        .list(imageFolder, {
          limit: 100,
          offset: 0,
        });

      if (error) {
        console.error(`Error listing images for ${imageFolder}:`, error);
        return [];
      }

      if (!files || files.length === 0) {
        console.log(`No images found for ${imageFolder}`);
        return [];
      }

      // Filter for image files and create PropertyImage objects
      const validImages = files
        .filter(file => {
          // Only include jpg files that follow the image_N.jpg pattern
          return /^image_\d+\.jpg$/i.test(file.name);
        })
        .map(file => {
          // Extract the number from filename for proper ordering
          const match = file.name.match(/image_(\d+)/i);
          const imageNumber = match ? parseInt(match[1]) : 999;
          
          // Get the public URL for the image
          const { data: urlData } = supabase.storage
            .from('hammond-properties')
            .getPublicUrl(`${imageFolder}/${file.name}`);

          return {
            name: file.name,
            url: urlData.publicUrl,
            order: imageNumber
          };
        })
        .sort((a, b) => a.order - b.order); // Sort by order to ensure image_1 comes first

      console.log(`Found ${validImages.length} images for ${imageFolder}`);
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