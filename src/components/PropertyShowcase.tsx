import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Bed, Bath, Car, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useRandomProperties } from "@/hooks/useProperties";
import { usePropertyCardImages } from "@/hooks/usePropertyImages";

const PropertyShowcaseCard = ({ property }: { property: any }) => {
  const { data: images, isLoading: imagesLoading } = usePropertyCardImages(property.image_folder || '');
  
  // Use Supabase images if available, fallback to stock images
  const displayImage = images && images.length > 0 
    ? images[0].url 
    : `/src/assets/property-${(parseInt(property.id) % 6) + 1}.jpg`;

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={displayImage}
          alt={property.title || 'Property'}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `/src/assets/property-${(parseInt(property.id) % 6) + 1}.jpg`;
          }}
        />
        <div className="absolute top-4 right-4">
          <Button variant="secondary" size="icon" className="h-8 w-8">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold line-clamp-1">{property.title}</h3>
          {property.airbnb_rating && (
            <Badge variant="secondary">★ {property.airbnb_rating}</Badge>
          )}
        </div>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {property.excerpt || property.subtitle}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{property.guests}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{property.bathrooms}</span>
          </div>
          {property.boat_parking && (
            <div className="flex items-center gap-1">
              <Car className="h-4 w-4" />
              <span>Boat</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          {property.pet_friendly && (
            <Badge variant="outline">Pet Friendly</Badge>
          )}
          {property.boat_parking && (
            <Badge variant="outline">Boat Parking</Badge>
          )}
        </div>
        
        <Button asChild className="w-full">
          <Link to={`/properties/${property.slug}`}>
            Enquire Now
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

const PropertyShowcase = () => {
  const { data: properties, isLoading, error } = useRandomProperties(3);

  if (isLoading) {
    return (
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Properties</h2>
            <p className="text-muted-foreground">Discover your perfect stay in Mallacoota</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-[4/3] bg-muted animate-pulse"></div>
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
        </div>
      </section>
    );
  }

  if (error || !properties?.length) {
    return null;
  }

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Properties</h2>
          <p className="text-muted-foreground">Discover your perfect stay in Mallacoota</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {properties.map((property) => <PropertyShowcaseCard key={property.id} property={property} />)}
        </div>
        
        <div className="text-center mt-8">
          <Button asChild variant="outline" size="lg">
            <Link to="/properties">Explore Our Collection</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PropertyShowcase;