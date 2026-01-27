import React, { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PropertyGrid from "@/components/PropertyGrid";
import WhyChooseUs from "@/components/WhyChooseUs";
import DiscoverSection from "@/components/DiscoverSection";
import TestimonialsHorizontalTicker from "@/components/TestimonialsHorizontalTicker";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import SEOHead from "@/components/SEOHead";
import { getAvailablePropertySlugs } from "@/data/propertyContent";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSignatureProperties } from "@/hooks/useSignatureProperties";
import { getPropertyFallbackImage } from "@/lib/imageUtils";

const Index = () => {
  const { data: signatureProperties, isLoading: propertiesLoading } = useSignatureProperties();
  // Set homepage structured data and additional meta tags
  useEffect(() => {
    // Structured data for Organization
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      "name": "Hammond Properties",
      "alternateName": "Hammond Properties Mallacoota",
      "description": "Premium holiday rentals in Mallacoota with waterfront views, luxury amenities, and 32 insider guides to help you explore. Local expertise since day one. Come as guests. Leave as family.",
      "url": "https://hammondproperties.com.au",
      "logo": "https://hammondproperties.com.au/images/hammond-properties-logo.jpg",
      "image": "https://hammondproperties.com.au/images/hammond-properties-og.jpg",
      "telephone": "+61401825547", 
      "email": "amelia@hammondproperties.com.au",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mallacoota",
        "addressRegion": "Victoria",
        "addressCountry": "AU"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-37.5667",
        "longitude": "149.7333"
      },
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": "-37.5667",
          "longitude": "149.7333"
        },
        "geoRadius": "10000"
      },
      "priceRange": "$$$",
      "amenityFeature": [
        {
          "@type": "LocationFeatureSpecification",
          "name": "Pet Friendly Options"
        },
        {
          "@type": "LocationFeatureSpecification", 
          "name": "Lake Views"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Ocean Views"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Boat Parking"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "WiFi"
        }
      ],
      "sameAs": [
        "https://www.facebook.com/hammondproperties", // Add real social links
        "https://www.instagram.com/hammondproperties"
      ]
    };

    // Add structured data script
    let structuredDataScript = document.querySelector('#homepage-structured-data');
    if (structuredDataScript) {
      structuredDataScript.textContent = JSON.stringify(structuredData);
    } else {
      structuredDataScript = document.createElement('script');
      structuredDataScript.id = 'homepage-structured-data';
      structuredDataScript.type = 'application/ld+json';
      structuredDataScript.textContent = JSON.stringify(structuredData);
      document.head.appendChild(structuredDataScript);
    }

    // Additional meta tags for homepage
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

    updateOrCreateMeta('keywords', 'Mallacoota accommodation, luxury holiday rentals, holiday houses Victoria, lake view accommodation, pet friendly Mallacoota, Hammond Properties');
    updateOrCreateMeta('author', 'Hammond Properties');
    updateOrCreateMeta('robots', 'index, follow');
    updateOrCreateMeta('viewport', 'width=device-width, initial-scale=1.0');

    // Add geo tags for local SEO
    updateOrCreateMeta('geo.region', 'AU-VIC');
    updateOrCreateMeta('geo.placename', 'Mallacoota');
    updateOrCreateMeta('geo.position', '-37.5642;149.7544');
    updateOrCreateMeta('ICBM', '-37.5642, 149.7544');

    // Add og:image attributes
    const updateOrCreateOGMeta = (property: string, content: string) => {
      let ogMeta = document.querySelector(`meta[property="${property}"]`);
      if (ogMeta) {
        ogMeta.setAttribute('content', content);
      } else {
        ogMeta = document.createElement('meta');
        ogMeta.setAttribute('property', property);
        ogMeta.setAttribute('content', content);
        document.head.appendChild(ogMeta);
      }
    };

    updateOrCreateOGMeta('og:image:width', '1200');
    updateOrCreateOGMeta('og:image:height', '630');
    updateOrCreateOGMeta('og:image:alt', 'Luxury waterfront holiday homes in Mallacoota with stunning ocean views');
    updateOrCreateMeta('twitter:image:alt', 'Hammond Properties - Mallacoota luxury holiday rentals');

    // Cleanup function
    return () => {
      // Remove homepage structured data when component unmounts
      const structuredDataScript = document.querySelector('#homepage-structured-data');
      if (structuredDataScript) {
        structuredDataScript.remove();
      }
    };
  }, []);

  return (
    <PageTransition>
      <SEOHead
        title="Hammond Properties - Luxury Holiday Rentals Mallacoota"
        description="Premium Mallacoota holiday rentals with waterfront views & luxury amenities. 32 insider guides. Local expertise. Come as guests, leave as family."
        canonical="https://hammondproperties.com.au/"
      />
      <div className="min-h-screen">
        <Header />
        <main>
          <HeroSection />
          <h1 className="sr-only">Luxury Holiday Rentals in Mallacoota - Hammond Properties</h1>
          <PropertyGrid />

          {/* Featured Properties Section - Internal Linking for SEO */}
          <section className="py-20 bg-gradient-to-b from-luxury-cream/30 to-transparent">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
                  Signature Coastal Estates
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Discover our most exceptional waterfront properties in East Gippsland, each offering unique experiences and unmatched luxury in Mallacoota's most coveted oceanfront locations.
                </p>
              </div>

              {propertiesLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="overflow-hidden animate-pulse">
                      <div className="aspect-video bg-gray-200"></div>
                      <CardContent className="p-6">
                        <div className="h-4 bg-gray-200 rounded mb-4"></div>
                        <div className="h-20 bg-gray-200 rounded mb-4"></div>
                        <div className="flex gap-2 mb-4">
                          <div className="h-6 w-20 bg-gray-200 rounded"></div>
                          <div className="h-6 w-24 bg-gray-200 rounded"></div>
                        </div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {signatureProperties?.map((property, index) => {
                    // Define the themes and content for each property
                    const propertyInfo = {
                      '7-allan-drive': {
                        theme: 'Waterfront Luxury',
                        subtitle: 'Direct waterfront access • Panoramic lake views',
                        description: 'Wake to breathtaking sunrises over Mallacoota Inlet from this stunning oceanfront estate. Private water access for fishing and kayaking, expansive deck, and uninterrupted East Gippsland coastal views.',
                        features: ['Water Access', 'Town Walk'],
                        ctaText: 'Explore This Property'
                      },
                      'four-on-stingray-point': {
                        theme: 'Glass Architecture',
                        subtitle: 'Stunning glass design • Beachfront location',
                        description: 'Experience architectural excellence where stunning glass design meets oceanfront luxury. This remarkable coastal estate blends contemporary design with East Gippsland natural beauty at Stingray Point.',
                        features: property.boatParking ? ['Boat Parking'] : [], // Dynamic boat parking
                        ctaText: 'Discover the Architecture'
                      },
                      'bella-views': {
                        theme: 'Panoramic Views',
                        subtitle: '270° panoramic vistas • Elevated coastal position',
                        description: 'Perched majestically above Mallacoota with spectacular 270-degree East Gippsland views. Watch sunrise over the Pacific and sunset over the inlet from your private elevated coastal retreat.',
                        features: ['Ocean Views', 'Photography'],
                        ctaText: 'See the Views'
                      }
                    }[property.slug] || {
                      theme: 'Luxury Property',
                      subtitle: 'Premium coastal accommodation',
                      description: 'Experience luxury waterfront accommodation in Mallacoota, East Gippsland.',
                      features: [],
                      ctaText: 'Explore Property'
                    };

                    return (
                      <Card key={property.slug} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                        <div className="aspect-video relative overflow-hidden">
                          <img
                            src={property.heroImageUrl || getPropertyFallbackImage(property.imageFolder)}
                            alt={property.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              // Fallback to placeholder if Supabase image fails
                              const target = e.target as HTMLImageElement;
                              target.src = getPropertyFallbackImage(property.imageFolder);
                            }}
                          />
                          {/* Base overlay for general darkening */}
                          <div className="absolute inset-0 bg-black/20"></div>

                          {/* Gradient overlay for better text readability */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                          {/* Top badge with enhanced backdrop */}
                          <div className="absolute top-4 left-4">
                            <span className="bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium border border-white/20 shadow-lg">
                              {propertyInfo.theme}
                            </span>
                          </div>

                          {/* Bottom text with enhanced readability */}
                          <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="text-xl font-serif font-bold mb-1 drop-shadow-lg" style={{
                              textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.9)'
                            }}>
                              {property.title}
                            </h3>
                            <p className="text-sm opacity-95 drop-shadow-md" style={{
                              textShadow: '0 1px 3px rgba(0,0,0,0.8)'
                            }}>
                              {propertyInfo.subtitle}
                            </p>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <p className="text-muted-foreground mb-4 leading-relaxed">
                            {propertyInfo.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                              {property.bedrooms} Bedroom{property.bedrooms !== 1 ? 's' : ''}
                            </span>
                            {propertyInfo.features.map((feature, idx) => (
                              <span key={idx} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                                {feature}
                              </span>
                            ))}
                            {property.petFriendly && (
                              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">Pet Friendly</span>
                            )}
                          </div>
                          <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                            <Link to={`/properties/${property.slug}`}>
                              {propertyInfo.ctaText}
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}

              {/* Additional Internal Links */}
              <div className="text-center mt-12">
                <p className="text-muted-foreground mb-6">
                  Each coastal estate offers unique advantages - from fishing and kayaking access to family beach vacations
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button asChild variant="outline">
                    <Link to="/properties">View All 14 Properties</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/mallacoota-holiday-rentals">All Holiday Rentals</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/pet-friendly-mallacoota">Pet-Friendly Options</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <DiscoverSection />
          <WhyChooseUs />
          <TestimonialsHorizontalTicker />
          <CTASection />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;