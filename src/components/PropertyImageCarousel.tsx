import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PropertyImageCarouselProps {
  images: string[];
  propertyId: string;
  propertyTitle: string;
}

const PropertyImageCarousel = ({ images, propertyId, propertyTitle }: PropertyImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start at 1 because of duplicate at start
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Create extended array with duplicates for smooth infinite loop
  const extendedImages = [images[images.length - 1], ...images, images[0]];

  const nextImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  // Handle infinite loop transitions
  useEffect(() => {
    if (!isTransitioning) return;

    const timer = setTimeout(() => {
      if (currentIndex === 0) {
        setCurrentIndex(images.length);
      } else if (currentIndex === extendedImages.length - 1) {
        setCurrentIndex(1);
      }
      setIsTransitioning(false);
    }, 500); // Match transition duration

    return () => clearTimeout(timer);
  }, [currentIndex, isTransitioning, images.length, extendedImages.length]);

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-xl group hover:scale-105 transition-transform duration-700">
      <div 
        className={`flex h-full ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {extendedImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${propertyTitle} luxury holiday rental in Mallacoota - Interior/exterior view ${((index - 1 + images.length) % images.length) + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-property.jpg';
            }}
          />
        ))}
      </div>
      
      {images.length > 1 && (
        <>
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 hover:bg-white shadow-lg"
            onClick={prevImage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 hover:bg-white shadow-lg"
            onClick={nextImage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === (currentIndex - 1 + images.length) % images.length ? 'bg-white shadow-lg' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyImageCarousel;