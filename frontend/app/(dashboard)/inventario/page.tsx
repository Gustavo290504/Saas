'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import ProductModal from '@/components/inventario/ProductModal'
import DeleteConfirm from '@/components/inventario/DeleteConfirm'
import type { Product } from '@/types/database.types'

const PAGE_SIZE = 20

export default function InventarioPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const [filterLowStock, setFilterLowStock] = useState(false)
  const [filterInactive, setFilterInactive] = useState(false)
  const [loading, setLoading] = useState(true)

  const [modalOpen, setModalOpen] = useState(false)
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const barcodeRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const fetchProducts = useCallback(async () => {
    setLoading(true)

    let query = supabase
      .from('products')
      .select('*', { count: 'exact' })
      .order('name')
      .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1)

    if (!filterInactive) query = query.eq('active', true)

    if (search.trim()) {
      query = query.or(
        `name.ilike.%${search}%,sku.ilike.%${search}%,barcode.ilike.%${search}%,brand.ilike.%${search}%`
      )
    }

    const { data, count } = await query
    const rows = data ?? []

    const filtered = filterLowStock ? rows.filter((p) => p.stock <= p.stock_min) : rows
    setProducts(filtered)
    setTotal(count ?? 0)
    setLoading(false)
  }, [search, page, filterLowStock, filterInactive, supabase])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  useEffect(() => {
    setPage(0)
  }, [search, filterLowStock, filterInactive])

  const handleBarcodeScan = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = (e.target as HTMLInputElement).value.trim()
      if (value) setSearch(value)
    }
  }

  const handleDelete = async () => {
    if (!deleteProduct) return
    setDeleteLoading(true)
    await supabase.from('products').update({ active: false }).eq('id', deleteProduct.id)
    setDeleteLoading(false)
    setDeleteProduct(null)
    fetchProducts()
  }

  const openCreate = () => {
    setEditProduct(null)
    setModalOpen(true)
  }

  const openEdit = (product: Product) => {
    setEditProduct(product)
    setModalOpen(true)
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventario</h1>
          <p className="text-gray-500 text-sm mt-1">{total} producto{total !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={openCreate}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          + Nuevo Producto
        </button>
      </div>

      {/* Búsqueda y filtros */}
      <div className="bg-white rounded-lg shadow p-4 mb-4 flex flex-wrap gap-3 items-center">
        <input
          ref={barcodeRef}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleBarcodeScan}
          placeholder="Buscar por nombre, SKU, código de barras o marca..."
          className="flex-1 min-w-64 px-4 py-2 border border-gray-900 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
        />
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={filterLowStock}
            onChange={(e) => setFilterLowStock(e.target.checked)}
            className="accent-orange-500"
          />
          Stock bajo
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={filterInactive}
            onChange={(e) => setFilterInactive(e.target.checked)}
            className="accent-gray-500"
          />
          Ver inactivos
        </label>
        {search && (
          <button
            onClick={() => setSearch('')}
            className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-900">
              <tr>
                <th className="px-4 py-3 text-gray-900">SKU / Barras</th>
                <th className="px-4 py-3 text-gray-900">Nombre</th>
                <th className="px-4 py-3 text-gray-900">Marca</th>
                <th className="px-4 py-3 text-right text-gray-900">Costo</th>
                <th className="px-4 py-3 text-right text-gray-900">Precio</th>
                <th className="px-4 py-3 text-center text-gray-900">Stock</th>
                <th className="px-4 py-3 text-center">Estado</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-gray-400">
                    Cargando...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-gray-400">
                    {search ? 'Sin resultados para esa búsqueda.' : 'Sin productos. Crea el primero.'}
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-mono text-xs font-semibold text-gray-700">{p.sku}</div>
                      {p.barcode && (
                        <div className="font-mono text-xs text-gray-400 mt-0.5">{p.barcode}</div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{p.name}</div>
                      {p.description && (
                        <div className="text-xs text-gray-400 truncate max-w-48">{p.description}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{p.brand ?? '—'}</td>
                    <td className="px-4 py-3 text-right text-gray-600">
                      ${p.price_cost.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900">
                      ${p.price_sale.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <StockBadge stock={p.stock} stockMin={p.stock_min} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                        p.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {p.active ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => openEdit(p)}
                        className="text-blue-600 hover:text-blue-800 font-medium mr-3"
                      >
                        Editar
                      </button>
                      {p.active && (
                        <button
                          onClick={() => setDeleteProduct(p)}
                          className="text-red-500 hover:text-red-700 font-medium"
                        >
                          Eliminar
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
            <span className="text-sm text-gray-500">
              Página {page + 1} de {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 0}
                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-40 hover:bg-gray-50"
              >
                Anterior
              </button>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page + 1 >= totalPages}
                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-40 hover:bg-gray-50"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>

      {modalOpen && (
        <ProductModal
          product={editProduct}
          onClose={() => setModalOpen(false)}
          onSaved={fetchProducts}
        />
      )}

      {deleteProduct && (
        <DeleteConfirm
          productName={deleteProduct.name}
          onConfirm={handleDelete}
          onCancel={() => setDeleteProduct(null)}
          loading={deleteLoading}
        />
      )}
    </div>
  )
}

function StockBadge({ stock, stockMin }: { stock: number; stockMin: number }) {
  const isLow = stock <= stockMin
  const isEmpty = stock === 0
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
      isEmpty ? 'bg-red-100 text-red-700' : isLow ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
    }`}>
      {isEmpty && '⚠ '}
      {stock}
    </span>
  )
}
