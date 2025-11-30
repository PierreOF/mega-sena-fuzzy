import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';
import ResultsDisplay from '../components/ResultsDisplay';
import ChartsPanel from '../components/ChartsPanel';
import EmptyState from '../components/EmptyState';

function ResultsPage() {
  const navigate = useNavigate();
  const { results, clearResults } = useAppContext();

  const handleNewAnalysis = () => {
    clearResults();
    navigate('/');
  };

  const handleAdjustParameters = () => {
    navigate('/configurar');
  };

  // Se não há resultados, exibe EmptyState
  if (!results) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header showWarning={false} />
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <EmptyState />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showWarning={false} />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Title */}
        <div className="mb-8 animate-fadeInUp">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🎯 Resultados da Análise
          </h1>
          <p className="text-gray-600">
            Números recomendados baseados nos parâmetros fuzzy configurados
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8 animate-fadeInUp animation-delay-200">
          <button
            onClick={handleAdjustParameters}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold
                       rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg
                       transform transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            Ajustar Parâmetros
          </button>

          <button
            onClick={handleNewAnalysis}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold
                       rounded-lg shadow-md hover:bg-purple-700 hover:shadow-lg
                       transform transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            Nova Análise
          </button>
        </div>

        {/* Results Display */}
        <div className="animate-fadeInUp animation-delay-400">
          <ResultsDisplay data={results} />
        </div>

        {/* Charts Panel */}
        <div className="mt-8 animate-fadeInUp animation-delay-600">
          <ChartsPanel data={results} />
        </div>

        {/* Back to Home */}
        <div className="mt-12 text-center animate-fadeInUp animation-delay-800">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            ← Voltar ao Início
          </button>
        </div>
      </main>
    </div>
  );
}

export default ResultsPage;
