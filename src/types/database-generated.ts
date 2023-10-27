export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      case: {
        Row: {
          created_at: string;
          id: string;
          image: string;
          label: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          image: string;
          label: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          image?: string;
          label?: string;
        };
        Relationships: [];
      };
      case_group: {
        Row: {
          created_at: string;
          id: string;
          label: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          label: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          label?: string;
        };
        Relationships: [];
      };
      case_x_group: {
        Row: {
          id_case: string;
          id_case_group: string;
        };
        Insert: {
          id_case: string;
          id_case_group: string;
        };
        Update: {
          id_case?: string;
          id_case_group?: string;
        };
        Relationships: [
          {
            foreignKeyName: "case_x_group_id_case_fkey";
            columns: ["id_case"];
            referencedRelation: "case";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "case_x_group_id_case_group_fkey";
            columns: ["id_case_group"];
            referencedRelation: "case_group";
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
