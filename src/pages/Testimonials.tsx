import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Filter, ChevronDown, Users, Calendar, Award, TrendingUp, ArrowUp } from "lucide-react";
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

interface PropertyWithReviews {
  id: string;
  title: string;
  slug: string;
  reviews: Review[];
  reviewCount: number;
  averageRating: number;
}

const StatCard = ({ icon: Icon, title, value, subtitle, delay = 0 }: {
  icon: any;
  title: string;
  value: string;
  subtitle?: string;
  delay?: number;
}) => (
  <Card 
   className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-all duration-500 animate-fade-in-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    <CardContent className="p-2 sm:p-4 lg:p-6 text-center">
      <div className="flex justify-center mb-1 sm:mb-3">
        <div className="p-1.5 sm:p-2 lg:p-3 bg-red-500/10 rounded-full">
          <Icon className="h-3 w-3 sm:h-4 sm:w-4 lg:h-6 lg:w-6 text-red-500" />
        </div>
      </div>
     <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-white mb-0.5 sm:mb-1">{value}</div>
<div className="text-xs sm:text-sm font-medium text-white/90 mb-0.5 sm:mb-1">{title}</div>
{subtitle && <div className="text-xs text-white/80 leading-tight">{subtitle}</div>}
    </CardContent>
  </Card>
);

