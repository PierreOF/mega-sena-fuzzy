function LoadingSpinner({ message = "Calculando números com lógica fuzzy..." }) {
  return (
    <div className="flex flex-col justify-center items-center py-16">
      {/* Spinner animado */}
      <div className="relative">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-600"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-3xl">🎲</div>
        </div>
      </div>

      {/* Mensagem */}
      <p className="mt-6 text-gray-600 text-lg font-medium animate-pulse">
        {message}
      </p>

      {/* Barra de progresso indeterminada */}
      <div className="mt-4 w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-pulse"></div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
