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
import PageTransition from "@/components/PageTransition";

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

// CTA Section Component
const CTASection = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
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

const PropertyReviewsSection = ({ property, allReviews, setSelectedProperty }: PropertyReviewsSectionProps) => {
  // Only show up to 6 reviews
  const reviewsToShow = allReviews.slice(0, 6);

  return (
    <div className="mb-16">
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-sm py-4 mb-8 flex items-center justify-between border-b border-border/20">
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
      
      {/* Reviews Grid - Standard Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviewsToShow.map((review, index) => (
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
      <PageTransition>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto px-4 py-16 text-center">
            <div className="animate-pulse">Loading testimonials...</div>
          </div>
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
    {/* Hero Section with Background Image */}
    <section className="pt-20 py-16 relative overflow-hidden min-h-[600px]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/images/testimonials-hero-background.jpg")' }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 drop-shadow-lg">
            Guest Testimonials
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
            Real experiences from families who've made our properties their home away from home. Come as guests. Leave as family.
          </p>
        </div>

        {/* Filter Controls */}
              <div className="bg-white/95 backdrop-blur-sm p-6 rounded-lg border max-w-4xl mx-auto shadow-lg">
          <div className="flex flex-col space-y-6">
            <div>
              <label className="text-sm font-medium text-foreground mb-4 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filter by Property
              </label>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant={selectedProperty === "All" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedProperty("All")}
                  className="font-medium"
                >
                  All Properties ({allReviews?.length || 0})
                </Button>
                {reviewsByProperty.map((property) => (
                  <Button
                    key={property.id}
                    variant={selectedProperty === property.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedProperty(property.id)}
                    className="font-medium"
                  >
                    {property.title} ({property.reviewCount})
                  </Button>
                ))}
              </div>
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
          {/* CTA Section - Above Footer */}
          <CTASection />
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Testimonials;