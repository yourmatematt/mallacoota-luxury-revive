import { supabase } from "@/integrations/supabase/client";

// Import fallback images
import propertyHero1 from "@/assets/property-hero-1.jpg";
import propertyHero2 from "@/assets/property-hero-2.jpg";
import propertyHero3 from "@/assets/property-hero-3.jpg";

const fallbackImages = [propertyHero1, propertyHero2, propertyHero3];

/**
 * Gets the primary image URL for a property from Supabase storage
 * Tries both .jpg and .png extensions, falls back to placeholder if not found
 */
export const getPropertyImageUrl = (imageFolder: string, imageNumber: number = 1): string => {
  if (!imageFolder) {
    // Return a fallback image based on hash of empty string
    return fallbackImages[0];
  }

  // Try JPG first, then PNG
  const extensions = ['jpg', 'png'];
  const imageName = `image_${imageNumber}`;

  // For now, we'll construct the URL directly since we can't async check existence in a sync function
  // We'll try JPG first as it's the most common format in the system
  const { data: urlData } = supabase.storage
    .from('hammond-properties')
    .getPublicUrl(`${imageFolder}/${imageName}.jpg`);

  return urlData?.publicUrl || getPropertyFallbackImage(imageFolder);
};

/**
 * Gets a consistent fallback image for a property based on its image folder
 */
export const getPropertyFallbackImage = (imageFolder: string): string => {
  // Create a simple hash from the image folder name to get a consistent fallback
  let hash = 0;
  for (let i = 0; i < imageFolder.length; i++) {
    const char = imageFolder.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  const index = Math.abs(hash) % fallbackImages.length;
  return fallbackImages[index];
};

/**
 * Property-specific image mapping for signature properties
 */
export const getSignaturePropertyImageUrl = (propertySlug: string): string => {
  const propertyImageFolders: { [key: string]: string } = {
    '7-allan-drive': '7-allan-drive',
    'four-on-stingray-point': 'four-on-stingray-point',
    'bella-views': 'bella-views'
  };

  const imageFolder = propertyImageFolders[propertySlug];
  return getPropertyImageUrl(imageFolder);
};

/**
 * Async function to check if an image exists in Supabase storage
 */
export const checkImageExists = async (imageFolder: string, imageName: string): Promise<boolean> => {
  try {
    const { data: files, error } = await supabase.storage
      .from('hammond-properties')
      .list(imageFolder, {
        limit: 100,
      });

    if (error || !files) {
      return false;
    }

    return files.some(file => file.name === imageName);
  } catch (error) {
    console.error('Error checking image existence:', error);
    return false;
  }
};

/**
 * Enhanced property image URL with fallback checking
 */
export const getPropertyImageUrlWithFallback = async (
  imageFolder: string,
  imageNumber: number = 1
): Promise<string> => {
  if (!imageFolder) {
    return getPropertyFallbackImage('');
  }

  // Try different extensions
  const extensions = ['jpg', 'png'];
  const imageName = `image_${imageNumber}`;

  for (const ext of extensions) {
    const fullImageName = `${imageName}.${ext}`;
    const exists = await checkImageExists(imageFolder, fullImageName);

    if (exists) {
      const { data: urlData } = supabase.storage
        .from('hammond-properties')
        .getPublicUrl(`${imageFolder}/${fullImageName}`);

      return urlData?.publicUrl || getPropertyFallbackImage(imageFolder);
    }
  }

  // No image found, return fallback
  return getPropertyFallbackImage(imageFolder);
};