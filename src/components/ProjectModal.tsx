import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Project } from '../types';
import ThreeModelViewer from './ThreeModelViewer';

interface ProjectModalProps {
    project: Project | null;
    onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
    return (
        <AnimatePresence>
            {project && (
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }} 
                    className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" 
                    onClick={onClose}
                >
                    <motion.div 
                        initial={{ scale: 0.9, y: 50 }} 
                        animate={{ scale: 1, y: 0 }} 
                        exit={{ scale: 0.9, y: 50 }} 
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }} 
                        className="relative bg-gray-900 rounded-lg shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden" 
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex-grow h-4/5">
                            <ThreeModelViewer stlUrl={project.stlUrl} />
                        </div>
                        <div className="flex-shrink-0 p-6 bg-gray-800 text-white border-t border-gray-700">
                            <h3 className="text-xl font-bold">{project.title}</h3>
                            <p className="text-gray-300 mt-2">{project.description}</p>
                        </div>
                        <button onClick={onClose} className="absolute top-4 right-4 bg-white/20 text-white rounded-full p-2 hover:bg-white/30 transition z-50">
                            <X className="w-6 h-6" />
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProjectModal;