import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const rotatingTexts = ["Wonder", "Beauty", "Peace", "Magic", "Freedom"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => 
        (prevIndex + 1) % rotatingTexts.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background Image with parallax effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-700"
        style={{ backgroundImage: `url(/lovable-uploads/cdbaf109-97df-45fa-9df9-9d08463fa265.png)` }}
      />
      
      {/* Enhanced Overlay with boutique gradient */}
      <div className="hero-overlay" />
      
      {/* Content with improved positioning and spacing */}
      <div className="relative z-10 text-center text-white px-6 md:px-4 max-w-5xl mx-auto">
        {/* Tighter content grouping with better proportional spacing */}
        <div className="fade-in-up space-y-6 md:space-y-8">
          {/* Main Logo with enhanced styling and responsive sizing */}
          <div className="fade-in-up">
            <img 
              src="/lovable-uploads/84582fc3-db49-43eb-8ce3-96b77e7c977c.png" 
              alt="Hammond Properties" 
              className="h-16 md:h-24 lg:h-32 xl:h-36 w-auto mx-auto drop-shadow-2xl"
            />
          </div>
          
          {/* Enhanced Tagline - reduced bottom margin */}
          <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-light max-w-3xl mx-auto leading-relaxed fade-in-up stagger-1">
            Come as guests. Leave as family
          </p>
          
          {/* Three Vertical Lines with Enhanced Animated Text - tighter spacing */}
          <div className="text-base md:text-lg lg:text-xl xl:text-2xl font-medium space-y-1 md:space-y-2 fade-in-up stagger-2">
            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              Experience Mallacoota's
            </div>
            <div 
              className="text-boutique-accent font-serif italic text-xl md:text-2xl lg:text-3xl xl:text-4xl animate-rotate-text h-8 md:h-10 flex items-center justify-center"
              key={currentTextIndex}
            >
              {rotatingTexts[currentTextIndex]}
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
              with Hammond Properties
            </div>
          </div>
          
          {/* Enhanced CTA Button - moved closer to content */}
          <div className="pt-4 md:pt-6 animate-slide-up fade-in-up stagger-3" style={{ animationDelay: '0.7s' }}>
            <Button 
              size="lg" 
              className="bg-white/95 backdrop-blur-sm text-primary hover:bg-white hover:scale-105 px-8 md:px-12 py-4 md:py-6 text-base md:text-lg rounded-full font-semibold tracking-wide shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20"
            >
              Start Your Journey
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;