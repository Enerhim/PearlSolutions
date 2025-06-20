import React, { useState, useEffect, useCallback } from 'react';

// Hooks
import { useScrollspy } from './hooks/useScrollspy';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';
import ProjectModal from './components/ProjectModal';

// Data & Types
import { NAV_LINKS } from './data';
import { Project } from './types';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const navIds = NAV_LINKS.map(l => l.href);
  const activeSection = useScrollspy(navIds, { rootMargin: '-30% 0px -70% 0px' });

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10);
    setShowBackToTop(window.scrollY > 500);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : 'auto';
  }, [selectedProject]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const smoothScroll = (e: React.MouseEvent, href: string) => {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
  };
  
  return (
    <div className="bg-gray-50 text-gray-800 font-sans antialiased">
       
        <Header 
            isScrolled={isScrolled}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            activeSection={activeSection}
            smoothScroll={smoothScroll}
        />
        
        <main className="pt-16">
            <Hero smoothScroll={smoothScroll} />
            <Services />
            <Projects onProjectSelect={setSelectedProject} />
            <About smoothScroll={smoothScroll} />
            <Contact />
        </main>
        
        <Footer />
                
        <BackToTopButton show={showBackToTop} onClick={scrollToTop} />

        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    
        <style>{`.bg-grid-gray-200 { background-image: linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px); background-size: 2rem 2rem; }`}</style>
    </div>
  );
};

export default App;