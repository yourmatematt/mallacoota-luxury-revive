import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Star, Users, Car, Heart, Wifi, MapPin, Calendar, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

interface PropertyDetail {
  id: string;
  title: string;
  subtitle: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  petFriendly: boolean;
  boatParking: boolean;
  rating: number;
  reviewCount: number;
  images: { url: string; title: string; alt: string }[];
  amenities: string[];
  keyAmenities: string[];
  description: string;
  location: string;
  price: number;
}

interface Review {
  id: string;
  name: string;
  location: string;
  date: string;
  rating: number;
  text: string;
  propertyId: string;
}

const PropertyDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [randomizedReviews, setRandomizedReviews] = useState<Review[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    message: "",
    property: ""
  });

  // Mock property data - will be replaced with CMS data
  const property: PropertyDetail = {
    id: id || "1",
    title: "Oceanview Villa",
    subtitle: "Luxury beachfront retreat with panoramic ocean views",
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    petFriendly: true,
    boatParking: true,
    rating: 4.9,
    reviewCount: 24,
    images: [
      { url: "/api/placeholder/800/600", title: "Main Living Area", alt: "Spacious living room with ocean views" },
      { url: "/api/placeholder/800/600", title: "Master Bedroom", alt: "King bed with ocean view balcony" },
      { url: "/api/placeholder/800/600", title: "Kitchen", alt: "Modern fully equipped kitchen" },
      { url: "/api/placeholder/800/600", title: "Outdoor Deck", alt: "Large deck with BBQ and seating" },
      { url: "/api/placeholder/800/600", title: "Pool Area", alt: "Private pool with ocean backdrop" },
      { url: "/api/placeholder/800/600", title: "Beach Access", alt: "Direct path to private beach" }
    ],
    amenities: ["Ocean View", "Private Pool", "BBQ Area", "Full Kitchen", "Laundry", "Parking", "WiFi", "Pet Friendly", "Beach Access", "Outdoor Furniture"],
    keyAmenities: ["Ocean View", "Private Pool", "BBQ Area", "Full Kitchen", "Beach Access", "Pet Friendly"],
    description: "Escape to this stunning oceanfront villa where luxury meets the natural beauty of Mallacoota. This exceptional property offers panoramic ocean views, private beach access, and all the amenities needed for an unforgettable coastal getaway.",
    location: "Mallacoota, VIC",
    price: 450
  };

  // Mock reviews data - will be replaced with CMS data
  const allReviews: Review[] = [
    {
      id: "1",
      name: "Sarah & Mike",
      location: "Melbourne, VIC",
      date: "November 2023",
      rating: 5,
      text: "Absolutely incredible property! The ocean views are breathtaking and the house has everything you could possibly need. We'll definitely be back!",
      propertyId: "1"
    },
    {
      id: "2", 
      name: "The Johnson Family",
      location: "Sydney, NSW",
      date: "October 2023",
      rating: 5,
      text: "Perfect family vacation spot. The kids loved the pool and beach access. House was immaculate and well-appointed.",
      propertyId: "1"
    },
    {
      id: "3",
      name: "Emma",
      location: "Brisbane, QLD", 
      date: "September 2023",
      rating: 5,
      text: "The photos don't do this place justice! Waking up to those ocean views every morning was magical. Highly recommend!",
      propertyId: "1"
    }
  ];

  // Mock similar properties
  const similarProperties = [
    {
      id: "2",
      title: "Coastal Cottage",
      subtitle: "Charming family getaway",
      guests: 6,
      rating: 4.8,
      reviewCount: 18,
      image: "/api/placeholder/400/300",
      price: 320
    },
    {
      id: "3", 
      title: "Waterfront Apartment",
      subtitle: "Modern lakeside living",
      guests: 4,
      rating: 4.7,
      reviewCount: 31,
      image: "/api/placeholder/400/300",
      price: 280
    }
  ];

  useEffect(() => {
    // Randomize reviews on each load
    const propertyReviews = allReviews.filter(review => review.propertyId === id);
    const shuffled = [...propertyReviews].sort(() => 0.5 - Math.random());
    setRandomizedReviews(shuffled);
    
    // Set property name in form
    setFormData(prev => ({ ...prev, property: property.title }));
  }, [id, property.title]);

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
    
    const mailtoLink = `mailto:amelia@hammondproperties.com.au?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[60vh] overflow-hidden">
          <img
            src={property.images[0].url}
            alt={property.images[0].alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          
          <div className="absolute bottom-8 left-8 text-white">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-2">
              {property.title}
            </h1>
            <p className="text-xl mb-4">{property.subtitle}</p>
            
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {property.guests} guests
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {property.location}
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 fill-luxury-gold text-luxury-gold" />
                {property.rating} ({property.reviewCount} reviews)
              </div>
            </div>
          </div>

          <Button
            onClick={() => setIsGalleryOpen(true)}
            className="absolute bottom-8 right-8 bg-white/90 text-foreground hover:bg-white"
          >
            View All Photos ({property.images.length})
          </Button>
        </section>

        {/* Key Amenities */}
        <section className="py-8 bg-accent/10">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {property.keyAmenities.map((amenity, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center">
                    <Wifi className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">{amenity}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <section>
                <h2 className="text-3xl font-serif font-bold text-primary mb-6">About This Property</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {property.description}
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-accent/10 rounded-lg">
                    <p className="text-2xl font-bold text-primary">{property.guests}</p>
                    <p className="text-sm text-muted-foreground">Guests</p>
                  </div>
                  <div className="text-center p-4 bg-accent/10 rounded-lg">
                    <p className="text-2xl font-bold text-primary">{property.bedrooms}</p>
                    <p className="text-sm text-muted-foreground">Bedrooms</p>
                  </div>
                  <div className="text-center p-4 bg-accent/10 rounded-lg">
                    <p className="text-2xl font-bold text-primary">{property.bathrooms}</p>
                    <p className="text-sm text-muted-foreground">Bathrooms</p>
                  </div>
                  <div className="text-center p-4 bg-accent/10 rounded-lg">
                    <p className="text-2xl font-bold text-primary">${property.price}</p>
                    <p className="text-sm text-muted-foreground">Per Night</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary mb-4">All Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-muted-foreground">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Reviews */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-serif font-bold text-primary">
                    Guest Reviews
                  </h2>
                  <Link to={`/testimonials?property=${property.id}`}>
                    <Button variant="outline">View All Reviews</Button>
                  </Link>
                </div>
                
                <div className="space-y-6">
                  {randomizedReviews.slice(0, 3).map((review) => (
                    <Card key={review.id} className="card-luxury">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} size={16} className="fill-luxury-gold text-luxury-gold" />
                          ))}
                        </div>
                        
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          "{review.text}"
                        </p>
                        
                        <div className="border-t border-border pt-4">
                          <p className="font-semibold text-primary">{review.name}</p>
                          <div className="flex items-center text-sm text-muted-foreground space-x-2">
                            <span>{review.location}</span>
                            <span>•</span>
                            <span>{review.date}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar - Booking Form */}
            <div className="lg:col-span-1">
              <Card className="card-luxury sticky top-24">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-3xl font-bold text-primary">${property.price}</span>
                      <span className="text-muted-foreground ml-1">/ night</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <Star className="w-4 h-4 mr-1 fill-luxury-gold text-luxury-gold" />
                      <span className="font-medium">{property.rating}</span>
                      <span className="text-muted-foreground ml-1">({property.reviewCount} reviews)</span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
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
                        rows={4}
                        placeholder="Any special requests or questions?"
                        value={formData.message}
                        onChange={handleInputChange}
                      />
                    </div>

                    <input type="hidden" name="property" value={formData.property} />

                    <Button type="submit" className="w-full">
                      Send Enquiry
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Similar Stays */}
          <section className="mt-16">
            <h2 className="text-3xl font-serif font-bold text-primary mb-8">Similar Stays</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {similarProperties.map((similar) => (
                <Link key={similar.id} to={`/properties/${similar.id}`}>
                  <Card className="card-luxury group">
                    <div className="relative overflow-hidden rounded-t-xl">
                      <img
                        src={similar.image}
                        alt={similar.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-serif font-semibold text-primary mb-2">
                        {similar.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">{similar.subtitle}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 fill-luxury-gold text-luxury-gold" />
                          <span className="font-medium">{similar.rating}</span>
                          <span className="text-muted-foreground ml-1">({similar.reviewCount})</span>
                        </div>
                        <div>
                          <span className="text-lg font-semibold text-primary">
                            ${similar.price}
                          </span>
                          <span className="text-muted-foreground">/ night</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Gallery Dialog */}
        <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
          <DialogContent className="max-w-6xl h-[90vh] p-0">
            <div className="relative h-full bg-black">
              <Button
                onClick={() => setIsGalleryOpen(false)}
                className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-black/70"
                size="sm"
              >
                <X className="w-4 h-4" />
              </Button>
              
              <div className="h-full flex">
                <div className="flex-1 relative">
                  <img
                    src={property.images[currentImageIndex].url}
                    alt={property.images[currentImageIndex].alt}
                    className="w-full h-full object-contain"
                  />
                  
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg">
                    <p className="font-medium">{property.images[currentImageIndex].title}</p>
                    <p className="text-sm opacity-75">
                      {currentImageIndex + 1} of {property.images.length}
                    </p>
                  </div>
                </div>
                
                <div className="w-24 bg-black/90 overflow-y-auto">
                  <div className="p-2 space-y-2">
                    {property.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-full aspect-square rounded overflow-hidden ${
                          currentImageIndex === index ? 'ring-2 ring-white' : ''
                        }`}
                      >
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
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