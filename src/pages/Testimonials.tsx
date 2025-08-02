
import { useState, useEffect } from "react";
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

const Testimonials = () => {
  const [searchParams] = useSearchParams();
  const [selectedProperty, setSelectedProperty] = useState<string>("All");

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

  // Sort reviews by newest first (default)
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    return new Date(b.review_date).getTime() - new Date(a.review_date).getTime();
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
              <div className="flex justify-center">
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
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        {selectedProperty === "All" ? (
          // Show reviews grouped by property
          <section className="py-16">
            <div className="container mx-auto px-4 lg:px-8">
              {reviewsByProperty.map((property) => (
                <div key={property.id} className="mb-16">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-serif font-bold text-primary mb-2">
                        {property.title}
                      </h2>
                      <p className="text-muted-foreground">
                        {property.reviews.length} review{property.reviews.length === 1 ? '' : 's'}
                      </p>
                    </div>
                    <Link to={`/properties/${property.slug}`}>
                      <Button variant="outline">
                        View Property
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {property.reviews.slice(0, 6).map((review, index) => (
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
                  
                  {property.reviews.length > 6 && (
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
              ))}
            </div>
          </section>
        ) : (
          // Show filtered reviews
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
