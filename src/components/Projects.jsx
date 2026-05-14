import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionLabel } from "./ui/SectionLabel";
import { SmoothReveal } from "./ui/SmoothReveal";
import { projects } from "../data/team";

export function Projects() {
  const marqueeProjects = [...projects, ...projects];

  return (
    <section
      id="projects"
      className="relative z-10 overflow-hidden py-20 sm:py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="pointer-events-none absolute left-[8%] top-20 h-72 w-72 rounded-full bg-accent/[0.025] blur-[90px]" />

      <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
        <SmoothReveal>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel text="Projects" />
              <h2 className="mt-6 max-w-3xl font-heading text-[clamp(2.75rem,8vw,5.8rem)] font-black leading-[0.98] tracking-tight text-white">
                Discover Our
                <br />
                Completed Work
              </h2>
            </div>

            <Link
              to="/contact-us"
              className="inline-flex w-fit items-center justify-center rounded-full bg-[#59fff1] px-8 py-4 text-sm font-black uppercase tracking-[0.14em] !text-[#031111] shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_18px_42px_rgba(89,255,241,0.16)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#7dfff4] hover:!text-[#031111] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_22px_54px_rgba(89,255,241,0.24)]"
            >
              All Projects
            </Link>
          </div>
        </SmoothReveal>

        <div className="relative mt-14 overflow-hidden lg:mt-20">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-background-raised to-transparent sm:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-background-raised to-transparent sm:w-28" />

          <div className="project-marquee flex w-max gap-5 pb-5 [contain:paint] lg:gap-7">
            {marqueeProjects.map((project, index) => (
              <motion.article
                key={`${project.title}-${index}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative w-[82vw] max-w-[620px] overflow-hidden rounded-[22px] border border-white/8 bg-[#090c10] shadow-[0_18px_70px_rgba(0,0,0,0.32)] transition-all duration-500 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:w-[520px] lg:w-[31vw]"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-black">
                  <img
                    src={project.image}
                    alt={`${project.title} case study`}
                    className="h-full w-full object-contain p-1 transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10 opacity-70" />
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-white/[0.06] px-5 py-4">
                  <div>
                    <span className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-accent/65">
                      {project.category}
                    </span>
                    <h3 className="mt-1 font-heading text-lg font-black leading-tight text-white">
                      {project.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 max-w-[28rem] text-xs leading-relaxed text-white/58">
                      {project.description}
                    </p>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/20 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-[#031111]">
                    <ArrowRight size={17} />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-7 h-px w-full overflow-hidden rounded-full bg-white/[0.06] lg:hidden">
          <motion.div
            className="h-full w-1/3 bg-accent/60"
            animate={{ x: ["0%", "200%", "0%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </section>
  );
}
