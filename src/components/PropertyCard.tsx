import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Car, PawPrint, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Property } from "@/hooks/useProperties";
import { usePropertyImages } from "@/hooks/usePropertyImages";

interface PropertyCardProps {
  property: Property;
  onMouseEnter: (propertyId: string, totalImages: number) => void;
  onMouseLeave: (propertyId: string) => void;
  currentImageIndex: { [key: string]: number };
}

const PropertyCard = ({ property, onMouseEnter, onMouseLeave, currentImageIndex }: PropertyCardProps) => {
  const { data: images } = usePropertyImages(property.image_folder);
  const currentImage = currentImageIndex[property.id] || 0;
  const displayImages = images || [];

  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onMouseEnter={() => onMouseEnter(property.id, displayImages.length)}
      onMouseLeave={() => onMouseLeave(property.id)}
    >
      <div className="relative h-64">
        {displayImages.length > 0 ? (
          <img
            src={displayImages[currentImage]?.url}
            alt={property.title}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">No image available</span>
          </div>
        )}
        
        {property.airbnb_rating && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{property.airbnb_rating}</span>
          </div>
        )}
        
        {displayImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {displayImages.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImage ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
        {property.subtitle && (
          <p className="text-sm text-muted-foreground mb-3">{property.subtitle}</p>
        )}
        
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{property.guests} guests</span>
          </div>
          {property.pet_friendly && (
            <div className="flex items-center gap-1">
              <PawPrint className="h-4 w-4" />
              <span>Pet friendly</span>
            </div>
          )}
          {property.boat_parking && (
            <div className="flex items-center gap-1">
              <Car className="h-4 w-4" />
              <span>Boat parking</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="text-xs">
            {property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <Link to={`/properties/${property.slug}`} className="flex-1">
            <Button size="sm" className="w-full">View Details</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;