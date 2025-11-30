import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';
import ParametersPanel from '../components/ParametersPanel';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import { calcularNumeros } from '../services/api';

function ParametersPage() {
  const navigate = useNavigate();
  const { parameters, loading, error, setLoading, setError, setResults } = useAppContext();

  const handleCalculate = async (pesos) => {
    setLoading(true);
    setError(null);

    try {
      const response = await calcularNumeros(pesos, 6, 12);

      if (response.success) {
        setResults(response.data);
        // Navega para a página de resultados
        navigate('/resultados');
      } else {
        setError(response.error || 'Erro desconhecido ao calcular números');
      }
    } catch (err) {
      console.error('Erro na API:', err);
      setError(
        err.response?.data?.error ||
        err.message ||
        'Erro ao conectar com o servidor. Verifique se o backend está rodando.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showWarning={false} />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6
                     transition-colors group"
        >
          <svg
            className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Voltar</span>
        </button>

        {/* Error Alert */}
        {error && (
          <ErrorAlert
            message={error}
            onClose={() => setError(null)}
          />
        )}

        {/* Loading State */}
        {loading ? (
          <LoadingSpinner message="Calculando números com lógica fuzzy..." />
        ) : (
          /* Parameters Panel */
          <ParametersPanel
            onCalculate={handleCalculate}
            loading={loading}
          />
        )}
      </main>
    </div>
  );
}

export default ParametersPage;
