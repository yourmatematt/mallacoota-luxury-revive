import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Users, Wifi, PawPrint, Snowflake } from "lucide-react";
import { useState } from "react";

import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";

const PropertyGrid = () => {
  const [activeFilter, setActiveFilter] = useState("All filters");

  const filters = [
    "Amenities",
    "Price Range", 
    "Bedrooms",
    "Pet Policy",
    "Nearby",
    "All filters"
  ];

  const properties = [
    {
      id: 1,
      name: "Four on Stingray Point",
      image: property1,
      bedrooms: 6,
      bathrooms: 3,
      sleeps: 12,
      petFriendly: true,
      wifi: true,
      airCon: false
    },
    {
      id: 2,
      name: "Bella Views",
      image: property2,
      bedrooms: 4,
      bathrooms: 2,
      sleeps: 8,
      petFriendly: false,
      wifi: true,
      airCon: true
    },
    {
      id: 3,
      name: "Gabo Views",
      image: property3,
      bedrooms: 3,
      bathrooms: 2,
      sleeps: 6,
      petFriendly: true,
      wifi: true,
      airCon: false
    },
    {
      id: 4,
      name: "37 Mirrabooka Rd",
      image: property4,
      bedrooms: 4,
      bathrooms: 2,
      sleeps: 8,
      petFriendly: true,
      wifi: true,
      airCon: false
    },
    {
      id: 5,
      name: "High Tide Apartment",
      image: property5,
      bedrooms: 2,
      bathrooms: 1,
      sleeps: 4,
      petFriendly: false,
      wifi: true,
      airCon: true
    },
    {
      id: 6,
      name: "Blue Waters",
      image: property6,
      bedrooms: 3,
      bathrooms: 2,
      sleeps: 6,
      petFriendly: true,
      wifi: true,
      airCon: false
    }
  ];

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
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              className={`rounded-full px-6 py-2 transition-all duration-300 ${
                activeFilter === filter 
                  ? "bg-primary text-primary-foreground" 
                  : "border-border hover:border-primary"
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <Card key={property.id} className="property-card card-luxury overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 right-4 bg-luxury-gold text-primary">
                  AVAILABLE
                </Badge>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-serif font-semibold mb-4 text-primary">
                  {property.name}
                </h3>
                
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
                    <span>{property.sleeps}</span>
                  </div>
                </div>
                
                {/* Amenities */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex space-x-3">
                    {property.petFriendly && (
                      <div className="flex items-center space-x-1 text-success">
                        <PawPrint size={14} />
                        <span>Pet Friendly</span>
                      </div>
                    )}
                    {property.wifi && (
                      <div className="flex items-center space-x-1 text-ocean-blue">
                        <Wifi size={14} />
                        <span>WiFi</span>
                      </div>
                    )}
                    {property.airCon && (
                      <div className="flex items-center space-x-1 text-ocean-blue">
                        <Snowflake size={14} />
                        <span>Air Con</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <Button className="w-full mt-6 btn-primary">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyGrid;