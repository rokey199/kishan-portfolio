import { motion } from "motion/react";
import { Award, Zap, Smile, CheckSquare, Target, UserCheck } from "lucide-react";

const WHY_HIRE_DATA = [
  {
    title: "Clean Coding Practices",
    desc: "AdHERING strictly to industry standard semantic configurations, component dry structures, and exhaustive inline notes.",
    icon: Award,
    color: "text-blue-400"
  },
  {
    title: "Fast Learner & Innovator",
    desc: "Rapid assimilation of advanced frameworks, modern hydration methods, and new SDK releases within 48-hour turnarounds.",
    icon: Zap,
    color: "text-yellow-400"
  },
  {
    title: "Modern UI/UX Focus",
    desc: "Aesthetic affinity inspired by Apple layouts, Stripe gradients, and Framer glassmorphism animations.",
    icon: Smile,
    color: "text-purple-400"
  },
  {
    title: "Performance Optimization",
    desc: "Minifying script bundles, deferring heavy imports, and maintaining 95+ score parameters on mobile endpoints.",
    icon: CheckSquare,
    color: "text-emerald-400"
  },
  {
    title: "AI-Assisted Velocity",
    desc: "Leveraging prompt engineering strategies to amplify programming outputs, copywriting speeds, and debug scopes.",
    icon: Target,
    color: "text-pink-400"
  },
  {
    title: "Professional Communication",
    desc: "Honorable client rapport, precise deliverables estimates, and detailed progression milestones updates.",
    icon: UserCheck,
    color: "text-cyan-400"
  }
];

export default function WhyHireMeSection() {
  return (
    <section
      id="why-hire"
      className="relative py-24 px-6 lg:px-12 flex items-center justify-center overflow-hidden"
    >
      <div className="absolute top-[30%] left-[20%] h-[320px] w-[320px] rounded-full bg-blue-500/5 blur-[120px]" />
      <div className="absolute bottom-[20%] right-[10%] h-[360px] w-[360px] rounded-full bg-purple-500/5 blur-[130px]" />

      <div className="mx-auto w-full max-w-7xl relative z-10">
        
        {/* Header Block */}
        <div className="mb-14 flex flex-col items-center text-center">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-blue-400 mb-2">
            RECRUITER PERSPECTIVE // ADVANTAGE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Why Partner With Kishan?
          </h2>
          <p className="max-w-xl text-zinc-400 text-sm leading-relaxed">
            Delivering global startup-worthy solutions through hard skills, elegant design sensibilities, and high cognitive speed.
          </p>
          <div className="mt-6 h-[2px] w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto" />
        </div>

        {/* Advantage Cards Deck */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_HIRE_DATA.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.03 }}
                className="group relative rounded-2xl border border-zinc-900 bg-zinc-950/45 p-6 backdrop-blur-sm hover:border-zinc-800 hover:bg-zinc-900/10 transition-all duration-500 text-left"
              >
                {/* Spot light line */}
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-center gap-3.5 mb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-900 bg-zinc-980 text-zinc-400 group-hover:border-blue-500/30 transition-all">
                    <Icon className={`h-4.5 w-4.5 ${item.color}`} />
                  </div>
                  <h3 className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs text-zinc-400/90 leading-relaxed font-sans">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
