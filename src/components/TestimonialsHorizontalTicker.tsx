import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Review {
  id: string;
  reviewer: string;
  review: string;
  rating: string;
  review_date: string;
  source: string;
  property_name: string;
  property_id: string;
}

const TestimonialsHorizontalTicker = () => {
  // Fetch reviews from Supabase
  const { data: reviews, isLoading } = useQuery({
    queryKey: ['testimonials-ticker'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Airbnb Reviews')
        .select('*')
        .not('property_id', 'is', null) // Only get reviews with property_id
        .not('reviewer', 'is', null)     // Only get reviews with reviewer
        .not('review', 'is', null)       // Only get reviews with review text
        .order('review_date', { ascending: false })
        .limit(20); // Get top 20 reviews
      
      if (error) {
        console.error('Error fetching reviews:', error);
        throw error;
      }
      return data as Review[];
    },
  });

  // If loading or no reviews, show hardcoded fallback
  const fallbackTestimonials = [
    {
      id: "fallback-1",
      reviewer: "Dana",
      location: "Melbourne, VIC",
      review_date: "March 2023",
      rating: "5",
      review: "This place was amazing and really exceeded our expectations. The views were spectacular and the property was immaculately maintained.",
      property_name: "27 Mirrabooka Rd",
      source: "Airbnb"
    },
    {
      id: "fallback-2",
      reviewer: "Chris",
      location: "Melbourne, VIC", 
      review_date: "June 2023",
      rating: "5",
      review: "We had a great stay with Alex and the team. Their local knowledge and recommendations made our holiday unforgettable.",
      property_name: "7 Allan Drive",
      source: "Airbnb"
    },
    {
      id: "fallback-3",
      reviewer: "James",
      location: "Brisbane, QLD",
      review_date: "September 2023",
      rating: "5",
      review: "Outstanding layout and design. I appreciated every thoughtful detail that made our stay comfortable and memorable.",
      property_name: "Bella Views",
      source: "Airbnb"
    }
  ];

  // Use real reviews if available, otherwise use fallback
  const testimonialsData = (!isLoading && reviews && reviews.length > 0) ? reviews : fallbackTestimonials;
  
  // Create duplicated array for seamless loop (duplicate the array)
  const duplicatedTestimonials = [...testimonialsData, ...testimonialsData];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-background/50 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        {/* Section Header */}
        <div className="mb-16 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            What Our Guests Say
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Real experiences from families who've made Mallacoota their home away from home.
          </p>
        </div>

        {/* Horizontal Ticker */}
        <div className="relative mb-16 ticker-section">
          <div className="ticker-wrapper">
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
                        {[...Array(parseInt(testimonial.rating) || 5)].map((_, i) => (
                          <Star key={i} size={20} className="fill-yellow-400 text-yellow-400 mx-1" />
                        ))}
                      </div>
                      
                      {/* Testimonial Text */}
                      <p className="testimonial-text text-foreground/80 mb-8 flex-grow text-center text-lg font-light italic">
                        "{testimonial.review}"
                      </p>
                      
                      {/* Author Info */}
                      <div className="flex flex-col items-center border-t border-border/30 pt-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-primary to-boutique-accent rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 shadow-lg">
                          {testimonial.reviewer.charAt(0)}
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-primary text-lg mb-1">
                            {testimonial.reviewer}
                          </p>
                          {/* Property Name */}
                          <p className="text-sm font-medium text-accent-red mb-1">
                            {testimonial.property_name}
                          </p>
                          {/* Date and Source */}
                          <p className="text-xs text-muted-foreground">
                            {testimonial.source} • {testimonial.review_date}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center fade-in-up">
          <Button asChild variant="accent" size="default" rounded="full">
            <Link to="/testimonials">
              Read More Guest Stories
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsHorizontalTicker;