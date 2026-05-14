import { useRef, lazy, Suspense } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Users,
  Target,
  ChevronRight,
  Rocket,
  Zap,
  Star,
  Sparkles,
  Globe,
  TrendingUp,
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import { SmoothReveal } from "../components/ui/SmoothReveal";
import { ScrollProgress } from "../components/ui/ScrollProgress";
import { FloatingOrbs } from "../components/ui/FloatingOrbs";
import { OrbitRing } from "../components/ui/OrbitRing";
import { TiltCard } from "../components/ui/TiltCard";
import { GlowLine } from "../components/ui/GlowLine";
import { FloatingBadge } from "../components/ui/FloatingBadge";
import { serviceDetails } from "../data/service-details";
import { services } from "../data/services";
import { siteInfo } from "../data/team";

const SplineRobot = lazy(() =>
  import("../components/SplineRobot").then((m) => ({
    default: m.SplineRobot,
  }))
);

const IS_GENAI = "genai-and-agents";

const HERO_BADGES = [
  { icon: Rocket, label: "Launch Ready" },
  { icon: Zap, label: "High Impact" },
  { icon: Globe, label: "Global Scale" },
];

const SERVICE_BADGES = {
  "go-to-market": [
    { icon: Rocket, label: "Launch Strategy" },
    { icon: Target, label: "ICP Targeting" },
    { icon: TrendingUp, label: "Pipeline Build" },
  ],
  "genai-and-agents": [
    { icon: Zap, label: "AI Automation" },
    { icon: Globe, label: "Production Systems" },
    { icon: Sparkles, label: "Agent Workflows" },
  ],
  "influence-and-inbound": [
    { icon: Star, label: "Brand Authority" },
    { icon: TrendingUp, label: "Inbound Growth" },
    { icon: Globe, label: "Audience Reach" },
  ],
  "product-and-design": [
    { icon: Target, label: "UX Strategy" },
    { icon: Rocket, label: "Ship Fast" },
    { icon: Sparkles, label: "Design Systems" },
  ],
  "alliances-and-growth": [
    { icon: Globe, label: "Global Reach" },
    { icon: TrendingUp, label: "Channel Growth" },
    { icon: Star, label: "Strategic Deals" },
  ],
  "fractional-leadership": [
    { icon: Zap, label: "Embedded Leader" },
    { icon: Target, label: "Team Builder" },
    { icon: Rocket, label: "Growth Driver" },
  ],
};

