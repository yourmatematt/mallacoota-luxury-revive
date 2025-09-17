import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useRef, useMemo } from "react";
import { Helmet } from 'react-helmet-async';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, User, ArrowLeft, ExternalLink, MapPin, Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useBlogPostBySlug, BlogPost } from "@/hooks/useBlogPosts";
import { useCategories } from "@/hooks/useBlogFilters";
import { useProperties, Property } from "@/hooks/useProperties";
import { SafeHtmlContent } from "@/components/SafeHtmlContent";
import { getBlogImageUrl } from "@/lib/utils";
import { getBlogImage } from '@/lib/blogImages';
import { BlogImage } from "@/components/BlogImage";
import PageTransition from "@/components/PageTransition";
import PropertyCard from "@/components/PropertyCard";
import { supabase } from "@/integrations/supabase/client";
import RelatedBlogPosts from "@/components/RelatedBlogPosts";
import { getPropertiesForBlog } from "@/lib/propertyMatcher";
import { propertyMetadata } from "@/data/properties";

// Category to CTA mapping for contextual CTAs
interface CTAConfig {
  title: string;
  subtitle: string;
  link: string;
  trackingData: {
    properties: string[];
  };
}

const categoryToCTA: Record<string, CTAConfig> = {
  'water-adventures': {
    title: 'Stay on the Water',
    subtitle: 'Waterfront properties with direct access',
    link: '/properties?feature=waterfront',
    trackingData: { properties: ['waterfront', 'boat_parking'] }
  },
  'adventures-activities': {
    title: 'Adventure-Ready Stays',
    subtitle: 'Properties perfect for active holidays',
    link: '/properties',
    trackingData: { properties: ['all'] }
  },
  'dining-local-flavors': {
    title: 'Stay Central',
    subtitle: 'Walk to restaurants and cafes',
    link: '/properties?location=central',
    trackingData: { properties: ['central'] }
  },
  'seasonal-planning': {
    title: 'Book Your Seasonal Escape',
    subtitle: 'Properties available for your dates',
    link: '/properties',
    trackingData: { properties: ['all'] }
  }
};

// TypeScript interfaces
interface ScrollCTAProps {
  blogPost: BlogPost;
  category: any;
  variant?: 'accent' | 'outline';
}

interface AnalyticsEvent {
  blog: string;
  property?: string;
  position: string;
  category?: string;
}

// Floating Progress CTA Component
const ScrollCTA: React.FC<ScrollCTAProps> = ({ blogPost, category, variant = 'accent' }) => {
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollTop / scrollHeight;
      
      // Show CTA after 60% scroll
      setShowCTA(scrollProgress >= 0.6);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const trackEvent = (eventData: AnalyticsEvent) => {
    try {
      console.log('Blog CTA Event:', eventData);
      // Add analytics tracking here if configured
    } catch (error) {
      console.warn('Analytics tracking error:', error);
    }
  };

  const handleCTAClick = () => {
    trackEvent({
      blog: blogPost.slug,
      position: 'floating_scroll_cta',
      category: category?.slug || 'unknown'
    });
  };

  return showCTA ? (
    <div className="fixed bottom-4 right-4 z-40 animate-slide-up">
      <Card className="card-luxury p-4 shadow-strong max-w-sm">
        <p className="text-sm font-semibold text-primary mb-2">
          Ready to Experience {category?.name || 'Mallacoota'}?
        </p>
        <Button 
          asChild 
          variant={variant} 
          size="sm" 
          className="w-full"
          onClick={handleCTAClick}
        >
          <Link 
            to="/properties"
            data-source="blog"
            data-blog-slug={blogPost.slug}
            data-blog-category={category?.slug}
          >
            View Properties
          </Link>
        </Button>
      </Card>
    </div>
  ) : null;
};

// Mid-Article Contextual CTA Component
interface MidArticleCTAProps {
  blogPost: BlogPost;
  category: any;
  variant?: 'accent' | 'outline';
}

