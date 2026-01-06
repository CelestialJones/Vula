import supabaseClient from "./supabase"
import type { User, Session } from "@supabase/supabase-js"

interface SignUpResult {
  success: boolean
  data?: { user: User; session: Session }
  error?: string
}

interface SignInResult {
  success: boolean
  data?: { user: User; session: Session }
  error?: string
}

interface UserProfile {
  id: string
  email: string
  full_name: string
  role: string
}

export const authService = {
  async signUp(email: string, password: string, userData?: Record<string, unknown>): Promise<SignUpResult> {
    try {
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  },

  async signIn(email: string, password: string): Promise<SignInResult> {
    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  },

  async signOut(): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabaseClient.auth.signOut()
      if (error) throw error
      return { success: true }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const {
        data: { user },
        error,
      } = await supabaseClient.auth.getUser()
      if (error) throw error
      return user
    } catch (error) {
      return null
    }
  },

  async getUserProfile(userId: string): Promise<{ success: boolean; data?: UserProfile; error?: string }> {
    try {
      const { data, error } = await supabaseClient.from("users").select("*").eq("id", userId).single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  },

  async resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabaseClient.auth.resetPasswordForEmail(email)
      if (error) throw error
      return { success: true }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  },
}
