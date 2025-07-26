import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const DiscoverSection = () => {
  const [activeFilter, setActiveFilter] = useState("All Properties");

  const filters = [
    "All Properties",
    "Family Friendly", 
    "Ocean/Lake Frontage",
    "Under 4 Bedrooms",
    "Pet Friendly",
    "Mountain & Hinterland",
    "Unique Local Feature"
  ];

  const experiences = [
    {
      id: 1,
      title: "Toddler & Young Unit Activities",
      date: "2/1/5-22/8",
      dateLabel: "Apr 2-4",
      description: "Perfect activities and safe environments designed for families traveling with toddlers and young children. Our properties feature child-friendly amenities and nearby attractions.",
      image: "/api/placeholder/400/300",
      available: true
    },
    {
      id: 2,
      title: "Perfect Autumn Conditions",
      date: "4/7/5-22/9", 
      dateLabel: "Jul 4-Sep 22",
      description: "Experience ideal autumn weather for surfing, hiking, and outdoor adventures. Mild temperatures and clear skies make this the perfect season for exploration.",
      image: "/api/placeholder/400/300",
      available: true
    },
    {
      id: 3,
      title: "Hiking & Wildlife & Photography",
      date: "3/1/5-22/8",
      dateLabel: "Jan 3-Aug 22", 
      description: "Discover incredible hiking trails with abundant wildlife viewing opportunities. Perfect for photography enthusiasts seeking to capture Mallacoota's natural beauty.",
      image: "/api/placeholder/400/300",
      available: true
    },
    {
      id: 4,
      title: "Wildlife Frontline - Spring Blooms Guide",
      date: "2/8/5-22/8",
      dateLabel: "Aug 2-22",
      description: "Experience the spectacular spring wildflower blooms and witness native wildlife in their natural habitat. Seasonal guides available for optimal viewing.",
      image: "/api/placeholder/400/300",
      available: true
    }
  ];

  return (
    <section className="py-20 bg-luxury-cream">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Discover Mallacoota
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Local expertise, premium properties, and genuine care for every guest's experience
          </p>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              size="sm"
              className={`rounded-full px-4 py-2 text-sm transition-all duration-300 ${
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

        {/* Experience Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {experiences.map((experience) => (
            <Card key={experience.id} className="card-luxury overflow-hidden group">
              <div className="relative h-64 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-ocean-blue to-primary"></div>
                {experience.available && (
                  <Badge className="absolute top-4 right-4 bg-luxury-gold text-primary">
                    AVAILABLE
                  </Badge>
                )}
                <div className="absolute top-4 left-4 bg-background/90 px-3 py-1 rounded-full">
                  <span className="text-sm font-medium text-primary">
                    {experience.date}
                  </span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-serif font-semibold text-primary mb-2">
                    {experience.title}
                  </h3>
                  <p className="text-sm text-accent-red font-medium">
                    {experience.dateLabel}
                  </p>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {experience.description}
                </p>
                
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  Load More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscoverSection;