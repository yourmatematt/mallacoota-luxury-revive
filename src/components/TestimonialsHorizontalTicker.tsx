import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const TestimonialsHorizontalTicker = () => {
  // Using hardcoded testimonials since database fields are null
  const testimonials = [
    {
      id: 1,
      name: "Dana",
      location: "Victoria",
      date: "March 2023",
      rating: 5,
      text: "This place was amazing and really exceeded our expectations. The views were spectacular and the property was immaculately maintained. Perfect for our family vacation!",
      property: "27 Mirrabooka Rd"
    },
    {
      id: 2,
      name: "Gail", 
      location: "ACT",
      date: "April 2023",
      rating: 5,
      text: "Brilliant location with amazing views that took our breath away every morning. The attention to detail in the property was outstanding and the service was exceptional.",
      property: "27 Mirrabooka Rd"
    },
    {
      id: 3,
      name: "Chris",
      location: "Victoria", 
      date: "June 2023",
      rating: 5,
      text: "We had a great stay with Alex and the team. Their local knowledge and recommendations made our holiday unforgettable. The property was perfect for our group.",
      property: "Waterfront Villa"
    },
    {
      id: 4,
      name: "Andrea",
      location: "NSW",
      date: "June 2023", 
      rating: 5,
      text: "Fell in love at first sight when we arrived. The property is even more beautiful in person and the location is absolutely perfect for exploring Mallacoota.",
      property: "Beachside Retreat"
    },
    {
      id: 5,
      name: "James",
      location: "Queensland",
      date: "Sept 2023",
      rating: 5,
      text: "Outstanding layout and design. I appreciated every thoughtful detail that made our stay comfortable and memorable. Will definitely return!",
      property: "27 Mirrabooka Rd"
    },
    {
      id: 6,
      name: "Michael", 
      location: "Victoria",
      date: "May 2023",
      rating: 5,
      text: "Perfect location with great views and excellent amenities. The property management team was responsive and helpful throughout our entire stay.",
      property: "Waterfront Villa"
    },
    {
      id: 7,
      name: "Edward",
      location: "Victoria",
      date: "January 2023",
      rating: 5,
      text: "Very comfortable studio, right in the centre of the village. Short distance to shops and dining facilities. Loved it!",
      property: "Village Studio"
    },
    {
      id: 8,
      name: "Kate",
      location: "NSW",
      date: "February 2023",
      rating: 5,
      text: "Such a beautiful stay, so comfortable and clean. What an incredible view to wake up to! Would recommend and will book again.",
      property: "Beachside Retreat"
    }
  ];

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="section-spacing bg-warm-neutral/30 overflow-hidden px-6">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20 fade-in-up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary mb-6">
            What Our Guests Say
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Real experiences from families who've made Mallacoota their home away from home.
          </p>
        </div>

        {/* Horizontal Ticker */}
        <div className="relative mb-16">
          <div className="ticker-container">
            <div className="ticker-track ticker-slow">
              {duplicatedTestimonials.map((testimonial, index) => (
                <Card 
                  key={`${testimonial.id}-${index}`}
                  className="ticker-item testimonial-card h-full mx-4"
                >
                  <CardContent className="p-8 h-full flex flex-col">
                    {/* Rating Stars */}
                    <div className="flex items-center justify-center mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={20} className="fill-yellow-400 text-yellow-400 mx-1" />
                      ))}
                    </div>
                    
                    {/* Testimonial Text */}
                    <p className="testimonial-text text-foreground/80 mb-8 flex-grow text-center text-lg font-light italic">
                      "{testimonial.text}"
                    </p>
                    
                    {/* Author Info */}
                    <div className="flex flex-col items-center border-t border-border/30 pt-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary to-boutique-accent rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 shadow-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-primary text-lg mb-1">
                          {testimonial.name}
                        </p>
                        {/* Property Name */}
                        <p className="text-sm font-medium text-accent-red mb-1">
                          {testimonial.property}
                        </p>
                        {/* Date and Location */}
                        <p className="text-xs text-muted-foreground">
                          {testimonial.location && `${testimonial.location} • `}{testimonial.date}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center fade-in-up">
          <Button asChild variant="outline" size="lg" rounded="full" className="px-8">
            <Link to="/testimonials">
              View All Testimonials
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsHorizontalTicker;