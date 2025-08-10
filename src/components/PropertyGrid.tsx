import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Users, Wifi, PawPrint, Car, Star, Eye } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useProperties } from "@/hooks/useProperties";
import PropertyImageCarousel from "@/components/PropertyImageCarousel";
import PropertyFilters from "@/components/PropertyFilters";
import { usePropertyCardImages } from "@/hooks/usePropertyImages";
// Keep stock images as fallbacks
import propertyInterior1 from "@/assets/property-interior-1.jpg";
import propertyInterior2 from "@/assets/property-interior-2.jpg";
import propertyInterior3 from "@/assets/property-interior-3.jpg";

// Individual Property Card Component for Home Page
const HomePropertyCard = ({ property, index }: { property: any; index: number }) => {
  // Get real images from Supabase
  const { data: realImages, isLoading } = usePropertyCardImages(property.image_folder);
  
  // Stock images as fallback
  const stockImages = [propertyInterior1, propertyInterior2, propertyInterior3];
  
  // Use real images if available, otherwise fall back to stock images
  const displayImages = realImages && realImages.length > 0 
    ? realImages.map(img => img.url)
    : stockImages;

  return (
  <Card 
    className="card-boutique overflow-hidden group fade-in-up"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <div className="relative">
      {isLoading ? (
        <div className="h-72 bg-gray-200 animate-pulse flex items-center justify-center">
          <span className="text-gray-500">Loading images...</span>
        </div>
      ) : (
        <PropertyImageCarousel
          images={displayImages}
          propertyId={property.property_id}
          propertyTitle={property.title || 'Property'}
        />
      )}
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
              
      {/* Property Details with improved responsive layout */}
      <div className="flex justify-between items-center mb-4 py-3 border-t border-b border-border/50 gap-2">
        <div className="flex flex-col items-center space-y-1 text-center min-w-0 flex-1">
          <Bed size={16} className="text-primary flex-shrink-0" />
          <span className="text-sm font-semibold text-primary">{property.bedrooms}</span>
          <span className="text-xs text-muted-foreground uppercase tracking-wide truncate">Beds</span>
        </div>
        <div className="flex flex-col items-center space-y-1 text-center min-w-0 flex-1">
          <Bath size={16} className="text-primary flex-shrink-0" />
          <span className="text-sm font-semibold text-primary">{property.bathrooms}</span>
          <span className="text-xs text-muted-foreground uppercase tracking-wide truncate">Baths</span>
        </div>
        <div className="flex flex-col items-center space-y-1 text-center min-w-0 flex-1">
          <Users size={16} className="text-primary flex-shrink-0" />
          <span className="text-sm font-semibold text-primary">{property.guests}</span>
          <span className="text-xs text-muted-foreground uppercase tracking-wide truncate">Guests</span>
        </div>
      </div>
              
      {/* Amenities with uniform styling */}
      <div className="flex flex-wrap gap-2 mb-6">
        {/* Pet Friendly - only show if true */}
        {property.pet_friendly && (
          <div className="flex items-center space-x-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
            <PawPrint size={12} />
            <span>Pet Friendly</span>
          </div>
        )}

        {/* Boat Parking - only show if true */}
        {property.boat_parking && (
          <div className="flex items-center space-x-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
            <Car size={12} />
            <span>Boat Parking</span>
          </div>
        )}

        {/* View Type - always show */}
        <div className="flex items-center space-x-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
          <Eye size={12} />
          <span>{property.view_type || 'Standard View'}</span>
        </div>
      </div>
              
      <Button asChild variant="secondary" size="default" rounded="full" className="w-full">
        <Link to={`/properties/${property.slug}`}>
          View Details
        </Link>
      </Button>
    </CardContent>
  </Card>
);
};

const PropertyGrid = () => {
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
        <div className="mb-12">
          <PropertyFilters onFiltersChange={setFilters} />
        </div>

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
              <HomePropertyCard 
                key={property.property_id} 
                property={property} 
                index={index}
              />
            ))}
          </div>
        )}

        {/* Enhanced View All Properties Link */}
        <div className="text-center mt-20 fade-in-up">
          <Button asChild variant="accent" size="lg" rounded="full" className="px-12 py-6 text-lg">
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