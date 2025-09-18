import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, Star, Heart, Users, ChevronDown, Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { validatePhone, getPhoneValidationMessage } from "@/lib/validation";

const Contact = () => {
  const { toast } = useToast();
  const [isLoaded, setIsLoaded] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    enquiryType: "general"
  });

  // SEO Data
  const seoData = {
    title: "Contact Hammond Properties | Book Your Mallacoota Holiday Accommodation",
    description: "Contact Hammond Properties for luxury holiday accommodation in Mallacoota, VIC. Expert local knowledge, 24-hour support, and personalized service. Call 0401 825 547 today.",
    canonical: "https://hammondproperties.com.au/contact",
    keywords: "contact Hammond Properties, Mallacoota accommodation booking, holiday rental enquiry, Mallacoota property management, East Gippsland accommodation contact",
    ogImage: "https://hammondproperties.com.au/images/contact-hero-background.jpg"
  };

  // Structured Data for LocalBusiness and ContactPage
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://hammondproperties.com.au/#localbusiness",
        "name": "Hammond Properties",
        "alternateName": "Hammond Properties Mallacoota",
        "description": "Premium holiday accommodation and property management services in Mallacoota, East Gippsland. Local expertise with personalized service for unforgettable getaways.",
        "url": "https://hammondproperties.com.au",
        "telephone": "+61401825547",
        "email": "amelia@hammondproperties.com.au",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Mallacoota",
          "addressLocality": "Mallacoota",
          "addressRegion": "VIC",
          "postalCode": "3892",
          "addressCountry": "AU"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -37.5642,
          "longitude": 149.7544
        },
        "areaServed": [
          {
            "@type": "City",
            "name": "Mallacoota",
            "addressRegion": "Victoria",
            "addressCountry": "Australia"
          },
          {
            "@type": "AdministrativeArea",
            "name": "East Gippsland",
            "addressRegion": "Victoria",
            "addressCountry": "Australia"
          }
        ],
        "serviceType": [
          "Holiday Accommodation",
          "Property Management",
          "Holiday Rentals",
          "Short Term Accommodation"
        ],
        "priceRange": "$$-$$$",
        "openingHours": "Mo-Su 09:00-18:00",
        "availableLanguage": "English",
        "paymentAccepted": ["Credit Card", "Bank Transfer", "Cash"],
        "currenciesAccepted": "AUD",
        "foundingDate": "2019",
        "slogan": "Your gateway to Mallacoota's hidden treasures",
        "knowsAbout": [
          "Mallacoota Tourism",
          "East Gippsland Accommodation",
          "Holiday Property Management",
          "Local Area Expertise",
          "Guest Services"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "500",
          "bestRating": "5",
          "worstRating": "1"
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+61401825547",
            "contactType": "customer service",
            "areaServed": "AU",
            "availableLanguage": "English",
            "hoursAvailable": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday", 
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
              ],
              "opens": "09:00",
              "closes": "18:00"
            }
          },
          {
            "@type": "ContactPoint",
            "email": "amelia@hammondproperties.com.au",
            "contactType": "customer service",
            "areaServed": "AU",
            "availableLanguage": "English"
          }
        ],
        "sameAs": [
          "https://www.facebook.com/hammondproperties",
          "https://www.instagram.com/hammondproperties"
        ]
      },
      {
        "@type": "ContactPage",
        "@id": "https://hammondproperties.com.au/contact#contactpage",
        "url": "https://hammondproperties.com.au/contact",
        "name": "Contact Hammond Properties",
        "description": "Get in touch with Hammond Properties for holiday accommodation bookings, property management enquiries, and local Mallacoota information.",
        "mainEntity": {
          "@type": "LocalBusiness",
          "@id": "https://hammondproperties.com.au/#localbusiness"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://hammondproperties.com.au/contact#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I make a booking?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can contact us directly via phone (0401 825 547) or email (amelia@hammondproperties.com.au). We'll check availability for your preferred dates and guide you through the booking process."
            }
          },
          {
            "@type": "Question",
            "name": "What's included in the rental?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "All our properties come fully furnished with linen, towels, kitchen essentials, and basic toiletries. Each property listing includes specific amenities and inclusions."
            }
          },
          {
            "@type": "Question",
            "name": "What's your cancellation policy?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We understand plans can change. Our cancellation policy varies by property and season. We'll provide full details when you make your booking."
            }
          },
          {
            "@type": "Question",
            "name": "Is parking available?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! All our properties include complimentary parking. Most have off-street parking, and we'll provide specific details for your chosen property."
            }
          },
          {
            "@type": "Question",
            "name": "Are pets welcome?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pet policies vary by property. Some of our homes welcome well-behaved pets with prior approval. Please let us know about your furry family members when booking."
            }
          },
          {
            "@type": "Question",
            "name": "What if I need help during my stay?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We're available 7 days a week for any questions or issues. We provide emergency contact details and are always just a phone call away."
            }
          },
          {
            "@type": "Question",
            "name": "How far are properties from the beach?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most of our properties are within walking distance of Mallacoota's beautiful beaches. We'll provide specific location details and walking times for each property."
            }
          },
          {
            "@type": "Question",
            "name": "What local recommendations do you provide?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "As locals, we love sharing our insider knowledge! We provide detailed guides about the best restaurants, activities, hidden gems, and seasonal highlights in Mallacoota."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://hammondproperties.com.au/contact#breadcrumb",
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
            "name": "Contact"
          }
        ]
      }
    ]
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Validate phone format
    if (!validatePhone(formData.phone)) {
      toast({
        title: "Error",
        description: getPhoneValidationMessage(),
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://iqdmesndmfphlevakgqe.supabase.co/functions/v1/send-contact-enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          enquiryType: formData.enquiryType,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Message Sent Successfully!",
          description: "Thank you for your enquiry. We'll get back to you soon!",
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          enquiryType: "general"
        });
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting contact enquiry:', error);
      toast({
        title: "Error Sending Message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "amelia@hammondproperties.com.au",
      description: "Primary contact for all enquiries",
      action: "mailto:amelia@hammondproperties.com.au"
    },
    {
      icon: Phone,
      title: "Phone",
      details: "0401 825 547",
      description: "Available 9am - 6pm AEST/AEDT, 7 days a week",
      action: "tel:0401825547"
    },
    {
      icon: MapPin,
      title: "Location",
      details: "Mallacoota, VIC 3892",
      description: "East Gippsland, Australia",
      action: null
    },
    {
      icon: Clock,
      title: "Response Time",
      details: "Within 24 hours",
      description: "Usually much faster during business hours",
      action: null
    }
  ];

  const enquiryTypes = [
    { value: "general", label: "General Enquiry" },
    { value: "booking", label: "Booking Enquiry" },
    { value: "property-owner", label: "Property Owner Enquiry" },
    { value: "current-guest", label: "Current Guest Support" },
    { value: "feedback", label: "Feedback" },
    { value: "media", label: "Media / Press" }
  ];

  const trustIndicators = [
    {
      icon: Star,
      value: "4.8/5",
      label: "Guest Rating",
      description: "Based on 500+ reviews"
    },
    {
      icon: Users,
      value: "1,000+",
      label: "Happy Families",
      description: "Hosted since 2019"
    },
    {
      icon: Heart,
      value: "95%",
      label: "Return Rate",
      description: "Guests who book again"
    }
  ];

  const faqs = [
    {
      question: "How do I make a booking?",
      answer: "You can contact us directly via phone (0401 825 547) or email (amelia@hammondproperties.com.au). We'll check availability for your preferred dates and guide you through the booking process."
    },
    {
      question: "What's included in the rental?",
      answer: "All our properties come fully furnished with linen, towels, kitchen essentials, and basic toiletries. Each property listing includes specific amenities and inclusions."
    },
    {
      question: "What's your cancellation policy?",
      answer: "We understand plans can change. Our cancellation policy varies by property and season. We'll provide full details when you make your booking."
    },
    {
      question: "Is parking available?",
      answer: "Yes! All our properties include complimentary parking. Most have off-street parking, and we'll provide specific details for your chosen property."
    },
    {
      question: "Are pets welcome?",
      answer: "Pet policies vary by property. Some of our homes welcome well-behaved pets with prior approval. Please let us know about your furry family members when booking."
    },
    {
      question: "What if I need help during my stay?",
      answer: "We're available 7 days a week for any questions or issues. We provide emergency contact details and are always just a phone call away."
    },
    {
      question: "How far are properties from the beach?",
      answer: "Most of our properties are within walking distance of Mallacoota's beautiful beaches. We'll provide specific location details and walking times for each property."
    },
    {
      question: "What local recommendations do you provide?",
      answer: "As locals, we love sharing our insider knowledge! We provide detailed guides about the best restaurants, activities, hidden gems, and seasonal highlights in Mallacoota."
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{seoData.title}</title>
        <meta name="title" content={seoData.title} />
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <link rel="canonical" href={seoData.canonical} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seoData.canonical} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:image" content={seoData.ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Contact Hammond Properties - Mallacoota Holiday Accommodation" />
        <meta property="og:site_name" content="Hammond Properties" />
        <meta property="og:locale" content="en_AU" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={seoData.canonical} />
        <meta property="twitter:title" content={seoData.title} />
        <meta property="twitter:description" content={seoData.description} />
        <meta property="twitter:image" content={seoData.ogImage} />
        <meta property="twitter:image:alt" content="Contact Hammond Properties - Mallacoota Holiday Accommodation" />

        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Hammond Properties" />
        <meta name="publisher" content="Hammond Properties" />
        <meta name="geo.region" content="AU-VIC" />
        <meta name="geo.placename" content="Mallacoota" />
        <meta name="geo.position" content="-37.5642;149.7544" />
        <meta name="ICBM" content="-37.5642, 149.7544" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main>
          <section className="relative min-h-[60vh] sm:min-h-[70vh] lg:h-[calc(100vh-5rem)] flex items-center bg-gradient-to-br from-primary via-primary/95 to-primary/80 overflow-hidden py-16 sm:py-20">
    <div className="absolute inset-0 bg-[url('/images/contact-hero-background.jpg')] bg-cover bg-center opacity-20"></div>
    
    <div className="relative z-10 container mx-auto px-4 lg:px-8">
      <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-serif font-bold text-white mb-4 sm:mb-6 drop-shadow-lg leading-tight">
          Get in Touch
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 drop-shadow-md px-4">
          We're here to help make your Mallacoota experience extraordinary. 
          Get in touch with any questions about our properties, bookings, or the local area.
        </p>
        
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {trustIndicators.map((indicator, index) => (
            <div 
              key={indicator.label}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 sm:p-4 text-center"
            >
              <div className="flex justify-center mb-2">
                <div className="p-2 bg-white/20 rounded-full">
                  <indicator.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white mb-1">{indicator.value}</div>
              <div className="text-xs sm:text-sm font-medium text-white mb-1">{indicator.label}</div>
              <div className="text-xs text-white/80 leading-tight">{indicator.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>

          <section className="py-16 relative z-20">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
                <div className="order-2 lg:order-1">
                  <Card className="bg-white shadow-2xl border-0 overflow-hidden">
                    <CardContent className="p-8 lg:p-10">
                      <div className="flex items-center mb-8">
                        <div className="p-3 bg-primary/10 rounded-full mr-4">
                          <MessageCircle className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h2 className="text-2xl lg:text-3xl font-serif font-bold text-primary">
                            Send us a Message
                          </h2>
                          <p className="text-muted-foreground">
                            We typically respond within 24 hours
                          </p>
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                              Name *
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                              className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
                              placeholder="Your full name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                              Email *
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
                              placeholder="your.email@example.com"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                              Phone Number <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              placeholder="+61 4XX XXX XXX"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                              className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
                            />
                            <p className="text-sm text-muted-foreground mt-1">
                              We'll only call if needed to discuss your enquiry
                            </p>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="enquiryType" className="text-sm font-medium text-gray-700">
                              Enquiry Type
                            </Label>
                            <select
                              id="enquiryType"
                              name="enquiryType"
                              value={formData.enquiryType}
                              onChange={handleInputChange}
                              className="w-full h-12 px-3 py-2 text-sm border border-gray-200 bg-background rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus:border-primary"
                            >
                              {enquiryTypes.map((type) => (
                                <option key={type.value} value={type.value}>
                                  {type.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                            Subject
                          </Label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            placeholder="Brief description of your enquiry"
                            className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                            Message *
                          </Label>
                          <Textarea
                            id="message"
                            name="message"
                            rows={6}
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Please provide details about your enquiry, including preferred dates if booking..."
                            required
                            className="border-gray-200 focus:border-primary focus:ring-primary/20 resize-none"
                          />
                        </div>

                        <Button
                          type="submit"
                          variant="default"
                          size="lg"
                          disabled={isSubmitting}
                          className="w-full h-12 font-medium"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>

                        <p className="text-sm text-muted-foreground text-center">
                          For urgent matters, please call us directly at{" "}
                          <a href="tel:0401825547" className="text-primary hover:underline font-medium">
                            0401 825 547
                          </a>
                        </p>
                      </form>
                    </CardContent>
                  </Card>
                </div>

                <div className="order-1 lg:order-2">
                  <div className="lg:sticky lg:top-8 space-y-8">
                    <Card className="bg-gradient-to-br from-white to-gray-50 shadow-xl border-0 overflow-hidden">
                      <CardContent className="p-8 lg:p-10">
                        <div className="mb-8">
                          <h2 className="text-2xl lg:text-3xl font-serif font-bold text-primary mb-4">
                            Contact Information
                          </h2>
                          <p className="text-lg text-muted-foreground leading-relaxed">
                            Whether you're planning your first visit to Mallacoota or you're a returning guest, 
                            we're here to ensure your experience is perfect.
                          </p>
                        </div>

                        <div className="space-y-4">
                          {contactInfo.map((info, index) => (
                            <div 
                              key={info.title}
                              className="group flex items-start space-x-4 p-3 rounded-xl hover:bg-white transition-all duration-300"
                            >
                              <div className="w-14 h-14 bg-primary/10 group-hover:bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                                <info.icon className="w-6 h-6 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-primary mb-2">
                                  {info.title}
                                </h3>
                                {info.action ? (
                                  <a 
                                    href={info.action}
                                    className="text-foreground font-medium mb-2 block hover:text-primary transition-colors duration-300 text-lg break-all"
                                  >
                                    {info.details}
                                  </a>
                                ) : (
                                  <p className="text-foreground font-medium mb-2 text-lg">
                                    {info.details}
                                  </p>
                                )}
                                <p className="text-muted-foreground">
                                  {info.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              <div className="max-w-7xl mx-auto mt-8">
                <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-serif font-bold text-primary mb-6">
                      Quick Actions
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Link to="/properties">
                        <Button 
                          variant="outline" 
                          size="lg" 
                          className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                        >
                          Browse Properties
                        </Button>
                      </Link>
                      <Link to="/testimonials">
                        <Button 
                          variant="outline" 
                          size="lg" 
                          className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                        >
                          Read Guest Reviews
                        </Button>
                      </Link>
                      <a href="tel:0401825547">
                        <Button 
                          size="lg" 
                          className="w-full bg-primary hover:bg-primary/90 text-white transition-all duration-300"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call Now
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

    <section className="py-16 bg-white">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary mb-6">
          Why Choose Hammond Properties?
        </h2>
        <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
          We're not just property managers – we're your local Mallacoota experts, 
          dedicated to creating unforgettable experiences for every guest.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card 
            className="card-luxury text-center animate-fade-in"
            style={{ animationDelay: '0s' }}
          >
            <CardContent className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center border-2 border-accent-red/80 shadow-sm relative">
                <Home className="w-8 h-8 text-accent-red" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-primary mb-3">
                Local Expertise
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Born and raised in Mallacoota, we know all the hidden gems and can provide insider tips for your perfect getaway.
              </p>
            </CardContent>
          </Card>

          <Card 
            className="card-luxury text-center animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            <CardContent className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center border-2 border-accent-red/80 shadow-sm relative">
                <Heart className="w-8 h-8 text-accent-red" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-primary mb-3">
                Personal Service
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We treat every guest like family, ensuring your stay exceeds expectations from check-in to check-out.
              </p>
            </CardContent>
          </Card>

          <Card 
            className="card-luxury text-center animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            <CardContent className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center border-2 border-accent-red/80 shadow-sm relative">
                <Star className="w-8 h-8 text-accent-red" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-primary mb-3">
                Quality Guaranteed
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                All our properties are personally selected and maintained to the highest standards for your comfort and peace of mind.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </section>

          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary mb-4">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Everything you need to know about booking and staying with us
                  </p>
                </div>

                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                      <CardContent className="p-0">
                        <button
                          onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                          className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-300"
                        >
                          <h3 className="text-lg font-semibold text-primary pr-4">
                            {faq.question}
                          </h3>
                          <div className={`flex-shrink-0 transform transition-transform duration-300 ${openFAQ === index ? 'rotate-180' : ''}`}>
                            <ChevronDown className="w-5 h-5 text-primary" />
                          </div>
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                          <div className="px-6 pb-6">
                            <p className="text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                  Ready to Plan Your Mallacoota Adventure?
                </h2>
                <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
                  Don't wait – the perfect Mallacoota getaway is just a message away. 
                  Contact us today and let's start planning your unforgettable escape.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild variant="accent" size="lg" className="px-8 py-3 font-medium">
                    <Link to="/properties">
                      Explore Our Collection
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="px-8 py-3 border-white bg-white text-primary hover:bg-white/90 hover:text-primary active:bg-white/80 active:scale-95"
                  >
                    <a href="tel:0401825547">
                      <Phone className="w-4 h-4 mr-2" />
                      Call 0401 825 547
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Contact;