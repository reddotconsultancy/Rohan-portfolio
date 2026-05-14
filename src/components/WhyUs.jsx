import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Zap,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { SectionLabel } from "./ui/SectionLabel";
import { SmoothReveal } from "./ui/SmoothReveal";
import { TiltCard } from "./ui/TiltCard";
import { GlowLine } from "./ui/GlowLine";
import { FloatingOrbs } from "./ui/FloatingOrbs";
import { OrbitRing } from "./ui/OrbitRing";
import { whyItems } from "../data/team";

const icons = [Zap, Sparkles, ShieldCheck];

export function WhyUs() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const imgScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.92, 1, 1.03]
  );
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.4],
    [
      "inset(12% 12% 12% 12% round 16px)",
      "inset(0% 0% 0% 0% round 16px)",
    ]
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-10 py-28 lg:py-36"
    >
      <FloatingOrbs count={3} className="-z-10 opacity-30" />
      <GlowLine className="absolute top-0" />

      <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[0.92fr_1fr] lg:items-center">
          <SmoothReveal direction="left">
            <div>
              <SectionLabel text="Why Us?" />
              <h2 className="mt-4 font-heading text-3xl font-black text-text sm:text-4xl lg:text-5xl">
                Why Our Clients{" "}
                <span className="bg-gradient-to-r from-accent via-[#7dfff2] to-accent-strong bg-clip-text text-transparent">
                  Choose Me
                </span>
              </h2>

              <div className="mt-10 flex flex-col gap-6">
                {whyItems.map((item, i) => {
                  const Icon = icons[i];
                  return (
                    <motion.div
                      key={item}
                      initial={{
                        opacity: 0,
                        x: -40,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{
                        delay: i * 0.15,
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <TiltCard
                        tiltStrength={6}
                        className="group relative flex items-center gap-5 overflow-hidden rounded-[24px] border border-white/10 bg-[#11141a]/75 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.055)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-accent/30 hover:bg-[#15191f]/85 hover:shadow-[0_20px_70px_rgba(0,0,0,0.28),0_0_44px_rgba(89,255,241,0.055)] sm:gap-6 sm:p-6"
                      >
                        <div className="relative flex h-[72px] w-[72px] flex-shrink-0 items-center justify-center rounded-[20px] border border-accent/28 bg-gradient-to-br from-accent/12 to-accent/[0.035] text-accent shadow-[0_0_24px_rgba(89,255,241,0.1),inset_0_1px_0_rgba(89,255,241,0.16)] transition-all duration-300 group-hover:bg-accent group-hover:text-[#031111]">
                          <Icon size={26} strokeWidth={1.8} />
                          <div className="absolute inset-0 rounded-2xl bg-accent/[0.04] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-heading text-[1.05rem] font-extrabold leading-snug text-text sm:text-[1.08rem]">
                            {item}
                          </h3>
                        </div>

                        <motion.div
                          className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/[0.04] blur-[30px]"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.2, 0.5, 0.2],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: i * 0.5,
                          }}
                        />
                        <div className="pointer-events-none absolute inset-x-8 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                      </TiltCard>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </SmoothReveal>

          <div ref={imgRef}>
            <SmoothReveal direction="right">
              <div className="relative aspect-square">
                <motion.div
                  className="absolute -inset-4 rounded-3xl border border-accent/15 opacity-0"
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 1 }}
                />

                <motion.div
                  className="absolute -inset-8 rounded-[28px] border border-dashed border-accent/10 opacity-0"
                  whileInView={{ opacity: 1, rotate: 3 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 1.2 }}
                />

                <OrbitRing
                  size={160}
                  duration={16}
                  dotCount={4}
                  className="-right-10 -top-10 opacity-50"
                />

                <motion.div
                  className="absolute -right-3 -top-3 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-background/80 backdrop-blur-md shadow-[0_0_30px_rgba(89,255,241,0.2)]"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 1,
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  animate={{ y: [0, -6, 0] }}
                >
                  <Zap size={18} className="text-accent" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-3 -left-3 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-background/80 backdrop-blur-md shadow-[0_0_30px_rgba(89,255,241,0.2)]"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 1.2,
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  animate={{ y: [0, -5, 0] }}
                >
                  <ShieldCheck size={18} className="text-accent" />
                </motion.div>

                <motion.div
                  className="absolute -right-6 top-1/2 z-10 h-24 w-[2px] -translate-y-1/2 rounded-full bg-gradient-to-b from-transparent via-accent/40 to-transparent"
                  initial={{ scaleY: 0, opacity: 0 }}
                  whileInView={{ scaleY: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                />

                <div className="group relative overflow-hidden rounded-2xl">
                  <motion.div
                    style={{ y: imgY, scale: imgScale, clipPath }}
                    className="h-full w-full"
                  >
                    <img
                      src="/images/RDNEWGEN-2.jpeg"
                      alt="Rohan Dsouza"
                      className="h-full w-full rounded-2xl object-cover"
                      loading="lazy"
                    />
                  </motion.div>

                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                  <div className="pointer-events-none absolute inset-x-5 bottom-5 translate-y-4 rounded-2xl border border-accent/18 bg-[#05080b]/78 p-4 opacity-0 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="font-heading text-lg font-black text-white">
                      Rohan Dsouza
                    </p>
                    <p className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-accent/80">
                      Strategy / AI / Growth
                    </p>
                  </div>

                  <motion.div
                    className="pointer-events-none absolute inset-0 rounded-2xl border border-accent/20 shadow-[inset_0_0_60px_rgba(89,255,241,0.04)]"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />

                  <motion.div
                    className="pointer-events-none absolute inset-0 rounded-2xl"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, duration: 1 }}
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(89,255,241,0.08) 0%, transparent 40%, transparent 60%, rgba(89,255,241,0.05) 100%)",
                    }}
                  />
                </div>

                <motion.div
                  className="pointer-events-none absolute -bottom-6 left-1/2 h-[120px] w-[80%] -translate-x-1/2 rounded-full bg-accent/[0.08] blur-[40px]"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 1 }}
                />
              </div>
            </SmoothReveal>
          </div>
        </div>
      </div>

      <GlowLine className="absolute bottom-0" />
    </section>
  );
}
