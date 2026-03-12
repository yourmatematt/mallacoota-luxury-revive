import React, { useState, useMemo } from 'react';
import { getBlogImageFallbacks } from '@/lib/blogImages';

// Blog image component props
export interface BlogImageProps {
  src?: string | null;
  alt: string;
  slug?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

// Reusable blog image component with Supabase Storage fallback chain
export const BlogImage: React.FC<BlogImageProps> = ({
  src,
  alt,
  slug,
  className = "",
  loading = 'lazy'
}) => {
  const fallbacks = useMemo(() => {
    if (slug) {
      return getBlogImageFallbacks(slug, src);
    }
    // No slug — use src directly with a placeholder fallback
    return [src || '/images/blog-placeholder.jpg'];
  }, [slug, src]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleError = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < fallbacks.length) {
      setCurrentIndex(nextIndex);
    }
  };

  return (
    <img
      src={fallbacks[currentIndex]}
      alt={alt}
      className={className}
      loading={loading}
      onError={handleError}
    />
  );
};

export default BlogImage;
