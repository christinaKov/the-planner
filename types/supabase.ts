export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
      }
      todos: {
        Row: {
          id: number
          user_id: string | null
          created_at: string | null
          title: string | null
          checked: boolean | null
        }
        Insert: {
          id?: number
          user_id?: string | null
          created_at?: string | null
          title?: string | null
          checked?: boolean | null
        }
        Update: {
          id?: number
          user_id?: string | null
          created_at?: string | null
          title?: string | null
          checked?: boolean | null
        }
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
  }
}
