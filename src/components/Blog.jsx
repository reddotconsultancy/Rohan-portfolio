import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionLabel } from "./ui/SectionLabel";
import { SmoothReveal } from "./ui/SmoothReveal";
import { blogPosts } from "../data/team";

export function Blog() {
  return (
    <section className="relative z-10 py-28 lg:py-36">
      <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
        <SmoothReveal>
          <div className="text-center">
            <SectionLabel text="Our Blog" />
            <h2 className="mt-4 font-heading text-3xl font-black text-text sm:text-4xl lg:text-5xl">
              Read Our Latest Blogs
            </h2>
          </div>
        </SmoothReveal>

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-1">
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.title}
              initial={{
                opacity: 0,
                x: i % 2 === 0 ? -50 : 50,
                filter: "blur(6px)",
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                filter: "blur(0px)",
              }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                delay: i * 0.1,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                to={post.link}
                className="glass-card group flex flex-col gap-4 p-7 transition-all duration-400 sm:flex-row sm:items-center sm:gap-8"
              >
                <div className="flex-1">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                      {post.tag}
                    </span>
                    <span className="text-xs text-muted">
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-text transition-colors group-hover:text-accent">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-line bg-panel text-muted transition-all group-hover:border-accent/30 group-hover:bg-accent/10 group-hover:text-accent group-hover:translate-x-1">
                  <ArrowRight size={16} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
