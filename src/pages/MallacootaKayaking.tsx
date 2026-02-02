import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Waves, Compass, Sun, MapPin, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import { useSignatureProperties } from "@/hooks/useSignatureProperties";
import { getPropertyFallbackImage } from "@/lib/imageUtils";

const MallacootaKayaking = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { data: properties, isLoading: propertiesLoading } = useSignatureProperties();

  useEffect(() => {
    setIsLoaded(true);

    // SEO: Structured Data
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": "https://hammondproperties.com.au/mallacoota-kayaking-holidays#collectionpage",
          "name": "Kayaking Holidays in Mallacoota",
          "description": "Waterfront accommodation perfect for kayaking adventures in Mallacoota. Direct water access, kayak storage, and explore pristine East Gippsland waterways.",
          "url": "https://hammondproperties.com.au/mallacoota-kayaking-holidays",
          "inLanguage": "en-AU",
          "provider": {
            "@type": "LocalBusiness",
            "@id": "https://hammondproperties.com.au/#localbusiness"
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://hammondproperties.com.au/mallacoota-kayaking-holidays#breadcrumb",
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
              "name": "Kayaking Holidays"
            }
          ]
        }
      ]
    };

    let schemaScript = document.querySelector('#kayaking-page-structured-data');
    if (schemaScript) {
      schemaScript.textContent = JSON.stringify(structuredData);
    } else {
      schemaScript = document.createElement('script');
      schemaScript.id = 'kayaking-page-structured-data';
      schemaScript.type = 'application/ld+json';
      schemaScript.textContent = JSON.stringify(structuredData);
      document.head.appendChild(schemaScript);
    }

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
      const script = document.querySelector('#kayaking-page-structured-data');
      if (script) script.remove();
    };
  }, []);

  const waterfrontProperties = properties?.filter(p =>
    p.title.toLowerCase().includes('water') || p.title.toLowerCase().includes('view')
  ) || [];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Kayaking Holidays Mallacoota | Waterfront Accommodation & Water Access"
        description="Premium waterfront accommodation for kayaking holidays in Mallacoota. Direct water access, kayak storage, explore pristine East Gippsland waterways and hidden coves."
        canonical="https://hammondproperties.com.au/mallacoota-kayaking-holidays"
        ogImage="https://hammondproperties.com.au/images/mallacoota-kayaking-hero.jpg"
      />
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
          <div
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
              isLoaded ? 'scale-100' : 'scale-105'
            }`}
            style={{ backgroundImage: 'url("/images/mallacoota-kayaking-hero.jpg")' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-5xl mx-auto">
              <Badge className="mb-6 bg-white/20 backdrop-blur-sm text-white border-white/30 text-base px-4 py-2">
                <Waves className="w-4 h-4 mr-2 inline" />
                Pristine Waterways Await
              </Badge>
              <h1 className={`text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 transition-all duration-800 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                Kayaking Holidays in Mallacoota
              </h1>
              <p className={`text-xl md:text-2xl mb-8 leading-relaxed transition-all duration-800 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                Waterfront accommodation with direct water access and kayak storage.
                Explore East Gippsland's pristine inlet and discover hidden coastal coves.
              </p>
              <div className={`flex flex-wrap gap-4 justify-center transition-all duration-800 delay-400 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <Button asChild size="lg" className="text-lg px-8 py-6">
                  <Link to="/properties">View Waterfront Properties</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-gray-900">
                  <Link to="/contact">Plan Kayaking Trip</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Kayaking in Mallacoota */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 text-center">
                Discover Mallacoota by Kayak
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                <p className="text-xl mb-6">
                  Mallacoota's vast inlet system and sheltered waterways create a kayaking paradise in East Gippsland. Paddle through calm waters, explore hidden coves, encounter dolphins and seals, and discover pristine beaches accessible only by water. Whether you're a beginner seeking gentle inlet paddles or an experienced kayaker ready for coastal adventures, Mallacoota offers unforgettable paddling experiences.
                </p>
                <p className="mb-6">
                  Our waterfront holiday rentals provide the perfect base for kayaking holidays. Many properties offer direct water access, allowing you to launch from your accommodation and begin exploring immediately. Store your kayak securely, rinse equipment with fresh water, and return to luxury comfort after each paddling adventure.
                </p>
                <p>
                  Mallacoota Inlet spans over 1,000 hectares of protected waterways, featuring diverse ecosystems from mangrove forests to tidal marshes. Paddle past dramatic rock formations, spot rare seabirds, navigate peaceful channels, and experience the magic of sunrise kayaking on mirror-calm waters. The inlet's sheltered nature makes it ideal for all skill levels, while coastal options challenge experienced paddlers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Kayaking Features */}
        <section className="py-20 bg-gradient-to-b from-luxury-cream/30 to-white">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-12 text-center">
              Perfect for Kayaking Adventures
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Waves,
                  title: "Direct Water Access",
                  description: "Launch directly from waterfront properties. No trailers, no ramps—just step into your kayak and start exploring Mallacoota's pristine waterways."
                },
                {
                  icon: Compass,
                  title: "Kayak Storage & Facilities",
                  description: "Secure kayak storage, equipment rinsing stations, and outdoor drying areas. Everything you need to care for your gear between adventures."
                },
                {
                  icon: Sun,
                  title: "Sheltered & Safe Waters",
                  description: "Mallacoota Inlet's protected waters offer safe paddling for all skill levels. Perfect for beginners, families, and experienced kayakers seeking relaxation."
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

        {/* Featured Waterfront Properties */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
                Waterfront Kayaking Properties
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Premium accommodation with water access for kayaking adventures
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
                {waterfrontProperties.slice(0, 3).map((property) => (
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
                          <Waves className="w-3 h-3 mr-1" />
                          Water Access
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

        {/* Kayaking Spots Guide */}
        <section className="py-20 bg-gradient-to-b from-luxury-cream/30 to-white">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-12 text-center">
              Popular Kayaking Routes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="card-luxury">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-primary mb-6">Inlet Exploration Routes</h3>
                  <ul className="space-y-4 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <strong>Narrows Circuit:</strong> 2-hour paddle through scenic narrows with wildlife viewing
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <strong>Mangrove Channels:</strong> Wind through unique mangrove ecosystems and tidal flats
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <strong>Top Lake Adventure:</strong> Full-day paddle to pristine upper inlet areas
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <strong>Sunset Paddle:</strong> Evening routes with spectacular colors over calm waters
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="card-luxury">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-primary mb-6">Coastal & Advanced Routes</h3>
                  <ul className="space-y-4 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <strong>Betka Beach Launch:</strong> Coastal paddling with beach landings and surf play
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <strong>Rocky Point:</strong> Explore dramatic rock formations and sea caves
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <strong>Gabo Island:</strong> Advanced expedition to offshore lighthouse island
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <strong>Secret Coves:</strong> Hidden beaches accessible only by kayak in East Gippsland
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection
          title="Kayaking Holiday FAQs"
          faqs={[
            {
              question: "Can I store my kayak at the property?",
              answer: "Yes! Many of our waterfront properties offer secure kayak storage areas, covered spaces, and equipment rinsing facilities. We can recommend properties with the best kayaking amenities based on your needs."
            },
            {
              question: "Is Mallacoota Inlet suitable for beginner kayakers?",
              answer: "Absolutely! Mallacoota Inlet's sheltered, calm waters are perfect for beginners and families. The protected inlet offers safe paddling conditions with minimal currents, ideal for learning kayaking skills while enjoying beautiful East Gippsland scenery."
            },
            {
              question: "Do I need to bring my own kayak?",
              answer: "You can bring your own kayak or rent from local operators in Mallacoota. Several rental businesses offer single and double kayaks, stand-up paddleboards, and safety equipment. Our concierge can arrange rentals and provide local contact information."
            },
            {
              question: "What's the best time of year for kayaking in Mallacoota?",
              answer: "Kayaking in Mallacoota is excellent year-round. Summer offers warm weather and calm conditions. Autumn provides stunning colors and comfortable temperatures. Winter features clear days and quieter waters. Spring brings wildflowers and active wildlife. Each season offers unique paddling experiences."
            },
            {
              question: "Can I see dolphins and seals while kayaking?",
              answer: "Yes! Mallacoota's waters are home to resident bottlenose dolphins, Australian fur seals, and seasonal visitors like whales. Wildlife encounters are common, especially in early morning paddles. Always maintain respectful distances and follow wildlife viewing guidelines for East Gippsland marine life."
            },
            {
              question: "Are there guided kayak tours available?",
              answer: "Yes, professional kayak tour operators offer guided experiences including inlet explorations, sunrise paddles, wildlife tours, and multi-day adventures. Our concierge can recommend reputable operators and help arrange guided tours to enhance your Mallacoota kayaking holiday."
            },
            {
              question: "Is kayaking safe for children in Mallacoota?",
              answer: "Yes! The inlet's calm, protected waters make it very family-friendly for kayaking with children. We recommend double kayaks for younger kids, life jackets (always required), and starting with short paddles near shore. Many families enjoy successful kayaking adventures in Mallacoota's safe waters."
            },
            {
              question: "What should I bring for a kayaking holiday?",
              answer: "Essential items include sunscreen, hat, water, dry bag for belongings, change of clothes, and reef-safe sun protection. Life jackets are mandatory. Our properties provide equipment rinsing facilities. We provide a comprehensive kayaking packing list with your accommodation confirmation."
            }
          ]}
        />

        {/* CTA Section */}
        <section className="relative py-24 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url("/images/mallacoota-kayaking-sunset.jpg")' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
          <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Book Your Kayaking Adventure
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Waterfront luxury meets paddling paradise. Experience Mallacoota's pristine waters from premium accommodation.
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

export default MallacootaKayaking;
