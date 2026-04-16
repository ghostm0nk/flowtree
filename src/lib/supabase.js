import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Development logging for debugging
if (import.meta.env.DEV) {
  console.log('[Supabase] Initializing client...')
  console.log('[Supabase] URL:', supabaseUrl || 'MISSING')
  if (supabaseAnonKey) {
    const maskedKey = supabaseAnonKey.slice(0, 4) + '****' + supabaseAnonKey.slice(-4)
    console.log('[Supabase] Anon Key:', maskedKey)
  } else {
    console.log('[Supabase] Anon Key: MISSING')
  }
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Please check your environment variables VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Log schema initialization status in development
if (import.meta.env.DEV) {
  console.log('[Supabase] Client initialized successfully')
  console.log('[Supabase] Ready to interact with database schema')
}