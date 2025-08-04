import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface PropertyAmenityWithDetails {
  id: string;
  amenity_id: string;
  property_id: string;
  custom_description?: string;
  amenity: {
    id: string;
    name: string;
    description?: string;
    is_premium: boolean;
    searchable_terms?: string[];
    category: {
      id: string;
      name: string;
      icon?: string;
      display_order: number;
    };
  };
}

export const usePropertyAmenities = (propertyId?: string) => {
  return useQuery({
    queryKey: ['property-amenities', propertyId],
    queryFn: async () => {
      if (!propertyId) return [];

      const { data, error } = await supabase.rpc('get_property_amenities', {
        p_property_id: propertyId
      });
      
      if (error) throw error;
      
      return (data || []) as PropertyAmenityWithDetails[];
    },
    enabled: !!propertyId,
  });
};

export const useGroupedPropertyAmenities = (propertyId?: string) => {
  const { data: amenities, ...rest } = usePropertyAmenities(propertyId);
  
  const groupedAmenities = amenities?.reduce((acc, item) => {
    const categoryName = item.amenity.category?.name || 'Other';
    
    if (!acc[categoryName]) {
      acc[categoryName] = {
        category: item.amenity.category || { 
          id: 'other', 
          name: 'Other', 
          display_order: 999 
        },
        amenities: []
      };
    }
    
    acc[categoryName].amenities.push(item);
    return acc;
  }, {} as Record<string, { 
    category: { id: string; name: string; icon?: string; display_order: number }, 
    amenities: PropertyAmenityWithDetails[] 
  }>);

  // Sort categories by display_order
  const sortedGroupedAmenities = Object.entries(groupedAmenities || {})
    .sort(([, a], [, b]) => a.category.display_order - b.category.display_order)
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as typeof groupedAmenities);

  return {
    data: sortedGroupedAmenities,
    ...rest
  };
};