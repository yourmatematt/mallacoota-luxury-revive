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

  // DEBUG: Add this temporarily to see what's happening
  console.log('=== DEBUG INFO ===');
  console.log('Property image folder:', property.image_folder);
  console.log('Real images:', realImages);
  console.log('IsLoading:', isLoading);
  console.log('Display images:', displayImages);

  // NEW TEST - Check public URL access
  React.useEffect(() => {
    const testPublicAccess = async () => {
      console.log('=== PUBLIC URL TEST ===');
      
      // Test if we can access a public URL directly
      const { data: urlData } = supabase.storage
        .from('hammond-properties')
        .getPublicUrl('27-mirrabooka-rd/image_1.jpg');
      
      console.log('Generated public URL:', urlData.publicUrl);
      
      // Test if the URL actually works
      try {
        const response = await fetch(urlData.publicUrl);
        console.log('URL fetch status:', response.status);
        console.log('URL fetch ok:', response.ok);
      } catch (err) {
        console.log('URL fetch failed:', err);
      }
      
      // Also test the list API one more time
      const { data: listData, error: listError } = await supabase.storage
        .from('hammond-properties')
        .list('27-mirrabooka-rd');
      
      console.log('List API - data:', listData);
      console.log('List API - error:', listError);
    };
    
    testPublicAccess();
  }, []);

  return (
    <Card className="card-boutique overflow-hidden group fade-in-up">
      <div className="relative">
        {isLoading ? (
          <div className="h-64 bg-gray-200 animate-pulse flex items-center justify-center">
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
      <Anchor size={12} />
      <span>Boat Parking</span>
    </div>
  )}

  {/* View Type - always show */}
  <div className="flex items-center space-x-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
    <Eye size={12} />
    <span>{property.view_type || 'Standard View'}</span>
  </div>
</div>
        
        <Button asChild variant="accent" size="default" rounded="full" className="w-full">
          <Link to={`/properties/${property.slug}`}>
            View Details
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;