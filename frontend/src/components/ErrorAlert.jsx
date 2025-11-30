function ErrorAlert({ message, onClose }) {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6 rounded-lg shadow-md animate-fadeInUp">
      <div className="flex items-start">
        {/* Ícone de erro */}
        <svg
          className="w-7 h-7 text-red-500 mr-4 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>

        {/* Conteúdo */}
        <div className="flex-1">
          <h3 className="text-red-800 font-bold text-lg mb-1">Erro no Cálculo</h3>
          <p className="text-red-700 text-sm leading-relaxed">{message}</p>
        </div>

        {/* Botão de fechar */}
        {onClose && (
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 transition-colors ml-4 flex-shrink-0"
            aria-label="Fechar"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorAlert;
