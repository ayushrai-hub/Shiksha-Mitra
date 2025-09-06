import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import ConceptOverview from './components/ConceptOverview';
import Benefits from './components/Benefits';
import HowItWorks from './components/HowItWorks';
import Activities from './components/Activities';
import Tools from './components/Tools';
import Compassion from './components/Compassion';
import FindMitra from './components/FindMitra';
import Footer from './components/Footer';
import FeatureShowcase from './features/FeatureShowcase';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import FindMitraPage from './pages/FindMitra';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <ConceptOverview />
                <Benefits />
                <HowItWorks />
                <Activities />
                <Tools />
                <FeatureShowcase />
                <Compassion />
                <FindMitra />
              </>
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/find-mitra" element={<FindMitraPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;