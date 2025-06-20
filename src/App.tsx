import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Menu, X, ArrowUp, ChevronsRight, Loader } from 'lucide-react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { CLIENT_INFO, NAV_LINKS, SERVICES, PROJECTS } from './data';
import { Project } from './types';

// --- 3D MODEL VIEWER COMPONENT ---
const ThreeModelViewer: React.FC<{ stlUrl: string }> = ({ stlUrl }) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        const currentMount = mountRef.current;
        let animationFrameId: number;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x111827);

        const camera = new THREE.PerspectiveCamera(50, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        currentMount.appendChild(renderer.domElement);
        
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 20, 15);
        scene.add(directionalLight);

        const loader = new STLLoader();
        loader.load(
            stlUrl,
            (geometry) => {
                const material = new THREE.MeshStandardMaterial({ color: 0xc4c4c4, metalness: 0.2, roughness: 0.6 });
                const mesh = new THREE.Mesh(geometry, material);

                geometry.computeBoundingBox();
                const box = geometry.boundingBox!;
                const center = new THREE.Vector3();
                box.getCenter(center);
                const size = new THREE.Vector3();
                box.getSize(size);

                mesh.position.sub(center);
                scene.add(mesh);

                const maxDim = Math.max(size.x, size.y, size.z);
                const fov = camera.fov * (Math.PI / 180);
                let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
                cameraZ *= 1.5; // zoom out a bit
                camera.position.z = cameraZ;
                
                controls.update();
                setLoading(false);
            },
            undefined,
            (err) => {
                console.error('An error happened while loading STL', err);
                setError('Failed to load the 3D model. Check the URL and CORS policy.');
                setLoading(false);
            }
        );

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            if (!currentMount) return;
            camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            renderer.dispose();
            if (currentMount && renderer.domElement) {
                // Check if the domElement is still a child before removing
                if (currentMount.contains(renderer.domElement)) {
                    currentMount.removeChild(renderer.domElement);
                }
            }
        };

    }, [stlUrl]);

    return (
        <div ref={mountRef} className="w-full h-full relative cursor-grab active:cursor-grabbing">
            <AnimatePresence>
            {loading && (
                <motion.div initial={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 flex items-center justify-center text-white bg-gray-900/80">
                    <Loader className="w-12 h-12 animate-spin" />
                </motion.div>
            )}
            </AnimatePresence>
            {error && (
                <div className="absolute inset-0 flex items-center justify-center text-white bg-red-900/90 p-4 text-center">
                    <p><span className="font-bold">Error:</span> {error}</p>
                </div>
            )}
        </div>
    );
};

// --- FRAMER MOTION VARIANTS ---
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

