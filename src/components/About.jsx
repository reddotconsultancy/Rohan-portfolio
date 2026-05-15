import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { SectionLabel } from "./ui/SectionLabel";
import { SmoothReveal } from "./ui/SmoothReveal";
import { aboutCards } from "../data/team";

const CARD_IMAGES = [
  "/images/gtm-hero.jpg",
  "/images/ai-hero.jpg",
  "/images/brand-hero.jpg",
  "/images/leadership-hero.jpg",
  "/images/alliance-hero.jpg",
];

const CARD_ICONS = ["\u2726", "\u2691", "\u2662", "\u2609", "\u2698"];

const OFFSETS = [40, -30, 50, -25, 45];

function ContentCard({ card, image, icon, index, sectionProgress }) {
  const [flipped, setFlipped] = useState(false);
  const yOffset = OFFSETS[index];
  const stagger = index * 0.12;
  const preview =
    card.body.length > 180 ? card.body.slice(0, 180) + "..." : card.body;

  const y = useTransform(
    sectionProgress,
    [0 + stagger, 0.3 + stagger, 0.7 + stagger, 1],
    [yOffset * 2, -yOffset, yOffset * 0.5, -yOffset * 1.5]
  );

  const scale = useTransform(
    sectionProgress,
    [0 + stagger, 0.4 + stagger, 0.6 + stagger, 1],
    [0.95, 1.03, 1, 0.97]
  );

  const rotate = useTransform(
    sectionProgress,
    [0, 0.5, 1],
    [index % 2 === 0 ? -1.5 : 1.5, 0, index % 2 === 0 ? 1 : -1]
  );

  return (
    <motion.div
      className="group relative min-w-[72vw] snap-center sm:min-w-[260px] lg:min-w-0 lg:flex-1"
      style={{ y, scale, rotate }}
      role="button"
      tabIndex={0}
      aria-label={`${card.title} details`}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onFocus={() => setFlipped(true)}
      onBlur={() => setFlipped(false)}
      onClick={() => setFlipped((value) => !value)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setFlipped((value) => !value);
        }
      }}
    >
      <div className="relative h-[420px] outline-none [perspective:1200px] sm:h-[400px] lg:h-[420px]">
        <motion.div
          className="relative h-full w-full"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-2xl border border-line/40 bg-[#07090f] transition-all duration-500 [backface-visibility:hidden] group-hover:border-accent/30 group-hover:shadow-[0_0_40px_rgba(89,255,241,0.08)]">
            <img
              src={image}
              alt={card.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover brightness-[0.28] transition-all duration-700 group-hover:scale-105 group-hover:brightness-[0.38]"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/25 to-black/88" />

            <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 text-base text-accent shadow-[0_0_12px_rgba(89,255,241,0.15)] backdrop-blur-md transition-transform duration-500 group-hover:scale-110 sm:h-10 sm:w-10">
                {icon}
              </span>

              <div>
                <h3 className="font-heading text-base font-bold tracking-tight text-white transition-colors duration-400 group-hover:text-accent sm:text-lg">
                  {card.title}
                </h3>

                <div className="mt-2 h-px w-8 bg-gradient-to-r from-accent/40 to-transparent transition-all duration-500 group-hover:w-16" />

                <p className="mt-3 text-[11px] leading-[1.7] text-white/70 transition-colors duration-400 group-hover:text-white/85 sm:text-[12px] sm:leading-[1.75] lg:text-[13px]">
                  {preview}
                </p>
              </div>
            </div>
          </div>

          <div
            className="absolute inset-0 overflow-hidden rounded-2xl border border-accent/30 bg-[#07090f]/95 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.36)] [backface-visibility:hidden] sm:p-6"
            style={{ transform: "rotateY(180deg)" }}
          >
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent" />
            <div className="flex h-full flex-col">
              <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-accent/25 bg-accent/[0.08] text-base text-accent">
                {icon}
              </span>
              <h3 className="font-heading text-lg font-black leading-tight text-white">
                {card.title}
              </h3>
              <div className="mt-3 h-px w-14 bg-gradient-to-r from-accent/50 to-transparent" />
              <div className="custom-scrollbar mt-5 min-h-0 flex-1 overflow-y-auto pr-2">
                <p className="text-[12px] leading-[1.85] text-white/72 sm:text-[13px]">
                  {card.body}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="pointer-events-none absolute -bottom-4 left-1/2 h-12 w-[70%] -translate-x-1/2 rounded-full bg-accent/[0.04] blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
    </motion.div>
  );
}

export function About() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 overflow-hidden py-28 lg:py-40"
    >
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.025] blur-[140px]" />
      </div>

      <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
        <SmoothReveal>
          <div className="text-center">
            <SectionLabel text="About" />
            <h2 className="mx-auto mt-5 max-w-xl font-heading text-3xl font-black leading-[1.1] text-text sm:text-4xl lg:text-5xl">
              We Are More{" "}
              <span className="bg-gradient-to-r from-accent via-[#7dfff2] to-accent-strong bg-clip-text text-transparent">
                Than Agency
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
              Strategic depth meets execution precision.
              We build what others only advise on.
            </p>
          </div>
        </SmoothReveal>

        <div className="custom-scrollbar -mx-6 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-8 sm:gap-5 lg:mx-0 lg:mt-16 lg:overflow-visible lg:px-0 lg:pb-0 lg:gap-6">
          {aboutCards.map((card, i) => (
            <ContentCard
              key={card.title}
              card={card}
              image={CARD_IMAGES[i]}
              icon={CARD_ICONS[i]}
              index={i}
              sectionProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
