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
          
          {/* SEO-Optimized Main Heading */}
          <h1 className={`text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold mb-8 md:mb-12 max-w-5xl mx-auto leading-tight transition-all duration-800 delay-200 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div>Mallacoota's Premier</div>
            <div>Luxury Holiday Rentals</div>
          </h1>
          
          {/* Enhanced Subheading with Local Knowledge */}
          <div className={`text-xl md:text-2xl lg:text-3xl font-light space-y-4 mb-12 md:mb-16 transition-all duration-800 delay-400 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="animate-slide-up">
              Premium holiday rentals with unparalleled local knowledge
            </div>
            <div className="text-boutique-accent font-serif italic text-lg md:text-xl lg:text-2xl animate-slide-up">
              Victoria's hidden coastal gem • 4.5 hours from Melbourne CBD
            </div>
          </div>
          
          {/* Enhanced CTA Buttons */}
          <div className={`transition-all duration-800 delay-600 ${
            isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
          }`}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                asChild 
                variant="accent"
                size="lg" 
                rounded="full"
                className="px-8 py-6 text-lg hover:scale-105 transition-all duration-300"
              >
                <Link to="/properties">
                  View Properties
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                rounded="full"
                className="px-8 py-6 text-lg bg-white/20 backdrop-blur-sm border-2 border-white text-white
                           hover:bg-white hover:text-gray-900 hover:border-white hover:shadow-lg
                           active:bg-white/90 active:text-gray-900 active:scale-95
                           transition-all duration-200"
              >
                <Link to="/discover-mallacoota">
                  Read Local Guides
                </Link>
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm">
              <span className="flex items-center gap-1">
                ✓ <span className="font-medium">32 Insider Guides</span>
              </span>
              <span className="flex items-center gap-1">
                ✓ <span className="font-medium">Local Expertise</span>
              </span>
              <span className="flex items-center gap-1">
                ✓ <span className="font-medium">Premium Properties</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default HeroSection;