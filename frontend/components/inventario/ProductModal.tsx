'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Product, ProductInsert, Category, Supplier } from '@/types/database.types'

interface Props {
  product: Product | null
  onClose: () => void
  onSaved: () => void
}

const UNITS = ['pieza', 'par', 'juego', 'litro', 'metro', 'kit', 'caja']

const EMPTY_FORM: ProductInsert = {
  sku: '',
  barcode: '',
  name: '',
  description: '',
  brand: '',
  category_id: undefined,
  supplier_id: undefined,
  price_cost: 0,
  price_sale: 0,
  stock: 0,
  stock_min: 5,
  unit: 'pieza',
  active: true,
}

export default function ProductModal({ product, onClose, onSaved }: Props) {
  const [form, setForm] = useState<ProductInsert>(EMPTY_FORM)
  const [categories, setCategories] = useState<Category[]>([])
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    if (product) {
      setForm({
        sku: product.sku,
        barcode: product.barcode ?? '',
        name: product.name,
        description: product.description ?? '',
        brand: product.brand ?? '',
        category_id: product.category_id ?? undefined,
        supplier_id: product.supplier_id ?? undefined,
        price_cost: product.price_cost,
        price_sale: product.price_sale,
        stock: product.stock,
        stock_min: product.stock_min,
        unit: product.unit,
        active: product.active,
      })
    } else {
      setForm(EMPTY_FORM)
    }
  }, [product])

  useEffect(() => {
    const fetchCatalogues = async () => {
      const [{ data: cats }, { data: sups }] = await Promise.all([
        supabase.from('categories').select('*').order('name'),
        supabase.from('suppliers').select('*').order('name'),
      ])
      setCategories(cats ?? [])
      setSuppliers(sups ?? [])
    }
    fetchCatalogues()
  }, [supabase])

  const set = (field: keyof ProductInsert, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const payload = {
      ...form,
      barcode: form.barcode || null,
      description: form.description || null,
      brand: form.brand || null,
      category_id: form.category_id || null,
      supplier_id: form.supplier_id || null,
    }

    const { error: err } = product
      ? await supabase.from('products').update(payload).eq('id', product.id)
      : await supabase.from('products').insert(payload)

    if (err) {
      setError(err.message)
    } else {
      onSaved()
      onClose()
    }
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            {product ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Fila SKU / Código de Barras */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="SKU *">
              <input
                required
                value={form.sku}
                onChange={(e) => set('sku', e.target.value)}
                placeholder="Ej: FRENO-001"
                className={inputCls}
              />
            </Field>
            <Field label="Código de Barras">
              <input
                value={form.barcode ?? ''}
                onChange={(e) => set('barcode', e.target.value)}
                placeholder="Escanear o escribir"
                className={inputCls}
                onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault() }}
              />
            </Field>
          </div>

          {/* Nombre */}
          <Field label="Nombre *">
            <input
              required
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="Nombre del producto"
              className={inputCls}
            />
          </Field>

          {/* Marca / Categoría / Proveedor */}
          <div className="grid grid-cols-3 gap-4">
            <Field label="Marca">
              <input
                value={form.brand ?? ''}
                onChange={(e) => set('brand', e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Categoría">
              <select
                value={form.category_id ?? ''}
                onChange={(e) => set('category_id', e.target.value || undefined)}
                className={inputCls}
              >
                <option value="">— Sin categoría —</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Proveedor">
              <select
                value={form.supplier_id ?? ''}
                onChange={(e) => set('supplier_id', e.target.value || undefined)}
                className={inputCls}
              >
                <option value="">— Sin proveedor —</option>
                {suppliers.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </Field>
          </div>

          {/* Precios */}
          <div className="grid grid-cols-3 gap-4">
            <Field label="Costo *">
              <input
                required
                type="number"
                min="0"
                step="0.01"
                value={form.price_cost}
                onChange={(e) => set('price_cost', parseFloat(e.target.value) || 0)}
                className={inputCls}
              />
            </Field>
            <Field label="Precio Venta *">
              <input
                required
                type="number"
                min="0"
                step="0.01"
                value={form.price_sale}
                onChange={(e) => set('price_sale', parseFloat(e.target.value) || 0)}
                className={inputCls}
              />
            </Field>
            <Field label="Unidad">
              <select
                value={form.unit}
                onChange={(e) => set('unit', e.target.value)}
                className={inputCls}
              >
                {UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
              </select>
            </Field>
          </div>

          {/* Stock */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Stock Actual">
              <input
                type="number"
                min="0"
                value={form.stock}
                onChange={(e) => set('stock', parseInt(e.target.value) || 0)}
                className={inputCls}
              />
            </Field>
            <Field label="Stock Mínimo">
              <input
                type="number"
                min="0"
                value={form.stock_min}
                onChange={(e) => set('stock_min', parseInt(e.target.value) || 0)}
                className={inputCls}
              />
            </Field>
          </div>

          {/* Descripción */}
          <Field label="Descripción">
            <textarea
              value={form.description ?? ''}
              onChange={(e) => set('description', e.target.value)}
              rows={2}
              className={inputCls}
            />
          </Field>

          {/* Estado */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => set('active', e.target.checked)}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-sm font-medium text-gray-700">Producto activo</span>
          </label>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">{error}</div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
            >
              {loading ? 'Guardando...' : product ? 'Actualizar' : 'Crear Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {children}
    </div>
  )
}

const inputCls = 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none'
