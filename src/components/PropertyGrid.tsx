import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Users, Wifi, PawPrint, Car, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useProperties } from "@/hooks/useProperties";

const PropertyGrid = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [filters, setFilters] = useState({
    guests: undefined as number | undefined,
    petFriendly: undefined as boolean | undefined,
    boatParking: undefined as boolean | undefined,
  });

  const { data: properties, isLoading, error } = useProperties(filters);

  const filterOptions = [
    { key: "all", label: "All Properties", action: () => { setActiveFilter("all"); setFilters({ guests: undefined, petFriendly: undefined, boatParking: undefined }); } },
    { key: "pet", label: "Pet Friendly", action: () => { setActiveFilter("pet"); setFilters({ guests: undefined, petFriendly: true, boatParking: undefined }); } },
    { key: "boat", label: "Boat Parking", action: () => { setActiveFilter("boat"); setFilters({ guests: undefined, petFriendly: undefined, boatParking: true }); } },
    { key: "large", label: "6+ Guests", action: () => { setActiveFilter("large"); setFilters({ guests: 6, petFriendly: undefined, boatParking: undefined }); } },
  ];

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
    <section id="properties" className="py-20 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Where Comfort Meets Adventure
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Premium vacation rentals perfectly positioned for your Mallacoota discovery.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filterOptions.map((filter) => (
            <Button
              key={filter.key}
              variant={activeFilter === filter.key ? "default" : "outline"}
              className={`rounded-full px-6 py-2 transition-all duration-300 ${
                activeFilter === filter.key 
                  ? "bg-primary text-primary-foreground" 
                  : "border-border hover:border-primary"
              }`}
              onClick={filter.action}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Property Grid */}
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties?.slice(0, 6).map((property) => (
              <Card key={property.id} className="property-card card-luxury overflow-hidden group">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={property.image_folder ? `/lovable-uploads/${property.id}-1.jpg` : '/placeholder-property.jpg'}
                    alt={property.title || 'Property'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-property.jpg';
                    }}
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    {property.airbnb_rating && (
                      <Badge className="bg-white/90 text-primary flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {property.airbnb_rating}
                      </Badge>
                    )}
                    <Badge className="bg-luxury-gold text-primary">
                      AVAILABLE
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-serif font-semibold mb-2 text-primary">
                    {property.title}
                  </h3>
                  {property.subtitle && (
                    <p className="text-sm text-muted-foreground mb-4">{property.subtitle}</p>
                  )}
                  
                  {/* Property Details */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Bed size={16} />
                      <span>{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Bath size={16} />
                      <span>{property.bathrooms}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Users size={16} />
                      <span>{property.guests}</span>
                    </div>
                  </div>
                  
                  {/* Amenities */}
                  <div className="flex items-center justify-between text-sm mb-6">
                    <div className="flex space-x-3">
                      {property.pet_friendly && (
                        <div className="flex items-center space-x-1 text-success">
                          <PawPrint size={14} />
                          <span>Pet Friendly</span>
                        </div>
                      )}
                      {property.boat_parking && (
                        <div className="flex items-center space-x-1 text-ocean-blue">
                          <Car size={14} />
                          <span>Boat Parking</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1 text-ocean-blue">
                        <Wifi size={14} />
                        <span>WiFi</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button asChild className="w-full btn-primary">
                    <Link to={`/properties/${property.slug}`}>
                      View Details
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* View All Properties Link */}
        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
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