function HeroSection({ data, slug }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  const service = services.find((s) => s.slug === slug);
  const Icon = service?.icon;

  return (
    <section
      ref={ref}
      className="relative flex min-h-[85vh] items-end overflow-hidden bg-black pb-24 lg:min-h-[90vh] lg:pb-32"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY, scale: bgScale }}
      >
        <img
          src={data.image}
          alt={data.title}
          className="h-full w-full object-cover"
          loading="eager"
        />
      </motion.div>

      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/30 via-black/50 to-[#050606]" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/60 via-transparent to-transparent" />

      <FloatingOrbs count={5} className="z-[3]" />

      <OrbitRing
        size={500}
        duration={30}
        dotCount={8}
        className="right-[-100px] top-[10%] z-[3] hidden opacity-40 lg:block"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-[1380px] px-6 lg:px-10"
      >
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.12, delayChildren: 0.2 },
            },
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            className="flex items-center gap-3"
          >
            <Link
              to="/services"
              className="text-xs font-semibold uppercase tracking-wider text-muted transition-colors hover:text-accent"
            >
              Services
            </Link>
            <ChevronRight size={12} className="text-muted/40" />
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              {data.title}
            </span>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            className="mt-6 flex items-center gap-4"
          >
            {Icon && (
              <motion.div
                className="flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(89,255,241,0.1)",
                    "0 0 40px rgba(89,255,241,0.25)",
                    "0 0 20px rgba(89,255,241,0.1)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Icon size={28} strokeWidth={1.5} />
              </motion.div>
            )}
            {service?.tag && (
              <span className="rounded-full border border-accent/20 bg-accent/[0.06] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-accent/70">
                {service.tag}
              </span>
            )}
          </motion.div>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="mt-6 max-w-3xl font-heading text-4xl font-black leading-[1.05] text-white sm:text-5xl lg:text-7xl"
          >
            {data.title}
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            className="mt-5 max-w-xl text-lg leading-relaxed text-white/60 italic"
          >
            {data.eyebrow}
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href={siteInfo.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(89,255,241,0.35)]"
              style={{ color: "#000000" }}
            >
              Get Started
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>

            <div className="hidden items-center gap-3 lg:flex">
              {HERO_BADGES.map((b, i) => (
                <FloatingBadge
                  key={b.label}
                  icon={b.icon}
                  label={b.label}
                  delay={0.6 + i * 0.15}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 z-10 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </section>
  );
}

function BadgeRibbon({ slug }) {
  const badges = SERVICE_BADGES[slug] || SERVICE_BADGES["go-to-market"];

  return (
    <section className="relative z-10 -mt-10 pb-4">
      <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {badges.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.label}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 20,
                    scale: 0.85,
                  },
                  show: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                animate={{ y: [0, -6, 0] }}
              >
                <TiltCard
                  tiltStrength={14}
                  className="flex items-center gap-3 overflow-hidden rounded-2xl border border-accent/15 bg-white/[0.03] px-6 py-4 backdrop-blur-xl transition-all duration-500 hover:border-accent/30 hover:shadow-[0_0_30px_rgba(89,255,241,0.06)]"
                >
                  <motion.div
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/20 bg-accent/[0.06] text-accent"
                    animate={{
                      boxShadow: [
                        "0 0 8px rgba(89,255,241,0.05)",
                        "0 0 18px rgba(89,255,241,0.15)",
                        "0 0 8px rgba(89,255,241,0.05)",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  >
                    <Icon size={18} strokeWidth={1.5} />
                  </motion.div>
                  <span className="font-heading text-sm font-bold text-white/80">
                    {b.label}
                  </span>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function IntroSection({ data }) {
  const paragraphs = data.intro.split("\n\n");

  return (
    <section className="relative z-10 py-16 lg:py-24">
      <FloatingOrbs count={3} className="-z-10 opacity-50" />

      <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <SmoothReveal direction="left">
            <div>
              <motion.span
                className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-white/[0.03] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur-md"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(89,255,241,0.15)",
                }}
              >
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [1, 0.6, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                Overview
              </motion.span>
              <h2 className="mt-6 font-heading text-3xl font-black text-white sm:text-4xl lg:text-5xl">
                What We{" "}
                <span className="bg-gradient-to-r from-accent via-[#7dfff2] to-accent-strong bg-clip-text text-transparent">
                  Do
                </span>
              </h2>
              <div className="mt-8 space-y-6">
                {paragraphs.map((p, i) => (
                  <motion.p
                    key={i}
                    className="text-[15px] leading-[1.95] text-[#a8afbb]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: i * 0.2,
                      duration: 0.6,
                    }}
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
            </div>
          </SmoothReveal>

          <SmoothReveal direction="right">
            <div className="relative">
              {data.inlineImage && (
                <TiltCard className="overflow-hidden rounded-3xl">
                  <img
                    src={data.inlineImage}
                    alt={`${data.title} visual`}
                    loading="lazy"
                    className="h-[400px] w-full object-cover lg:h-[500px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 rounded-3xl border border-accent/10" />

                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent-strong to-accent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.5 }}
                    style={{ originX: 0 }}
                  />
                </TiltCard>
              )}

              <OrbitRing
                size={200}
                duration={18}
                dotCount={4}
                className="-right-12 -top-12 opacity-50"
              />
            </div>
          </SmoothReveal>
        </div>
      </div>
    </section>
  );
}

function PracticeSection({ data, slug }) {
  const STEP_ICONS = [Rocket, Target, Zap, Globe, Sparkles, Star];

  const service = services.find((s) => s.slug === slug);
  const ServiceIcon = service?.icon;

  return (
    <section className="relative z-10 py-16 lg:py-24">
      <FloatingOrbs count={4} className="-z-10 opacity-40" />
      <GlowLine className="absolute top-0" />

      <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
          <SmoothReveal direction="left">
            <div className="lg:sticky lg:top-32">
              <motion.span
                className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-white/[0.03] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur-md"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(89,255,241,0.15)",
                }}
              >
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [1, 0.6, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                Process
              </motion.span>
              <h2 className="mt-6 font-heading text-3xl font-black text-white sm:text-4xl lg:text-5xl">
                {data.practiceHeading}
              </h2>
              <p className="mt-4 text-[15px] leading-[1.85] text-[#a8afbb]">
                Every engagement follows a structured,
                results-driven methodology refined across dozens
                of successful projects.
              </p>

              <div className="mt-8 hidden lg:block">
                <TiltCard
                  tiltStrength={10}
                  className="relative overflow-hidden rounded-2xl border border-accent/15 bg-white/[0.03] p-6 backdrop-blur-xl"
                >
                  <div className="relative z-10 flex items-center gap-4">
                    {ServiceIcon && (
                      <motion.div
                        className="flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/25 bg-accent/[0.08] text-accent"
                        animate={{
                          boxShadow: [
                            "0 0 12px rgba(89,255,241,0.08)",
                            "0 0 28px rgba(89,255,241,0.2)",
                            "0 0 12px rgba(89,255,241,0.08)",
                          ],
                          y: [0, -4, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <ServiceIcon size={24} strokeWidth={1.5} />
                      </motion.div>
                    )}
                    <div>
                      <p className="font-heading text-sm font-bold text-white">
                        {data.title}
                      </p>
                      <p className="text-[12px] text-accent/60">
                        {data.practice.length} step process
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex gap-2">
                    {data.practice.map((_, i) => (
                      <motion.div
                        key={i}
                        className="h-1 flex-1 rounded-full bg-accent/15"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.8 + i * 0.2,
                          duration: 0.6,
                        }}
                        style={{ originX: 0 }}
                      >
                        <motion.div
                          className="h-full rounded-full bg-accent/50"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: 1 + i * 0.25,
                            duration: 0.8,
                          }}
                          style={{ originX: 0 }}
                        />
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    className="pointer-events-none absolute -bottom-8 -right-8 h-28 w-28 rounded-full bg-accent/[0.05] blur-[30px]"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                  />
                </TiltCard>

                <div className="mt-5">
                  <OrbitRing
                    size={180}
                    duration={20}
                    dotCount={4}
                    className="mx-auto opacity-40"
                  />
                </div>
              </div>
            </div>
          </SmoothReveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {data.practice.map((item, i) => {
              const StepIcon = STEP_ICONS[i % STEP_ICONS.length];
              return (
                <motion.div
                  key={item}
                  initial={{
                    opacity: 0,
                    y: 30,
                    filter: "blur(6px)",
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    delay: i * 0.12,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <TiltCard
                    tiltStrength={10}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line/50 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-500 hover:border-accent/30 hover:shadow-[0_0_40px_rgba(89,255,241,0.04)]"
                  >
                    <div className="relative z-10">
                      <div className="flex items-center justify-between">
                        <motion.div
                          className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/20 bg-accent/[0.06] text-accent"
                          whileHover={{
                            scale: 1.1,
                            rotate: 5,
                            boxShadow:
                              "0 0 24px rgba(89,255,241,0.2)",
                          }}
                          animate={{ y: [0, -3, 0] }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.4,
                          }}
                        >
                          <StepIcon size={20} strokeWidth={1.5} />
                        </motion.div>
                        <span className="font-heading text-3xl font-black text-accent/10">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="mt-4">
                        <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-accent/50">
                          Step {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="text-[14px] leading-[1.8] text-[#c8cdd5]">
                          {item}
                        </p>
                      </div>
                    </div>

                    <div className="mt-auto pt-4">
                      <motion.div
                        className="h-px bg-gradient-to-r from-accent/30 to-transparent"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.5 + i * 0.15,
                          duration: 0.8,
                        }}
                        style={{ originX: 0 }}
                      />
                    </div>

                    <motion.div
                      className="pointer-events-none absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-accent/[0.04] blur-[30px]"
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.2, 0.5, 0.2],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <GlowLine className="absolute bottom-0" />
    </section>
  );
}

function AudienceSection({ data }) {
  const AUDIENCE_ICONS = [Users, Star, TrendingUp];

  return (
    <section className="relative z-10 py-16 lg:py-24">
      <FloatingOrbs count={3} className="-z-10 opacity-30" />

      <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-20">
          <SmoothReveal direction="left">
            <div className="lg:sticky lg:top-32">
              <motion.span
                className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-white/[0.03] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur-md"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(89,255,241,0.15)",
                }}
              >
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [1, 0.6, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                Audience
              </motion.span>
              <h2 className="mt-6 font-heading text-3xl font-black text-white sm:text-4xl lg:text-5xl">
                {data.audienceHeading}
              </h2>

              <div className="relative mt-8 hidden lg:block">
                <OrbitRing
                  size={280}
                  duration={24}
                  dotCount={5}
                  className="left-0 top-0 opacity-60"
                />
              </div>
            </div>
          </SmoothReveal>

          <SmoothReveal direction="right">
            <div className="flex flex-col gap-5">
              {data.audience.map((item, i) => {
                const Icon = AUDIENCE_ICONS[i % AUDIENCE_ICONS.length];
                return (
                  <motion.div
                    key={item}
                    initial={{
                      opacity: 0,
                      x: 40,
                      filter: "blur(6px)",
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      filter: "blur(0px)",
                    }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      delay: i * 0.15,
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <TiltCard
                      tiltStrength={8}
                      className="group relative overflow-hidden rounded-2xl border border-line/40 bg-gradient-to-br from-white/[0.03] to-transparent p-6 transition-all duration-500 hover:border-accent/25"
                    >
                      <div className="relative z-10 flex items-start gap-5">
                        <motion.div
                          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent/[0.06] text-accent"
                          whileHover={{
                            scale: 1.15,
                            rotate: 5,
                            boxShadow:
                              "0 0 25px rgba(89,255,241,0.2)",
                          }}
                        >
                          <Icon size={20} strokeWidth={1.5} />
                        </motion.div>
                        <p className="text-[15px] leading-[1.85] text-[#a8afbb] transition-colors duration-300 group-hover:text-[#d0d5dd]">
                          {item}
                        </p>
                      </div>

                      <motion.div
                        className="pointer-events-none absolute -bottom-8 -right-8 h-28 w-28 rounded-full bg-accent/[0.03] blur-[30px]"
                        animate={{
                          scale: [1, 1.4, 1],
                          opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          delay: i,
                        }}
                      />
                    </TiltCard>
                  </motion.div>
                );
              })}
            </div>
          </SmoothReveal>
        </div>
      </div>
    </section>
  );
}

function OutcomeSection({ data }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);
  const rotate = useTransform(scrollYProgress, [0, 0.5], [-1, 0]);

  return (
    <section ref={ref} className="relative z-10 py-16 lg:py-24">
      <FloatingOrbs count={4} className="-z-10 opacity-50" />

      <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
        <motion.div style={{ scale, rotate }}>
          <TiltCard
            tiltStrength={6}
            className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-accent/25 bg-white/[0.04] p-12 backdrop-blur-xl lg:p-16"
          >
            <FloatingOrbs count={3} className="opacity-60" />

            <OrbitRing
              size={350}
              duration={25}
              dotCount={6}
              className="-right-[100px] -top-[100px] opacity-30"
            />

            <div className="relative z-10">
              <div className="flex items-center gap-4">
                <motion.div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent"
                  animate={{
                    boxShadow: [
                      "0 0 15px rgba(89,255,241,0.1)",
                      "0 0 35px rgba(89,255,241,0.25)",
                      "0 0 15px rgba(89,255,241,0.1)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Target size={24} strokeWidth={1.5} />
                </motion.div>
                <h3 className="font-heading text-3xl font-black text-white sm:text-4xl">
                  The{" "}
                  <span className="bg-gradient-to-r from-accent via-[#7dfff2] to-accent-strong bg-clip-text text-transparent">
                    Outcome
                  </span>
                </h3>
              </div>

              <GlowLine className="my-8" />

              <p className="text-[17px] font-medium leading-[1.95] text-white/80">
                {data.outcome}
              </p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-10"
              >
                <a
                  href={siteInfo.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(89,255,241,0.35)]"
              style={{ color: "#000000" }}
                >
                  Let&apos;s Make It Happen
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
              </motion.div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}

function RelatedServices({ currentSlug }) {
  const others = services.filter((s) => s.slug !== currentSlug).slice(0, 3);

  return (
    <section className="relative z-10 py-16 lg:py-24">
      <GlowLine className="absolute top-0" />
      <FloatingOrbs count={3} className="-z-10 opacity-30" />

      <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
        <SmoothReveal>
          <div className="text-center">
            <motion.span
              className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(89,255,241,0.15)",
              }}
            >
              <Sparkles size={12} />
              Explore More
            </motion.span>
            <h2 className="mt-5 font-heading text-3xl font-black text-white sm:text-4xl lg:text-5xl">
              Other{" "}
              <span className="bg-gradient-to-r from-accent via-[#7dfff2] to-accent-strong bg-clip-text text-transparent">
                Services
              </span>
            </h2>
          </div>
        </SmoothReveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {others.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.slug}
                initial={{
                  opacity: 0,
                  y: 40,
                  filter: "blur(8px)",
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  delay: i * 0.12,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link to={`/${service.slug}`}>
                  <TiltCard
                    tiltStrength={12}
                    className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-line/50 bg-white/[0.03] p-10 text-center backdrop-blur-xl transition-all duration-500 hover:border-accent/30 hover:shadow-[0_0_40px_rgba(89,255,241,0.04)]"
                  >
                    <motion.div
                      className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/20 bg-accent/[0.06] text-accent"
                      whileHover={{
                        scale: 1.15,
                        rotate: 10,
                        boxShadow:
                          "0 0 30px rgba(89,255,241,0.2)",
                      }}
                    >
                      <Icon size={24} strokeWidth={1.5} />
                    </motion.div>
                    {service.tag && (
                      <span className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-accent/50">
                        {service.tag}
                      </span>
                    )}
                    <h3 className="font-heading text-xl font-bold text-white transition-colors duration-300 group-hover:text-accent">
                      {service.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-[#6b7280]">
                      {service.body}
                    </p>
                    <motion.span
                      className="mt-5 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-accent/40"
                      whileHover={{ gap: "8px", color: "rgba(89,255,241,0.8)" }}
                    >
                      Learn more
                      <ChevronRight size={12} />
                    </motion.span>

                    <motion.div
                      className="pointer-events-none absolute -bottom-10 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-accent/[0.04] blur-[40px]"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.2, 0.4, 0.2],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i,
                      }}
                    />
                  </TiltCard>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ServiceDetailPage() {
  const { slug } = useParams();
  const data = serviceDetails[slug];

  if (!data) return <Navigate to="/services" replace />;

  const isGenAI = slug === IS_GENAI;

  return (
    <div className="site-shell">
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection data={data} slug={slug} />
        <BadgeRibbon slug={slug} />

        {isGenAI && (
          <section className="relative z-10 overflow-hidden py-16 lg:py-24">
            <FloatingOrbs count={4} className="-z-10 opacity-50" />
            <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-6 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:px-10">
              <SmoothReveal direction="left">
                <div>
                  <span className="mb-3 inline-block rounded-full border border-accent/20 bg-accent/[0.06] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-accent/70">
                    Interactive 3D
                  </span>
                  <h2 className="font-heading text-3xl font-bold text-white lg:text-4xl">
                    AI That Actually{" "}
                    <span className="bg-gradient-to-r from-accent via-[#7dfff2] to-accent bg-clip-text text-transparent">
                      Works
                    </span>
                  </h2>
                  <p className="mt-4 max-w-md text-[15px] leading-[1.85] text-[#a8afbb]">
                    We don&apos;t just talk about AI — we build it,
                    deploy it, and make it run in production. Drag to
                    interact with our AI companion.
                  </p>
                </div>
              </SmoothReveal>

              <Suspense
                fallback={
                  <div className="flex h-[400px] items-center justify-center lg:h-[500px]">
                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent/20 border-t-accent" />
                  </div>
                }
              >
                <SplineRobot className="h-[400px] w-full lg:h-[500px]" />
              </Suspense>
            </div>
          </section>
        )}

        <IntroSection data={data} />
        <PracticeSection data={data} slug={slug} />
        <AudienceSection data={data} />
        <OutcomeSection data={data} />
        <RelatedServices currentSlug={slug} />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
