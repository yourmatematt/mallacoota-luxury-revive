import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, Users, Car, Heart } from "lucide-react";

interface PropertyFiltersProps {
  onFiltersChange: (filters: { guests: number; petFriendly: boolean; boatParking: boolean }) => void;
}

const PropertyFilters = ({ onFiltersChange }: PropertyFiltersProps) => {
  const [guestCount, setGuestCount] = useState(2);
  const [petFriendly, setPetFriendly] = useState(false);
  const [boatParking, setBoatParking] = useState(false);

  const handleGuestChange = (newCount: number) => {
    setGuestCount(newCount);
    onFiltersChange({ guests: newCount, petFriendly, boatParking });
  };

  const handlePetFriendlyChange = (value: boolean) => {
    setPetFriendly(value);
    onFiltersChange({ guests: guestCount, petFriendly: value, boatParking });
  };

  const handleBoatParkingChange = (value: boolean) => {
    setBoatParking(value);
    onFiltersChange({ guests: guestCount, petFriendly, boatParking: value });
  };

  return (
    <div className="max-w-4xl mx-auto bg-card rounded-2xl p-6 shadow-soft border">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
        {/* Guest Count */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Guests</label>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleGuestChange(Math.max(1, guestCount - 1))}
              className="h-8 w-8 p-0"
            >
              -
            </Button>
            <span className="text-foreground font-medium w-8 text-center">{guestCount}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleGuestChange(guestCount + 1)}
              className="h-8 w-8 p-0"
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
        <div className="text-center md:text-right">
          <Button className="px-8">
            Search Properties
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilters;