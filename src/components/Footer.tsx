import React from 'react';
import { Linkedin, Github } from 'lucide-react';
import { CLIENT_INFO } from '../data';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-gray-400 py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="flex justify-center space-x-6 mb-4">
                    <a href={CLIENT_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Linkedin className="w-6 h-6" /></a>
                    <a href={CLIENT_INFO.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Github className="w-6 h-6" /></a>
                </div>
                <p>&copy; {new Date().getFullYear()} {CLIENT_INFO.name}. All Rights Reserved.</p>
                <p className="text-xs text-gray-500 mt-2">Built with React, Three.js, and Framer Motion.</p>
            </div>
        </footer>
    );
};

export default Footer;
