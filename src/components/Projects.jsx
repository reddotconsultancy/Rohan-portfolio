import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "./ui/SectionLabel";
import { SmoothReveal } from "./ui/SmoothReveal";
import { projects } from "../data/team";

function FeaturedCard({ project, index }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const imgScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1.08, 1, 1.03]
  );

  const isReversed = index % 2 !== 0;

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        delay: 0.1,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group grid items-center gap-8 lg:grid-cols-2 lg:gap-12 ${
        isReversed ? "lg:direction-rtl" : ""
      }`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden rounded-2xl border border-line/40 transition-all duration-700 group-hover:border-accent/25 group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.5),0_0_40px_rgba(89,255,241,0.06)] ${
          isReversed ? "lg:order-2" : ""
        }`}
      >
        <div className="relative h-[280px] overflow-hidden sm:h-[340px] lg:h-[380px]">
          <motion.div
            style={{ y: imgY, scale: imgScale }}
            className="absolute inset-0"
          >
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover transition-all duration-700 group-hover:brightness-[0.7]"
              loading="lazy"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className={isReversed ? "lg:order-1 lg:text-right" : ""}>
        <motion.span
          initial={{ opacity: 0, x: isReversed ? 10 : -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-block rounded-full border border-accent/30 bg-accent/[0.08] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-accent backdrop-blur-md"
        >
          {project.category}
        </motion.span>

        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-4 font-heading text-2xl font-black text-white transition-colors duration-300 group-hover:text-accent sm:text-3xl lg:text-4xl"
        >
          {project.title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-3 max-w-md text-[15px] leading-relaxed text-white/60 transition-colors duration-300 group-hover:text-white/75"
          style={isReversed ? { marginLeft: "auto" } : {}}
        >
          {project.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className={`mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent transition-all duration-300 group-hover:gap-3 ${
            isReversed ? "lg:justify-end" : ""
          }`}
        >
          <span>View Details</span>
          <ArrowUpRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </motion.div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative z-10 py-28 lg:py-36">
      <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
        <SmoothReveal>
          <div className="mb-6 text-center">
            <SectionLabel text="Case Studies" />
            <h2 className="mt-4 font-heading text-3xl font-black text-text sm:text-4xl lg:text-5xl">
              My Work{" "}
              <span className="bg-gradient-to-r from-accent via-[#7dfff2] to-accent-strong bg-clip-text text-transparent">
                Space
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted">
              What projects have I worked on?
            </p>
          </div>
        </SmoothReveal>

        <div className="mt-14 space-y-16 lg:space-y-24">
          {projects.map((project, i) => (
            <FeaturedCard
              key={project.title}
              project={project}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
