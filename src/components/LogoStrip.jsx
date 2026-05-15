import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { clientLogos } from "../data/team";

function LogoItem({ logo }) {
  const [currentSrc, setCurrentSrc] = useState(logo.src || logo.fallbackSrc || "");
  const isFallback = currentSrc === logo.fallbackSrc;
  const shouldLighten = logo.tone === "light" || (isFallback && logo.fallbackTone === "light");
  const visualScale = logo.scale || 1;
  const laneClass =
    logo.lane === "wide"
      ? "w-[214px] sm:w-[232px] lg:w-[250px]"
      : "w-[188px] sm:w-[206px] lg:w-[224px]";

  if (!currentSrc) {
    return null;
  }

  return (
    <div className={`group flex h-16 flex-shrink-0 items-center justify-center px-5 ${laneClass}`}>
      <img
        src={currentSrc}
        alt={logo.name}
        style={{ transform: `scale(${visualScale})` }}
        onError={() => {
          if (logo.fallbackSrc && currentSrc !== logo.fallbackSrc) {
            setCurrentSrc(logo.fallbackSrc);
            return;
          }

          setCurrentSrc("");
        }}
        className={[
          "h-10 w-[148px] object-contain opacity-90 transition-opacity duration-500 group-hover:opacity-100 sm:w-[160px] lg:h-11 lg:w-[172px]",
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
