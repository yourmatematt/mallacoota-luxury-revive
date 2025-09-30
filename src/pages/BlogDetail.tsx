import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import FAQSection from "@/components/FAQSection";
import RelatedBlogPosts from "@/components/RelatedBlogPosts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useBlogPostBySlug, useBlogPostsBySlugs } from "@/hooks/useBlogPosts";
import { useCategories } from "@/hooks/useBlogFilters";
import { getBlogImage, getBlogImageWithFallback } from '@/lib/blogImages';
import { generateBlogContent } from "@/lib/blogContentMapper";
import { SafeHtmlContent } from "@/components/SafeHtmlContent";
import { BlogHighlights } from "@/components/BlogHighlights";
import { BlogSidebar } from "@/components/BlogSidebar";
import { useSignatureProperties, SignatureProperty } from "@/hooks/useSignatureProperties";
import { getPropertyFallbackImage } from "@/lib/imageUtils";

// Component for related blog cards with proper image fallback
const RelatedBlogCard = ({ slug }: { slug: string }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cardImageUrl, setCardImageUrl] = useState('');

  // Fetch the actual blog post data for better title
  const { data: relatedBlogPost } = useBlogPostBySlug(slug);

  const imageOptions = useMemo(() => {
    return getBlogImageWithFallback(slug);
  }, [slug]);

  // Set initial image
  useEffect(() => {
    if (imageOptions.length > 0) {
      setCardImageUrl(imageOptions[0]);
      setCurrentImageIndex(0);
    }
  }, [imageOptions]);

  const handleCardImageError = () => {
    const nextIndex = currentImageIndex + 1;
    if (nextIndex < imageOptions.length) {
      setCurrentImageIndex(nextIndex);
      setCardImageUrl(imageOptions[nextIndex]);
    }
  };

  const formatTitle = (slug: string) => {
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const displayTitle = relatedBlogPost?.title || formatTitle(slug);
  const displayExcerpt = relatedBlogPost?.excerpt;

  return (
    <Link to={`/discover-mallacoota/${slug}`}>
      <Card className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={cardImageUrl}
            alt={displayTitle}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={handleCardImageError}
          />
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
              Guide
            </Badge>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <div className="flex items-center text-white/90 text-sm">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Recent</span>
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          <h3 className="text-xl font-serif font-semibold text-primary mb-2 group-hover:text-primary/80 transition-colors line-clamp-2">
            {displayTitle}
          </h3>
          {displayExcerpt && (
            <p className="text-muted-foreground leading-relaxed line-clamp-2 mb-4 text-sm">
              {displayExcerpt}
            </p>
          )}
          <Button variant="link" className="p-0 h-auto text-primary font-medium group-hover:underline">
            Read More →
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};

// Component for recommended properties in sidebar
const RecommendedProperties = ({ blogSlug }: { blogSlug: string }) => {
  const { data: signatureProperties, isLoading } = useSignatureProperties();

  if (isLoading || !signatureProperties) {
    return null;
  }

  // Create a simple hash from the blog slug to determine rotation
  const getHashFromString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  };

  // Rotate properties based on blog slug
  const shuffleArray = (array: any[], seed: number) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor((seed * (i + 1)) % (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      seed = (seed * 9301 + 49297) % 233280; // Simple LCG for consistent randomization
    }
    return shuffled;
  };

  const hash = getHashFromString(blogSlug);
  const shuffledProperties = shuffleArray(signatureProperties, hash);

  // Take only 3 properties for sidebar
  const recommendedProperties = shuffledProperties.slice(0, 3);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-serif font-bold text-primary mb-4">
        Recommended Properties
      </h3>

      {recommendedProperties.map((property) => {
        // Define the same property info as index.tsx
        const propertyInfo = {
          '7-allan-drive': {
            theme: 'Waterfront Luxury',
            subtitle: 'Direct waterfront access • Panoramic lake views',
            description: 'Wake to breathtaking sunrises over Mallacoota Inlet from this stunning waterfront home.',
            features: ['Water Access', 'Town Walk']
          },
          'four-on-stingray-point': {
            theme: 'Glass Architecture',
            subtitle: 'Stunning glass design • Waterfront location',
            description: 'Experience architectural excellence where stunning glass design meets waterfront luxury.',
            features: property.boatParking ? ['Boat Parking'] : []
          },
          'bella-views': {
            theme: 'Panoramic Views',
            subtitle: '270° panoramic vistas • Elevated position',
            description: 'Perched majestically above Mallacoota with spectacular 270-degree views.',
            features: ['Ocean Views', 'Photography']
          }
        }[property.slug] || {
          theme: 'Luxury Property',
          subtitle: 'Premium accommodation',
          description: 'Experience luxury accommodation in Mallacoota.',
          features: []
        };

        return (
          <Card key={property.slug} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="aspect-video relative overflow-hidden">
              <img
                src={property.heroImageUrl || getPropertyFallbackImage(property.imageFolder)}
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = getPropertyFallbackImage(property.imageFolder);
                }}
              />
              {/* Base overlay */}
              <div className="absolute inset-0 bg-black/20"></div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              {/* Top badge */}
              <div className="absolute top-3 left-3">
                <span className="bg-black/40 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium border border-white/20 shadow-lg">
                  {propertyInfo.theme}
                </span>
              </div>

              {/* Bottom text */}
              <div className="absolute bottom-3 left-3 text-white">
                <h4 className="text-sm font-serif font-bold mb-1 drop-shadow-lg" style={{
                  textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.9)'
                }}>
                  {property.title}
                </h4>
                <p className="text-xs opacity-95 drop-shadow-md" style={{
                  textShadow: '0 1px 3px rgba(0,0,0,0.8)'
                }}>
                  {propertyInfo.subtitle}
                </p>
              </div>
            </div>

            <CardContent className="p-4">
              <p className="text-muted-foreground mb-3 leading-relaxed text-sm">
                {propertyInfo.description}
              </p>
              <div className="flex flex-wrap gap-1 mb-3">
                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                  {property.bedrooms} Bedroom{property.bedrooms !== 1 ? 's' : ''}
                </span>
                {propertyInfo.features.map((feature, idx) => (
                  <span key={idx} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                    {feature}
                  </span>
                ))}
                {property.petFriendly && (
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">Pet Friendly</span>
                )}
              </div>
              <Button asChild variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                <Link to={`/properties/${property.slug}`}>
                  View Property
                </Link>
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

const BlogDetail = () => {
  const { slug } = useParams();
  const { data: blogPost, isLoading, error } = useBlogPostBySlug(slug || '');
  const { data: categories } = useCategories();

  // Find the category for this blog post
  const category = categories?.find(cat => cat.id === blogPost?.Categories_id);

  // Generate blog content mapping
  const blogMapping = useMemo(() => {
    if (!blogPost) return null;
    return generateBlogContent(blogPost, category);
  }, [blogPost, category]);

  // Fetch related posts if specified in mapping
  const { data: relatedPosts } = useBlogPostsBySlugs(blogMapping?.relatedReading || []);

  // Image fallback system
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [heroImageUrl, setHeroImageUrl] = useState('');

  const imageOptions = useMemo(() => {
    if (!blogPost) return [];
    return getBlogImageWithFallback(blogPost.slug);
  }, [blogPost]);

  // Set initial image and handle fallbacks
  useEffect(() => {
    if (imageOptions.length > 0) {
      setHeroImageUrl(imageOptions[0]);
      setCurrentImageIndex(0);
    }
  }, [imageOptions]);

  const handleImageError = () => {
    const nextIndex = currentImageIndex + 1;
    if (nextIndex < imageOptions.length) {
      setCurrentImageIndex(nextIndex);
      setHeroImageUrl(imageOptions[nextIndex]);
    }
  };


  // Set meta tags when blog post loads
  useEffect(() => {
    if (blogPost) {
      const title = blogPost.meta_title || blogPost.title || 'Hammond Properties Blog';
      document.title = title;

      const description = blogPost.meta_description || blogPost.excerpt || 'Discover Mallacoota with Hammond Properties';

      let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
      if (metaDescription) {
        metaDescription.content = description;
      } else {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        metaDescription.content = description;
        document.head.appendChild(metaDescription);
      }
    }
  }, [blogPost]);

  if (isLoading) {
    return (
      <PageTransition>
        <div className="min-h-screen">
          <Header />
          <div className="container mx-auto px-4 py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading blog post...</p>
            </div>
          </div>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  if (error || !blogPost || !blogMapping) {
    return (
      <PageTransition>
        <div className="min-h-screen">
          <Header />
          <div className="container mx-auto px-4 py-20">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-primary mb-4">Blog Post Not Found</h1>
              <p className="text-muted-foreground mb-8">
                The blog post you're looking for doesn't exist or has been moved.
              </p>
              <Button asChild>
                <Link to="/discover-mallacoota">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Link>
              </Button>
            </div>
          </div>
          <Footer />
        </div>
      </PageTransition>
    );
  }


  return (
    <PageTransition>
      <Helmet>
        <title>{blogPost.meta_title || blogPost.title}</title>
        <meta name="description" content={blogPost.meta_description || blogPost.excerpt} />
        <meta property="og:title" content={blogPost.title} />
        <meta property="og:description" content={blogPost.excerpt} />
        <meta property="og:image" content={heroImageUrl} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://hammondproperties.com.au/discover-mallacoota/${blogPost.slug}`} />

        {/* Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": blogPost.title,
            "description": blogPost.excerpt,
            "image": heroImageUrl,
            "author": {
              "@type": "Organization",
              "name": "Hammond Properties"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Hammond Properties",
              "logo": {
                "@type": "ImageObject",
                "url": "https://hammondproperties.com.au/images/hammond-properties-logo.jpg"
              }
            },
            "datePublished": blogPost.created_at,
            "dateModified": blogPost.updated_at || blogPost.created_at
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        <Header />
        <main>
          {/* Navigation Breadcrumb */}
          <div className="bg-luxury-cream/30 py-4">
            <div className="container mx-auto px-4 lg:px-8">
              <nav className="flex items-center space-x-2 text-sm">
                <Link to="/" className="text-muted-foreground hover:text-primary">
                  Home
                </Link>
                <span className="text-muted-foreground">/</span>
                <Link to="/discover-mallacoota" className="text-muted-foreground hover:text-primary">
                  Discover Mallacoota
                </Link>
                <span className="text-muted-foreground">/</span>
                <span className="text-primary font-medium">{blogPost.title}</span>
              </nav>
            </div>
          </div>

          {/* Hero Section */}
          <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
            <img
              src={heroImageUrl}
              alt={blogPost.title}
              className="absolute inset-0 w-full h-full object-cover"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
              {category && (
                <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                  {category.name}
                </Badge>
              )}
              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 drop-shadow-lg">
                {blogMapping.heroTitle}
              </h1>
              <p className="text-xl md:text-2xl mb-8 leading-relaxed drop-shadow-md max-w-3xl mx-auto">
                {blogMapping.heroSubtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                  <Link to="/properties">
                    {blogMapping.cta.primary}
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-primary">
                  <Link to="/discover-mallacoota">
                    {blogMapping.cta.secondary}
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Highlights Section */}
          {(!blogMapping.customLayout || blogMapping.customLayout.layoutConfig?.showHighlightsGrid !== false) && (
            <BlogHighlights highlights={blogMapping.highlights} />
          )}

          {/* Article Content */}
          <section className="py-16">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="grid lg:grid-cols-3 gap-12">
                {/* Main Content - 2 columns */}
                <div className="lg:col-span-2">
                  <article className="prose prose-lg max-w-none">
                    <SafeHtmlContent
                      content={blogPost.content || ''}
                      className="blog-content"
                    />
                  </article>
                </div>

                {/* Sidebar - 1 column */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24 lg:top-28 space-y-8">
                    {blogMapping.customLayout?.sidebarSections ? (
                      // Custom Layout with Sidebar
                      <BlogSidebar
                        sections={blogMapping.customLayout.sidebarSections}
                        cta={blogMapping.customLayout.sidebarCTA}
                      />
                    ) : (
                      // Traditional Practical Information Card
                      blogMapping.customLayout?.layoutConfig?.showPracticalInfo !== false && (
                        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                          <CardContent className="p-8">
                            <h3 className="text-2xl font-serif font-bold text-primary mb-8">
                              Practical Information
                            </h3>

                            <div className="space-y-6">
                              {blogMapping.practicalInfo.map((info, index) => {
                                const IconComponent = info.icon;
                                return (
                                  <div key={index} className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 mt-1">
                                      <IconComponent className={info.iconClass} />
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-primary mb-2">{info.title}</h4>
                                      <div className="text-muted-foreground space-y-1">
                                        {info.items.map((item, itemIndex) => (
                                          <p key={itemIndex}>{item}</p>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </CardContent>
                        </Card>
                      )
                    )}

                    {/* Recommended Properties */}
                    <RecommendedProperties blogSlug={blogPost.slug} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs Accordion - moved outside main article, before CTA */}
          {blogMapping.faqs && blogMapping.faqs.length > 0 && (
            <section className="py-16 bg-accent/5">
              <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-8 text-center">
                    Frequently Asked Questions
                  </h2>

                  <Accordion type="single" collapsible className="space-y-4">
                    {blogMapping.faqs.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="bg-white rounded-lg border border-border shadow-sm"
                      >
                        <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                          <span className="text-lg font-semibold text-primary pr-4">
                            {faq.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4">
                          <p className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </section>
          )}

          {/* Related Reading - Blog Cards */}
          {blogMapping?.relatedReading && blogMapping.relatedReading.length > 0 && (
            <section className="py-16 bg-background">
              <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-6xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-8 text-center">
                    Related Reading
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {blogMapping.relatedReading.map((slug) => (
                      <RelatedBlogCard key={slug} slug={slug} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Related Posts */}
          <RelatedBlogPosts
            currentSlug={blogPost.slug}
            categoryId={blogPost.Categories_id}
          />

          {/* Bottom CTA Section */}
          <section className="py-20 bg-gradient-to-r from-primary/95 to-primary text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/texture-pattern.svg')] opacity-10" />
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="text-center max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                  {blogMapping.bottomCTA.title}
                </h2>
                <p className="text-xl mb-8 leading-relaxed opacity-95">
                  {blogMapping.bottomCTA.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                    <Link to="/properties">
                      {blogMapping.bottomCTA.buttons.primary}
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-primary">
                    <Link to="/contact">
                      {blogMapping.bottomCTA.buttons.secondary}
                    </Link>
                  </Button>
                </div>

                <p className="mt-8 text-sm opacity-75">
                  Discover why discerning travelers choose Mallacoota for truly special coastal holidays
                </p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default BlogDetail;