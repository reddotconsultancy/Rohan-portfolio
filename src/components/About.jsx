import { useRef } from "react";
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
  const yOffset = OFFSETS[index];
  const stagger = index * 0.12;

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
      className="group relative w-full min-w-0 flex-1"
      style={{ y, scale, rotate }}
    >
      <div className="relative h-[340px] overflow-hidden rounded-2xl border border-line/40 transition-all duration-500 hover:border-accent/30 hover:shadow-[0_0_40px_rgba(89,255,241,0.08)] sm:h-[380px] lg:h-[420px]">
        <img
          src={image}
          alt={card.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover brightness-[0.3] transition-all duration-700 group-hover:scale-105 group-hover:brightness-[0.4]"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/80" />

        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-accent/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
          <div>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 text-base text-accent shadow-[0_0_12px_rgba(89,255,241,0.15)] backdrop-blur-md transition-transform duration-500 group-hover:scale-110 sm:h-10 sm:w-10">
              {icon}
            </span>
          </div>

          <div>
            <h3 className="font-heading text-base font-bold tracking-tight text-white transition-colors duration-400 group-hover:text-accent sm:text-lg">
              {card.title}
            </h3>

            <div className="mt-2 h-px w-8 bg-gradient-to-r from-accent/40 to-transparent transition-all duration-500 group-hover:w-16" />

            <p className="mt-3 text-[11px] leading-[1.7] text-white/70 transition-colors duration-400 group-hover:text-white/85 sm:text-[12px] sm:leading-[1.75] lg:text-[13px]">
              {card.body.length > 180
                ? card.body.slice(0, 180) + "\u2026"
                : card.body}
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
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

        <div className="mt-14 flex gap-4 sm:gap-5 lg:mt-16 lg:gap-6">
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
