import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-[85vh] px-4">
        {/* Icon */}
        <div>
          <div className="text-9xl mb-8 animate-pulse-slow">🎲</div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Sistema Fuzzy
          </span>
        </h1>

        <h2 className="text-3xl md:text-4xl font-semibold text-gray-700 text-center mb-6">
          Mega-Sena
        </h2>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-600 text-center mb-12 max-w-2xl">
          Análise Inteligente por <strong>Lógica Fuzzy</strong>
        </p>

        {/* Main CTA Button */}
        <Link
          to="/configurar"
          className="group inline-block px-12 py-6 text-xl md:text-2xl font-bold text-white
                     bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600
                     rounded-2xl shadow-2xl transform transition-all duration-300
                     hover:scale-105 hover:shadow-3xl active:scale-95
                     pulse-glow"
        >
          <span className="flex items-center gap-3">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
            Começar Análise
          </span>
        </Link>

        {/* Description */}
        <p className="text-center text-gray-600 mt-8 max-w-3xl px-4">
          Sistema educacional que utiliza lógica fuzzy para analisar padrões estatísticos
          e gerar recomendações de números baseadas em 5 variáveis configuráveis.
        </p>
      </div>

      {/* Features Cards */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="backdrop-blur-lg bg-white/70 rounded-xl shadow-lg p-6 border border-white/20
                         hover:bg-white/90 transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              5 Variáveis Fuzzy
            </h3>
            <p className="text-gray-600">
              Ajuste pesos de frequência histórica, tempo de ausência, distribuição posicional,
              equilíbrio par/ímpar e tendência da soma.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="backdrop-blur-lg bg-white/70 rounded-xl shadow-lg p-6 border border-white/20
                         hover:bg-white/90 transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-5xl mb-4">📈</div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Análise Visual
            </h3>
            <p className="text-gray-600">
              Visualize resultados através de gráficos interativos que mostram distribuição
              de scores, estatísticas e padrões identificados.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="backdrop-blur-lg bg-white/70 rounded-xl shadow-lg p-6 border border-white/20
                         hover:bg-white/90 transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Recomendações Personalizadas
            </h3>
            <p className="text-gray-600">
              Receba sugestões de números baseadas em suas preferências e
              configurações de peso das variáveis fuzzy.
            </p>
          </div>
        </div>

        {/* Educational Notice */}
        <div className="max-w-4xl mx-auto mt-12 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="font-semibold text-yellow-800 mb-2">⚠️ Sistema Educacional</p>
              <p className="text-sm text-yellow-700">
                Este projeto tem fins educacionais para demonstração de lógica fuzzy.
                Não garante ganhos e não deve ser usado como base para decisões financeiras.
                A Mega-Sena é um jogo de azar onde cada número tem probabilidade igual.
                Jogue com responsabilidade.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-sm border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-600">
            Desenvolvido com <span className="text-red-500">❤️</span> usando FastAPI + React |
            Powered by scikit-fuzzy
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
