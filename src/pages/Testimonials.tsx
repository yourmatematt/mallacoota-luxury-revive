// Replace the "Reviews Section" in your Testimonials component with this:

{/* Reviews Section */}
{selectedProperty === "All" ? (
  // Show reviews grouped by property with stacking effect
  <section className="py-16">
    <div className="container mx-auto px-4 lg:px-8">
      {reviewsByProperty.map((property) => (
        <PropertyReviewsSection 
          key={property.id} 
          property={property} 
          allReviews={property.reviews}
        />
      ))}
    </div>
  </section>
) : (
  // Show filtered reviews (existing code - no changes needed)
  <section className="py-16">
    <div className="container mx-auto px-4 lg:px-8">
      {/* ... existing filtered reviews code ... */}
    </div>
  </section>
)}

// Add this new component before your main Testimonials component:

import { useEffect, useRef, useState } from "react";
import { CSSProperties } from "react";

interface PropertyReviewsSectionProps {
  property: any;
  allReviews: Review[];
}

const PropertyReviewsSection = ({ property, allReviews }: PropertyReviewsSectionProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (titleRef.current && sectionRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const navbarHeight = 80; // Adjust based on your navbar height
        
        // Calculate when title hits the navbar
        const titleHitsNavbar = titleRect.top <= navbarHeight;
        
        if (titleHitsNavbar) {
          const sectionRect = sectionRef.current.getBoundingClientRect();
          // Calculate scroll progress within the section
          const progress = Math.max(0, Math.min(1, (navbarHeight - titleRect.top) / (sectionRect.height * 0.3)));
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
    const cardDelay = (index - 3) * 0.2; // 0, 0.2, 0.4 delay for cards 4, 5, 6
    const adjustedProgress = Math.max(0, scrollProgress - cardDelay);
    const stackProgress = Math.min(1, adjustedProgress * 3); // Speed up the animation
    
    const isVisible = adjustedProgress > 0;
    const slideUpAmount = isVisible ? Math.max(0, 100 - stackProgress * 110) : 100;
    
    return {
      position: 'absolute' as const,
      top: 0,
      left: `calc(${column * 33.333}% + ${column * 2}rem)`, // Account for gap
      width: 'calc(33.333% - 1.333rem)', // Account for gap
      zIndex: 10 + layer,
      transform: `translateY(${slideUpAmount}%)`,
      opacity: isVisible ? Math.min(1, stackProgress * 1.2) : 0,
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    };
  };

  // Only show up to 6 reviews for stacking effect
  const reviewsToShow = allReviews.slice(0, 6);

  return (
    <div ref={sectionRef} className="mb-16 min-h-screen">
      <div ref={titleRef} className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-serif font-bold text-primary mb-2">
            {property.title}
          </h2>
          <p className="text-muted-foreground">
            {allReviews.length} review{allReviews.length === 1 ? '' : 's'}
          </p>
        </div>
        <Link to={`/properties/${property.slug}`}>
          <Button variant="outline">
            View Property
          </Button>
        </Link>
      </div>
      
      {/* Reviews Grid with Stacking */}
      <div className="relative min-h-[600px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {reviewsToShow.map((review, index) => (
            <Card 
              key={review.id}
              className="card-luxury h-full animate-fade-in"
              style={{
                ...getCardStyle(index),
                animationDelay: index < 3 ? `${index * 0.1}s` : '0s'
              }}
            >
              <CardContent className="p-6 h-full flex flex-col">
                {/* Stack Number Indicator */}
                <div className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">
                  {index + 1}
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {[...Array(parseInt(review.rating) || 5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {review.source}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
                  "{review.review}"
                </p>
                
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-primary">
                    {review.reviewer}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground space-x-2">
                    <span>{new Date(review.review_date).toLocaleDateString('en-AU', {
                      year: 'numeric',
                      month: 'long'
                    })}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {allReviews.length > 6 && (
        <div className="text-center mt-8">
          <Button 
            variant="outline"
            onClick={() => setSelectedProperty(property.id)}
          >
            View All {property.title} Reviews
          </Button>
        </div>
      )}
      
      {/* Spacer for scroll effect */}
      <div className="h-96"></div>
    </div>
  );
};