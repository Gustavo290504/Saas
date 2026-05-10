export default function ReportesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Reportes</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Ventas por Período
          </h2>
          <p className="text-gray-600">Gráfica de ventas (próximamente)</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Productos Más Vendidos
          </h2>
          <p className="text-gray-600">Top 10 productos (próximamente)</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Margen de Ganancia
          </h2>
          <p className="text-gray-600">Análisis de costos (próximamente)</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Inventario
          </h2>
          <p className="text-gray-600">Estado del inventario (próximamente)</p>
        </div>
      </div>
    </div>
  )
}
