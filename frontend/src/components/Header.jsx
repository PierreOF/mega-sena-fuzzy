import React from 'react';
import { Link } from 'react-router-dom';

function Header({ showWarning = true }) {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <Link to="/" className="block hover:opacity-90 transition-opacity">
          <h1 className="text-2xl font-bold mb-2">
            🎲 Sistema Fuzzy Mega-Sena
          </h1>
          <p className="text-blue-100">
            Análise Inteligente por Lógica Fuzzy
          </p>
        </Link>
      </div>

      {/* Educational Warning Banner - Only show if showWarning is true */}
      {showWarning && (
        <div className="bg-yellow-500 text-yellow-900">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-start">
              <svg
                className="w-6 h-6 mr-3 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="font-bold mb-1">
                  ⚠️ AVISO EDUCACIONAL IMPORTANTE
                </p>
                <p className="text-sm">
                  Este sistema é EXCLUSIVAMENTE para fins educacionais e demonstração de lógica fuzzy.
                  NÃO aumenta as chances de ganhar na loteria. NÃO deve ser usado como base para
                  decisões financeiras. A Mega-Sena é um jogo de azar onde cada número tem a mesma
                  probabilidade de ser sorteado. Jogue com responsabilidade.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
