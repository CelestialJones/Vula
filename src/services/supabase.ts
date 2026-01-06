import AsyncStorage from "@react-native-async-storage/async-storage"
import { createClient, type SupabaseClient } from "@supabase/supabase-js"

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || "https://plrbeayjllgmmwjmutbm.supabase.co"
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBscmJlYXlqbGxnbW13am11dGJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1Mjk1NjksImV4cCI6MjA4MTEwNTU2OX0.7TvIHYfxbeRX-wYH18VHxTtRCRqf-9czfaL165Ge2JE"

const supabaseClient: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

export default supabaseClient
