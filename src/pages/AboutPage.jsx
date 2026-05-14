import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Globe, Sparkles, Plane } from "lucide-react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ScrollProgress } from "../components/ui/ScrollProgress";
import { FloatingOrbs } from "../components/ui/FloatingOrbs";
import { siteInfo } from "../data/team";

const MILESTONES = [
  { icon: Plane, label: "Dubai", detail: "FMCG & Real Estate" },
  { icon: MapPin, label: "India", detail: "Startups & Scale-ups" },
  { icon: Globe, label: "US & Europe", detail: "Enterprise AI" },
  { icon: MapPin, label: "Bangalore & Goa", detail: "Based Today" },
];

function FadeUp({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function PullQuote({ children }) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="my-8 border-l-[3px] border-accent py-2 pl-5 text-[15px] font-semibold italic leading-[1.85] text-accent sm:text-base lg:text-[17px]"
    >
      {children}
    </motion.blockquote>
  );
}

function StoryP({ children, isBold }) {
  const cls = isBold
    ? "text-[17px] leading-[1.85] font-semibold text-white/90 sm:text-lg lg:text-xl"
    : "text-[17px] leading-[1.85] text-white/60 sm:text-lg lg:text-xl";
  return (
    <motion.p
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cls}
    >
      {children}
    </motion.p>
  );
}

