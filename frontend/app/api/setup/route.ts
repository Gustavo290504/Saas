import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const admin = createAdminClient()

  // Verificar que no existe ningún admin
  const { count } = await admin
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'admin')

  if ((count ?? 0) > 0) {
    return NextResponse.json({ error: 'Setup ya completado' }, { status: 403 })
  }

  const { email, password, full_name } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ error: 'Email y contraseña requeridos' }, { status: 400 })
  }

  // Crear usuario con email ya confirmado
  const { data, error: createError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: full_name ?? '' },
  })

  if (createError) {
    return NextResponse.json({ error: createError.message }, { status: 400 })
  }

  // El trigger crea el perfil admin automáticamente
  // Pequeña espera para que el trigger se ejecute
  await new Promise((r) => setTimeout(r, 300))

  return NextResponse.json({ success: true, userId: data.user.id })
}
