import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Review {
  id: string;
  reviewer: string;
  review_date: string;
  rating: string;
  review: string;
  property_name: string;
  source: string;
}

const TestimonialsHorizontalTicker = () => {
  const { data: reviews } = useQuery({
    queryKey: ['airbnb-reviews-ticker'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Airbnb Reviews')
        .select('*')
        .order('review_date', { ascending: false })
        .limit(20);
      
      if (error) throw error;
      return data as Review[];
    },
  });

  if (!reviews?.length) return null;

  // Duplicate reviews for seamless loop
  const duplicatedReviews = [...reviews, ...reviews];

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
        <div className="relative">
          <div className="ticker-container group">
            <div className="ticker-track group-hover:ticker-slow">
              {duplicatedReviews.map((review, index) => (
                <Card 
                  key={`${review.id}-${index}`}
                  className="ticker-item card-boutique bg-white/90 backdrop-blur-sm border-0 h-full mx-4"
                >
                  <CardContent className="p-8 h-full flex flex-col">
                    {/* Rating Stars */}
                    <div className="flex items-center justify-center mb-6">
                      {[...Array(parseInt(review.rating) || 5)].map((_, i) => (
                        <Star key={i} size={20} className="fill-yellow-400 text-yellow-400 mx-1" />
                      ))}
                    </div>
                    
                    {/* Testimonial Text */}
                    <p className="text-foreground/80 mb-8 flex-grow leading-relaxed text-center text-lg font-light italic line-clamp-4">
                      "{review.review}"
                    </p>
                    
                    {/* Author Info */}
                    <div className="flex flex-col items-center border-t border-border/30 pt-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary to-boutique-accent rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 shadow-lg">
                        {review.reviewer.charAt(0)}
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-primary text-lg mb-1">
                          {review.reviewer}
                        </p>
                        <p className="text-sm text-muted-foreground mb-1">
                          {review.property_name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(review.review_date).toLocaleDateString('en-AU', {
                            year: 'numeric',
                            month: 'long'
                          })}
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
    </section>
  );
};

export default TestimonialsHorizontalTicker;