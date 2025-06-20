import React from 'react';
import { motion } from 'framer-motion';

const SectionDivider: React.FC = () => {
  return (
    <motion.div
      className="relative w-full h-20 my-10 md:my-16 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="absolute inset-0 bg-grid-gray-300 [mask-image:linear-gradient(to_bottom,transparent,white_20%,white_80%,transparent)]"></div>
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        <path 
          d="M0 50 Q 25 20, 50 50 T 100 50" 
          stroke="#d1d5db" 
          strokeWidth="0.2"
          fill="none" 
        />
        <path 
          d="M0 50 Q 25 80, 50 50 T 100 50" 
          stroke="#d1d5db" 
          strokeWidth="0.2"
          fill="none" 
        />
      </svg>
    </motion.div>
  );
};

export default SectionDivider;
