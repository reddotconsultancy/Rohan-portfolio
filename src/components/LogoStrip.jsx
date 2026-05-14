import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { clientLogos } from "../data/team";

export function LogoStrip() {
  const doubled = [...clientLogos, ...clientLogos];
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity }}
      className="relative z-10 overflow-hidden border-y border-line py-12 [contain:paint]"
    >
      <div className="marquee-track">
        {doubled.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="flex flex-shrink-0 items-center justify-center px-10 lg:px-14"
          >
            <img
              src={logo.src}
              alt={logo.name}
              className="h-10 w-auto opacity-80 transition-all duration-500 hover:opacity-100 hover:scale-105 lg:h-12"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </motion.section>
  );
}
