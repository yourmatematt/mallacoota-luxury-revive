import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { supabase } from "@/integrations/supabase/client"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Default fallback image for blogs
const DEFAULT_BLOG_IMAGE = "/images/mallacoota-hero-1.jpg";

// Helper function to construct Supabase Storage URL for blog images
export const getBlogImageUrl = (imagePath?: string | null): string => {
  if (!imagePath) return DEFAULT_BLOG_IMAGE;
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) return imagePath;
  
  // Handle different path formats
  let cleanPath = imagePath.trim();
  
  // If path already includes 'discover-mallacoota/', use as is
  if (!cleanPath.includes('discover-mallacoota/')) {
    // Add folder prefix if it's just a filename
    cleanPath = `discover-mallacoota/${cleanPath}`;
  }
  
  // Add .jpg extension if not present (most blog images are JPG)
  if (!cleanPath.includes('.')) {
    cleanPath = `${cleanPath}.jpg`;
  }
  
  try {
    // Get public URL from Supabase Storage
    const { data } = supabase.storage
      .from('hammond-properties')
      .getPublicUrl(cleanPath);
    
    // Log for debugging in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Blog image URL constructed: ${imagePath} → ${data.publicUrl}`);
    }
    
    return data.publicUrl;
  } catch (error) {
    console.warn('Error constructing Supabase image URL:', error);
    return DEFAULT_BLOG_IMAGE;
  }
};

// Local blog image function for fallback/direct usage
export const getBlogImage = (slug: string): string => {
  // Handle undefined or empty slugs
  if (!slug) {
    return '/images/blog-placeholder.jpg';
  }

  // Known blog posts with specific extensions
  const extensionMap: Record<string, string> = {
    'seasonal-seafood-sustainability': '.jpg',
    'the-complete-coffee-scene': '.jpg',
    'origami-coffee-the-local-institution': '.jpg',
    'multi-generational-family-fun': '.jpg',
    'secret-beaches-coastal-walks': '.png',
    'cultural-historical-secrets': '.jpeg',
    'whale-watching-winter-wildlife-spectacles': '.png',
    // Add more mappings as needed
  };

  // Use specific mapping if it exists, otherwise default to .jpg
  const extension = extensionMap[slug] || '.jpg';
  return `/images/blog/${slug}${extension}`;
};

