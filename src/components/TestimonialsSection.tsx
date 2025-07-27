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
    <section className="section-spacing bg-luxury-cream/30 px-6">
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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id} 
              className="card-boutique bg-white/90 backdrop-blur-sm border-0 h-full fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CardContent className="p-8 h-full flex flex-col">
                {/* Rating Stars */}
                <div className="flex items-center justify-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="fill-yellow-400 text-yellow-400 mx-1" />
                  ))}
                </div>
                
                {/* Testimonial Text */}
                <p className="text-foreground/80 mb-8 flex-grow leading-relaxed text-center text-lg font-light italic">
                  "{testimonial.text}"
                </p>
                
                {/* Author Info */}
                <div className="flex items-center justify-center border-t border-border/30 pt-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-boutique-accent rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 shadow-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-primary text-lg">
                      {testimonial.name}
                    </p>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.location && (
                        <>
                          <span>{testimonial.location}</span>
                          <span> • </span>
                        </>
                      )}
                      <span>{testimonial.date}</span>
                    </div>
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