import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ScrollProgress } from "../components/ui/ScrollProgress";
import { SectionLabel } from "../components/ui/SectionLabel";
import { SmoothReveal } from "../components/ui/SmoothReveal";
import { projects } from "../data/team";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export function ProjectsPage() {
  return (
    <div className="site-shell">
      <ScrollProgress />
      <Navbar />
      <main>
        <section className="relative z-10 overflow-hidden pt-36 pb-16 sm:pt-40 lg:pt-48 lg:pb-24">
          <div className="pointer-events-none absolute left-1/2 top-16 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-accent/[0.045] blur-[120px]" />
          <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
            <SmoothReveal>
              <div className="mx-auto max-w-4xl text-center">
                <SectionLabel text="All Projects" />
                <h1 className="mt-6 font-heading text-[2.25rem] font-black leading-[1.05] text-white sm:text-4xl lg:text-5xl">
                  Detailed Work,
                  <br />
                  Built To Move.
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/58 sm:text-lg">
                  A compact view of strategy, positioning, acquisition, and
                  product-facing work across growth, healthcare, global brand,
                  and B2B systems.
                </p>
              </div>
            </SmoothReveal>
          </div>
        </section>

        <section className="relative z-10 pb-20 lg:pb-32">
          <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
            <div className="grid gap-6 lg:gap-8">
              {projects.map((project, index) => (
                <motion.article
                  key={project.slug}
                  variants={reveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    delay: index * 0.06,
                    duration: 0.58,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group grid overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.026] shadow-[0_26px_100px_rgba(0,0,0,0.28)] transition-all duration-500 hover:border-accent/22 hover:bg-white/[0.04] lg:grid-cols-[0.95fr_1.05fr]"
                >
                  <div className="relative min-h-[260px] bg-black sm:min-h-[360px] lg:min-h-[420px]">
                    <img
                      src={project.image}
                      alt={`${project.title} case study`}
                      className="h-full w-full object-contain p-3 transition-transform duration-700 group-hover:scale-[1.018]"
                      loading={index < 2 ? "eager" : "lazy"}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
                  </div>

                  <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-accent/25 bg-accent/[0.08] px-4 py-2 text-[0.68rem] font-black uppercase tracking-[0.18em] text-accent">
                        {project.category}
                      </span>
                      <span className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-white/35">
                        Case Study {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h2 className="mt-5 font-heading text-2xl font-black leading-tight text-white sm:text-3xl lg:text-4xl">
                      {project.title}
                    </h2>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-white/62 sm:text-base">
                      {project.description}
                    </p>

                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      {[
                        ["Client", project.client],
                        ["Problem", project.problem],
                        ["Solution", project.solution],
                        ["Outcome", project.outcome],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="rounded-2xl border border-white/[0.08] bg-black/20 p-4"
                        >
                          <p className="text-[0.64rem] font-black uppercase tracking-[0.18em] text-accent/72">
                            {label}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-white/66">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-col items-center justify-between gap-5 rounded-[28px] border border-accent/18 bg-accent/[0.055] p-6 text-center sm:p-8 lg:flex-row lg:text-left"
            >
              <div>
                <p className="font-heading text-2xl font-black text-white">
                  Want this level of execution on your next project?
                </p>
                <p className="mt-2 text-sm leading-6 text-white/58">
                  Book the strategy call and bring the messy version of the
                  problem. That is usually where the useful work starts.
                </p>
              </div>
              <Link
                to="/contact-us"
                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-[#031111] transition-all duration-300 hover:-translate-y-1 hover:bg-[#7dfff4] hover:shadow-[0_20px_50px_rgba(89,255,241,0.2)]"
              >
                Work With Me
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>

            <div className="mt-8 text-center">
              <Link
                to="/contact-us"
                className="inline-flex text-xs font-black uppercase tracking-[0.16em] text-white/42 transition-colors hover:text-accent"
              >
                Prefer a written enquiry? Use the form
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
