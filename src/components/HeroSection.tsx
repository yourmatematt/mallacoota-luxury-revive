import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import heroBackground from "@/assets/hero-pelicans.jpg";
import boutiqueHeroBg from "@/assets/boutique-hero-bg.jpg";

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
        style={{ backgroundImage: `url(${boutiqueHeroBg})` }}
      />
      
      {/* Enhanced Overlay with boutique gradient */}
      <div className="hero-overlay" />
      
      {/* Content with improved animations */}
      <div className="relative z-10 text-center text-white px-6 md:px-4 max-w-6xl mx-auto">
        <div className="fade-in-up">
          {/* Main Logo with enhanced styling */}
          <div className="mb-8 fade-in-up">
            <img 
              src="/lovable-uploads/84582fc3-db49-43eb-8ce3-96b77e7c977c.png" 
              alt="Hammond Properties" 
              className="h-28 md:h-36 lg:h-44 w-auto mx-auto drop-shadow-2xl"
            />
          </div>
          
          {/* Enhanced Tagline */}
          <p className="text-xl md:text-2xl lg:text-3xl font-light mb-12 max-w-3xl mx-auto leading-relaxed fade-in-up stagger-1">
            Come as guests. Leave as family
          </p>
          
          {/* Three Vertical Lines with Enhanced Animated Text */}
          <div className="text-lg md:text-xl lg:text-2xl font-medium space-y-3 mb-16 fade-in-up stagger-2">
            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              Experience Mallacoota's
            </div>
            <div 
              className="text-boutique-accent font-serif italic text-2xl md:text-3xl lg:text-4xl animate-rotate-text h-12 flex items-center justify-center"
              key={currentTextIndex}
            >
              {rotatingTexts[currentTextIndex]}
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
              with Hammond Properties
            </div>
          </div>
          
          {/* Enhanced CTA Button */}
          <div className="animate-slide-up fade-in-up stagger-3" style={{ animationDelay: '0.7s' }}>
            <Button 
              size="lg" 
              className="bg-white/95 backdrop-blur-sm text-primary hover:bg-white hover:scale-105 px-12 py-6 text-lg rounded-full font-semibold tracking-wide shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20"
            >
              Start Your Journey
            </Button>
          </div>
        </div>
      </div>
      
      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white/80 animate-bounce fade-in-up stagger-3">
        <div className="flex flex-col items-center space-y-3">
          <span className="text-xs font-light tracking-[0.2em] uppercase">Discover</span>
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/80 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;