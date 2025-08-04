import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGroupedPropertyAmenities, PropertyAmenityWithDetails } from "@/hooks/usePropertyAmenities";
import { Home, Heart, ChefHat, Sun, Star, Wifi } from "lucide-react";

const categoryIcons = {
  'Essential Infrastructure': Home,
  'Guest Comfort': Heart,
  'Kitchen Facilities': ChefHat,
  'Outdoor & Entertainment': Sun,
  'Premium Features': Star,
};

const getIconForCategory = (categoryName?: string) => {
  if (!categoryName) return Wifi;
  return categoryIcons[categoryName as keyof typeof categoryIcons] || Wifi;
};

interface PropertyAmenitiesProps {
  propertyId?: string;
}

const PropertyAmenities = ({ propertyId }: PropertyAmenitiesProps) => {
  const { data: groupedAmenities, isLoading } = useGroupedPropertyAmenities(propertyId);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Property Amenities</h2>
        <div className="grid grid-cols-1 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-muted rounded w-1/3"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-4 bg-muted rounded w-2/3"></div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!groupedAmenities || Object.keys(groupedAmenities).length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Property Amenities</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">No amenities information available for this property.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Property Amenities</h2>
      <div className="grid grid-cols-1 gap-6">
        {Object.entries(groupedAmenities).map(([categoryName, { category, amenities }]) => {
          const IconComponent = getIconForCategory(category.name);
          
          return (
            <Card key={category.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconComponent className="h-5 w-5 text-primary" />
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {amenities.map((amenity) => (
                    <Badge
                      key={amenity.id}
                      variant={amenity.amenity.is_premium ? "default" : "secondary"}
                      className="text-sm"
                    >
                      {amenity.amenity.name}
                      {amenity.amenity.is_premium && (
                        <Star className="h-3 w-3 ml-1 fill-current" />
                      )}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PropertyAmenities;