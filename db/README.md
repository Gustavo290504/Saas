# Base de Datos — Migraciones Supabase

Esta carpeta contiene todas las migraciones de base de datos para el proyecto.

## Migraciones

Las migraciones se aplican automáticamente durante el desarrollo y producción.

```
migrations/
├── 001_create_products.sql
├── 002_create_categories.sql
├── 003_create_suppliers.sql
├── 004_create_sales.sql
├── 005_create_invoices.sql
└── ...
```

## Para Aplicar Migraciones

Usa Supabase Dashboard o Supabase CLI:

```bash
supabase migration up
```

## Esquema Actual

- `products` — Inventario de productos
- `categories` — Categorías de productos
- `suppliers` — Proveedores
- `sales` — Ventas realizadas
- `sale_items` — Renglones de venta
- `customers` — Clientes (para facturación)
- `invoices` — Facturas CFDI timbradas
