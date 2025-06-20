import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/animations';

interface AboutProps {
    smoothScroll: (e: React.MouseEvent, href: string) => void;
}

const About: React.FC<AboutProps> = ({ smoothScroll }) => {
    return (
        <section id="about" className="py-20 lg:py-28 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
               <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
                   <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="md:col-span-2">
                       <img src="https://placehold.co/500x500/e2e8f0/334155?text=Client+Photo" alt="Freelancer" className="rounded-lg shadow-2xl w-full" />
                   </motion.div>
                   <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="md:col-span-3">
                       <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Me</motion.h2>
                       <motion.p variants={fadeInUp} className="text-lg text-gray-600 mb-4">I am a passionate and dedicated mechanical design engineer with a strong expertise in transforming innovative concepts into functional, manufacturable products. My approach merges creative problem-solving with technical precision.</motion.p>
                       <motion.p variants={fadeInUp} className="text-lg text-gray-600 mb-6">My expertise lies in new product development, from the initial sketch to a fully realized product. I leverage a trusted network of precision manufacturing partners to provide end-to-end design and production services, ensuring quality and efficiency at every stage.</motion.p>
                       <motion.div variants={fadeInUp}>
                           <motion.a href="#contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={(e) => smoothScroll(e, '#contact')} className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md">Let's Work Together</motion.a>
                       </motion.div>
                   </motion.div>
               </div>
           </div>
       </section>
    );
};

export default About;
