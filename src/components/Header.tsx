import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { CLIENT_INFO, NAV_LINKS } from '../data';

interface HeaderProps {
    isScrolled: boolean;
    isMenuOpen: boolean;
    setIsMenuOpen: (isOpen: boolean) => void;
    activeSection: string;
    smoothScroll: (e: React.MouseEvent, href: string) => void;
}

const Header: React.FC<HeaderProps> = ({ isScrolled, isMenuOpen, setIsMenuOpen, activeSection, smoothScroll }) => {
    return (
        <header className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-white/80 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <a href="#home" onClick={(e) => smoothScroll(e, '#home')} className="flex items-center">
                        <img src={CLIENT_INFO.logoUrl} alt={`${CLIENT_INFO.name} Logo`} className="h-8 w-auto" />
                    </a>
                    <nav className="hidden md:flex items-center space-x-1">
                        {NAV_LINKS.map((link) => (
                            <motion.a 
                                key={link.href} 
                                href={link.href} 
                                onClick={(e) => smoothScroll(e, link.href)} 
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 relative ${activeSection !== link.href && 'hover:bg-gray-200 hover:text-gray-900 text-gray-600'}`}
                            >
                                {activeSection === link.href && <motion.div layoutId="active-nav-link" className="absolute inset-0 bg-blue-600 rounded-md z-0" />}
                                <span className="relative z-10" style={{ color: activeSection === link.href ? 'white' : 'inherit' }}>{link.label}</span>
                            </motion.a>
                        ))}
                    </nav>
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {isMenuOpen && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white/95 backdrop-blur-sm overflow-hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {NAV_LINKS.map((link) => (
                            <a 
                                key={link.href} 
                                href={link.href} 
                                onClick={(e) => smoothScroll(e, link.href)} 
                                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${activeSection === link.href ? 'text-white bg-blue-600' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'}`}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;

