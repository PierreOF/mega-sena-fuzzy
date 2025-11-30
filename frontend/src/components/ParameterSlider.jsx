import React from 'react';

function ParameterSlider({ name, label, icon, value, onChange, description }) {
  const handleChange = (e) => {
    onChange(name, parseInt(e.target.value));
  };

  // Determine importance level based on value
  const getImportanceLabel = (val) => {
    if (val >= 70) return 'Alta';
    if (val >= 40) return 'Média';
    return 'Baixa';
  };

  const getImportanceColor = (val) => {
    if (val >= 70) return 'text-green-600';
    if (val >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="font-semibold text-gray-700 flex items-center">
          <span className="text-2xl mr-2">{icon}</span>
          <span>{label}</span>
        </label>
        <div className="flex items-center space-x-3">
          <span className={`text-sm font-medium ${getImportanceColor(value)}`}>
            Importância: {getImportanceLabel(value)}
          </span>
          <span className="text-blue-600 font-bold text-lg min-w-[4rem] text-right">
            {value}%
          </span>
        </div>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        step="5"
        value={value}
        onChange={handleChange}
        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer
                   slider-thumb:appearance-none slider-thumb:w-6 slider-thumb:h-6
                   slider-thumb:rounded-full slider-thumb:bg-blue-600
                   slider-thumb:cursor-pointer hover:bg-gray-300 transition-colors"
        style={{
          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${value}%, #e5e7eb ${value}%, #e5e7eb 100%)`
        }}
      />

      <p className="text-sm text-gray-600 mt-2 italic">
        {description}
      </p>
    </div>
  );
}

export default ParameterSlider;
