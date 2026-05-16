import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { TextReveal } from "./ui/TextReveal";
import { MagneticWrap } from "./ui/MagneticWrap";
import { siteInfo } from "../data/team";

export function CTA() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.4], [0.88, 1]);
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.4],
    ["48px", "24px"]
  );
  const bgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-10 py-16 sm:py-24 lg:py-36"
    >
      <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
        <motion.div
          style={{ scale, borderRadius }}
          className="relative overflow-hidden"
        >
          <motion.div className="absolute inset-0" style={{ y: bgY }}>
            <img
              src="/images/bg-footer2-1.jpg"
              alt=""
              className="h-[120%] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          </motion.div>

          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "linear-gradient(135deg, rgba(89,255,241,0.1), transparent 50%, rgba(43,222,211,0.08))",
              backgroundSize: "200% 200%",
              animation: "gradientShift 8s ease infinite",
            }}
          />

          <div className="relative z-10 px-5 py-14 text-center sm:px-8 sm:py-20 lg:px-16 lg:py-28">
            <TextReveal
              text="Let's Create Something Great Together"
              as="h2"
              className="mx-auto max-w-3xl font-heading text-[2rem] font-black leading-[1.08] text-text sm:text-4xl lg:text-5xl xl:text-6xl"
            />

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-4 font-heading text-xs font-semibold uppercase tracking-[0.18em] text-accent/70 sm:text-sm sm:tracking-[0.3em]"
            >
              {siteInfo.tagline
                .split(".")
                .join(" | ")
                .replace(/^ \| /, "")
                .replace(/ \| $/, "")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-10"
            >
              <MagneticWrap strength={0.15}>
                <a
                  href={siteInfo.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex max-w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 font-heading text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.04] sm:px-8 sm:text-sm"
                  style={{
                    animation: "pulse-glow 3s ease-in-out infinite",
                    color: "#000000",
                  }}
                >
                  Book a 30-min Strategy Call
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#000000"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </MagneticWrap>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
