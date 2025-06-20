export interface Project {
  title: string;
  description: string;
  imageUrl: string;
  stlUrl: string; // URL to the .stl file for the 3D viewer
  tags: string[];
}

export interface Testimonial {
  quote: string;
  name: string;
  company: string;
}

export interface StatsData {
    clientsServed: number;
    projectsCompleted: number;
    yearsOfExperience: number;
}
