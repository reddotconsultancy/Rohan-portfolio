import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function GlowLine({ className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scaleX = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className={`relative h-px w-full ${className}`}>
      <motion.div
        className="h-px origin-left bg-gradient-to-r from-transparent via-accent/60 to-transparent"
        style={{ scaleX, opacity }}
      />
      <motion.div
        className="absolute inset-0 h-px origin-left bg-gradient-to-r from-transparent via-accent/30 to-transparent blur-sm"
        style={{ scaleX, opacity }}
      />
    </div>
  );
}
