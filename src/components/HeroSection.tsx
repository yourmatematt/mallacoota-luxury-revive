import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const rotatingTexts = ["Wonder", "Beauty", "Peace", "Magic", "Freedom"];

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => setIsLoaded(true), 100);
    
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => 
        (prevIndex + 1) % rotatingTexts.length
      );
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

return (
  <section id="home" className="relative flex items-center justify-center overflow-hidden" style={{ height: 'calc(100vh - 80px)' }}>
    {/* Enhanced Background Image with parallax effect */}
    <div 
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(/lovable-uploads/cdbaf109-97df-45fa-9df9-9d08463fa265.png)` }}
    />
      
      {/* Enhanced Overlay with boutique gradient */}
      <div className="hero-overlay" />
      
      {/* Content with improved animations and proper spacing */}
      <div className="relative z-10 text-center text-white px-6 md:px-4 max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Main Logo with enhanced styling and responsive sizing */}
          <div className={`mb-6 md:mb-8 transition-all duration-800 delay-200 ${
            isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
          }`}>
            <img 
              src="/lovable-uploads/84582fc3-db49-43eb-8ce3-96b77e7c977c.png" 
              alt="Hammond Properties" 
              className="h-20 md:h-28 lg:h-36 xl:h-44 w-auto mx-auto drop-shadow-2xl"
            />
          </div>
          
          {/* Enhanced Tagline */}
          <p className={`text-lg md:text-xl lg:text-2xl xl:text-3xl font-light mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-800 delay-400 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Come as guests. Leave as family
          </p>
          
          {/* Three Vertical Lines with Enhanced Animated Text */}
          <div className={`text-base md:text-lg lg:text-xl xl:text-2xl font-medium space-y-2 md:space-y-3 mb-12 md:mb-16 transition-all duration-800 delay-600 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="animate-slide-up">
              Experience Mallacoota's
            </div>
            <div 
              className="text-boutique-accent font-serif italic text-xl md:text-2xl lg:text-3xl xl:text-4xl h-10 md:h-12 flex items-center justify-center transition-all duration-500"
              key={currentTextIndex}
            >
              <span className="animate-fade-in-up">
                {rotatingTexts[currentTextIndex]}
              </span>
            </div>
            <div className="animate-slide-up">
              with Hammond Properties
            </div>
          </div>
          
          {/* Enhanced CTA Button */}
          <div className={`transition-all duration-800 delay-800 ${
            isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
          }`}>
            <Button 
              asChild 
              variant="accent"
              size="lg" 
              rounded="full"
              className="px-12 py-6 text-lg hover:scale-105 transition-all duration-300"
            >
              <Link to="/properties">
                Start Your Journey
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default HeroSection;