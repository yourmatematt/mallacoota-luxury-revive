
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Star, Users, Car, Heart } from "lucide-react";

interface PropertyFiltersProps {
  onFiltersChange: (filters: { guests: number; petFriendly: boolean; boatParking: boolean }) => void;
  isLoading?: boolean;
}

const PropertyFilters = ({ onFiltersChange, isLoading }: PropertyFiltersProps) => {
  const [guestCount, setGuestCount] = useState(2);
  const [petFriendly, setPetFriendly] = useState(false);
  const [boatParking, setBoatParking] = useState(false);

  // Debounced filter change handler
  const debouncedFiltersChange = useCallback(
    debounce((filters: { guests: number; petFriendly: boolean; boatParking: boolean }) => {
      onFiltersChange(filters);
    }, 300),
    [onFiltersChange]
  );

  // Update filters when any filter value changes
  useEffect(() => {
    debouncedFiltersChange({ guests: guestCount, petFriendly, boatParking });
  }, [guestCount, petFriendly, boatParking, debouncedFiltersChange]);

  const handleGuestChange = (newCount: number) => {
    setGuestCount(newCount);
  };

  const handlePetFriendlyChange = (value: boolean) => {
    setPetFriendly(value);
  };

  const handleBoatParkingChange = (value: boolean) => {
    setBoatParking(value);
  };

  const handleSearchClick = () => {
    // Immediately trigger search when search button is clicked
    onFiltersChange({ guests: guestCount, petFriendly, boatParking });
  };

  return (
    <div className="max-w-4xl mx-auto bg-card rounded-2xl p-6 shadow-soft border">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
        {/* Guest Count */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Guests</label>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleGuestChange(Math.max(1, guestCount - 1))}
              className="h-10 w-10 p-0"
            >
              -
            </Button>
            <span className="text-foreground font-medium w-8 text-center">{guestCount}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleGuestChange(guestCount + 1)}
              className="h-10 w-10 p-0"
            >
              +
            </Button>
          </div>
        </div>

        {/* Pet Friendly Toggle */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Pet Friendly</label>
          <Button
            variant={petFriendly ? "default" : "outline"}
            onClick={() => handlePetFriendlyChange(!petFriendly)}
            className="w-full justify-start"
          >
            <Heart className="w-4 h-4 mr-2" />
            {petFriendly ? "Yes" : "Any"}
          </Button>
        </div>

        {/* Boat Parking Toggle */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Boat Parking</label>
          <Button
            variant={boatParking ? "default" : "outline"}
            onClick={() => handleBoatParkingChange(!boatParking)}
            className="w-full justify-start"
          >
            <Car className="w-4 h-4 mr-2" />
            {boatParking ? "Yes" : "Any"}
          </Button>
        </div>

        {/* Action Button */}
        {/* Action Button */}
<div>
  <Button 
    variant="accent"
    size="default"
    rounded="full"
    className="px-8 w-full" 
    onClick={handleSearchClick}
    disabled={isLoading}
  >
    {isLoading ? "Searching..." : "Search Properties"}
  </Button>
</div>
      </div>
    </div>
  );
};

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export default PropertyFilters;
