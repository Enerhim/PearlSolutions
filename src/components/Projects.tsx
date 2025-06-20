import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { fadeInUp, staggerContainer } from '../utils/animations';

interface ProjectsProps {
    onProjectSelect: (project: Project) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onProjectSelect }) => {
    return (
        <section id="projects" className="py-20 lg:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp} className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">My Projects</h2>
                    <p className="mt-4 text-lg text-gray-600">A selection of my recent work. Click to view the interactive 3D model.</p>
                </motion.div>
                <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PROJECTS.map((project) => (
                        <motion.div 
                            key={project.title} 
                            variants={fadeInUp} 
                            whileHover={{ y: -5 }} 
                            className="group relative block bg-black rounded-lg overflow-hidden shadow-lg cursor-pointer" 
                            onClick={() => onProjectSelect(project)}
                        >
                            <img src={project.imageUrl} alt={project.title} className="w-full h-64 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-6">
                                <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                                <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-xs">{project.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;