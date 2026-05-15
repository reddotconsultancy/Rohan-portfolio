import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionLabel } from "./ui/SectionLabel";
import { SmoothReveal } from "./ui/SmoothReveal";
import { blogPosts } from "../data/team";

export function Blog() {
  return (
    <section className="relative z-10 pb-18 pt-8 sm:pb-20 sm:pt-10 lg:pb-24 lg:pt-12">
      <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
        <SmoothReveal>
          <div className="text-center">
            <SectionLabel text="Our Blog" />
            <h2 className="mx-auto mt-4 max-w-3xl font-heading text-3xl font-black leading-[1.05] text-text sm:text-4xl lg:text-5xl">
              Practical Notes on AI, Growth and Systems
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              Short, useful reads for founders and teams building cleaner
              revenue engines, stronger operations, and smarter AI workflows.
            </p>
          </div>
        </SmoothReveal>

        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:mt-14">
          {blogPosts.map((post, i) => (
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
            >
              <Link
                to={post.link}
                className="group relative block overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/25 hover:bg-white/[0.04] hover:shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:p-6"
              >
                <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-accent/20 bg-accent/[0.07] px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.18em] text-accent">
                        {post.tag}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/45">
                        <Clock size={13} />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="font-heading text-xl font-black leading-snug text-white transition-colors duration-300 group-hover:text-accent sm:text-2xl">
                      {post.title}
                    </h3>
                    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/58 sm:text-[0.95rem]">
                      {post.excerpt}
                    </p>
                  </div>

                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white/55 transition-all duration-300 group-hover:border-accent/35 group-hover:bg-accent group-hover:text-[#031111] sm:h-12 sm:w-12">
                    <ArrowRight size={17} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
