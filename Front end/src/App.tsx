import { Routes, Route } from 'react-router-dom';
import HomePage from './adapters/pages/HomePage';
import PropertyDetailsPage from './adapters/pages/PropertyDetailsPage';
import { Box } from '@mui/material';
import Sidebar from './adapters/components/organisms/Sidebar';
import Footer from './adapters/components/organisms/Footer';

export default function App() {
  return (
    <>
      <Sidebar/>
      <Box>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/property/:id" element={<PropertyDetailsPage />} />
        </Routes>
      </Box>
      <Footer />
    </>
  );
}
