import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star, Users, Bed, Bath, Wifi } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { usePropertyReviews, usePropertyBySlug } from "@/hooks/useProperties";
import { usePropertyHeroImage, usePropertyGalleryImages } from "@/hooks/usePropertyImages";
import PropertyGalleryOverlay from "@/components/PropertyGalleryOverlay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { supabase } from "@/integrations/supabase/client";
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
  const { toast } = useToast();
  
  // Get real images from Supabase
  const { data: heroImage } = usePropertyHeroImage(property?.image_folder || '');
  const { data: galleryImages } = usePropertyGalleryImages(property?.image_folder || '');
  
  const [showGallery, setShowGallery] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  // Stock images for fallbacks
  const heroImages = [propertyHero1, propertyHero2, propertyHero3];
  const stockGalleryImages = [propertyInterior1, propertyInterior2, propertyInterior3, propertyInterior4, propertyInterior5];
  
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
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.functions.invoke('send-property-enquiry', {
        body: {
          propertyId: property.property_id,
          propertyTitle: property.title,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          guests: formData.guests ? parseInt(formData.guests) : undefined,
          message: formData.message,
        }
      });

      if (error) {
        throw new Error(error.message);
      }

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

      toast({
        title: "Enquiry Sent Successfully!",
        description: "Thank you for your enquiry. We'll get back to you soon!",
      });
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      toast({
        title: "Error Sending Enquiry",
        description: "Please try again or contact us directly.",
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
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-pulse">Loading property details...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Property not found</h1>
          <Button asChild>
            <Link to="/properties">View All Properties</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
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
                <Badge className="bg-white/90 text-primary shadow-lg text-xs">WiFi</Badge>
                <Badge className="bg-white/90 text-primary shadow-lg text-xs">Kitchen</Badge>
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
                    <div dangerouslySetInnerHTML={{ __html: property.description }} />
                  ) : (
                    <p className="text-muted-foreground leading-relaxed">{property.excerpt}</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.pet_friendly && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Pet Friendly</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">WiFi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Kitchen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Air Conditioning</span>
                  </div>
                  {property.boat_parking && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Boat Parking</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Parking</span>
                  </div>
                </div>
              </div>

              {randomReview && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Featured Guest Review</h3>
                  <Card>
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
                      <p className="text-sm">{randomReview.review}</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-26">
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
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
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

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
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
      </main>

      <Footer />
    </div>
  );
};

export default PropertyDetail;