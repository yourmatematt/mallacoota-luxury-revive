import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({ 
  title, 
  description, 
  canonical,
  ogImage = "https://hammondproperties.com.au/images/hammond-properties-og.jpg"
}) => {
  const location = useLocation();
  const baseUrl = "https://hammondproperties.com.au";
  
  // Generate canonical URL based on current route if not provided
  const canonicalUrl = canonical || `${baseUrl}${location.pathname}`;
  
  // Default meta values
  const defaultTitle = "Mallacoota Holiday Rentals | Luxury Waterfront Homes | Hammond Properties";
  const defaultDescription = "Experience Mallacoota's finest holiday homes. Waterfront luxury properties with premium amenities, pet-friendly options, personal concierge. ⭐ 500+ 5-star reviews.";
  
  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;

  useEffect(() => {
    // Update page title
    document.title = finalTitle;
    
    // Update or create meta description
    const updateOrCreateMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };

    // Update or create Open Graph meta tags
    const updateOrCreateOGMeta = (property: string, content: string) => {
      let ogMeta = document.querySelector(`meta[property="${property}"]`);
      if (ogMeta) {
        ogMeta.setAttribute('content', content);
      } else {
        ogMeta = document.createElement('meta');
        ogMeta.setAttribute('property', property);
        ogMeta.setAttribute('content', content);
        document.head.appendChild(ogMeta);
      }
    };

    // Update or create Twitter meta tags
    const updateOrCreateTwitterMeta = (name: string, content: string) => {
      let twitterMeta = document.querySelector(`meta[name="${name}"]`);
      if (twitterMeta) {
        twitterMeta.setAttribute('content', content);
      } else {
        twitterMeta = document.createElement('meta');
        twitterMeta.setAttribute('name', name);
        twitterMeta.setAttribute('content', content);
        document.head.appendChild(twitterMeta);
      }
    };

    // Update or create canonical link
    const updateOrCreateCanonical = (href: string) => {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute('href', href);
      } else {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        canonical.setAttribute('href', href);
        document.head.appendChild(canonical);
      }
    };

    // Update all meta tags
    updateOrCreateMeta('description', finalDescription);
    
    // Open Graph tags
    updateOrCreateOGMeta('og:title', finalTitle);
    updateOrCreateOGMeta('og:description', finalDescription);
    updateOrCreateOGMeta('og:url', canonicalUrl);
    updateOrCreateOGMeta('og:image', ogImage);
    updateOrCreateOGMeta('og:type', 'website');
    
    // Twitter Card tags
    updateOrCreateTwitterMeta('twitter:card', 'summary_large_image');
    updateOrCreateTwitterMeta('twitter:title', finalTitle);
    updateOrCreateTwitterMeta('twitter:description', finalDescription);
    updateOrCreateTwitterMeta('twitter:image', ogImage);
    
    // Canonical URL
    updateOrCreateCanonical(canonicalUrl);

  }, [finalTitle, finalDescription, canonicalUrl, ogImage]);

  // This component doesn't render anything visible
  return null;
};

export default SEOHead;