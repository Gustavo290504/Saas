import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

async function getAuthenticatedAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { user: null, isAdmin: false }

  // Admin client bypasea RLS para leer el perfil correctamente
  const admin = createAdminClient()
  const { data: profile } = await admin
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  return { user, isAdmin: profile?.role === 'admin' }
}

// POST — crear usuario (solo admin)
export async function POST(req: NextRequest) {
  const { user, isAdmin } = await getAuthenticatedAdmin()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  if (!isAdmin) return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 })

  const { email, full_name, password, role } = await req.json()
  if (!email || !password)
    return NextResponse.json({ error: 'Email y contraseña requeridos' }, { status: 400 })

  const admin = createAdminClient()

  const { data: newUser, error: authError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: full_name ?? '' },
  })

  if (authError) return NextResponse.json({ error: authError.message }, { status: 400 })

  const { error: profileError } = await admin
    .from('profiles')
    .upsert({
      id: newUser.user.id,
      email,
      full_name: full_name ?? '',
      role: role ?? 'staff',
      active: true,
      created_by: user.id,
    }, { onConflict: 'email' })

  if (profileError) {
    await admin.auth.admin.deleteUser(newUser.user.id)
    return NextResponse.json({ error: profileError.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, user: { email, full_name, role } })
}

// GET — listar usuarios (solo admin)
export async function GET() {
  const { user, isAdmin } = await getAuthenticatedAdmin()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  if (!isAdmin) return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 })

  const admin = createAdminClient()
  const { data: profiles } = await admin
    .from('profiles')
    .select('id, email, full_name, role, active, created_at')
    .order('created_at')

  return NextResponse.json({ users: profiles ?? [] })
}

// PATCH — activar/desactivar o cambiar rol (solo admin)
export async function PATCH(req: NextRequest) {
  const { user, isAdmin } = await getAuthenticatedAdmin()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  if (!isAdmin) return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 })

  const { targetId, active, role } = await req.json()
  if (!targetId) return NextResponse.json({ error: 'targetId requerido' }, { status: 400 })
  if (targetId === user.id)
    return NextResponse.json({ error: 'No puedes modificar tu propio perfil aquí' }, { status: 400 })

  const update: Record<string, unknown> = {}
  if (active !== undefined) update.active = active
  if (role !== undefined) update.role = role

  const admin = createAdminClient()
  await admin.from('profiles').update(update).eq('id', targetId)

  return NextResponse.json({ success: true })
}
