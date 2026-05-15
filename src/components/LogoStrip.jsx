import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { clientLogos } from "../data/team";

function LogoMark({ logo }) {
  if (logo.src) {
    return (
      <img
        src={logo.src}
        alt={logo.name}
        className={[
          "max-h-10 w-auto max-w-[160px] object-contain opacity-90 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100 lg:max-h-12 lg:max-w-[190px]",
          logo.tone === "light"
            ? "brightness-0 invert contrast-125 drop-shadow-[0_0_16px_rgba(255,255,255,0.12)]"
            : "drop-shadow-[0_0_18px_rgba(89,255,241,0.08)]",
        ].join(" ")}
        loading="lazy"
      />
    );
  }

  return (
    <span
      aria-label={logo.name}
      className="font-heading text-xl font-black uppercase tracking-[0.14em] text-white/88 drop-shadow-[0_0_18px_rgba(255,255,255,0.1)] transition-all duration-500 group-hover:text-accent group-hover:drop-shadow-[0_0_18px_rgba(89,255,241,0.25)] lg:text-2xl"
    >
      {logo.wordmark}
    </span>
  );
}

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
            className="group flex h-24 min-w-[220px] flex-shrink-0 items-center justify-center px-8 lg:min-w-[260px] lg:px-12"
          >
            <LogoMark logo={logo} />
          </div>
        ))}
      </div>
    </motion.section>
  );
}
