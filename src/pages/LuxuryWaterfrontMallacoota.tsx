import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Waves, Star, MapPin, Eye, Anchor, Award, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import SEOHead from "@/components/SEOHead";
import { useProperties } from "@/hooks/useProperties";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import BlogCard from "@/components/BlogCard";

interface LuxuryFeature {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
}

interface Testimonial {
  name: string;
  location: string;
  text: string;
  rating: number;
  property: string;
}

const LuxuryWaterfrontMallacoota = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Fetch waterfront properties directly from Supabase (with water views for luxury waterfront experience)
  const { data: waterfrontProperties, isLoading: propertiesLoading, error: propertiesError } = useProperties({
    waterViews: true  // Use water_views as proxy for waterfront until waterfront field is added to database
  });

  // Fetch relevant blog posts about waterfront experiences
  const { data: allBlogs, isLoading: blogLoading } = useBlogPosts({});
  const waterfrontBlogs = allBlogs?.filter(blog => 
    blog.title?.toLowerCase().includes('beach') || 
    blog.title?.toLowerCase().includes('water') ||
    blog.title?.toLowerCase().includes('ocean') ||
    blog.title?.toLowerCase().includes('coastal') ||
    blog.title?.toLowerCase().includes('fishing') ||
    blog.title?.toLowerCase().includes('kayak')
  ).slice(0, 6) || [];

  useEffect(() => {
    setIsLoaded(true);

    // Preload hero image for faster loading
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = '/images/luxury-waterfront-mallacoota-hero.JPG';
    document.head.appendChild(link);

    // SEO Meta Tags
    const title = "Luxury Waterfront Accommodation Mallacoota | Premium Ocean View Estates | Hammond Properties";
    document.title = title;
    
    const description = "Experience Mallacoota's finest luxury waterfront estates. Premium ocean view properties with private beaches, infinity pools & exclusive amenities. Unparalleled coastal luxury awaits.";
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', description);
      document.head.appendChild(metaDescription);
    }

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', 'https://hammondproperties.com.au/luxury-waterfront-mallacoota');
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', 'https://hammondproperties.com.au/luxury-waterfront-mallacoota');
      document.head.appendChild(canonicalLink);
    }

    // Open Graph tags
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

    updateOrCreateOGMeta('og:title', title);
    updateOrCreateOGMeta('og:description', description);
    updateOrCreateOGMeta('og:url', 'https://hammondproperties.com.au/luxury-waterfront-mallacoota');
    updateOrCreateOGMeta('og:image', 'https://hammondproperties.com.au/images/luxury-waterfront-estate-og.jpg');

    // Basic structured data (will be enhanced when properties load)
    const basicStructuredData = {
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      "name": "Luxury Waterfront Estates Mallacoota - Hammond Properties",
      "description": description,
      "url": "https://hammondproperties.com.au/luxury-waterfront-mallacoota",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mallacoota",
        "addressRegion": "Victoria",
        "addressCountry": "AU"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "500",
        "bestRating": "5",
        "worstRating": "1"
      },
      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "Oceanfront Location" },
        { "@type": "LocationFeatureSpecification", "name": "Private Beach Access" },
        { "@type": "LocationFeatureSpecification", "name": "Infinity Pool" },
        { "@type": "LocationFeatureSpecification", "name": "Premium Amenities" }
      ]
    };

    let structuredDataScript = document.querySelector('#waterfront-luxury-structured-data');
    if (structuredDataScript) {
      structuredDataScript.textContent = JSON.stringify(basicStructuredData);
    } else {
      structuredDataScript = document.createElement('script');
      structuredDataScript.id = 'waterfront-luxury-structured-data';
      structuredDataScript.type = 'application/ld+json';
      structuredDataScript.textContent = JSON.stringify(basicStructuredData);
      document.head.appendChild(structuredDataScript);
    }

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  // Update structured data when waterfront properties load
  useEffect(() => {
    if (!waterfrontProperties) return;

    const description = "Experience Mallacoota's finest luxury waterfront estates. Premium ocean view properties with private beaches, infinity pools & exclusive amenities. Unparalleled coastal luxury awaits.";

    // Enhanced structured data with dynamic property count and offers
    const enhancedStructuredData = {
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      "name": "Luxury Waterfront Estates Mallacoota - Hammond Properties",
      "description": description,
      "url": "https://hammondproperties.com.au/luxury-waterfront-mallacoota",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mallacoota",
        "addressRegion": "Victoria",
        "addressCountry": "AU"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "500",
        "bestRating": "5",
        "worstRating": "1"
      },
      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "Oceanfront Location" },
        { "@type": "LocationFeatureSpecification", "name": "Private Beach Access" },
        { "@type": "LocationFeatureSpecification", "name": "Infinity Pool" },
        { "@type": "LocationFeatureSpecification", "name": "Premium Amenities" },
        { "@type": "LocationFeatureSpecification", "name": "Luxury Waterfront Estates" }
      ],
      "numberOfRooms": waterfrontProperties.length,
      "makesOffer": waterfrontProperties.map(property => ({
        "@type": "Offer",
        "name": property.title,
        "description": property.excerpt || property.subtitle || "Luxury waterfront accommodation",
        "url": `https://hammondproperties.com.au/properties/${property.slug}`,
        "priceCurrency": "AUD",
        "availability": "https://schema.org/InStock",
        "category": "Luxury Waterfront Estate"
      }))
    };

    let structuredDataScript = document.querySelector('#waterfront-luxury-structured-data');
    if (structuredDataScript) {
      structuredDataScript.textContent = JSON.stringify(enhancedStructuredData);
    } else {
      structuredDataScript = document.createElement('script');
      structuredDataScript.id = 'waterfront-luxury-structured-data';
      structuredDataScript.type = 'application/ld+json';
      structuredDataScript.textContent = JSON.stringify(enhancedStructuredData);
      document.head.appendChild(structuredDataScript);
    }

    return () => {
      const script = document.querySelector('#waterfront-luxury-structured-data');
      if (script) {
        script.remove();
      }
    };
  }, [waterfrontProperties]);

  const luxuryFeatures: LuxuryFeature[] = [
    {
      icon: Waves,
      title: "Waterfront Access",
      description: "Exclusive access to pristine beaches, national parks and waterways all within a short drive from your luxury holiday rental."
    },
    {
      icon: Eye,
      title: "Panoramic Ocean Views",
      description: "Floor-to-ceiling windows showcasing uninterrupted views of Mallacoota's stunning coastline including Gabo Island."
    },
    {
      icon: Anchor,
      title: "Premium Marine Facilities",
      description: "Private jetties, boat moorings, and water sports equipment for hire providing the ultimate coastal experience."
    },
    {
      icon: Award,
      title: "Architectural Excellence",
      description: "Award-winning designs that seamlessly blend luxury living with the natural coastal environment."
    }
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Victoria & James Mitchell",
      location: "Sydney, NSW",
      text: "The waterfront estate exceeded every expectation. Waking up to endless ocean views and having private beach access made this the most luxurious holiday we've ever experienced.",
      rating: 5,
      property: "Oceanfront Villa"
    },
    {
      name: "The Henderson Family",
      location: "Melbourne, VIC",
      text: "The infinity pool overlooking the ocean was absolutely magical. Every detail of the property screamed luxury, from the Italian marble to the chef's kitchen with ocean views.",
      rating: 5,
      property: "Coastal Estate"
    },
    {
      name: "Robert & Catherine Stone",
      location: "Canberra, ACT",
      text: "Having our own jetty and the ability to kayak directly from our property was incredible. The service from Hammond Properties was impeccable throughout our stay.",
      rating: 5,
      property: "Waterfront Retreat"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Luxury Waterfront Accommodation Mallacoota | Premium Ocean View Estates | Hammond Properties"
        description="Experience Mallacoota's finest luxury waterfront estates. Premium ocean view properties with private beaches, infinity pools & exclusive amenities. Unparalleled coastal luxury awaits."
      />
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] min-h-[500px] md:min-h-[600px] lg:min-h-[700px] overflow-hidden">
          <img
            src="/images/luxury-waterfront-mallacoota-hero.JPG"
            alt="Luxury waterfront accommodation in Mallacoota"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out ${
              isLoaded ? 'scale-100' : 'scale-105'
            }`}
            loading="eager"
            decoding="async"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/placeholder-hero.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
          
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-4xl text-white">
                <h1 className={`text-4xl md:text-5xl lg:text-7xl font-serif font-bold mb-6 transition-all duration-800 delay-200 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  Waterfront Luxury Estates
                </h1>
                
                <p className={`text-xl md:text-2xl lg:text-3xl font-light mb-4 transition-all duration-800 delay-400 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  Mallacoota
                </p>
                
                <p className={`text-lg mb-8 max-w-2xl transition-all duration-800 delay-500 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  Discover the pinnacle of coastal luxury in our exclusive waterfront estates. 
                  Where breathtaking ocean views meet unparalleled sophistication.
                </p>
                
                <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-800 delay-600 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <Button 
                    asChild 
                    variant="accent" 
                    size="lg" 
                    className="px-8 py-4 text-lg"
                  >
                    <Link to="#waterfront-estates">
                      Explore Waterfront Estates
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="px-8 py-4 text-lg bg-white/20 backdrop-blur-sm border-2 border-white text-white
                               hover:bg-white hover:text-gray-900 hover:border-white hover:shadow-lg
                               active:bg-white/90 active:text-gray-900 active:scale-95
                               transition-all duration-200"
                  >
                    <Link to="/contact">
                      Private Consultation
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Luxury Features */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
                Waterfront Luxury Redefined
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience unparalleled coastal luxury with exclusive features designed for the most discerning guests.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {luxuryFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="card-luxury text-center">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-ocean-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Icon className="w-8 h-8 text-ocean-blue" />
                      </div>
                      <h3 className="text-xl font-serif font-semibold text-primary mb-4">
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

        {/* Waterfront Estates Collection */}
        <section id="waterfront-estates" className="py-20 bg-warm-neutral/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
                Exclusive Waterfront Estates
                {waterfrontProperties && !propertiesLoading && (
                  <span className="block text-lg font-normal text-muted-foreground mt-2">
                    {waterfrontProperties.length} Premium {waterfrontProperties.length === 1 ? 'Estate' : 'Estates'} Available
                  </span>
                )}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our most prestigious collection of luxury waterfront properties, each offering unparalleled ocean access and amenities.
              </p>
            </div>

            {propertiesLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-96 bg-gray-200 animate-pulse rounded-lg" />
                ))}
              </div>
            ) : propertiesError ? (
              <div className="text-center py-12">
                <Waves className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-primary mb-4">
                  Unable to Load Waterfront Estates
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  We're experiencing technical difficulties loading our luxury waterfront properties. Please try refreshing the page or contact us for assistance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => window.location.reload()}
                    variant="outline"
                  >
                    Refresh Page
                  </Button>
                  <Button asChild variant="accent">
                    <Link to="/contact">
                      Contact Our Team
                    </Link>
                  </Button>
                </div>
              </div>
            ) : waterfrontProperties && waterfrontProperties.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {waterfrontProperties.map((property) => (
                  <div key={property.id} className="relative">
                    <PropertyCard property={property} />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-ocean-blue text-white">
                        <Waves className="w-3 h-3 mr-1" />
                        Waterfront
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Waves className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-primary mb-4">
                  No Waterfront Estates Currently Available
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Our luxury waterfront estates are currently unavailable. Please check back later or contact us to discuss alternative premium properties with water views.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild variant="outline">
                    <Link to="/properties">
                      View All Properties
                    </Link>
                  </Button>
                  <Button asChild variant="accent">
                    <Link to="/contact">
                      Speak to Our Specialists
                    </Link>
                  </Button>
                </div>
              </div>
            )}

            <div className="text-center mt-12">
              <Button asChild variant="default" size="lg">
                <Link to="/properties?water_views=true">
                  View All Waterfront Properties
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Local Insights - Waterfront Experiences */}
        <section className="py-20 bg-luxury-cream">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
                Local Insights: Waterfront Experiences
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover the best of Mallacoota's waterfront lifestyle through our expert local knowledge and curated experiences.
              </p>
            </div>

            {blogLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {waterfrontBlogs.slice(0, 6).map((blog) => (
                  <BlogCard
                    key={blog.id}
                    id={blog.id}
                    title={blog.title}
                    slug={blog.slug}
                    excerpt={blog.excerpt}
                    categoryId={blog.Categories_id}
                    categoryName="Waterfront"
                    published_date={blog.published_date}
                    linkPrefix="/discover-mallacoota"
                  />
                ))}
              </div>
            )}

            <div className="text-center mt-12">
              <Button asChild variant="accent" size="lg">
                <Link to="/discover-mallacoota">
                  More Coastal Experiences
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Guest Testimonials - Luxury Experience */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
                Luxury Waterfront Experiences
              </h2>
              <p className="text-lg text-muted-foreground">
                Hear from guests who have experienced the ultimate in waterfront luxury.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="card-luxury">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-accent-red text-accent-red" />
                        ))}
                      </div>
                      <Badge variant="secondary" className="bg-ocean-blue/10 text-ocean-blue text-xs">
                        {testimonial.property}
                      </Badge>
                    </div>
                    <blockquote className="text-muted-foreground leading-relaxed mb-6 italic">
                      "{testimonial.text}"
                    </blockquote>
                    <div>
                      <p className="font-semibold text-primary">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Exclusive Waterfront Amenities */}
        <section className="py-20 bg-ocean-blue text-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Exclusive Waterfront Amenities
              </h2>
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-xl font-serif font-semibold mb-4">Private Beach Access</h3>
                  <p className="text-ocean-blue/90 leading-relaxed">
                    Direct access to pristine private beaches where you can enjoy complete privacy and tranquility.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-semibold mb-4">Infinity Pools</h3>
                  <p className="text-ocean-blue/90 leading-relaxed">
                    Heated infinity pools that seamlessly blend with the ocean horizon for the ultimate luxury experience.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-semibold mb-4">Private Jetties</h3>
                  <p className="text-ocean-blue/90 leading-relaxed">
                    Your own private jetty with boat moorings and direct water access for marine adventures.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-semibold mb-4">Concierge Services</h3>
                  <p className="text-ocean-blue/90 leading-relaxed">
                    Dedicated concierge to arrange yacht charters, fishing guides, and exclusive coastal experiences.
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <Button 
                  asChild 
                  variant="accent" 
                  size="lg" 
                  className="px-12 py-6 text-lg"
                >
                  <Link to="/contact">
                    Inquire About Waterfront Luxury
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Reserve Your Waterfront Paradise
              </h2>
              <p className="text-xl mb-8 text-primary-foreground/90">
                Experience the ultimate in coastal luxury at Mallacoota's most exclusive waterfront estates. 
                Limited availability for discerning guests.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  variant="accent" 
                  size="lg" 
                  className="px-12 py-6 text-lg"
                >
                  <Link to="/properties?water_views=true">
                    Book Waterfront Estate
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="px-12 py-6 text-lg border-white text-white hover:bg-white hover:text-primary"
                >
                  <Link to="/contact">
                    Private Estate Consultation
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

export default LuxuryWaterfrontMallacoota;