import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Updated to use Supabase images - but keep this as fallback
export const getBlogImage = (slug: string): string => {
  // This is now a fallback function - components should use useBlogImage hook instead
  const extensionMap: Record<string, string> = {
    'secret-beaches-coastal-walks': '.png',
    'cultural-historical-secrets': '.jpeg', 
    'whale-watching-winter-wildlife-spectacles': '.png'
  };
  
  const extension = extensionMap[slug] || '.jpg';
  return `/images/blog/${slug}${extension}`;
};