import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Heart, Home, Shield, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);

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
          <section className="py-16">
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
                        <p className="text-2xl font-bold text-primary">500+</p>
                        <p className="text-sm text-muted-foreground">Happy Guests</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">4.9</p>
                        <p className="text-sm text-muted-foreground">Average Rating</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">15+</p>
                        <p className="text-sm text-muted-foreground">Properties</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        {/* What Drives Us Section */}
        <section className="py-20 bg-primary/5">
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
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
                Meet Amelia & Terry
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The passionate people behind your exceptional Mallacoota experience.
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
                        Founder & Managing Director
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        A Mallacoota local with over 15 years in hospitality and property management. Amelia's passion for exceptional guest experiences drives our commitment to excellence.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Terry Card - Placeholder */}
              <Card className="card-luxury">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <img 
                        src="/images/terry-placeholder.jpg" 
                        alt="Terry"
                        className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
                      />
                    </div>
                    <div className="text-center md:text-left">
                      <h3 className="text-2xl font-serif font-bold text-primary mb-2">
                        Terry Hammond
                      </h3>
                      <p className="text-accent-red font-medium mb-4">
                        [Role to be added]
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        [Description to be added - placeholder content for Terry's bio and role information]
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