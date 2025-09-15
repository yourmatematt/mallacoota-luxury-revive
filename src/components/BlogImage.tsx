import React, { useState } from 'react';
// Remove getBlogImage import - using direct URLs now

// Default fallback image for blogs
const DEFAULT_BLOG_IMAGE = "/images/blog/default-blog-image.jpg";

// Blog image component props
export interface BlogImageProps {
  src?: string | null;
  alt: string;
  slug?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

// Reusable blog image component with error handling
export const BlogImage: React.FC<BlogImageProps> = ({ 
  src, 
  alt, 
  slug, 
  className = "", 
  loading = 'lazy' 
}) => {
  // Determine initial image source - use hero_image_url directly
  const getInitialSrc = () => {
    return src || DEFAULT_BLOG_IMAGE;
  };

  const [imgSrc, setImgSrc] = useState<string>(getInitialSrc());
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      // Use fallback image if current image fails
      if (imgSrc !== DEFAULT_BLOG_IMAGE) {
        setImgSrc(DEFAULT_BLOG_IMAGE);
      }
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      loading={loading}
      onError={handleError}
    />
  );
};

export default BlogImage;