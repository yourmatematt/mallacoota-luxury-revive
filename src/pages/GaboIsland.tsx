import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, Camera, Binoculars, Anchor, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const GaboIsland = () => {
  const tourHighlights = [
    {
      icon: Camera,
      title: "Historic Lighthouse",
      description: "Climb the iconic 1862 lighthouse for panoramic views across Bass Strait"
    },
    {
      icon: Binoculars,
      title: "Little Penguin Colony",
      description: "Witness Australia's smallest penguins returning at sunset (seasonal)"
    },
    {
      icon: Users,
      title: "Guided Wildlife Tours",
      description: "Expert-led tours showcasing seals, dolphins, and over 200 bird species"
    },
    {
      icon: Clock,
      title: "Full Day Adventure",
      description: "Depart 9am, return 4pm - includes lunch and equipment"
    }
  ];

  const practicalInfo = [
    { label: "Duration", value: "7 hours (9am - 4pm)" },
    { label: "Departure", value: "Mallacoota Wharf" },
    { label: "Best Season", value: "October - April" },
    { label: "Penguin Season", value: "December - February" },
    { label: "Group Size", value: "Maximum 12 people" },
    { label: "Difficulty", value: "Moderate walking required" }
  ];

  useEffect(() => {
    // Add structured data for Gabo Island tours
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      "name": "Gabo Island Tours from Mallacoota",
      "description": "Book your Gabo Island lighthouse and penguin tour from Mallacoota. Historic 1862 lighthouse, little penguin colony, guided wildlife tours.",
      "url": "https://hammondproperties.com.au/gabo-island",
      "touristType": "https://schema.org/NatureTourism",
      "provider": {
        "@type": "Organization",
        "name": "Hammond Properties",
        "url": "https://hammondproperties.com.au",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "500",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-37.56",
        "longitude": "149.85"
      },
      "containsPlace": {
        "@type": "LightHouse",
        "name": "Gabo Island Lighthouse",
        "description": "Historic 1862 lighthouse standing 47 metres tall"
      }
    };

    let structuredDataScript = document.querySelector('#gabo-island-structured-data');
    if (structuredDataScript) {
      structuredDataScript.textContent = JSON.stringify(structuredData);
    } else {
      structuredDataScript = document.createElement('script');
      structuredDataScript.id = 'gabo-island-structured-data';
      structuredDataScript.type = 'application/ld+json';
      structuredDataScript.textContent = JSON.stringify(structuredData);
      document.head.appendChild(structuredDataScript);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Gabo Island Tours from Mallacoota | Lighthouse & Penguin Tours Guide"
        description="Book your Gabo Island lighthouse and penguin tour from Mallacoota. Historic 1862 lighthouse, little penguin colony, guided wildlife tours. Full day adventure departing daily."
      />
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[70vh] overflow-hidden">
          <img
            src="/images/gabo-island-hero.jpg"
            alt="Historic Gabo Island Lighthouse rising above rugged coastline, Victoria's premier lighthouse tour destination"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30" />
          
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-4xl text-white">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
                  Gabo Island Tours from Mallacoota
                </h1>
                <p className="text-xl md:text-2xl mb-8 max-w-2xl">
                  Discover the historic lighthouse, little penguin colony, and pristine wildlife sanctuary 
                  just 15km off the Mallacoota coast.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="accent" size="lg" className="px-8 py-3">
                    <Anchor className="w-5 h-5 mr-2" />
                    Book Your Tour
                  </Button>
                  <Button variant="outline" size="lg" className="px-8 py-3 bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-gray-900 hover:border-white hover:shadow-lg active:bg-white/90 active:text-gray-900 active:scale-95 transition-all duration-200">
                    <MapPin className="w-5 h-5 mr-2" />
                    View Location
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tour Highlights */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
                  Gabo Island Experience
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Step onto this pristine island sanctuary where history meets wildlife in spectacular fashion
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {tourHighlights.map((highlight, index) => {
                  const Icon = highlight.icon;
                  return (
                    <Card key={index} className="text-center border-none shadow-lg">
                      <CardContent className="p-6">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold text-primary mb-3">
                          {highlight.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {highlight.description}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Information */}
        <section className="py-16 bg-warm-neutral/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
                    What to Expect
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-3">The Historic Lighthouse</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Built in 1862, Gabo Island Lighthouse stands 47 metres tall and offers breathtaking 
                        360-degree views. Climb the 162 steps to the top and learn about the maritime history 
                        that shaped this rugged coastline.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-3">Little Penguin Colony</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        During summer months (December-February), witness Australia's smallest penguins returning 
                        to their burrows at sunset. This magical experience is one of the few places you can 
                        observe these charming creatures in their natural habitat.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-3">Wildlife Sanctuary</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Gabo Island is home to over 200 bird species, Australian fur seals, and dolphins. 
                        The island's pristine environment provides a unique opportunity to see wildlife 
                        undisturbed by human development.
                      </p>
                    </div>
                    
                    <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/10">
                      <p className="text-muted-foreground text-sm mb-3">
                        <strong>Planning an overnight stay?</strong> Make the most of your Gabo Island adventure with our waterfront holiday rentals in Mallacoota.
                      </p>
                      <Link 
                        to="/properties"
                        className="inline-flex items-center text-primary hover:text-accent-red transition-colors font-medium text-sm"
                      >
                        Browse Accommodation →
                      </Link>
                    </div>
                  </div>
                </div>

                <div>
                  <Card className="bg-white shadow-xl">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-serif font-bold text-primary mb-6">
                        Tour Information
                      </h3>
                      
                      <div className="space-y-4">
                        {practicalInfo.map((info, index) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                            <span className="font-medium text-primary">{info.label}:</span>
                            <span className="text-muted-foreground">{info.value}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-8 p-4 bg-accent-red/10 rounded-lg">
                        <h4 className="font-semibold text-accent-red mb-2">Important Notes:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Weather dependent - tours may be cancelled for safety</li>
                          <li>• Comfortable walking shoes essential</li>
                          <li>• Bring camera, sunscreen, and jacket</li>
                          <li>• Lunch and water provided</li>
                        </ul>
                      </div>
                      
                      <Button className="w-full mt-6" size="lg">
                        Check Availability
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Booking CTA */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Ready for Your Gabo Island Adventure?
              </h2>
              <p className="text-xl mb-8 text-primary-foreground/90">
                Book your lighthouse and penguin tour today. Limited spots available daily.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  variant="accent" 
                  size="lg" 
                  className="px-12 py-6 text-lg"
                >
                  <Link to="/contact">
                    Book Your Tour
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="px-12 py-6 text-lg bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-gray-900 hover:border-white hover:shadow-lg active:bg-white/90 active:text-gray-900 active:scale-95 transition-all duration-200"
                >
                  <Link to="/properties">
                    Book Accommodation
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default GaboIsland;