import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ParametersPage from './pages/ParametersPage';
import ResultsPage from './pages/ResultsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/configurar" element={<ParametersPage />} />
        <Route path="/resultados" element={<ResultsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
