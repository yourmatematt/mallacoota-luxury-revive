import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const getBlogImage = (slug: string): string => {
 const extensionMap: Record<string, string> = {
   'secret-beaches-coastal-walks': '.png',
   'cultural-historical-secrets': '.jpeg', 
   'whale-watching-winter-wildlife-spectacles': '.png'
 };
 
 const extension = extensionMap[slug] || '.jpg';
 return `/images/blog/${slug}${extension}`;
};