import React from 'react';
import { motion } from 'framer-motion';
import { CLIENT_INFO } from '../data';
import { fadeInUp } from '../utils/animations';

interface HeroProps {
    smoothScroll: (e: React.MouseEvent, href: string) => void;
}

const Hero: React.FC<HeroProps> = ({ smoothScroll }) => {
    return (
        <section id="home" className="relative h-[calc(100vh-4rem)] min-h-[600px] flex items-center justify-center text-center overflow-hidden">
            <div className="absolute inset-0 bg-grid-gray-200 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
            <motion.div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8" initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ staggerChildren: 0.2 }}>
                <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tighter mb-4">{CLIENT_INFO.title}</motion.h1>
                <motion.p variants={fadeInUp} className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 mb-8">From concept to reality, providing expert CAD design, 3D modeling, and manufacturing solutions tailored to your unique engineering challenges.</motion.p>
                <motion.div variants={fadeInUp} className="flex justify-center gap-4">
                    <motion.a href="#contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={(e) => smoothScroll(e, '#contact')} className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg">Get a Quote</motion.a>
                    <motion.a href="#projects" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={(e) => smoothScroll(e, '#projects')} className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg shadow-lg border border-gray-200">View My Work</motion.a>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;