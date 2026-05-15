import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { clientLogos } from "../data/team";

function LogoItem({ logo }) {
  const [currentSrc, setCurrentSrc] = useState(logo.src || logo.fallbackSrc || "");
  const isFallback = currentSrc === logo.fallbackSrc;
  const shouldLighten = logo.tone === "light" || (isFallback && logo.fallbackTone === "light");

  if (!currentSrc) {
    return null;
  }

  return (
    <div className="group flex h-16 min-w-[158px] flex-shrink-0 items-center justify-center px-3 sm:min-w-[178px] lg:min-w-[198px] lg:px-5">
      <img
        src={currentSrc}
        alt={logo.name}
        onError={() => {
          if (logo.fallbackSrc && currentSrc !== logo.fallbackSrc) {
            setCurrentSrc(logo.fallbackSrc);
            return;
          }

          setCurrentSrc("");
        }}
        className={[
          "h-10 w-[136px] object-contain opacity-90 transition-all duration-500 group-hover:scale-[1.035] group-hover:opacity-100 sm:w-[152px] lg:h-11 lg:w-[170px]",
          shouldLighten
            ? "brightness-0 invert contrast-125 drop-shadow-[0_0_16px_rgba(255,255,255,0.12)]"
            : "drop-shadow-[0_0_18px_rgba(89,255,241,0.08)]",
        ].join(" ")}
        decoding="async"
        loading="eager"
      />
    </div>
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
      className="relative z-10 overflow-hidden border-y border-line py-6 [contain:paint] sm:py-7"
    >
      <div className="marquee-track">
        {doubled.map((logo, i) => (
          <LogoItem key={`${logo.name}-${i}`} logo={logo} />
        ))}
      </div>
    </motion.section>
  );
}
