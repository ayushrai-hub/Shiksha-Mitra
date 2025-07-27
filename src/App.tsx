import React from 'react';
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

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <ConceptOverview />
      <Benefits />
      <HowItWorks />
      <Activities />
      <Tools />
      <Compassion />
      <FindMitra />
      <Footer />
    </div>
  );
}

export default App;