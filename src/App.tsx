import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import Prestations from './components/Prestations';
import Process from './components/Process';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import EmailTemplates from './components/EmailTemplates';

function App() {
  const [showEmails, setShowEmails] = useState(false);

  useEffect(() => {
    const checkHash = () => {
      setShowEmails(window.location.hash === '#emails');
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  // Page cachée des templates d'emails
  if (showEmails) {
    return <EmailTemplates />;
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
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
