import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Users, MapPin, Calendar, ChevronRight, Award, Heart, Shield, ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import SEOHead from "@/components/SEOHead";
import BlogCard from "@/components/BlogCard";
import TestimonialsHorizontalTicker from "@/components/TestimonialsHorizontalTicker";
import { supabase } from "@/integrations/supabase/client";
import { useProperties } from "@/hooks/useProperties";
import { useBlogPosts } from "@/hooks/useBlogPosts";

interface FAQ {
  question: string;
  answer: string;
}


const MallacootaHolidayRentals = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [openAmenity, setOpenAmenity] = useState<number | null>(null);

  // Fetch featured properties (top 6)
  const { data: properties, isLoading: propertiesLoading } = useProperties();
  const featuredProperties = properties?.slice(0, 6) || [];

  // Fetch relevant blog posts for "Experiences Await" section
  const { data: blogPosts, isLoading: blogLoading } = useBlogPosts({
    categoryId: "", // All categories
  });
  const experienceBlogs = blogPosts?.slice(0, 6) || [];

  useEffect(() => {
    setIsLoaded(true);
    
    // SEO Meta Tags
    const title = "Mallacoota Holiday Rentals | Hammond Properties";
    document.title = title;

    const description = "Mallacoota's finest holiday rentals. 14 luxury waterfront homes, pet-friendly cottages & family estates. Book your perfect getaway.";
    
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
      canonicalLink.setAttribute('href', 'https://hammondproperties.com.au/mallacoota-holiday-rentals');
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', 'https://hammondproperties.com.au/mallacoota-holiday-rentals');
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
    updateOrCreateOGMeta('og:url', 'https://hammondproperties.com.au/mallacoota-holiday-rentals');
    updateOrCreateOGMeta('og:image', 'https://hammondproperties.com.au/images/mallacoota-holiday-rentals-hero.jpg');
    updateOrCreateOGMeta('og:type', 'website');
    updateOrCreateOGMeta('og:image:width', '1200');
    updateOrCreateOGMeta('og:image:height', '630');
    updateOrCreateOGMeta('og:image:alt', 'Luxury waterfront holiday rental in Mallacoota with stunning ocean views');

    // Add geo tags for local SEO
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
    updateOrCreateMeta('twitter:image:alt', 'Mallacoota luxury holiday rentals');

    // Structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      "name": "Hammond Properties - Luxury Holiday Rentals Mallacoota",
      "description": description,
      "url": "https://hammondproperties.com.au/mallacoota-holiday-rentals",
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
        { "@type": "LocationFeatureSpecification", "name": "Waterfront Location" },
        { "@type": "LocationFeatureSpecification", "name": "Premium Amenities" },
        { "@type": "LocationFeatureSpecification", "name": "Personal Concierge" },
        { "@type": "LocationFeatureSpecification", "name": "Pet Friendly Options" }
      ]
    };

    let structuredDataScript = document.querySelector('#luxury-rentals-structured-data');
    if (structuredDataScript) {
      structuredDataScript.textContent = JSON.stringify(structuredData);
    } else {
      structuredDataScript = document.createElement('script');
      structuredDataScript.id = 'luxury-rentals-structured-data';
      structuredDataScript.type = 'application/ld+json';
      structuredDataScript.textContent = JSON.stringify(structuredData);
      document.head.appendChild(structuredDataScript);
    }
  }, []);

  const hammondDifference = [
    {
      icon: MapPin,
      title: "Unparalleled Local Knowledge",
      description: "Born and raised East Gippsland locals with insider access to Mallacoota's hidden gems, best fishing spots, and exclusive coastal experiences."
    },
    {
      icon: Award,
      title: "Premium Amenities",
      description: "Every waterfront estate features luxury amenities designed for comfort and style - gourmet kitchens, stunning oceanfront decks, and boat parking facilities."
    },
    {
      icon: Heart,
      title: "Personally Curated Experiences",
      description: "Bespoke recommendations for fishing charters, kayaking adventures, and coastal walks tailored to your family vacation preferences."
    },
    {
      icon: Shield,
      title: "Exclusive Coastal Properties",
      description: "Access to premium beachfront homes and waterfront estates not available elsewhere, carefully selected for luxury, location, and family appeal."
    }
  ];


  const amenities = [
    {
      title: "Personal Concierge Service",
      description: "Dedicated concierge support for your East Gippsland vacation. From restaurant reservations to fishing charter bookings, kayaking adventures, and special occasion arrangements - we handle every detail to ensure your coastal getaway exceeds expectations."
    },
    {
      title: "Premium Linens & Amenities",
      description: "All waterfront estates feature luxury hotel-grade linens, premium towels, gourmet kitchen supplies and high-end toiletries. Every comfort is thoughtfully provided for a truly luxurious coastal accommodation experience."
    },
    {
      title: "Pet-Friendly Beach Vacation",
      description: "Select oceanfront properties welcome well-behaved pets with dedicated amenities including fenced yards and nearby off-leash beaches. We provide comprehensive guides to pet-friendly coastal walks, beaches, and local services."
    },
    {
      title: "Boat Parking & Water Access",
      description: "Many waterfront properties offer boat parking facilities and equipment storage. Perfect for fishing enthusiasts, boating families, or those wanting to explore Mallacoota Inlet's pristine waterways and secluded coastal beaches."
    },
    {
      title: "Family Holiday Features",
      description: "Our family vacation rentals are equipped with children's amenities including high chairs, cots, toys, games, and safety features. Many beachfront homes offer fenced yards, shallow water access, and walking distance to family-friendly beaches."
    },
    {
      title: "Local Experience Curation",
      description: "Access to exclusive East Gippsland experiences and insider knowledge. From private fishing charters and guided bushwalks to kayaking adventures and seasonal activity recommendations - we share our local expertise to create unforgettable family memories."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Mallacoota Holiday Rentals | Hammond Properties"
        description="Mallacoota's finest holiday rentals. 14 luxury waterfront homes, pet-friendly cottages & family estates. Book your perfect getaway."
        canonical="https://hammondproperties.com.au/mallacoota-holiday-rentals"
      />
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[90vh] overflow-hidden">
          <img
            src="/images/mallacoota-holiday-rentals-hero.jpg"
            alt="Luxury waterfront holiday rental in Mallacoota with stunning ocean views and premium amenities"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out ${
              isLoaded ? 'scale-100' : 'scale-105'
            }`}
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
          
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-4xl text-white">
                <h1 className={`text-4xl md:text-5xl lg:text-7xl font-serif font-bold mb-6 transition-all duration-800 delay-200 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  Mallacoota's Premier Luxury Holiday Rentals
                </h1>
                
                <p className={`text-xl md:text-2xl lg:text-3xl font-light mb-8 transition-all duration-800 delay-400 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  Premium Coastal Estates in East Gippsland. Unforgettable Experiences.
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
                    <Link to="/properties">
                      Explore Luxury Properties
                    </Link>
                  </Button>
                  <Button 
                    asChild 
                    variant="outline" 
                    size="lg" 
                    className="px-8 py-4 text-lg bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-gray-900 hover:border-white hover:shadow-lg active:bg-white/90 active:text-gray-900 active:scale-95 transition-all duration-200"
                  >
                    <Link to="/contact">
                      Concierge Service
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Property Showcase */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
                Luxury Coastal Properties Collection
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover our curated selection of premium waterfront estates, oceanfront vacation homes,
                and luxury coastal accommodation in East Gippsland - each offering unique amenities and breathtaking beachfront locations.
              </p>
            </div>

            {propertiesLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-96 bg-gray-200 animate-pulse rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}

            <div className="text-center mt-12">
              <Button asChild variant="default" size="lg">
                <Link to="/properties">
                  View All Luxury Properties
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* The Hammond Properties Difference */}
        <section className="py-20 bg-warm-neutral/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
                The Hammond Properties Difference
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Experience unparalleled coastal luxury and personalised service that sets us apart from ordinary East Gippsland holiday rentals.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {hammondDifference.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index} className="card-luxury text-center">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-accent-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Icon className="w-8 h-8 text-accent-red" />
                      </div>
                      <h3 className="text-xl font-serif font-semibold text-primary mb-4">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Experiences Await - Blog Content */}
        <section className="py-20 bg-luxury-cream">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
                Experiences Await
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover the magic of Mallacoota through our insider's guide - from fishing and kayaking adventures to coastal walks and family beach activities.
              </p>
            </div>

            {blogLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experienceBlogs.map((blog) => (
                  <BlogCard
                    key={blog.id}
                    id={blog.id}
                    title={blog.title}
                    slug={blog.slug}
                    excerpt={blog.excerpt}
                    categoryId={blog.Categories_id}
                    published_date={blog.published_date}
                    seasons={blog.seasons}
                    activity_levels={blog.activity_levels}
                    audiences={blog.audiences}
                    linkPrefix="/discover-mallacoota"
                  />
                ))}
              </div>
            )}

            <div className="text-center mt-12">
              <Button asChild variant="accent" size="lg">
                <Link to="/discover-mallacoota">
                  Explore All Experiences
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Guest Testimonials - Using shared component */}
        <TestimonialsHorizontalTicker />

        {/* FAQ Section */}
        <section className="py-20 bg-warm-neutral/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
                  Luxury Amenities & Services
                </h2>
                <p className="text-lg text-muted-foreground">
                  Everything you need to know about our premium holiday rental experience.
                </p>
              </div>

              <div className="space-y-4">
                {amenities.map((amenity, index) => (
                  <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                    <CardContent className="p-0">
                      <button
                        onClick={() => setOpenAmenity(openAmenity === index ? null : index)}
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-300"
                      >
                        <h3 className="text-lg font-semibold text-primary pr-4">
                          {amenity.title}
                        </h3>
                        <div className={`flex-shrink-0 transform transition-transform duration-300 ${openAmenity === index ? 'rotate-180' : ''}`}>
                          <ChevronDown className="w-5 h-5 text-primary" />
                        </div>
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ${openAmenity === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="px-6 pb-6">
                          <p className="text-muted-foreground leading-relaxed">
                            {amenity.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button asChild variant="accent" size="lg">
                  <Link to="/contact">
                    Speak with Our Concierge
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
                Ready for Your Luxury Coastal Escape?
              </h2>
              <p className="text-xl mb-8 text-primary-foreground/90">
                Book your exclusive East Gippsland waterfront estate today and discover why discerning guests choose Hammond Properties for their Mallacoota vacation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  variant="accent" 
                  size="lg" 
                  className="px-12 py-6 text-lg"
                >
                  <Link to="/properties">
                    Book Luxury Properties
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="px-12 py-6 text-lg bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-gray-900 hover:border-white hover:shadow-lg active:bg-white/90 active:text-gray-900 active:scale-95 transition-all duration-200"
                >
                  <Link to="/contact">
                    Contact Concierge
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

export default MallacootaHolidayRentals;