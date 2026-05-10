export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string | null
          id: string
          name: string
          parent_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          parent_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          parent_id?: string | null
        }
      }
      products: {
        Row: {
          active: boolean
          barcode: string | null
          brand: string | null
          category_id: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          price_cost: number
          price_sale: number
          sku: string
          stock: number
          stock_min: number
          supplier_id: string | null
          unit: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean
          barcode?: string | null
          brand?: string | null
          category_id?: string | null
          description?: string | null
          id?: string
          name: string
          price_cost?: number
          price_sale?: number
          sku: string
          stock?: number
          stock_min?: number
          supplier_id?: string | null
          unit?: string
        }
        Update: {
          active?: boolean
          barcode?: string | null
          brand?: string | null
          category_id?: string | null
          description?: string | null
          id?: string
          name?: string
          price_cost?: number
          price_sale?: number
          sku?: string
          stock?: number
          stock_min?: number
          supplier_id?: string | null
          unit?: string
        }
      }
      suppliers: {
        Row: {
          contact: string | null
          created_at: string | null
          email: string | null
          id: string
          name: string
          phone: string | null
          rfc: string | null
        }
        Insert: {
          contact?: string | null
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          rfc?: string | null
        }
        Update: {
          contact?: string | null
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          rfc?: string | null
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

export type Product = Database['public']['Tables']['products']['Row']
export type ProductInsert = Database['public']['Tables']['products']['Insert']
export type ProductUpdate = Database['public']['Tables']['products']['Update']

export type Category = Database['public']['Tables']['categories']['Row']
export type CategoryInsert = Database['public']['Tables']['categories']['Insert']

export type Supplier = Database['public']['Tables']['suppliers']['Row']
export type SupplierInsert = Database['public']['Tables']['suppliers']['Insert']
