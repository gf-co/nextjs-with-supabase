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
      items: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "items_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          email: string;
          id: string;
        };
        Insert: {
          email: string;
          id: string;
        };
        Update: {
          email?: string;
          id?: string;
        };
        Relationships: [];
      };
      tasks: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "tasks_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
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
