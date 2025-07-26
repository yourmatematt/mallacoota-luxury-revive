import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Car, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Property {
  id: string;
  title: string;
  subtitle: string;
  guests: number;
  petFriendly: boolean;
  boatParking: boolean;
  rating: number;
  reviewCount: number;
  images: string[];
  amenities: string[];
  price: number;
}

const Properties = () => {
  const [guestCount, setGuestCount] = useState(2);
  const [petFriendly, setPetFriendly] = useState(false);
  const [boatParking, setBoatParking] = useState(false);
  const [hoveredProperty, setHoveredProperty] = useState<string | null>(null);
  const [imageIndex, setImageIndex] = useState(0);

  // Mock properties data - will be replaced with CMS data
  const properties: Property[] = [
    {
      id: "1",
      title: "Oceanview Villa",
      subtitle: "Luxury beachfront retreat",
      guests: 8,
      petFriendly: true,
      boatParking: true,
      rating: 4.9,
      reviewCount: 24,
      images: ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"],
      amenities: ["Ocean View", "Pool", "BBQ", "Parking", "WiFi", "Pet Friendly"],
      price: 450
    },
    {
      id: "2", 
      title: "Coastal Cottage",
      subtitle: "Charming family getaway",
      guests: 6,
      petFriendly: false,
      boatParking: false,
      rating: 4.8,
      reviewCount: 18,
      images: ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"],
      amenities: ["Garden View", "BBQ", "Parking", "WiFi"],
      price: 320
    },
    {
      id: "3",
      title: "Waterfront Apartment", 
      subtitle: "Modern lakeside living",
      guests: 4,
      petFriendly: true,
      boatParking: true,
      rating: 4.7,
      reviewCount: 31,
      images: ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"],
      amenities: ["Lake View", "Balcony", "Parking", "WiFi", "Pet Friendly"],
      price: 280
    }
  ];

  const filteredProperties = properties.filter(property => {
    if (property.guests < guestCount) return false;
    if (petFriendly && !property.petFriendly) return false;
    if (boatParking && !property.boatParking) return false;
    return true;
  });

  const handleMouseEnter = (propertyId: string) => {
    setHoveredProperty(propertyId);
    setImageIndex(0);
    const interval = setInterval(() => {
      setImageIndex(prev => (prev + 1) % 3);
    }, 1000);
    
    setTimeout(() => clearInterval(interval), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-6">
                Our Properties
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Discover your perfect Mallacoota retreat from our collection of luxury vacation rentals
              </p>
            </div>

            {/* Filters */}
            <div className="max-w-4xl mx-auto bg-card rounded-2xl p-6 shadow-soft border">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                {/* Guest Count */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Guests</label>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                      className="h-8 w-8 p-0"
                    >
                      -
                    </Button>
                    <span className="text-foreground font-medium w-8 text-center">{guestCount}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setGuestCount(guestCount + 1)}
                      className="h-8 w-8 p-0"
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Pet Friendly Toggle */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Pet Friendly</label>
                  <Button
                    variant={petFriendly ? "default" : "outline"}
                    onClick={() => setPetFriendly(!petFriendly)}
                    className="w-full justify-start"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    {petFriendly ? "Yes" : "Any"}
                  </Button>
                </div>

                {/* Boat Parking Toggle */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Boat Parking</label>
                  <Button
                    variant={boatParking ? "default" : "outline"}
                    onClick={() => setBoatParking(!boatParking)}
                    className="w-full justify-start"
                  >
                    <Car className="w-4 h-4 mr-2" />
                    {boatParking ? "Yes" : "Any"}
                  </Button>
                </div>

                {/* Results Count */}
                <div className="text-center md:text-right">
                  <p className="text-sm text-muted-foreground">
                    {filteredProperties.length} propert{filteredProperties.length === 1 ? 'y' : 'ies'} found
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Properties Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <Link key={property.id} to={`/properties/${property.id}`}>
                  <Card 
                    className="card-luxury h-full group cursor-pointer"
                    onMouseEnter={() => handleMouseEnter(property.id)}
                    onMouseLeave={() => setHoveredProperty(null)}
                  >
                    <div className="relative overflow-hidden rounded-t-xl">
                      <img
                        src={hoveredProperty === property.id ? property.images[imageIndex] : property.images[0]}
                        alt={property.title}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-background/90 text-foreground">
                          <Star className="w-3 h-3 mr-1 fill-luxury-gold text-luxury-gold" />
                          {property.rating} ({property.reviewCount})
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-serif font-semibold text-primary mb-1">
                            {property.title}
                          </h3>
                          <p className="text-muted-foreground">{property.subtitle}</p>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {property.guests} guests
                          </div>
                          {property.petFriendly && (
                            <div className="flex items-center">
                              <Heart className="w-4 h-4 mr-1" />
                              Pet friendly
                            </div>
                          )}
                          {property.boatParking && (
                            <div className="flex items-center">
                              <Car className="w-4 h-4 mr-1" />
                              Boat parking
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {property.amenities.slice(0, 3).map((amenity, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                          {property.amenities.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{property.amenities.length - 3} more
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-border">
                          <div>
                            <span className="text-2xl font-semibold text-primary">
                              ${property.price}
                            </span>
                            <span className="text-muted-foreground">/ night</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {filteredProperties.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">
                  No properties match your current filters. Try adjusting your search criteria.
                </p>
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