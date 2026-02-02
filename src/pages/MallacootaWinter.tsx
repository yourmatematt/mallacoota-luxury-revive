import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Snowflake, Flame, Eye, MapPin, Star, Coffee } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import { useSignatureProperties } from "@/hooks/useSignatureProperties";
import { getPropertyFallbackImage } from "@/lib/imageUtils";

const MallacootaWinter = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { data: properties, isLoading: propertiesLoading } = useSignatureProperties();

  useEffect(() => {
    setIsLoaded(true);

    // SEO: Structured Data - CollectionPage for Winter Landing Page
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": "https://hammondproperties.com.au/mallacoota-winter-getaway#collectionpage",
          "name": "Winter Getaway Mallacoota",
          "description": "Winter escapes in Mallacoota with cozy fireplaces, whale watching, peaceful beaches, and off-peak luxury. Experience tranquil East Gippsland winters.",
          "url": "https://hammondproperties.com.au/mallacoota-winter-getaway",
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
          "@id": "https://hammondproperties.com.au/mallacoota-winter-getaway#breadcrumb",
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
              "name": "Winter Getaway"
            }
          ]
        }
      ]
    };

    let schemaScript = document.querySelector('#winter-page-structured-data');
    if (schemaScript) {
      schemaScript.textContent = JSON.stringify(structuredData);
    } else {
      schemaScript = document.createElement('script');
      schemaScript.id = 'winter-page-structured-data';
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
      const script = document.querySelector('#winter-page-structured-data');
      if (script) script.remove();
    };
  }, []);

  // Filter cozy properties (all properties work for winter, prioritize variety)
  const winterProperties = properties?.slice(0, 6) || [];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Winter Getaway Mallacoota | Cozy Coastal Retreats & Whale Watching"
        description="Winter escapes in Mallacoota with cozy fireplaces, whale watching, peaceful beaches, and off-peak luxury. Experience tranquil East Gippsland winters."
        canonical="https://hammondproperties.com.au/mallacoota-winter-getaway"
        ogImage="https://hammondproperties.com.au/images/mallacoota-winter-hero.jpg"
      />
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
          <div
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
              isLoaded ? 'scale-100' : 'scale-105'
            }`}
            style={{ backgroundImage: 'url("/images/mallacoota-winter-hero.jpg")' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-5xl mx-auto">
              <Badge className="mb-6 bg-white/20 backdrop-blur-sm text-white border-white/30 text-base px-4 py-2">
                <Snowflake className="w-4 h-4 mr-2 inline" />
                Peaceful Off-Season Paradise
              </Badge>
              <h1 className={`text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 transition-all duration-800 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                Winter Getaway in Mallacoota
              </h1>
              <p className={`text-xl md:text-2xl mb-8 leading-relaxed transition-all duration-800 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                Cozy coastal retreats with fireplaces, whale watching season, tranquil beaches, and off-peak luxury.
                Discover the magic of East Gippsland winters.
              </p>
              <div className={`flex flex-wrap gap-4 justify-center transition-all duration-800 delay-400 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <Button asChild size="lg" className="text-lg px-8 py-6">
                  <Link to="/properties">View Cozy Retreats</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-gray-900">
                  <Link to="/contact">Plan Winter Escape</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Winter in Mallacoota */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 text-center">
                Experience Mallacoota's Tranquil Winter
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                <p className="text-xl mb-6">
                  Winter in Mallacoota reveals a different kind of coastal magic. With mild temperatures averaging 12-16°C, crisp clear days, and virtually deserted beaches, winter offers peaceful solitude perfect for relaxation and reflection. This is when locals truly appreciate their paradise, enjoying long beach walks without crowds, cozy evenings by the fire, and spectacular whale watching as humpback and southern right whales migrate along the East Gippsland coast.
                </p>
                <p className="mb-6">
                  Our luxury winter accommodations feature fireplaces, wood heaters, comfortable indoor living spaces, and premium heating systems. Imagine waking to misty inlet views, enjoying coffee by a crackling fire, exploring empty beaches in crisp winter sunshine, and returning to warm, inviting comfort. Many properties offer enclosed sunrooms, heated indoor spaces, and cozy reading nooks perfect for winter relaxation and unwinding from daily stresses.
                </p>
                <p>
                  Winter is prime time for fishing enthusiasts, with excellent offshore conditions and reduced competition for popular spots. The cooler months bring clear skies ideal for stargazing, peaceful kayaking on calm inlet waters, and invigorating coastal walks through pristine wilderness. Off-peak rates, greater property availability, and the intimate experience of having beaches to yourself make winter the secret season for those seeking authentic coastal serenity in Mallacoota.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Winter Features */}
        <section className="py-20 bg-gradient-to-b from-luxury-cream/30 to-white">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-12 text-center">
              Perfect for Winter Escapes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Flame,
                  title: "Cozy Fireplaces & Heating",
                  description: "Wood fireplaces, slow combustion heaters, and modern heating systems. Enjoy warm, inviting comfort with crackling fires and cozy indoor living spaces."
                },
                {
                  icon: Eye,
                  title: "Whale Watching Season",
                  description: "June to November brings migrating humpback and southern right whales. Witness these majestic creatures from beaches and coastal vantage points during their annual journey."
                },
                {
                  icon: Coffee,
                  title: "Peaceful & Private",
                  description: "Uncrowded beaches, tranquil atmosphere, and authentic local experience. Enjoy Mallacoota at its most serene with off-peak luxury and greater property availability."
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

        {/* Featured Winter Properties */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
                Cozy Winter Retreats
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Warm, inviting accommodation perfect for winter getaways in Mallacoota
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
                {winterProperties.slice(0, 3).map((property) => (
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
                          <Flame className="w-3 h-3 mr-1" />
                          Cozy Retreat
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

        {/* Winter Activities Guide */}
        <section className="py-20 bg-gradient-to-b from-luxury-cream/30 to-white">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-12 text-center">
              Winter Activities & Experiences
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="card-luxury">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-2xl font-semibold text-primary mb-4">Outdoor Winter Adventures</h3>
                      <ul className="space-y-3 text-muted-foreground">
                        <li><strong>Whale Watching:</strong> Spot migrating whales from coastal lookouts and beaches</li>
                        <li><strong>Beach Walks:</strong> Peaceful, uncrowded beaches perfect for long walks</li>
                        <li><strong>Winter Fishing:</strong> Excellent offshore conditions with less competition</li>
                        <li><strong>Coastal Hiking:</strong> Crisp, clear days ideal for wilderness trails</li>
                        <li><strong>Kayaking:</strong> Calm inlet waters and tranquil paddling experiences</li>
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
                      <h3 className="text-2xl font-semibold text-primary mb-4">Cozy Indoor Experiences</h3>
                      <ul className="space-y-3 text-muted-foreground">
                        <li><strong>Fireside Relaxation:</strong> Curl up with books by crackling wood fires</li>
                        <li><strong>Local Cafes:</strong> Warm coffee spots and hearty winter menus</li>
                        <li><strong>Stargazing:</strong> Clear winter skies reveal spectacular star displays</li>
                        <li><strong>Wildlife Viewing:</strong> Bird watching from warm indoor comfort</li>
                        <li><strong>Scenic Drives:</strong> Explore East Gippsland without summer crowds</li>
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
          title="Winter Getaway FAQs"
          faqs={[
            {
              question: "What's the weather like in winter?",
              answer: "Mallacoota enjoys mild coastal winters with daytime temperatures averaging 12-16°C. Expect crisp, clear days perfect for outdoor activities, cool evenings ideal for fireside relaxation, and minimal rainfall. Winter weather is generally sunny and pleasant, far milder than inland Victoria. Pack layers for variable temperatures and comfortable indoor warmth."
            },
            {
              question: "Is winter a good time to visit Mallacoota?",
              answer: "Absolutely! Winter offers unique advantages: uncrowded beaches, peaceful atmosphere, whale watching opportunities, excellent fishing conditions, off-peak accommodation rates, and authentic local experiences. Many visitors prefer winter's tranquility, making it the secret season for those seeking genuine coastal relaxation away from summer crowds in East Gippsland."
            },
            {
              question: "Can I see whales during winter in Mallacoota?",
              answer: "Yes! June to November is prime whale watching season as humpback and southern right whales migrate along the coast. Witness these magnificent creatures from coastal vantage points, beaches, and headlands. Clear winter days provide excellent visibility for spotting whales breaching and tail slapping during their annual migration journey."
            },
            {
              question: "Do properties have heating and fireplaces?",
              answer: "Many of our properties feature wood fireplaces, slow combustion heaters, reverse cycle air conditioning, or other heating systems perfect for winter comfort. We specifically recommend properties with cozy indoor spaces, fireplaces, and excellent heating for winter getaways. Enjoy crackling fires and warm, inviting accommodation during cooler months."
            },
            {
              question: "What activities are available in winter?",
              answer: "Winter offers diverse activities: whale watching from coastal lookouts, peaceful beach walks, excellent fishing in offshore waters, kayaking on calm inlets, scenic coastal hikes, wildlife spotting, stargazing on clear nights, cozy cafe visits, and exploring Mallacoota without crowds. Winter's tranquility enhances nature-based experiences and relaxation."
            },
            {
              question: "Are there discounts for winter accommodation?",
              answer: "Yes! Winter is our off-peak season with more competitive rates compared to summer. Enjoy better value, greater property availability, and special offers for longer stays. Mid-week bookings often receive additional discounts. Contact us to discuss winter specials and find the perfect cozy retreat for your East Gippsland winter escape."
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
              Book Your Winter Retreat
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Experience coastal tranquility this winter. Cozy comfort, whale watching, peaceful beaches, and off-peak luxury await.
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

export default MallacootaWinter;
