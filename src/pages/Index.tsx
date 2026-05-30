import React from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PropertyGrid from "@/components/PropertyGrid";
import WhyChooseUs from "@/components/WhyChooseUs";
import DiscoverSection from "@/components/DiscoverSection";
import TestimonialsHorizontalTicker from "@/components/TestimonialsHorizontalTicker";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import PageTransition from "@/components/PageTransition";
import SEOMetaTags from "@/components/SEOMetaTags";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSignatureProperties } from "@/hooks/useSignatureProperties";
import { getPropertyFallbackImage } from "@/lib/imageUtils";
import { HOMEPAGE_FAQS } from "@/data/homeFaqs";

// Module-scope LodgingBusiness schema. NAP corrected to canonical pair
// (amelia@ + +61 401 825 547). Geo standardised to -37.5642 / 149.7544.
// Placeholder `sameAs` array removed — real social URLs not in repo.
const HOMEPAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LodgingBusiness",
      "@id": "https://hammondproperties.com.au/#lodgingbusiness",
      "name": "Hammond Properties",
      "alternateName": "Hammond Properties Mallacoota",
      "description":
        "Premium holiday rentals in Mallacoota with waterfront views, luxury amenities, and 32 insider guides to help you explore. Local expertise since day one. Come as guests. Leave as family.",
      "url": "https://hammondproperties.com.au",
      "logo": "https://hammondproperties.com.au/images/hammond-properties-logo.jpg",
      "image": "https://hammondproperties.com.au/images/hammond-properties-og.jpg",
      "telephone": "+61 401 825 547",
      "email": "amelia@hammondproperties.com.au",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mallacoota",
        "addressRegion": "Victoria",
        "addressCountry": "AU",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-37.5642",
        "longitude": "149.7544",
      },
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": "-37.5642",
          "longitude": "149.7544",
        },
        "geoRadius": "10000",
      },
      "priceRange": "$$$",
      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "Pet Friendly Options" },
        { "@type": "LocationFeatureSpecification", "name": "Lake Views" },
        { "@type": "LocationFeatureSpecification", "name": "Ocean Views" },
        { "@type": "LocationFeatureSpecification", "name": "Boat Parking" },
        { "@type": "LocationFeatureSpecification", "name": "WiFi" },
      ],
      // sameAs intentionally omitted — real Facebook/Instagram URLs to be confirmed by Matt.
    },
    {
      "@type": "FAQPage",
      "@id": "https://hammondproperties.com.au/#faq",
      "mainEntity": HOMEPAGE_FAQS.map((f) => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": { "@type": "Answer", "text": f.answer },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://hammondproperties.com.au/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://hammondproperties.com.au/",
        },
      ],
    },
  ],
};

const Index = () => {
  const { data: signatureProperties, isLoading: propertiesLoading } = useSignatureProperties();

  return (
    <PageTransition>
      <SEOMetaTags
        title="Hammond Properties — Luxury Mallacoota Accommodation"
        description="Discover Mallacoota's finest luxury holiday homes — waterfront rentals, pet-friendly options, premium amenities. 500+ 5-star reviews. Book your coastal escape today."
        canonical="https://hammondproperties.com.au/"
        ogImage="https://hammondproperties.com.au/images/hammond-properties-og.jpg"
        imageAlt="Luxury waterfront holiday homes in Mallacoota with stunning ocean views"
        keywords="Mallacoota accommodation, luxury holiday rentals, holiday houses Victoria, lake view accommodation, pet friendly Mallacoota, Hammond Properties"
        schema={HOMEPAGE_SCHEMA}
      />
      <div className="min-h-screen">
        <Header />
        <main>
          <HeroSection />
          {/* HeroSection's visible H1 is the sole page H1 — the previous sr-only H1 caused dual-H1. */}
          <PropertyGrid />

          {/* Featured Properties Section - Internal Linking for SEO */}
          <section className="py-20 bg-gradient-to-b from-luxury-cream/30 to-transparent">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
                  Signature Coastal Estates
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Discover our most exceptional waterfront properties in East Gippsland, each offering unique experiences and unmatched luxury in Mallacoota's most coveted oceanfront locations. Or <Link to="/mallacoota-holiday-rentals" className="text-primary hover:underline font-medium">browse our full Mallacoota holiday rentals collection</Link>.
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

          {/* FAQ Section for SEO and Featured Snippets — questions/answers live in
              src/data/homeFaqs.ts and feed both this visible section AND the FAQPage
              JSON-LD inside HOMEPAGE_SCHEMA above. injectSchema={false} prevents
              FAQSection from emitting a duplicate FAQPage entity (which was
              causing GSC to mark homepage rich results FAIL). */}
          <FAQSection
            title="Your Mallacoota Questions Answered"
            faqs={HOMEPAGE_FAQS}
            injectSchema={false}
          />

          <CTASection />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;