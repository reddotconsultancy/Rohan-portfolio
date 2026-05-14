import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function HorizontalMarquee({
  text,
  className = "",
  speed = 300,
  direction = "left",
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "left" ? [0, -speed] : [-speed, 0]
  );

  return (
    <div
      ref={ref}
      className={`overflow-hidden whitespace-nowrap py-8 [contain:paint] ${className}`}
    >
      <motion.div style={{ x, willChange: "transform" }} className="inline-flex gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-8 font-heading text-6xl font-black uppercase tracking-tight text-white/[0.04] sm:text-7xl lg:text-[120px]"
          >
            {text}
            <span className="text-accent/10">&#x2726;</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
