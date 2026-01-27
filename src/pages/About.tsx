import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Heart, Home, Shield, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Page load animation effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // SEO enhancements: og:image attributes, geo tags, and Person schema
  useEffect(() => {
    // Helper function to update or create meta tags
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

    // Add og:image attributes
    updateOrCreateOGMeta('og:image:width', '1200');
    updateOrCreateOGMeta('og:image:height', '630');
    updateOrCreateOGMeta('og:image:alt', 'Amelia Hammond and Terry Pheeney - Hammond Properties owners');

    // Add Twitter image alt
    updateOrCreateMeta('twitter:image:alt', 'Hammond Properties owners in Mallacoota');

    // Add geo tags for local SEO
    updateOrCreateMeta('geo.region', 'AU-VIC');
    updateOrCreateMeta('geo.placename', 'Mallacoota');
    updateOrCreateMeta('geo.position', '-37.5642;149.7544');
    updateOrCreateMeta('ICBM', '-37.5642, 149.7544');

    // Person schema for Amelia Hammond and Terry Pheeney
    const personSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": "https://hammondproperties.com.au/about#amelia-hammond",
          "name": "Amelia Hammond",
          "jobTitle": "Founder & Managing Director",
          "description": "With over 40 years of experience in hospitality and property management, Amelia brings natural warmth and attention to detail to every property.",
          "worksFor": {
            "@type": "LocalBusiness",
            "@id": "https://hammondproperties.com.au/#localbusiness",
            "name": "Hammond Properties"
          },
          "image": "https://hammondproperties.com.au/images/amelia-about-page.jpg"
        },
        {
          "@type": "Person",
          "@id": "https://hammondproperties.com.au/about#terry-pheeney",
          "name": "Terry Pheeney",
          "jobTitle": "Property Maintenance & Support",
          "description": "Born and raised in Mallacoota, Terry brings local wisdom and hands-on experience to ensure every property is perfectly maintained.",
          "worksFor": {
            "@type": "LocalBusiness",
            "@id": "https://hammondproperties.com.au/#localbusiness",
            "name": "Hammond Properties"
          },
          "image": "https://hammondproperties.com.au/images/terry-about-page.png"
        },
        {
          "@type": "AboutPage",
          "@id": "https://hammondproperties.com.au/about",
          "url": "https://hammondproperties.com.au/about",
          "name": "About Hammond Properties",
          "description": "Meet the team behind Hammond Properties - local Mallacoota experts providing exceptional holiday rental experiences.",
          "mainEntity": {
            "@type": "LocalBusiness",
            "@id": "https://hammondproperties.com.au/#localbusiness"
          }
        }
      ]
    };

    let schemaScript = document.querySelector('#about-structured-data');
    if (schemaScript) {
      schemaScript.textContent = JSON.stringify(personSchema);
    } else {
      schemaScript = document.createElement('script');
      schemaScript.id = 'about-structured-data';
      schemaScript.type = 'application/ld+json';
      schemaScript.textContent = JSON.stringify(personSchema);
      document.head.appendChild(schemaScript);
    }

    // Cleanup function
    return () => {
      const script = document.querySelector('#about-structured-data');
      if (script) script.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="About Hammond Properties | Local Mallacoota Experts"
        description="Meet Amelia Hammond & Terry Pheeney - Mallacoota locals with 40+ years experience. 1,000+ happy guests, 4.8★ rating. Your holiday rental experts."
        ogImage="https://hammondproperties.com.au/images/about-hero-background.jpg"
      />
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-[calc(100vh-5rem)] overflow-hidden">
          <div
            className={`absolute inset-0 bg-cover bg-centre bg-no-repeat transition-all duration-1000 ease-out ${
              isLoaded ? 'scale-100' : 'scale-105'
            }`}
            style={{ backgroundImage: 'url("/images/about-hero-background.jpg")' }}
          />
          <div className="hero-overlay" />
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center text-white px-6 md:px-4 max-w-4xl mx-auto">
              <h1 className={`text-4xl md:text-6xl font-serif font-bold mb-6 transition-all duration-800 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                About Hammond Properties
              </h1>
              <blockquote className={`text-xl md:text-2xl font-light leading-relaxed italic mb-6 transition-all duration-800 delay-400 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                "Amelia is more than just a property manager – she is your gateway to experiencing Mallacoota's magic."
              </blockquote>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="section-primary py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Founded with a simple belief that every guest deserves an exceptional coastal experience, Hammond Properties
                    has grown from a single property to a curated collection of Mallacoota's finest waterfront estates and luxury holiday rentals.
                  </p>
                  <p>
                    Our deep connection to East Gippsland, combined with our commitment to premium service, ensures that
                    every guest experiences the very best of coastal living - from fishing and kayaking to family beach vacations.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/images/luxury-property-management.jpg"
                  alt="Luxury waterfront holiday rental in Mallacoota"
                  className="w-full h-96 object-cover rounded-2xl shadow-medium"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* What Drives Us */}
        <section className="section-secondary py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
                What Drives Us
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Heart,
                  title: "Personal Care",
                  description: "We treat every guest like family, ensuring your comfort from booking to departure at our coastal properties."
                },
                {
                  icon: Shield,
                  title: "Trust & Reliability",
                  description: "With years of East Gippsland experience, you can count on us for exceptional oceanfront accommodation service."
                },
                {
                  icon: Star,
                  title: "Premium Quality",
                  description: "Our waterfront estates are maintained to the highest standards of luxury and coastal comfort."
                },
                {
                  icon: Home,
                  title: "Local Expertise",
                  description: "As Mallacoota locals, we provide insider knowledge on fishing, kayaking, and family activities."
                }
              ].map((value, index) => {
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

        {/* Team Section */}
        <section className="section-primary py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
                Meet Amelia & Terry
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <Card className="card-luxury">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    <img
                      src="/images/amelia-about-page.jpg"
                      alt="Amelia Hammond, Hammond Properties"
                      className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
                      loading="lazy"
                    />
                    <div className="text-center md:text-left">
                      <h3 className="text-2xl font-serif font-bold text-primary mb-2">
                        Amelia Hammond
                      </h3>
                      <p className="text-accent-red font-medium mb-4">
                        Founder & Managing Director
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        With over 40 years of experience in East Gippsland hospitality and coastal property management, Amelia brings natural warmth and attention to detail to every waterfront estate.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-luxury">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    <img
                      src="/images/terry-about-page.png"
                      alt="Terry Pheeney, Hammond Properties"
                      className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
                      loading="lazy"
                    />
                    <div className="text-center md:text-left">
                      <h3 className="text-2xl font-serif font-bold text-primary mb-2">
                        Terry Pheeney
                      </h3>
                      <p className="text-accent-red font-medium mb-4">
                        Property Maintenance & Support
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Born and raised in Mallacoota, Terry brings East Gippsland local wisdom and hands-on experience to ensure every coastal property is perfectly maintained for your family vacation.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;