const MidArticleCTA: React.FC<MidArticleCTAProps> = ({ blogPost, category, variant = 'accent' }) => {
  const categorySlug = category?.slug || 'default';
  const ctaConfig = categoryToCTA[categorySlug] || categoryToCTA['adventures-activities'];

  const trackEvent = (eventData: AnalyticsEvent) => {
    try {
      console.log('Blog CTA Event:', eventData);
    } catch (error) {
      console.warn('Analytics tracking error:', error);
    }
  };

  const handleCTAClick = () => {
    trackEvent({
      blog: blogPost.slug,
      position: 'mid_article_cta',
      category: categorySlug
    });
  };

  return (
    <div className="my-12 p-6 bg-luxury-cream rounded-xl border border-primary/10">
      <div className="text-center">
        <h3 className="text-xl font-serif font-bold text-primary mb-2">
          {ctaConfig.title}
        </h3>
        <p className="text-muted-foreground mb-4">
          {ctaConfig.subtitle}
        </p>
        <Button 
          asChild 
          variant={variant} 
          size="default"
          onClick={handleCTAClick}
        >
          <Link 
            to={ctaConfig.link}
            data-source="blog"
            data-blog-slug={blogPost.slug}
            data-blog-category={categorySlug}
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            View Perfect Stays
          </Link>
        </Button>
      </div>
    </div>
  );
};

// Desktop Sidebar CTA Component
interface SidebarCTAProps {
  blogPost: BlogPost;
  variant?: 'accent' | 'outline';
}

const SidebarCTA: React.FC<SidebarCTAProps> = ({ blogPost, variant = 'accent' }) => {
  const trackEvent = (eventData: AnalyticsEvent) => {
    try {
      console.log('Blog CTA Event:', eventData);
    } catch (error) {
      console.warn('Analytics tracking error:', error);
    }
  };

  const handlePropertyClick = () => {
    trackEvent({
      blog: blogPost.slug,
      position: 'sidebar_properties',
    });
  };

  const handleAdviceClick = () => {
    trackEvent({
      blog: blogPost.slug,
      position: 'sidebar_advice',
    });
  };

  return (
    <aside className="hidden lg:block lg:col-span-1">
      <div className="sticky top-24">
        <Card className="card-luxury p-6">
          <h4 className="text-lg font-serif font-semibold text-primary mb-3">
            Plan Your Stay
          </h4>
          <p className="text-sm text-muted-foreground mb-4">
            Experience {blogPost.title} from our luxury properties
          </p>
          <Button 
            asChild 
            variant={variant} 
            className="w-full mb-3"
            onClick={handlePropertyClick}
          >
            <Link 
              to="/properties"
              data-source="blog"
              data-blog-slug={blogPost.slug}
            >
              View Properties
            </Link>
          </Button>
          <Button 
            asChild 
            variant="outline" 
            className="w-full"
            onClick={handleAdviceClick}
          >
            <Link 
              to="/contact"
              data-source="blog"
              data-blog-slug={blogPost.slug}
            >
              Get Local Advice
            </Link>
          </Button>
        </Card>
      </div>
    </aside>
  );
};

