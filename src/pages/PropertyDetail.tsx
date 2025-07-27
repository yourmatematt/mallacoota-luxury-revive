import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Star, Users, Bed, Bath, ChevronLeft, ChevronRight, Wifi, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { usePropertyImages } from "@/hooks/usePropertyImages";
import { usePropertyReviews, usePropertyBySlug } from "@/hooks/useProperties";

const PropertyDetail = () => {
  const { slug } = useParams();
  const { data: property, isLoading: propertyLoading } = usePropertyBySlug(slug || '');
  const { data: reviews } = usePropertyReviews(property?.id);
  const { data: images } = usePropertyImages(property?.image_folder);
  const { toast } = useToast();
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = `Property Enquiry - ${formData.property}`;
    const body = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Property: ${formData.property}
Check-in: ${formData.checkIn}
Check-out: ${formData.checkOut}
Guests: ${formData.guests}

Message:
${formData.message}
    `.trim();
    
    const mailtoLink = `mailto:hello@discovermallacoota.com.au?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    
    toast({
      title: "Enquiry Sent",
      description: "Your enquiry has been sent to our team. We'll get back to you soon!",
    });
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
        <section className="relative h-[60vh] overflow-hidden">
          <div className="relative">
            <img
              src={images?.[currentImageIndex]?.url || `/lovable-uploads/${property.image_folder}-1.jpg`}
              alt={property.title || 'Property'}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder-property.jpg';
              }}
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          
          <div className="absolute bottom-8 left-8 text-white">
            <h1 className="text-4xl font-bold mb-4">{property.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{property.subtitle}</p>
            
            <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{property.guests} guests</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bed className="h-4 w-4" />
                  <span>{property.bedrooms} bedrooms</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath className="h-4 w-4" />
                  <span>{property.bathrooms} bathrooms</span>
                </div>
              </div>
          </div>

          {/* Key amenities */}
          <div className="absolute bottom-8 right-8">
              <div className="flex flex-wrap gap-2">
                {property.pet_friendly && (
                  <Badge variant="secondary">Pet Friendly</Badge>
                )}
                {property.boat_parking && (
                  <Badge variant="secondary">Boat Parking</Badge>
                )}
                <Badge variant="outline">WiFi</Badge>
                <Badge variant="outline">Kitchen</Badge>
              </div>
              
              <Button 
                onClick={() => setShowGallery(true)}
                variant="outline" 
                className="w-full"
              >
                View All {images?.length || 1} Photos
              </Button>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">About This Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description || property.excerpt}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.pet_friendly && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Pet Friendly</span>
                    </div>
                  )}
                  {property.boat_parking && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Boat Parking</span>
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
              <Card className="sticky top-8">
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

                    <Button type="submit" className="w-full">
                      Send Enquiry
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Dialog open={showGallery} onOpenChange={setShowGallery}>
          <DialogContent className="max-w-4xl h-[80vh]">
            <DialogHeader>
              <DialogTitle>Property Photos</DialogTitle>
            </DialogHeader>
            <div className="relative flex-1">
              <img
                src={images?.[currentImageIndex]?.url || `/lovable-uploads/${property.image_folder}-1.jpg`}
                alt={`${property.title} - ${currentImageIndex + 1}`}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder-property.jpg';
                }}
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2"
                onClick={() => setCurrentImageIndex(
                  currentImageIndex === 0 ? (images?.length || 1) - 1 : currentImageIndex - 1
                )}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                onClick={() => setCurrentImageIndex(
                  currentImageIndex === (images?.length || 1) - 1 ? 0 : currentImageIndex + 1
                )}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 rounded-full px-3 py-1">
                <span className="text-white text-sm">
                  {currentImageIndex + 1} / {images?.length || 1}
                </span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>

      <Footer />
    </div>
  );
};

export default PropertyDetail;