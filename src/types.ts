export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'React' | 'WordPress' | 'Shopify' | 'Landing' | 'UI/UX' | 'AI';
  tags: string[];
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'programming' | 'cms' | 'uiux' | 'ai' | 'tools';
  level: number; // Percentage
  icon: string; // Lucide icon name
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  highlights: string[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  responsibilities: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}
