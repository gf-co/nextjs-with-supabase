export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
        };
        Insert: {
          id: string;
          email: string;
        };
        Update: {
          id: string;
          email: string;
        };
        Relationships: [];
      };
      items: {
        Row: {
          id: string;
          name: string;
          created_at: string;
          user_id: string;
        };
        Insert: {
          id: string;
          name: string;
          created_at: string;
          user_id: string;
        };
        Update: {
          id: string;
          name: string;
          created_at: string;
          user_id: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
