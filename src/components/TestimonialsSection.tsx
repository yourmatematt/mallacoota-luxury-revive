import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Dana",
      location: "Victoria",
      date: "March 2023",
      rating: 5,
      text: "This place was amazing and really exceeded our expectations. The views were spectacular and the property was immaculately maintained. Perfect for our family vacation!"
    },
    {
      id: 2,
      name: "Gail", 
      location: "ACT",
      date: "April 2023",
      rating: 5,
      text: "Brilliant location with amazing views that took our breath away every morning. The attention to detail in the property was outstanding and the service was exceptional."
    },
    {
      id: 3,
      name: "Chris",
      location: "Victoria", 
      date: "June 2023",
      rating: 5,
      text: "We had a great stay with Alex and the team. Their local knowledge and recommendations made our holiday unforgettable. The property was perfect for our group."
    },
    {
      id: 4,
      name: "Andrea",
      location: "",
      date: "June 2023", 
      rating: 5,
      text: "Fell in love at first sight when we arrived. The property is even more beautiful in person and the location is absolutely perfect for exploring Mallacoota."
    },
    {
      id: 5,
      name: "James",
      location: "Queensland",
      date: "Sept 2023",
      rating: 5,
      text: "Outstanding layout and design. I appreciated every thoughtful detail that made our stay comfortable and memorable. Will definitely return!"
    },
    {
      id: 6,
      name: "Michael", 
      location: "",
      date: "May 2023",
      rating: 5,
      text: "Perfect location with great views and excellent amenities. The property management team was responsive and helpful throughout our entire stay."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            What Our Guests Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real experiences from families who've made Mallacoota their home away from home.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id} 
              className="card-luxury h-full animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 h-full flex flex-col">
                {/* Rating Stars */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-luxury-gold text-luxury-gold" />
                  ))}
                </div>
                
                {/* Testimonial Text */}
                <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                {/* Author Info */}
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-primary">
                    {testimonial.name}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground space-x-2">
                    {testimonial.location && (
                      <>
                        <span>{testimonial.location}</span>
                        <span>•</span>
                      </>
                    )}
                    <span>{testimonial.date}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;