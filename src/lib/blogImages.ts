export const getBlogImage = (slug: string): string => {
  // First try the specific blog image
  return `/images/blog/${slug}.jpg`;
};

export const getBlogImageWithFallback = (slug: string): string[] => {
  // Return array of image sources to try in order
  return [
    `/images/blog/${slug}.jpg`,
    `/images/blog/${slug}.jpeg`,
    `/images/blog/${slug}.png`,
    `/images/placeholder-hero.jpg`, // Main fallback
    `/images/discover-mallacoota-hero-background.jpg` // Final fallback
  ];
};