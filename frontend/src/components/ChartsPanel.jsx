import React from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function ChartsPanel({ data }) {
  if (!data) return null;

  const { dados_graficos } = data;

  // Prepare data for score distribution pie chart
  const scoreDistributionData = [
    { name: 'Muito Baixo (0-2)', value: dados_graficos.distribuicao_scores.muito_baixo, color: '#ef4444' },
    { name: 'Baixo (2-4)', value: dados_graficos.distribuicao_scores.baixo, color: '#f97316' },
    { name: 'Médio (4-6)', value: dados_graficos.distribuicao_scores.medio, color: '#eab308' },
    { name: 'Médio-Alto (6-8)', value: dados_graficos.distribuicao_scores.medio_alto, color: '#3b82f6' },
    { name: 'Alto (8-10)', value: dados_graficos.distribuicao_scores.alto, color: '#22c55e' },
  ];

  // Top 20 numbers for bar chart
  const top20Numbers = dados_graficos.todos_scores.slice(0, 20);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border-2 border-gray-300 rounded shadow-lg">
          <p className="font-semibold">Número: {payload[0].payload.numero}</p>
          <p className="text-blue-600">Score: {payload[0].value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        📈 Análise Visual
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart - Top 20 Scores */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-700 text-center">
            Top 20 Números por Score
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={top20Numbers}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="numero"
                tick={{ fontSize: 12 }}
                label={{ value: 'Número', position: 'insideBottom', offset: -5 }}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                label={{ value: 'Score Fuzzy', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="score" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Score Distribution */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-700 text-center">
            Distribuição de Scores
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={scoreDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value, percent }) =>
                  value > 0 ? `${value} (${(percent * 100).toFixed(0)}%)` : ''
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {scoreDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* All Numbers Score Visualization */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-700 text-center">
          Scores de Todos os Números (1-60)
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={dados_graficos.todos_scores}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="numero"
              tick={{ fontSize: 10 }}
              interval={4}
              label={{ value: 'Número', position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              label={{ value: 'Score', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="score" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-700 mb-2">Interpretação:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• <span className="text-green-600 font-semibold">Alto (8-10):</span> Números com características muito favoráveis segundo as regras fuzzy</li>
          <li>• <span className="text-blue-600 font-semibold">Médio-Alto (6-8):</span> Números com boas características estatísticas</li>
          <li>• <span className="text-yellow-600 font-semibold">Médio (4-6):</span> Números com características balanceadas</li>
          <li>• <span className="text-orange-600 font-semibold">Baixo (2-4):</span> Números com características menos favoráveis</li>
          <li>• <span className="text-red-600 font-semibold">Muito Baixo (0-2):</span> Números com características desfavoráveis</li>
        </ul>
      </div>
    </div>
  );
}

export default ChartsPanel;
