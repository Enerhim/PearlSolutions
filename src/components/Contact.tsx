import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { CLIENT_INFO } from '../data';
import { fadeInUp, staggerContainer } from '../utils/animations';

const Contact: React.FC = () => {
    return (
        <section id="contact" className="py-20 lg:py-28 bg-gray-900 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp} className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Get In Touch</h2>
                    <p className="mt-4 text-lg text-gray-400">Have a project in mind? I'd love to hear about it.</p>
                </motion.div>
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                     <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
                        <motion.div variants={fadeInUp} className="flex items-start space-x-4"><div className="bg-blue-600/20 p-3 rounded-full"><Mail className="w-6 h-6 text-blue-400" /></div><div><h3 className="text-xl font-semibold">Email</h3><p className="text-gray-300">Send your project details.</p><a href={`mailto:${CLIENT_INFO.email}`} className="text-blue-400 hover:text-blue-300 transition-colors">{CLIENT_INFO.email}</a></div></motion.div>
                        <motion.div variants={fadeInUp} className="flex items-start space-x-4"><div className="bg-blue-600/20 p-3 rounded-full"><Phone className="w-6 h-6 text-blue-400" /></div><div><h3 className="text-xl font-semibold">Phone</h3><p className="text-gray-300">Let's have a quick chat.</p><a href={`tel:${CLIENT_INFO.phone}`} className="text-blue-400 hover:text-blue-300 transition-colors">{CLIENT_INFO.phone}</a></div></motion.div>
                        <motion.div variants={fadeInUp} className="flex items-start space-x-4"><div className="bg-blue-600/20 p-3 rounded-full"><MapPin className="w-6 h-6 text-blue-400" /></div><div><h3 className="text-xl font-semibold">Location</h3><p className="text-gray-300">{CLIENT_INFO.location}</p><p className="text-gray-400 text-sm">Available for remote work globally.</p></div></motion.div>
                    </motion.div>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                         <form onSubmit={(e) => { e.preventDefault(); alert('Form submitted! (This is a demo)'); }} className="bg-gray-800 p-8 rounded-lg shadow-xl space-y-4 h-full">
                            <input type="text" placeholder="Your Name" required className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                            <input type="email" placeholder="Your Email" required className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                            <textarea placeholder="Your Message" rows={5} required className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"></textarea>
                            <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300">Send Message</button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;