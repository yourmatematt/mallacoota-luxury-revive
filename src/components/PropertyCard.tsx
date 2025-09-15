import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Anchor, PawPrint, Star, Bed, Bath, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Property } from "@/hooks/useProperties";
import PropertyImageCarousel from "@/components/PropertyImageCarousel";
import { usePropertyCardImages } from "@/hooks/usePropertyImages";
import { supabase } from "@/integrations/supabase/client";

// Keep stock images as fallbacks
import propertyInterior1 from "@/assets/property-interior-1.jpg";
import propertyInterior2 from "@/assets/property-interior-2.jpg";
import propertyInterior3 from "@/assets/property-interior-3.jpg";

const PropertyCard = ({ property }: { property: Property }) => {
  // Get real images from Supabase
  const { data: realImages, isLoading } = usePropertyCardImages(property.image_folder);
  
  // Stock images as fallback
  const stockImages = [propertyInterior1, propertyInterior2, propertyInterior3];
  
  // Use real images if available, otherwise fall back to stock images
  const displayImages = realImages && realImages.length > 0 
    ? realImages.map(img => img.url)
    : stockImages;


  return (
    <Card className="card-boutique overflow-hidden group fade-in-up">
      <div className="relative">
        {isLoading ? (
          <div className="h-48 sm:h-64 bg-gray-200 animate-pulse flex items-center justify-center">
            <span className="text-gray-500">Loading images...</span>
          </div>
        ) : (
          <PropertyImageCarousel
            images={displayImages}
            propertyId={property.property_id}
            propertyTitle={property.title || 'Property'}
          />
        )}
        
        {/* Mobile-first CTA overlay */}
        <div className="absolute top-4 right-4 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
          <Button 
            asChild 
            variant="accent" 
            size="sm" 
            rounded="full" 
            className="shadow-lg min-h-[48px] px-4"
          >
            <Link to={`/properties/${property.slug}`}>
              Book Now
            </Link>
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4 sm:p-6">
        {/* Mobile-optimized title section */}
        <div className="mb-4">
          <h3 className="text-lg sm:text-xl font-serif font-semibold mb-2 text-primary leading-tight">
            {property.title}
          </h3>
          {property.subtitle && (
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{property.subtitle}</p>
          )}
        </div>
        
        {/* Mobile-optimized property details - stack on small screens */}
        <div className="flex flex-wrap justify-between sm:grid sm:grid-cols-3 gap-2 sm:gap-4 mb-4 py-3 border-t border-b border-border/50">
          <div className="flex items-center space-x-2 sm:flex-col sm:items-center sm:space-x-0 sm:space-y-1 text-center min-w-[48px]">
            <Bed size={16} className="text-primary flex-shrink-0" />
            <div className="flex flex-col sm:contents">
              <span className="text-sm sm:text-base font-semibold text-primary">{property.bedrooms}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wide hidden sm:block">Bedrooms</span>
              <span className="text-xs text-muted-foreground sm:hidden">Beds</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:flex-col sm:items-center sm:space-x-0 sm:space-y-1 text-center min-w-[48px]">
            <Bath size={16} className="text-primary flex-shrink-0" />
            <div className="flex flex-col sm:contents">
              <span className="text-sm sm:text-base font-semibold text-primary">{property.bathrooms}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wide hidden sm:block">Bathrooms</span>
              <span className="text-xs text-muted-foreground sm:hidden">Baths</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:flex-col sm:items-center sm:space-x-0 sm:space-y-1 text-center min-w-[48px]">
            <Users size={16} className="text-primary flex-shrink-0" />
            <div className="flex flex-col sm:contents">
              <span className="text-sm sm:text-base font-semibold text-primary">{property.guests}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wide hidden sm:block">Guests</span>
              <span className="text-xs text-muted-foreground sm:hidden">Guests</span>
            </div>
          </div>
        </div>
        
        {/* Mobile-optimized amenities */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
          {property.pet_friendly && (
            <div className="flex items-center space-x-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              <PawPrint size={10} className="sm:hidden" />
              <PawPrint size={12} className="hidden sm:block" />
              <span className="hidden sm:inline">Pet Friendly</span>
              <span className="sm:hidden">Pet OK</span>
            </div>
          )}

          {property.boat_parking && (
            <div className="flex items-center space-x-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              <Anchor size={10} className="sm:hidden" />
              <Anchor size={12} className="hidden sm:block" />
              <span className="hidden sm:inline">Boat Parking</span>
              <span className="sm:hidden">Boat</span>
            </div>
          )}

          <div className="flex items-center space-x-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
            <Eye size={10} className="sm:hidden" />
            <Eye size={12} className="hidden sm:block" />
            <span className="hidden sm:inline">{property.view_type || 'Standard View'}</span>
            <span className="sm:hidden">{property.view_type?.split(' ')[0] || 'View'}</span>
          </div>
        </div>
        
        {/* Mobile-optimized CTA button */}
        <Button 
          asChild 
          variant="accent" 
          size="default" 
          rounded="full" 
          className="w-full min-h-[48px] text-sm sm:text-base font-medium"
        >
          <Link to={`/properties/${property.slug}`}>
            <span className="sm:hidden">Book Now</span>
            <span className="hidden sm:inline">Enquire Now</span>
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;