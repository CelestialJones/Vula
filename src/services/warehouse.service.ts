import supabaseClient from "./supabase"

interface WarehouseData {
  name: string
  location?: string
  status?: "active" | "inactive"
}

interface Warehouse extends WarehouseData {
  id: string
  created_at: string
}

export const warehouseService = {
  async createWarehouse(data: WarehouseData): Promise<{ success: boolean; data?: Warehouse; error?: string }> {
    try {
      const { data: warehouse, error } = await supabaseClient.from("warehouses").insert([data]).select().single()

      if (error) throw error
      return { success: true, data: warehouse }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  },

  async getWarehouses(): Promise<{ success: boolean; data?: Warehouse[]; error?: string }> {
    try {
      const { data, error } = await supabaseClient
        .from("warehouses")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: true })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  },

  async getWarehouse(warehouseId: string): Promise<{ success: boolean; data?: Warehouse; error?: string }> {
    try {
      const { data, error } = await supabaseClient.from("warehouses").select("*").eq("id", warehouseId).single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  },

  async updateWarehouse(
    warehouseId: string,
    updates: Partial<WarehouseData>,
  ): Promise<{ success: boolean; data?: Warehouse; error?: string }> {
    try {
      const { data, error } = await supabaseClient
        .from("warehouses")
        .update(updates)
        .eq("id", warehouseId)
        .select()
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  },

  async deleteWarehouse(warehouseId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabaseClient.from("warehouses").update({ status: "inactive" }).eq("id", warehouseId)

      if (error) throw error
      return { success: true }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  },
}
