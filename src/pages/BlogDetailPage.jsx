import { Navigate, Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
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

  return (
    <div className="site-shell">
      <ScrollProgress />
      <Navbar />
      <main className="pt-36 pb-20">
        <div className="mx-auto max-w-[900px] px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.28em] text-accent transition-colors hover:text-white"
            >
              ← Back to home
            </Link>

            <div className="mt-8 rounded-[32px] border border-white/10 bg-[#07090f]/95 p-10 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
              <div className="mb-4 flex flex-col gap-3 text-sm text-accent/80 sm:flex-row sm:items-center sm:justify-between">
                <span className="rounded-full border border-accent/20 bg-accent/5 px-3 py-1 uppercase tracking-[0.25em] text-accent">
                  {post.tag}
                </span>
                <span>{post.readTime}</span>
              </div>
              <h1 className="font-heading text-4xl font-black leading-tight text-white sm:text-5xl">
                {post.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#cfd6e4]">
                {post.excerpt}
              </p>
            </div>

            <article className="prose prose-invert prose-headings:text-white prose-p:text-[#d0d5de] mt-12 space-y-12 max-w-none prose-a:text-accent prose-a:no-underline prose-li:leading-relaxed">
              {post.content.map((section, index) => (
                <motion.section
                  key={`${post.slug}-${index}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * index, duration: 0.35, ease: "easeOut" }}
                >
                  {section.heading && (
                    <h2 className="mt-0 text-2xl font-semibold text-white">
                      {section.heading}
                    </h2>
                  )}
                  <p>{section.body}</p>
                  {section.list && (
                    <ul className="list-disc space-y-2 pl-6 text-[#d0d5de]">
                      {section.list.map((item, itemIndex) => (
                        <li key={`${post.slug}-list-${itemIndex}`}>{item}</li>
                      ))}
                    </ul>
                  )}
                </motion.section>
              ))}
            </article>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
