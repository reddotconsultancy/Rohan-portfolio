import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { SectionLabel } from "./ui/SectionLabel";
import { SmoothReveal } from "./ui/SmoothReveal";
import { expertBio, siteInfo } from "../data/team";

export function Team() {
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const imgRotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  return (
    <section className="relative z-10 py-28 lg:py-36">
      <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
        <SmoothReveal>
          <div className="text-center">
            <SectionLabel text="Our Team" />
            <h2 className="mt-4 font-heading text-3xl font-black text-text sm:text-4xl lg:text-5xl">
              Meet With The Expert
            </h2>
          </div>
        </SmoothReveal>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1fr_0.92fr] lg:gap-20">
          <SmoothReveal direction="left">
            <div className="space-y-5">
              {expertBio.paragraphs.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`text-base leading-relaxed ${
                    para.startsWith("Phil 4:13")
                      ? "font-heading text-lg font-bold italic text-accent"
                      : "text-muted"
                  }`}
                >
                  {para}
                </motion.p>
              ))}
            </div>
          </SmoothReveal>

          <SmoothReveal direction="right">
            <div className="relative" ref={imgRef}>
              <motion.div
                style={{ y: imgY, rotateZ: imgRotate }}
                className="aspect-square overflow-hidden rounded-2xl border border-line"
              >
                <img
                  src={expertBio.image}
                  alt={expertBio.name}
                  className="w-full object-cover"
                  loading="lazy"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-6 text-center"
              >
                <h3 className="font-heading text-xl font-bold text-text">
                  {expertBio.name}
                </h3>
                <p className="text-sm text-accent">{expertBio.title}</p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.7,
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                  className="mt-4 flex justify-center gap-4"
                >
                  <motion.a
                    href={siteInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/25 bg-accent/[0.06] text-accent transition-all duration-400 hover:border-accent/50 hover:bg-accent/15 hover:shadow-[0_0_24px_rgba(89,255,241,0.2)]"
                    aria-label="LinkedIn"
                    whileHover={{ scale: 1.2, rotate: 8 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      y: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    <FaLinkedinIn size={18} />
                  </motion.a>
                  <motion.a
                    href={siteInfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/25 bg-accent/[0.06] text-accent transition-all duration-400 hover:border-accent/50 hover:bg-accent/15 hover:shadow-[0_0_24px_rgba(89,255,241,0.2)]"
                    aria-label="Instagram"
                    whileHover={{ scale: 1.2, rotate: -8 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      y: {
                        duration: 3,
                        repeat: Infinity,
                        delay: 0.5,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    <FaInstagram size={18} />
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          </SmoothReveal>
        </div>
      </div>
    </section>
  );
}
