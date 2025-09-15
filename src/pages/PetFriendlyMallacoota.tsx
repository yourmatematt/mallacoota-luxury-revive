import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PawPrint, Heart, Shield, MapPin, Phone, Star, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import SEOHead from "@/components/SEOHead";
import { useProperties } from "@/hooks/useProperties";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import BlogCard from "@/components/BlogCard";

interface PetAmenity {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
}

interface LocalService {
  name: string;
  type: string;
  address: string;
  phone: string;
  description: string;
}

const PetFriendlyMallacoota = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Fetch pet-friendly properties
  const { data: allProperties, isLoading: propertiesLoading } = useProperties();
  const petFriendlyProperties = allProperties?.filter(property => property.pet_friendly) || [];

  // Fetch relevant blog posts
  const { data: allBlogs, isLoading: blogLoading } = useBlogPosts({});
  const petRelatedBlogs = allBlogs?.filter(blog => 
    blog.title?.toLowerCase().includes('pet') || 
    blog.title?.toLowerCase().includes('dog') ||
    blog.title?.toLowerCase().includes('family') ||
    blog.excerpt?.toLowerCase().includes('pet')
  ).slice(0, 6) || [];

  useEffect(() => {
    setIsLoaded(true);

    // Preload hero image for faster loading
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = '/images/pet-friendly-hero.jpg';
    document.head.appendChild(link);

    // SEO Meta Tags
    const title = "Pet-Friendly Accommodation Mallacoota | Luxury Holiday Rentals | Hammond Properties";
    document.title = title;
    
    const description = "Bring your furry family to Mallacoota's finest pet-friendly holiday rentals. Luxury properties with dog beaches, fenced yards & premium pet amenities. Local pet services included.";
    
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
      canonicalLink.setAttribute('href', 'https://hammondproperties.com.au/pet-friendly-mallacoota');
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', 'https://hammondproperties.com.au/pet-friendly-mallacoota');
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
    updateOrCreateOGMeta('og:url', 'https://hammondproperties.com.au/pet-friendly-mallacoota');
    updateOrCreateOGMeta('og:image', 'https://hammondproperties.com.au/images/pet-friendly-og.jpg');

    // Structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      "name": "Pet-Friendly Holiday Rentals Mallacoota - Hammond Properties",
      "description": description,
      "url": "https://hammondproperties.com.au/pet-friendly-mallacoota",
      "petsAllowed": true,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mallacoota",
        "addressRegion": "Victoria",
        "addressCountry": "AU"
      },
      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "Pet Friendly" },
        { "@type": "LocationFeatureSpecification", "name": "Fenced Yards" },
        { "@type": "LocationFeatureSpecification", "name": "Dog Beaches Nearby" },
        { "@type": "LocationFeatureSpecification", "name": "Pet Amenities Provided" }
      ]
    };

    let structuredDataScript = document.querySelector('#pet-friendly-structured-data');
    if (structuredDataScript) {
      structuredDataScript.textContent = JSON.stringify(structuredData);
    } else {
      structuredDataScript = document.createElement('script');
      structuredDataScript.id = 'pet-friendly-structured-data';
      structuredDataScript.type = 'application/ld+json';
      structuredDataScript.textContent = JSON.stringify(structuredData);
      document.head.appendChild(structuredDataScript);
    }

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  const petAmenities: PetAmenity[] = [
    {
      icon: PawPrint,
      title: "Pet Accessories",
      description: "Premium pet stainless steel feeding bowls provided in every pet-friendly property."
    },
    {
      icon: Shield,
      title: "Fully Fenced Yards",
      description: "Secure, private outdoor spaces where your pets can roam safely and freely."
    },
    {
      icon: Heart,
      title: "Local Pet Services",
      description: "Information of all locally operated services including vets and groomers."
    },
    {
      icon: MapPin,
      title: "Beach Access Nearby",
      description: "Direct access to dog-friendly beaches and walking trails from your luxury accommodation."
    }
  ];

  const localServices: LocalService[] = [
    {
      name: "The Vet & Co. Orbost",
      type: "Veterinarian in Orbost",
      address: "32 Salisbury St, Orbost VIC",
      phone: "(03) 5154 2387",
      description: "24/7 emergency veterinary care and routine services for your peace of mind."
    },
    {
      name: "Eden Veterinary Clinic",
      type: "Veterinarian in Eden",
      address: "2 Irene Cres, Eden NSW",
      phone: "(02) 6496 1252",
      description: "Give your beloved companions the gift of exceptional care at Eden Veterinary Clinic."
    },
    {
      name: "Origami Coffee",
      type: "Pet-Friendly Outdoor Cafe",
      address: "17 Dorron Ave, Mallacoota VIC",
      phone: "n/a",
      description: "Local favorite cafe with outdoor seating perfect for you and your furry friend."
    },
    {
      name: "Scallywags Mallacoota",
      type: "Pet-Friendly Outdoor Dining ",
      address: "14 Allan Dr, Mallacoota VIC 3892",
      phone: "(03) 4110 2059",
      description: "Ahoy there, matey! Welcome aboard to Scallywags, where the sea meets the plate and adventure awaits!"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Pet-Friendly Accommodation Mallacoota | Luxury Holiday Rentals | Hammond Properties"
        description="Bring your furry family to Mallacoota's finest pet-friendly holiday rentals. Luxury properties with dog beaches, fenced yards & premium pet amenities. Local pet services included."
      />
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] min-h-[400px] md:min-h-[500px] lg:min-h-[600px] overflow-hidden">
          <img
            src="/images/pet-friendly-hero.jpg"
            alt="Pet-friendly holidays in Mallacoota"
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
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
          
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-4xl text-white">
                <h1 className={`text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 transition-all duration-800 delay-200 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  Pet-Friendly Luxury in Mallacoota
                </h1>
                
                <p className={`text-xl md:text-2xl font-light mb-4 transition-all duration-800 delay-400 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  Where Every Family Member is Welcome
                </p>
                
                <p className={`text-lg mb-8 max-w-2xl transition-all duration-800 delay-500 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  Experience luxury holiday accommodation designed for both human and furry family members. 
                  Premium amenities, secure spaces, and local expertise included.
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
                    <Link to="#pet-properties">
                      Find Pet-Friendly Luxury
                    </Link>
                  </Button>
                  <Button 
                    asChild 
                    variant="outline" 
                    size="lg" 
                    className="px-8 py-4 text-lg bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-gray-900 hover:border-white hover:shadow-lg active:bg-white/90 active:text-gray-900 active:scale-95 transition-all duration-200"
                  >
                    <Link to="#local-services">
                      Pet Services Guide
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Premium Pet Amenities */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
                Premium Pet Amenities
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every detail considered for your pet's comfort and safety in our luxury accommodations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {petAmenities.map((amenity, index) => {
                const Icon = amenity.icon;
                return (
                  <Card key={index} className="card-luxury text-center">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-accent-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Icon className="w-8 h-8 text-accent-red" />
                      </div>
                      <h3 className="text-xl font-serif font-semibold text-primary mb-4">
                        {amenity.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {amenity.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pet-Friendly Properties */}
        <section id="pet-properties" className="py-20 bg-warm-neutral/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
                Pet-Friendly Luxury Properties
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Carefully selected properties that welcome pets without compromising on luxury and comfort.
              </p>
            </div>

            {propertiesLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-96 bg-gray-200 animate-pulse rounded-lg" />
                ))}
              </div>
            ) : petFriendlyProperties.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {petFriendlyProperties.map((property) => (
                  <div key={property.id} className="relative">
                    <PropertyCard property={property} />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-accent-red text-white">
                        <PawPrint className="w-3 h-3 mr-1" />
                        Pet-Friendly
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <PawPrint className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Pet-friendly properties loading...</p>
              </div>
            )}

            <div className="text-center mt-12">
              <Button asChild variant="default" size="lg">
                <Link to="/properties?pet_friendly=true">
                  View All Pet-Friendly Properties
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Pet-Related Experiences */}
        <section className="py-20 bg-luxury-cream">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
                Pet-Friendly Experiences
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover activities and adventures perfect for you and your furry companions.
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
                {petRelatedBlogs.map((blog) => (
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
                  More Pet Adventures
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Local Pet Services */}
        <section id="local-services" className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
                Local Pet Services & Knowledge
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our insider knowledge includes the best local services for your pet's needs during your stay.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {localServices.map((service, index) => (
                <Card key={index} className="card-luxury">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent-red/10 rounded-full flex items-center justify-center flex-shrink-0">
                        {service.type === 'Emergency Vet' && <Shield className="w-6 h-6 text-accent-red" />}
                        {service.type === 'Pet Store' && <PawPrint className="w-6 h-6 text-accent-red" />}
                        {service.type === 'Pet-Friendly Cafe' && <Heart className="w-6 h-6 text-accent-red" />}
                        {service.type === 'Pet Grooming' && <Star className="w-6 h-6 text-accent-red" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-serif font-semibold text-primary">
                            {service.name}
                          </h3>
                          <Badge variant="secondary" className="text-xs">
                            {service.type}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3">
                          {service.description}
                        </p>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {service.address}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="w-4 h-4" />
                            {service.phone}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-16 p-8 bg-accent-red/5 rounded-2xl border border-accent-red/10">
              <div className="text-center">
                <PawPrint className="w-12 h-12 text-accent-red mx-auto mb-4" />
                <h3 className="text-xl font-serif font-semibold text-primary mb-4">
                  Need More Pet Information?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Our local experts can provide personalized recommendations for pet-friendly beaches, 
                  walking trails, and services specific to your pet's needs.
                </p>
                <Button asChild variant="accent">
                  <Link to="/contact">
                    Contact Our Pet Concierge
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
                Book Your Pet-Friendly Luxury Escape
              </h2>
              <p className="text-xl mb-8 text-primary-foreground/90">
                Experience Mallacoota's finest pet-friendly accommodation where every family member is pampered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  variant="accent" 
                  size="lg" 
                  className="px-12 py-6 text-lg"
                >
                  <Link to="/properties?pet_friendly=true">
                    Book Pet-Friendly Stay
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="px-12 py-6 text-lg bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-gray-900 hover:border-white hover:shadow-lg active:bg-white/90 active:text-gray-900 active:scale-95 transition-all duration-200"
                >
                  <Link to="/contact">
                    Ask About Pet Services
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

export default PetFriendlyMallacoota;