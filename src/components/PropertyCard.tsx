import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Car, PawPrint, Star, Bed, Bath, Wifi } from "lucide-react";
import { Link } from "react-router-dom";
import { Property } from "@/hooks/useProperties";
import PropertyImageCarousel from "@/components/PropertyImageCarousel";
import propertyInterior1 from "@/assets/property-interior-1.jpg";
import propertyInterior2 from "@/assets/property-interior-2.jpg";
import propertyInterior3 from "@/assets/property-interior-3.jpg";


const PropertyCard = ({ property }: { property: Property }) => {
  // Stock images for carousel
  const stockImages = [propertyInterior1, propertyInterior2, propertyInterior3];

  return (
    <Card className="card-boutique overflow-hidden group fade-in-up">
      <div className="relative">
        <PropertyImageCarousel
          images={stockImages}
          propertyId={property.property_id}
          propertyTitle={property.title || 'Property'}
        />
        <div className="absolute top-4 right-4">
          {property.airbnb_rating && (
            <Badge className="bg-white/95 text-primary flex items-center gap-1 shadow-lg backdrop-blur-sm">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              {property.airbnb_rating}
            </Badge>
          )}
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
  );
};

export default PropertyCard;