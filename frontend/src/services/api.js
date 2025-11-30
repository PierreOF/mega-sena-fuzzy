import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Calculate fuzzy scores based on provided weights
 * @param {Object} pesos - Weights for each variable (0-100%)
 * @param {number} quantidadePrincipal - Number of main recommendations
 * @param {number} quantidadePool - Size of extended pool
 * @returns {Promise} API response with results
 */
export const calcularNumeros = async (pesos, quantidadePrincipal = 6, quantidadePool = 12) => {
  try {
    const response = await api.post('/api/calcular', {
      pesos,
      quantidade_principal: quantidadePrincipal,
      quantidade_pool: quantidadePool,
    });
    return response.data;
  } catch (error) {
    console.error('Error calculating numbers:', error);
    throw error;
  }
};

/**
 * Get default configuration
 * @returns {Promise} Default weights and descriptions
 */
export const getConfiguracaoPadrao = async () => {
  try {
    const response = await api.get('/api/configuracao-padrao');
    return response.data;
  } catch (error) {
    console.error('Error getting default configuration:', error);
    throw error;
  }
};

/**
 * Get historical data information
 * @returns {Promise} Information about the dataset
 */
export const getDadosHistoricos = async () => {
  try {
    const response = await api.get('/api/dados-historicos');
    return response.data;
  } catch (error) {
    console.error('Error getting historical data:', error);
    throw error;
  }
};

/**
 * Check API health
 * @returns {Promise} Health status
 */
export const checkHealth = async () => {
  try {
    const response = await api.get('/api/health');
    return response.data;
  } catch (error) {
    console.error('Error checking health:', error);
    throw error;
  }
};

export default api;
