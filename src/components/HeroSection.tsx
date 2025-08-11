import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const rotatingTexts = ["Beauty in every sunrise", "Peace in the gentle sway of the inlet", "Magic in the changing tides", "Freedom in open waters", "Wonder in every hidden trail"]

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => setIsLoaded(true), 100);
    
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => 
        (prevIndex + 1) % rotatingTexts.length
      );
    }, 4000);

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
          
          {/* Main Tagline - Now the primary visual anchor */}
          <h1 className={`text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold mb-8 md:mb-12 max-w-5xl mx-auto leading-tight transition-all duration-800 delay-200 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div>Come as Guests</div>
            <div>Leave as Family</div>
          </h1>
          
          {/* Enhanced Subheading with Rotating Text - Now more prominent */}
          <div className={`text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light space-y-3 md:space-y-4 mb-12 md:mb-16 transition-all duration-800 delay-400 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="animate-slide-up">
              Experience Mallacoota's
            </div>
            <div 
              className="text-boutique-accent font-serif italic text-2xl md:text-3xl lg:text-4xl xl:text-5xl h-12 md:h-16 flex items-center justify-center transition-all duration-500"
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
          <div className={`transition-all duration-800 delay-600 ${
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
                Start Your Escape
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default HeroSection;