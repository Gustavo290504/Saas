# SaaS Refaccionaria — Roadmap Ejecutivo

## Visión
Plataforma integral de gestión para refaccionarias automotrices. Dashboard inteligente, inventario en tiempo real, punto de venta, facturación electrónica (SAT) y automatización de procesos.

---

## Roadmap de Fases

### ✅ FASE 1 — Cimientos (Sprint 1-2) 
*Objetivo: Proyecto base con autenticación y layout*

- [x] Init Next.js 14 + Supabase + TypeScript + Tailwind + shadcn/ui
- [x] Supabase Auth (email/password)
- [x] Middleware de protección de rutas
- [x] Layout: sidebar, header, tema claro/oscuro
- [x] Página login / onboarding
- [x] RLS (Row Level Security) básico
- [ ] Deploy inicial en Vercel

**Estado:** En progreso  
**Entregable:** App funcional con login

---

### ⏳ FASE 2 — Inventario / CRUD (Sprint 3-4)
*Objetivo: Gestión completa de productos*

- [ ] Tablas DB: products, categories, suppliers
- [ ] CRUD inventario (paginación, filtros, búsqueda)
- [ ] Lector código de barras (cámara + input manual)
- [ ] Alertas de stock bajo
- [ ] Gestión de proveedores

**Entregable:** Inventario con soporte de códigos de barras

---

### ⏳ FASE 3 — Dashboard & Reportes (Sprint 5-6)
*Objetivo: Vista ejecutiva con KPIs y gráficas*

- [ ] KPIs: ventas, ingresos, costos, margen
- [ ] Gráficas por período (Recharts)
- [ ] Top productos, movimientos recientes
- [ ] Export a CSV/PDF

**Entregable:** Dashboard en tiempo real

---

### ⏳ FASE 4 — Punto de Venta (Sprint 7-8)
*Objetivo: Sistema operacional de ventas en caja*

- [ ] Pantalla POS: búsqueda, carrito, IVA
- [ ] Folio autoincremental
- [ ] Métodos de pago (efectivo, tarjeta, transferencia)
- [ ] Historial de ventas

**Entregable:** POS funcional sin facturación aún

---

### ⏳ FASE 5 — Facturación CFDI/SAT (Sprint 9-10)
*Objetivo: Emisión de facturas electrónicas timbradas*

- [ ] Integración Facturapi.io
- [ ] CFDI 4.0 desde venta → SAT
- [ ] Descarga XML/PDF, cancelación
- [ ] Envío por email

**Entregable:** Facturación completa y legal

---

### ⏳ FASE 6 — Automatización (Sprint 11-12)
*Objetivo: Reducir trabajo manual*

- [ ] Alertas automáticas (stock, ventas)
- [ ] Reportes por email (semanal/mensual)
- [ ] Supabase Cron: cierre de caja, backups
- [ ] Webhooks (WhatsApp, integraciones)

**Entregable:** Motor de automatización

---

### ⏳ FASE 7 — Multi-tenant (Sprint 13+)
*Objetivo: Escalar a SaaS de múltiples clientes*

- [ ] Aislamiento de datos por organización
- [ ] Suscripciones + Stripe
- [ ] Panel de superadmin

**Entregable:** Plataforma SaaS completa

---

## Tech Stack

| Componente | Tecnología |
|-----------|-----------|
| Frontend | Next.js 14 App Router + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Backend | Supabase (PostgreSQL + Auth + Edge Functions) |
| Estado | TanStack Query (React Query) |
| Código de barras | react-zxing |
| Gráficas | Recharts |
| Facturación | Facturapi.io (CFDI 4.0) |
| Hosting | Vercel (frontend) + Supabase Cloud (backend) |

---

## Métricas de Éxito

- ✅ Auth funciona y rutas están protegidas
- ✅ CRUD sin errores y stock actualiza en tiempo real
- ✅ Dashboard con KPIs actualizados
- ✅ CFDI con UUID válido del SAT
- ✅ Automatización ejecuta sin fallos

---

**Última actualización:** 2026-05-09  
**Estado General:** Fase 1 iniciada
