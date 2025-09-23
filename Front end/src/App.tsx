import { Routes, Route } from 'react-router-dom';
import HomePage from './adapters/pages/HomeAPge';
import PropertyDetailsPage from './adapters/pages/PropertyDetailsPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/property/:id" element={<PropertyDetailsPage />} />
    </Routes>
  );
}
