import React, { useState, useEffect } from 'react';
import ParameterSlider from './ParameterSlider';
import { getConfiguracaoPadrao } from '../services/api';
import { useAppContext } from '../context/AppContext';

function ParametersPanel({ onCalculate, loading }) {
  const { parameters: contextParams, updateParameter } = useAppContext();
  const [pesos, setPesos] = useState(contextParams);

  const [descriptions, setDescriptions] = useState({});

  // Load default configuration on mount
  useEffect(() => {
    loadDefaultConfig();
  }, []);

  const loadDefaultConfig = async () => {
    try {
      const config = await getConfiguracaoPadrao();
      setPesos(config.pesos_padrao);
      setDescriptions(config.descricoes);
    } catch (error) {
      console.error('Error loading default config:', error);
    }
  };

  const handleSliderChange = (name, value) => {
    setPesos(prev => ({ ...prev, [name]: value }));
    updateParameter(name, value);
  };

  const handleCalculate = () => {
    onCalculate(pesos);
  };

  const handleReset = () => {
    setPesos({
      frequencia_historica: 50,
      tempo_ausencia: 50,
      distribuicao_posicional: 50,
      equilibrio_par_impar: 50,
      tendencia_soma: 50
    });
  };

  const parameters = [
    {
      name: 'frequencia_historica',
      label: 'Frequência Histórica',
      icon: '📊',
      description: descriptions.frequencia_historica || 'Peso da frequência de aparição'
    },
    {
      name: 'tempo_ausencia',
      label: 'Tempo de Ausência',
      icon: '📅',
      description: descriptions.tempo_ausencia || 'Tempo desde a última aparição'
    },
    {
      name: 'distribuicao_posicional',
      label: 'Distribuição Posicional',
      icon: '📍',
      description: descriptions.distribuicao_posicional || 'Uniformidade nas posições'
    },
    {
      name: 'equilibrio_par_impar',
      label: 'Equilíbrio Par/Ímpar',
      icon: '⚖️',
      description: descriptions.equilibrio_par_impar || 'Balanceamento entre pares e ímpares'
    },
    {
      name: 'tendencia_soma',
      label: 'Tendência da Soma',
      icon: '➕',
      description: descriptions.tendencia_soma || 'Alinhamento com tendência de soma'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Configure os Parâmetros
      </h2>

      <p className="text-sm text-gray-600 mb-6 bg-blue-50 p-4 rounded border-l-4 border-blue-500">
        💡 <strong>Dica:</strong> Ajuste os pesos de 0-100% para controlar a importância de cada
        variável no cálculo fuzzy. Valores mais altos dão maior peso à variável correspondente.
      </p>

      {parameters.map(param => (
        <ParameterSlider
          key={param.name}
          name={param.name}
          label={param.label}
          icon={param.icon}
          value={pesos[param.name]}
          onChange={handleSliderChange}
          description={param.description}
        />
      ))}

      <div className="mt-8 flex gap-4 flex-wrap">
        <button
          onClick={handleCalculate}
          disabled={loading}
          className={`flex-1 min-w-[200px] px-6 py-3 rounded-lg font-semibold text-white
                     transition-all duration-200 transform hover:scale-105
                     ${loading
                       ? 'bg-gray-400 cursor-not-allowed'
                       : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'}`}
        >
          {loading ? (
            <>
              <svg className="animate-spin inline-block w-5 h-5 mr-2" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              ⏳ Calculando...
            </>
          ) : (
            <>
              ✨ Gerar Resultados
              <svg className="inline-block w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </>
          )}
        </button>

        <button
          onClick={handleReset}
          disabled={loading}
          className="flex-1 min-w-[200px] px-6 py-3 rounded-lg font-semibold text-gray-700 bg-gray-200
                     hover:bg-gray-300 transition-colors duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ⚙️ Restaurar Padrão
        </button>
      </div>
    </div>
  );
}

export default ParametersPanel;
