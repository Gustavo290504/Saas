import { createClient } from '@supabase/supabase-js'

// Solo usar en Server Components o API routes — NUNCA en el cliente
export const createAdminClient = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
