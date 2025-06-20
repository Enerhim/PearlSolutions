import React, { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { Users, CheckSquare, Award, Star } from 'lucide-react';
// FIX: Corrected import paths to be relative for proper module resolution.
import { STATS, TESTIMONIALS } from '../data';
import { fadeInUp, staggerContainer } from '../utils/animations';

// Animated Number Sub-component
// This component displays a number that animates from 0 to the target value when it scrolls into view.
const AnimatedNumber: React.FC<{ value: number }> = ({ value }) => {
  const ref = useRef<HTMLSpanElement>(null);
  // useInView hook tracks when the component is visible in the viewport.
  const isInView = useInView(ref, { once: true });
  
  // useSpring creates a motion value that animates with a spring effect.
  const spring = useSpring(0, { mass: 0.8, stiffness: 100, damping: 25 });
  // useTransform creates a new motion value by mapping the output of another.
  // Here, it rounds the number and adds commas for thousands.
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString());

  useEffect(() => {
    // When the component is in view, start the animation.
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  // FIX: Using <motion.span> to render the animated 'display' value.
  // A regular 'span' cannot render Framer Motion's motion value objects directly, which caused the previous runtime error.
  return <motion.span ref={ref}>{display}</motion.span>;
};


// Main Stats Component
// This section showcases company statistics and client testimonials.
const Stats: React.FC = () => {
    return (
        <section id="stats" className="py-20 lg:py-28 bg-white overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
                    variants={staggerContainer}
                    className="text-center"
                >
                    <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900">Proven Results & Trusted Partnerships</motion.h2>
                    <motion.p variants={fadeInUp} className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Delivering excellence and building lasting relationships through precision engineering.
                    </motion.p>
                </motion.div>

                {/* Animated Stats Grid */}
                <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
                    variants={staggerContainer}
                    className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
                >
                    <motion.div variants={fadeInUp} className="bg-gray-50 p-8 rounded-xl shadow-lg border border-gray-200/80">
                        <Users className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                        <h3 className="text-5xl font-extrabold text-gray-900 tracking-tighter">
                            <AnimatedNumber value={STATS.clientsServed} />+
                        </h3>
                        <p className="text-gray-500 mt-2 font-medium">Happy Clients Served</p>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="bg-gray-50 p-8 rounded-xl shadow-lg border border-gray-200/80">
                        <CheckSquare className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                        <h3 className="text-5xl font-extrabold text-gray-900 tracking-tighter">
                             <AnimatedNumber value={STATS.projectsCompleted} />+
                        </h3>
                        <p className="text-gray-500 mt-2 font-medium">Projects Completed</p>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="bg-gray-50 p-8 rounded-xl shadow-lg border border-gray-200/80">
                        <Award className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                        <h3 className="text-5xl font-extrabold text-gray-900 tracking-tighter">
                            <AnimatedNumber value={STATS.yearsOfExperience} />
                        </h3>
                        <p className="text-gray-500 mt-2 font-medium">Years of Experience</p>
                    </motion.div>
                </motion.div>

                {/* Testimonials */}
                <motion.div 
                    initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
                    variants={staggerContainer}
                    className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                    {TESTIMONIALS.map((testimonial, index) => (
                        <motion.div 
                            key={index} 
                            variants={fadeInUp}
                            className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200/80"
                        >
                            <div className="flex text-yellow-400 mb-4">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                            </div>
                            <blockquote className="text-gray-600 italic mb-4">"{testimonial.quote}"</blockquote>
                            <footer className="text-right">
                                <p className="font-bold text-gray-800">{testimonial.name}</p>
                                <p className="text-sm text-gray-500">{testimonial.company}</p>
                            </footer>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Stats;
