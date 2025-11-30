import { Link } from 'react-router-dom';

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      {/* Ícone grande */}
      <div className="text-9xl mb-6 opacity-50 animate-pulse-slow">
        📊
      </div>

      {/* Título */}
      <h2 className="text-2xl font-bold text-gray-700 mb-3">
        Nenhum Resultado Disponível
      </h2>

      {/* Descrição */}
      <p className="text-gray-500 text-center mb-8 max-w-md">
        Você ainda não calculou nenhum número. Configure os parâmetros do sistema fuzzy
        para gerar suas recomendações personalizadas.
      </p>

      {/* CTA Button */}
      <Link
        to="/configurar"
        className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white
                   font-semibold rounded-xl shadow-lg
                   transform transition-all duration-300
                   hover:scale-105 hover:shadow-xl active:scale-95"
      >
        <span className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
          Configurar Parâmetros
        </span>
      </Link>
    </div>
  );
}

export default EmptyState;
