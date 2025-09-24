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

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="About Hammond Properties - 40+ Years Mallacoota Experience | Local Experts"
        description="Meet Amelia Hammond and Terry Pheeney - your local Mallacoota holiday rental experts. 40+ years combined experience, 1,000+ happy guests, 4.8★ rating. Born and raised locals providing exceptional hospitality."
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
                    Founded with a simple belief that every guest deserves an exceptional experience, Hammond Properties
                    has grown from a single property to a curated collection of Mallacoota's finest holiday rentals.
                  </p>
                  <p>
                    Our deep connection to Mallacoota, combined with our commitment to premium service, ensures that
                    every guest experiences the very best our region has to offer.
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
                  description: "We treat every guest like family, ensuring your comfort from booking to departure."
                },
                {
                  icon: Shield,
                  title: "Trust & Reliability",
                  description: "With years of experience, you can count on us for exceptional service."
                },
                {
                  icon: Star,
                  title: "Premium Quality",
                  description: "Our properties are maintained to the highest standards of luxury and comfort."
                },
                {
                  icon: Home,
                  title: "Local Expertise",
                  description: "As locals, we provide insider knowledge to make your stay unforgettable."
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
                        With over 40 years of experience in hospitality and property management, Amelia brings natural warmth and attention to detail to every property.
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
                        Born and raised in Mallacoota, Terry brings local wisdom and hands-on experience to ensure every property is perfectly maintained.
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