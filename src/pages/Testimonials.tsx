import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Filter } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Review {
  id: string;
  name: string;
  location: string;
  date: string;
  rating: number;
  text: string;
  propertyId: string;
  propertyName: string;
  verified: boolean;
}

interface Property {
  id: string;
  name: string;
  reviewCount: number;
}

const Testimonials = () => {
  const [searchParams] = useSearchParams();
  const [selectedProperty, setSelectedProperty] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("newest");

  // Mock data - will be replaced with CMS data
  const properties: Property[] = [
    { id: "1", name: "Oceanview Villa", reviewCount: 24 },
    { id: "2", name: "Coastal Cottage", reviewCount: 18 },
    { id: "3", name: "Waterfront Apartment", reviewCount: 31 },
    { id: "4", name: "Beach House Retreat", reviewCount: 15 },
    { id: "5", name: "Clifftop Hideaway", reviewCount: 22 }
  ];

  const allReviews: Review[] = [
    {
      id: "1",
      name: "Sarah & Mike Thompson",
      location: "Melbourne, VIC",
      date: "2023-11-28",
      rating: 5,
      text: "Absolutely incredible property! The ocean views are breathtaking and the house has everything you could possibly need. We've stayed in many vacation rentals, but this one sets a new standard. The attention to detail is remarkable, from the luxury linens to the fully equipped kitchen. We'll definitely be back!",
      propertyId: "1",
      propertyName: "Oceanview Villa",
      verified: true
    },
    {
      id: "2",
      name: "The Johnson Family",
      location: "Sydney, NSW",
      date: "2023-11-20",
      rating: 5,
      text: "Perfect family vacation spot! The kids loved the pool and beach access, while we adults appreciated the elegant design and peaceful atmosphere. The property management team was incredibly responsive and helpful. Mallacoota is a hidden gem, and this property showcases it perfectly.",
      propertyId: "1",
      propertyName: "Oceanview Villa",
      verified: true
    },
    {
      id: "3",
      name: "Emma Chen",
      location: "Brisbane, QLD",
      date: "2023-11-15",
      rating: 5,
      text: "The photos don't do this place justice! Waking up to those ocean views every morning was magical. The house is immaculately maintained and the location is perfect for exploring Mallacoota. Highly recommend for a romantic getaway or peaceful retreat.",
      propertyId: "1",
      propertyName: "Oceanview Villa",
      verified: true
    },
    {
      id: "4",
      name: "David & Louise Wilson",
      location: "Adelaide, SA",
      date: "2023-11-10",
      rating: 5,
      text: "What a charming cottage! The perfect size for our weekend getaway. Everything was spotlessly clean and the garden setting is so peaceful. Great location for walking to the beach and local cafes. We felt right at home immediately.",
      propertyId: "2",
      propertyName: "Coastal Cottage",
      verified: true
    },
    {
      id: "5",
      name: "Rebecca Martin",
      location: "Canberra, ACT",
      date: "2023-11-05",
      rating: 5,
      text: "Exceeded all expectations! The cottage has such character and charm, with modern amenities that made our stay comfortable. The outdoor BBQ area was perfect for evening meals. We loved the peaceful location while still being close to everything.",
      propertyId: "2",
      propertyName: "Coastal Cottage",
      verified: true
    },
    {
      id: "6",
      name: "Mark & Jennifer",
      location: "Perth, WA",
      date: "2023-10-28",
      rating: 5,
      text: "The waterfront views from this apartment are simply stunning! Modern, clean, and perfectly appointed. The location is ideal for exploring both the lake and ocean areas of Mallacoota. We'll definitely be returning for a longer stay next time.",
      propertyId: "3",
      propertyName: "Waterfront Apartment",
      verified: true
    },
    {
      id: "7",
      name: "The Anderson Family",
      location: "Hobart, TAS",
      date: "2023-10-20",
      rating: 5,
      text: "Amazing lakeside location! The apartment is beautifully designed with everything we needed for our family holiday. The kids loved watching the pelicans from the balcony. Excellent communication from the property team and seamless check-in process.",
      propertyId: "3",
      propertyName: "Waterfront Apartment",
      verified: true
    },
    {
      id: "8",
      name: "James Rodriguez",
      location: "Darwin, NT",
      date: "2023-10-15",
      rating: 5,
      text: "What a fantastic beach house! The direct beach access was a dream come true. Spacious, well-designed, and perfect for our group getaway. The outdoor shower and BBQ area were highlights. Mallacoota's natural beauty combined with this exceptional property made for an unforgettable holiday.",
      propertyId: "4",
      propertyName: "Beach House Retreat",
      verified: true
    }
  ];

  // Filter reviews based on selected property
  const filteredReviews = selectedProperty === "All" 
    ? allReviews 
    : allReviews.filter(review => review.propertyId === selectedProperty);

  // Sort reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
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
  const reviewsByProperty = properties.map(property => ({
    ...property,
    reviews: allReviews.filter(review => review.propertyId === property.id)
  }));

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
                      All Properties ({allReviews.length})
                    </Button>
                    {properties.map((property) => (
                      <Button
                        key={property.id}
                        variant={selectedProperty === property.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedProperty(property.id)}
                      >
                        {property.name} ({property.reviewCount})
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
          // Show reviews grouped by property
          <section className="py-16">
            <div className="container mx-auto px-4 lg:px-8">
              {reviewsByProperty.map((property) => (
                <div key={property.id} className="mb-16">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-serif font-bold text-primary mb-2">
                        {property.name}
                      </h2>
                      <p className="text-muted-foreground">
                        {property.reviews.length} review{property.reviews.length === 1 ? '' : 's'}
                      </p>
                    </div>
                    <Link to={`/properties/${property.id}`}>
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
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} size={16} className="fill-luxury-gold text-luxury-gold" />
                              ))}
                            </div>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                Verified Stay
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
                            "{review.text}"
                          </p>
                          
                          <div className="border-t border-border pt-4">
                            <p className="font-semibold text-primary">
                              {review.name}
                            </p>
                            <div className="flex items-center text-sm text-muted-foreground space-x-2">
                              <span>{review.location}</span>
                              <span>•</span>
                              <span>{new Date(review.date).toLocaleDateString('en-AU', {
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
                        View All {property.name} Reviews
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
                        : `${properties.find(p => p.id === selectedProperty)?.name} Reviews`
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
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} size={16} className="fill-luxury-gold text-luxury-gold" />
                              ))}
                            </div>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                Verified Stay
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
                            "{review.text}"
                          </p>
                          
                          <div className="border-t border-border pt-4">
                            <p className="font-semibold text-primary">
                              {review.name}
                            </p>
                            <div className="flex items-center text-sm text-muted-foreground space-x-2 mb-2">
                              <span>{review.location}</span>
                              <span>•</span>
                              <span>{new Date(review.date).toLocaleDateString('en-AU', {
                                year: 'numeric',
                                month: 'long'
                              })}</span>
                            </div>
                            {selectedProperty === "All" && (
                              <Link 
                                to={`/properties/${review.propertyId}`}
                                className="text-sm text-primary hover:underline"
                              >
                                {review.propertyName}
                              </Link>
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