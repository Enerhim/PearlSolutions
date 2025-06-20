import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader } from 'lucide-react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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
            if (currentMount && renderer.domElement && currentMount.contains(renderer.domElement)) {
                currentMount.removeChild(renderer.domElement);
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

export default ThreeModelViewer;