# CLAUDE.md — Refaccionaria SaaS

SaaS de gestión para refaccionarias: inventario, POS, facturación CFDI/SAT.
Ver fases detalladas en `ROADMAP.md`.

**Fase actual:** Fase 2 completada — Inventario CRUD + perfiles de usuario

---

## Stack

| | Tech |
|---|---|
| Frontend | Next.js 16 App Router + TypeScript + Tailwind |
| Backend | Supabase (PostgreSQL + Auth + Edge Functions) |
| Gráficas | Recharts (Fase 3) |
| Facturación | Facturapi.io CFDI 4.0 (Fase 5) |
| Hosting | Vercel + Supabase Cloud |

---

## Estructura

```
SaaS/
├── frontend/          # Next.js
│   ├── app/
│   │   ├── (auth)/   # login, setup, acceso-denegado
│   │   ├── (dashboard)/  # layout protegido + páginas
│   │   └── api/      # API routes server-side
│   ├── components/layout/  # Sidebar, Header
│   ├── components/inventario/  # ProductModal, DeleteConfirm
│   ├── lib/supabase/ # client.ts, server.ts, admin.ts, middleware.ts
│   └── types/        # database.types.ts
├── backend/           # Edge Functions (futuro)
├── db/                # Migraciones SQL
└── ROADMAP.md
```

---

## Dev local

```bash
cd frontend && npm run dev   # http://localhost:3000
```

`.env.local` requerido:
```
NEXT_PUBLIC_SUPABASE_URL=https://bqovenezjlhoafjxjnfd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
SUPABASE_SERVICE_ROLE_KEY=sb_secret_...   # solo server
```

---

## Base de datos (Supabase: bqovenezjlhoafjxjnfd)

Tablas creadas: `profiles`, `categories`, `suppliers`, `products`

Pendiente (Fase 4): `customers`, `sales`, `sale_items`, `invoices`

RLS habilitado en todas las tablas. **Regla clave:** cualquier lectura de `profiles` debe usar `createAdminClient()` (service_role) para evitar problemas de RLS en server-side.

---

## Auth y usuarios

- Primer usuario en registrarse → trigger lo marca como `admin`
- Solo admin puede crear usuarios vía `/usuarios` → `POST /api/admin/users`
- Protección: `app/(dashboard)/layout.tsx` verifica perfil activo con admin client
- Rutas públicas: `/login`, `/setup`, `/acceso-denegado`
- Usuario admin: `gustavo@correo.com`

---

## Convenciones

- Lecturas de `profiles` → siempre `createAdminClient()`, nunca cliente anon
- Layouts de dashboard → Server Components con `async/await`
- Componentes con hooks → `'use client'`
- Soft delete en productos: `active = false`
- Código de barras: `react-zxing` incompatible con React 19 → pendiente alternativa

---

**Última actualización:** 2026-05-10
