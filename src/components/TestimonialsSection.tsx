import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CSSProperties } from "react";

const TestimonialsSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

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

  useEffect(() => {
    const handleScroll = () => {
      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const navbarHeight = 80; // Adjust based on your navbar height
        
        // Calculate when title hits the navbar
        const titleHitsNavbar = titleRect.top <= navbarHeight;
        
        if (titleHitsNavbar && sectionRef.current) {
          const sectionRect = sectionRef.current.getBoundingClientRect();
          // Calculate scroll progress within the section
          const progress = Math.max(0, Math.min(1, (navbarHeight - titleRect.top) / (sectionRect.height * 0.5)));
          setScrollProgress(progress);
        } else {
          setScrollProgress(0);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getCardStyle = (index: number): CSSProperties => {
    const column = index % 3; // Which column (0, 1, 2)
    const layer = Math.floor(index / 3); // Which layer (0, 1, 2...)
    
    if (layer === 0) {
      // Base layer cards - always visible
      return {
        position: 'relative' as const,
        zIndex: 1,
        transform: 'translateY(0)',
        opacity: 1
      };
    }
    
    // Stacking cards (4, 5, 6) with sequential delays
    const cardDelay = (index - 3) * 0.3; // 0, 0.3, 0.6 delay for cards 4, 5, 6
    const adjustedProgress = Math.max(0, scrollProgress - cardDelay);
    const stackProgress = Math.min(1, adjustedProgress * 2); // Speed up the animation
    
    const isVisible = adjustedProgress > 0;
    const slideUpAmount = isVisible ? Math.max(0, 100 - stackProgress * 120) : 100;
    
    return {
      position: 'absolute' as const,
      top: 0,
      left: `${column * 33.333}%`,
      width: 'calc(33.333% - 2rem)',
      zIndex: 10 + layer,
      transform: `translateY(${slideUpAmount}%)`,
      opacity: isVisible ? Math.min(1, stackProgress * 1.5) : 0,
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    };
  };

  return (
    <section ref={sectionRef} className="section-spacing bg-luxury-cream/30 px-6 min-h-screen">
      <div className="container mx-auto">
        {/* Property Title - This will stick to navbar */}
        <div ref={titleRef} className="text-left mb-12 fade-in-up">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">
            27 Mirrabooka Rd
          </h2>
          <p className="text-muted-foreground">5 reviews</p>
        </div>

        {/* Section Header */}
        <div className="text-center mb-20 fade-in-up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary mb-6">
            What Our Guests Say
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Real stories from guests who’ve made Mallacoota feel like their home away from home.
          </p>
        </div>

        {/* Testimonials Grid with Stacking */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 relative">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={testimonial.id} 
                className="card-boutique bg-white/90 backdrop-blur-sm border-0 h-full fade-in-up"
                style={{
                  ...getCardStyle(index),
                  animationDelay: index < 3 ? `${index * 0.15}s` : '0s'
                }}
              >
                <CardContent className="p-8 h-full flex flex-col">
                  {/* Stack Number Indicator */}
                  <div className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">
                    {index + 1}
                  </div>
                  
                  {/* Rating Stars */}
                  <div className="flex items-center justify-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={20} className="fill-yellow-400 text-yellow-400 mx-1" />
                    ))}
                  </div>
                  
                  {/* Platform Badge */}
                  <div className="flex justify-end mb-4">
                    <span className="text-sm font-semibold text-blue-600">Airbnb</span>
                  </div>
                  
                  {/* Testimonial Text */}
                  <p className="text-foreground/80 mb-8 flex-grow leading-relaxed text-left text-base">
                    "{testimonial.text}"
                  </p>
                  
                  {/* Author Info */}
                  <div className="flex items-center border-t border-border/30 pt-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-boutique-accent rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 shadow-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-primary">
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

        {/* Spacer to allow for scroll effect */}
        <div className="h-96"></div>
      </div>
    </section>
  );
};

export default TestimonialsSection;