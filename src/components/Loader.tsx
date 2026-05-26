import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoaderProps {
  onComplete: () => void;
}

const MEMORIES = [
  "INITIALIZING COGNITIVE INTERFACE...",
  "COMPILE RESPONSIVE CANVAS GRID...",
  "ENGAGE TAILWIND STYLING HARNESS...",
  "BOOTING REACT VIRTUAL GRID...",
  "DIALING GEOMETRIES & FLOW BUFFER...",
  "CONNECTING NEURAL REPRESENTATIVE AI...",
  "OPTIMIZING CHROMATIC GRADIENTS...",
  "CRAFTING EXCELLENCE FOR GLOBAL EYES..."
];

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [memoryIndex, setMemoryIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Quick, elegant count up
    const duration = 2400; // ms
    const step = 20; // tick rate
    const increment = 100 / (duration / step);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment + Math.random() * 2;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, step);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const exitTimer = setTimeout(() => {
        setVisible(false);
        setTimeout(onComplete, 600); // Wait for transition out
      }, 500);
      return () => clearTimeout(exitTimer);
    }
  }, [progress, onComplete]);

  useEffect(() => {
    // Cycle terminal statements
    const textTimer = setInterval(() => {
      setMemoryIndex((prev) => (prev + 1) % MEMORIES.length);
    }, 450);
    return () => clearInterval(textTimer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="preloader-panel"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black font-mono text-zinc-100"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Ambient Background Grid Glow */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:30px_30px] opacity-25" />
          <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/10 blur-[140px]" />

          <div className="relative flex w-full max-w-sm flex-col px-6">
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
              <span className="tracking-widest">KISHAN DABHI // V3.2</span>
              <span>{Math.floor(progress)}%</span>
            </div>

            {/* Slider track */}
            <div className="h-[2px] w-full bg-zinc-800 overflow-hidden rounded-full mb-6 relative">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Dynamic Status Log */}
            <div className="h-6 overflow-hidden">
              <motion.p
                key={memoryIndex}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-[10px] text-zinc-500 tracking-wider font-semibold text-center uppercase"
              >
                {MEMORIES[memoryIndex]}
              </motion.p>
            </div>

            {/* Central Branding Mark */}
            <div className="mt-16 flex flex-col items-center">
              <span className="text-zinc-600 text-[10px] tracking-[6px] mb-2 uppercase">DESIGN SYSTEM BY</span>
              <span className="text-zinc-200 text-sm tracking-[4px] uppercase font-bold">KISHAN DABHI</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
