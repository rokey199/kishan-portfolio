import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { Testimonial } from "../types";

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "t-1",
    name: "John Miller",
    role: "Director of Operations",
    company: "Apex Tech Labs",
    content: "Kishan built our core Shopify storefront from the ground up. Not only did our loading speeds double, but the interactive design elements directly lifted our conversion rates by 22%. He is an elite developer.",
    rating: 5
  },
  {
    id: "t-2",
    name: "Sarah Jenkins",
    role: "Founder & Creative Director",
    company: "Svelte Studio Agency",
    content: "The beautiful React and Framer Motion elements Kishan integrated into our agency website earned us accolades from our peers. His attention to micro-interactions and pixel-perfect design matches Apple's design ethics.",
    rating: 5
  },
  {
    id: "t-3",
    name: "Rajesh Patel",
    role: "Product Owner",
    company: "Gujarat Infra Build",
    content: "Kishan handled our corporate WordPress customization flawlessly. He has an incredible problem-solving mindset and communicated every step perfectly. We will definitely collaborate with him again of course.",
    rating: 5
  }
];

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const current = TESTIMONIALS_DATA[activeIndex];

  return (
    <section
      id="testimonials"
      className="relative py-24 px-6 lg:px-12 flex items-center justify-center overflow-hidden"
    >
      <div className="absolute top-[30%] right-[10%] h-[320px] w-[320px] rounded-full bg-indigo-505/5 blur-[120px]" />
      <div className="absolute bottom-[20%] left-[10%] h-[350px] w-[350px] rounded-full bg-blue-500/5 blur-[130px]" />

      <div className="mx-auto w-full max-w-4xl relative z-10">
        
        {/* Header Block */}
        <div className="mb-14 flex flex-col items-center text-center">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-purple-400 mb-2">
            INTELLIGENT REVIEWS // ENDORSEMENTS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Client Testimonials
          </h2>
          <div className="mt-4 h-[2px] w-20 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto" />
        </div>

        {/* Testimonial slider layout */}
        <div className="relative min-h-[300px] flex flex-col justify-center">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.97, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -15 }}
              transition={{ duration: 0.45 }}
              className="relative rounded-3xl border border-zinc-900 bg-zinc-950/45 p-8 sm:p-12 backdrop-blur-md text-left overflow-hidden shadow-2xl"
            >
              {/* Backing decorative glows */}
              <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-purple-500/5 blur-3xl" />
              <Quote className="absolute top-6 left-6 h-12 w-12 text-zinc-800/25 pointer-events-none" />

              {/* Rating stars */}
              <div className="flex items-center gap-1 mb-5">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Core review context quote */}
              <p className="text-lg sm:text-xl text-zinc-200 font-medium leading-relaxed font-sans mb-8">
                &ldquo;{current.content}&rdquo;
              </p>

              {/* Author descriptor bio block */}
              <div className="flex items-center gap-4 pt-6 border-t border-zinc-900">
                {/* Client Avatar initial bubble */}
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center font-mono text-xs font-bold text-white uppercase sm:text-sm">
                  {current.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-100">{current.name}</h4>
                  <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mt-0.5">
                    {current.role} &mdash; <span className="text-blue-400">{current.company}</span>
                  </p>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Navigation selectors and indicators */}
          <div className="mt-8 flex items-center justify-between">
            {/* Slide dots */}
            <div className="flex gap-2">
              {TESTIMONIALS_DATA.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setActiveIndex(dotIdx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === dotIdx ? "w-6 bg-purple-400" : "w-1.5 bg-zinc-800 hover:bg-zinc-700"
                  }`}
                />
              ))}
            </div>

            {/* Prev/Next buttons */}
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950/40 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all focus:outline-none"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={handleNext}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950/40 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all focus:outline-none"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
