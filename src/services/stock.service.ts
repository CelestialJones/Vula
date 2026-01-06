import supabaseClient from "./supabase"
import { MOVEMENT_TYPES } from "../constants/roles"

interface MovementData {
  product_id: string
  quantity: number
  location?: string
  batch_number?: string
  reason?: string
  destination?: string
  notes?: string
  user_id?: string
}

interface Movement extends MovementData {
  id: string
  type: string
  created_at: string
}

interface Alert {
  id: string
  product_id: string
  type: string
  message: string
  is_read: boolean
  created_at: string
}

interface StockLocation {
  id: string
  quantity: number
  location: string
  batch_number?: string
  expiry_date?: string
  products: Product
}

interface Product {
  id: string
  name: string
  sku: string
}

export const stockService = {
  async createEntry(entryData: MovementData): Promise<{ success: boolean; data?: Movement; error?: string }> {
    try {
      const { data, error } = await supabaseClient
        .from("stock_movements")
        .insert([
          {
            ...entryData,
            type: MOVEMENT_TYPES.ENTRY,
            created_at: new Date().toISOString(),
          },
        ])
        .select()

      if (error) throw error
      return { success: true, data: data?.[0] }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  },

  async createExit(exitData: MovementData): Promise<{ success: boolean; data?: Movement; error?: string }> {
    try {
      const { data, error } = await supabaseClient
        .from("stock_movements")
        .insert([
          {
            ...exitData,
            type: MOVEMENT_TYPES.EXIT,
            created_at: new Date().toISOString(),
          },
        ])
        .select()

      if (error) throw error
      return { success: true, data: data?.[0] }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  },

  async createAdjustment(adjustmentData: MovementData): Promise<{ success: boolean; data?: Movement; error?: string }> {
    try {
      const { data, error } = await supabaseClient
        .from("stock_movements")
        .insert([
          {
            ...adjustmentData,
            type: MOVEMENT_TYPES.ADJUSTMENT,
            created_at: new Date().toISOString(),
          },
        ])
        .select()

      if (error) throw error
      return { success: true, data: data?.[0] }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  },

  async createTransfer(transferData: MovementData): Promise<{ success: boolean; data?: Movement; error?: string }> {
    try {
      const { data, error } = await supabaseClient
        .from("stock_movements")
        .insert([
          {
            ...transferData,
            type: MOVEMENT_TYPES.TRANSFER,
            created_at: new Date().toISOString(),
          },
        ])
        .select()

      if (error) throw error
      return { success: true, data: data?.[0] }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  },

  async getMovementHistory(
    productId?: string | null,
    limit = 50,
  ): Promise<{ success: boolean; data?: Movement[]; error?: string }> {
    try {
      let query = supabaseClient
        .from("stock_movements")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit)

      if (productId) {
        query = query.eq("product_id", productId)
      }

      const { data, error } = await query

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  },

  async getAlerts(): Promise<{ success: boolean; data?: Alert[]; error?: string }> {
    try {
      const { data, error } = await supabaseClient.from("alerts").select("*").order("created_at", { ascending: false })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  },

  async getStockByLocation(warehouseId: string): Promise<{ success: boolean; data?: StockLocation[]; error?: string }> {
    try {
      const { data, error } = await supabaseClient
        .from("stock")
        .select("*, products(*)")
        .eq("warehouse_id", warehouseId)

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  },

  async markAlertAsRead(alertId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabaseClient.from("alerts").update({ is_read: true }).eq("id", alertId)

      if (error) throw error
      return { success: true }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  },

  async markAllAlertsAsRead(): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabaseClient.from("alerts").update({ is_read: true }).eq("is_read", false)

      if (error) throw error
      return { success: true }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  },

  async getUnreadAlerts(): Promise<{ success: boolean; data?: Alert[]; error?: string }> {
    try {
      const { data, error } = await supabaseClient
        .from("alerts")
        .select("*")
        .eq("is_read", false)
        .order("created_at", { ascending: false })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  },

  async deleteAlert(alertId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabaseClient.from("alerts").delete().eq("id", alertId)

      if (error) throw error
      return { success: true }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  },
}
