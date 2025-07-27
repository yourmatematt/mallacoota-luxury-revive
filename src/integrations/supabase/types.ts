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
      Blog_Activity_Levels: {
        Row: {
          activity_level_id: string
          blog_id: string
          id: string
        }
        Insert: {
          activity_level_id: string
          blog_id: string
          id?: string
        }
        Update: {
          activity_level_id?: string
          blog_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Blog_Activity_Levels_activity_level_id_fkey"
            columns: ["activity_level_id"]
            isOneToOne: false
            referencedRelation: "Activity Levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Blog_Activity_Levels_blog_id_fkey"
            columns: ["blog_id"]
            isOneToOne: false
            referencedRelation: "Discover Mallacoota Blogs"
            referencedColumns: ["id"]
          },
        ]
      }
      Blog_Audiences: {
        Row: {
          Audiences_id: string
          Discover_Mallacoota_Blogs_id: string
          id: string
        }
        Insert: {
          Audiences_id: string
          Discover_Mallacoota_Blogs_id: string
          id?: string
        }
        Update: {
          Audiences_id?: string
          Discover_Mallacoota_Blogs_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Blog_Audiences_Audiences_id_fkey"
            columns: ["Audiences_id"]
            isOneToOne: false
            referencedRelation: "Audiences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Blog_Audiences_Discover_Mallacoota_Blogs_id_fkey"
            columns: ["Discover_Mallacoota_Blogs_id"]
            isOneToOne: false
            referencedRelation: "Discover Mallacoota Blogs"
            referencedColumns: ["id"]
          },
        ]
      }
      Blog_Seasons: {
        Row: {
          blog_id: string
          id: string
          season_id: string
        }
        Insert: {
          blog_id: string
          id?: string
          season_id: string
        }
        Update: {
          blog_id?: string
          id?: string
          season_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Blog_Seasons_blog_id_fkey"
            columns: ["blog_id"]
            isOneToOne: false
            referencedRelation: "Discover Mallacoota Blogs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Blog_Seasons_season_id_fkey"
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
      "Discover Mallacoota Blogs": {
        Row: {
          activity_levels: string | null
          audiences: string | null
          Categories_id: string | null
          content: string | null
          excerpt: string | null
          hero_image_url: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          published_date: string | null
          seasons: string | null
          slug: string | null
          title: string | null
        }
        Insert: {
          activity_levels?: string | null
          audiences?: string | null
          Categories_id?: string | null
          content?: string | null
          excerpt?: string | null
          hero_image_url?: string | null
          id: string
          meta_description?: string | null
          meta_title?: string | null
          published_date?: string | null
          seasons?: string | null
          slug?: string | null
          title?: string | null
        }
        Update: {
          activity_levels?: string | null
          audiences?: string | null
          Categories_id?: string | null
          content?: string | null
          excerpt?: string | null
          hero_image_url?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published_date?: string | null
          seasons?: string | null
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
      Properties: {
        Row: {
          airbnb_rating: string | null
          bathrooms: number | null
          bedrooms: number | null
          boat_parking: boolean | null
          description: string | null
          excerpt: string | null
          guests: number | null
          id: string
          image_folder: string | null
          pet_friendly: boolean | null
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
          id: string
          image_folder?: string | null
          pet_friendly?: boolean | null
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
          id?: string
          image_folder?: string | null
          pet_friendly?: boolean | null
          slug?: string | null
          subtitle?: string | null
          title?: string | null
        }
        Relationships: []
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
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
