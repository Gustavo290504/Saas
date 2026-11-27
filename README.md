# SaaS para refaccionarias

Plataforma web de gestión para refaccionarias automotrices: inventario, ventas, reportes y administración de usuarios. **Proyecto en desarrollo**: el inventario y la autenticación funcionan; el punto de venta, el dashboard y la facturación están en el [roadmap](ROADMAP.md).

## Qué funciona hoy

- Autenticación con Supabase Auth y rutas protegidas por middleware.
- Onboarding: el primer usuario registrado queda como administrador.
- Administración de usuarios (solo admin): alta de usuarios desde `/usuarios` mediante una ruta de API del servidor.
- Inventario: alta, edición y baja de productos, con categorías y proveedores.
- Seguridad a nivel de fila (RLS) en las tablas de Supabase.

## Qué sigue

Dashboard con KPIs y gráficas (Recharts), punto de venta, facturación electrónica CFDI 4.0 con Facturapi y multi-tenant. Detalle por fases en [ROADMAP.md](ROADMAP.md).

## Stack

| Capa | Tecnología |
|---|---|
| Frontend | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4 |
| Backend y datos | Supabase (PostgreSQL, Auth, RLS) |
| Gráficas | Recharts |
| Facturación (planeada) | Facturapi.io (CFDI 4.0) |

## Estructura

```
frontend/   Next.js: app/ (rutas), components/, lib/supabase/, middleware.ts
backend/    Edge Functions de Supabase (pendiente)
db/         Migraciones (pendiente)
ROADMAP.md  Fases del proyecto
```

## Cómo correrlo

```bash
cd frontend
npm install
```

Crea `frontend/.env.local` con las llaves de tu proyecto de Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-publica
SUPABASE_SERVICE_ROLE_KEY=tu-clave-de-servicio   # solo en el servidor
```

```bash
npm run dev   # http://localhost:3000
```

Las tablas que usa hoy son `profiles`, `categories`, `suppliers` y `products`. Entra a `/setup` para crear el primer administrador.
