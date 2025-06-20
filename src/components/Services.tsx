import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../data';
import { fadeInUp, staggerContainer } from '../utils/animations';

const Services: React.FC = () => {
    return (
        <section id="services" className="py-20 lg:py-28 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What I Offer</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">A comprehensive suite of services to bring your engineering projects to life.</p>
                </motion.div>
                <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {SERVICES.map((service) => (
                        <motion.div key={service.title} variants={fadeInUp} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-200/80">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                            <p className="text-gray-600">{service.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Services;