// Property Suggestions Hook with Intelligent Matching
const useSuggestedProperties = (blogPost: BlogPost | null) => {
  const [suggestedProperties, setSuggestedProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get all properties for matching
  const { data: allProperties } = useProperties({});

  useEffect(() => {
    if (!blogPost || !allProperties) return;

    const getSuggestedProperties = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Get intelligent property recommendations
        const relevantPropertyMetadata = getPropertiesForBlog(blogPost.slug, propertyMetadata);

        // Map metadata to actual property data from Supabase
        const matchedProperties = relevantPropertyMetadata.map(metadata => {
          return allProperties.find(property =>
            property.slug === metadata.slug ||
            property.property_id === metadata.id ||
            property.title === metadata.title
          );
        }).filter(Boolean) as Property[];

        // If we don't have enough intelligent matches, fall back to simple matching
        let finalProperties = matchedProperties;
        if (finalProperties.length < 3) {
          const blogContent = `${blogPost.title} ${blogPost.excerpt || ''}`.toLowerCase();
          const slug = blogPost.slug?.toLowerCase() || '';
          const audiences = blogPost.audiences?.toLowerCase() || '';

          // Simple fallback matching
          const fallbackProperties = allProperties.filter(property => {
            // Pet-friendly filtering
            if (slug.includes('pet') || blogContent.includes('pet') || blogContent.includes('dog')) {
              return property.pet_friendly;
            }
            // Water activities filtering
            if (blogContent.includes('water') || blogContent.includes('beach') || blogContent.includes('boat') || blogContent.includes('fishing')) {
              return property.water_views || property.boat_parking;
            }
            // Couples filtering (smaller properties)
            if (audiences.includes('couples')) {
              return property.bedrooms <= 2;
            }
            // Family filtering (larger properties)
            if (audiences.includes('families')) {
              return property.bedrooms >= 3;
            }
            return true;
          });

          // Add fallback properties if needed
          const additionalNeeded = 3 - finalProperties.length;
          const additionalProperties = fallbackProperties
            .filter(prop => !finalProperties.some(fp => fp.id === prop.id))
            .slice(0, additionalNeeded);

          finalProperties = [...finalProperties, ...additionalProperties];
        }

        setSuggestedProperties(finalProperties.slice(0, 3));
      } catch (err) {
        console.error('Error fetching suggested properties:', err);
        setError(err instanceof Error ? err.message : 'Failed to load properties');
      } finally {
        setIsLoading(false);
      }
    };

    getSuggestedProperties();
  }, [blogPost, allProperties]);

  return { suggestedProperties, isLoading, error };
};

// End-of-Article Property Suggestions Component
interface PropertySuggestionsProps {
  blogPost: BlogPost;
  variant?: 'accent' | 'outline';
}

