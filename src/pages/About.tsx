import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Heart, Home, Shield, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
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
    "Insurance and risk management",
    "Detailed revenue reporting and analytics",
    "Local market expertise and guidance",
    "Hassle-free booking management"
  ];

  const teamMembers = [
    {
      name: "Amelia Hammond",
      role: "Founder & Managing Director",
      description: "A Mallacoota local with over 15 years in hospitality and property management. Amelia's passion for exceptional guest experiences drives our commitment to excellence.",
      image: "/api/placeholder/300/400"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-6">
                About Hammond Properties
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We're more than just property managers – we're your gateway to experiencing Mallacoota's magic. 
                Our passion for exceptional hospitality and deep local knowledge creates unforgettable stays that turn guests into family.
              </p>
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
                    just a place to stay – it's about creating memories that last a lifetime.
                  </p>
                  <p>
                    Our deep connection to Mallacoota, combined with our commitment to premium service, ensures that 
                    every guest experiences the very best our region has to offer. From sunrise walks on pristine beaches 
                    to sunset dinners overlooking the inlet, we're here to make your coastal escape extraordinary.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/api/placeholder/600/500"
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

        {/* Our Values Section */}
        <section className="py-16 bg-accent/10">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
                What Drives Us
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our core values shape every interaction and ensure that your experience exceeds expectations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card 
                  key={index}
                  className="card-luxury text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <value.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-serif font-semibold text-primary mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Meet Our Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
                Meet Our Team
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The passionate people behind your perfect Mallacoota experience.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              {teamMembers.map((member, index) => (
                <Card 
                  key={index}
                  className="card-luxury animate-fade-in"
                >
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                      <div className="md:col-span-1">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-64 object-cover rounded-xl mx-auto"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <h3 className="text-2xl font-serif font-bold text-primary mb-2">
                          {member.name}
                        </h3>
                        <p className="text-primary/80 font-medium mb-4">
                          {member.role}
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                          {member.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Property Owners Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
                  For Property Owners
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Looking to maximize your property's potential? Partner with Hammond Properties and benefit from our 
                  proven track record of delivering exceptional returns while maintaining the highest standards of care 
                  for your investment.
                </p>

                <div className="space-y-4 mb-8">
                  {propertyOwnerBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <p className="text-muted-foreground">{benefit}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/contact">
                    <Button size="lg">
                      Partner With Us
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg">
                    Download Owner Guide
                  </Button>
                </div>
              </div>

              <div className="relative">
                <img
                  src="/api/placeholder/600/500"
                  alt="Luxury property management"
                  className="w-full h-96 object-cover rounded-2xl shadow-medium"
                />
                <div className="absolute top-6 right-6 bg-white p-4 rounded-xl shadow-soft border">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">25%</p>
                    <p className="text-sm text-muted-foreground">Higher Returns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Awards & Recognition Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
                Recognition & Awards
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our commitment to excellence has been recognized by industry leaders and guests alike.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="card-luxury text-center">
                <CardContent className="p-6">
                  <Award className="w-12 h-12 mx-auto mb-4 text-luxury-gold" />
                  <h3 className="text-lg font-serif font-semibold text-primary mb-2">
                    Excellence in Hospitality
                  </h3>
                  <p className="text-muted-foreground">
                    East Gippsland Tourism Award
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">2023</p>
                </CardContent>
              </Card>

              <Card className="card-luxury text-center">
                <CardContent className="p-6">
                  <Users className="w-12 h-12 mx-auto mb-4 text-luxury-gold" />
                  <h3 className="text-lg font-serif font-semibold text-primary mb-2">
                    Guest Choice Award
                  </h3>
                  <p className="text-muted-foreground">
                    Booking.com
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">2023</p>
                </CardContent>
              </Card>

              <Card className="card-luxury text-center">
                <CardContent className="p-6">
                  <Star className="w-12 h-12 mx-auto mb-4 text-luxury-gold" />
                  <h3 className="text-lg font-serif font-semibold text-primary mb-2">
                    5-Star Rating
                  </h3>
                  <p className="text-muted-foreground">
                    Airbnb Superhost Status
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">2020-2023</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-serif font-bold text-primary mb-4">
                Ready to Experience Mallacoota?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join our family of happy guests and discover why we're the trusted choice for luxury coastal accommodation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/properties">
                  <Button size="lg">
                    Browse Properties
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg">
                    Contact Us
                  </Button>
                </Link>
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