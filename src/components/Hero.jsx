import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { heroContent, siteInfo } from "../data/team";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-black py-28 sm:py-32"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY, scale: bgScale }}
      >
        <img
          src="/images/kyle-brinker-0vVHYD3PcKo-unsplash_3-1.jpg"
          alt=""
          className="h-full w-full object-cover"
          style={{ objectPosition: "top center" }}
          loading="eager"
        />
      </motion.div>

      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/20 via-transparent to-black/80" />

      <div className="pointer-events-none absolute inset-0 z-[2]">
        <motion.div
          className="absolute left-[10%] top-[20%] h-[300px] w-[300px] rounded-full bg-accent/[0.04] blur-[80px]"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -25, 15, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[15%] bottom-[25%] h-[250px] w-[250px] rounded-full bg-accent/[0.03] blur-[70px]"
          animate={{
            x: [0, -25, 20, 0],
            y: [0, 20, -15, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex w-full max-w-[1380px] flex-col items-center justify-center px-6 text-center lg:px-10"
      >
        <motion.div variants={item}>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-white/[0.04] px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {heroContent.eyebrow}
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="mx-auto mt-12 max-w-5xl font-heading text-[2.35rem] font-black leading-[1.06] tracking-tight text-white sm:mt-16 sm:text-5xl md:text-6xl lg:mt-24 lg:text-[68px]"
        >
          {heroContent.title}
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#d0d5de] sm:text-lg"
        >
          {heroContent.body}
        </motion.p>

        <motion.div variants={item} className="mt-10">
          <a
            href={siteInfo.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-accent/20 bg-accent px-7 py-4 text-sm font-bold uppercase tracking-wider backdrop-blur-sm transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_50px_rgba(89,255,241,0.35)] sm:px-8"
            style={{ color: "#000000" }}
          >
            Let&apos;s Talk
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#000000"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/50">
          Scroll
        </span>
        <div className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  );
}
