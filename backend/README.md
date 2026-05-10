# Backend — Edge Functions y Lógica

Esta carpeta contiene la lógica del backend, principalmente:

- **Edge Functions** de Supabase (TypeScript/Deno)
- **Webhooks** para integraciones externas
- **Cron jobs** para automatización

## Estructura

```
backend/
├── supabase/
│   ├── functions/
│   │   ├── send-invoice/          # Enviar factura por email
│   │   ├── create-cfdi/           # Generar CFDI
│   │   ├── stock-alerts/          # Alertas de stock bajo
│   │   └── ...
│   └── config/
```

## Ambiente de Desarrollo

```bash
# Instalar Supabase CLI
npm install -g supabase

# Iniciar stack local
supabase start

# Ver funciones disponibles
supabase functions list
```

## Deployment

Las Edge Functions se despliegan automáticamente junto con las migraciones en Supabase.
