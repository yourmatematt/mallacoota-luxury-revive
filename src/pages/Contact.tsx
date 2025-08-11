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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-enquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
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

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit contact enquiry');
      }

      // Reset form on success
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        enquiryType: "general"
      });

      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. We'll get back to you soon!",
      });
      
    } catch (error) {
      console.error('Error submitting contact enquiry:', error);
      toast({
        title: "Error Sending Message",
        description: error instanceof Error ? error.message : "Please try again or contact us directly.",
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

                      <Button 
                        type="submit" 
                        variant="accent" 
                        size="lg" 
                        rounded="full" 
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>

                      <p className="text-sm text-muted-foreground text-center">
                        We typically respond within 24 hours. For urgent matters, please call us directly.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-primary mb-6">
                    Get in Touch
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Whether you're planning your first visit to Mallacoota or you're a returning guest, 
                    we're here to help make your stay memorable. Our local expertise and personal touch 
                    ensure you experience the very best of what our beautiful coastal town has to offer.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {contactInfo.map((info, index) => (
                    <Card key={index} className="card-elegant">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="bg-primary/10 p-3 rounded-lg">
                            <info.icon className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-primary mb-1">
                              {info.title}
                            </h3>
                            <p className="font-medium mb-1">
                              {info.details}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {info.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Additional Information */}
                <Card className="card-luxury bg-gradient-subtle">
                  <CardContent className="p-6">
                    <h3 className="font-serif font-bold text-primary mb-4">
                      Property Owners
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Interested in having us manage your Mallacoota property? We offer comprehensive 
                      property management services with a focus on maximizing your returns while 
                      providing exceptional guest experiences.
                    </p>
                    <Button asChild variant="outline" className="w-full sm:w-auto">
                      <Link to="/owner-enquiry">
                        Property Owner Enquiries
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-primary mb-4">
                Visit Mallacoota
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Located in the pristine wilderness of East Gippsland, Mallacoota offers 
                unparalleled natural beauty and peaceful coastal living.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Easy to Find</h3>
                <p className="text-sm text-muted-foreground">
                  Just 4.5 hours drive from Melbourne, accessible via the scenic Princes Highway
                </p>
              </div>
              <div>
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Year-Round Destination</h3>
                <p className="text-sm text-muted-foreground">
                  Beautiful in every season, from summer beach days to cozy winter retreats
                </p>
              </div>
              <div>
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Local Expertise</h3>
                <p className="text-sm text-muted-foreground">
                  Our team knows all the hidden gems and can guide you to the best experiences
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;