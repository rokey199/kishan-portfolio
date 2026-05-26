import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Code2, Monitor, Layers, Sparkles, FolderCode, ShieldAlert } from "lucide-react";
import { Skill } from "../types";

const SKILLS_DATA: Skill[] = [
  // Frontend
  { name: "React JS", category: "frontend", level: 95, icon: "React" },
  { name: "JavaScript", category: "frontend", level: 90, icon: "JS" },
  { name: "Tailwind CSS", category: "frontend", level: 98, icon: "Tailwind" },
  { name: "HTML5 & CSS3", category: "frontend", level: 95, icon: "HTML" },
  { name: "Bootstrap", category: "frontend", level: 85, icon: "Bootstrap" },

  // Programming
  { name: "Python", category: "programming", level: 75, icon: "Python" },

  // CMS
  { name: "WordPress", category: "cms", level: 95, icon: "WordPress" },
  { name: "Shopify", category: "cms", level: 92, icon: "Shopify" },
  { name: "Wix", category: "cms", level: 85, icon: "Wix" },

  // UI/UX
  { name: "Responsive Design", category: "uiux", level: 98, icon: "Mobile" },
  { name: "Landing Pages", category: "uiux", level: 96, icon: "Landing" },
  { name: "Website Redesign", category: "uiux", level: 94, icon: "Redesign" },
  { name: "UX Optimization", category: "uiux", level: 92, icon: "UX" },

  // AI & Modern Tools
  { name: "ChatGPT & Gemini", category: "ai", level: 95, icon: "AI" },
  { name: "Prompt Engineering", category: "ai", level: 95, icon: "Prompt" },
  { name: "AI Website Builders", category: "ai", level: 90, icon: "AIBuild" },
  { name: "AI Productivity Tools", category: "ai", level: 92, icon: "Productivity" },

  // Tools
  { name: "VS Code", category: "tools", level: 96, icon: "VSCode" },
  { name: "GitHub / Git", category: "tools", level: 90, icon: "Git" },
  { name: "Netlify & Vercel", category: "tools", level: 92, icon: "Deploy" },
  { name: "SEO Basics", category: "tools", level: 88, icon: "SEO" },
];

const CATEGORIES = [
  { id: "all", label: "Full System", icon: Layers },
  { id: "frontend", label: "Frontend Grid", icon: Code2 },
  { id: "cms", label: "CMS Engines", icon: FolderCode },
  { id: "uiux", label: "UI/UX Spec", icon: Monitor },
  { id: "ai", label: "AI Workflows", icon: Sparkles },
  { id: "tools", label: "Tools / SEO", icon: ShieldAlert },
];

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = SKILLS_DATA.filter((skill) => {
    if (activeCategory === "all") return true;
    return skill.category === activeCategory;
  });

  return (
    <section
      id="skills"
      className="relative min-h-screen py-24 px-6 lg:px-12 flex items-center justify-center overflow-hidden"
    >
      <div className="absolute top-[40%] left-[20%] h-[320px] w-[320px] rounded-full bg-indigo-500/5 blur-[120px]" />
      <div className="absolute bottom-[10%] right-[10%] h-[380px] w-[380px] rounded-full bg-blue-500/5 blur-[140px]" />

      <div className="mx-auto w-full max-w-7xl relative z-10">
        
        {/* Header Block */}
        <div className="mb-14 flex flex-col items-start text-left">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-purple-400 mb-2">
            NEURAL GEARS // TECH SPECS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            The Multi-Stack Engine
          </h2>
          <p className="max-w-xl text-zinc-400 text-sm leading-relaxed">
            Kishan Dabhi harnesses a modern suite of robust frameworks, responsive system design utilities, AI tools, and content management structures for highly dynamic digital creations.
          </p>
          <div className="mt-6 h-[2px] w-20 bg-gradient-to-r from-purple-500 to-blue-500" />
        </div>

        {/* Categories Tab Deck */}
        <div className="flex flex-wrap gap-2.5 mb-12">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[10px] tracking-widest uppercase transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 border-transparent text-white shadow-lg shadow-purple-500/10"
                    : "border-zinc-800 bg-zinc-950/40 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                }`}
              >
                <Icon className={`h-3 w-3 ${isActive ? "text-white" : "text-zinc-500"}`} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Skills Bento Display Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.02 }}
                className="group relative rounded-2xl border border-zinc-800 bg-zinc-950/40 p-5 backdrop-blur-sm hover:border-zinc-700/80 hover:bg-zinc-900/15 transition-all duration-500 overflow-hidden"
              >
                {/* Micro Spotlight top border glow effect */}
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Info block */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-7 w-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono text-[9px] font-bold text-blue-400 uppercase tracking-widest">
                      {skill.name.slice(0, 2)}
                    </div>
                    <span className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-500 font-semibold">
                    {skill.level}%
                  </span>
                </div>

                {/* Slider progress loading bar */}
                <div className="h-1 w-full bg-zinc-900 overflow-hidden rounded-full">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
