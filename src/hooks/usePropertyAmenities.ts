import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useMemo } from "react";

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

export const useAllAmenityCategories = () => {
  return useQuery({
    queryKey: ['all-amenity-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('amenity_categories')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) {
        console.error('Error fetching amenity categories:', error);
        return [];
      }
      
      return data || [];
    },
  });
};

export const useGroupedPropertyAmenities = (propertyId?: string) => {
  const { data: amenities, isLoading: amenitiesLoading, error: amenitiesError } = usePropertyAmenities(propertyId);
  const { data: allCategories, isLoading: categoriesLoading, error: categoriesError } = useAllAmenityCategories();
  
  const groupedAmenities = useMemo(() => {
    if (!allCategories) return {};
    
    // Start with all categories
    const grouped = allCategories.reduce((acc, category) => {
      acc[category.name] = {
        category: {
          id: category.id,
          name: category.name,
          icon: category.icon,
          display_order: category.display_order,
        },
        amenities: []
      };
      return acc;
    }, {} as Record<string, { 
      category: { id: string; name: string; icon?: string; display_order: number }, 
      amenities: PropertyAmenityWithDetails[] 
    }>);

    // Overlay property amenities
    if (amenities) {
      amenities.forEach(item => {
        const categoryName = item.amenity.category?.name || 'Other';
        if (grouped[categoryName]) {
          grouped[categoryName].amenities.push(item);
        }
      });
    }

    return grouped;
  }, [allCategories, amenities]);

  return {
    data: groupedAmenities,
    isLoading: amenitiesLoading || categoriesLoading,
    error: amenitiesError || categoriesError
  };
};