import { useState, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Filter } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useProperties } from "@/hooks/useProperties";
import { CSSProperties } from "react";

interface Review {
  id: string;
  reviewer: string;
  review_date: string;
  rating: string;
  review: string;
  property_id: string;
  property_name: string;
  source: string;
}

interface PropertyReviewsSectionProps {
  property: any;
  allReviews: Review[];
  setSelectedProperty: (propertyId: string) => void;
}

const PropertyReviewsSection = ({ property, allReviews, setSelectedProperty }: PropertyReviewsSectionProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (titleRef.current && sectionRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const navbarHeight = 80; // Adjust based on your navbar height
        
        // Calculate when title hits the navbar
        const titleHitsNavbar = titleRect.top <= navbarHeight;
        
        if (titleHitsNavbar) {
          const sectionRect = sectionRef.current.getBoundingClientRect();
          // Calculate scroll progress within the section
          const progress = Math.max(0, Math.min(1, (navbarHeight - titleRect.top) / (sectionRect.height * 0.3)));
          setScrollProgress(progress);
        } else {
          setScrollProgress(0);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getCardStyle = (index: number): CSSProperties => {
    const column = index % 3; // Which column (0, 1, 2)
    const layer = Math.floor(index / 3); // Which layer (0, 1, 2...)
    
    if (layer === 0) {
      // Base layer cards - always visible
      return {
        position: 'relative' as const,
        zIndex: 1,
        transform: 'translateY(0)',
        opacity: 1
      };
    }
    
    // Stacking cards (4, 5, 6) with sequential delays
    const cardDelay = (index - 3) * 0.2; // 0, 0.2, 0.4 delay for cards 4, 5, 6
    const adjustedProgress = Math.max(0, scrollProgress - cardDelay);
    const stackProgress = Math.min(1, adjustedProgress * 3); // Speed up the animation
    
    const isVisible = adjustedProgress > 0;
    const slideUpAmount = isVisible ? Math.max(0, 100 - stackProgress * 110) : 100;
    
    return {
      position: 'absolute' as const,
      top: 0,
      left: `calc(${column * 33.333}% + ${column * 2}rem)`, // Account for gap
      width: 'calc(33.333% - 1.333rem)', // Account for gap
      zIndex: 10 + layer,
      transform: `translateY(${slideUpAmount}%)`,
      opacity: isVisible ? Math.min(1, stackProgress * 1.2) : 0,
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    };
  };

  // Only show up to 6 reviews for stacking effect
  const reviewsToShow = allReviews.slice(0, 6);

  return (
    <div ref={sectionRef} className="mb-16 min-h-screen">
      <div ref={titleRef} className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-serif font-bold text-primary mb-2">
            {property.title}
          </h2>
          <p className="text-muted-foreground">
            {allReviews.length} review{allReviews.length === 1 ? '' : 's'}
          </p>
        </div>
        <Link to={`/properties/${property.slug}`}>
          <Button variant="outline">
            View Property
          </Button>
        </Link>
      </div>
      
      {/* Reviews Grid with Stacking */}
      <div className="relative min-h-[600px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {reviewsToShow.map((review, index) => (
            <Card 
              key={review.id}
              className="card-luxury h-full animate-fade-in"
              style={{
                ...getCardStyle(index),
                animationDelay: index < 3 ? `${index * 0.1}s` : '0s'
              }}
            >
              <CardContent className="p-6 h-full flex flex-col">
                {/* Stack Number Indicator */}
                <div className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">
                  {index + 1}
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {[...Array(parseInt(review.rating) || 5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {review.source}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
                  "{review.review}"
                </p>
                
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-primary">
                    {review.reviewer}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground space-x-2">
                    <span>{new Date(review.review_date).toLocaleDateString('en-AU', {
                      year: 'numeric',
                      month: 'long'
                    })}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {allReviews.length > 6 && (
        <div className="text-center mt-8">
          <Button 
            variant="outline"
            onClick={() => setSelectedProperty(property.id)}
          >
            View All {property.title} Reviews
          </Button>
        </div>
      )}
      
      {/* Spacer for scroll effect */}
      <div className="h-96"></div>
    </div>
  );
};

const Testimonials = () => {
  const [searchParams] = useSearchParams();
  const [selectedProperty, setSelectedProperty] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("newest");

  // Fetch properties and reviews from Supabase
  const { data: properties, isLoading: propertiesLoading } = useProperties();
  
  const { data: allReviews, isLoading: reviewsLoading } = useQuery({
    queryKey: ['airbnb-reviews'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Airbnb Reviews')
        .select('*')
        .order('review_date', { ascending: false });
      
      if (error) throw error;
      return data as Review[];
    },
  });

  // Filter reviews based on selected property
  const filteredReviews = selectedProperty === "All" 
    ? allReviews || []
    : (allReviews || []).filter(review => review.property_id === selectedProperty);

  // Sort reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.review_date).getTime() - new Date(a.review_date).getTime();
      case "oldest":
        return new Date(a.review_date).getTime() - new Date(b.review_date).getTime();
      case "highest":
        return parseInt(b.rating) - parseInt(a.rating);
      case "lowest":
        return parseInt(a.rating) - parseInt(b.rating);
      default:
        return 0;
    }
  });

  // Set initial filter from URL params
  useEffect(() => {
    const propertyParam = searchParams.get("property");
    if (propertyParam) {
      setSelectedProperty(propertyParam);
    }
  }, [searchParams]);

  // Group reviews by property for property sections
  const reviewsByProperty = (properties || []).map(property => ({
    ...property,
    reviews: (allReviews || []).filter(review => review.property_id === property.id),
    reviewCount: (allReviews || []).filter(review => review.property_id === property.id).length
  }));

  if (propertiesLoading || reviewsLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-pulse">Loading testimonials...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-6">
                Guest Testimonials
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Real experiences from families who've made our properties their home away from home. Come as guests. Leave as family.
              </p>
            </div>

            {/* Filter Controls */}
            <div className="max-w-4xl mx-auto bg-card rounded-2xl p-6 shadow-soft border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">
                    <Filter className="w-4 h-4 inline mr-2" />
                    Filter by Property
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedProperty === "All" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedProperty("All")}
                    >
                      All Properties ({allReviews?.length || 0})
                    </Button>
                    {reviewsByProperty.map((property) => (
                      <Button
                        key={property.id}
                        variant={selectedProperty === property.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedProperty(property.id)}
                      >
                        {property.title} ({property.reviewCount})
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">
                    Sort by
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 border border-input rounded-md bg-background text-foreground"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="highest">Highest Rating</option>
                    <option value="lowest">Lowest Rating</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        {selectedProperty === "All" ? (
          // Show reviews grouped by property with stacking effect
          <section className="py-16">
            <div className="container mx-auto px-4 lg:px-8">
              {reviewsByProperty.map((property) => (
                <PropertyReviewsSection 
                  key={property.id} 
                  property={property} 
                  allReviews={property.reviews}
                  setSelectedProperty={setSelectedProperty}
                />
              ))}
            </div>
          </section>
        ) : (
          // Show filtered reviews (existing code)
          <section className="py-16">
            <div className="container mx-auto px-4 lg:px-8">
              {sortedReviews.length > 0 ? (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-serif font-bold text-primary mb-2">
                      {selectedProperty === "All" 
                        ? "All Reviews" 
                        : `${reviewsByProperty.find(p => p.id === selectedProperty)?.title} Reviews`
                      }
                    </h2>
                    <p className="text-muted-foreground">
                      {sortedReviews.length} review{sortedReviews.length === 1 ? '' : 's'} found
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sortedReviews.map((review, index) => (
                      <Card 
                        key={review.id}
                        className="card-luxury h-full animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <CardContent className="p-6 h-full flex flex-col">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                              {[...Array(parseInt(review.rating) || 5)].map((_, i) => (
                                <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {review.source}
                            </Badge>
                          </div>
                          
                          <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
                            "{review.review}"
                          </p>
                          
                          <div className="border-t border-border pt-4">
                            <p className="font-semibold text-primary">
                              {review.reviewer}
                            </p>
                            <div className="flex items-center text-sm text-muted-foreground space-x-2 mb-2">
                              <span>{new Date(review.review_date).toLocaleDateString('en-AU', {
                                year: 'numeric',
                                month: 'long'
                              })}</span>
                            </div>
                            {selectedProperty === "All" && (
                              <div className="text-sm text-primary">
                                {review.property_name}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                    No reviews found
                  </h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    Try selecting a different property or check back later for new reviews.
                  </p>
                  <Button onClick={() => setSelectedProperty("All")}>
                    View All Reviews
                  </Button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-serif font-bold text-primary mb-4">
                Ready to Create Your Own Story?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join our family of happy guests and discover why Mallacoota is the perfect destination for your next getaway.
              </p>
              <Link to="/properties">
                <Button size="lg">
                  Book Your Stay
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Testimonials;