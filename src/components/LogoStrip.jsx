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
      ? "w-[220px] sm:w-[260px] lg:w-[292px]"
      : "w-[196px] sm:w-[232px] lg:w-[260px]";

  if (!currentSrc) {
    return null;
  }

  return (
    <div className={`group flex h-16 flex-shrink-0 items-center justify-center px-6 ${laneClass}`}>
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
          "h-10 w-[148px] object-contain opacity-90 transition-opacity duration-500 group-hover:opacity-100 sm:w-[166px] lg:h-11 lg:w-[184px]",
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
  const splitIndex = Math.ceil(clientLogos.length / 2);
  const topLogos = clientLogos.slice(0, splitIndex);
  const bottomLogos = clientLogos.slice(splitIndex);
  const topRow = [...topLogos, ...topLogos];
  const bottomRow = [...bottomLogos, ...bottomLogos];
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
      className="relative z-10 overflow-hidden py-14 [contain:paint] sm:py-16 lg:py-18"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto mb-16 px-6 text-center sm:mb-[4.5rem] lg:mb-20"
      >
        <h2 className="font-heading text-3xl font-black tracking-[0.02em] text-accent drop-shadow-[0_0_30px_rgba(89,255,241,0.32)] sm:text-4xl lg:text-5xl">
          Trusted By
        </h2>
      </motion.div>
      <div className="relative space-y-6 sm:space-y-8">
        <div className="marquee-track logo-marquee-row">
          {topRow.map((logo, i) => (
            <LogoItem key={`top-${logo.name}-${i}`} logo={logo} />
          ))}
        </div>
        <div className="marquee-track logo-marquee-row marquee-track-reverse">
          {bottomRow.map((logo, i) => (
            <LogoItem key={`bottom-${logo.name}-${i}`} logo={logo} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
