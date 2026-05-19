import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { SectionLabel } from "./ui/SectionLabel";
import { SmoothReveal } from "./ui/SmoothReveal";
import { projects } from "../data/team";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const marqueeProjects = [...projects, ...projects];

  return (
    <section
      id="projects"
      className="relative z-10 overflow-hidden py-14 sm:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="pointer-events-none absolute left-[8%] top-20 h-72 w-72 rounded-full bg-accent/[0.025] blur-[90px]" />

      <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
        <SmoothReveal>
          <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel text="Projects" />
              <h2 className="mt-5 max-w-2xl font-heading text-[2.1rem] font-black leading-[1.06] tracking-tight text-white sm:mt-6 sm:text-4xl lg:text-5xl">
                Discover Our
                <br />
                Completed Work
              </h2>
            </div>

            <Link
              to="/projects"
              className="inline-flex w-fit max-w-full items-center justify-center rounded-full bg-[#59fff1] px-6 py-3 text-[0.7rem] font-black uppercase tracking-[0.14em] !text-[#031111] shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_18px_42px_rgba(89,255,241,0.16)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#7dfff4] hover:!text-[#031111] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_22px_54px_rgba(89,255,241,0.24)] sm:px-7 sm:py-3.5 sm:text-xs"
            >
              All Projects
            </Link>
          </div>
        </SmoothReveal>

        <div className="relative mt-9 overflow-hidden sm:mt-12 lg:mt-14">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-background-raised to-transparent sm:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-background-raised to-transparent sm:w-28" />

          <div className="project-marquee flex w-max gap-5 pb-5 [contain:paint] lg:gap-7">
            {marqueeProjects.map((project, index) => (
              <motion.button
                type="button"
                key={`${project.title}-${index}`}
                onClick={() => setSelectedProject(project)}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative w-[84vw] max-w-[620px] overflow-hidden rounded-[20px] border border-white/8 bg-[#090c10] text-left shadow-[0_18px_70px_rgba(0,0,0,0.32)] transition-all duration-500 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_24px_80px_rgba(0,0,0,0.45)] focus:outline-none focus-visible:border-accent/60 focus-visible:ring-2 focus-visible:ring-accent/30 sm:w-[520px] sm:rounded-[22px] lg:w-[31vw]"
                aria-label={`Open ${project.title} case study`}
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

                <div className="flex items-center justify-between gap-3 border-t border-white/[0.06] px-4 py-4 sm:gap-4 sm:px-5">
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
              </motion.button>
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

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-start justify-center bg-black/76 px-4 pb-5 pt-[116px] backdrop-blur-xl sm:pt-[124px] lg:items-center lg:py-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.article
              className="relative grid max-h-[calc(100svh-138px)] w-full max-w-4xl overflow-hidden rounded-[22px] border border-accent/18 bg-[#07090f] shadow-[0_28px_100px_rgba(0,0,0,0.68)] lg:max-h-[72vh] lg:grid-cols-[0.95fr_0.9fr]"
              initial={{ y: 20, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 12, scale: 0.985, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-accent/25 bg-[#05080b]/88 text-white shadow-[0_14px_34px_rgba(0,0,0,0.38)] backdrop-blur-xl transition-all hover:bg-accent hover:text-[#031111]"
                aria-label="Close project preview"
              >
                <X size={16} />
              </button>

              <div className="relative min-h-[190px] bg-black sm:min-h-[240px] lg:min-h-0">
                <img
                  src={selectedProject.image}
                  alt={`${selectedProject.title} detailed case study`}
                  className="h-full w-full object-contain p-4 lg:p-5"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/42 via-transparent to-transparent" />
              </div>

              <div className="custom-scrollbar max-h-[calc(100svh-328px)] overflow-y-auto p-5 pr-12 sm:max-h-[calc(100svh-390px)] sm:p-6 sm:pr-12 lg:max-h-[72vh] lg:p-6 lg:pr-12">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex rounded-full border border-accent/25 bg-accent/[0.08] px-3.5 py-1.5 text-[0.64rem] font-black uppercase tracking-[0.17em] text-accent">
                    {selectedProject.category}
                  </span>
                  <span className="text-[0.64rem] font-black uppercase tracking-[0.17em] text-white/32">
                    Case preview
                  </span>
                </div>
                <h3 className="mt-4 font-heading text-xl font-black leading-tight text-white sm:text-2xl">
                  {selectedProject.title}
                </h3>
                <p className="mt-2 text-[0.82rem] leading-6 text-white/60">
                  {selectedProject.description}
                </p>

                <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {[
                    ["Client", selectedProject.client],
                    ["Problem", selectedProject.problem],
                    ["Solution", selectedProject.solution],
                    ["Outcome", selectedProject.outcome],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-[18px] border border-white/[0.08] bg-white/[0.03] p-3"
                    >
                      <p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-accent/78">
                        {label}
                      </p>
                      <p className="mt-1.5 text-[0.78rem] leading-5 text-white/68">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/projects"
                    onClick={() => setSelectedProject(null)}
                    className="inline-flex items-center justify-center rounded-full border border-accent/25 px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-accent transition-all hover:bg-accent/10"
                  >
                    View all projects
                  </Link>
                  <Link
                    to="/contact-us"
                    onClick={() => setSelectedProject(null)}
                    className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-[#031111] transition-all hover:bg-[#7dfff4]"
                  >
                    Start an enquiry
                  </Link>
                </div>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
