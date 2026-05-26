import { motion } from "motion/react";
import { User, Cpu, Sparkles, Sliders } from "lucide-react";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen py-24 px-6 lg:px-12 flex items-center justify-center overflow-hidden"
    >
      {/* Background light glow */}
      <div className="absolute top-[30%] right-[15%] h-[300px] w-[300px] rounded-full bg-blue-500/5 blur-[120px]" />
      <div className="absolute bottom-[20%] left-[10%] h-[350px] w-[350px] rounded-full bg-indigo-500/5 blur-[130px]" />

      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-16 flex flex-col items-start text-left">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-blue-400 mb-2">
            SPECIFICATION MATRIX // ABOUT KISHAN
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Pioneering Visual &amp; Code Balance
          </h2>
          <div className="mt-4 h-[2px] w-20 bg-gradient-to-r from-blue-500 to-purple-500" />
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Animated Graphical Core (LHS) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[280px] w-[280px] sm:h-[360px] sm:w-[360px] rounded-3xl border border-zinc-800 bg-zinc-950/30 p-1 backdrop-blur-sm group overflow-hidden"
            >
              {/* Spinning technical mesh */}
              <div className="absolute inset-0 bg-[#030308] opacity-60" />
              <div className="absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-blue-500/10 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Visual sci-fi circle grid */}
                <div className="w-5/6 h-5/6 rounded-full border border-dashed border-zinc-700/50 animate-[spin_80s_linear_infinite]" />
                <div className="absolute w-2/3 h-2/3 rounded-full border border-zinc-600/30 animate-[spin_40s_linear_infinite]" />
                <div className="absolute w-1/3 h-1/3 rounded-full border-2 border-indigo-500/20" />
                
                {/* central holographic tech avatar represent */}
                <div className="absolute flex flex-col items-center">
                  <div className="relative">
                    <Cpu className="h-10 w-10 text-blue-400 group-hover:scale-110 transition-transform duration-500" />
                    <span className="absolute inset-0 bg-blue-400/20 blur-xl" />
                  </div>
                  <span className="mt-3 font-mono text-[9px] text-zinc-400 tracking-widest uppercase font-semibold">
                    SYS_CORE_ACTIVE
                  </span>
                </div>
              </div>

              {/* Dynamic glass overlays */}
              <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-3 backdrop-blur-sm">
                <p className="text-[10px] font-mono text-zinc-400 leading-tight">
                  <span className="text-zinc-500">&gt;_ LOCATION REGISTERED:</span>
                  <br />Ahmedabad &amp; Surat, Gujarat, India
                </p>
              </div>
            </motion.div>
          </div>

          {/* Interactive Biography Deck (RHS) */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-base sm:text-lg text-zinc-300 font-medium leading-relaxed"
            >
              Kishan Pravinbhai Dabhi is a passionate self-driven full-stack &amp; frontend engineer specializing in pixel-perfect designs, immersive React framework applications, customized high-performance Shopify stores, and responsive WordPress environments.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-sm text-zinc-400 leading-relaxed"
            >
              Whether engineering dynamic e-commerce architecture from scratch, optimizing client search engine rankings, designing delightful UI systems with motion paths, or aligning state-of-the-art AI tooling inside daily dev loops—Kishan acts with high performance and problem-solving velocity.
            </motion.p>

            {/* Core Values Bento Grid cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              
              <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/40 hover:border-zinc-700 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-purple-400" />
                  <span className="font-mono text-[10px] font-bold tracking-wider text-zinc-300 uppercase">
                    High Production Craft
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-normal">
                  Framer Motion, CSS shadows, micro-reactions, typography rhythms, and flawless mobile layouts.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/40 hover:border-zinc-700 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-blue-400" />
                  <span className="font-mono text-[10px] font-bold tracking-wider text-zinc-300 uppercase">
                    Problem-Solving Spirit
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-normal">
                  Trained to debug layout issues, compile complex data models, and deploy production assets dynamically.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/40 hover:border-zinc-700 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <Sliders className="h-4 w-4 text-indigo-400" />
                  <span className="font-mono text-[10px] font-bold tracking-wider text-zinc-300 uppercase">
                    AI Integration Workflows
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-normal">
                  Harnessing neural nodes like Gemini &amp; ChatGPT for lightning-fast productivity, SEO, and auto-optimization.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/40 hover:border-zinc-700 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="h-4 w-4 text-teal-400" />
                  <span className="font-mono text-[10px] font-bold tracking-wider text-zinc-300 uppercase">
                    SEO &amp; Loading Speed
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-normal">
                  Fine-tuning bundles, assets caching, and semantically proper HTML foundations for search ranks.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