const ReviewCard = ({ review, showPropertyName = false, index = 0, expandable = false }: {
  review: Review;
  showPropertyName?: boolean;
  index?: number;
  expandable?: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLong = review.review.length > 200;

  return (
    <Card 
      className="group bg-white hover:bg-gradient-to-br hover:from-white hover:to-primary/5 border border-gray-200 hover:border-primary/20 shadow-sm hover:shadow-xl transition-all duration-500 animate-fade-in-up overflow-hidden"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardContent className="p-6">
        {/* Header with rating and source */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 transition-colors duration-300 ${
                  i < parseInt(review.rating) 
                    ? 'fill-yellow-400 text-yellow-400' 
                    : 'text-gray-200'
                }`}
              />
            ))}
          </div>
          <Badge 
            variant="secondary" 
            className="text-xs bg-primary/10 text-primary border-primary/20 group-hover:bg-primary group-hover:text-white transition-colors duration-300"
          >
            {review.source}
          </Badge>
        </div>

        {/* Review text */}
        <div className="mb-6">
          <p className={`text-gray-700 leading-relaxed text-sm sm:text-base group-hover:text-gray-800 transition-colors duration-300 ${
            !expandable ? 'line-clamp-4' : 
            (isLong && !isExpanded) ? 'line-clamp-4' : ''
          }`}>
            "{review.review}"
          </p>
          {expandable && isLong && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary hover:text-primary/80 text-sm font-medium mt-2 transition-colors duration-300"
            >
              {isExpanded ? 'Show Less' : 'Read More'}
            </button>
          )}
        </div>

        {/* Footer with author info */}
        <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-white font-semibold text-sm group-hover:scale-110 transition-transform duration-300">
              {review.reviewer.charAt(0)}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-sm truncate">
              {review.reviewer}
            </p>
            <div className="flex items-center text-xs text-gray-500 space-x-2">
              <Calendar className="h-3 w-3" />
              <span>
                {new Date(review.review_date).toLocaleDateString('en-AU', {
                  year: 'numeric',
                  month: 'short'
                })}
              </span>
            </div>
            {showPropertyName && (
              <p className="text-xs text-primary font-medium mt-1 truncate">
                {review.property_name}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const PropertySection = ({ property, onViewAll }: {
  property: PropertyWithReviews;
  onViewAll: (propertyId: string) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayReviews = isExpanded ? property.reviews : property.reviews.slice(0, 3);

  return (
    <div id={`property-${property.id}`} className="mb-12 animate-fade-in-up">
      {/* Property header - Consistently rounded like properties.tsx */}
      <div className="sticky top-20 z-50 bg-gradient-to-r from-gray-800 to-gray-700 text-white p-4 sm:p-6 rounded-lg shadow-lg mb-8"
        style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold mb-2">
              {property.title}
            </h3>
            <div className="flex items-center space-x-4 text-white/90">
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{property.reviewCount} reviews</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                document.getElementById('filter-controls')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'center'
                });
              }}
              className="bg-white/20 border-white/30 text-white hover:bg-white hover:text-gray-800 transition-all duration-300"
            >
              <ArrowUp className="h-4 w-4 mr-2" />
              Back to Filters
            </Button>
            <Link to={`/properties/${property.slug}`}>
              <Button 
                variant="secondary" 
                size="sm"
                className="bg-white/20 border-white/30 text-white hover:bg-white hover:text-gray-800 transition-all duration-300"
              >
                View Property
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Reviews grid */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {displayReviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} expandable={true} />
          ))}
        </div>

        {/* Expand/collapse controls */}
        {property.reviews.length > 3 && (
          <div className="text-center mt-6">
            <Button
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="group hover:bg-primary hover:text-white transition-all duration-300"
            >
              <span>{isExpanded ? 'Show Less' : `View All ${property.reviewCount} Reviews`}</span>
              <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [searchParams] = useSearchParams();
  const [selectedProperty, setSelectedProperty] = useState<string>("All");
  const [dropdownSelection, setDropdownSelection] = useState<string>("All");
  const [isLoaded, setIsLoaded] = useState(false);

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

  // Calculate statistics
  const totalReviews = allReviews?.length || 0;
  const averageRating = allReviews?.length 
    ? (allReviews.reduce((sum, review) => sum + parseInt(review.rating), 0) / allReviews.length).toFixed(1)
    : "0";
  const fiveStarReviews = allReviews?.filter(review => parseInt(review.rating) === 5).length || 0;
  const fiveStarPercentage = totalReviews > 0 ? Math.round((fiveStarReviews / totalReviews) * 100) : 0;

  // Group reviews by property
  const reviewsByProperty: PropertyWithReviews[] = (properties || []).map(property => {
    const propertyReviews = (allReviews || []).filter(review => review.property_id === property.id);
    const avgRating = propertyReviews.length 
      ? propertyReviews.reduce((sum, review) => sum + parseInt(review.rating), 0) / propertyReviews.length
      : 0;
    
    return {
      ...property,
      reviews: propertyReviews,
      reviewCount: propertyReviews.length,
      averageRating: avgRating
    };
  }).filter(property => property.reviewCount > 0);

  // Filter reviews based on selected property
  const filteredReviews = selectedProperty === "All" 
    ? allReviews || []
    : (allReviews || []).filter(review => review.property_id === selectedProperty);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const propertyParam = searchParams.get("property");
    if (propertyParam) {
      setSelectedProperty(propertyParam);
      setDropdownSelection(propertyParam);
    }
  }, [searchParams]);

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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section id="hero-section" className="relative min-h-[70vh] sm:min-h-[80vh] lg:h-[calc(100vh-5rem)] flex items-center bg-gradient-to-br from-primary via-primary/90 to-primary/80 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/testimonials-hero-background.jpg')] bg-cover bg-center opacity-20"></div>
          
          <div className="relative z-10 container mx-auto px-4 lg:px-8 py-16 sm:py-20 lg:pt-32">
            {/* Hero content */}
            <div className={`text-center mb-6 sm:mb-8 lg:mb-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-2 sm:mb-3 lg:mb-4 xl:mb-6 leading-tight">
                Guest Stories
              </h1>
              <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed px-4">
                Real experiences from families who've made our properties their home away from home
              </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 xl:gap-6 mb-4 sm:mb-6 lg:mb-8">
              <StatCard 
                icon={Users}
                title="Total Reviews"
                value="499+"
                delay={200}
              />
              <StatCard 
                icon={Star}
                title="Average Star Rating"
                value="4.8+"
                delay={300}
              />
              <StatCard 
                icon={Award}
                title="5-Star Reviews"
                value="499+"
                delay={400}
              />
              <StatCard 
                icon={TrendingUp}
                title="5-Star Review Rate"
                value="96%"
                delay={500}
              />
            </div>

            {/* Filter Controls */}
            <div id="filter-controls" className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 sm:p-4 lg:p-6 transition-all duration-1000 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex items-center justify-center mb-3 sm:mb-4">
                <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-white mr-2" />
                <span className="text-white font-medium text-sm sm:text-base">Filter by Property</span>
              </div>
              
              {/* Mobile Dropdown Version */}
              <div className="block sm:hidden space-y-3">
                {/* Dropdown */}
                <select
                  value={dropdownSelection}
                  onChange={(e) => setDropdownSelection(e.target.value)}
                  className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-white/30 rounded-lg text-primary font-medium text-sm focus:outline-none focus:ring-2 focus:ring-white/50 text-center"
                >
                  <option value="All">All Properties ({totalReviews} reviews)</option>
                  {reviewsByProperty.map((property) => (
                    <option key={property.id} value={property.id}>
                      {property.title} ({property.reviewCount} reviews)
                    </option>
                  ))}
                </select>
                
                {/* View Button - shows when dropdown selection differs from current filter */}
                {dropdownSelection !== selectedProperty && (
                  <Button
                    onClick={() => {
                      setSelectedProperty(dropdownSelection);
                      // Scroll to reviews section
                      setTimeout(() => {
                        const element = document.getElementById('reviews-section');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }, 100);
                    }}
                    className="w-full bg-white text-primary hover:bg-white/90 font-semibold py-3 px-4 rounded-lg shadow-lg transition-all duration-300 hover:scale-[1.02]"
                  >
                    {dropdownSelection === "All" ? (
                      `View ${totalReviews} Reviews`
                    ) : (
                      `View ${reviewsByProperty.find(p => p.id === dropdownSelection)?.reviewCount || 0} ${reviewsByProperty.find(p => p.id === dropdownSelection)?.title} Reviews`
                    )}
                  </Button>
                )}
                
                {/* Current selection indicator */}
                <div className="text-center">
                  <span className="text-white/80 text-xs">
                    Currently viewing: {selectedProperty === "All" ? "All Properties" : reviewsByProperty.find(p => p.id === selectedProperty)?.title}
                  </span>
                </div>
              </div>

              {/* Desktop Button Version (hidden on mobile) */}
              <div className="hidden sm:flex flex-wrap justify-center gap-2 sm:gap-3">
                <Button
                  variant={selectedProperty === "All" ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSelectedProperty("All");
                    setDropdownSelection("All"); // Keep dropdown in sync
                    setTimeout(() => {
                      const element = document.getElementById('reviews-section');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  }}
                  className={`transition-all duration-300 text-xs sm:text-sm px-3 sm:px-4 py-2 whitespace-nowrap ${
                    selectedProperty === "All" 
                      ? "bg-white text-primary shadow-lg" 
                      : "bg-white/20 border-white/30 text-white hover:bg-white hover:text-primary"
                  }`}
                >
                  All Properties ({totalReviews})
                </Button>
                {reviewsByProperty.map((property) => (
                  <Button
                    key={property.id}
                    variant={selectedProperty === property.id ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => {
                      setSelectedProperty(property.id);
                      setDropdownSelection(property.id); // Keep dropdown in sync
                      setTimeout(() => {
                        const element = document.getElementById('reviews-section');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 100);
                    }}
                    className={`transition-all duration-300 text-xs sm:text-sm px-3 sm:px-4 py-2 whitespace-nowrap min-w-0 ${
                      selectedProperty === property.id
                        ? "bg-white text-primary shadow-lg"
                        : "bg-white/20 border-white/30 text-white hover:bg-white hover:text-primary"
                    }`}
                  >
                    <span className="truncate max-w-[120px] sm:max-w-none">
                      {property.title}
                    </span>
                    <span className="ml-1 flex-shrink-0">({property.reviewCount})</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Content */}
        <section id="reviews-section" className="py-12 sm:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            {selectedProperty === "All" ? (
              // Show grouped by property
              <div>
                {reviewsByProperty.map((property) => (
                  <PropertySection 
                    key={property.id} 
                    property={property} 
                    onViewAll={setSelectedProperty}
                  />
                ))}
              </div>
            ) : (
              // Show individual property reviews with sticky header
              <div>
                {/* Sticky header for individual property - Consistently rounded like properties.tsx */}
                <div className="sticky top-20 z-50 bg-gradient-to-r from-gray-800 to-gray-700 text-white p-4 sm:p-6 rounded-lg shadow-lg mb-8"
                  style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-serif font-bold mb-2">
                        {reviewsByProperty.find(p => p.id === selectedProperty)?.title}
                      </h2>
                      <div className="flex items-center space-x-4 text-white/90">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{filteredReviews.length} reviews</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Reset dropdown to current selection and scroll to filters
                          setDropdownSelection(selectedProperty);
                          document.getElementById('filter-controls')?.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'center'
                          });
                        }}
                        className="bg-white/20 border-white/30 text-white hover:bg-white hover:text-gray-800 transition-all duration-300"
                      >
                        <ArrowUp className="h-4 w-4 mr-2" />
                        Back to Filters
                      </Button>
                      <Link to={`/properties/${reviewsByProperty.find(p => p.id === selectedProperty)?.slug}`}>
                        <Button 
                          variant="secondary" 
                          size="sm"
                          className="bg-white/20 border-white/30 text-white hover:bg-white hover:text-gray-800 transition-all duration-300"
                        >
                          View Property
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {filteredReviews.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {filteredReviews.map((review, index) => (
                      <ReviewCard 
                        key={review.id} 
                        review={review} 
                        index={index}
                        expandable={true}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="max-w-md mx-auto">
                      <h3 className="text-xl font-semibold text-primary mb-4">
                        No reviews found
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Try selecting a different property or check back later for new reviews.
                      </p>
                      <Button onClick={() => setSelectedProperty("All")}>
                        View All Reviews
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA */}
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Uncover Mallacoota's best-kept secrets
          </h2>
          
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
            From pristine beaches to local hotspots - get the insider's guide.
          </p>
          
          {/* CTA Button */}
<Button asChild variant="accent" size="default" rounded="full">
              <Link to="/discover-mallacoota">
              Explore Local Guides
            </Link>
          </Button>
        </div>
      </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Testimonials;