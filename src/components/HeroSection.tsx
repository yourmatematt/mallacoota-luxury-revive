import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import heroBackground from "@/assets/hero-pelicans.jpg";

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
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      
      {/* Overlay */}
      <div className="hero-overlay" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        <div className="animate-fade-in">
          {/* Main Logo */}
          <div className="mb-6">
            <img 
              src="/lovable-uploads/84582fc3-db49-43eb-8ce3-96b77e7c977c.png" 
              alt="Hammond Properties" 
              className="h-24 md:h-32 lg:h-40 w-auto mx-auto"
            />
          </div>
          
          {/* Tagline */}
          <p className="text-xl md:text-2xl lg:text-3xl font-light mb-8 max-w-2xl mx-auto">
            Come as guests. Leave as family
          </p>
          
          {/* Three Vertical Lines with Animated Text */}
          <div className="text-lg md:text-xl lg:text-2xl font-medium space-y-2 mb-12">
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Experience Mallacoota's
            </div>
            <div 
              className="text-luxury-gold animate-rotate-text h-8 flex items-center justify-center"
              key={currentTextIndex}
            >
              {rotatingTexts[currentTextIndex]}
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
              with Hammond Properties
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <Button 
              size="lg" 
              className="btn-accent px-8 py-4 text-lg rounded-full shadow-strong hover:shadow-medium transition-all duration-300"
            >
              Start Your Journey
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;