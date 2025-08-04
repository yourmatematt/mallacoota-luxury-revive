export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      "Activity Levels": {
        Row: {
          id: string
          name: string | null
          slug: string | null
        }
        Insert: {
          id: string
          name?: string | null
          slug?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          slug?: string | null
        }
        Relationships: []
      }
      "Airbnb Reviews": {
        Row: {
          id: string
          property_id: string | null
          property_name: string | null
          rating: string | null
          review: string | null
          review_date: string | null
          reviewer: string | null
          source: string | null
        }
        Insert: {
          id: string
          property_id?: string | null
          property_name?: string | null
          rating?: string | null
          review?: string | null
          review_date?: string | null
          reviewer?: string | null
          source?: string | null
        }
        Update: {
          id?: string
          property_id?: string | null
          property_name?: string | null
          rating?: string | null
          review?: string | null
          review_date?: string | null
          reviewer?: string | null
          source?: string | null
        }
        Relationships: []
      }
      amenities: {
        Row: {
          category_id: string | null
          created_at: string | null
          description: string | null
          id: string
          is_premium: boolean | null
          name: string
          searchable_terms: string[] | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_premium?: boolean | null
          name: string
          searchable_terms?: string[] | null
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_premium?: boolean | null
          name?: string
          searchable_terms?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "amenities_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "amenity_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      amenity_categories: {
        Row: {
          created_at: string | null
          display_order: number | null
          icon: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      Audiences: {
        Row: {
          id: string
          name: string | null
          slug: string | null
        }
        Insert: {
          id: string
          name?: string | null
          slug?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          slug?: string | null
        }
        Relationships: []
      }
      blog_activity_levels: {
        Row: {
          activity_level_id: string
          blog_id: string
          created_at: string | null
          id: string
        }
        Insert: {
          activity_level_id: string
          blog_id: string
          created_at?: string | null
          id?: string
        }
        Update: {
          activity_level_id?: string
          blog_id?: string
          created_at?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_activity_levels_activity_level_id_fkey"
            columns: ["activity_level_id"]
            isOneToOne: false
            referencedRelation: "Activity Levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_activity_levels_blog_id_fkey"
            columns: ["blog_id"]
            isOneToOne: false
            referencedRelation: "Discover Mallacoota Blogs"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_audiences: {
        Row: {
          audience_id: string
          blog_id: string
          created_at: string | null
          id: string
        }
        Insert: {
          audience_id: string
          blog_id: string
          created_at?: string | null
          id?: string
        }
        Update: {
          audience_id?: string
          blog_id?: string
          created_at?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_audiences_audience_id_fkey"
            columns: ["audience_id"]
            isOneToOne: false
            referencedRelation: "Audiences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_audiences_blog_id_fkey"
            columns: ["blog_id"]
            isOneToOne: false
            referencedRelation: "Discover Mallacoota Blogs"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_seasons: {
        Row: {
          blog_id: string
          created_at: string | null
          id: string
          season_id: string
        }
        Insert: {
          blog_id: string
          created_at?: string | null
          id?: string
          season_id: string
        }
        Update: {
          blog_id?: string
          created_at?: string | null
          id?: string
          season_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_seasons_blog_id_fkey"
            columns: ["blog_id"]
            isOneToOne: false
            referencedRelation: "Discover Mallacoota Blogs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_seasons_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "Seasons"
            referencedColumns: ["id"]
          },
        ]
      }
      Categories: {
        Row: {
          id: string
          name: string | null
          slug: string | null
        }
        Insert: {
          id: string
          name?: string | null
          slug?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          slug?: string | null
        }
        Relationships: []
      }
      contact_enquiries: {
        Row: {
          created_at: string
          email: string
          enquiry_type: string
          id: string
          message: string
          name: string
          phone: string | null
          responded_at: string | null
          response_notes: string | null
          status: string | null
          subject: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          enquiry_type?: string
          id?: string
          message: string
          name: string
          phone?: string | null
          responded_at?: string | null
          response_notes?: string | null
          status?: string | null
          subject?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          enquiry_type?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          responded_at?: string | null
          response_notes?: string | null
          status?: string | null
          subject?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      "Discover Mallacoota Blogs": {
        Row: {
          Categories_id: string | null
          content: string | null
          excerpt: string | null
          hero_image_url: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          published_date: string | null
          slug: string | null
          title: string | null
        }
        Insert: {
          Categories_id?: string | null
          content?: string | null
          excerpt?: string | null
          hero_image_url?: string | null
          id: string
          meta_description?: string | null
          meta_title?: string | null
          published_date?: string | null
          slug?: string | null
          title?: string | null
        }
        Update: {
          Categories_id?: string | null
          content?: string | null
          excerpt?: string | null
          hero_image_url?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published_date?: string | null
          slug?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Discover Mallacoota Blogs_Categories_id_fkey"
            columns: ["Categories_id"]
            isOneToOne: false
            referencedRelation: "Categories"
            referencedColumns: ["id"]
          },
        ]
      }
      enquiries: {
        Row: {
          check_in: string | null
          check_out: string | null
          created_at: string
          email: string
          guests: number | null
          id: string
          message: string | null
          name: string
          phone: string | null
          property_id: string
          property_title: string | null
        }
        Insert: {
          check_in?: string | null
          check_out?: string | null
          created_at?: string
          email: string
          guests?: number | null
          id?: string
          message?: string | null
          name: string
          phone?: string | null
          property_id: string
          property_title?: string | null
        }
        Update: {
          check_in?: string | null
          check_out?: string | null
          created_at?: string
          email?: string
          guests?: number | null
          id?: string
          message?: string | null
          name?: string
          phone?: string | null
          property_id?: string
          property_title?: string | null
        }
        Relationships: []
      }
      Properties: {
        Row: {
          airbnb_rating: string | null
          bathrooms: number | null
          bedrooms: number | null
          boat_parking: boolean | null
          description: string | null
          excerpt: string | null
          guests: number | null
          image_folder: string | null
          pet_friendly: boolean | null
          property_id: string
          slug: string | null
          subtitle: string | null
          title: string | null
        }
        Insert: {
          airbnb_rating?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          boat_parking?: boolean | null
          description?: string | null
          excerpt?: string | null
          guests?: number | null
          image_folder?: string | null
          pet_friendly?: boolean | null
          property_id: string
          slug?: string | null
          subtitle?: string | null
          title?: string | null
        }
        Update: {
          airbnb_rating?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          boat_parking?: boolean | null
          description?: string | null
          excerpt?: string | null
          guests?: number | null
          image_folder?: string | null
          pet_friendly?: boolean | null
          property_id?: string
          slug?: string | null
          subtitle?: string | null
          title?: string | null
        }
        Relationships: []
      }
      property_amenities: {
        Row: {
          amenity_id: string | null
          created_at: string | null
          custom_description: string | null
          id: string
          property_id: string | null
        }
        Insert: {
          amenity_id?: string | null
          created_at?: string | null
          custom_description?: string | null
          id?: string
          property_id?: string | null
        }
        Update: {
          amenity_id?: string | null
          created_at?: string | null
          custom_description?: string | null
          id?: string
          property_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_amenities_amenity_id_fkey"
            columns: ["amenity_id"]
            isOneToOne: false
            referencedRelation: "amenities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_amenities_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "Properties"
            referencedColumns: ["property_id"]
          },
        ]
      }
      Seasons: {
        Row: {
          id: string
          name: string | null
          slug: string | null
        }
        Insert: {
          id: string
          name?: string | null
          slug?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          slug?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      contact_enquiries_summary: {
        Row: {
          count: number | null
          earliest_enquiry: string | null
          enquiry_type: string | null
          latest_enquiry: string | null
          status: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      filter_blogs_advanced: {
        Args: {
          audience_slugs?: string[]
          season_slugs?: string[]
          activity_slugs?: string[]
          category_slugs?: string[]
        }
        Returns: {
          Categories_id: string | null
          content: string | null
          excerpt: string | null
          hero_image_url: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          published_date: string | null
          slug: string | null
          title: string | null
        }[]
      }
      get_blogs_with_relationships: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          slug: string
          title: string
          excerpt: string
          content: string
          hero_image_url: string
          meta_title: string
          meta_description: string
          published_date: string
          category_id: string
          category_name: string
          category_slug: string
          audiences: Json
          seasons: Json
          activity_levels: Json
        }[]
      }
      get_filter_counts: {
        Args: Record<PropertyKey, never>
        Returns: {
          filter_type: string
          value: string
          label: string
          count: number
        }[]
      }
      get_property_amenities: {
        Args: { p_property_id: string }
        Returns: {
          id: string
          amenity_id: string
          property_id: string
          custom_description: string
          amenity_name: string
          amenity_description: string
          is_premium: boolean
          category_id: string
          category_name: string
          category_icon: string
          category_display_order: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
