import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Property {
  id: string;
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
  airbnb_rating?: string;
  image_folder?: string;
}

export const useProperties = (filters?: {
  guests?: number;
  petFriendly?: boolean;
  boatParking?: boolean;
}) => {
  return useQuery({
    queryKey: ['properties', filters],
    queryFn: async () => {
      let query = supabase
        .from('Properties')
        .select('*')
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

      const { data, error } = await query;
      
      if (error) throw error;
      return data as Property[];
    },
  });
};

export const usePropertyBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['property', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Properties')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) throw error;
      return data as Property;
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
      return shuffled.slice(0, limit) as Property[];
    },
  });
};