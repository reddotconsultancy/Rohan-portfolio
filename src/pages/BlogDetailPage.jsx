import { Navigate, Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Sparkles } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ScrollProgress } from "../components/ui/ScrollProgress";
import { blogPosts } from "../data/team";

export function BlogDetailPage() {
  const { slug } = useParams();
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return <Navigate to="/" replace />;
  }

  const suggestedPosts = blogPosts
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="site-shell">
      <ScrollProgress />
      <Navbar />

      <main className="pb-24 pt-36 lg:pb-32">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.24em] text-accent/85 transition-colors hover:text-white"
            >
              <ArrowLeft size={15} />
              Back to home
            </Link>

            <header className="mt-8 overflow-hidden rounded-[28px] border border-white/10 bg-[#07090f]/90 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.3)] backdrop-blur-2xl sm:p-9 lg:p-12">
              <div className="grid gap-9 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
                <div>
                  <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-accent/80">
                    <span className="w-fit rounded-full border border-accent/20 bg-accent/[0.07] px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.22em] text-accent">
                      {post.tag}
                    </span>
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-white/45">
                      <Clock size={14} />
                      {post.readTime}
                    </span>
                  </div>

                <h1 className="max-w-4xl font-heading text-3xl font-black leading-[1.06] text-white sm:text-4xl lg:text-5xl">
                    {post.title}
                  </h1>
                  <p className="mt-6 max-w-3xl text-lg leading-[1.8] text-white/68">
                    {post.excerpt}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-accent">
                    <Sparkles size={15} />
                    Article brief
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/58">
                    A concise breakdown with practical context, clean sections,
                    and next reads for related AI and revenue workflows.
                  </p>
                </div>
              </div>
            </header>
          </motion.div>

          <div className="mt-10">
            <motion.article
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.45, ease: "easeOut" }}
              className="mx-auto max-w-[900px] rounded-[28px] border border-white/[0.08] bg-white/[0.025] p-6 sm:p-8 lg:p-10"
            >
              <div className="mx-auto max-w-[720px] space-y-10">
                {post.content.map((section, index) => (
                  <motion.section
                    key={`${post.slug}-${index}`}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      delay: index * 0.06,
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="border-b border-white/[0.06] pb-10 last:border-b-0 last:pb-0"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-accent/20 bg-accent/[0.06] text-xs font-black text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {section.heading && (
                        <h2 className="font-heading text-2xl font-black leading-tight text-white sm:text-3xl">
                          {section.heading}
                        </h2>
                      )}
                    </div>

                    <p className="text-left text-[1rem] leading-8 text-white/70 sm:text-[1.08rem] sm:leading-9">
                      {section.body}
                    </p>

                    {section.list && (
                      <ul className="mt-5 space-y-3 text-left text-base leading-relaxed text-white/68">
                        {section.list.map((item, itemIndex) => (
                          <li
                            key={`${post.slug}-list-${itemIndex}`}
                            className="flex gap-3"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/80" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.section>
                ))}
              </div>
            </motion.article>
          </div>

          <section className="mx-auto mt-14 max-w-[1120px] lg:mt-20">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.22em] text-accent">
                  Read next
                </span>
                <h2 className="mt-2 font-heading text-2xl font-black text-white sm:text-3xl">
                  More useful notes
                </h2>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {suggestedPosts.map((item, index) => (
                <motion.div
                  key={item.slug}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    delay: index * 0.07,
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    to={item.link}
                    className="group flex h-full flex-col justify-between rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/25 hover:bg-white/[0.04]"
                  >
                    <div>
                      <span className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-accent/70">
                        {item.tag}
                      </span>
                      <h3 className="mt-3 font-heading text-lg font-black leading-snug text-white transition-colors group-hover:text-accent">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/52">
                        {item.excerpt}
                      </p>
                    </div>
                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-white/45 transition-colors group-hover:text-accent">
                      Read article
                      <ArrowRight size={14} />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
