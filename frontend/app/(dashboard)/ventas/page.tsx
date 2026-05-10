export default function VentasPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Ventas</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <input
            type="text"
            placeholder="Buscar venta..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
          />
          <button className="ml-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium">
            + Nueva Venta
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 font-semibold text-gray-700">Folio</th>
                <th className="px-6 py-3 font-semibold text-gray-700">Fecha</th>
                <th className="px-6 py-3 font-semibold text-gray-700">Total</th>
                <th className="px-6 py-3 font-semibold text-gray-700">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  Sin ventas aún.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
