import React from 'react';

function NumberBall({ numero, score }) {
  // Color coding based on score
  const getColor = (score) => {
    if (score >= 8) return 'bg-green-500 border-green-700';
    if (score >= 6) return 'bg-blue-500 border-blue-700';
    if (score >= 4) return 'bg-yellow-500 border-yellow-700';
    return 'bg-gray-400 border-gray-600';
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`w-16 h-16 rounded-full ${getColor(score)} border-4
                      flex items-center justify-center text-white font-bold text-xl
                      shadow-lg transform transition-transform hover:scale-110`}>
        {numero}
      </div>
      <span className="text-sm text-gray-600 mt-2 font-medium">
        {score.toFixed(2)}
      </span>
    </div>
  );
}

function StatCard({ icon, label, value, color = 'blue' }) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    green: 'bg-green-50 border-green-200 text-green-700',
    purple: 'bg-purple-50 border-purple-200 text-purple-700',
    orange: 'bg-orange-50 border-orange-200 text-orange-700',
  };

  return (
    <div className={`p-4 rounded-lg border-2 ${colorClasses[color]}`}>
      <div className="flex items-center mb-2">
        <span className="text-2xl mr-2">{icon}</span>
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}

function ResultsDisplay({ data }) {
  if (!data) return null;

  const { numeros_principais, pool_estendido, estatisticas } = data;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        🎯 Números Recomendados
      </h2>

      {/* Main Numbers */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Jogo Principal ({numeros_principais.length} números):
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 justify-items-center">
          {numeros_principais.map(item => (
            <NumberBall
              key={item.numero}
              numero={item.numero}
              score={item.score}
            />
          ))}
        </div>
      </div>

      {/* Extended Pool */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Pool Estendido ({pool_estendido.length} números):
        </h3>
        <div className="flex flex-wrap gap-2">
          {pool_estendido.map(num => (
            <span
              key={num}
              className="inline-flex items-center justify-center w-10 h-10
                       bg-gray-100 border-2 border-gray-300 rounded-full
                       font-semibold text-gray-700 hover:bg-gray-200 transition-colors"
            >
              {num}
            </span>
          ))}
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          📈 Estatísticas:
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard
            icon="➕"
            label="Soma Total"
            value={estatisticas.soma_total}
            color="blue"
          />
          <StatCard
            icon="⚖️"
            label="Números Pares"
            value={estatisticas.pares}
            color="green"
          />
          <StatCard
            icon="⚡"
            label="Números Ímpares"
            value={estatisticas.impares}
            color="purple"
          />
          <StatCard
            icon="📊"
            label="Score Médio"
            value={estatisticas.media_score.toFixed(2)}
            color="orange"
          />
        </div>
      </div>

      {/* Distribution by Tens */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          📍 Distribuição por Dezenas:
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {Object.entries(estatisticas.distribuicao_dezenas).map(([range, count]) => (
            <div
              key={range}
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg
                       border border-blue-200 text-center"
            >
              <div className="text-xs text-gray-600 mb-1">{range}</div>
              <div className="text-2xl font-bold text-blue-700">{count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 flex-wrap">
        <button
          onClick={() => {
            const nums = numeros_principais.map(n => n.numero).join(' - ');
            navigator.clipboard.writeText(nums);
            alert('Números copiados para a área de transferência!');
          }}
          className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold
                   hover:bg-green-700 transition-colors shadow hover:shadow-lg"
        >
          📋 Copiar Números
        </button>

        <button
          onClick={() => window.print()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold
                   hover:bg-blue-700 transition-colors shadow hover:shadow-lg"
        >
          🖨️ Imprimir
        </button>
      </div>
    </div>
  );
}

export default ResultsDisplay;
