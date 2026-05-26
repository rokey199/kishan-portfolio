import { motion } from "motion/react";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { Experience } from "../types";

const TIMELINE_DATA: Experience[] = [
  {
    role: "Senior Full-Stack & Web Developer",
    company: "Freelance & Global Agencies",
    period: "2022 - PRESENT",
    location: "Ahmedabad & Surat, India (Remote)",
    responsibilities: [
      "Designed and developed highly-interactive custom React JS applications & modern SaaS marketing portfolios.",
      "Engineered bespoke WordPress themes & modular WooCommerce hubs with dynamic UI/UX motions.",
      "Configured robust Shopify premium storefronts with tailored Liquid layouts & speed optimizations.",
      "Improved performance parameters recursively to secure 95+ Lighthouse scores across user endpoints.",
      "Delivered over 50 commercial websites independently, handling direct international client communications."
    ]
  },
  {
    role: "Frontend Developer & WordPress Engineer",
    company: "Creative Studio Agency",
    period: "2020 - 2022",
    location: "Ahmedabad, Gujarat, India",
    responsibilities: [
      "Built responsive pixel-perfect landing grids and business sites from architectural Figma design blueprints.",
      "Created fluid, multi-tier site layouts using Tailwind CSS, Bootstrap, and classic CSS structures.",
      "Managed website migrations, domain DNS integrations, and performance debugging metrics.",
      "Implemented SEO baseline schemas enabling higher search placements for dynamic client assets.",
      "Worked collaboratively inside Git/GitHub environments with developers and product teams."
    ]
  }
];

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative min-h-screen py-24 px-6 lg:px-12 flex items-center justify-center overflow-hidden"
    >
      {/* Visual background atmospheric elements */}
      <div className="absolute top-[30%] left-[10%] h-[350px] w-[350px] rounded-full bg-blue-500/5 blur-[120px]" />
      <div className="absolute bottom-[20%] right-[10%] h-[300px] w-[300px] rounded-full bg-purple-500/5 blur-[130px]" />

      <div className="mx-auto w-full max-w-4xl relative z-10">
        
        {/* Header Block */}
        <div className="mb-16 flex flex-col items-start text-left">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-blue-400 mb-2">
            CHRONOLOGY OF WORK // MILESTONES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Professional Timeline
          </h2>
          <div className="mt-4 h-[2px] w-20 bg-gradient-to-r from-blue-500 to-purple-500" />
        </div>

        {/* Timeline Stem Nodes */}
        <div className="relative border-l border-zinc-800 ml-3 md:ml-6 space-y-12">
          
          {TIMELINE_DATA.map((item, idx) => (
            <motion.div
              key={item.role + item.period}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative pl-8 sm:pl-12 text-left"
            >
              
              {/* Central Glowing Icon Node */}
              <span className="absolute -left-4 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950 border border-zinc-800 ring-4 ring-black">
                <Briefcase className="h-3.5 w-3.5 text-blue-400" />
              </span>

              {/* Box Content Cards */}
              <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-6 md:p-8 backdrop-blur-sm hover:border-zinc-800 transition-all">
                
                {/* Meta details desk */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-zinc-100">
                      {item.role}
                    </h3>
                    <p className="text-xs text-blue-400/90 font-mono tracking-widest uppercase mt-0.5">
                      {item.company}
                    </p>
                  </div>
                  
                  {/* Period indicator tag */}
                  <div className="flex items-center gap-1.5 rounded-full bg-zinc-900 border border-zinc-800 px-3.5 py-1 font-mono text-[9px] tracking-wider text-zinc-400 font-bold uppercase transition-colors">
                    <Calendar className="h-3 w-3 text-zinc-500" />
                    {item.period}
                  </div>
                </div>

                {/* Location indicator */}
                <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] uppercase font-mono tracking-widest mb-6">
                  <MapPin className="h-3 w-3 text-zinc-600" />
                  {item.location}
                </div>

                {/* Bullets array list */}
                <ul className="space-y-3">
                  {item.responsibilities.map((resp) => (
                    <li key={resp} className="flex items-start gap-3 text-xs text-zinc-400/95 leading-relaxed">
                      <CheckCircle2 className="h-4 w-4 text-purple-500/85 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}
