import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(true);
  const [hovered, setHovered] = useState(false);

  // Motion values for ultra fluid performance
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 220, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable customized cursor on touch screens for responsiveness
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 1024 || 'ontouchstart' in window);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);

    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const checkHover = () => {
      // Find buttons, links, clickable items to animate cursor size
      const clickables = document.querySelectorAll(
        'a, button, select, input, [role="button"], .hover-magnetic, [data-clickable]'
      );

      clickables.forEach((el) => {
        el.addEventListener("mouseenter", () => setHovered(true));
        el.addEventListener("mouseleave", () => setHovered(false));
      });
    };

    window.addEventListener("mousemove", moveCursor);

    // Initial check and dynamic poll for element changes (shadow DOM / lists updates)
    checkHover();
    const interval = setInterval(checkHover, 1500);

    return () => {
      window.removeEventListener("resize", checkViewport);
      window.removeEventListener("mousemove", moveCursor);
      clearInterval(interval);
    };
  }, [cursorX, cursorY, isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Outer elegant slow-trail glow ring */}
      <motion.div
        id="custom-trail-cursor"
        className="fixed top-0 left-0 z-[10000] pointer-events-none rounded-full border border-blue-500/30 bg-blue-500/5 mix-blend-screen -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: hovered ? 56 : 30,
          height: hovered ? 56 : 30,
        }}
        animate={{
          borderColor: hovered ? "rgba(168, 85, 247, 0.6)" : "rgba(59, 130, 246, 0.3)",
          backgroundColor: hovered ? "rgba(168, 85, 247, 0.08)" : "rgba(59, 130, 246, 0.03)"
        }}
        transition={{ duration: 0.15, ease: "linear" }}
      />

      {/* Core solid ultra-responsive dot */}
      <motion.div
        id="custom-core-cursor"
        className="fixed top-0 left-0 z-[10001] pointer-events-none h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: hovered ? 0.3 : 1
        }}
      />
    </>
  );
}
