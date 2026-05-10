# SaaS Refaccionaria — Estructura del Proyecto

## 📁 Estructura de Carpetas

```
SaaS/
├── frontend/              # Next.js 14 App Router + TypeScript + Tailwind
│   ├── app/              # Rutas y páginas
│   ├── components/       # Componentes React reutilizables
│   ├── lib/             # Utilidades y configuración (Supabase, etc.)
│   ├── types/           # Tipos TypeScript
│   ├── public/          # Archivos estáticos
│   ├── package.json
│   └── ...
│
├── backend/              # Edge Functions + Lógica (próximamente)
│   └── supabase/
│       ├── functions/   # Edge Functions
│       └── migrations/  # (será en db/)
│
├── db/                   # Base de datos
│   └── migrations/       # Migraciones Supabase
│
├── ROADMAP.md           # Fases del proyecto
└── README.md            # Este archivo
```

---

## 🚀 Para Iniciar

### 1. Instalar dependencias (si no están instaladas)

```bash
cd frontend
npm install
```

### 2. Configurar variables de entorno

Crear archivo `frontend/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima
```

### 3. Iniciar dev server

```bash
cd frontend
npm run dev
```

### 4. Ver la app en el navegador

**http://localhost:3000**

---

## 📋 Credenciales de Prueba

Usa la página de login para autenticarte. Necesitarás crear un usuario en Supabase primero.

---

## 🗄️ Stack Tecnológico

| Componente | Tecnología |
|-----------|-----------|
| Frontend | Next.js 14 + TypeScript + Tailwind |
| Backend | Supabase (PostgreSQL + Auth + Edge Functions) |
| Facturación | Facturapi.io (CFDI 4.0) |

---

## 📊 Roadmap

Ver `ROADMAP.md` para detalles de fases y sprints.