// --- MAIN APP COMPONENT ---
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const activeSection = useScrollspy(NAV_LINKS.map(l => l.href), { rootMargin: '-30% 0px -70% 0px' });

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10);
    setShowBackToTop(window.scrollY > 500);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const smoothScroll = (e: React.MouseEvent, href: string) => {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : 'auto';
  }, [selectedProject]);
  
  return (
    <div className="bg-gray-50 text-gray-800 font-sans antialiased">
       
        {/* HEADER */}
        <header className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-white/80 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <a href="#home" onClick={(e) => smoothScroll(e, '#home')} className="flex items-center space-x-2 text-xl font-bold text-gray-900">
                        <ChevronsRight className="w-7 h-7 text-blue-600" />
                        <span>{CLIENT_INFO.name}</span>
                    </a>
                    <nav className="hidden md:flex items-center space-x-1">
                        {NAV_LINKS.map((link) => (
                            <motion.a key={link.href} href={link.href} onClick={(e) => smoothScroll(e, link.href)} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 relative ${activeSection !== link.href && 'hover:bg-gray-200 hover:text-gray-900 text-gray-600'}`}>
                                {activeSection === link.href && <motion.div layoutId="active-nav-link" className="absolute inset-0 bg-blue-600 rounded-md z-0" />}
                                <span className="relative z-10" style={{ color: activeSection === link.href ? 'white' : 'inherit' }}>{link.label}</span>
                            </motion.a>
                        ))}
                    </nav>
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {isMenuOpen && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white/95 backdrop-blur-sm overflow-hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {NAV_LINKS.map((link) => (<a key={link.href} href={link.href} onClick={(e) => smoothScroll(e, link.href)} className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${activeSection === link.href ? 'text-white bg-blue-600' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'}`}>{link.label}</a>))}
                    </div>
                </motion.div>
                )}
            </AnimatePresence>
        </header>

        
        <main className="pt-16">
            {/* HERO SECTION */}
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
            
            {/* SERVICS SECTION */}
            <section id="services" className="py-20 lg:py-28 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What I Offer</h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">A comprehensive suite of services to bring your engineering projects to life.</p>
                    </motion.div>
                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {SERVICES.map((service) => (<motion.div key={service.title} variants={fadeInUp} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-200/80"><h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3><p className="text-gray-600">{service.description}</p></motion.div>))}
                    </motion.div>
                </div>
            </section>

            {/* PROJECTS SECTION */}
            <section id="projects" className="py-20 lg:py-28">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp} className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">My Projects</h2>
                        <p className="mt-4 text-lg text-gray-600">A selection of my recent work. Click to view the interactive 3D model.</p>
                    </motion.div>
                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {PROJECTS.map((project) => (<motion.div key={project.title} variants={fadeInUp} whileHover={{ y: -5 }} className="group relative block bg-black rounded-lg overflow-hidden shadow-lg cursor-pointer" onClick={() => setSelectedProject(project)}><img src={project.imageUrl} alt={project.title} className="w-full h-64 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div><div className="absolute bottom-0 left-0 p-6"><h3 className="text-xl font-bold text-white mb-1">{project.title}</h3><p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-xs">{project.description}</p></div></motion.div>))}
                    </motion.div>
                </div>
            </section>

            {/* ABOUT SECTION */}
            <section id="about" className="py-20 lg:py-28 bg-white">
                 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="md:col-span-2"><img src="https://placehold.co/500x500/e2e8f0/334155?text=Client+Photo" alt="Freelancer" className="rounded-lg shadow-2xl w-full" /></motion.div>
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="md:col-span-3">
                            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Me</motion.h2>
                            <motion.p variants={fadeInUp} className="text-lg text-gray-600 mb-4">I am a passionate and dedicated mechanical design engineer with a strong expertise in transforming innovative concepts into functional, manufacturable products. My approach merges creative problem-solving with technical precision.</motion.p>
                            <motion.p variants={fadeInUp} className="text-lg text-gray-600 mb-6">My expertise lies in new product development, from the initial sketch to a fully realized product. I leverage a trusted network of precision manufacturing partners to provide end-to-end design and production services, ensuring quality and efficiency at every stage.</motion.p>
                            <motion.div variants={fadeInUp}><motion.a href="#contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={(e) => smoothScroll(e, '#contact')} className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md">Let's Work Together</motion.a></motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CONTACT SECTION */}
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
        </main>
        
        {/* FOOTER */}
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
                
        <AnimatePresence>
            {showBackToTop && (<motion.button initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} onClick={scrollToTop} className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 z-20"><ArrowUp className="w-6 h-6" /></motion.button>)}
        </AnimatePresence>

        <AnimatePresence>
            {selectedProject && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedProject(null)}>
                <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="relative bg-gray-900 rounded-lg shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
                    <div className="flex-grow h-4/5"><ThreeModelViewer stlUrl={selectedProject.stlUrl} /></div>
                    <div className="flex-shrink-0 p-6 bg-gray-800 text-white border-t border-gray-700"><h3 className="text-xl font-bold">{selectedProject.title}</h3><p className="text-gray-300 mt-2">{selectedProject.description}</p></div>
                    <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 bg-white/20 text-white rounded-full p-2 hover:bg-white/30 transition z-50"><X className="w-6 h-6" /></button>
                </motion.div>
            </motion.div>
            )}
        </AnimatePresence>
    
        <style>{`.bg-grid-gray-200 { background-image: linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px); background-size: 2rem 2rem; }`}</style>
    </div>
  );
};


const useScrollspy = (ids: string[], options?: IntersectionObserverInit): string => {
    const [activeId, setActiveId] = useState('');
    const observer = useRef<IntersectionObserver | null>(null);
    useEffect(() => {
        const elements = ids.map(id => document.getElementById(id.substring(1)));
        observer.current?.disconnect();
        observer.current = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry?.isIntersecting) { setActiveId(`#${entry.target.id}`); }
            });
        }, options);
        elements.forEach(el => { if (el) observer.current?.observe(el); });
        return () => observer.current?.disconnect();
    }, [ids, options]);
    return activeId;
};

export default App;
