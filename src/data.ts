import { Project } from "./types";

export const CLIENT_INFO = {
  name: "Pearl Solutions",
  title: "Innovative Engineering Solutions",
  email: "contact@pearlsolutions.com",
  phone: "+91XXX",
  location: "Vadodara, Gujarat, India",
  linkedin: "https://www.linkedin.com/",
  github: "https://github.com/",
};

export const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export const SERVICES = [
  { title: "New Product Design & Prototyping", description: "End-to-end development from initial concept to a tangible, market-ready prototype." },
  { title: "3D Modeling & Rendering", description: "Creating detailed 3D models and photorealistic renderings for visualization and analysis." },
  { title: "2D Drafting & Technical Drawings", description: "Producing precise, standards-compliant 2D drawings for manufacturing and documentation." },
  { title: "Sheet Metal Design", description: "Specialized design services for sheet metal parts and enclosures, optimized for fabrication." },
  { title: "Jigs, Fixtures & Gauges", description: "Designing custom tools and fixtures to improve manufacturing accuracy and efficiency." },
  { title: "Reverse Engineering", description: "Digitizing and reconstructing physical parts to create editable CAD models and drawings." },
  { title: "CNC & EDM Machining", description: "Providing solutions for complex machining processes including CNC and Wire Cut-EDM." },
  { title: "Assembly & Animation", description: "Creating dynamic assembly animations to visualize product functionality and assembly steps." },
];

export const PROJECTS: Project[] = [
  {
    title: "Industrial Fan Assembly",
    description: "A complete 3D model of a heavy-duty industrial fan, designed for optimal airflow and durability.",
    imageUrl: "https://placehold.co/600x400/e2e8f0/334155?text=image_965102.png",
    stlUrl: "/Jug.STL", // Replace with your actual, publicly accessible STL URL
    tags: ["3D Modeling", "Assembly"],
  },
  {
    title: "Mould Base Exploded View",
    description: "An exploded-view rendering of a complex injection mould base, detailing every component.",
    imageUrl: "https://placehold.co/600x400/f0e2e8/443355?text=image_965120.png",
    stlUrl: "/Punch\ E11.STL", // Example URL, replace with your own
    tags: ["Rendering", "Dies & Moulds"],
  },
  {
    title: "Cylindrical Grinding Jig",
    description: "A custom-designed jig for holding cylindrical parts securely during precision grinding operations.",
    imageUrl: "https://placehold.co/600x400/e8f0e2/554433?text=image_965128.png",
    stlUrl: "/Four\ way\ connector.STL", // Example URL, replace with your own
    tags: ["Jigs & Fixtures", "Manufacturing"],
  },
];
