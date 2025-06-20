import React, { useState, useEffect, useCallback } from 'react';

// Hooks
import { useScrollspy } from './hooks/useScrollspy';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Stats from './components/Stats';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';
import ProjectModal from './components/ProjectModal';
import SectionDivider from './components/SectionDivider';

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
      const element = document.querySelector(href);
      if (element) {
        const headerOffset = 64; // Height of the fixed header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
      }
      setIsMenuOpen(false);
  };
  
  return (
    <div className="bg-gray-100 text-gray-800 font-sans antialiased">
       
        <Header 
            isScrolled={isScrolled}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            activeSection={activeSection}
            smoothScroll={smoothScroll}
        />
        
        <main>
            <Hero smoothScroll={smoothScroll} />
            <SectionDivider />
            <Services />
            <SectionDivider />
            <Stats />
            <SectionDivider />
            <Projects onProjectSelect={setSelectedProject} />
            <SectionDivider />
            <About smoothScroll={smoothScroll} />
        </main>
        
        <Contact />
        <Footer />
                
        <BackToTopButton show={showBackToTop} onClick={scrollToTop} />

        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    
        <style>{`
            .bg-grid-gray-200 { 
                background-image: 
                    linear-gradient(to right, #d1d5db 1px, transparent 1px), 
                    linear-gradient(to bottom, #d1d5db 1px, transparent 1px); 
                background-size: 3rem 3rem; 
            }
            main > section {
                padding-top: 4rem;
                padding-bottom: 4rem;
            }
            @media (min-width: 1024px) {
                main > section {
                    padding-top: 7rem;
                    padding-bottom: 7rem;
                }
            }
            #home {
                padding-top: 0;
                padding-bottom: 0;
            }
            #contact {
                padding-top: 5rem;
                padding-bottom: 5rem;
            }
            @media (min-width: 1024px) {
                #contact {
                    padding-top: 7rem;
                    padding-bottom: 7rem;
                }
            }
        `}</style>
    </div>
  );
};

export default App;