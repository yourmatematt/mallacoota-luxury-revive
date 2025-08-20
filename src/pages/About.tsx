import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Heart, Home, Shield, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // SEO Meta Tags for About page
  useEffect(() => {
    // Set page title
    const title = "About Hammond Properties - 40+ Years Mallacoota Experience | Local Experts";
    document.title = title;
    
    // Set meta description
    const description = "Meet Amelia Hammond and Terry Pheeney - your local Mallacoota vacation rental experts. 40+ years combined experience, 1,000+ happy guests, 4.8★ rating. Born and raised locals providing exceptional hospitality.";
    
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

    updateOrCreateOGMeta('og:title', title);
    updateOrCreateOGMeta('og:description', description);
    updateOrCreateOGMeta('og:url', 'https://hammondproperties.com.au/about');
    updateOrCreateOGMeta('og:image', 'https://hammondproperties.com.au/images/about-hero-background.jpg');
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
    updateOrCreateTwitterMeta('twitter:image', 'https://hammondproperties.com.au/images/about-hero-background.jpg');

    // Structured data for About page - Organization schema
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "mainEntity": {
        "@type": "Organization",
        "@id": "https://hammondproperties.com.au/#organization",
        "name": "Hammond Properties",
        "alternateName": "Hammond Properties Mallacoota",
        "description": description,
        "url": "https://hammondproperties.com.au",
        "logo": "https://hammondproperties.com.au/images/hammond-properties-logo.jpg",
        "image": "https://hammondproperties.com.au/images/about-hero-background.jpg",
        "foundingDate": "2010", // Adjust based on actual founding date
        "founder": {
          "@type": "Person",
          "name": "Amelia Hammond",
          "jobTitle": "Founder & Managing Director",
          "image": "https://hammondproperties.com.au/images/amelia-about-page.jpg",
          "description": "With over 40 years of experience in hospitality and property management, Amelia has grown Hammond Properties from one holiday home to a trusted local service."
        },
        "employee": [
          {
            "@type": "Person",
            "name": "Amelia Hammond",
            "jobTitle": "Guest Experience & Property Care",
            "image": "https://hammondproperties.com.au/images/amelia-about-page.jpg"
          },
          {
            "@type": "Person", 
            "name": "Terry Pheeney",
            "jobTitle": "Property Maintenance & Support",
            "image": "https://hammondproperties.com.au/images/terry-about-page.png"
          }
        ],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Mallacoota",
          "addressRegion": "Victoria", 
          "addressCountry": "AU"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "-37.5667",
          "longitude": "149.7333"
        },
        "email": "amelia@hammondproperties.com.au",
        "serviceArea": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": "-37.5667",
            "longitude": "149.7333"
          },
          "geoRadius": "25000"
        },
        "knowsAbout": [
          "Vacation Rental Management",
          "Property Management", 
          "Hospitality Services",
          "Mallacoota Tourism",
          "Local Area Expertise"
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Vacation Rental Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Luxury Vacation Rentals",
                "description": "Premium holiday accommodation in Mallacoota"
              }
            },
            {
              "@type": "Offer", 
              "itemOffered": {
                "@type": "Service",
                "name": "Property Management Services",
                "description": "Comprehensive property management for vacation rental owners"
              }
            }
          ]
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "bestRating": "5",
          "worstRating": "1",
          "ratingCount": "1000"
        }
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://hammondproperties.com.au"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "About",
            "item": "https://hammondproperties.com.au/about"
          }
        ]
      }
    };

    // Add structured data script
    let structuredDataScript = document.querySelector('#about-structured-data');
    if (structuredDataScript) {
      structuredDataScript.textContent = JSON.stringify(structuredData);
    } else {
      structuredDataScript = document.createElement('script');
      structuredDataScript.id = 'about-structured-data';
      structuredDataScript.type = 'application/ld+json';
      structuredDataScript.textContent = JSON.stringify(structuredData);
      document.head.appendChild(structuredDataScript);
    }

    // Additional meta tags
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

    updateOrCreateMeta('keywords', 'Hammond Properties about, Amelia Hammond, Terry Pheeney, Mallacoota property management, local experts, vacation rental owners, hospitality experience');
    updateOrCreateMeta('author', 'Hammond Properties');

    // Cleanup function
    return () => {
      // Reset title
      document.title = 'Hammond Properties - Luxury Vacation Rentals';
      
      // Reset meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Experience Mallacoota\'s luxury vacation rentals with Hammond Properties. Come as guests. Leave as family.');
      }
      
      // Remove structured data
      const structuredDataScript = document.querySelector('#about-structured-data');
      if (structuredDataScript) {
        structuredDataScript.remove();
      }
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const values = [
    {
      icon: Heart,
      title: "Personal Care",
      description: "We treat every guest like family, ensuring your comfort and satisfaction from booking to departure."
    },
    {
      icon: Shield,
      title: "Trust & Reliability",
      description: "With years of experience and hundreds of satisfied guests, you can count on us for exceptional service."
    },
    {
      icon: Star,
      title: "Premium Quality",
      description: "Our properties are carefully selected and maintained to the highest standards of luxury and comfort."
    },
    {
      icon: Home,
      title: "Local Expertise",
      description: "As locals, we provide insider knowledge and recommendations to make your Mallacoota experience unforgettable."
    }
  ];

  const propertyOwnerBenefits = [
    "Professional property marketing and photography",
    "Dynamic pricing optimization to maximize revenue",
    "24/7 guest support and communication",
    "Comprehensive property maintenance and cleaning",
    "Detailed revenue reporting and analytics",
    "Local market expertise and guidance",
    "Hassle-free booking management"
  ];

  const teamMembers = [
    {
      name: "Amelia Hammond",
      role: "Founder & Managing Director",
      description: "A Mallacoota local with over 15 years in hospitality and property management. Amelia's passion for exceptional guest experiences drives our commitment to excellence.",
      image: "/images/amelia-about-page.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section with Animations */}
        <section className="relative h-[calc(100vh-5rem)] overflow-hidden">
          {/* Background Image with scale effect */}
          <div 
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-out ${
              isLoaded ? 'scale-100' : 'scale-105'
            }`}
            style={{ backgroundImage: 'url("/images/about-hero-background.jpg")' }}
          />
          
          {/* Enhanced Overlay */}
          <div className="hero-overlay" />
          
          {/* Content with staggered animations */}
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center text-white px-6 md:px-4 max-w-4xl mx-auto">
              {/* Main Title */}
              <h1 className={`text-4xl md:text-6xl font-serif font-bold mb-6 transition-all duration-800 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                About Hammond Properties
              </h1>
              
              {/* Quote */}
              <blockquote className={`text-xl md:text-2xl font-light leading-relaxed italic mb-6 transition-all duration-800 delay-400 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                "Amelia is more than just a property manager – she is your gateway to experiencing Mallacoota's magic. Her passion for exceptional hospitality and deep local knowledge creates unforgettable stays that turn guests into family."
              </blockquote>
              
              {/* Quote Attribution */}
              <div className={`text-lg font-medium transition-all duration-800 delay-600 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <span className="text-boutique-accent">— James, Past Property Owner</span>
              </div>
            </div>
          </div>
        </section>

      {/* Our Story Section */}
          
<section className="section-primary py-16">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
                    Our Story
                  </h2>
                  <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                    <p>
                      Founded with a simple belief that every guest deserves an exceptional experience, Hammond Properties
                      has grown from a single property to a curated collection of Mallacoota's finest vacation rentals.
                    </p>
                    <p>
                      What started as a passion project to share our love for this coastal paradise has evolved into
                      East Gippsland's premier luxury accommodation provider. We understand that a holiday is more than
                      just a getaway – it's a time to create memories that last a lifetime.
                    </p>
                    <p>
                      Our deep connection to Mallacoota, combined with our commitment to premium service, ensures that
                      every guest experiences the very best our region has to offer. From sunrise walks on pristine beaches
                      to sunset dinners overlooking the inlet, we're here to help make your coastal escape extraordinary.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <img
                    src="/images/luxury-property-management.jpg"
                    alt="Mallacoota coastal view"
                    className="w-full h-96 object-cover rounded-2xl shadow-medium"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-soft border">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">1,000+</p>
                        <p className="text-sm text-muted-foreground">Happy Guests</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">4.8</p>
                        <p className="text-sm text-muted-foreground">Average Rating</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">14</p>
                        <p className="text-sm text-muted-foreground">Properties</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        {/* What Drives Us Section */}
        <section className="section-secondary py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
                What Drives Us
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our core values shape every interaction and ensure that your experience as both guest and owner, exceeds expectations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="card-luxury text-center">
                    <CardContent className="pt-8">
                      <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 border-2 border-accent-red/20">
                        <Icon className="w-8 h-8 text-accent-red stroke-2" />
                      </div>
                      <h3 className="text-xl font-semibold text-primary mb-4">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Meet Amelia & Terry Section */}
        <section className="section-primary py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
                Meet Amelia & Terry
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The passionate people behind your exceptional Mallacoota experience. Granddaughter Ayla featuring in the photos after wanting to be on the website.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Amelia Card */}
              <Card className="card-luxury">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <img 
                        src="/images/amelia-about-page.jpg" 
                        alt="Amelia Hammond"
                        className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
                      />
                    </div>
                    <div className="text-center md:text-left">
                      <h3 className="text-2xl font-serif font-bold text-primary mb-2">
                        Amelia Hammond
                      </h3>
                      <p className="text-accent-red font-medium mb-4">
                        Guest Experience & Property Care
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
With over 40 years of experience in hospitality and property management, Amelia has grown Hammond Properties from one holiday home to a trusted local service. Born and raised in Orbost, she brings a natural warmth and attention to detail to every property that ensures every guest feels at home the moment they arrive.                       </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Terry Card */}
              <Card className="card-luxury">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <img 
                        src="/images/terry-about-page.png" 
                        alt="Terry"
                        className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
                      />
                    </div>
                    <div className="text-center md:text-left">
                      <h3 className="text-2xl font-serif font-bold text-primary mb-2">
                        Terry Pheeney
                      </h3>
                      <p className="text-accent-red font-medium mb-4">
                        Property Maintenance & Support
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Born and raised in Mallacoota, Terry brings local wisdom and years of hands-on experience from his time with Gippsland Ports. If there's ever an unforeseen issue with your property during your stay, you can trust Terry has the tools and know-how to promptly fix it. He might even share a tip or two about Mallacoota's best-kept fishing spots.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Property Owners Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                  For Property Owners
                </h2>
                <p className="text-xl text-white/90 leading-relaxed">
                  Turn your Mallacoota property into a thriving vacation rental with our comprehensive management service.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-serif font-bold mb-6">
                    Why Choose Hammond Properties?
                  </h3>
                  <ul className="space-y-4">
                    {propertyOwnerBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <Star className="w-5 h-5 text-accent-red mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-white/90">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-center">
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardContent className="p-8">
                      <h4 className="text-xl font-semibold mb-4 text-white">
                        Ready to Get Started?
                      </h4>
                      <p className="text-white/90 mb-6">
                        Let's discuss how we can maximize your property's potential and provide exceptional guest experiences.
                      </p>
                      <Button 
                        asChild
                        size="lg" 
                        className="bg-accent-red hover:bg-accent-red/90 text-white w-full"
                      >
                        <Link to="/contact">
                          Contact Us Today
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;