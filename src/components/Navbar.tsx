import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight, Cpu } from "lucide-react";

const NAV_ITEMS = [
  { id: "hero", label: "Core" },
  { id: "about", label: "Spec" },
  { id: "skills", label: "Stack" },
  { id: "projects", label: "Codes" },
  { id: "experience", label: "Timeline" },
  { id: "services", label: "Offer" },
  { id: "recruiter", label: "AI Recruiter" },
  { id: "contact", label: "Connect" }
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Scrolled backdrop state
      setScrolled(window.scrollY > 40);

      // 2. Pure percentage scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // 3. Highlight exact viewport state
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // boot tick
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header
        id="navbar-header"
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          scrolled ? "bg-[#030308]/75 backdrop-blur-xl border-b border-zinc-800/40 py-3" : "bg-transparent py-5"
        }`}
      >
        {/* Dynamic Scroll Progress Bar */}
        <div className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-75" style={{ width: `${scrollProgress}%` }} />

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
          {/* Logo with futuristic flash */}
          <button
            onClick={() => scrollToSection("hero")}
            className="group flex items-center gap-2 font-mono tracking-widest text-zinc-100 hover:text-zinc-300 relative"
          >
            <div className="relative">
              <Cpu className="h-5 w-5 text-blue-400 group-hover:rotate-12 transition-all duration-300" />
              <span className="absolute -inset-1 rounded-full bg-blue-500/10 blur group-hover:bg-blue-500/20" />
            </div>
            <span className="font-bold uppercase text-xs tracking-[0.25em]">KISHAN DABHI</span>
          </button>

          {/* Desktop Navigation Link Array */}
          <nav role="navigation" aria-label="Desktop menu" className="hidden lg:flex items-center gap-1.5 p-1 rounded-full border border-zinc-800/40 bg-zinc-950/20 backdrop-blur-sm">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-1.5 text-[10px] font-mono tracking-widest uppercase transition-all duration-300 ${
                    isActive ? "text-zinc-100" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 z-0 rounded-full bg-zinc-800/50 border border-zinc-700/30"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Hire Me fast indicator CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => scrollToSection("contact")}
              className="group flex items-center gap-1.5 rounded-full border border-blue-500/40 bg-blue-500/5 px-4 py-1.5 font-mono text-[9px] font-semibold tracking-widest text-blue-400 uppercase transition-all duration-300 hover:bg-blue-500 hover:text-white"
            >
              Hire Kishan
              <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
            </button>
          </div>

          {/* Mobile hamburger toggle button */}
          <button
            aria-label="Toggle Navigation Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex rounded-full border border-zinc-800 bg-zinc-950/50 p-2.5 text-zinc-300 hover:bg-zinc-900 lg:hidden focus:outline-none"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu Slide Down */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-drawer-portal"
            className="fixed inset-0 z-[900] bg-black/95 backdrop-blur-2xl lg:hidden flex flex-col justify-center px-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:40px_40px] opacity-10 pointer-events-none" />
            
            <nav role="navigation" aria-label="Mobile Navigation Drawer" className="flex flex-col gap-6 font-mono text-center">
              {NAV_ITEMS.map((item, idx) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`text-xl tracking-widest uppercase py-2 focus:outline-none transition-all ${
                      isActive ? "text-blue-400 font-bold" : "text-zinc-500 hover:text-zinc-200"
                    }`}
                  >
                    {item.label}
                  </motion.button>
                );
              })}

              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_ITEMS.length * 0.05 }}
                onClick={() => scrollToSection("contact")}
                className="mt-8 mx-auto flex items-center justify-center gap-2 border border-blue-505 bg-blue-600/10 hover:bg-blue-600 font-mono text-xs tracking-widest uppercase py-3 px-8 text-blue-400 hover:text-white rounded-full transition-all"
              >
                Inquire Project <ArrowUpRight className="h-4 w-4" />
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
