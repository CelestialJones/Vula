import supabaseClient from "./supabase"

interface ProductData {
  name: string
  sku: string
  category?: string
  description?: string
  min_stock?: number
  max_stock?: number
  expiry_date?: string
  image_url?: string
  warehouse_id?: string
}

interface Product extends ProductData {
  id: string
  created_at: string
  updated_at: string
}

interface StockItem {
  quantity: number
  location: string
}

export const productService = {
  async createProduct(productData: ProductData): Promise<{ success: boolean; data?: Product; error?: string }> {
    try {
      const { data, error } = await supabaseClient.from("products").insert([productData]).select()

      if (error) throw error
      return { success: true, data: data?.[0] }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  },

  async getProducts(warehouseId?: string | null): Promise<{ success: boolean; data?: Product[]; error?: string }> {
    try {
      let query = supabaseClient.from("products").select("*")

      if (warehouseId) {
        query = query.eq("warehouse_id", warehouseId)
      }

      const { data, error } = await query.order("created_at", {
        ascending: false,
      })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  },

  async getProduct(productId: string): Promise<{ success: boolean; data?: Product; error?: string }> {
    try {
      const { data, error } = await supabaseClient.from("products").select("*").eq("id", productId).single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  },

  async updateProduct(
    productId: string,
    updates: Partial<ProductData>,
  ): Promise<{ success: boolean; data?: Product; error?: string }> {
    try {
      const { data, error } = await supabaseClient.from("products").update(updates).eq("id", productId).select()

      if (error) throw error
      return { success: true, data: data?.[0] }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  },

  async uploadProductImage(
    productId: string,
    imageUri: string,
  ): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
      const filename = `${productId}-${Date.now()}.jpg`
      const response = await fetch(imageUri)
      const blob = await response.blob()

      const { error } = await supabaseClient.storage.from("product-images").upload(filename, blob)

      if (error) throw error

      const {
        data: { publicUrl },
      } = supabaseClient.storage.from("product-images").getPublicUrl(filename)

      return { success: true, url: publicUrl }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  },

  async getProductStock(productId: string): Promise<{ success: boolean; data?: StockItem[]; error?: string }> {
    try {
      const { data, error } = await supabaseClient
        .from("stock")
        .select("quantity, location")
        .eq("product_id", productId)

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  },
}