function ChapterSection({ label, bgImage, children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${
        bgImage ? "py-20 lg:py-28" : "py-12 lg:py-16"
      }`}
    >
      {/* Background image — always visible, parallax movement */}
      {bgImage && (
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <img
            src={bgImage}
            alt=""
            className="h-[120%] w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#0a0a0a]/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/60 to-[#0a0a0a]/90" />
        </motion.div>
      )}

      {/* Floating orbs */}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <motion.div
          className="absolute right-[10%] bottom-[20%] h-[180px] w-[180px] rounded-full bg-accent/[0.06] blur-[70px]"
          animate={{ x: [0, 15, -10, 0], y: [0, -10, 15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-[5%] top-[30%] h-[140px] w-[140px] rounded-full bg-accent/[0.04] blur-[60px]"
          animate={{ x: [0, -15, 10, 0], y: [0, 10, -12, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-[2] mx-auto max-w-[750px] px-6 lg:px-10">
        {label && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 flex items-center gap-4"
          >
            <div className="h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent" />
            <span className="rounded-full border border-accent/20 bg-accent/[0.08] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-accent backdrop-blur-md">
              {label}
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-accent/40 to-transparent" />
          </motion.div>
        )}
        <div className="space-y-5">{children}</div>
      </div>
    </div>
  );
}

function WordStagger({ text }) {
  const words = text.split(" ");
  return (
    <span>
      {words.map((word, i) => {
        const highlight =
          word === "system" || word === "cares" || word === "enough";
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, duration: 0.35, ease: "easeOut" }}
            className={`inline-block mr-[0.28em] ${highlight ? "text-accent" : ""}`}
          >
            {word}
          </motion.span>
        );
      })}
    </span>
  );
}

export function AboutPage() {
  const photoRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [15, -15]);

  return (
    <div className="site-shell">
      <ScrollProgress />
      <Navbar />
      <main>
        {/* HERO */}
        <section className="relative z-10 pt-32 pb-8 lg:pt-40 lg:pb-12">
          <FloatingOrbs count={3} className="-z-10 opacity-25" />
          <div className="pointer-events-none absolute left-1/2 top-[30%] -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.035] blur-[100px]" />

          <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
            <FadeUp>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-white/[0.04] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-accent backdrop-blur-md">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                About me
              </span>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1 className="relative mt-4 font-heading text-4xl font-black uppercase tracking-wider text-white sm:text-5xl lg:text-[56px]">
                Rohan Dsouza
                <motion.span
                  className="absolute -bottom-1.5 left-0 h-[3px] rounded-full bg-gradient-to-r from-accent to-accent/30"
                  initial={{ width: 0 }}
                  animate={{ width: "35%" }}
                  transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </h1>
            </FadeUp>

            <FadeUp delay={0.18}>
              <span className="mt-4 inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
                Consultant
              </span>
            </FadeUp>
          </div>
        </section>

        {/* INTRO — Photo + Opening */}
        <section className="relative z-10 pb-8 lg:pb-12">
          <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-[320px_1fr] lg:gap-12 items-start">
              {/* Photo Card */}
              <FadeUp className="mx-auto w-full max-w-[320px] lg:mx-0">
                <motion.div
                  ref={photoRef}
                  className="relative"
                >
                  <div className="absolute -left-1.5 top-6 bottom-6 w-[3px] rounded-full bg-gradient-to-b from-accent via-accent/40 to-transparent" />
                  <motion.div
                    style={{ y: photoY }}
                    className="overflow-hidden rounded-2xl border border-white/[0.08] shadow-[0_16px_50px_rgba(0,0,0,0.5)]"
                  >
                    <img
                      src="/images/RDNEWGEN-2.jpeg"
                      alt="Rohan Dsouza"
                      className="w-full object-cover"
                      loading="eager"
                    />
                  </motion.div>
                </motion.div>

                <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.025] p-4 backdrop-blur-sm">
                  <p className="mt-0.5 text-[11px] text-accent/60">Founder &bull; {siteInfo.brand}</p>
                  <div className="mt-2 flex items-center gap-3 text-[10px] text-white/40">
                    <span className="flex items-center gap-1">
                      <MapPin size={9} className="text-accent/70" />
                      {siteInfo.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Globe size={9} className="text-accent/70" />
                      US &bull; Europe &bull; India
                    </span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <a href={siteInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex h-7 w-7 items-center justify-center rounded-full border border-accent/20 bg-accent/[0.06] text-accent transition-all hover:bg-accent/15 hover:shadow-[0_0_12px_rgba(89,255,241,0.2)]"><FaLinkedinIn size={11} /></a>
                    <a href={siteInfo.instagram} target="_blank" rel="noopener noreferrer" className="flex h-7 w-7 items-center justify-center rounded-full border border-accent/20 bg-accent/[0.06] text-accent transition-all hover:bg-accent/15 hover:shadow-[0_0_12px_rgba(89,255,241,0.2)]"><FaInstagram size={11} /></a>
                  </div>
                </div>
              </FadeUp>

              {/* Opening text */}
              <div className="space-y-5 lg:pt-4">
                <FadeUp>
                  <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
                    Thirteen Years Ago,
                  </h2>
                </FadeUp>
                <StoryP>
                  <em>I walked onto a sales floor in Dubai with nothing but hunger and a very strong WiFi password.</em>
                </StoryP>
                <StoryP>
                  No playbook. No mentor tapping me on the shoulder with wisdom. Just the deep, clarifying pressure of working across FMCG and Real Estate in the UAE, where enterprise trust is something you earn in years, not pitches, and where the market has absolutely no interest in your enthusiasm unless you can back it with results.
                </StoryP>
                <StoryP>So I backed it with results.</StoryP>
                <PullQuote>
                  The lesson I learned early and never forgot: every number has a system behind it. Every system needs someone who actually cares enough to build it right.
                </PullQuote>
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTER: India */}
        <ChapterSection label="India Chapter" bgImage="/images/india-chapter-bg.jpg">
          <StoryP>
            Then I came to India. And India, as anyone who has tried to build something here will tell you, is an entirely different education.
          </StoryP>
          <StoryP>
            I joined the startup world at a point where most founders were running on conviction, caffeine, and spreadsheets that should never be shown to an investor. I walked into teams that had potential but no process. Revenue targets that existed on slides but not in pipelines.
          </StoryP>
          <StoryP>So I did what I had always done. I got to work.</StoryP>
          <StoryP>
            I built revenue functions from zero. Hired the first salespeople, wrote the first playbooks, opened the first accounts, and stayed long enough to make sure the thing kept running after the initial energy wore off.
          </StoryP>
          <PullQuote>
            The part I was best at, and the part I loved the most, was not the execution. It was the moment before. Walking into a business, sitting with the problem, understanding what was actually broken, and mapping the path from where they were to where they needed to be.
          </PullQuote>
        </ChapterSection>

        {/* CHAPTER: The Pivot */}
        <ChapterSection label="The Pivot">
          <StoryP>
            Founders would bring me in to fix a sales pipeline and I would come back with a question about their positioning. CTOs would want to talk product and I would end up mapping their entire go-to-market blind spot. That pattern repeated enough times that it stopped being a coincidence and started being a calling.
          </StoryP>
          <StoryP>
            I realised I was not just a revenue operator. I was a business diagnostician who happened to be very good at building the thing once the diagnosis was done.
          </StoryP>
          <StoryP>
            Somewhere in the middle of all that, I accidentally became a copywriter. That sentence sounds like a punchline, and honestly, it kind of is.
          </StoryP>
          <PullQuote>
            Organic reach that outperformed paid campaigns. Inbound leads from a single post. Executives suddenly receiving calls they had been chasing for months. Personal brand went from a buzzword I rolled my eyes at to the most underrated growth channel I had ever seen up close.
          </PullQuote>
        </ChapterSection>

        {/* CHAPTER: AI Era */}
        <ChapterSection label="AI Era" bgImage="/images/ai-chapter-bg.jpg">
          <StoryP>
            Then came AI. And this is where the story shifts gear entirely.
          </StoryP>
          <StoryP>
            Working alongside cloud and enterprise ecosystems serving the US market, I stopped advising on AI and started building it. I co-architected and shipped a production-grade agentic voice platform that handled over 180,000 live calls and converted real enterprise leads at scale.
          </StoryP>
          <StoryP isBold>
            Seven figures of ARR built from the ground up. Deals closed at the CTO table. Startups taken from zero to acquisition. A platform taken from a blank whiteboard to 180,000 live calls in production. That is not a CV. That is a case study.
          </StoryP>
          <PullQuote>
            I do not hand over decks and disappear. I stay until the thing works. That has never once changed regardless of the industry, the country, or the size of the problem.
          </PullQuote>
        </ChapterSection>

        {/* TODAY */}
        <ChapterSection label="Today">
          <StoryP>
            Today I split my time between Bangalore and Goa, travel across India for clients, and work with startups, growth-stage companies, and ambitious businesses across the US and Europe who are serious about building something that actually lasts. The timezone situation is always negotiable. The standard of work is not.
          </StoryP>
        </ChapterSection>

        {/* MILESTONES */}
        <section className="relative z-10 pt-8 pb-8 lg:pt-10 lg:pb-10">
          <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-sm sm:grid-cols-4 sm:gap-4 sm:p-6"
            >
              {MILESTONES.map((m, i) => {
                const Icon = m.icon;
                return (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="flex flex-col items-center gap-2 py-3 text-center"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/20 bg-accent/[0.06]">
                      <Icon size={14} className="text-accent" />
                    </div>
                    <h4 className="text-xs font-bold text-white">{m.label}</h4>
                    <p className="text-[10px] text-white/40">{m.detail}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* QUOTE */}
        <section className="relative z-10 pt-8 pb-14 lg:pt-10 lg:pb-20">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.025] blur-[90px]" />
          </div>
          <div className="mx-auto max-w-[850px] px-6 text-center lg:px-10">
            <Sparkles size={18} className="mx-auto mb-4 text-accent/50" />
            <h3 className="font-heading text-xl font-medium leading-[1.6] text-white sm:text-2xl lg:text-3xl">
              <WordStagger text="Every number has a system behind it. Every system needs someone who actually cares enough to build it right." />
            </h3>
          </div>
        </section>

        {/* CTA */}
        <section className="relative z-10 pb-16 lg:pb-24">
          <div className="mx-auto max-w-[700px] px-6 text-center lg:px-10">
            <FadeUp>
              <p className="text-base leading-relaxed text-white/60 sm:text-lg">
                If that sounds like the kind of person you want in your corner —
              </p>
            </FadeUp>
            <FadeUp delay={0.12}>
              <div className="mt-7 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <a
                  href={siteInfo.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-heading text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(89,255,241,0.3)]"
                  style={{ color: "#000" }}
                >
                  Book a 1-on-1 Call
                  <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="#000" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
                <div className="flex gap-2.5">
                  <motion.a href={siteInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/25 bg-accent/[0.06] text-accent hover:bg-accent/15 hover:shadow-[0_0_18px_rgba(89,255,241,0.2)]" whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.9 }}><FaLinkedinIn size={16} /></motion.a>
                  <motion.a href={siteInfo.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/25 bg-accent/[0.06] text-accent hover:bg-accent/15 hover:shadow-[0_0_18px_rgba(89,255,241,0.2)]" whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.9 }}><FaInstagram size={16} /></motion.a>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
