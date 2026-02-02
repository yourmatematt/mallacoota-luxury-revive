import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Dog, Car, Heart, Bed, Bath, Eye, Waves } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useProperties } from "@/hooks/useProperties";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters from "@/components/PropertyFilters";
import SEOHead from "@/components/SEOHead";

const Properties = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [filters, setFilters] = useState({
    guests: 2,
    petFriendly: false,
    boatParking: false,
    waterViews: false,
  });

  const { data: properties, isLoading, error } = useProperties({
    guests: filters.guests,
    petFriendly: filters.petFriendly || undefined,
    boatParking: filters.boatParking || undefined,
    waterViews: filters.waterViews || undefined,
  });

  // Generate dynamic SEO values based on filters
  const getSEOValues = () => {
    let title = "Mallacoota Holiday Homes | Waterfront & Pet-Friendly";
    let description = "Browse 14 luxury holiday rentals in Mallacoota. From beachfront properties to pet-friendly accommodations. Book your perfect stay with Hammond Properties.";

    // Customize based on active filters
    const activeFilters = [];
    if (filters.petFriendly) activeFilters.push("pet-friendly");
    if (filters.boatParking) activeFilters.push("boat parking");
    if (filters.waterViews) activeFilters.push("water view");
    if (filters.guests > 2) activeFilters.push(`${filters.guests} guest`);

    if (activeFilters.length > 0) {
      title = `${activeFilters.join(', ')} Properties in Mallacoota | Hammond Properties`;
      description = `Find ${activeFilters.join(', ')} holiday rentals in Mallacoota. ${properties?.length || 0} properties available. Premium accommodations with Hammond Properties.`;
    }

    return { title, description };
  };

  const { title, description } = getSEOValues();

  // Handle structured data and additional meta tags
  useEffect(() => {

    // Structured data for properties listing
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Mallacoota Holiday Rentals",
      "description": description,
      "url": "https://hammondproperties.com.au/properties",
      "mainEntity": {
        "@type": "ItemList",
        "name": "Hammond Properties Holiday Rentals",
        "description": "Luxury holiday rental properties in Mallacoota, Victoria",
        "numberOfItems": properties?.length || 14,
        "itemListElement": properties?.map((property, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": property.title,
          "item": {
            "@type": "LodgingBusiness",
            "name": property.title,
            "description": property.excerpt,
            "url": `https://hammondproperties.com.au/properties/${property.slug}`,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Mallacoota",
              "addressRegion": "Victoria",
              "addressCountry": "AU"
            }
          }
        })) || []
      },
      "provider": {
        "@type": "Organization",
        "name": "Hammond Properties",
        "url": "https://hammondproperties.com.au",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "500",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
    };

    // Add structured data script
    let structuredDataScript = document.querySelector('#properties-structured-data');
    if (structuredDataScript) {
      structuredDataScript.textContent = JSON.stringify(structuredData);
    } else {
      structuredDataScript = document.createElement('script');
      structuredDataScript.id = 'properties-structured-data';
      structuredDataScript.type = 'application/ld+json';
      structuredDataScript.textContent = JSON.stringify(structuredData);
      document.head.appendChild(structuredDataScript);
    }

    // Standalone Breadcrumb Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": "https://hammondproperties.com.au/properties#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": {
            "@id": "https://hammondproperties.com.au/"
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Properties"
        }
      ]
    };

    // Add breadcrumb structured data script
    let breadcrumbScript = document.querySelector('#properties-breadcrumb-data');
    if (breadcrumbScript) {
      breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);
    } else {
      breadcrumbScript = document.createElement('script');
      breadcrumbScript.id = 'properties-breadcrumb-data';
      breadcrumbScript.type = 'application/ld+json';
      breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);
      document.head.appendChild(breadcrumbScript);
    }

    // Add og:image attributes and geo tags
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

    updateOrCreateOGMeta('og:image:width', '1200');
    updateOrCreateOGMeta('og:image:height', '630');
    updateOrCreateOGMeta('og:image:alt', 'Luxury holiday rental properties in Mallacoota');
    updateOrCreateMeta('twitter:image:alt', 'Mallacoota holiday rentals collection');
    updateOrCreateMeta('geo.region', 'AU-VIC');
    updateOrCreateMeta('geo.placename', 'Mallacoota');
    updateOrCreateMeta('geo.position', '-37.5642;149.7544');
    updateOrCreateMeta('ICBM', '-37.5642, 149.7544');

    // Cleanup function
    return () => {
      // Remove structured data
      const structuredDataScript = document.querySelector('#properties-structured-data');
      if (structuredDataScript) {
        structuredDataScript.remove();
      }

      // Remove breadcrumb data
      const breadcrumbScript = document.querySelector('#properties-breadcrumb-data');
      if (breadcrumbScript) {
        breadcrumbScript.remove();
      }
    };
  }, [filters, properties]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const resetFilters = () => {
    setFilters({ guests: 2, petFriendly: false, boatParking: false, waterViews: false });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold mb-4">Error loading properties</h1>
            <p className="text-muted-foreground">Please try again later.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={title}
        description={description}
        ogImage="https://hammondproperties.com.au/images/properties-hero-background.jpg"
      />
      <Header />
      <main>
        {/* Hero Section with Animations - Mobile Optimized */}
        <section className="relative min-h-[70vh] sm:min-h-[80vh] lg:h-[calc(100vh-5rem)] overflow-hidden">
          <img
            src="/images/properties-hero-background.jpg"
            alt="Stunning Mallacoota waterfront holiday rentals with premium amenities and coastal views"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out ${
              isLoaded ? 'scale-100' : 'scale-105'
            }`}
            loading="eager"
            decoding="async"
          />
          
          {/* Enhanced Overlay */}
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Content with staggered animations */}
          <div className="relative z-10 h-full flex items-center justify-center py-16 sm:py-20">
            <div className="text-center text-white px-6 md:px-4 max-w-6xl mx-auto w-full">
              {/* Main Title */}
              <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 sm:mb-6 transition-all duration-800 delay-200 leading-tight ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                Luxury Holiday Rentals in Mallacoota
              </h1>

              {/* Subtitle */}
              <p className={`text-base sm:text-lg md:text-xl lg:text-2xl font-light mb-4 sm:mb-6 max-w-3xl mx-auto leading-relaxed transition-all duration-800 delay-400 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                Discover your dream East Gippsland coastal escape — from oceanfront waterfront estates to family beach vacation retreats.
              </p>
              
              <div className={`flex flex-wrap justify-center gap-3 mb-6 sm:mb-8 transition-all duration-800 delay-600 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <Link
                  to="/discover-mallacoota"
                  className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-full hover:bg-white/30 active:bg-white/20 transition-all duration-200 text-sm font-medium backdrop-blur-sm border border-white/30 hover:scale-105 active:scale-95"
                >
                  🌊 Local Guide & Activities
                </Link>
                <Link
                  to="/discover-mallacoota/gabo-island"
                  className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-full hover:bg-white/30 active:bg-white/20 transition-all duration-200 text-sm font-medium backdrop-blur-sm border border-white/30 hover:scale-105 active:scale-95"
                >
                  🏰 Gabo Island Tours
                </Link>
              </div>
              
              {/* Filter Controls with Animation - Mobile Optimized */}
              <div className={`max-w-6xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20 transition-all duration-800 delay-800 ${
                isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
              }`}>
                <div className="flex flex-col space-y-4 sm:space-y-6">
                  <div>
                    {/* Mobile-friendly header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
                      <div className="hidden sm:block flex-1"></div>
                      <h3 className="text-sm sm:text-base lg:text-lg font-medium text-white text-center leading-relaxed px-2">
                        Whether you're chasing ocean views, a family-friendly yard, or a quiet hideaway, find your perfect Mallacoota stay.
                      </h3>
                      <div className="flex justify-center sm:justify-end sm:flex-1">
                        {(filters.guests !== 2 || filters.petFriendly || filters.boatParking || filters.waterViews) && (
                          <Button 
                            onClick={resetFilters}
                            variant="outline"
                            size="sm"
                            className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 hover:border-white hover:shadow-lg active:bg-white/90 active:text-gray-900 active:scale-95 text-xs sm:text-sm px-3 py-2 transition-all duration-200"
                          >
                            Reset Filters
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {/* Property Filters Component - Mobile Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                      {/* Guest Count */}
                      <div className="space-y-2 sm:space-y-3 col-span-2 lg:col-span-1">
                        <label className="text-xs sm:text-sm font-medium text-white flex items-center justify-center">
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          Guests
                        </label>
                        <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setFilters(prev => ({ ...prev, guests: Math.max(1, prev.guests - 1) }))}
                            className="h-8 w-8 sm:h-10 sm:w-10 p-0 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 hover:border-white hover:shadow-lg active:bg-white/90 active:text-gray-900 active:scale-95 text-sm transition-all duration-200"
                          >
                            -
                          </Button>
                          <span className="text-white font-medium w-6 sm:w-8 text-center text-sm sm:text-base">{filters.guests}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setFilters(prev => ({ ...prev, guests: prev.guests + 1 }))}
                            className="h-8 w-8 sm:h-10 sm:w-10 p-0 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 hover:border-white hover:shadow-lg active:bg-white/90 active:text-gray-900 active:scale-95 text-sm transition-all duration-200"
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      {/* Pet Friendly Toggle */}
                      <div className="space-y-2 sm:space-y-3">
                        <label className="text-xs sm:text-sm font-medium text-white text-center block">Pet Friendly</label>
                        <Button
                          variant={filters.petFriendly ? "default" : "outline"}
                          onClick={() => setFilters(prev => ({ ...prev, petFriendly: !prev.petFriendly }))}
                          className={`w-full justify-center text-xs sm:text-sm py-2 sm:py-3 transition-colors duration-200 ${
                            filters.petFriendly 
                              ? "bg-black/60 text-white border-black/70 sm:hover:bg-white/20 sm:hover:border-white/30" 
                              : "bg-white/20 border-white/30 text-white sm:hover:bg-black/60 sm:hover:text-white sm:hover:border-black/70"
                          }`}
                        >
                          <Dog className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          {filters.petFriendly ? "Yes" : "Any"}
                        </Button>
                      </div>

                      {/* Boat Parking Toggle */}
                      <div className="space-y-2 sm:space-y-3">
                        <label className="text-xs sm:text-sm font-medium text-white text-center block">Boat Parking</label>
                        <Button
                          variant={filters.boatParking ? "default" : "outline"}
                          onClick={() => setFilters(prev => ({ ...prev, boatParking: !prev.boatParking }))}
                          className={`w-full justify-center text-xs sm:text-sm py-2 sm:py-3 transition-colors duration-200 ${
                            filters.boatParking 
                              ? "bg-black/60 text-white border-black/70 sm:hover:bg-white/20 sm:hover:border-white/30" 
                              : "bg-white/20 border-white/30 text-white sm:hover:bg-black/60 sm:hover:text-white sm:hover:border-black/70"
                          }`}
                        >
                          <Car className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          {filters.boatParking ? "Yes" : "Any"}
                        </Button>
                      </div>

                      {/* Water Views Toggle */}
                      <div className="space-y-2 sm:space-y-3">
                        <label className="text-xs sm:text-sm font-medium text-white text-center block">Water Views</label>
                        <Button
                          variant={filters.waterViews ? "default" : "outline"}
                          onClick={() => setFilters(prev => ({ ...prev, waterViews: !prev.waterViews }))}
                          className={`w-full justify-center text-xs sm:text-sm py-2 sm:py-3 transition-colors duration-200 ${
                            filters.waterViews 
                              ? "bg-black/60 text-white border-black/70 sm:hover:bg-white/20 sm:hover:border-white/30" 
                              : "bg-white/20 border-white/30 text-white sm:hover:bg-black/60 sm:hover:text-white sm:hover:border-black/70"
                          }`}
                        >
                          <Waves className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          {filters.waterViews ? "Yes" : "Any"}
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <Button
                      onClick={() => {
                        document.getElementById('properties-grid')?.scrollIntoView({ 
                          behavior: 'smooth',
                          block: 'start'
                        });
                      }}
                      className="w-full sm:w-auto bg-accent-red hover:bg-accent-red/90 active:bg-accent-red/80 text-white px-6 sm:px-8 py-3 rounded-full font-medium transition-all duration-200 hover:scale-105 active:scale-100 shadow-lg hover:shadow-xl text-sm sm:text-base"
                      disabled={isLoading}
                    >
                      {isLoading 
                        ? "Loading properties..." 
                        : `View ${properties?.length || 0} Stays`
                      }
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Properties Grid */}
        <section id="properties-grid" className="section-primary py-16">
          <div className="container mx-auto px-4 lg:px-8">
            
            {/* Sticky Header - Always Visible - Fixed z-index */}
            <div className="sticky top-20 z-30 bg-gradient-to-r from-gray-800 to-gray-700 text-white p-4 sm:p-6 rounded-lg shadow-lg mb-8"
              style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold mb-2">
                    {(filters.guests !== 2 || filters.petFriendly || filters.boatParking || filters.waterViews) 
                      ? "Filtered Properties" 
                      : "All Properties"
                    }
                  </h2>
                  <div className="flex items-center space-x-4 text-white/90 text-sm">
                    {filters.guests !== 2 && (
                      <span>{filters.guests} guests</span>
                    )}
                    {filters.petFriendly && (
                      <span>Pet friendly</span>
                    )}
                    {filters.boatParking && (
                      <span>Boat parking</span>
                    )}
                    {filters.waterViews && (
                      <span>Water views</span>
                    )}
                    <span>• {properties?.length || 0} properties found</span>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // Scroll to filter controls in hero
                      const element = document.querySelector('.bg-white\\/10.backdrop-blur-sm');
                      if (element) {
                        element.scrollIntoView({ 
                          behavior: 'smooth',
                          block: 'center'
                        });
                      }
                    }}
                    className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 hover:border-white hover:shadow-lg active:bg-white/90 active:text-gray-900 active:scale-95 transition-all duration-200"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Back to Filters
                  </Button>
                  {(filters.guests !== 2 || filters.petFriendly || filters.boatParking || filters.waterViews) && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={resetFilters}
                      className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 hover:border-white hover:shadow-lg active:bg-white/90 active:text-gray-900 active:scale-95 transition-all duration-200"
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                  <Card key={index} className="card-luxury animate-pulse">
                    <div className="aspect-video bg-muted rounded-t-xl"></div>
                    <CardContent className="p-6">
                      <div className="h-4 bg-muted rounded mb-2"></div>
                      <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                      <div className="h-3 bg-muted rounded mb-2"></div>
                      <div className="h-3 bg-muted rounded w-2/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Properties Grid */}
            {!isLoading && properties && properties.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.map((property, index) => (
                  <div 
                    key={property.id}
                    className={`transition-all duration-800 ${
                      isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ animationDelay: `${1000 + index * 100}ms` }}
                  >
                    <PropertyCard property={property} />
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {!isLoading && properties?.length === 0 && (
              <div className="text-center py-16">
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-2xl font-serif font-bold text-primary mb-6">
                    No Properties Match Your Current Filters
                  </h3>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    We couldn't find any properties matching your specific criteria, but don't worry - we have amazing alternatives!
                  </p>

                  <div className="bg-luxury-cream p-8 rounded-2xl mb-12 text-left">
                    <h4 className="text-xl font-serif font-semibold text-primary mb-6 text-center">
                      Consider These Popular Coastal Accommodation Options
                    </h4>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h5 className="font-semibold text-primary mb-3">🏖️ Oceanfront Waterfront Estates</h5>
                        <p className="text-muted-foreground mb-4">
                          Wake up to stunning East Gippsland water views in our premium beachfront estates and lakefront homes. These coastal properties offer direct access to Mallacoota's pristine waters, perfect for swimming, kayaking, and fishing.
                        </p>

                        <h5 className="font-semibold text-primary mb-3">🐕 Pet-Friendly Beach Vacation</h5>
                        <p className="text-muted-foreground mb-4">
                          Bring your four-legged family members! Our pet-friendly coastal properties feature secure yards, easy beach access, and welcoming policies so everyone can enjoy the Mallacoota family vacation together.
                        </p>
                      </div>

                      <div>
                        <h5 className="font-semibold text-primary mb-3">⛵ Boat Parking & Fishing Access</h5>
                        <p className="text-muted-foreground mb-4">
                          Launch your fishing adventure from home base. Select waterfront properties offer secure boat parking and easy water access, making them ideal for fishing charters and water sports enthusiasts.
                        </p>

                        <h5 className="font-semibold text-primary mb-3">👨‍👩‍👧‍👦 Family Holiday Accommodation</h5>
                        <p className="text-muted-foreground mb-4">
                          Planning a family reunion or coastal group getaway? Our spacious East Gippsland properties accommodate up to 14 guests with multiple bedrooms and outdoor entertaining spaces.
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 p-6 bg-white rounded-xl border border-primary/10">
                      <h5 className="font-semibold text-primary mb-3 text-center">Why Choose Hammond Properties?</h5>
                      <div className="grid md:grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="font-medium text-primary">500+ Five-Star Reviews</p>
                          <p className="text-sm text-muted-foreground">Consistently rated #1 in Mallacoota</p>
                        </div>
                        <div>
                          <p className="font-medium text-primary">Personal Concierge Service</p>
                          <p className="text-sm text-muted-foreground">24/7 support and local expertise</p>
                        </div>
                        <div>
                          <p className="font-medium text-primary">Premium Properties</p>
                          <p className="text-sm text-muted-foreground">Luxury amenities and prime locations</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={resetFilters} size="lg" variant="accent">
                      View All 14 Properties
                    </Button>
                    <Button asChild size="lg" variant="outline">
                      <Link to="/contact">
                        Speak to Our Team
                      </Link>
                    </Button>
                  </div>

                  <p className="text-sm text-muted-foreground mt-6">
                    Can't find exactly what you're looking for? Our property experts can help you find the perfect Mallacoota accommodation for your needs.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Discover East Gippsland's Coastal Secrets
              </h2>

              <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
                From pristine beaches and fishing spots to family activities - get the insider's guide to your coastal vacation.
              </p>
              
              <Button asChild variant="accent" size="default" rounded="full">
                <Link to="/discover-mallacoota">
                  Explore Local Guides
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Properties;