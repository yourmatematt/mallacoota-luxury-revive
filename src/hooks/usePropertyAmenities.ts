import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface PropertyAmenityFlat {
  id: string;
  amenity_id: string; 
  property_id: string;
  custom_description?: string;
  amenity_name: string;
  amenity_description?: string;
  is_premium: boolean;
  category_id?: string;
  category_name?: string;
  category_icon?: string;
  category_display_order?: number;
}

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

      // Use the SQL function we created
      const { data, error } = await supabase.rpc('get_property_amenities', {
        p_property_id: propertyId
      }) as { data: PropertyAmenityFlat[] | null, error: any };
      
      if (error) {
        console.error('Error fetching property amenities:', error);
        return [];
      }
      
      // Transform flat data into structured format
      return (data || []).map(item => ({
        id: item.id,
        amenity_id: item.amenity_id,
        property_id: item.property_id,
        custom_description: item.custom_description,
        amenity: {
          id: item.amenity_id,
          name: item.amenity_name,
          description: item.amenity_description,
          is_premium: item.is_premium,
          category: {
            id: item.category_id || 'other',
            name: item.category_name || 'Other',
            icon: item.category_icon,
            display_order: item.category_display_order || 999,
          }
        }
      })) as PropertyAmenityWithDetails[];
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
        category: item.amenity.category,
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