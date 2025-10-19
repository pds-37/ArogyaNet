export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      actions: {
        Row: {
          action_type: string
          assigned_to: string | null
          created_at: string
          description: string
          id: string
          problem_id: string | null
          status: string | null
        }
        Insert: {
          action_type: string
          assigned_to?: string | null
          created_at?: string
          description: string
          id?: string
          problem_id?: string | null
          status?: string | null
        }
        Update: {
          action_type?: string
          assigned_to?: string | null
          created_at?: string
          description?: string
          id?: string
          problem_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "actions_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "problems"
            referencedColumns: ["id"]
          },
        ]
      }
      alerts: {
        Row: {
          alert_type: string
          confidence: number
          created_at: string
          factors: Json | null
          hospital_id: string
          id: string
          predicted_cases: number
          severity: string
        }
        Insert: {
          alert_type: string
          confidence: number
          created_at?: string
          factors?: Json | null
          hospital_id: string
          id?: string
          predicted_cases: number
          severity: string
        }
        Update: {
          alert_type?: string
          confidence?: number
          created_at?: string
          factors?: Json | null
          hospital_id?: string
          id?: string
          predicted_cases?: number
          severity?: string
        }
        Relationships: []
      }
      hospital_resources: {
        Row: {
          current_stock: number
          hospital_id: string
          id: string
          required: number
          resource_name: string
          updated_at: string
        }
        Insert: {
          current_stock?: number
          hospital_id: string
          id?: string
          required?: number
          resource_name: string
          updated_at?: string
        }
        Update: {
          current_stock?: number
          hospital_id?: string
          id?: string
          required?: number
          resource_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      ngo_pledges: {
        Row: {
          created_at: string
          id: string
          ngo_id: string
          request_id: string | null
          status: string | null
          volunteers_assigned: number
        }
        Insert: {
          created_at?: string
          id?: string
          ngo_id: string
          request_id?: string | null
          status?: string | null
          volunteers_assigned: number
        }
        Update: {
          created_at?: string
          id?: string
          ngo_id?: string
          request_id?: string | null
          status?: string | null
          volunteers_assigned?: number
        }
        Relationships: [
          {
            foreignKeyName: "ngo_pledges_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "ngo_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      ngo_requests: {
        Row: {
          created_at: string
          description: string
          id: string
          location: string
          required_volunteers: number | null
          status: string | null
          title: string
          urgency: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          location: string
          required_volunteers?: number | null
          status?: string | null
          title: string
          urgency: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          location?: string
          required_volunteers?: number | null
          status?: string | null
          title?: string
          urgency?: string
        }
        Relationships: []
      }
      problems: {
        Row: {
          alert_id: string | null
          created_at: string
          description: string
          id: string
          problem_type: string
          severity: string
        }
        Insert: {
          alert_id?: string | null
          created_at?: string
          description: string
          id?: string
          problem_type: string
          severity: string
        }
        Update: {
          alert_id?: string | null
          created_at?: string
          description?: string
          id?: string
          problem_type?: string
          severity?: string
        }
        Relationships: [
          {
            foreignKeyName: "problems_alert_id_fkey"
            columns: ["alert_id"]
            isOneToOne: false
            referencedRelation: "alerts"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      resource_allocations: {
        Row: {
          created_at: string
          from_user_id: string
          id: string
          quantity: number
          resource_name: string
          status: string | null
          to_hospital_id: string
        }
        Insert: {
          created_at?: string
          from_user_id: string
          id?: string
          quantity: number
          resource_name: string
          status?: string | null
          to_hospital_id: string
        }
        Update: {
          created_at?: string
          from_user_id?: string
          id?: string
          quantity?: number
          resource_name?: string
          status?: string | null
          to_hospital_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "hospital" | "government" | "ngo" | "public"
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
    Enums: {
      app_role: ["hospital", "government", "ngo", "public"],
    },
  },
} as const
