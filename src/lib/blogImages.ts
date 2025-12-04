const SUPABASE_STORAGE_BASE = 'https://iqdmesndmfphlevakgqe.supabase.co/storage/v1/object/public/hammond-properties/Discover%20Mallacoota';

export const getBlogImage = (slug: string): string => {
  return `${SUPABASE_STORAGE_BASE}/${slug}.jpg`;
};

export const getBlogImageWithFallback = (slug: string): string[] => {
  return [
    `${SUPABASE_STORAGE_BASE}/${slug}.jpg`,
    `/images/blog/${slug}.jpg`,
    `/images/blog/${slug}.jpeg`,
    `/images/blog/${slug}.png`,
    `/images/placeholder-hero.jpg`,
    `/images/discover-mallacoota-hero-background.jpg`
  ];
};