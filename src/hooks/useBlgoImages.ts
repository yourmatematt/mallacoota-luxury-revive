import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useBlogImage = (slug: string) => {
  return useQuery({
    queryKey: ['blog-image', slug],
    queryFn: async (): Promise<string> => {
      if (!slug) {
        return '/placeholder-blog.jpg';
      }

      // List files in the Discover Mallacoota folder
      const { data: files, error } = await supabase.storage
        .from('hammond-properties')
        .list('Discover Mallacoota', {
          limit: 100,
        });

      if (error) {
        console.error('Error listing blog images:', error);
        return '/placeholder-blog.jpg';
      }

      // Find the image that matches the slug
      const imageFile = files?.find(file => {
        const fileName = file.name.toLowerCase();
        const slugLower = slug.toLowerCase();
        
        // Check if the filename contains the slug (without extension)
        return fileName.includes(slugLower) || fileName.startsWith(slugLower);
      });

      if (!imageFile) {
        console.warn(`No blog image found for slug: ${slug}`);
        return '/placeholder-blog.jpg';
      }

      // Get the public URL for the image
      const { data: urlData } = supabase.storage
        .from('hammond-properties')
        .getPublicUrl(`Discover Mallacoota/${imageFile.name}`);

      return urlData?.publicUrl || '/placeholder-blog.jpg';
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000,   // 10 minutes
  });
};