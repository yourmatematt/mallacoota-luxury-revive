import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Dog, Car, Heart, Bed, Bath, Eye, Waves } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useProperties } from "@/hooks/useProperties";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters from "@/components/PropertyFilters";

const Properties = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [filters, setFilters] = useState({
    guests: 2,
    petFriendly: false,
    boatParking: false,
    waterViews: false,
  });

  const { data: properties, isLoading, error } = useProperties({
    guests: filters.guests,
    petFriendly: filters.petFriendly || undefined,
    boatParking: filters.boatParking || undefined,
    waterViews: filters.waterViews || undefined,
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const resetFilters = () => {
    setFilters({ guests: 2, petFriendly: false, boatParking: false, waterViews: false });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold mb-4">Error loading properties</h1>
            <p className="text-muted-foreground">Please try again later.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section with Animations - Mobile Optimized */}
        <section className="relative min-h-[70vh] sm:min-h-[80vh] lg:h-[calc(100vh-5rem)] overflow-hidden">
          <div 
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-out ${
              isLoaded ? 'scale-100' : 'scale-105'
            }`}
            style={{ backgroundImage: 'url("/images/properties-hero-background.jpg")' }}
          />
          
          {/* Enhanced Overlay */}
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Content with staggered animations */}
          <div className="relative z-10 h-full flex items-center justify-center py-16 sm:py-20">
            <div className="text-center text-white px-6 md:px-4 max-w-6xl mx-auto w-full">
              {/* Main Title */}
              <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 sm:mb-6 transition-all duration-800 delay-200 leading-tight ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                Stays with Hammond Properties
              </h1>
              
              {/* Subtitle */}
              <p className={`text-base sm:text-lg md:text-xl lg:text-2xl font-light mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed transition-all duration-800 delay-400 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                Discover your dream coastal escape in Mallacoota — from beachfront luxury to hidden retreats.
              </p>
              
              {/* Filter Controls with Animation - Mobile Optimized */}
              <div className={`max-w-6xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20 transition-all duration-800 delay-800 ${
                isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
              }`}>
                <div className="flex flex-col space-y-4 sm:space-y-6">
                  <div>
                    {/* Mobile-friendly header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
                      <div className="hidden sm:block flex-1"></div>
                      <h3 className="text-sm sm:text-base lg:text-lg font-medium text-white text-center leading-relaxed px-2">
                        Whether you're chasing ocean views, a family-friendly yard, or a quiet hideaway, find your perfect Mallacoota stay.
                      </h3>
                      <div className="flex justify-center sm:justify-end sm:flex-1">
                        {(filters.guests !== 2 || filters.petFriendly || filters.boatParking || filters.waterViews) && (
                          <Button 
                            onClick={resetFilters}
                            variant="outline"
                            size="sm"
                            className="bg-white/20 border-white/30 text-white sm:hover:bg-white/30 text-xs sm:text-sm px-3 py-2 transition-colors duration-200"
                          >
                            Reset Filters
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {/* Property Filters Component - Mobile Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                      {/* Guest Count */}
                      <div className="space-y-2 sm:space-y-3 col-span-2 lg:col-span-1">
                        <label className="text-xs sm:text-sm font-medium text-white flex items-center justify-center">
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          Guests
                        </label>
                        <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setFilters(prev => ({ ...prev, guests: Math.max(1, prev.guests - 1) }))}
                            className="h-8 w-8 sm:h-10 sm:w-10 p-0 bg-white/20 border-white/30 text-white sm:hover:bg-white/30 sm:hover:border-white/40 text-sm transition-colors duration-200"
                          >
                            -
                          </Button>
                          <span className="text-white font-medium w-6 sm:w-8 text-center text-sm sm:text-base">{filters.guests}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setFilters(prev => ({ ...prev, guests: prev.guests + 1 }))}
                            className="h-8 w-8 sm:h-10 sm:w-10 p-0 bg-white/20 border-white/30 text-white sm:hover:bg-white/30 sm:hover:border-white/40 text-sm transition-colors duration-200"
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      {/* Pet Friendly Toggle */}
                      <div className="space-y-2 sm:space-y-3">
                        <label className="text-xs sm:text-sm font-medium text-white text-center block">Pet Friendly</label>
                        <Button
                          variant={filters.petFriendly ? "default" : "outline"}
                          onClick={() => setFilters(prev => ({ ...prev, petFriendly: !prev.petFriendly }))}
                          className={`w-full justify-center text-xs sm:text-sm py-2 sm:py-3 transition-colors duration-200 ${
                            filters.petFriendly 
                              ? "bg-black/60 text-white border-black/70 sm:hover:bg-white/20 sm:hover:border-white/30" 
                              : "bg-white/20 border-white/30 text-white sm:hover:bg-black/60 sm:hover:text-white sm:hover:border-black/70"
                          }`}
                        >
                          <Dog className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          {filters.petFriendly ? "Yes" : "Any"}
                        </Button>
                      </div>

                      {/* Boat Parking Toggle */}
                      <div className="space-y-2 sm:space-y-3">
                        <label className="text-xs sm:text-sm font-medium text-white text-center block">Boat Parking</label>
                        <Button
                          variant={filters.boatParking ? "default" : "outline"}
                          onClick={() => setFilters(prev => ({ ...prev, boatParking: !prev.boatParking }))}
                          className={`w-full justify-center text-xs sm:text-sm py-2 sm:py-3 transition-colors duration-200 ${
                            filters.boatParking 
                              ? "bg-black/60 text-white border-black/70 sm:hover:bg-white/20 sm:hover:border-white/30" 
                              : "bg-white/20 border-white/30 text-white sm:hover:bg-black/60 sm:hover:text-white sm:hover:border-black/70"
                          }`}
                        >
                          <Car className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          {filters.boatParking ? "Yes" : "Any"}
                        </Button>
                      </div>

                      {/* Water Views Toggle */}
                      <div className="space-y-2 sm:space-y-3">
                        <label className="text-xs sm:text-sm font-medium text-white text-center block">Water Views</label>
                        <Button
                          variant={filters.waterViews ? "default" : "outline"}
                          onClick={() => setFilters(prev => ({ ...prev, waterViews: !prev.waterViews }))}
                          className={`w-full justify-center text-xs sm:text-sm py-2 sm:py-3 transition-colors duration-200 ${
                            filters.waterViews 
                              ? "bg-black/60 text-white border-black/70 sm:hover:bg-white/20 sm:hover:border-white/30" 
                              : "bg-white/20 border-white/30 text-white sm:hover:bg-black/60 sm:hover:text-white sm:hover:border-black/70"
                          }`}
                        >
                          <Waves className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          {filters.waterViews ? "Yes" : "Any"}
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <Button
                      onClick={() => {
                        document.getElementById('properties-grid')?.scrollIntoView({ 
                          behavior: 'smooth',
                          block: 'start'
                        });
                      }}
                      className="w-full sm:w-auto bg-accent-red hover:bg-accent-red/90 text-white px-6 sm:px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
                      disabled={isLoading}
                    >
                      {isLoading 
                        ? "Loading properties..." 
                        : `View ${properties?.length || 0} Stays`
                      }
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Properties Grid */}
        <section id="properties-grid" className="section-primary py-16">
          <div className="container mx-auto px-4 lg:px-8">
            
            {/* Sticky Header - Always Visible - Fixed z-index */}
            <div className="sticky top-20 z-30 bg-gradient-to-r from-gray-800 to-gray-700 text-white p-4 sm:p-6 rounded-lg shadow-lg mb-8"
              style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold mb-2">
                    {(filters.guests !== 2 || filters.petFriendly || filters.boatParking || filters.waterViews) 
                      ? "Filtered Properties" 
                      : "All Properties"
                    }
                  </h2>
                  <div className="flex items-center space-x-4 text-white/90 text-sm">
                    {filters.guests !== 2 && (
                      <span>{filters.guests} guests</span>
                    )}
                    {filters.petFriendly && (
                      <span>Pet friendly</span>
                    )}
                    {filters.boatParking && (
                      <span>Boat parking</span>
                    )}
                    {filters.waterViews && (
                      <span>Water views</span>
                    )}
                    <span>• {properties?.length || 0} properties found</span>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // Scroll to filter controls in hero
                      const element = document.querySelector('.bg-white\\/10.backdrop-blur-sm');
                      if (element) {
                        element.scrollIntoView({ 
                          behavior: 'smooth',
                          block: 'center'
                        });
                      }
                    }}
                    className="bg-white/20 border-white/30 text-white hover:bg-white hover:text-gray-800 transition-all duration-300"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Back to Filters
                  </Button>
                  {(filters.guests !== 2 || filters.petFriendly || filters.boatParking || filters.waterViews) && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={resetFilters}
                      className="bg-white/20 border-white/30 text-white hover:bg-white hover:text-gray-800 transition-all duration-300"
                    >
                      Clear Filters
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

            {/* Properties Grid */}
            {!isLoading && properties && properties.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.map((property, index) => (
                  <div 
                    key={property.id}
                    className={`transition-all duration-800 ${
                      isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ animationDelay: `${1000 + index * 100}ms` }}
                  >
                    <PropertyCard property={property} />
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {!isLoading && properties?.length === 0 && (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <h3 className="text-xl font-semibold text-primary mb-4">
                    No properties found
                  </h3>
                  <p className="text-muted-foreground mb-8">
                    Try adjusting your filters to see more options.
                  </p>
                  <Button onClick={resetFilters} size="lg">
                    Reset Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Uncover Mallacoota's best-kept secrets
              </h2>
              
              <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
                From pristine beaches to local hotspots - get the insider's guide.
              </p>
              
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

export default Properties;