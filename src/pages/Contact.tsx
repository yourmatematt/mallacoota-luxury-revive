import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    enquiryType: "general"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = formData.subject || `${formData.enquiryType} Enquiry from ${formData.name}`;
    const body = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Enquiry Type: ${formData.enquiryType}
Subject: ${formData.subject}

Message:
${formData.message}
    `.trim();
    
    const mailtoLink = `mailto:amelia@hammondproperties.com.au?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    
    toast({
      title: "Message Sent",
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
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "amelia@hammondproperties.com.au",
      description: "Primary contact for all enquiries"
    },
    {
      icon: Phone,
      title: "Phone",
      details: "0401 825 547",
      description: "Available 9am - 6pm, 7 days a week"
    },
    {
      icon: MapPin,
      title: "Location",
      details: "Mallacoota, VIC 3892",
      description: "East Gippsland, Australia"
    },
    {
      icon: Clock,
      title: "Response Time",
      details: "Within 24 hours",
      description: "Usually much faster during business hours"
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
      {/* Hero Section with Background Image */}
<section className="pt-20 py-16 relative overflow-hidden min-h-[600px] flex items-center">
  {/* Background Image */}
  <div 
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: 'url("/images/contact-hero-background.jpg")' }}
  >
    {/* Overlay for better text readability */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/70"></div>
  </div>
  
  {/* Content */}
  <div className="container mx-auto px-4 lg:px-8 relative z-10">
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 drop-shadow-lg">
        Contact Us
      </h1>
      <p className="text-xl text-white/90 leading-relaxed drop-shadow-md">
        We're here to help make your Mallacoota experience extraordinary. 
        Get in touch with any questions about our properties, bookings, or the local area.
      </p>
    </div>
  </div>
</section>

        {/* Contact Form & Info Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <Card className="card-luxury">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <MessageCircle className="w-6 h-6 text-primary mr-3" />
                      <h2 className="text-2xl font-serif font-bold text-primary">
                        Send us a Message
                      </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <div>
                          <Label htmlFor="enquiryType">Enquiry Type</Label>
                          <select
                            id="enquiryType"
                            name="enquiryType"
                            value={formData.enquiryType}
                            onChange={handleInputChange}
                            className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            {enquiryTypes.map((type) => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="Brief description of your enquiry"
                        />
                      </div>

                      <div>
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          rows={6}
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Please provide details about your enquiry..."
                          required
                        />
                      </div>

                     <Button type="submit" variant="accent" size="lg" rounded="full" className="w-full">
  Send Message
</Button>

                      <p className="text-sm text-muted-foreground text-center">
                        We typically respond within 24 hours. For urgent matters, please call us directly.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div>
                <Card className="card-luxury h-full">
                  <CardContent className="p-8 h-full flex flex-col">
                    <div className="mb-6">
                      <h2 className="text-2xl font-serif font-bold text-primary mb-4">
                        Get in Touch
                      </h2>
                      <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                        Whether you're planning your first visit to Mallacoota or you're a returning guest, 
                        we're here to ensure your experience is perfect. Our local expertise and personal 
                        service make all the difference.
                      </p>
                    </div>

                    {/* Primary Contact Info */}
                    <div className="space-y-6 mb-8">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Mail className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-1">
                            Email
                          </h3>
                          <p className="text-foreground font-medium mb-1">
                            amelia@hammondproperties.com.au
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Primary contact for all enquiries
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Phone className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-1">
                            Phone
                          </h3>
                          <p className="text-foreground font-medium mb-1">
                            0401 825 547
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Available 9am - 6pm, 7 days a week
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Clock className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-1">
                            Response Time
                          </h3>
                          <p className="text-foreground font-medium mb-1">
                            Within 24 hours
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Usually much faster during business hours
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-3 mt-auto">
                      <h3 className="text-lg font-serif font-semibold text-primary mb-4">
                        Quick Actions
                      </h3>
                      
                      <a 
                        href="mailto:amelia@hammondproperties.com.au"
                        className="flex items-center p-3 bg-accent/10 rounded-lg hover:bg-accent/20 transition-colors group"
                      >
                        <Mail className="w-5 h-5 text-primary mr-3" />
                        <div>
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                            Email Us Directly
                          </p>
                          <p className="text-sm text-muted-foreground">
                            amelia@hammondproperties.com.au
                          </p>
                        </div>
                      </a>
                      
                      <a 
                        href="tel:0401825547"
                        className="flex items-center p-3 bg-accent/10 rounded-lg hover:bg-accent/20 transition-colors group"
                      >
                        <Phone className="w-5 h-5 text-primary mr-3" />
                        <div>
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                            Call Us Now
                          </p>
                          <p className="text-sm text-muted-foreground">
                            0401 825 547
                          </p>
                        </div>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-accent/10">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-serif font-bold text-primary mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-muted-foreground">
                  Quick answers to common questions about our properties and services.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="card-luxury">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-primary mb-3">
                      What's included in your properties?
                    </h3>
                    <p className="text-muted-foreground">
                      All our properties include fully equipped kitchens, quality linens, towels, 
                      WiFi, and essential amenities. Many also feature BBQs, laundry facilities, 
                      and outdoor spaces.
                    </p>
                  </CardContent>
                </Card>

                <Card className="card-luxury">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-primary mb-3">
                      How do I check-in?
                    </h3>
                    <p className="text-muted-foreground">
                      We provide detailed check-in instructions via email 24-48 hours before arrival. 
                      Most properties feature self-check-in with lockboxes or smart locks for your convenience.
                    </p>
                  </CardContent>
                </Card>

                <Card className="card-luxury">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-primary mb-3">
                      Are pets allowed?
                    </h3>
                    <p className="text-muted-foreground">
                      Some of our properties are pet-friendly. Look for the pet-friendly badge 
                      on property listings or contact us to discuss your specific needs.
                    </p>
                  </CardContent>
                </Card>

                <Card className="card-luxury">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-primary mb-3">
                      What's your cancellation policy?
                    </h3>
                    <p className="text-muted-foreground">
                      Cancellation policies vary by property and season. Full details are provided 
                      during booking. We aim to be as flexible as possible while protecting both 
                      guests and property owners.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

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
              
              <Button asChild size="lg" className="bg-accent-red hover:bg-accent-red/90 text-white px-8 py-4 text-lg rounded-full shadow-strong hover:shadow-medium transition-all duration-300">
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
  );
};

export default Contact;