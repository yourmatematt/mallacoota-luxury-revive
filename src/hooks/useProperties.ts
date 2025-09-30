import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
export interface Property {
  id: string;
  property_id: string;
  title: string;
  slug: string;
  subtitle?: string;
  excerpt?: string;
  description?: string;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  pet_friendly: boolean;
  boat_parking: boolean;
  water_views: boolean;  // 👈 Changed from view to water_views (boolean)
  waterfront?: boolean;  // 👈 Added for direct waterfront access
  view_type?: string;    // 👈 Added view_type for display
  airbnb_rating?: string;
  image_folder?: string;
  latitude?: number;
  longitude?: number;
}

interface PropertyFilters {
  guests?: number;
  petFriendly?: boolean;
  boatParking?: boolean;
  waterViews?: boolean;  // 👈 Changed from viewType to waterViews (boolean)
  waterfront?: boolean;  // 👈 Added for direct waterfront access filtering
}

export const useProperties = (filters?: PropertyFilters) => {
  return useQuery({
    queryKey: ['properties', filters],
    queryFn: async (): Promise<Property[]> => {
      let query = supabase
        .from('Properties')
        .select('*, latitude, longitude')
        .order('title');

      if (filters?.guests) {
        query = query.gte('guests', filters.guests);
      }
      
      if (filters?.petFriendly !== undefined) {
        query = query.eq('pet_friendly', filters.petFriendly);
      }
      
      if (filters?.boatParking !== undefined) {
        query = query.eq('boat_parking', filters.boatParking);
      }

      // Add water views filter (boolean)
      if (filters?.waterViews !== undefined) {
        query = query.eq('water_views', filters.waterViews);
      }

      // Add waterfront filter (if the field exists in database)
      if (filters?.waterfront !== undefined) {
        query = query.eq('waterfront', filters.waterfront);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      
      const properties = (data || []) as any[];
      return properties.map(item => ({ 
        ...item, 
        id: item.property_id 
      })) as Property[];
    },
  });
};

export const usePropertyBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['property', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Properties')
        .select('*, latitude, longitude')
        .eq('slug', slug)
        .maybeSingle();
      
      if (error) throw error;
      return data ? { ...data, id: data.property_id } as Property : null;
    },
    enabled: !!slug,
  });
};

export const usePropertyReviews = (propertyId?: string) => {
  return useQuery({
    queryKey: ['property-reviews', propertyId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Airbnb Reviews')
        .select('*')
        .eq('property_id', propertyId)
        .order('review_date', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!propertyId,
  });
};

export const useRandomProperties = (limit: number = 3) => {
  return useQuery({
    queryKey: ['random-properties', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Properties')
        .select('*')
        .limit(100); // Get more than needed for randomization
      
      if (error) throw error;
      
      // Randomize and return limited number
      const shuffled = data?.sort(() => 0.5 - Math.random()) || [];
      return shuffled.slice(0, limit).map(item => ({ ...item, id: item.property_id })) as Property[];
    },
  });
};