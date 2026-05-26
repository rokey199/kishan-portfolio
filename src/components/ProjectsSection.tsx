import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Github, Code, Sparkles, Layout, Database, Smartphone, Orbit } from "lucide-react";
import { Project } from "../types";

const PROJECTS_DATA: Project[] = [
  {
    id: "proj-1",
    title: "AI Neural Recruiter Integration Hub",
    description: "An advanced, high-performance proxy dashboard that harnesses AI models for real-time portfolio inquiries, custom-crafted system structures, and prompt telemetry logs.",
    category: "AI",
    tags: ["React JS", "Gemini AI SDK", "Express Backend", "Tailwind CSS"],
    imageUrl: "neural_recruiter",
    demoUrl: "#recruiter",
    githubUrl: "https://github.com/dabhikishan199",
    featured: true
  },
  {
    id: "proj-2",
    title: "Vercel-level Custom Agency Landing Module",
    description: "A dark cyberpunk-themed high-conversion presentation landing page decorated with complex scroll alignments, interactive pricing dials, and glowing grids.",
    category: "Landing",
    tags: ["React JS", "Framer Motion", "Tailwind CSS"],
    imageUrl: "vercel_landing",
    demoUrl: "https://github.com/dabhikishan199",
    githubUrl: "https://github.com/dabhikishan199",
    featured: true
  },
  {
    id: "proj-3",
    title: "Metamorphosis Shopify Theme",
    description: "An ultra-premium storefront crafted with custom liquid templates, loading speed optimization (99 Lighthouse score), and Stripe checkout flows.",
    category: "Shopify",
    tags: ["Shopify Liquid", "Hydrogen Storefront", "Tailwind CSS"],
    imageUrl: "shopify_meta",
    demoUrl: "https://github.com/dabhikishan199",
    githubUrl: "https://github.com/dabhikishan199",
    featured: false
  },
  {
    id: "proj-4",
    title: "Zenith Architecture Elite Hub",
    description: "A stunning corporate WordPress site built with customizable Gutenberg blocks, high-fidelity layouts, SEO-friendly structured schema, and premium load parameters.",
    category: "WordPress",
    tags: ["WordPress Development", "PHP Core", "Tailwind CSS", "SEO Basics"],
    imageUrl: "wordpress_zenith",
    demoUrl: "https://github.com/dabhikishan199",
    githubUrl: "https://github.com/dabhikishan199",
    featured: false
  },
  {
    id: "proj-5",
    title: "Stripe-Inspired Saas Crypto Billing",
    description: "Full-stack payment system integration featuring live simulation dials, transactional state logs, smooth transitions, and secure API routing.",
    category: "React",
    tags: ["React JS", "Node Express", "Tailwind CSS", "Lucide Icons"],
    imageUrl: "crypto_pay",
    demoUrl: "https://github.com/dabhikishan199",
    githubUrl: "https://github.com/dabhikishan199",
    featured: true
  },
  {
    id: "proj-6",
    title: "Apex Wearable Product Interface",
    description: "A gorgeous, cinematic interactive UI/UX visual layout highlighting luxury smartwatch accessories, touch target optimization, and motion state paths.",
    category: "UI/UX",
    tags: ["Responsive Design", "Figma Redesign", "Tailwind CSS", "Motion Core"],
    imageUrl: "wearable_ui",
    demoUrl: "https://github.com/dabhikishan199",
    githubUrl: "https://github.com/dabhikishan199",
    featured: false
  }
];

// Combine similar things for beautiful tab labels
const PROJECT_CATEGORIES = [
  { id: "ALL", label: "Show All" },
  { id: "React", label: "React JS" },
  { id: "WordPress", label: "WordPress" },
  { id: "Shopify", label: "Shopify" },
  { id: "Landing", label: "Landing Pages" },
  { id: "UI/UX", label: "UI/UX Specs" },
  { id: "AI", label: "AI Platforms" }
];

