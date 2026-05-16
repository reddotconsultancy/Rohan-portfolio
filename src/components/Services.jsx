import { useRef, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import { SectionLabel } from "./ui/SectionLabel";
import { SmoothReveal } from "./ui/SmoothReveal";
import { TextReveal } from "./ui/TextReveal";
import { ServiceCard } from "./ServiceCard";
import { services } from "../data/services";

function AmbientBackground({ containerRef }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const finePointerRef = useRef(true);
  const frameRef = useRef(null);
  const rectRef = useRef(null);
  const latestPointRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const media = window.matchMedia("(pointer: fine)");

    const syncPointer = () => {
      finePointerRef.current = media.matches;
    };

    const updateGlow = () => {
      const rect = rectRef.current;
      const point = latestPointRef.current;
      if (!rect || !point) return;
      x.set(point.x - rect.left);
      y.set(point.y - rect.top);
      frameRef.current = null;
    };

    const handler = (e) => {
      if (!finePointerRef.current) return;
      latestPointRef.current = { x: e.clientX, y: e.clientY };
      if (!rectRef.current) rectRef.current = el.getBoundingClientRect();
      if (frameRef.current) return;
      frameRef.current = window.requestAnimationFrame(updateGlow);
    };

    const resetRect = () => {
      rectRef.current = null;
    };

    syncPointer();
    media.addEventListener?.("change", syncPointer);
    el.addEventListener("pointerenter", resetRect, { passive: true });
    el.addEventListener("pointermove", handler, { passive: true });
    window.addEventListener("resize", resetRect, { passive: true });

    return () => {
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      media.removeEventListener?.("change", syncPointer);
      el.removeEventListener("pointerenter", resetRect);
      el.removeEventListener("pointermove", handler);
      window.removeEventListener("resize", resetRect);
    };
  }, [containerRef, x, y]);

  return (
    <motion.div
      className="pointer-events-none absolute -z-10 h-[600px] w-[600px] rounded-full opacity-[0.045] will-change-transform"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(circle, rgba(89,255,241,0.5) 0%, transparent 70%)",
      }}
    />
  );
}

export function Services() {
  const sectionRef = useRef(null);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative z-10 overflow-hidden py-20 sm:py-28 lg:py-44"
    >
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-accent/[0.025] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-accent/[0.02] blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.015] blur-[150px]" />
      </div>

      <AmbientBackground containerRef={sectionRef} />

      <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
        <SmoothReveal>
          <div className="text-center">
            <SectionLabel text="Services" />

            <TextReveal
              text="Explore Our Best Services"
              as="h2"
              className="mt-5 font-heading text-[2.35rem] font-black leading-[1.08] text-text sm:text-5xl lg:text-6xl"
            />

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted sm:text-base"
            >
              End-to-end capability across strategy, AI, brand, and
              execution. Built for serious businesses.
            </motion.p>
          </div>
        </SmoothReveal>

        <div className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-6">
          {services.map((service, i) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              body={service.body}
              icon={service.icon}
              tag={service.tag}
              slug={service.slug}
              index={i}
            />
          ))}
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            delay: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto mt-20 h-px max-w-md origin-center bg-gradient-to-r from-transparent via-accent/25 to-transparent"
        />
      </div>
    </section>
  );
}
