export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <KPICard title="Ventas Hoy" value="$0.00" change="0%" />
        <KPICard title="Ingresos" value="$0.00" change="0%" />
        <KPICard title="Costo" value="$0.00" change="0%" />
        <KPICard title="Margen" value="0%" change="0%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Resumen de Ventas
          </h2>
          <p className="text-gray-600">Gráfica de ventas por período (próximamente)</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Productos Bajos
          </h2>
          <p className="text-gray-600 text-sm">Sin productos bajo stock</p>
        </div>
      </div>
    </div>
  )
}

function KPICard({
  title,
  value,
  change,
}: {
  title: string
  value: string
  change: string
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <p className="text-gray-600 text-sm font-medium">{title}</p>
      <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
      <p className="text-green-600 text-xs mt-2">{change} vs. ayer</p>
    </div>
  )
}
