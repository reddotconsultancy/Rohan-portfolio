import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const HOVER_SELECTORS = "a, button, [data-hover], .glass-card, .group";

export function CursorFollower() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [hovered, setHovered] = useState(false);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e) => {
      if (e.target.closest(HOVER_SELECTORS)) setHovered(true);
    };

    const out = (e) => {
      if (e.target.closest(HOVER_SELECTORS)) setHovered(false);
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
    };
  }, [x, y]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-difference lg:block"
        style={{ x: springX, y: springY }}
        animate={{
          width: hovered ? 48 : 20,
          height: hovered ? 48 : 20,
          backgroundColor: hovered
            ? "rgba(89,255,241,0.15)"
            : "transparent",
          borderWidth: hovered ? 2 : 1,
          borderColor: hovered
            ? "rgba(89,255,241,0.6)"
            : "rgba(89,255,241,0.4)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />

      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent lg:block"
        style={{ x, y }}
        animate={{
          scale: hovered ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
