import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Parâmetros do sistema fuzzy (pesos)
  const [parameters, setParameters] = useState({
    frequencia_historica: 50,
    tempo_ausencia: 50,
    distribuicao_posicional: 50,
    equilibrio_par_impar: 50,
    tendencia_soma: 50,
  });

  // Resultados do cálculo
  const [results, setResults] = useState(null);

  // Estados de loading e erro
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Função para atualizar parâmetros individuais
  const updateParameter = (key, value) => {
    setParameters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Função para atualizar todos os parâmetros de uma vez
  const updateParameters = (newParams) => {
    setParameters(newParams);
  };

  // Função para limpar resultados (Nova Análise)
  const clearResults = () => {
    setResults(null);
    setError(null);
  };

  // Função para resetar tudo
  const reset = () => {
    setParameters({
      frequencia_historica: 50,
      tempo_ausencia: 50,
      distribuicao_posicional: 50,
      equilibrio_par_impar: 50,
      tendencia_soma: 50,
    });
    setResults(null);
    setError(null);
    setLoading(false);
  };

  const value = {
    // Estado
    parameters,
    results,
    loading,
    error,

    // Setters
    setParameters,
    setResults,
    setLoading,
    setError,

    // Helpers
    updateParameter,
    updateParameters,
    clearResults,
    reset,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// Hook customizado para usar o contexto
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
