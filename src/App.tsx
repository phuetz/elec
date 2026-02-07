import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import Prestations from './components/Prestations';
import Process from './components/Process';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Professionals from './components/Professionals';
import Contact from './components/Contact';
import Footer from './components/Footer';
import EmailTemplates from './components/EmailTemplates';
import ArchitectesProspection from './components/ArchitectesProspection';
import AnnuaireArchitectes from './components/AnnuaireArchitectes';

function App() {
  const [showEmails, setShowEmails] = useState(false);
  const [showArchitectes, setShowArchitectes] = useState(false);
  const [showAnnuaire, setShowAnnuaire] = useState(false);

  useEffect(() => {
    const checkHash = () => {
      setShowEmails(window.location.hash === '#emails');
      setShowArchitectes(window.location.hash === '#architectes');
      setShowAnnuaire(window.location.hash === '#annuaire');
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  // Pages cachées
  if (showEmails) {
    return <EmailTemplates />;
  }
  if (showArchitectes) {
    return <ArchitectesProspection />;
  }
  if (showAnnuaire) {
    return <AnnuaireArchitectes />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div id="accueil">
        <Hero />
      </div>
      <Services />
      <Prestations />
      <Process />
      <Projects />
      <Testimonials />
      <About />
      <Professionals />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
