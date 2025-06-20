import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

interface BackToTopButtonProps {
    show: boolean;
    onClick: () => void;
}

const BackToTopButton: React.FC<BackToTopButtonProps> = ({ show, onClick }) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.button 
                    initial={{ opacity: 0, scale: 0.5 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0, scale: 0.5 }} 
                    onClick={onClick} 
                    className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 z-20"
                >
                    <ArrowUp className="w-6 h-6" />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default BackToTopButton;