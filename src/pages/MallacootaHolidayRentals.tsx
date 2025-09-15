import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Users, MapPin, Calendar, ChevronRight, Award, Heart, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import SEOHead from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import { useProperties } from "@/hooks/useProperties";
import { useBlogPosts } from "@/hooks/useBlogPosts";

interface FAQ {
  question: string;
  answer: string;
}

interface Testimonial {
  name: string;
  location: string;
  text: string;
  rating: number;
}

const MallacootaHolidayRentals = () => {
  const [isLoaded, setIsLoaded] = useState(false);

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
    const title = "Luxury Holiday Rentals Mallacoota | Waterfront Estates | Hammond Properties";
    document.title = title;
    
    const description = "Experience Mallacoota's finest holiday homes. Waterfront luxury properties with premium amenities, personal concierge & exclusive locations. Book your luxury escape today.";
    
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
      description: "Born and raised locals with insider access to Mallacoota's hidden gems and exclusive experiences."
    },
    {
      icon: Award,
      title: "Premium Amenities",
      description: "Every property features luxury amenities, from heated pools to gourmet kitchens and waterfront decks."
    },
    {
      icon: Heart,
      title: "Personally Curated Experiences",
      description: "Bespoke recommendations and arrangements tailored to your preferences by our local experts."
    },
    {
      icon: Shield,
      title: "Exclusive Properties",
      description: "Access to premium homes not available elsewhere, carefully selected for luxury and location."
    }
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Sarah & Michael Chen",
      location: "Melbourne, VIC",
      text: "The attention to detail in every aspect of our stay was exceptional. From the welcome basket to the personally curated restaurant recommendations, Hammond Properties exceeded every expectation.",
      rating: 5
    },
    {
      name: "James Robertson",
      location: "Sydney, NSW",
      text: "Our waterfront home was absolutely stunning. The quality of furnishings and the view were beyond anything we could have imagined. True luxury in paradise.",
      rating: 5
    },
    {
      name: "The Williams Family",
      location: "Canberra, ACT",
      text: "Amelia's local knowledge made our holiday unforgettable. She arranged private tours and dining experiences we never would have discovered on our own.",
      rating: 5
    }
  ];

  const faqs: FAQ[] = [
    {
      question: "What makes Hammond Properties' rentals luxury?",
      answer: "Our properties feature premium amenities including heated pools, gourmet kitchens, luxury linens, waterfront locations, and personal concierge services. Every home is personally inspected and curated for exceptional quality."
    },
    {
      question: "Do you offer exclusive properties not available elsewhere?",
      answer: "Yes, many of our premium properties are exclusively managed by Hammond Properties and cannot be found on other platforms. These homes offer unique features and prime locations."
    },
    {
      question: "What personal services are included?",
      answer: "All guests receive personalized local recommendations, optional pre-arrival shopping, restaurant reservations, activity bookings, and 24/7 concierge support during your stay."
    },
    {
      question: "Are pets welcome in luxury properties?",
      answer: "Select luxury properties welcome pets with premium amenities including dog beds, bowls, and fenced yards. We also provide recommendations for pet-friendly activities and services."
    },
    {
      question: "What's included in the luxury experience?",
      answer: "Welcome hampers with local produce, premium amenities, luxury linens, gourmet kitchen supplies, and access to exclusive local experiences and dining reservations."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Luxury Holiday Rentals Mallacoota | Waterfront Estates | Hammond Properties"
        description="Experience Mallacoota's finest holiday homes. Waterfront luxury properties with premium amenities, personal concierge & exclusive locations. Book your luxury escape today."
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
                  Exceptional Properties. Unforgettable Experiences.
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
                Luxury Properties Collection
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover our curated selection of premium waterfront estates and luxury homes, 
                each offering unique amenities and breathtaking locations.
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
                Experience unparalleled luxury and service that sets us apart from ordinary holiday rentals.
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
                Discover the magic of Mallacoota through our insider's guide to unforgettable experiences.
              </p>
            </div>

            {blogLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {experienceBlogs.map((blog) => (
                  <Card key={blog.id} className="group hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-serif font-semibold text-primary mb-3 line-clamp-2 group-hover:text-accent-red transition-colors">
                        <Link to={`/blog/${blog.slug}`} className="hover:underline">
                          {blog.title}
                        </Link>
                      </h3>
                      {blog.excerpt && (
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                          {blog.excerpt}
                        </p>
                      )}
                      <Link 
                        to={`/blog/${blog.slug}`}
                        className="inline-flex items-center text-accent-red hover:text-primary transition-colors font-medium text-sm"
                      >
                        Discover More →
                      </Link>
                    </CardContent>
                  </Card>
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

        {/* Guest Testimonials */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
                Guest Experiences
              </h2>
              <p className="text-lg text-muted-foreground">
                Hear from guests who have experienced the Hammond Properties difference.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="card-luxury">
                  <CardContent className="p-8">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-accent-red text-accent-red" />
                      ))}
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

              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <Card key={index} className="card-luxury">
                    <CardContent className="p-8">
                      <h3 className="text-xl font-serif font-semibold text-primary mb-4">
                        {faq.question}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
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
                Ready for Your Luxury Mallacoota Experience?
              </h2>
              <p className="text-xl mb-8 text-primary-foreground/90">
                Book your exclusive holiday rental today and discover why discerning guests choose Hammond Properties.
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