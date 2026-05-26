import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDown, MessageSquareCode, Download, Briefcase, Zap } from "lucide-react";

const TITLE_ROTATIONS = [
  "Frontend Developer",
  "React JS Developer",
  "Shopify Developer",
  "WordPress Expert",
  "UI/UX Designer",
  "AI Tools Specialist"
];

const HERO_STATS = [
  { value: "50+", label: "Projects Completed" },
  { value: "18+", label: "Tech Stack Gears" },
  { value: "4.9★", label: "Client Rating Average" },
  { value: "99+", label: "AI Prompts Crafted" }
];

export default function HeroSection() {
  const [titleIdx, setTitleIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTitleIdx((prev) => (prev + 1) % TITLE_ROTATIONS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-24 lg:px-12"
    >
      {/* Dynamic Aura Gradients */}
      <div className="absolute top-[20%] left-[20%] h-[350px] w-[350px] rounded-full bg-blue-500/10 blur-[130px]" />
      <div className="absolute bottom-[20%] right-[10%] h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[140px]" />

      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Main Visual Block & Heading (LHS) */}
          <div className="flex flex-col text-left lg:col-span-7">
            
            {/* Tagline Indicator pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex w-fit items-center gap-1.5 rounded-full border border-zinc-800/80 bg-zinc-950/45 px-3 py-1 font-mono text-[9px] font-medium tracking-widest text-zinc-400 uppercase mb-6"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
              NEURAL CONNECTIVITY ENGINE INTIATED
            </motion.div>

            {/* Giant Title Heading with Rotating Roles */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans tracking-tight leading-[1.05] text-white font-extrabold"
            >
              Kishan Pravinbhai Dabhi
            </motion.h1>

            {/* Sub-Header Dynamic Typed Loop */}
            <div className="h-14 sm:h-16 md:h-20 mt-3 md:mt-4 overflow-hidden relative">
              <span className="text-zinc-600 block text-xs font-mono uppercase tracking-[0.25em] mb-1">
                OPERATIONS MATRIX:
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={titleIdx}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent"
                >
                  {TITLE_ROTATIONS[titleIdx]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Captivating Intro Statement */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 max-w-xl text-sm sm:text-base text-zinc-400/90 leading-relaxed font-sans"
            >
              Building modern digital experiences with creativity, performance &amp; AI. 
              Fusing Stripe-level clean interfaces, Apple-inspired cinematic flows, 
              and robust backends.
            </motion.p>

            {/* Call to Actions Deck */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <button
                onClick={() => handleScrollTo("contact")}
                className="group relative flex items-center gap-2 rounded-full bg-zinc-100 hover:bg-white px-6 py-3 font-mono text-[10px] font-bold tracking-wider text-black uppercase transition-all"
              >
                Hire Kishan
                <Briefcase className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={() => handleScrollTo("recruiter")}
                className="group flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900/60 hover:border-zinc-700 px-6 py-3 font-mono text-[10px] font-bold tracking-wider text-zinc-300 uppercase transition-all"
              >
                AI Recruiter Chat
                <MessageSquareCode className="h-3.5 w-3.5 text-blue-400 group-hover:rotate-12 transition-all duration-300" />
              </button>
              
              <a
                href="https://dabhikishan199.github.io/Resume/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900/60 hover:border-zinc-700 px-6 py-3 font-mono text-[10px] font-bold tracking-wider text-zinc-300 uppercase transition-all"
              >
                Interactive Resume
                <Download className="h-3.5 w-3.5 text-zinc-500 group-hover:translate-y-0.5 transition-all" />
              </a>
            </motion.div>
          </div>

          {/* Futuristic Visual Dashboard Widget (RHS) */}
          <div className="relative mt-8 lg:mt-0 lg:col-span-5 flex justify-center items-center">
            
            {/* Elegant glass interactive dashboard widget */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.2 }}
              className="w-full max-w-md rounded-2xl border border-zinc-800/90 bg-zinc-950/45 p-6 backdrop-blur-xl hover:border-zinc-700/80 transition-all duration-500 relative overflow-hidden group shadow-2xl"
            >
              {/* Internal neon wireframe corner glowing blocks */}
              <div className="absolute -top-12 -left-12 h-32 w-32 rounded-full bg-blue-500/20 blur-xl group-hover:bg-blue-500/30 transition-all duration-500" />
              <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-purple-500/20 blur-xl group-hover:bg-purple-500/30 transition-all duration-500" />

              {/* Matrix Console Header */}
              <div className="flex items-center justify-between border-b border-zinc-800/70 pb-4 mb-5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-400" />
                  <span className="h-2 w-2 rounded-full bg-yellow-400" />
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                </div>
                <div className="font-mono text-[9px] text-zinc-500 tracking-wider">KISHAN_PORTFOLIO_OS // CONSOLE</div>
              </div>

              {/* Code Line Stream */}
              <div className="font-mono text-left space-y-2 text-xs text-zinc-400">
                <p className="text-zinc-600 font-semibold">// Initializing neural portfolio layout</p>
                <p><span className="text-zinc-500">const</span> developer = <span className="text-blue-300">"Kishan Pravinbhai Dabhi"</span>;</p>
                <p><span className="text-zinc-500">const</span> capabilities = [</p>
                <p className="pl-4 text-purple-300">"React JS / Full-Stack",</p>
                <p className="pl-4 text-purple-300">"WordPress / Custom Shopify Theme Development",</p>
                <p className="pl-4 text-purple-300">"UI/UX Design Systems & AI Workflows"</p>
                <p>];</p>
                <p><span className="text-zinc-500">const</span> isHireable = () =&gt; <span className="text-green-400 font-semibold">true</span>;</p>
                
                {/* Code statement with responsive reactive effect */}
                <div className="mt-6 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/40 font-mono text-[10px] space-y-1">
                  <div className="flex items-center gap-1 text-zinc-500 font-semibold">
                    <Zap className="h-3 w-3 text-yellow-400" /> SYSTEM DIAGNOSTICS:
                  </div>
                  <div className="text-zinc-300 flex justify-between">
                    <span>Performance Rating:</span>
                    <span className="text-emerald-400">100/100 (S-Class)</span>
                  </div>
                  <div className="text-zinc-300 flex justify-between">
                    <span>Clean Code Standard:</span>
                    <span className="text-emerald-400">Strictly Enforced</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Animated tech labels around container */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-5 -right-3 sm:-right-6 rounded-lg border border-zinc-800/90 bg-zinc-950/90 px-3 py-1.5 font-mono text-[9px] text-zinc-300 tracking-wider flex items-center gap-2 backdrop-blur shadow-lg"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
              REACT JS
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, delay: 0.5, ease: "easeInOut" }}
              className="absolute -bottom-5 -left-3 sm:-left-6 rounded-lg border border-zinc-800/90 bg-zinc-950/90 px-3 py-1.5 font-mono text-[9px] text-zinc-300 tracking-wider flex items-center gap-2 backdrop-blur shadow-lg"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              SHOPIFY &amp; WP
            </motion.div>
          </div>
        </div>

        {/* Dynamic Static Stats Counter */}
        <div className="mt-20 border-t border-zinc-800/50 pt-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {HERO_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.08 }}
                className="flex flex-col text-left border-l border-zinc-800/70 pl-6"
              >
                <span className="text-2xl sm:text-3xl font-extrabold text-zinc-100 tracking-tight font-sans">
                  {stat.value}
                </span>
                <span className="mt-1 font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Elegant Scroll Button marker */}
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => handleScrollTo("about")}
            className="flex items-center gap-2 rounded-full border border-zinc-800/80 bg-zinc-950/20 py-2.5 px-4 font-mono text-[9px] font-bold tracking-widest text-zinc-400 uppercase transition-all duration-300 hover:text-white hover:bg-zinc-800/30 animate-pulse"
          >
            Scroll Down
            <ArrowDown className="h-3 w-3 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
