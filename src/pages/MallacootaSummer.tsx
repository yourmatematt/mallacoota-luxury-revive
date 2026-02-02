import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sun, Waves, Calendar, MapPin, Star, Umbrella } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import { useSignatureProperties } from "@/hooks/useSignatureProperties";
import { getPropertyFallbackImage } from "@/lib/imageUtils";

const MallacootaSummer = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { data: properties, isLoading: propertiesLoading } = useSignatureProperties();

  useEffect(() => {
    setIsLoaded(true);

    // SEO: Structured Data - CollectionPage for Summer Landing Page
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": "https://hammondproperties.com.au/mallacoota-summer-holidays#collectionpage",
          "name": "Summer Holidays Mallacoota 2026",
          "description": "Premium summer holiday accommodation in Mallacoota. Beach access, swimming, water sports, and coastal activities. Book your East Gippsland summer getaway.",
          "url": "https://hammondproperties.com.au/mallacoota-summer-holidays",
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
          "@id": "https://hammondproperties.com.au/mallacoota-summer-holidays#breadcrumb",
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
              "name": "Summer Holidays"
            }
          ]
        }
      ]
    };

    let schemaScript = document.querySelector('#summer-page-structured-data');
    if (schemaScript) {
      schemaScript.textContent = JSON.stringify(structuredData);
    } else {
      schemaScript = document.createElement('script');
      schemaScript.id = 'summer-page-structured-data';
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
      const script = document.querySelector('#summer-page-structured-data');
      if (script) script.remove();
    };
  }, []);

  // Filter properties with beach or water views
  const summerProperties = properties?.filter(p =>
    p.title.toLowerCase().includes('beach') ||
    p.title.toLowerCase().includes('view') ||
    p.title.toLowerCase().includes('water')
  ) || [];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Summer Holidays Mallacoota 2026 | Beach Rentals & Water Activities"
        description="Premium summer holiday accommodation in Mallacoota. Beach access, swimming, water sports, and coastal activities. Book your East Gippsland summer getaway."
        canonical="https://hammondproperties.com.au/mallacoota-summer-holidays"
        ogImage="https://hammondproperties.com.au/images/mallacoota-summer-hero.jpg"
      />
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
          <div
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
              isLoaded ? 'scale-100' : 'scale-105'
            }`}
            style={{ backgroundImage: 'url("/images/mallacoota-summer-hero.jpg")' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-5xl mx-auto">
              <Badge className="mb-6 bg-white/20 backdrop-blur-sm text-white border-white/30 text-base px-4 py-2">
                <Sun className="w-4 h-4 mr-2 inline" />
                Peak Season Paradise
              </Badge>
              <h1 className={`text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 transition-all duration-800 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                Summer Holidays in Mallacoota
              </h1>
              <p className={`text-xl md:text-2xl mb-8 leading-relaxed transition-all duration-800 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                Premium beach rentals with direct beach access, swimming, water sports, and endless sunshine.
                Your perfect East Gippsland summer escape awaits.
              </p>
              <div className={`flex flex-wrap gap-4 justify-center transition-all duration-800 delay-400 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <Button asChild size="lg" className="text-lg px-8 py-6">
                  <Link to="/properties">View Summer Rentals</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-gray-900">
                  <Link to="/contact">Book Summer 2026</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Summer in Mallacoota */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 text-center">
                Experience Summer on the Coast
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                <p className="text-xl mb-6">
                  Mallacoota transforms into a vibrant coastal paradise during summer, offering pristine beaches, crystal-clear waters, and perfect weather for outdoor adventures. With average temperatures in the mid-20s, calm seas, and long sunny days, summer in East Gippsland delivers the quintessential Australian beach holiday experience. From swimming at patrolled beaches to exploring hidden coves by kayak, summer is peak season for water-based activities.
                </p>
                <p className="mb-6">
                  Our premium summer holiday rentals provide the ideal base for beach lovers and water sports enthusiasts. Wake to morning swims in the inlet, spend days on pristine beaches, enjoy sunset kayaking, and return to comfortable, well-equipped accommodation with outdoor entertaining areas. Many properties feature air conditioning, outdoor showers for rinsing after beach visits, and spacious decks perfect for summer entertaining and alfresco dining.
                </p>
                <p>
                  The summer season brings Mallacoota to life with community events, markets, live music, and bustling cafes. Families gather at patrolled beaches, fishing enthusiasts target summer species like kingfish and tuna, and kayakers explore the expansive inlet system in perfect conditions. Book early for peak periods including Christmas, New Year, and January school holidays to secure your slice of summer paradise in this sought-after coastal destination.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Summer Features */}
        <section className="py-20 bg-gradient-to-b from-luxury-cream/30 to-white">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-12 text-center">
              Perfect for Summer Holidays
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Waves,
                  title: "Beach & Water Activities",
                  description: "Swimming at patrolled beaches, kayaking in calm inlet waters, stand-up paddleboarding, surfing, snorkeling, and endless water sports in perfect summer conditions."
                },
                {
                  icon: Sun,
                  title: "Outdoor Entertainment",
                  description: "Properties with outdoor living spaces, BBQ facilities, private decks, and gardens. Enjoy alfresco dining, sunset drinks, and summer entertaining in comfort."
                },
                {
                  icon: Umbrella,
                  title: "Summer Events & Atmosphere",
                  description: "Local markets, live music, community festivals, and vibrant summer energy. Experience Mallacoota at its most lively and welcoming during peak season."
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

        {/* Featured Summer Properties */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
                Summer Holiday Rentals
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Premium beach accommodation for your summer getaway in Mallacoota
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
                {summerProperties.slice(0, 3).map((property) => (
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
                        <Badge className="mt-2 bg-white/20 backdrop-blur-sm border-white/30">
                          <Sun className="w-3 h-3 mr-1" />
                          Beach Access
                        </Badge>
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

        {/* Summer Activities & Events */}
        <section className="py-20 bg-gradient-to-b from-luxury-cream/30 to-white">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-12 text-center">
              Summer Activities & Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="card-luxury">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-2xl font-semibold text-primary mb-4">Water Sports & Beach Fun</h3>
                      <ul className="space-y-3 text-muted-foreground">
                        <li><strong>Patrolled Swimming:</strong> Bastion Point Beach with lifeguards during peak season</li>
                        <li><strong>Kayaking & SUP:</strong> Perfect inlet conditions for paddling adventures</li>
                        <li><strong>Snorkeling:</strong> Clear summer waters revealing vibrant marine life</li>
                        <li><strong>Beach Games:</strong> Volleyball, cricket, frisbee on pristine sand</li>
                        <li><strong>Offshore Fishing:</strong> Peak season for kingfish, tuna, and snapper</li>
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
                      <h3 className="text-2xl font-semibold text-primary mb-4">Summer Events & Experiences</h3>
                      <ul className="space-y-3 text-muted-foreground">
                        <li><strong>New Year's Eve:</strong> Fireworks and celebrations over Mallacoota Inlet</li>
                        <li><strong>Summer Markets:</strong> Local produce, crafts, and artisan goods</li>
                        <li><strong>Live Music:</strong> Outdoor concerts and performances at local venues</li>
                        <li><strong>Coastal Walks:</strong> Scenic trails with wildflowers and ocean views</li>
                        <li><strong>Wildlife Encounters:</strong> Dolphin watching, seal spotting in peak activity</li>
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
          title="Summer Holiday FAQs"
          faqs={[
            {
              question: "When should I book for summer holidays in Mallacoota?",
              answer: "Book as early as possible for peak summer periods. Christmas, New Year, and January school holidays fill up 6-12 months in advance. For best selection of premium properties during summer 2026, we recommend booking by mid-2025. Contact us early to secure your preferred dates and accommodation."
            },
            {
              question: "What's the weather like in summer?",
              answer: "Mallacoota enjoys beautiful summer weather with average temperatures of 22-26°C. Expect warm, sunny days perfect for beach activities, cool ocean breezes, and comfortable evenings. December to February offers the most reliable beach weather with long daylight hours ideal for outdoor adventures and water sports in East Gippsland."
            },
            {
              question: "Are beaches patrolled during summer?",
              answer: "Yes! Bastion Point Beach is patrolled by surf lifesavers during the peak summer season, typically from late December through January. This main swimming beach offers safe, supervised swimming for families. Other beaches around Mallacoota provide excellent swimming in calmer inlet waters throughout summer."
            },
            {
              question: "What summer activities are available in Mallacoota?",
              answer: "Summer offers endless activities: swimming at patrolled beaches, kayaking and SUP on the inlet, snorkeling in clear waters, offshore fishing for premium species, coastal walks, wildlife spotting, beach games, markets, live music events, and water sports. The warm weather and calm conditions make summer ideal for all coastal activities."
            },
            {
              question: "Do properties have air conditioning for summer?",
              answer: "Many of our properties feature air conditioning, ceiling fans, or split systems for summer comfort. Mallacoota's coastal location provides natural sea breezes that keep temperatures comfortable. We can recommend properties with specific cooling features to ensure your summer stay is comfortable during warmer days."
            },
            {
              question: "What should I bring for a summer holiday in Mallacoota?",
              answer: "Pack beach essentials: sunscreen, hats, swimmers, beach towels, and sun protection. Bring snorkeling gear, kayaks if you have them, or arrange local rentals. Casual summer clothing, comfortable walking shoes, and evening layers for cooler nights. Our properties provide BBQs and outdoor furniture for summer entertaining. Book restaurant reservations early for peak periods."
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
              Book Your Summer Escape Today
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Secure your premium summer accommodation now. Peak season fills fast. Don't miss the best summer of your life.
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

export default MallacootaSummer;
