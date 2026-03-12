const SUPABASE_STORAGE_BASE = 'https://iqdmesndmfphlevakgqe.supabase.co/storage/v1/object/public/hammond-properties/Discover%20Mallacoota';

export const getBlogImage = (slug: string): string => {
  return `${SUPABASE_STORAGE_BASE}/${slug}.jpg`;
};

/**
 * Constructs a Supabase Storage URL for a blog image by slug,
 * with fallback to a database hero_image_url or card_image field.
 */
export const getBlogStorageUrl = (slug: string, dbImageUrl?: string | null): string => {
  // Primary: Supabase Storage by slug
  return `${SUPABASE_STORAGE_BASE}/${slug}.jpg`;
};

/**
 * Returns ordered fallback URLs: Supabase storage (.jpg, .jpeg, .png, .webp),
 * then optional DB field, then placeholders.
 */
export const getBlogImageFallbacks = (slug: string, dbImageUrl?: string | null): string[] => {
  const urls = [
    `${SUPABASE_STORAGE_BASE}/${slug}.jpg`,
    `${SUPABASE_STORAGE_BASE}/${slug}.jpeg`,
    `${SUPABASE_STORAGE_BASE}/${slug}.png`,
    `${SUPABASE_STORAGE_BASE}/${slug}.webp`,
  ];
  if (dbImageUrl) {
    urls.push(dbImageUrl);
  }
  urls.push('/images/blog-placeholder.jpg');
  return urls;
};

export const getBlogImageWithFallback = (slug: string): string[] => {
  return [
    `${SUPABASE_STORAGE_BASE}/${slug}.jpg`,
    `${SUPABASE_STORAGE_BASE}/${slug}.jpeg`,
    `${SUPABASE_STORAGE_BASE}/${slug}.png`,
    `${SUPABASE_STORAGE_BASE}/${slug}.webp`,
    `/images/blog/${slug}.jpg`,
    `/images/blog/${slug}.jpeg`,
    `/images/blog/${slug}.png`,
    `/images/blog/${slug}.webp`,
    `/images/placeholder-hero.jpg`,
    `/images/discover-mallacoota-hero-background.jpg`
  ];
};