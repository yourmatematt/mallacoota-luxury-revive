import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star, Users, Bed, Bath, StarIcon, Wifi, ChevronRight, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyAmenities from "@/components/PropertyAmenities";
import { useToast } from "@/hooks/use-toast";
import { usePropertyReviews, usePropertyBySlug } from "@/hooks/useProperties";
import { usePropertyHeroImage, usePropertyGalleryImages } from "@/hooks/usePropertyImages";
import { usePropertyAmenities } from "@/hooks/usePropertyAmenities";
import PropertyGalleryOverlay from "@/components/PropertyGalleryOverlay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { SafeHtmlContent } from "@/components/SafeHtmlContent";
import RelatedBlogPostsSection from "@/components/RelatedBlogPostsSection";
import PageTransition from "@/components/PageTransition";
import { PawPrint, Anchor, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { validatePhone, getPhoneValidationMessage } from "@/lib/validation";
import { calculateDistance } from "@/lib/calculateDistance";
import ExperienceMap from "@/components/ExperienceMap";

// Keep stock images as fallbacks
import propertyHero1 from "@/assets/property-hero-1.jpg";
import propertyHero2 from "@/assets/property-hero-2.jpg";
import propertyHero3 from "@/assets/property-hero-3.jpg";
import propertyInterior1 from "@/assets/property-interior-1.jpg";
import propertyInterior2 from "@/assets/property-interior-2.jpg";
import propertyInterior3 from "@/assets/property-interior-3.jpg";
import propertyInterior4 from "@/assets/property-interior-4.jpg";
import propertyInterior5 from "@/assets/property-interior-5.jpg";

const PropertyDetail = () => {
  const { slug } = useParams();
  const { data: property, isLoading: propertyLoading } = usePropertyBySlug(slug || '');
  const { data: reviews } = usePropertyReviews(property?.id);
  const { data: propertyAmenities } = usePropertyAmenities(property?.property_id);
  const { toast } = useToast();
  
  // Get real images from Supabase
  const { data: heroImage } = usePropertyHeroImage(property?.image_folder || '');
  const { data: galleryImages } = usePropertyGalleryImages(property?.image_folder || '');
  
  
  const [showGallery, setShowGallery] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);

  // SEO META TAGS - Set when property loads
  useEffect(() => {
    if (property) {
      // Set page title using meta_title or fallback
      const title = property.meta_title || `${property.title} - ${property.bedrooms}BR Luxury Mallacoota Rental | Hammond Properties`;
      document.title = title;
      
      // Set meta description using meta_description or fallback
      const description = property.meta_description || 
        `${property.excerpt || 'Luxury holiday rental in Mallacoota'} ${property.bedrooms}-bedroom property sleeps ${property.guests} guests. Book your perfect getaway with Hammond Properties.`;
      
      // Update existing meta tags or create new ones
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      } else {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        metaDescription.setAttribute('content', description);
        document.head.appendChild(metaDescription);
      }

      // Open Graph meta tags for social sharing
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

      const propertyImage = heroImage?.url || getHeroImage(property.property_id);
      
      updateOrCreateOGMeta('og:title', title);
      updateOrCreateOGMeta('og:description', description);
      updateOrCreateOGMeta('og:url', `https://hammondproperties.com.au/properties/${property.slug}`);
      updateOrCreateOGMeta('og:image', propertyImage);
      updateOrCreateOGMeta('og:type', 'website');

      // Twitter Card meta tags
      const updateOrCreateTwitterMeta = (name: string, content: string) => {
        let twitterMeta = document.querySelector(`meta[name="${name}"]`);
        if (twitterMeta) {
          twitterMeta.setAttribute('content', content);
        } else {
          twitterMeta = document.createElement('meta');
          twitterMeta.setAttribute('name', name);
          twitterMeta.setAttribute('content', content);
          document.head.appendChild(twitterMeta);
        }
      };

      updateOrCreateTwitterMeta('twitter:card', 'summary_large_image');
      updateOrCreateTwitterMeta('twitter:title', title);
      updateOrCreateTwitterMeta('twitter:description', description);
      updateOrCreateTwitterMeta('twitter:image', propertyImage);

      // Calculate distances to key attractions for SEO
      const nearbyAttractions = property.latitude && property.longitude ? [
        { name: "Origami Coffee", lat: -37.556263, lng: 149.756987, type: "Restaurant" },
        { name: "Scallywags Restaurant", lat: -37.556441, lng: 149.757333, type: "Restaurant" },
        { name: "Betka Beach", lat: -37.585766, lng: 149.738400, type: "Beach" },
        { name: "Main Wharf", lat: -37.554442, lng: 149.757181, type: "TouristAttraction" },
        { name: "Mallacoota Town Centre", lat: -37.557734, lng: 149.757351, type: "LocalBusiness" }
      ].map(attraction => {
        const distance = calculateDistance(property.latitude!, property.longitude!, attraction.lat, attraction.lng);
        return {
          "@type": "Place",
          "name": attraction.name,
          "description": `${distance.display} from property`,
          "additionalType": `schema.org/${attraction.type}`,
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": attraction.lat,
            "longitude": attraction.lng
          }
        };
      }) : [];

      // Structured data for better search results
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "LodgingBusiness",
        "name": property.title,
        "description": description,
        "image": propertyImage,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Mallacoota",
          "addressRegion": "Victoria",
          "addressCountry": "AU"
        },
        ...(property.latitude && property.longitude && {
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": property.latitude,
            "longitude": property.longitude
          }
        }),
        "aggregateRating": property.airbnb_rating ? {
          "@type": "AggregateRating",
          "ratingValue": property.airbnb_rating,
          "bestRating": "5"
        } : undefined,
        "amenityFeature": propertyAmenities?.map(amenity => ({
          "@type": "LocationFeatureSpecification",
          "name": amenity.amenity.name
        })),
        ...(nearbyAttractions.length > 0 && {
          "nearbyAttraction": nearbyAttractions
        })
      };

      // Add structured data script
      let structuredDataScript = document.querySelector('#property-structured-data');
      if (structuredDataScript) {
        structuredDataScript.textContent = JSON.stringify(structuredData);
      } else {
        structuredDataScript = document.createElement('script');
        structuredDataScript.id = 'property-structured-data';
        structuredDataScript.type = 'application/ld+json';
        structuredDataScript.textContent = JSON.stringify(structuredData);
        document.head.appendChild(structuredDataScript);
      }
    }
  }, [property, propertyAmenities, heroImage]);


  // Reset to default meta tags when component unmounts
  useEffect(() => {
    return () => {
      document.title = 'Hammond Properties - Luxury Holiday Rentals';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Experience Mallacoota\'s luxury holiday rentals with Hammond Properties. Come as guests. Leave as family.');
      }
      
      // Remove property structured data
      const structuredDataScript = document.querySelector('#property-structured-data');
      if (structuredDataScript) {
        structuredDataScript.remove();
      }
    };
  }, []);

  // Stock images for fallbacks
  const heroImages = [propertyHero1, propertyHero2, propertyHero3];
  const stockGalleryImages = [propertyInterior1, propertyInterior2, propertyInterior3, propertyInterior4, propertyInterior5];
  
  // Get premium features from property amenities data
  const premiumFeatures = propertyAmenities?.filter(amenity => amenity.amenity.is_premium) || [];

  // Enhanced amenities for key display in hero
  const keyAmenities = [
    // Pet Friendly - only if true
    ...(property?.pet_friendly ? [{ 
      type: 'standard', 
      icon: <PawPrint className="w-3 h-3" />, 
      label: 'Pet Friendly' 
    }] : []),
    
    // Boat Parking - only if true  
    ...(property?.boat_parking ? [{ 
      type: 'standard', 
      icon: <Anchor className="w-3 h-3" />, 
      label: 'Boat Parking' 
    }] : []),
    
    // View Type - always show
    { 
      type: 'standard', 
      icon: <Eye className="w-3 h-3" />, 
      label: property?.view_type || 'Standard View' 
    },
    
    // Premium features - different styling
    ...premiumFeatures.slice(0, 4).map(amenity => ({
      type: 'premium',
      icon: <Star className="w-3 h-3 fill-amber-500 text-amber-500" />,
      label: amenity.amenity.name
    }))
  ];

  // Get hero image - use real image if available, otherwise fallback to stock
  const getHeroImage = (propertyId: string) => {
    if (heroImage?.url) {
      return heroImage.url;
    }
    // Fallback to stock image
    const index = parseInt(propertyId?.slice(-1) || '0') % heroImages.length;
    return heroImages[index];
  };

  // Get gallery images - use real images if available, otherwise fallback to stock
  const allImages = galleryImages && galleryImages.length > 0 
    ? galleryImages.map(img => img.url)
    : stockGalleryImages;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '',
    message: '',
    property: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get random review on each visit
  const [randomReview, setRandomReview] = useState<any>(null);
  
  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const randomIndex = Math.floor(Math.random() * reviews.length);
      setRandomReview(reviews[randomIndex]);
    }
  }, [reviews]);

  useEffect(() => {
    if (property) {
      setFormData(prev => ({ ...prev, property: property.title || '' }));
    }
  }, [property]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!property) return;

    // Add phone validation
    if (!formData.phone || formData.phone.trim() === '') {
      toast({
        title: "Error",
        description: "Please provide your phone number",
        variant: "destructive",
      });
      return;
    }

    // Phone number format validation (Australian format)
    if (!validatePhone(formData.phone)) {
      toast({
        title: "Error",
        description: getPhoneValidationMessage(),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Submitting enquiry for property:', property.property_id);
      
      const requestBody = {
        propertyId: property.property_id,
        propertyTitle: property.title,
        name: formData.name,
        email: formData.email,
        phone: formData.phone, // Phone is now required
        checkIn: formData.checkIn || undefined,
        checkOut: formData.checkOut || undefined,
        guests: formData.guests ? parseInt(formData.guests) : undefined,
        message: formData.message || undefined,
      };
      
      console.log('Request body:', requestBody);
      
      const response = await fetch('https://iqdmesndmfphlevakgqe.supabase.co/functions/v1/send-property-enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      let result;
      try {
        const responseText = await response.text();
        console.log('Raw response:', responseText);
        
        if (responseText) {
          result = JSON.parse(responseText);
        } else {
          throw new Error('Empty response from server');
        }
      } catch (parseError) {
        console.error('Error parsing response JSON:', parseError);
        throw new Error('Invalid response from server');
      }

      console.log('Parsed result:', result);

      if (result.success) {
        toast({
          title: "Enquiry Sent Successfully!",
          description: "Thank you for your enquiry. We'll get back to you soon!",
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          checkIn: '',
          checkOut: '',
          guests: '',
          message: '',
          property: property.title || '',
        });
      } else {
        throw new Error(result.error || 'Failed to send enquiry');
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      toast({
        title: "Error Sending Enquiry",
        description: error instanceof Error ? error.message : "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };


  if (propertyLoading) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto px-4 py-16 text-center">
            <div className="animate-pulse">Loading property details...</div>
          </div>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  if (!property) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold mb-4">Property not found</h1>
            <Button asChild>
              <Link to="/properties">Explore Our Collection</Link>
            </Button>
          </div>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="relative h-[calc(100vh-5rem)] overflow-hidden">
            <div className="relative h-full">
              <img
                src={getHeroImage(property.property_id)}
                alt={property.title || 'Property'}
                className="w-full h-full object-cover"
              />
              <div className="hero-overlay"></div>
            </div>
            
            {/* Mobile-first responsive layout */}
            <div className="absolute bottom-4 sm:bottom-8 md:bottom-12 left-4 sm:left-8 md:left-12 right-4 sm:right-8 md:right-12 text-white">
              <div className="max-w-2xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 sm:mb-6 fade-in-up">{property.title}</h1>
                <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed fade-in-up stagger-1">{property.subtitle}</p>
                
                {/* Stats row - responsive stacking */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 text-sm sm:text-base md:text-lg fade-in-up stagger-2 mb-6">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>{property.guests} guests</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bed className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>{property.bedrooms} bedrooms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>{property.bathrooms} bathrooms</span>
                    </div>
                  </div>
              </div>

              {/* Amenities and gallery button - stacked on mobile */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {property.pet_friendly && (
                    <Badge className="bg-white/90 text-primary shadow-lg text-xs">Pet Friendly</Badge>
                  )}
                  {property.boat_parking && (
                    <Badge className="bg-white/90 text-primary shadow-lg text-xs">Boat Parking</Badge>
                  )}
                  {property.view_type && (
                    <Badge className="bg-blue-500/90 text-white shadow-lg text-xs flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {property.view_type}
                    </Badge>
                  )}
                  {/* Show all premium amenities */}
                  {premiumFeatures.map((amenity, index) => (
                    <Badge key={index} className="bg-amber-500/90 text-white shadow-lg text-xs flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current" />
                      {amenity.amenity.name}
                    </Badge>
                  ))}
                </div>
                
                <Button 
                  onClick={() => {
                    setGalleryIndex(0);
                    setShowGallery(true);
                  }}
                  className="bg-white/95 text-primary hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg w-full sm:w-auto"
                  size="sm"
                >
                  View All {allImages.length} Photos
                </Button>
              </div>
            </div>
          </section>

          {/* Property Images Gallery */}
          <section className="py-6 sm:py-8 bg-gradient-subtle">
            <div className="container mx-auto px-4 sm:px-6">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-6 sm:mb-8 text-center">Property Gallery</h2>
              <div className="relative">
                <Carousel
                  opts={{
                    align: "start",
                    slidesToScroll: 1,
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-2 sm:-ml-4">
                    {allImages.map((image, index) => (
                      <CarouselItem key={index} className="pl-2 sm:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                        <div 
                          className="aspect-square overflow-hidden rounded-xl cursor-pointer group hover:scale-105 transition-all duration-300 shadow-soft hover:shadow-elegant"
                          onClick={() => {
                            setGalleryIndex(index);
                            setShowGallery(true);
                          }}
                        >
                          <img
                            src={image}
                            alt={`${property.title} - Image ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-1 sm:left-2 hover:bg-background h-8 w-8 sm:h-10 sm:w-10" />
                  <CarouselNext className="right-1 sm:right-2 hover:bg-background h-8 w-8 sm:h-10 sm:w-10" />
                </Carousel>
              </div>
            </div>
          </section>

          <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">About This Property</h2>
                  <div className="content-html">
                    {property.description ? (
                      <SafeHtmlContent 
                        htmlContent={property.description} 
                        className="prose max-w-none" 
                      />
                    ) : (
                      <p className="text-muted-foreground leading-relaxed">{property.excerpt}</p>
                    )}
                  </div>
                </div>

                {/* Property Amenities Section */}
                <PropertyAmenities propertyId={property.property_id} />

                {/* Distance Display Section */}
                {property?.latitude && property?.longitude && (
                  <div className="bg-warm-neutral/20 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="w-5 h-5 text-primary" />
                      <h3 className="text-xl font-bold text-primary">Perfect Location</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Walking Distance Section */}
                      <div>
                        <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                          🚶‍♀️ Walking Distance
                        </h4>
                        <div className="space-y-2 text-sm">
                          {(() => {
                            const destinations = [
                              { name: "Origami Coffee", lat: -37.556263, lng: 149.756987 },
                              { name: "Town Centre", lat: -37.557734, lng: 149.757351 },
                              { name: "Main Wharf", lat: -37.554442, lng: 149.757181 }
                            ];

                            return destinations
                              .map(dest => ({
                                ...dest,
                                distance: calculateDistance(property.latitude!, property.longitude!, dest.lat, dest.lng)
                              }))
                              .filter(dest => dest.distance.km < 2) // Only show walkable distances
                              .map(dest => (
                                <div key={dest.name} className="flex justify-between items-center py-1">
                                  <span className="text-muted-foreground">{dest.name}</span>
                                  <span className="font-medium text-primary">
                                    {dest.distance.walkTime || dest.distance.display}
                                  </span>
                                </div>
                              ));
                          })()}
                        </div>
                      </div>

                      {/* Short Drive Section */}
                      <div>
                        <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                          🚗 Short Drive
                        </h4>
                        <div className="space-y-2 text-sm">
                          {(() => {
                            const destinations = [
                              { name: "Betka Beach", lat: -37.585766, lng: 149.738400 },
                              { name: "Quarry Beach", lat: -37.600677, lng: 149.727781 },
                              { name: "Secret Beach", lat: -37.608520, lng: 149.721125 },
                              { name: "Golf Club", lat: -37.572311, lng: 149.756682 }
                            ];

                            return destinations
                              .map(dest => ({
                                ...dest,
                                distance: calculateDistance(property.latitude!, property.longitude!, dest.lat, dest.lng)
                              }))
                              .slice(0, 4) // Show top 4 destinations
                              .map(dest => (
                                <div key={dest.name} className="flex justify-between items-center py-1">
                                  <span className="text-muted-foreground">{dest.name}</span>
                                  <span className="font-medium text-primary">
                                    {dest.distance.driveTime || `${dest.distance.display} drive`}
                                  </span>
                                </div>
                              ));
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Interactive Experience Map Section */}
                {property?.latitude && property?.longitude && (
                  <section className="py-16 bg-accent/5">
                    <div className="container mx-auto px-4 lg:px-8">
                      <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
                          Explore from {property?.title || property?.name}
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                          Discover the best of Mallacoota with distances from your accommodation
                        </p>
                      </div>

                      {/* Interactive Map with Distance Calculations */}
                      <ExperienceMap
                        propertyCoordinates={{
                          lat: property.latitude,
                          lng: property.longitude
                        }}
                        propertyName={property.title || property.name}
                      />
                    </div>
                  </section>
                )}

                {/* Guest Reviews Section */}
                {reviews && reviews.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold">Guest Reviews</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{property.airbnb_rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
                        </span>
                      </div>
                    </div>
                    
                    {/* Featured Review */}
                    {randomReview && (
                      <Card className="mb-4">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold">{randomReview.reviewer}</h4>
                              <p className="text-sm text-muted-foreground">{randomReview.review_date}</p>
                            </div>
                            <div className="flex">
                              {randomReview.rating && [...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < parseInt(randomReview.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm leading-relaxed">{randomReview.review}</p>
                        </CardContent>
                      </Card>
                    )}

                    {/* View All Reviews Button */}
                    {reviews.length > 1 && (
                      <Button 
                        variant="outline" 
                        className="w-full mb-4"
                        onClick={() => setShowAllReviews(!showAllReviews)}
                      >
                        {showAllReviews ? 'Show Less' : `View All ${reviews.length} Reviews`}
                      </Button>
                    )}

                    {/* All Reviews (Expandable) */}
                    {showAllReviews && (
                      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                        {reviews.map((review: any, index: number) => (
                          <Card key={review.id || index}>
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h4 className="font-semibold">{review.reviewer}</h4>
                                  <p className="text-sm text-muted-foreground">{review.review_date}</p>
                                </div>
                                <div className="flex">
                                  {review.rating && [...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < parseInt(review.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-sm leading-relaxed">{review.review}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold mb-4">Make an Enquiry</h3>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          placeholder="Your phone number"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="checkIn">Check-in</Label>
                          <Input
                            id="checkIn"
                            name="checkIn"
                            type="date"
                            value={formData.checkIn}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="checkOut">Check-out</Label>
                          <Input
                            id="checkOut"
                            name="checkOut"
                            type="date"
                            value={formData.checkOut}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="guests">Guests</Label>
                        <Input
                          id="guests"
                          name="guests"
                          type="number"
                          min="1"
                          max={property.guests}
                          value={formData.guests}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          rows={3}
                          placeholder="Tell us about your stay..."
                          value={formData.message}
                          onChange={handleInputChange}
                        />
                      </div>

                      <Button type="submit" variant="accent" size="default" rounded="full" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send Enquiry"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <PropertyGalleryOverlay
            images={allImages}
            isOpen={showGallery}
            onClose={() => setShowGallery(false)}
            initialIndex={galleryIndex}
            propertyTitle={property.title || 'Property'}
          />

          {/* Related Blog Posts Section */}
          <RelatedBlogPostsSection />

          {/* CTA Section */}
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 lg:px-8 text-center">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                  Uncover Mallacoota's best-kept secrets
                </h2>
                
                <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
                  From pristine beaches to local hotspots - get the insider's guide.
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
    </PageTransition>
  );
};

export default PropertyDetail;