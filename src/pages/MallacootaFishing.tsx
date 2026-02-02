import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Fish, Anchor, Waves, MapPin, Star, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import { useSignatureProperties } from "@/hooks/useSignatureProperties";
import { getPropertyFallbackImage } from "@/lib/imageUtils";

const MallacootaFishing = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { data: properties, isLoading: propertiesLoading } = useSignatureProperties();

  useEffect(() => {
    setIsLoaded(true);

    // SEO: Structured Data - CollectionPage for Fishing Landing Page
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": "https://hammondproperties.com.au/mallacoota-fishing-accommodation#collectionpage",
          "name": "Fishing Accommodation in Mallacoota",
          "description": "Premium fishing accommodation in Mallacoota with boat parking, water access, and fish cleaning facilities. Perfect base for East Gippsland fishing holidays.",
          "url": "https://hammondproperties.com.au/mallacoota-fishing-accommodation",
          "inLanguage": "en-AU",
          "isPartOf": {
            "@type": "WebSite",
            "@id": "https://hammondproperties.com.au/#website"
          },
          "provider": {
            "@type": "LocalBusiness",
            "@id": "https://hammondproperties.com.au/#localbusiness",
            "name": "Hammond Properties"
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://hammondproperties.com.au/mallacoota-fishing-accommodation#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": { "@id": "https://hammondproperties.com.au/" }
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Fishing Accommodation"
            }
          ]
        }
      ]
    };

    let schemaScript = document.querySelector('#fishing-page-structured-data');
    if (schemaScript) {
      schemaScript.textContent = JSON.stringify(structuredData);
    } else {
      schemaScript = document.createElement('script');
      schemaScript.id = 'fishing-page-structured-data';
      schemaScript.type = 'application/ld+json';
      schemaScript.textContent = JSON.stringify(structuredData);
      document.head.appendChild(schemaScript);
    }

    // Add geo tags
    const updateOrCreateMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };

    updateOrCreateMeta('geo.region', 'AU-VIC');
    updateOrCreateMeta('geo.placename', 'Mallacoota');
    updateOrCreateMeta('geo.position', '-37.5642;149.7544');
    updateOrCreateMeta('ICBM', '-37.5642, 149.7544');

    return () => {
      const script = document.querySelector('#fishing-page-structured-data');
      if (script) script.remove();
    };
  }, []);

  // Filter properties with boat parking or water access
  const fishingProperties = properties?.filter(p => p.boat_parking || p.title.toLowerCase().includes('water')) || [];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Fishing Accommodation Mallacoota | Boat Parking & Water Access"
        description="Premium fishing holiday rentals in Mallacoota with boat parking, direct water access, and fish cleaning facilities. Perfect base for East Gippsland fishing adventures."
        canonical="https://hammondproperties.com.au/mallacoota-fishing-accommodation"
        ogImage="https://hammondproperties.com.au/images/mallacoota-fishing-hero.jpg"
      />
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
          <div
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
              isLoaded ? 'scale-100' : 'scale-105'
            }`}
            style={{ backgroundImage: 'url("/images/mallacoota-fishing-hero.jpg")' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-5xl mx-auto">
              <Badge className="mb-6 bg-white/20 backdrop-blur-sm text-white border-white/30 text-base px-4 py-2">
                <Fish className="w-4 h-4 mr-2 inline" />
                World-Class Fishing Destination
              </Badge>
              <h1 className={`text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 transition-all duration-800 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                Fishing Accommodation in Mallacoota
              </h1>
              <p className={`text-xl md:text-2xl mb-8 leading-relaxed transition-all duration-800 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                Premium holiday rentals with boat parking, water access, and fish cleaning facilities.
                Your perfect base for East Gippsland fishing adventures.
              </p>
              <div className={`flex flex-wrap gap-4 justify-center transition-all duration-800 delay-400 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <Button asChild size="lg" className="text-lg px-8 py-6">
                  <Link to="/properties">View Fishing Properties</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-gray-900">
                  <Link to="/contact">Plan Fishing Trip</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Mallacoota for Fishing */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 text-center">
                World-Class Fishing in East Gippsland
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                <p className="text-xl mb-6">
                  Mallacoota is renowned as one of Australia's premier fishing destinations, offering exceptional year-round fishing opportunities in the pristine waters of East Gippsland. From flathead and bream in the tranquil inlet to kingfish and tuna offshore, Mallacoota delivers unforgettable fishing experiences for anglers of all skill levels.
                </p>
                <p className="mb-6">
                  Our premium fishing accommodation puts you within minutes of Mallacoota's best fishing spots. Whether you're beach fishing at Betka Beach, casting from the Main Wharf, exploring the expansive Mallacoota Inlet, or venturing offshore into the Pacific, you'll enjoy the perfect blend of luxury waterfront accommodation and world-class fishing access.
                </p>
                <p>
                  Hammond Properties offers specialized fishing holiday rentals featuring boat parking, trailer storage, water access for easy boat launching, fish cleaning facilities, and outdoor areas perfect for preparing your catch. Many of our coastal properties provide direct inlet access, making early morning fishing trips effortless.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Fishing Features */}
        <section className="py-20 bg-gradient-to-b from-luxury-cream/30 to-white">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-12 text-center">
              Perfect for Fishing Holidays
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Anchor,
                  title: "Boat Parking & Storage",
                  description: "Secure boat parking, trailer storage, and easy water access for launching. Many properties offer direct inlet access for hassle-free fishing trips."
                },
                {
                  icon: Fish,
                  title: "Fish Cleaning Facilities",
                  description: "Outdoor fish cleaning areas, preparation spaces, and storage. Perfect for processing your catch with all the amenities you need."
                },
                {
                  icon: Waves,
                  title: "Water Access & Location",
                  description: "Walking distance to Main Wharf, Betka Beach, and inlet fishing spots. Minutes from boat ramps and offshore launch points."
                }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="card-luxury text-center hover:shadow-lg transition-shadow">
                    <CardContent className="pt-8">
                      <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-primary mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Fishing Properties */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
                Featured Fishing Properties
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Handpicked waterfront rentals perfect for fishing holidays in Mallacoota
              </p>
            </div>

            {propertiesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="aspect-video bg-gray-200"></div>
                    <CardContent className="p-6">
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="h-20 bg-gray-200 rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {fishingProperties.slice(0, 3).map((property) => (
                  <Card key={property.slug} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={property.heroImageUrl || getPropertyFallbackImage(property.imageFolder)}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = getPropertyFallbackImage(property.imageFolder);
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-serif font-bold">{property.title}</h3>
                        {property.boat_parking && (
                          <Badge className="mt-2 bg-white/20 backdrop-blur-sm border-white/30">
                            <Anchor className="w-3 h-3 mr-1" />
                            Boat Parking
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {property.excerpt}
                      </p>
                      <div className="flex gap-2 mb-4 flex-wrap">
                        <Badge variant="outline">{property.bedrooms} Bedrooms</Badge>
                        <Badge variant="outline">Sleeps {property.guests}</Badge>
                      </div>
                      <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                        <Link to={`/properties/${property.slug}`}>View Property</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link to="/properties">View All Properties</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Fishing Spots & Seasons */}
        <section className="py-20 bg-gradient-to-b from-luxury-cream/30 to-white">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-12 text-center">
              Fishing Spots & Best Seasons
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="card-luxury">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-2xl font-semibold text-primary mb-4">Prime Fishing Locations</h3>
                      <ul className="space-y-3 text-muted-foreground">
                        <li><strong>Mallacoota Inlet:</strong> Flathead, bream, whiting, and mullet year-round</li>
                        <li><strong>Main Wharf:</strong> Salmon, mullet, and tailor from the pier</li>
                        <li><strong>Betka Beach:</strong> Surf fishing for salmon, tailor, and flathead</li>
                        <li><strong>Offshore:</strong> Kingfish, tuna, snapper, and morwong in deeper waters</li>
                        <li><strong>Estuary Mouths:</strong> Bream, flathead, and jewfish during tide changes</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-luxury">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <Calendar className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-2xl font-semibold text-primary mb-4">Seasonal Fishing Guide</h3>
                      <ul className="space-y-3 text-muted-foreground">
                        <li><strong>Summer (Dec-Feb):</strong> Peak season for kingfish, tuna, and beach fishing</li>
                        <li><strong>Autumn (Mar-May):</strong> Excellent flathead and bream fishing in the inlet</li>
                        <li><strong>Winter (Jun-Aug):</strong> Prime time for offshore fishing and inlet species</li>
                        <li><strong>Spring (Sep-Nov):</strong> Salmon runs, increased activity, perfect conditions</li>
                        <li><strong>Year-Round:</strong> Consistent flathead and bream fishing in Mallacoota waters</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection
          title="Fishing Accommodation FAQs"
          faqs={[
            {
              question: "Do your properties have boat parking and storage?",
              answer: "Yes! Many of our fishing-friendly properties feature secure boat parking, trailer storage, and easy water access. We can recommend specific properties based on your boat size and fishing needs."
            },
            {
              question: "Are there fish cleaning facilities available?",
              answer: "Several of our properties include outdoor fish cleaning areas with running water, preparation surfaces, and proper drainage. We'll ensure your accommodation has the facilities needed to process your catch comfortably."
            },
            {
              question: "How close are the properties to fishing spots?",
              answer: "Most of our waterfront properties are within walking distance of the Main Wharf and inlet fishing spots. Some properties offer direct water access for launching boats. All are within 5-10 minutes drive of boat ramps and major fishing locations."
            },
            {
              question: "What fishing species are available in Mallacoota?",
              answer: "Mallacoota offers diverse fishing: flathead, bream, whiting, and mullet in the inlet; salmon, tailor, and flathead from beaches; kingfish, tuna, snapper, and morwong offshore. Year-round opportunities for all skill levels in East Gippsland waters."
            },
            {
              question: "When is the best time for fishing in Mallacoota?",
              answer: "Mallacoota provides excellent fishing year-round. Summer is peak for offshore species like kingfish and tuna. Autumn and spring offer great inlet fishing for flathead and bream. Winter is ideal for beach fishing and offshore adventures. Each season brings unique opportunities."
            },
            {
              question: "Do I need a fishing license in Victoria?",
              answer: "Yes, recreational fishing in Victoria requires a valid fishing license. Licenses can be purchased online through the Victorian Fisheries Authority or at local retailers in Mallacoota. We provide detailed information about regulations and license requirements with your booking."
            },
            {
              question: "Can you recommend fishing charters or guides?",
              answer: "Absolutely! We work with experienced local fishing charters and guides who know Mallacoota waters intimately. Whether you want offshore adventures, inlet fishing, or guided beach sessions, our concierge can arrange professional charter services to enhance your fishing holiday."
            },
            {
              question: "Are your fishing properties suitable for families?",
              answer: "Yes! Our fishing accommodation caters to families with children. Many properties near calm inlet waters are perfect for teaching kids to fish. We can recommend family-friendly fishing spots and properties with safe water access for young anglers to learn and enjoy."
            }
          ]}
        />

        {/* CTA Section */}
        <section className="relative py-24 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url("/images/mallacoota-inlet-sunset.jpg")' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
          <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Plan Your Fishing Holiday Today
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Secure your premium fishing accommodation in Mallacoota. Local expertise, exceptional properties, unforgettable fishing adventures.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Link to="/properties">Browse Properties</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-white text-white hover:bg-white hover:text-primary">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MallacootaFishing;
