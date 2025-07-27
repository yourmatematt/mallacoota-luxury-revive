import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Users, Wifi, PawPrint, Car, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useProperties } from "@/hooks/useProperties";
import PropertyImageCarousel from "@/components/PropertyImageCarousel";
import PropertyFilters from "@/components/PropertyFilters";
import propertyInterior1 from "@/assets/property-interior-1.jpg";
import propertyInterior2 from "@/assets/property-interior-2.jpg";
import propertyInterior3 from "@/assets/property-interior-3.jpg";

const PropertyGrid = () => {
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

  // Stock images for carousel
  const stockImages = [propertyInterior1, propertyInterior2, propertyInterior3];

  if (error) {
    return (
      <section id="properties" className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-muted-foreground">Unable to load properties at this time.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="properties" className="section-spacing bg-warm-neutral/50">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20 fade-in-up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary mb-6">
            Where Comfort Meets Adventure
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Premium vacation rentals perfectly positioned for your Mallacoota discovery.
          </p>
        </div>

        {/* Property Filters */}
        <PropertyFilters onFiltersChange={setFilters} />

        {/* Property Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden rounded-2xl">
                <div className="h-72 bg-muted animate-pulse"></div>
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className="h-6 bg-muted rounded animate-pulse"></div>
                    <div className="h-4 bg-muted rounded animate-pulse"></div>
                    <div className="h-4 bg-muted rounded animate-pulse w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {properties?.slice(0, 6).map((property, index) => (
              <Card 
                key={property.property_id} 
                className="card-boutique overflow-hidden group fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <PropertyImageCarousel
                    images={stockImages}
                    propertyId={property.property_id}
                    propertyTitle={property.title || 'Property'}
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    {property.airbnb_rating && (
                      <Badge className="bg-white/95 text-primary flex items-center gap-1 shadow-lg backdrop-blur-sm">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {property.airbnb_rating}
                      </Badge>
                    )}
                    <Badge className="bg-boutique-accent/90 text-white shadow-lg backdrop-blur-sm">
                      AVAILABLE
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-serif font-semibold mb-2 text-primary leading-tight">
                      {property.title}
                    </h3>
                    {property.subtitle && (
                      <p className="text-sm text-muted-foreground leading-relaxed">{property.subtitle}</p>
                    )}
                  </div>
                  
                  {/* Property Details with enhanced spacing */}
                  <div className="grid grid-cols-3 gap-4 mb-4 py-3 border-t border-b border-border/50">
                    <div className="flex flex-col items-center space-y-1 text-center">
                      <Bed size={18} className="text-primary" />
                      <span className="text-base font-semibold text-primary">{property.bedrooms}</span>
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">Bedrooms</span>
                    </div>
                    <div className="flex flex-col items-center space-y-1 text-center">
                      <Bath size={18} className="text-primary" />
                      <span className="text-base font-semibold text-primary">{property.bathrooms}</span>
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">Bathrooms</span>
                    </div>
                    <div className="flex flex-col items-center space-y-1 text-center">
                      <Users size={18} className="text-primary" />
                      <span className="text-base font-semibold text-primary">{property.guests}</span>
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">Guests</span>
                    </div>
                  </div>
                  
                  {/* Amenities with better spacing */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {property.pet_friendly && (
                      <div className="flex items-center space-x-1 text-xs bg-success/10 text-success px-2 py-1 rounded-full">
                        <PawPrint size={12} />
                        <span>Pet Friendly</span>
                      </div>
                    )}
                    {property.boat_parking && (
                      <div className="flex items-center space-x-1 text-xs bg-ocean-blue/10 text-ocean-blue px-2 py-1 rounded-full">
                        <Car size={12} />
                        <span>Boat Parking</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      <Wifi size={12} />
                      <span>WiFi</span>
                    </div>
                  </div>
                  
                  <Button asChild className="w-full py-3 text-sm rounded-full font-semibold tracking-wide hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <Link to={`/properties/${property.slug}`}>
                      View Details
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Enhanced View All Properties Link */}
        <div className="text-center mt-20 fade-in-up">
          <Button asChild variant="outline" size="lg" className="px-12 py-6 text-lg rounded-full border-2 border-primary hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-xl">
            <Link to="/properties">
              View All Properties
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PropertyGrid;