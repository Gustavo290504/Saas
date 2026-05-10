export default function AccesoDenegadoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <div className="text-6xl mb-4">🔒</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Acceso Denegado</h1>
        <p className="text-gray-600 mb-6">
          Tu cuenta no está activa o no tienes permisos para acceder a este sistema.
          <br />Contacta al administrador.
        </p>
        <a
          href="/login"
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          Volver al Login
        </a>
      </div>
    </div>
  )
}
