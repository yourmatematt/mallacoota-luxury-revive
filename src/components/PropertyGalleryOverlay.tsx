import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useSwipeable } from "@/hooks/useSwipeable";

interface PropertyGalleryOverlayProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
  propertyTitle: string;
}

const PropertyGalleryOverlay = ({ 
  images, 
  isOpen, 
  onClose, 
  initialIndex = 0,
  propertyTitle 
}: PropertyGalleryOverlayProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Update current index when initialIndex changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const nextImage = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setTimeout(() => setIsTransitioning(false), 150);
    }, 150);
  };

  const prevImage = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      setTimeout(() => setIsTransitioning(false), 150);
    }, 150);
  };

  const goToImage = (index: number) => {
    if (isTransitioning || index === currentIndex) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 150);
    }, 150);
  };

  // The DialogDescription advertises arrow-key navigation; wire it up here
  // so the a11y promise matches behaviour. Active only while the overlay is
  // open, and only when there are multiple images.
  useEffect(() => {
    if (!isOpen || images.length < 2) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        nextImage();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevImage();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, images.length, isTransitioning]);

  const swipe = useSwipeable({
    onSwipeLeft: nextImage,
    onSwipeRight: prevImage,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 bg-black/95 border-0">
        <VisuallyHidden.Root>
          <DialogTitle>{propertyTitle} — photo gallery</DialogTitle>
          <DialogDescription>
            Image {currentIndex + 1} of {images.length}. Use the previous and next buttons or arrow keys to navigate.
          </DialogDescription>
        </VisuallyHidden.Root>
        <div className="relative w-full h-full flex flex-col">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4 bg-gradient-to-b from-black/50 to-transparent">
            <div className="text-white">
              <h3 className="text-lg font-semibold" aria-hidden="true">{propertyTitle}</h3>
              <p className="text-sm text-white/80" aria-live="polite">
                {currentIndex + 1} of {images.length}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 min-h-[44px] min-w-[44px]"
              onClick={onClose}
              aria-label="Close photo gallery"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>

          {/* Main Image */}
          <div className="flex-1 flex items-center justify-center p-4 pt-20 pb-24">
            <div
              className="relative w-full h-full flex items-center justify-center"
              onTouchStart={swipe.onTouchStart}
              onTouchEnd={swipe.onTouchEnd}
            >
              <div className="relative max-w-full max-h-full overflow-hidden">
                <img
                  key={currentIndex} // Force re-render for transition
                  src={images[currentIndex]}
                  alt={`${propertyTitle} - Image ${currentIndex + 1}`}
                  className={`
                    max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-2xl 
                    transition-all duration-300 ease-in-out transform
                    ${isTransitioning 
                      ? 'opacity-0 scale-105 blur-sm' 
                      : 'opacity-100 scale-100 blur-0'
                    }
                  `}
                  style={{ maxWidth: '90vw', maxHeight: '70vh' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-property.jpg';
                  }}
                 />
                
                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="icon"
                      className={`
                        absolute left-4 top-1/2 transform -translate-y-1/2
                        bg-white/90 hover:bg-white shadow-lg transition-all duration-200
                        min-h-[44px] min-w-[44px]
                        ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}
                      `}
                      onClick={prevImage}
                      disabled={isTransitioning}
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </Button>

                    <Button
                      variant="secondary"
                      size="icon"
                      className={`
                        absolute right-4 top-1/2 transform -translate-y-1/2
                        bg-white/90 hover:bg-white shadow-lg transition-all duration-200
                        min-h-[44px] min-w-[44px]
                        ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}
                      `}
                      onClick={nextImage}
                      disabled={isTransitioning}
                      aria-label="Next photo"
                    >
                      <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
              <div className="flex justify-center space-x-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`View photo ${index + 1} of ${images.length}`}
                    aria-current={index === currentIndex ? "true" : undefined}
                    className={`
                      flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2
                      transition-all duration-300 transform
                      ${index === currentIndex
                        ? 'border-white shadow-lg scale-110'
                        : 'border-white/30 hover:border-white/60 hover:scale-105'
                      }
                      ${isTransitioning ? 'pointer-events-none opacity-75' : ''}
                    `}
                    onClick={() => goToImage(index)}
                    disabled={isTransitioning}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-200"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder-property.jpg';
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyGalleryOverlay;