import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X, MapPin, Users, Waves, UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const MallacootaVsLakesEntrance = () => {
  const comparisonData = [
    {
      category: "Crowds & Atmosphere",
      icon: Users,
      mallacoota: {
        score: "Peaceful & Pristine",
        description: "Quiet coastal town with untouched natural beauty",
        pro: true
      },
      lakesEntrance: {
        score: "Busy & Commercial",
        description: "Popular tourist destination with crowds and commercial development",
        pro: false
      }
    },
    {
      category: "Beaches",
      icon: Waves,
      mallacoota: {
        score: "Pristine & Private",
        description: "Secluded beaches within Croajingolong National Park",
        pro: true
      },
      lakesEntrance: {
        score: "Developed & Crowded",
        description: "Popular beaches with facilities but more crowded",
        pro: false
      }
    },
    {
      category: "Nature & Wildlife",
      icon: MapPin,
      mallacoota: {
        score: "World Heritage Listed",
        description: "Located in UNESCO Biosphere Reserve with abundant wildlife",
        pro: true
      },
      lakesEntrance: {
        score: "Limited Natural Areas",
        description: "Some nature areas but less diverse wildlife experiences",
        pro: false
      }
    },
    {
      category: "Dining & Amenities",
      icon: UtensilsCrossed,
      mallacoota: {
        score: "Authentic Local Character",
        description: "Charming local cafés and pubs with community feel",
        pro: true
      },
      lakesEntrance: {
        score: "More Commercial Options",
        description: "Wider range of dining but more commercialised",
        pro: false
      }
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Mallacoota vs Lakes Entrance: Why Choose Mallacoota | Hammond Properties"
        description="Discover why Mallacoota offers a quieter, more pristine alternative to Lakes Entrance. Untouched beaches, authentic coastal town experience, and luxury accommodation in East Gippsland."
      />
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
                Mallacoota vs Lakes Entrance
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
                Why Choose Mallacoota for Your East Gippsland Holiday
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
                <p className="text-lg">
                  <strong>The short answer:</strong> Mallacoota offers pristine beaches without the crowds, 
                  authentic coastal town charm, and luxury accommodation in a UNESCO Biosphere Reserve.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
                  Detailed Comparison
                </h2>
                <p className="text-lg text-muted-foreground">
                  See why discerning travellers choose Mallacoota over Lakes Entrance
                </p>
              </div>

              <div className="grid gap-8">
                {comparisonData.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="grid md:grid-cols-3 gap-0">
                          {/* Category */}
                          <div className="bg-primary text-white p-6 flex items-center justify-center">
                            <div className="text-center">
                              <Icon className="w-8 h-8 mx-auto mb-3" />
                              <h3 className="text-lg font-semibold">{item.category}</h3>
                            </div>
                          </div>
                          
                          {/* Mallacoota */}
                          <div className="p-6 bg-green-50">
                            <div className="flex items-start space-x-3">
                              <Check className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                              <div>
                                <h4 className="font-semibold text-green-800 mb-2">
                                  Mallacoota: {item.mallacoota.score}
                                </h4>
                                <p className="text-sm text-green-700">
                                  {item.mallacoota.description}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Lakes Entrance */}
                          <div className="p-6 bg-red-50">
                            <div className="flex items-start space-x-3">
                              <X className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                              <div>
                                <h4 className="font-semibold text-red-800 mb-2">
                                  Lakes Entrance: {item.lakesEntrance.score}
                                </h4>
                                <p className="text-sm text-red-700">
                                  {item.lakesEntrance.description}
                                </p>
                              </div>
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

        {/* Key Benefits */}
        <section className="py-16 bg-warm-neutral/50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-8 text-center">
                Why Mallacoota is the Superior Choice
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-green-800 mb-4">
                      🏖️ Pristine Beaches Without the Crowds
                    </h3>
                    <p className="text-green-700">
                      Enjoy secluded beaches within Croajingolong National Park. No commercial development, 
                      just pristine coastline where you can walk for kilometres without seeing another soul.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-green-800 mb-4">
                      🌿 Authentic Coastal Town Experience
                    </h3>
                    <p className="text-green-700">
                      Experience real Australian coastal culture. Local cafés, community events, 
                      and genuine hospitality - not tourist traps and commercial chains.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-green-800 mb-4">
                      🦘 World-Class Wildlife Watching
                    </h3>
                    <p className="text-green-700">
                      UNESCO Biosphere Reserve status means incredible biodiversity. 
                      Spot whales, dolphins, echidnas, and over 300 bird species in their natural habitat.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-green-800 mb-4">
                      🏡 Luxury Accommodation Options
                    </h3>
                    <p className="text-green-700">
                      Hammond Properties offers luxury holiday rentals that you simply won't find in 
                      commercialised Lakes Entrance. Privacy, premium amenities, and personal service.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Experience the Mallacoota Difference
              </h2>
              <p className="text-xl mb-8 text-primary-foreground/90">
                Book your luxury Mallacoota holiday rental and discover why our guests 
                choose pristine over crowded, authentic over commercial.
              </p>
              <Button 
                asChild 
                variant="accent" 
                size="lg" 
                className="px-12 py-6 text-lg"
              >
                <Link to="/properties">
                  Explore Our Luxury Properties
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

export default MallacootaVsLakesEntrance;