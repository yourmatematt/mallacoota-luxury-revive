import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

return (
  <section id="home" className="relative flex items-center justify-center overflow-hidden" style={{ height: 'calc(100vh - 80px)' }}>
    <picture>
      <source
        type="image/avif"
        srcSet="/images/hero/hero-640.avif 640w, /images/hero/hero-1024.avif 1024w, /images/hero/hero-1600.avif 1600w, /images/hero/hero-2400.avif 2400w"
        sizes="100vw"
      />
      <source
        type="image/webp"
        srcSet="/images/hero/hero-640.webp 640w, /images/hero/hero-1024.webp 1024w, /images/hero/hero-1600.webp 1600w, /images/hero/hero-2400.webp 2400w"
        sizes="100vw"
      />
      <img
        src="/images/hero/hero-1600.jpg"
        srcSet="/images/hero/hero-640.jpg 640w, /images/hero/hero-1024.jpg 1024w, /images/hero/hero-1600.jpg 1600w, /images/hero/hero-2400.jpg 2400w"
        sizes="100vw"
        alt="Sunrise over Mallacoota's inlet with calm waters and forested headlands"
        fetchpriority="high"
        decoding="async"
        loading="eager"
        width={1920}
        height={1200}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </picture>

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
              Victoria's hidden coastal gem • 6 hours from Melbourne CBD
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