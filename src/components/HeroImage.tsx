import { useState } from "react";

interface HeroImageProps {
  imagePath: string;
  altText: string;
  overlayOpacity?: number;
  height?: string;
  className?: string;
  overlayType?: 'solid' | 'gradient-horizontal' | 'gradient-vertical';
}

export const HeroImage = ({
  imagePath,
  altText,
  overlayOpacity = 0.4,
  height = "60vh",
  className = "",
  overlayType = 'solid'
}: HeroImageProps) => {
  const [imageError, setImageError] = useState(false);

  const getOverlayClasses = () => {
    const opacity = Math.round(overlayOpacity * 255).toString(16).padStart(2, '0');

    switch (overlayType) {
      case 'gradient-horizontal':
        return `bg-gradient-to-r from-black/${Math.round(overlayOpacity * 100)} to-black/${Math.round(overlayOpacity * 50)}`;
      case 'gradient-vertical':
        return `bg-gradient-to-b from-black/${Math.round(overlayOpacity * 30)} to-black/${Math.round(overlayOpacity * 100)}`;
      default:
        return `bg-black/${Math.round(overlayOpacity * 100)}`;
    }
  };

  const currentImagePath = imageError ? '/images/placeholder-hero.jpg' : imagePath;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ height }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: `url("${currentImagePath}")`,
        }}
      />

      {/* Overlay */}
      <div
        className={`absolute inset-0 ${getOverlayClasses()}`}
      />

      {/* Hidden img tag to detect loading errors */}
      <img
        src={imagePath}
        alt={altText}
        className="hidden"
        onError={() => setImageError(true)}
        loading="eager"
        decoding="async"
      />
    </div>
  );
};