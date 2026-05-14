import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { LogoStrip } from "../components/LogoStrip";
import { Blog } from "../components/Blog";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import { SmoothReveal } from "../components/ui/SmoothReveal";
import { ScrollProgress } from "../components/ui/ScrollProgress";
import { FloatingOrbs } from "../components/ui/FloatingOrbs";
import { OrbitRing } from "../components/ui/OrbitRing";
import { TiltCard } from "../components/ui/TiltCard";
import { GlowLine } from "../components/ui/GlowLine";
import { services } from "../data/services";
import { serviceDetails } from "../data/service-details";

function HeroBanner() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-black sm:min-h-[65vh]"
    >
      <motion.div
        className="absolute inset-0 z-0 bg-[#0a0a0a]"
        style={{ scale: bgScale }}
      >
      </motion.div>

      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/20 via-black/50 to-[#050606]" />

      <FloatingOrbs count={5} className="z-[2]" />

      <OrbitRing
        size={450}
        duration={28}
        dotCount={7}
        className="left-1/2 top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2 opacity-20"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex flex-col items-center px-6 pt-28 pb-16 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent backdrop-blur-sm"
        >
          <Sparkles size={12} />
          What We Offer
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            delay: 0.35,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-6 font-heading text-5xl font-black text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] sm:text-6xl lg:text-7xl"
        >
          Our{" "}
          <span className="bg-gradient-to-r from-accent via-[#7dfff2] to-accent bg-clip-text text-transparent">
            Services
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-4 max-w-lg text-base leading-relaxed text-white/50"
        >
          End-to-end capability across strategy, AI, brand, and execution.
          Built for serious businesses.
        </motion.p>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 z-10 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </section>
  );
}

function ServiceRow({ service, index }) {
  const Icon = service.icon;
  const detail = serviceDetails[service.slug];
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link to={`/${service.slug}`}>
        <TiltCard
          tiltStrength={6}
          className={`group grid gap-8 overflow-hidden rounded-3xl border border-line/40 bg-white/[0.03] backdrop-blur-sm transition-all duration-500 hover:border-accent/25 hover:shadow-[0_0_80px_rgba(89,255,241,0.05)] lg:grid-cols-[1fr_1fr] lg:gap-0`}
        >
          <div
            className={`flex flex-col justify-center p-8 lg:p-14 ${
              isEven ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <div className="flex items-center gap-3">
              <motion.div
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/20 bg-accent/[0.06] text-accent"
                whileHover={{
                  scale: 1.15,
                  rotate: 5,
                  boxShadow: "0 0 24px rgba(89,255,241,0.2)",
                }}
              >
                <Icon size={22} strokeWidth={1.5} />
              </motion.div>
              {service.tag && (
                <span className="rounded-full border border-accent/15 bg-accent/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent/60">
                  {service.tag}
                </span>
              )}
            </div>

            <h3 className="mt-6 font-heading text-3xl font-black text-white transition-colors duration-300 group-hover:text-accent sm:text-4xl">
              {service.title}
            </h3>

            <p className="mt-4 max-w-md text-[14px] leading-[1.85] text-[#8a929e] transition-colors duration-300 group-hover:text-[#a8afbb]">
              {service.body}
            </p>

            <motion.div
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent/50"
              whileHover={{
                gap: "12px",
                color: "rgba(89,255,241,0.9)",
              }}
            >
              Explore Service
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </motion.div>
          </div>

          <div
            className={`relative overflow-hidden ${
              isEven
                ? "lg:order-2 lg:rounded-r-3xl"
                : "lg:order-1 lg:rounded-l-3xl"
            }`}
          >
            {detail?.image && (
              <>
                <img
                  src={detail.image}
                  alt={service.title}
                  loading="lazy"
                  className="h-[260px] w-full object-cover transition-transform duration-700 group-hover:scale-110 lg:h-full lg:min-h-[380px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />

                <motion.div
                  className="pointer-events-none absolute inset-0"
                  animate={{
                    background: [
                      "radial-gradient(circle at 30% 50%, rgba(89,255,241,0.04), transparent 60%)",
                      "radial-gradient(circle at 70% 50%, rgba(89,255,241,0.04), transparent 60%)",
                      "radial-gradient(circle at 30% 50%, rgba(89,255,241,0.04), transparent 60%)",
                    ],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </>
            )}
          </div>

          <motion.div
            className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-accent/[0.03] blur-[50px]"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: index * 0.5,
            }}
          />
        </TiltCard>
      </Link>
    </motion.div>
  );
}

export function ServicesPage() {
  return (
    <div className="site-shell">
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroBanner />

        <section className="relative z-10 py-16 lg:py-24">
          <FloatingOrbs count={4} className="-z-10 opacity-40" />

          <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
            <SmoothReveal>
              <div className="mx-auto max-w-2xl text-center">
                <motion.span
                  className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-white/[0.03] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur-md"
                  whileHover={{
                    scale: 1.05,
                    boxShadow:
                      "0 0 20px rgba(89,255,241,0.15)",
                  }}
                >
                  <Sparkles size={12} />
                  Services
                </motion.span>
                <h2 className="mt-5 font-heading text-3xl font-black text-white sm:text-4xl lg:text-5xl">
                  Explore Our{" "}
                  <span className="bg-gradient-to-r from-accent via-[#7dfff2] to-accent-strong bg-clip-text text-transparent">
                    Best Services
                  </span>
                </h2>
              </div>
            </SmoothReveal>

            <div className="mt-12 flex flex-col gap-8">
              {services.map((service, i) => (
                <ServiceRow
                  key={service.slug}
                  service={service}
                  index={i}
                />
              ))}
            </div>
          </div>
        </section>

        <GlowLine />
        <LogoStrip />
        <Blog />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
