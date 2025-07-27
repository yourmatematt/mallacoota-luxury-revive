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

const Properties = () => {
  const [guestCount, setGuestCount] = useState(2);
  const [petFriendly, setPetFriendly] = useState(false);
  const [boatParking, setBoatParking] = useState(false);

  const { data: properties, isLoading, error } = useProperties({
    guests: guestCount,
    petFriendly: petFriendly || undefined,
    boatParking: boatParking || undefined,
  });

  if (error) {
    return (
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
    );
  }

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
                    {isLoading ? "Loading..." : `${properties?.length || 0} propert${properties?.length === 1 ? 'y' : 'ies'} found`}
                  </p>
                </div>
              </div>
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
      </main>

      <Footer />
    </div>
  );
};

export default Properties;