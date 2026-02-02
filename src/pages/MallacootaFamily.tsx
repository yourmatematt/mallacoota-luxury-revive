import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Palmtree, MapPin, Star, Smile } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import { useSignatureProperties } from "@/hooks/useSignatureProperties";
import { getPropertyFallbackImage } from "@/lib/imageUtils";

const MallacootaFamily = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { data: properties, isLoading: propertiesLoading } = useSignatureProperties();

  useEffect(() => {
    setIsLoaded(true);

    // SEO: Structured Data - CollectionPage for Family Landing Page
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": "https://hammondproperties.com.au/mallacoota-family-holidays#collectionpage",
          "name": "Family Holidays Mallacoota",
          "description": "Family-friendly holiday rentals in Mallacoota with safe beaches, playgrounds, wildlife, and activities. Perfect coastal family vacations in East Gippsland.",
          "url": "https://hammondproperties.com.au/mallacoota-family-holidays",
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
          "@id": "https://hammondproperties.com.au/mallacoota-family-holidays#breadcrumb",
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
              "name": "Family Holidays"
            }
          ]
        }
      ]
    };

    let schemaScript = document.querySelector('#family-page-structured-data');
    if (schemaScript) {
      schemaScript.textContent = JSON.stringify(structuredData);
    } else {
      schemaScript = document.createElement('script');
      schemaScript.id = 'family-page-structured-data';
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
      const script = document.querySelector('#family-page-structured-data');
      if (script) script.remove();
    };
  }, []);

  // Filter properties suitable for families (larger properties with 3+ bedrooms)
  const familyProperties = properties?.filter(p => p.bedrooms >= 3 || p.guests >= 6) || [];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Family Holidays Mallacoota | Kid-Friendly Accommodation & Activities"
        description="Family-friendly holiday rentals in Mallacoota with safe beaches, playgrounds, wildlife, and activities. Perfect coastal family vacations in East Gippsland."
        canonical="https://hammondproperties.com.au/mallacoota-family-holidays"
        ogImage="https://hammondproperties.com.au/images/mallacoota-family-hero.jpg"
      />
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
          <div
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
              isLoaded ? 'scale-100' : 'scale-105'
            }`}
            style={{ backgroundImage: 'url("/images/mallacoota-family-hero.jpg")' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-5xl mx-auto">
              <Badge className="mb-6 bg-white/20 backdrop-blur-sm text-white border-white/30 text-base px-4 py-2">
                <Heart className="w-4 h-4 mr-2 inline" />
                Perfect Family Destination
              </Badge>
              <h1 className={`text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 transition-all duration-800 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                Family Holidays in Mallacoota
              </h1>
              <p className={`text-xl md:text-2xl mb-8 leading-relaxed transition-all duration-800 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                Kid-friendly accommodation with safe beaches, calm inlet waters, and endless activities.
                Create unforgettable family memories on the East Gippsland coast.
              </p>
              <div className={`flex flex-wrap gap-4 justify-center transition-all duration-800 delay-400 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <Button asChild size="lg" className="text-lg px-8 py-6">
                  <Link to="/properties">View Family Properties</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-gray-900">
                  <Link to="/contact">Plan Family Holiday</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Mallacoota for Families */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 text-center">
                The Perfect Coastal Family Getaway
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                <p className="text-xl mb-6">
                  Mallacoota is a family paradise where children can safely explore, play, and discover the wonders of nature. The calm, protected waters of the inlet provide the perfect environment for swimming, paddling, and water play, while pristine beaches offer endless opportunities for sandcastle building, rock pooling, and coastal adventures. This peaceful East Gippsland town delivers everything families need for a memorable seaside holiday.
                </p>
                <p className="mb-6">
                  Our family-friendly holiday rentals feature spacious layouts, fully equipped kitchens, outdoor entertainment areas, and comfortable living spaces designed for families. Many properties offer fenced yards for younger children, games rooms for rainy days, and proximity to playgrounds, beaches, and family attractions. Parents can relax knowing children can play safely while enjoying the natural beauty of coastal Victoria.
                </p>
                <p>
                  From feeding friendly kangaroos to spotting dolphins in the inlet, collecting shells on uncrowded beaches to exploring rock pools teeming with marine life, Mallacoota creates magical childhood memories. The town's welcoming community, safe environment, and abundance of kid-friendly activities make it the ideal destination for multi-generational holidays, school holiday adventures, and quality family time away from everyday routines.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Family Features */}
        <section className="py-20 bg-gradient-to-b from-luxury-cream/30 to-white">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-12 text-center">
              Why Families Love Mallacoota
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Users,
                  title: "Safe Beaches & Calm Waters",
                  description: "Protected inlet beaches with gentle waves perfect for young swimmers. Lifeguard-patrolled beaches during summer and shallow areas ideal for paddling and play."
                },
                {
                  icon: Smile,
                  title: "Wildlife & Nature Discovery",
                  description: "Kangaroos, friendly parrots, dolphins, seals, and diverse birdlife. Children love feeding wildlife, exploring rock pools, and discovering coastal ecosystems."
                },
                {
                  icon: Palmtree,
                  title: "Playgrounds & Activities",
                  description: "Multiple playgrounds, walking trails, kayaking for families, mini golf, and nature-based activities. Endless entertainment for all ages year-round."
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

        {/* Featured Family Properties */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
                Family-Friendly Properties
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Spacious accommodation perfect for family holidays in Mallacoota
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
                {familyProperties.slice(0, 3).map((property) => (
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
                          <Users className="w-3 h-3 mr-1" />
                          Sleeps {property.guests}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {property.excerpt}
                      </p>
                      <div className="flex gap-2 mb-4 flex-wrap">
                        <Badge variant="outline">{property.bedrooms} Bedrooms</Badge>
                        <Badge variant="outline">Family-Friendly</Badge>
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

        {/* Family Activities Guide */}
        <section className="py-20 bg-gradient-to-b from-luxury-cream/30 to-white">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-12 text-center">
              Family Activities & Attractions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="card-luxury">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-2xl font-semibold text-primary mb-4">Beach & Water Activities</h3>
                      <ul className="space-y-3 text-muted-foreground">
                        <li><strong>Bastion Point:</strong> Safe swimming beach with calm waters and playground</li>
                        <li><strong>Inlet Beaches:</strong> Shallow, protected areas perfect for young children</li>
                        <li><strong>Kayaking & Paddling:</strong> Family kayak tours and calm inlet exploration</li>
                        <li><strong>Rock Pooling:</strong> Discover marine life in tidal pools at low tide</li>
                        <li><strong>Sandcastle Building:</strong> Pristine beaches with perfect building sand</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-luxury">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <Star className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-2xl font-semibold text-primary mb-4">Nature & Adventure</h3>
                      <ul className="space-y-3 text-muted-foreground">
                        <li><strong>Wildlife Spotting:</strong> Kangaroos, dolphins, seals, and native birds</li>
                        <li><strong>Walking Trails:</strong> Easy family-friendly bushwalks and coastal paths</li>
                        <li><strong>Playgrounds:</strong> Multiple modern playgrounds throughout town</li>
                        <li><strong>Bike Riding:</strong> Safe cycling paths and quiet streets for families</li>
                        <li><strong>Fishing for Kids:</strong> Learn to fish in safe inlet waters with easy access</li>
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
          title="Family Holiday FAQs"
          faqs={[
            {
              question: "Is Mallacoota safe for young children?",
              answer: "Yes! Mallacoota is exceptionally safe for families with young children. The inlet's calm, protected waters provide gentle swimming conditions, beaches are uncrowded, and the community is welcoming. Many inlet beaches have shallow areas perfect for toddlers, and Bastion Point Beach is patrolled during summer holidays."
            },
            {
              question: "What are the best beaches for families with kids?",
              answer: "Bastion Point is ideal with its calm waters, playground, and facilities. Inlet beaches like Secret Beach offer shallow, protected swimming perfect for young children. Betka Beach provides gentle surf and rock pools for exploring. All beaches are easily accessible and family-friendly throughout East Gippsland."
            },
            {
              question: "Are there playgrounds and activities for children?",
              answer: "Yes! Mallacoota features several excellent playgrounds including the waterfront playground near Bastion Point. Activities include mini golf, kayaking, wildlife spotting, nature walks, beach play, and seasonal events. The Mallacoota Inlet Discovery Centre offers educational programs for children during school holidays."
            },
            {
              question: "Can we see wildlife with children in Mallacoota?",
              answer: "Absolutely! Children love encountering Mallacoota's abundant wildlife. Kangaroos graze near accommodation, friendly rainbow lorikeets visit for feeding, dolphins are frequently spotted in the inlet, and seals often appear near beaches. Rock pools reveal starfish, crabs, and small fish. Wildlife encounters create magical family memories."
            },
            {
              question: "Do your properties have family-friendly amenities?",
              answer: "Yes! Our family properties feature fully equipped kitchens, multiple bathrooms, spacious living areas, outdoor spaces, and entertainment options. Many include games, books, and toys. Some properties offer fenced yards, highchairs, and portacots. We can recommend properties matching your family's specific needs and ages."
            },
            {
              question: "What should we bring for a family holiday in Mallacoota?",
              answer: "Pack beach essentials including sunscreen, hats, swimmers, and sand toys. Bring bikes if possible for exploring quiet streets. Our properties provide cooking facilities, so you can self-cater. Don't forget cameras for wildlife photos! We provide a comprehensive family packing list with your booking confirmation for East Gippsland holidays."
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
              Create Family Memories in Mallacoota
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Book your family-friendly accommodation today. Safe beaches, endless activities, unforgettable coastal experiences.
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

export default MallacootaFamily;
