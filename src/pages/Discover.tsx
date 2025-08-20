import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, Filter, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { useCategories } from "@/hooks/useBlogFilters";
import BlogCategoryBadge from "@/components/BlogCategoryBadge";
import { getBlogImage } from "@/lib/utils";
import PageTransition from "@/components/PageTransition";

// CTA Section Component
const CTASection = () => {
  return (
    <section className="section-cta py-20">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA */}
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Ready to Plan Your Stay?
          </h2>
          
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
            Discover your perfect Mallacoota retreat. Browse our collection of premium vacation rentals.
          </p>
          
          {/* CTA Button */}
          <Button asChild variant="accent" size="default" rounded="full">
            <Link to="/properties">
              View All Properties
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

const Discover = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [filters, setFilters] = useState({
    categoryId: '', // Back to single categoryId
  });

  // SEO Meta Tags for Discover Mallacoota page
  useEffect(() => {
    // Set page title
    const title = "Discover Mallacoota - Complete Local Guide | Hammond Properties";
    document.title = title;
    
    // Set meta description
    const description = "Your complete guide to exploring Mallacoota. Discover the best beaches, restaurants, activities, and hidden gems in Australia's coastal paradise. Local insider tips and recommendations.";
    
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
    updateOrCreateOGMeta('og:url', 'https://hammondproperties.com.au/discover-mallacoota');
    updateOrCreateOGMeta('og:image', 'https://hammondproperties.com.au/images/discover-mallacoota-hero-background.jpg');
    updateOrCreateOGMeta('og:type', 'website');

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
    updateOrCreateTwitterMeta('twitter:image', 'https://hammondproperties.com.au/images/discover-mallacoota-hero-background.jpg');

    // Structured data for local guide/blog
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Discover Mallacoota - Local Guide",
      "description": description,
      "url": "https://hammondproperties.com.au/discover-mallacoota",
      "mainEntity": {
        "@type": "Blog",
        "name": "Discover Mallacoota Blog",
        "description": "Local insights and travel guides for Mallacoota, Victoria",
        "publisher": {
          "@type": "Organization",
          "name": "Hammond Properties",
          "url": "https://hammondproperties.com.au"
        }
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://hammondproperties.com.au"
          },
          {
            "@type": "ListItem", 
            "position": 2,
            "name": "Discover Mallacoota",
            "item": "https://hammondproperties.com.au/discover-mallacoota"
          }
        ]
      },
      "about": {
        "@type": "Place",
        "name": "Mallacoota",
        "description": "Coastal town in Victoria, Australia known for pristine beaches, national parks, and wildlife",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "-37.5667",
          "longitude": "149.7333"
        },
        "containedInPlace": {
          "@type": "AdministrativeArea",
          "name": "Victoria, Australia"
        }
      }
    };

    // Add structured data script
    let structuredDataScript = document.querySelector('#discover-structured-data');
    if (structuredDataScript) {
      structuredDataScript.textContent = JSON.stringify(structuredData);
    } else {
      structuredDataScript = document.createElement('script');
      structuredDataScript.id = 'discover-structured-data';
      structuredDataScript.type = 'application/ld+json';
      structuredDataScript.textContent = JSON.stringify(structuredData);
      document.head.appendChild(structuredDataScript);
    }

    // Additional meta tags
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

    updateOrCreateMeta('keywords', 'Mallacoota travel guide, things to do Mallacoota, Mallacoota attractions, Mallacoota beaches, Mallacoota restaurants, Victoria travel, Croajingolong National Park');
    updateOrCreateMeta('author', 'Hammond Properties');

    // Cleanup function
    return () => {
      // Reset title
      document.title = 'Hammond Properties - Luxury Vacation Rentals';
      
      // Reset meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Experience Mallacoota\'s luxury vacation rentals with Hammond Properties. Come as guests. Leave as family.');
      }
      
      // Remove structured data
      const structuredDataScript = document.querySelector('#discover-structured-data');
      if (structuredDataScript) {
        structuredDataScript.remove();
      }
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const { data: blogPosts, isLoading, error } = useBlogPosts({categoryId: filters.categoryId});
  const { data: categories } = useCategories();

  const clearFilters = () => {
    setFilters({
      categoryId: '',
    });
  };

  // Function to scroll to results section
  const scrollToResults = () => {
    const resultsSection = document.getElementById('articles-section');
    if (resultsSection) {
      resultsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Function to scroll back to filters
  const scrollToFilters = () => {
    const filtersSection = document.querySelector('.bg-white\\/10.backdrop-blur-sm');
    if (filtersSection) {
      filtersSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  // Get the count of articles for the button
  const articleCount = blogPosts?.length || 0;
  const articleText = articleCount === 1 ? 'article' : 'articles';
  const hasActiveFilters = filters.categoryId !== '';

  if (error) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="pt-20">
            <div className="container mx-auto px-4 py-16 text-center">
              <h1 className="text-2xl font-bold mb-4">Error loading blog posts</h1>
              <p className="text-muted-foreground">Please try again later.</p>
            </div>
          </main>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
        {/* Hero Section with Animations - Mobile Optimized */}
<section className="relative min-h-[60vh] sm:min-h-[70vh] lg:h-[calc(100vh-5rem)] overflow-hidden">
  {/* Background Image with scale effect */}
  <div 
    className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-out ${
      isLoaded ? 'scale-100' : 'scale-105'
    }`}
    style={{ backgroundImage: 'url("/images/discover-mallacoota-hero-background.jpg")' }}
  >
    {/* Overlay for better text readability */}
    <div className="absolute inset-0 bg-black/40"></div>
  </div>
  
  {/* Content with staggered animations */}
  <div className="relative z-10 h-full flex items-center justify-center py-16 sm:py-20">
    <div className="text-center text-white px-6 md:px-4 max-w-4xl mx-auto">
      {/* Main Title */}
      <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-3 sm:mb-4 lg:mb-6 transition-all duration-800 delay-200 leading-tight ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        Discover Mallacoota
      </h1>
      
      {/* Subtitle */}
      <p className={`text-base sm:text-lg md:text-xl lg:text-2xl font-light mb-4 sm:mb-6 lg:mb-8 max-w-3xl mx-auto leading-relaxed transition-all duration-800 delay-400 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        Your complete guide to exploring Australia's hidden coastal gem
      </p>
      
      {/* Filter Controls with Animation - Mobile Optimized */}
      <div className={`max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20 transition-all duration-800 delay-800 ${
        isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
      }`}>
        <div className="flex flex-col space-y-4 sm:space-y-6">
          <div>
            <label className="text-xs sm:text-sm font-medium text-white mb-4 sm:mb-6 flex items-center justify-center text-center leading-relaxed">
              From pristine beaches to hidden bushwalking trails, discover the best activities, attractions, and experiences Mallacoota has to offer
            </label>
            
            {/* Category Pills - Mobile Grid */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2 sm:gap-3">
              <Button
                variant={!hasActiveFilters ? "secondary" : "outline"}
                size="sm"
                onClick={() => setFilters({categoryId: ''})}
                className={`text-xs sm:text-sm px-3 sm:px-4 py-2 transition-all duration-300 ${
                  !hasActiveFilters 
                    ? "bg-white text-primary shadow-lg" 
                    : "bg-white/20 border-white/30 text-white hover:bg-white hover:text-primary"
                }`}
              >
                All Articles
              </Button>
              {categories?.map((category) => {
                const isSelected = filters.categoryId === category.id;
                return (
                  <Button
                    key={category.id}
                    variant={isSelected ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => {
                      if (isSelected) {
                        // If clicking the active category, deactivate it (go to "All")
                        setFilters({categoryId: ''});
                      } else {
                        // Otherwise, activate this category
                        setFilters({categoryId: category.id});
                      }
                    }}
                    className={`text-xs sm:text-sm px-3 sm:px-4 py-2 transition-all duration-300 whitespace-nowrap ${
                      isSelected
                        ? "bg-white text-primary shadow-lg hover:bg-white/90"
                        : "bg-white/20 border-white/30 text-white hover:bg-white hover:text-primary"
                    }`}
                  >
                    <span className="truncate">{category.name}</span>
                  </Button>
                );
              })}
            </div>
          </div>
          
          {/* Results Button and Clear Filters */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            {/* View Articles Button */}
            <Button 
              onClick={scrollToResults}
              className="w-full sm:w-auto bg-accent-red hover:bg-accent-red/90 text-white px-6 sm:px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
              disabled={isLoading}
            >
              {isLoading 
                ? "Loading articles..." 
                : `View ${articleCount} ${articleText} matching your search`
              }
            </Button>
            
            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <Button 
                onClick={clearFilters}
                variant="outline"
                className="w-full sm:w-auto bg-white/20 border-white/30 text-white hover:bg-white/30 text-sm sm:text-base"
              >
                Clear Filter
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

          {/* Blog Posts Section */}
          <section id="articles-section" className="section-primary py-20">
            <div className="container mx-auto px-4 lg:px-8">
              
              {/* Sticky Header - Always Visible - Fixed z-index */}
              <div className="sticky top-20 z-30 bg-gradient-to-r from-gray-800 to-gray-700 text-white p-4 sm:p-6 rounded-lg shadow-lg mb-8"
                style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold mb-2">
                      {hasActiveFilters 
                        ? (categories?.find(cat => cat.id === filters.categoryId)?.name || 'Filtered Articles')
                        : 'All Articles'
                      }
                    </h2>
                    <div className="flex items-center space-x-4 text-white/90 text-sm">
                      {hasActiveFilters && (
                        <span>{categories?.find(cat => cat.id === filters.categoryId)?.name}</span>
                      )}
                      <span>• {blogPosts?.length || 0} articles found</span>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={scrollToFilters}
                      className="bg-white/20 border-white/30 text-white hover:bg-white hover:text-gray-800 transition-all duration-300"
                    >
                      <ArrowUp className="w-4 h-4 mr-2" />
                      Back to Filters
                    </Button>
                    {hasActiveFilters && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={clearFilters}
                        className="bg-white/20 border-white/30 text-white hover:bg-white hover:text-gray-800 transition-all duration-300"
                      >
                        Clear Filter
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, index) => (
                    <Card key={index} className="card-luxury animate-pulse">
                      <div className="aspect-video bg-muted rounded-t-xl"></div>
                      <CardContent className="p-6">
                        <div className="h-4 bg-muted rounded mb-2"></div>
                        <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                        <div className="h-3 bg-muted rounded mb-2"></div>
                        <div className="h-3 bg-muted rounded w-2/3"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Blog Posts Grid */}
              {!isLoading && blogPosts && blogPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogPosts.map((post) => (
                    <Card key={post.id} className="card-luxury hover:scale-[1.02] transition-all duration-300">
                      <Link to={`/discover-mallacoota/${post.slug}`}>
                        <div className="aspect-video overflow-hidden rounded-t-xl">
                          <img
                            src={getBlogImage(post.slug)}
                            alt={post.title || 'Blog post'}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/placeholder-blog.jpg';
                            }}
                          />
                        </div>
                        <CardContent className="p-6">
                          {/* Category Badge */}
                          {post.Categories_id && (
                            <div className="mb-3">
                              <BlogCategoryBadge categoryId={post.Categories_id} />
                            </div>
                          )}

                          {/* Title */}
                          <h3 className="text-xl font-serif font-bold text-primary mb-3 line-clamp-2 hover:text-accent-red transition-colors">
                            {post.title}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                            {post.excerpt}
                          </p>

                          {/* Meta Information */}
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center space-x-4">
                              {post.published_date && (
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  <span>{new Date(post.published_date).toLocaleDateString('en-AU', { 
                                    year: 'numeric', 
                                    month: 'short', 
                                    day: 'numeric' 
                                  })}</span>
                                </div>
                              )}
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                <span>5 min read</span>
                              </div>
                            </div>
                          </div>

                          {/* Tags */}
                          {(post.seasons || post.activity_levels || post.audiences) && (
                            <div className="flex flex-wrap gap-2 mt-4">
                              {post.seasons && (
                                <Badge variant="outline" className="text-xs">
                                  {post.seasons}
                                </Badge>
                              )}
                              {post.activity_levels && (
                                <Badge variant="outline" className="text-xs">
                                  {post.activity_levels}
                                </Badge>
                              )}
                              {post.audiences && (
                                <Badge variant="outline" className="text-xs">
                                  {post.audiences}
                                </Badge>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Link>
                    </Card>
                  ))}
                </div>
              )}

              {/* No Results */}
              {!isLoading && blogPosts?.length === 0 && (
                <div className="text-center py-16">
                  <div className="max-w-md mx-auto">
                    <h3 className="text-xl font-semibold text-primary mb-4">
                      No experiences found
                    </h3>
                    <p className="text-muted-foreground mb-8">
                      Try adjusting your filters to discover more Mallacoota experiences.
                    </p>
                    <Button onClick={clearFilters} size="lg">
                      Clear All Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* CTA Section - Added after blog posts */}
          <CTASection />
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Discover;