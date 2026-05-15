import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionLabel } from "./ui/SectionLabel";
import { SmoothReveal } from "./ui/SmoothReveal";
import { blogPosts } from "../data/team";

export function Blog() {
  return (
    <section className="relative z-10 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-9 lg:px-12">
        <SmoothReveal>
          <div className="text-center">
            <SectionLabel text="Our Blog" />
            <h2 className="mx-auto mt-4 max-w-3xl font-heading text-3xl font-black leading-[1.08] text-text sm:text-4xl lg:text-5xl">
              Practical Notes on AI, Growth and Systems
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              Short, useful reads for founders and teams building cleaner
              revenue engines, stronger operations, and smarter AI workflows.
            </p>
          </div>
        </SmoothReveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-6 lg:gap-6 xl:gap-7">
          {blogPosts.map((post, i) => {
            const fillLastDesktopRow = blogPosts.length % 3 === 2 && i >= blogPosts.length - 2;
            const fillLastTabletRow = blogPosts.length % 2 === 1 && i === blogPosts.length - 1;

            return (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  delay: i * 0.06,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={[
                  "h-full lg:col-span-2",
                  fillLastDesktopRow ? "lg:col-span-3" : "",
                  fillLastTabletRow ? "sm:col-span-2 lg:col-span-3" : "",
                ].join(" ")}
              >
                <Link
                  to={post.link}
                  className="group relative flex h-full min-h-[250px] overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.026] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/25 hover:bg-white/[0.045] hover:shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:min-h-[270px] sm:p-6 lg:min-h-[286px]"
                >
                  <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/[0.035] blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <article className="flex min-w-0 flex-1 flex-col justify-between gap-7">
                    <div>
                      <div className="mb-4 flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-accent/20 bg-accent/[0.07] px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.18em] text-accent">
                          {post.tag}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/45">
                          <Clock size={13} />
                          {post.readTime}
                        </span>
                        <span className="ml-auto text-[0.65rem] font-black uppercase tracking-[0.18em] text-white/20">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <h3 className="font-heading text-xl font-black leading-tight text-white transition-colors duration-300 group-hover:text-accent sm:text-[1.45rem]">
                        {post.title}
                      </h3>
                      <p className="mt-3 overflow-hidden text-sm leading-relaxed text-white/58 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] sm:text-[0.94rem]">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/[0.07] pt-4">
                      <span className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-white/38 transition-colors duration-300 group-hover:text-white/58">
                        Read article
                      </span>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white/55 transition-all duration-300 group-hover:border-accent/35 group-hover:bg-accent group-hover:text-[#031111]">
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </article>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