export default function ProjectsSection() {
  const [filter, setFilter] = useState("ALL");

  const filteredProjects = PROJECTS_DATA.filter(
    (proj) => filter === "ALL" || proj.category === filter
  );

  return (
    <section
      id="projects"
      className="relative min-h-screen py-24 px-6 lg:px-12 flex items-center justify-center overflow-hidden"
    >
      {/* Cinematic grid & visual blur spot */}
      <div className="absolute top-[20%] right-[10%] h-[340px] w-[340px] rounded-full bg-blue-500/5 blur-[120px]" />
      <div className="absolute bottom-[20%] left-[10%] h-[380px] w-[380px] rounded-full bg-purple-500/5 blur-[130px]" />

      <div className="mx-auto w-full max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="mb-14 flex flex-col items-start text-left">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-blue-400 mb-2">
            PORTFOLIO SHOWCASE // PRODUCTION DEPLOYMENTS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Recruiter-Impressive Codes
          </h2>
          <p className="max-w-xl text-zinc-400 text-sm leading-relaxed">
            A premium selection of clients' live business pages, high-conversion Shopify layouts, elite WordPress themes, and modern AI platforms built by Kishan Dabhi.
          </p>
          <div className="mt-6 h-[2px] w-20 bg-gradient-to-r from-blue-500 to-purple-500" />
        </div>

        {/* category filtering bar */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-zinc-800/40 pb-6">
          {PROJECT_CATEGORIES.map((cat) => {
            const isActive = filter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-4 py-2 text-[10px] font-mono tracking-widest uppercase rounded-full border transition-all duration-300 ${
                  isActive
                    ? "bg-zinc-100 text-black border-transparent font-bold"
                    : "border-zinc-800 bg-zinc-950/20 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Projects Cards Layout with Grid filtering animations */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj, idx) => (
              <motion.div
                layout
                key={proj.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="group relative flex flex-col justify-between rounded-2xl border border-zinc-900 bg-zinc-950/60 hover:border-zinc-700 hover:shadow-2xl hover:shadow-purple-500/5 transition-all duration-500 overflow-hidden"
              >
                {/* Simulated high-quality visual mockup with stylized CSS */}
                <div className="relative h-48 w-full bg-gradient-to-br from-zinc-900 to-zinc-950 border-b border-zinc-900 flex flex-col items-center justify-center p-4 overflow-hidden">
                  
                  {/* Glowing absolute indicators */}
                  <div className="absolute top-1/2 left-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[45px]" />
                  
                  {/* Cyber wireframe details to emulate visual high-quality screenshot placeholder */}
                  <div className="absolute inset-4 rounded-lg border border-zinc-800/50 flex flex-col justify-between p-3 font-mono text-[9px] text-zinc-500">
                    <div className="flex justify-between">
                      <span>SYS_REF_ID: {proj.id}</span>
                      <span className="text-purple-400/80 font-bold uppercase">{proj.category}</span>
                    </div>

                    {/* Iconic representations corresponding to tech */}
                    <div className="flex flex-col items-center justify-center my-2 space-y-1 text-center">
                      {proj.category === "AI" && <Orbit className="h-10 w-10 text-cyan-400 animate-spin" style={{ animationDuration: '15s' }} />}
                      {proj.category === "Landing" && <Layout className="h-10 w-10 text-purple-400" />}
                      {proj.category === "Shopify" && <Database className="h-10 w-10 text-emerald-400" />}
                      {proj.category === "WordPress" && <Code className="h-10 w-10 text-indigo-400" />}
                      {proj.category === "React" && <Sparkles className="h-10 w-10 text-blue-400 animate-pulse" />}
                      {proj.category === "UI/UX" && <Smartphone className="h-10 w-10 text-indigo-400" />}
                      
                      <span className="text-zinc-300 font-bold tracking-widest text-[9px] uppercase mt-2">{proj.title}</span>
                    </div>

                    <div className="text-right tracking-widest text-[#10b981] font-semibold text-[8px]">
                      // COMPILE STATUS ACTIVE
                    </div>
                  </div>
                </div>

                {/* Content Details Block */}
                <div className="p-6 flex flex-col flex-grow text-left">
                  {/* Category Pill Tag */}
                  <span className="w-fit text-[9px] font-mono tracking-[0.2em] text-blue-400 uppercase font-bold mb-2">
                    {proj.category} APPLICATION
                  </span>

                  <h3 className="text-lg font-bold text-zinc-100 group-hover:text-white transition-colors">
                    {proj.title}
                  </h3>

                  <p className="mt-3 text-xs text-zinc-400/95 leading-relaxed flex-grow">
                    {proj.description}
                  </p>

                  {/* Tags list */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-zinc-900 border border-zinc-800 px-2.5 py-1 font-mono text-[8px] tracking-wider text-zinc-400/90 uppercase font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions Deck CTA links */}
                  <div className="mt-6 flex items-center gap-4 border-t border-zinc-800/40 pt-4">
                    {proj.demoUrl && (
                      <a
                        href={proj.demoUrl}
                        className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold tracking-wider text-zinc-300 hover:text-white transition-colors uppercase"
                      >
                        Launch Project
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold tracking-wider text-zinc-500 hover:text-zinc-300 transition-colors uppercase"
                      >
                        Source Code
                        <Github className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