const PropertySuggestions: React.FC<PropertySuggestionsProps> = ({ blogPost, variant = 'accent' }) => {
  const { suggestedProperties, isLoading, error } = useSuggestedProperties(blogPost);

  const trackEvent = (eventData: AnalyticsEvent) => {
    try {
      console.log('Blog CTA Event:', eventData);
    } catch (error) {
      console.warn('Analytics tracking error:', error);
    }
  };

  const handlePropertyClick = (property: Property) => {
    trackEvent({
      blog: blogPost.slug,
      property: property.slug,
      position: 'end_article_suggestions'
    });
  };

  const handleViewAllClick = () => {
    trackEvent({
      blog: blogPost.slug,
      position: 'end_article_view_all'
    });
  };

  if (error) {
    console.error('Property suggestions error:', error);
    return null;
  }

  if (isLoading) {
    return (
      <section className="section-spacing bg-luxury-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-8">
            <div className="h-8 bg-gray-200 rounded mb-2 w-1/2 mx-auto animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card-luxury p-4 animate-pulse">
                <div className="h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!suggestedProperties.length) {
    return null;
  }

  return (
    <section className="section-spacing bg-luxury-cream">
      <div className="container mx-auto px-4 lg:px-8">
        <h3 className="text-2xl font-serif font-bold text-primary mb-2 text-center">
          Where to Stay for {blogPost.title}
        </h3>
        <p className="text-muted-foreground mb-8 text-center">
          Intelligently matched properties based on location and activities
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {suggestedProperties.map((property) => {
            // Get property metadata for recommendation reason
            const metadata = propertyMetadata.find(p =>
              p.slug === property.slug || p.title === property.title
            );

            // Generate recommendation badge
            let recommendationReason = '';
            if (metadata) {
              if (metadata.distanceFromTown <= 5 && (blogPost.slug.includes('coffee') || blogPost.slug.includes('dining'))) {
                recommendationReason = 'Walk to town';
              } else if (metadata.locationTags.includes('waterfront') && (blogPost.title.toLowerCase().includes('water') || blogPost.title.toLowerCase().includes('beach'))) {
                recommendationReason = 'Waterfront access';
              } else if (metadata.featureTags.includes('pet-friendly') && blogPost.slug.includes('pet')) {
                recommendationReason = 'Pet-friendly';
              } else if (metadata.locationTags.includes('remote') && (blogPost.title.toLowerCase().includes('secluded') || blogPost.title.toLowerCase().includes('peaceful'))) {
                recommendationReason = 'Peaceful retreat';
              } else if (metadata.featureTags.includes('family') && blogPost.audiences?.includes('families')) {
                recommendationReason = 'Family-friendly';
              } else {
                recommendationReason = 'Great location';
              }
            }

            return (
              <div
                key={property.id}
                onClick={() => handlePropertyClick(property)}
                className="relative"
              >
                <PropertyCard property={property} />
                {recommendationReason && (
                  <Badge className="absolute top-4 left-4 bg-accent-red text-white shadow-lg">
                    {recommendationReason}
                  </Badge>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-8">
          <Button 
            asChild 
            variant={variant} 
            size="lg"
            onClick={handleViewAllClick}
          >
            <Link 
              to="/properties"
              data-source="blog"
              data-blog-slug={blogPost.slug}
            >
              Explore All Properties
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

const BlogDetail = () => {
  const { slug } = useParams();
  const { data: blogPost, isLoading, error } = useBlogPostBySlug(slug || '');
  const { data: categories } = useCategories();
  const contentRef = useRef<HTMLDivElement>(null);
  
  // A/B Testing variant (could be from URL param or user settings)
  const [ctaVariant] = useState<'accent' | 'outline'>('accent');
  
  // Find the category for this blog post
  const category = categories?.find(cat => cat.id === blogPost?.Categories_id);

  // Set meta tags when blog post loads
  useEffect(() => {
    if (blogPost) {
      // Set page title
      const title = blogPost.meta_title || blogPost.title || 'Hammond Properties Blog';
      document.title = title;
      
      // Set meta description
      const description = blogPost.meta_description || blogPost.excerpt || 'Discover Mallacoota with Hammond Properties';
      
      // Update existing meta tags or create new ones
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      } else {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        metaDescription.setAttribute('content', description);
        document.head.appendChild(metaDescription);
      }

      // Open Graph meta tags for social sharing
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

      updateOrCreateOGMeta('og:title', title);
      updateOrCreateOGMeta('og:description', description);
      updateOrCreateOGMeta('og:url', `https://hammondproperties.com.au/discover-mallacoota/${blogPost.slug}`);
      updateOrCreateOGMeta('og:image', blogPost.hero_image_url || '/placeholder-blog.jpg');
      updateOrCreateOGMeta('og:type', 'article');

      // Twitter Card meta tags
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

      updateOrCreateTwitterMeta('twitter:card', 'summary_large_image');
      updateOrCreateTwitterMeta('twitter:title', title);
      updateOrCreateTwitterMeta('twitter:description', description);
      updateOrCreateTwitterMeta('twitter:image', blogPost.hero_image_url || '/placeholder-blog.jpg');
    }
  }, [blogPost]);

  // Reset to default meta tags when component unmounts
  useEffect(() => {
    return () => {
      document.title = 'Hammond Properties - Luxury Holiday Rentals';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Experience Mallacoota\'s luxury holiday rentals with Hammond Properties. Come as guests. Leave as family.');
      }
    };
  }, []);

  if (isLoading) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto px-4 py-16 text-center">
            <div className="animate-pulse">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-foreground">Loading blog post...</p>
            </div>
          </div>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  if (error) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold mb-4 text-red-600">Error Loading Blog Post</h1>
            <p className="text-muted-foreground mb-6">
              {error.message || 'Something went wrong while loading the blog post.'}
            </p>
            <div className="space-x-4">
              <Button variant="outline" onClick={() => window.location.reload()}>
                Try Again
              </Button>
              <Button asChild>
                <Link to="/discover-mallacoota">Back to Blog</Link>
              </Button>
            </div>
          </div>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  if (!blogPost) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The blog post "{slug}" could not be found.
            </p>
            <Button asChild>
              <Link to="/discover-mallacoota">Back to Blog</Link>
            </Button>
          </div>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  // Helper Functions for Schema Markup
  const extractFAQsFromContent = (content: string): Array<{ question: string; answer: string }> => {
    const faqs: Array<{ question: string; answer: string }> = [];
    
    // Look for FAQ section in content
    const faqSection = content.match(/<h2[^>]*>.*?FAQ.*?<\/h2>([\s\S]*?)(<h2|$)/i);
    
    if (faqSection) {
      // Extract Q&A pairs from list items
      const qaMatches = faqSection[1].matchAll(/<strong>(.*?)<\/strong>.*?<br\s*\/?>(.*?)(?=<\/li>|<li>|$)/gi);
      
      for (const match of qaMatches) {
        if (match[1] && match[2]) {
          faqs.push({
            question: match[1].replace(/<[^>]*>/g, '').trim(),
            answer: match[2].replace(/<[^>]*>/g, '').trim()
          });
        }
      }
    }
    
    return faqs;
  };

  const extractBusinessMentions = (content: string): any[] => {
    const businesses = [];
    
    // Map of known businesses
    const knownBusinesses = {
      'Origami Coffee': {
        type: 'CafeOrCoffeeShop',
        phone: '+61351580123',
        url: 'https://origamicoffee.com.au',
        hours: 'Mo-Su 07:00-14:00'
      },
      'Scallywags': {
        type: 'Restaurant',
        phone: '+61351580455',
        url: 'https://scallywagsmallacoota.com.au',
        cuisine: 'Seafood',
        priceRange: '$$'
      },
      'Lucy\'s Noodle House': {
        type: 'Restaurant',
        phone: '+61351580485',
        cuisine: 'Chinese',
        priceRange: '$'
      },
      'Mallacoota Hotel': {
        type: 'BarOrPub',
        phone: '+61351580244',
        url: 'https://www.mallacootahotel.com.au'
      },
      'Lee\'s Takeaway': {
        type: 'Restaurant',
        phone: '+61351580111',
        cuisine: 'Fish and Chips',
        priceRange: '$'
      }
    };

    // Check for business mentions
    Object.entries(knownBusinesses).forEach(([name, details]) => {
      if (content.includes(name)) {
        businesses.push({
          name,
          ...details
        });
      }
    });

    return businesses;
  };

  const isTouristContent = (blog: BlogPost): boolean => {
    const touristSlugs = [
      'gabo-island',
      'croajingolong-national-park',
      'secret-beaches-coastal-walks',
      'whale-watching-winter-wildlife-spectacles',
      'bastion-point'
    ];
    
    return touristSlugs.includes(blog.slug) || 
           blog.category_slug === 'natural-wonders';
  };

  const getTouristAttractionName = (blog: BlogPost): string => {
    const nameMap: Record<string, string> = {
      'gabo-island': 'Gabo Island Lighthouse Reserve',
      'croajingolong-national-park': 'Croajingolong National Park',
      'secret-beaches-coastal-walks': 'Mallacoota Secret Beaches',
      'whale-watching-winter-wildlife-spectacles': 'Mallacoota Whale Watching Points',
      'bastion-point': 'Bastion Point Mallacoota'
    };
    
    return nameMap[blog.slug] || blog.title;
  };

  const getLocationLatitude = (slug: string): number => {
    const locations: Record<string, number> = {
      'gabo-island': -37.5669,
      'croajingolong-national-park': -37.4667,
      'secret-beaches-coastal-walks': -37.5500,
      'bastion-point': -37.5650
    };
    
    return locations[slug] || -37.5608;
  };

  const getLocationLongitude = (slug: string): number => {
    const locations: Record<string, number> = {
      'gabo-island': 149.9158,
      'croajingolong-national-park': 149.7500,
      'secret-beaches-coastal-walks': 149.7700,
      'bastion-point': 149.7650
    };
    
    return locations[slug] || 149.7592;
  };

  const getTouristType = (categorySlug: string): string => {
    const typeMap: Record<string, string> = {
      'natural-wonders': 'Nature Reserve',
      'water-adventures': 'Beach',
      'adventures-activities': 'Attraction',
      'hidden-gems': 'Scenic Point'
    };
    
    return typeMap[categorySlug] || 'Attraction';
  };

  // Generate Schema Markup
  const generateSchemas = () => {
    // Always provide basic breadcrumb schema, even during loading
    const currentUrl = blogPost ? `https://hammondproperties.com.au/discover-mallacoota/${blogPost.slug}` : window.location.href;

    // Basic breadcrumb schema (always available)
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.hammondproperties.com.au"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Discover Mallacoota",
          "item": "https://www.hammondproperties.com.au/discover-mallacoota"
        },
        ...(blogPost ? [
          {
            "@type": "ListItem",
            "position": 3,
            "name": blogPost.category_name,
            "item": `https://www.hammondproperties.com.au/discover-mallacoota?category=${blogPost.category_slug}`
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": blogPost.title,
            "item": currentUrl
          }
        ] : [])
      ]
    };

    if (!blogPost) return { breadcrumbSchema };
    const extractedFAQs = extractFAQsFromContent(blogPost.content || '');
    const mentionedBusinesses = extractBusinessMentions(blogPost.content || '');

    // 1. Article Schema
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": blogPost.meta_title || blogPost.title,
      "description": blogPost.meta_description || blogPost.excerpt,
      "image": blogPost.hero_image_url || '/placeholder-blog.jpg',
      "datePublished": blogPost.published_date,
      "dateModified": blogPost.updated_at || blogPost.published_date,
      "author": {
        "@type": "Organization",
        "name": "Hammond Properties",
        "url": "https://www.hammondproperties.com.au"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Hammond Properties",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.hammondproperties.com.au/logo.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": currentUrl
      },
      "keywords": [
        "Mallacoota",
        blogPost.category_name,
        ...(blogPost.blog_audiences?.map(ba => ba.audience_id) || []),
        ...(blogPost.blog_seasons?.map(bs => bs.season_id) || [])
      ].filter(Boolean).join(", "),
      "articleSection": blogPost.category_name,
      "wordCount": blogPost.content?.split(' ').length || 1000
    };

    // 2. FAQ Schema (if FAQs exist)
    const faqSchema = extractedFAQs.length > 0 ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": extractedFAQs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    } : null;

    // 3. LocalBusiness Schema for mentioned businesses
    const businessSchemas = mentionedBusinesses.map(business => ({
      "@context": "https://schema.org",
      "@type": business.type || "Restaurant",
      "name": business.name,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mallacoota",
        "addressRegion": "VIC",
        "addressCountry": "AU",
        "postalCode": "3892"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -37.5608,
        "longitude": 149.7592
      },
      "url": business.url,
      "telephone": business.phone,
      "priceRange": business.priceRange || "$",
      "servesCuisine": business.cuisine,
      "openingHours": business.hours
    }));

    // 4. TouristAttraction Schema for location-based content
    const touristAttractionSchema = isTouristContent(blogPost) ? {
      "@context": "https://schema.org",
      "@type": "TouristAttraction",
      "name": getTouristAttractionName(blogPost),
      "description": blogPost.excerpt,
      "image": blogPost.hero_image_url || '/placeholder-blog.jpg',
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mallacoota",
        "addressRegion": "Victoria",
        "addressCountry": "AU"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": getLocationLatitude(blogPost.slug),
        "longitude": getLocationLongitude(blogPost.slug)
      },
      "isAccessibleForFree": true,
      "publicAccess": true,
      "touristType": getTouristType(blogPost.category_slug)
    } : null;


    // 6. Place Schema for Mallacoota
    const placeSchema = {
      "@context": "https://schema.org",
      "@type": "Place",
      "name": "Mallacoota",
      "description": "Coastal town in East Gippsland, Victoria, Australia",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -37.5608,
        "longitude": 149.7592
      },
      "containedInPlace": {
        "@type": "AdministrativeArea",
        "name": "East Gippsland",
        "containedInPlace": {
          "@type": "State",
          "name": "Victoria",
          "containedInPlace": {
            "@type": "Country",
            "name": "Australia"
          }
        }
      }
    };

    return {
      articleSchema,
      faqSchema,
      businessSchemas,
      touristAttractionSchema,
      breadcrumbSchema,
      placeSchema
    };
  };

  const schemas = generateSchemas();

  // Insert mid-article CTA after a reasonable amount of content
  const insertMidArticleCTA = (content: string) => {
    if (!blogPost || !category) return content;
    
    // Find a good insertion point (after 2-3 paragraphs)
    const paragraphs = content.split('</p>');
    if (paragraphs.length < 3) return content;
    
    const insertIndex = Math.min(3, Math.floor(paragraphs.length / 2));
    const beforeCTA = paragraphs.slice(0, insertIndex).join('</p>') + '</p>';
    const afterCTA = paragraphs.slice(insertIndex).join('</p>');
    
    return `${beforeCTA}<div class="mid-article-cta-placeholder"></div>${afterCTA}`;
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        {/* Schema Markup */}
        {schemas && (
          <Helmet>
            {/* Article Schema */}
            <script type="application/ld+json">
              {JSON.stringify(schemas.articleSchema)}
            </script>

            {/* FAQ Schema */}
            {schemas.faqSchema && (
              <script type="application/ld+json">
                {JSON.stringify(schemas.faqSchema)}
              </script>
            )}

            {/* LocalBusiness Schemas */}
            {schemas.businessSchemas.map((schema, index) => (
              <script key={`business-${index}`} type="application/ld+json">
                {JSON.stringify(schema)}
              </script>
            ))}

            {/* TouristAttraction Schema */}
            {schemas.touristAttractionSchema && (
              <script type="application/ld+json">
                {JSON.stringify(schemas.touristAttractionSchema)}
              </script>
            )}

            {/* Breadcrumb Schema */}
            <script type="application/ld+json">
              {JSON.stringify(schemas.breadcrumbSchema)}
            </script>

            {/* Place Schema */}
            <script type="application/ld+json">
              {JSON.stringify(schemas.placeSchema)}
            </script>
          </Helmet>
        )}

        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="relative h-[50vh] overflow-hidden">
            <img
              src={getBlogImage(blogPost.slug)}
              alt={blogPost.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                const currentSrc = target.src;

                if (currentSrc.endsWith('.jpg')) {
                  target.src = currentSrc.replace('.jpg', '.jpeg');
                } else if (currentSrc.endsWith('.jpeg')) {
                  target.src = currentSrc.replace('.jpeg', '.png');
                } else if (currentSrc.endsWith('.png')) {
                  target.src = currentSrc.replace('.png', '.webp');
                } else {
                  target.src = '/placeholder-blog.jpg';
                }
              }}
              loading="eager"
            />
            <div className="absolute inset-0 bg-black/40" />
            
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-4xl text-white">
                  <Link to="/discover-mallacoota" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Blog
                  </Link>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    {category && (
                      <Badge variant="secondary" className="bg-white/20 text-white">
                        {category.name}
                      </Badge>
                    )}
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                    {blogPost.title}
                  </h1>
                  
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      Amelia Hammond
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {blogPost.published_date ? new Date(blogPost.published_date).toLocaleDateString('en-AU', {
                        year: 'numeric',
                        month: 'long', 
                        day: 'numeric'
                      }) : 'Recently'}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      5 min read
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Article Content */}
          <section className="py-16">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Article Content */}
                <div className="lg:col-span-3">
                  <div className="max-w-4xl">
                    {/* Article Body */}
                    <div ref={contentRef} className="content-html">
                      <SafeHtmlContent 
                        htmlContent={insertMidArticleCTA(blogPost.content || blogPost.excerpt || '')}
                        className="prose prose-lg max-w-none" 
                      />
                      
                      {/* Insert Mid-Article CTA */}
                      {blogPost && category && (
                        <MidArticleCTA 
                          blogPost={blogPost} 
                          category={category} 
                          variant={ctaVariant}
                        />
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Sidebar CTA */}
                {blogPost && (
                  <SidebarCTA 
                    blogPost={blogPost} 
                    variant={ctaVariant === 'accent' ? 'outline' : 'accent'}
                  />
                )}
              </div>
            </div>
          </section>

          {/* Related Articles */}
          {blogPost && (
            <RelatedBlogPosts
              currentBlogId={blogPost.id}
              currentCategoryId={blogPost.Categories_id}
              currentAudiences={blogPost.blog_audiences?.map(ba => ba.audience_id) || []}
              currentSeasons={blogPost.blog_seasons?.map(bs => bs.season_id) || []}
            />
          )}

          {/* Property Suggestions - End of Article */}
          {blogPost && (
            <PropertySuggestions 
              blogPost={blogPost} 
              variant={ctaVariant}
            />
          )}
          
          {/* Floating Scroll CTA */}
          {blogPost && category && (
            <ScrollCTA 
              blogPost={blogPost} 
              category={category} 
              variant={ctaVariant}
            />
          )}
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default BlogDetail;