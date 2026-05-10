'use client'

interface Props {
  productName: string
  onConfirm: () => void
  onCancel: () => void
  loading: boolean
}

export default function DeleteConfirm({ productName, onConfirm, onCancel, loading }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Eliminar Producto</h2>
        <p className="text-gray-600 mb-6">
          ¿Seguro que deseas desactivar{' '}
          <span className="font-semibold text-gray-900">{productName}</span>?
          El producto quedará inactivo y no aparecerá en ventas.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
          >
            {loading ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  )
}
