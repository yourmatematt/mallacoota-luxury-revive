import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Car, Heart, Bed, Bath } from "lucide-react";
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
  });

  const { data: properties, isLoading, error } = useProperties({
    guests: filters.guests,
    petFriendly: filters.petFriendly || undefined,
    boatParking: filters.boatParking || undefined,
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
        {/* Hero Section with Animations */}
        <section className="relative h-[70vh] min-h-[600px] overflow-hidden">
          {/* Background Image with scale effect */}
          <div 
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-out ${
              isLoaded ? 'scale-100' : 'scale-105'
            }`}
            style={{ backgroundImage: 'url("/images/properties-hero-background.jpg")' }}
          />
          
          {/* Enhanced Overlay */}
          <div className="hero-overlay" />
          
          {/* Content with staggered animations */}
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center text-white px-6 md:px-4 max-w-4xl mx-auto">
              {/* Main Title */}
              <h1 className={`text-4xl md:text-6xl font-serif font-bold mb-6 transition-all duration-800 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                Our Properties
              </h1>
              
              {/* Subtitle */}
              <p className={`text-xl md:text-2xl font-light mb-8 max-w-3xl mx-auto leading-relaxed transition-all duration-800 delay-400 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                Discover your perfect coastal retreat in Mallacoota's most stunning locations
              </p>
              
              {/* CTA Button */}
              <div className={`transition-all duration-800 delay-600 ${
                isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
              }`}>
                <Button 
                  asChild
                  size="lg" 
                  className="bg-white/95 backdrop-blur-sm text-primary hover:bg-white hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold shadow-2xl transition-all duration-300"
                >
                  <Link to="#properties-grid">
                    Explore Properties
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-12 bg-gradient-to-b from-background to-background/50">
          <div className="container mx-auto px-4 lg:px-8">
            <Card className={`card-luxury transition-all duration-800 delay-800 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-serif font-bold text-primary mb-4">
                    Find Your Perfect Stay
                  </h2>
                  <p className="text-muted-foreground">
                    Filter properties by your preferences to find the ideal accommodation
                  </p>
                </div>

                {/* Filters */}
                <PropertyFilters 
                  onFiltersChange={setFilters}
                  isLoading={isLoading}
                />
                
                {/* Results Count */}
                <div className="text-center mt-8">
                  <p className="text-lg text-muted-foreground">
                    {isLoading ? "Loading properties..." : `${properties?.length || 0} propert${properties?.length === 1 ? 'y' : 'ies'} available`}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Properties Grid */}
        <section id="properties-grid" className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 aspect-video rounded-t-lg"></div>
                    <div className="bg-white p-6 rounded-b-lg border border-t-0">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : properties && properties.length > 0 ? (
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
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-4">No properties found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters to see more options.
                </p>
                <Button onClick={() => setFilters({ guests: 2, petFriendly: false, boatParking: false })}>
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Properties;