import { useState } from "react";
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
import PageTransition from "@/components/PageTransition";

const Properties = () => {
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

  if (error) {
    return (
      <PageTransition>
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
              style={{ backgroundImage: 'url("/images/properties-hero-background.jpg")' }}
            >
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
            
            {/* Content */}
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 drop-shadow-lg">
                  Our Properties
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
                  Discover your perfect Mallacoota retreat from our collection of luxury vacation rentals
                </p>
              </div>

              {/* Filters */}
              <PropertyFilters 
                onFiltersChange={setFilters}
                isLoading={isLoading}
              />
              
              {/* Results Count */}
              <div className="text-center mt-8">
                <p className="text-lg text-white/90 drop-shadow-md">
                  {isLoading ? "Loading properties..." : `${properties?.length || 0} propert${properties?.length === 1 ? 'y' : 'ies'} found`}
                </p>
              </div>
            </div>
          </section>

          {/* Properties Grid */}
          <section className="py-16">
            <div className="container mx-auto px-4 lg:px-8">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="overflow-hidden">
                      <div className="h-64 bg-muted animate-pulse"></div>
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          <div className="h-6 bg-muted rounded animate-pulse"></div>
                          <div className="h-4 bg-muted rounded animate-pulse"></div>
                          <div className="h-4 bg-muted rounded animate-pulse w-2/3"></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : properties && properties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {properties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-xl text-muted-foreground">
                    No properties match your current filters. Try adjusting your search criteria.
                  </p>
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
                <Button asChild size="lg" className="bg-accent-red hover:bg-accent-red/90 text-white px-8 py-4 text-lg rounded-full shadow-strong hover:shadow-medium transition-all duration-300">
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
    </PageTransition>
  );
};

export default Properties;