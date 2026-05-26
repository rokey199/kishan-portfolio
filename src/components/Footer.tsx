import { ArrowUp, Cpu } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      id="portal-footer"
      className="relative border-t border-zinc-900 bg-[#030308] py-16 px-6 lg:px-12 overflow-hidden"
    >
      {/* Decorative vector grid backing */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:50px_50px] opacity-10 pointer-events-none" />

      <div className="mx-auto w-full max-w-7xl relative z-10 flex flex-col space-y-12">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          
          {/* Brand block */}
          <div className="flex flex-col text-left space-y-3">
            <button
              onClick={() => scrollToSection("hero")}
              className="group flex items-center gap-2 font-mono tracking-widest text-zinc-100 hover:text-zinc-300 w-fit focus:outline-none"
            >
              <Cpu className="h-5 w-5 text-blue-400" />
              <span className="font-bold uppercase text-xs tracking-[0.25em]">KISHAN DABHI</span>
            </button>
            <p className="text-zinc-500 text-xs max-w-xs leading-normal">
              Ultra-premium portfolio website showcasing futuristic micro-interactions, flawless responsive structures, and advanced state frameworks.
            </p>
          </div>

          {/* Quick specs links map */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 font-mono text-[9px] font-bold tracking-widest uppercase text-zinc-400">
            <button onClick={() => scrollToSection("hero")} className="hover:text-white transition-colors">Core</button>
            <button onClick={() => scrollToSection("about")} className="hover:text-white transition-colors">Spec</button>
            <button onClick={() => scrollToSection("skills")} className="hover:text-white transition-colors">Stack</button>
            <button onClick={() => scrollToSection("projects")} className="hover:text-white transition-colors">Codes</button>
            <button onClick={() => scrollToSection("experience")} className="hover:text-white transition-colors">Timeline</button>
            <button onClick={() => scrollToSection("recruiter")} className="hover:text-white transition-colors">AI Recruiter</button>
            <button onClick={() => scrollToSection("contact")} className="hover:text-white transition-colors">Connect</button>
          </div>

        </div>

        {/* copyright and scroll back */}
        <div className="border-t border-zinc-900 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6 text-zinc-600 text-[10px] font-mono tracking-wider uppercase">
          
          <div className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} KISHAN PRAVINBHAI DABHI. ALL RIGHTS REGISTERED.
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-1.5 rounded-full border border-zinc-900 bg-zinc-950 px-3.5 py-1.5 hover:border-zinc-700 hover:text-zinc-300 transition-all text-zinc-500 focus:outline-none"
          >
            Terminal Return
            <ArrowUp className="h-3.5 w-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

        </div>

      </div>
    </footer>
  );
}
