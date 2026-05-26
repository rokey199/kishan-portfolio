import { motion } from "motion/react";
import { Code2, Cpu, Figma, Globe, Palette, ShoppingCart, Sparkles, RefreshCw } from "lucide-react";
import { Service } from "../types";

const SERVICES_DATA: Service[] = [
  {
    id: "serv-1",
    title: "Frontend Development",
    description: "Engineering scalable responsive interfaces with clean, standardized semantic architectures and smooth scrolling mechanics.",
    icon: "Code2",
    highlights: ["Semantic HTML5 / CSS3", "Extremely fluid layout ratios", "Desktop-first pixel precision"]
  },
  {
    id: "serv-2",
    title: "React JS Development",
    description: "Building fast, high-performance web applications using modern state management patterns, optimized virtual engines, and fluid motion.",
    icon: "Cpu",
    highlights: ["State Managers (Context/Redux)", "Optimized bundle budgets", "Smooth Framer Motion triggers"]
  },
  {
    id: "serv-3",
    title: "WordPress Development",
    description: "Designing dynamic custom Gutenberg layouts & robust administrative interfaces optimized for flawless operations.",
    icon: "Globe",
    highlights: ["Block Editor customization", "SEO schemas injection", "Lightning load velocity"]
  },
  {
    id: "serv-4",
    title: "Shopify Storefronts",
    description: "Accelerating conversions through custom Liquid structures, responsive cart widgets, and secure merchant checkout flows.",
    icon: "ShoppingCart",
    highlights: ["Hydrogen & Liquid layouting", "Conversion layouts optimization", "Performance tuning benchmarks"]
  },
  {
    id: "serv-5",
    title: "UI/UX Design Systems",
    description: "Drafting Apple-inspired dark-mode layouts, balanced typography sizes, and micro-interactivity paths.",
    icon: "Palette",
    highlights: ["Visual architecture guides", "High contrast accessibility theme", "Cinematic responsive design"]
  },
  {
    id: "serv-6",
    title: "Website Redesign",
    description: "Elevating obsolete websites into modern high-speed storefronts with zero downtime or data leaks.",
    icon: "RefreshCw",
    highlights: ["Lighthouse metrics alignment", "SEO metadata preservation", "Tailwind upgrade integration"]
  },
  {
    id: "serv-7",
    title: "Landing Page Systems",
    description: "Delivering high-converting promotional pages for SaaS tools, businesses, or startup launches.",
    icon: "Figma",
    highlights: ["Dynamic CTA sections", "Glow-under spotlights", "Responsive mobile touch ratio"]
  },
  {
    id: "serv-8",
    title: "AI Workflow Integration",
    description: "Automating customer chats, auto-tagging categories, or deploying secure proxy prompts with Gemini models.",
    icon: "Sparkles",
    highlights: ["Secure proxy servers configuration", "Structured JSON model schema", "Rapid AI agent scripting"]
  }
];

// Helper to resolve Lucide Icon dynamically
const resolveIcon = (iconName: string) => {
  switch (iconName) {
    case "Code2": return Code2;
    case "Cpu": return Cpu;
    case "Globe": return Globe;
    case "ShoppingCart": return ShoppingCart;
    case "Palette": return Palette;
    case "RefreshCw": return RefreshCw;
    case "Figma": return Figma;
    case "Sparkles": return Sparkles;
    default: return Sparkles;
  }
};

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative min-h-screen py-24 px-6 lg:px-12 flex items-center justify-center overflow-hidden"
    >
      <div className="absolute top-[30%] right-[10%] h-[320px] w-[320px] rounded-full bg-blue-500/5 blur-[120px]" />
      <div className="absolute bottom-[20%] left-[10%] h-[380px] w-[380px] rounded-full bg-purple-500/5 blur-[130px]" />

      <div className="mx-auto w-full max-w-7xl relative z-10">
        
        {/* Header Block */}
        <div className="mb-14 flex flex-col items-start text-left">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-purple-400 mb-2">
            SOLUTION DECK // OFFERING ARRAYS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Elite Digital Services
          </h2>
          <p className="max-w-xl text-zinc-400 text-sm leading-relaxed">
            Kishan Dabhi bridges the gap between premium design ethics and flawless multi-framework application development.
          </p>
          <div className="mt-6 h-[2px] w-20 bg-gradient-to-r from-purple-500 to-blue-500" />
        </div>

        {/* Services Bento Grid list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_DATA.map((srv, idx) => {
            const Icon = resolveIcon(srv.icon);
            return (
              <motion.div
                key={srv.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.03 }}
                className="group relative flex flex-col justify-between rounded-2xl border border-zinc-900 bg-zinc-950/45 p-6 backdrop-blur-sm hover:border-zinc-800 hover:bg-zinc-900/10 transition-all duration-500 overflow-hidden"
              >
                {/* Spot light hover line */}
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Visual Circle highlight ambient */}
                <div className="absolute -top-12 -left-12 h-24 w-24 rounded-full bg-blue-500/5 blur-xl group-hover:bg-blue-500/10 transition-all duration-500" />

                <div className="text-left relative z-10">
                  {/* Service Icon inside glowing cage */}
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-955 text-blue-400 shadow-sm group-hover:border-blue-500/30 group-hover:shadow-[0_0_12px_rgba(59,130,246,0.15)] transition-all duration-300">
                    <Icon className="h-5 w-5 text-blue-400" />
                  </div>

                  <h3 className="text-base font-bold text-zinc-100 group-hover:text-white transition-colors">
                    {srv.title}
                  </h3>

                  <p className="mt-3 text-xs text-zinc-405 leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                {/* Micro bullet marks */}
                <ul className="mt-5 space-y-1.5 border-t border-zinc-900 pt-4 text-left relative z-10">
                  {srv.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="font-mono text-[9px] text-zinc-500 group-hover:text-zinc-400 transition-colors uppercase tracking-wider flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-blue-500" />
                      {h}
                    </li>
                  ))}
                </ul>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
