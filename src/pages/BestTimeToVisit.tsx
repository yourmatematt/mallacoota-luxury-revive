import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, Leaf, Snowflake, Flower, Calendar, Users, Thermometer, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const BestTimeToVisit = () => {
  const seasons = [
    {
      name: "Summer",
      months: "December - February",
      icon: Sun,
      temperature: "18°C - 28°C",
      rainfall: "Low (50-80mm)",
      crowds: "Peak Season",
      highlights: [
        "Perfect beach weather and swimming conditions",
        "Warmest water temperatures (18-22°C)",
        "Long daylight hours (6:30am - 8:30pm)",
        "School holidays bring family atmosphere",
        "Ideal for water sports and fishing"
      ],
      activities: [
        "Beach swimming and sunbathing",
        "Surfing and stand-up paddleboarding",
        "Fishing from beach or boat",
        "Camping in Croajingolong National Park",
        "Outdoor dining and BBQs"
      ],
      considerations: [
        "Busiest time of year - book early",
        "Higher accommodation rates",
        "Can be hot and humid",
        "Strong UV - sun protection essential"
      ],
      color: "orange"
    },
    {
      name: "Autumn",
      months: "March - May",
      icon: Leaf,
      temperature: "12°C - 22°C",
      rainfall: "Moderate (60-120mm)",
      crowds: "Moderate",
      highlights: [
        "Mild, comfortable weather",
        "Fewer crowds but still warm",
        "Beautiful autumn colours in the forest",
        "Excellent fishing conditions",
        "Perfect hiking weather"
      ],
      activities: [
        "Bushwalking in Croajingolong National Park",
        "Wildlife photography",
        "Fishing (peak season for many species)",
        "Cycling along coastal tracks",
        "Exploring local markets and cafes"
      ],
      considerations: [
        "Water may be cooler for swimming",
        "Some accommodation may have lower rates",
        "Variable weather - pack layers",
        "Easter holidays can be busy"
      ],
      color: "amber"
    },
    {
      name: "Winter",
      months: "June - August",
      icon: Snowflake,
      temperature: "6°C - 18°C",
      rainfall: "High (80-150mm)",
      crowds: "Low Season",
      highlights: [
        "Peak whale watching season",
        "Dramatic storm watching",
        "Cosy fireplace weather",
        "Best value accommodation rates",
        "Peaceful, uncrowded beaches"
      ],
      activities: [
        "Whale watching from shore or boat",
        "Storm watching from coastal viewpoints",
        "Cosy indoor activities and spa treatments",
        "Photography of dramatic seascapes",
        "Local wine tastings and hearty pub meals"
      ],
      considerations: [
        "Cool weather - warm clothing needed",
        "Some outdoor activities weather dependent",
        "Shorter daylight hours",
        "Swimming requires wetsuit"
      ],
      color: "blue"
    },
    {
      name: "Spring",
      months: "September - November",
      icon: Flower,
      temperature: "10°C - 22°C",
      rainfall: "Moderate (70-110mm)",
      crowds: "Low to Moderate",
      highlights: [
        "Wildflower blooms throughout national park",
        "Bird migration season",
        "Pleasant temperatures return",
        "Growing daylight hours",
        "Excellent value for accommodation"
      ],
      activities: [
        "Wildflower photography and nature walks",
        "Bird watching and nature tours",
        "Cycling and hiking in perfect weather",
        "Fishing as waters warm up",
        "Outdoor markets and festivals"
      ],
      considerations: [
        "Weather can be variable",
        "Water still cool for swimming",
        "School holidays in late September",
        "Popular with nature enthusiasts"
      ],
      color: "green"
    }
  ];

  const localEvents = [
    { month: "January", event: "Australia Day Celebrations", description: "Community BBQ and activities" },
    { month: "March", event: "Mallacoota Fishing Competition", description: "Annual fishing tournament" },
    { month: "April", event: "Easter Markets", description: "Local crafts and produce markets" },
    { month: "June", event: "Whale Watching Season Begins", description: "Humpback and Southern Right whales" },
    { month: "September", event: "Wildflower Festival", description: "Guided walks and photography workshops" },
    { month: "November", event: "Mallacoota Music Festival", description: "Local and touring musicians" },
    { month: "December", event: "Christmas Markets", description: "Holiday shopping and festivities" }
  ];

  const getSeasonColor = (color: string) => {
    const colors = {
      orange: "from-orange-500 to-orange-600",
      amber: "from-amber-500 to-amber-600", 
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Best Time to Visit Mallacoota | Seasonal Guide | Hammond Properties"
        description="Discover the best time to visit Mallacoota with our complete seasonal guide. Weather, activities, whale watching, wildflowers, and school holiday considerations for your East Gippsland holiday."
      />
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
                Best Time to Visit Mallacoota
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
                Your Complete Seasonal Guide to East Gippsland's Hidden Gem
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
                <p className="text-lg">
                  <strong>Quick Answer:</strong> Summer (Dec-Feb) for beach activities, 
                  Winter (Jun-Aug) for whale watching, Spring (Sep-Nov) for wildflowers, 
                  and Autumn (Mar-May) for fewer crowds and perfect hiking weather.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Seasonal Guide */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
                  Seasonal Guide to Mallacoota
                </h2>
                <p className="text-lg text-muted-foreground">
                  Each season offers unique experiences in this pristine coastal paradise
                </p>
              </div>

              <div className="grid gap-8">
                {seasons.map((season, index) => {
                  const Icon = season.icon;
                  return (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className={`bg-gradient-to-r ${getSeasonColor(season.color)} text-white p-6`}>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              <Icon className="w-10 h-10" />
                              <div>
                                <h3 className="text-2xl font-bold">{season.name}</h3>
                                <p className="text-lg opacity-90">{season.months}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center space-x-2 mb-2">
                                <Thermometer className="w-5 h-5" />
                                <span>{season.temperature}</span>
                              </div>
                              <div className="flex items-center space-x-2 mb-2">
                                <Users className="w-5 h-5" />
                                <span>{season.crowds}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <div className="grid md:grid-cols-3 gap-6">
                            <div>
                              <h4 className="font-semibold text-primary mb-3">Season Highlights</h4>
                              <ul className="space-y-2 text-sm">
                                {season.highlights.map((highlight, idx) => (
                                  <li key={idx} className="flex items-start space-x-2">
                                    <span className="text-green-600 mt-1">•</span>
                                    <span>{highlight}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-primary mb-3">Top Activities</h4>
                              <ul className="space-y-2 text-sm">
                                {season.activities.map((activity, idx) => (
                                  <li key={idx} className="flex items-start space-x-2">
                                    <span className="text-blue-600 mt-1">•</span>
                                    <span>{activity}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-primary mb-3">Things to Consider</h4>
                              <ul className="space-y-2 text-sm">
                                {season.considerations.map((consideration, idx) => (
                                  <li key={idx} className="flex items-start space-x-2">
                                    <span className="text-amber-600 mt-1">•</span>
                                    <span>{consideration}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* School Holiday Considerations */}
        <section className="py-16 bg-warm-neutral/50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-8 text-center">
                School Holiday Considerations
              </h2>
              
              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-primary">Victorian School Holidays 2024/25</h3>
                      <ul className="space-y-3">
                        <li className="flex justify-between items-center p-3 bg-red-50 rounded">
                          <span className="font-medium">Summer Holidays</span>
                          <span className="text-sm">Dec 20 - Jan 28</span>
                        </li>
                        <li className="flex justify-between items-center p-3 bg-blue-50 rounded">
                          <span className="font-medium">Easter Holidays</span>
                          <span className="text-sm">Mar 28 - Apr 13</span>
                        </li>
                        <li className="flex justify-between items-center p-3 bg-green-50 rounded">
                          <span className="font-medium">Winter Holidays</span>
                          <span className="text-sm">Jun 28 - Jul 13</span>
                        </li>
                        <li className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                          <span className="font-medium">Spring Holidays</span>
                          <span className="text-sm">Sep 20 - Oct 5</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-primary">Planning Tips</h3>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-start space-x-2">
                          <span className="text-green-600 mt-1">✓</span>
                          <span><strong>Book Early:</strong> School holidays book out 3-6 months in advance</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-green-600 mt-1">✓</span>
                          <span><strong>Higher Rates:</strong> Expect premium pricing during school holidays</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-green-600 mt-1">✓</span>
                          <span><strong>Family Activities:</strong> More child-friendly events and activities</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-green-600 mt-1">✓</span>
                          <span><strong>NSW Holidays:</strong> Also consider NSW school holidays for crowds</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-amber-600 mt-1">⚠</span>
                          <span><strong>Shoulder Periods:</strong> Week before/after holidays often busy too</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Local Events Calendar */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-8 text-center">
                Local Events Calendar
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {localEvents.map((event, index) => (
                  <Card key={index} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-primary">{event.month}: {event.event}</h3>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Ready to Experience Mallacoota?
              </h2>
              <p className="text-xl mb-8 text-primary-foreground/90">
                Book your luxury holiday rental and discover why every season 
                offers something magical in this pristine coastal paradise.
              </p>
              <Button 
                asChild 
                variant="accent" 
                size="lg" 
                className="px-12 py-6 text-lg"
              >
                <Link to="/properties">
                  Book Your Perfect Season
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BestTimeToVisit;