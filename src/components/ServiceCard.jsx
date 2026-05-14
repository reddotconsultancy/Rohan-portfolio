import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

function CardGlow({ mouseX, mouseY }) {
  const background = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(400px circle at ${x}px ${y}px, rgba(89,255,241,0.08), transparent 60%)`
  );

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      style={{ background }}
    />
  );
}

export function ServiceCard({
  title,
  body,
  icon: Icon,
  tag,
  slug,
  index = 0,
}) {
  const cardRef = useRef(null);
  const finePointerRef = useRef(true);
  const frameRef = useRef(null);
  const rectRef = useRef(null);
  const latestPointRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useMotionValue(0), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useMotionValue(0), {
    stiffness: 200,
    damping: 30,
  });

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const syncPointer = () => {
      finePointerRef.current = media.matches;
    };
    syncPointer();
    media.addEventListener?.("change", syncPointer);

    return () => {
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      media.removeEventListener?.("change", syncPointer);
    };
  }, []);

  const updatePointer = () => {
    const rect = rectRef.current;
    const point = latestPointRef.current;
    if (!rect || !point) return;

    const x = point.x - rect.left;
    const y = point.y - rect.top;
    mouseX.set(x);
    mouseY.set(y);
    rotateX.set(((y - rect.height / 2) / rect.height) * -6);
    rotateY.set(((x - rect.width / 2) / rect.width) * 6);
    frameRef.current = null;
  };

  const handleEnter = () => {
    if (!finePointerRef.current) return;
    rectRef.current = cardRef.current?.getBoundingClientRect();
  };

  const handleMouse = (e) => {
    if (!finePointerRef.current) return;
    latestPointRef.current = { x: e.clientX, y: e.clientY };
    if (!rectRef.current) rectRef.current = cardRef.current?.getBoundingClientRect();
    if (frameRef.current) return;
    frameRef.current = window.requestAnimationFrame(updatePointer);
  };

  const handleLeave = () => {
    if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    rectRef.current = null;
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onPointerEnter={handleEnter}
      onPointerMove={handleMouse}
      onPointerLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
        willChange: "transform",
      }}
      className="group relative flex min-h-[400px] flex-col overflow-hidden rounded-2xl border border-line/60 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-[clamp(32px,3.5vw,52px)_clamp(24px,2.8vw,40px)] backdrop-blur-sm transition-all duration-500 hover:border-accent/30 hover:shadow-[0_0_44px_rgba(89,255,241,0.05),0_22px_64px_rgba(0,0,0,0.34)]"
    >
      <CardGlow mouseX={mouseX} mouseY={mouseY} />

      <div className="pointer-events-none absolute -right-16 -top-16 h-[200px] w-[200px] rounded-full bg-accent/[0.03] opacity-0 blur-[60px] transition-opacity duration-700 group-hover:opacity-100" />

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="mb-2 flex items-center justify-between">
          <motion.div
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/20 bg-accent/[0.06] text-accent transition-all duration-500 group-hover:scale-110 group-hover:border-accent/40 group-hover:bg-accent/10 group-hover:shadow-[0_0_28px_rgba(89,255,241,0.15)]"
            whileHover={{ rotate: 8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Icon size={22} strokeWidth={1.5} />
          </motion.div>

          {tag && (
            <span className="rounded-full border border-accent/15 bg-accent/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent/60 transition-colors duration-300 group-hover:border-accent/30 group-hover:text-accent/80">
              {tag}
            </span>
          )}
        </div>

        <div className="my-5 h-px w-12 bg-gradient-to-r from-accent/30 to-transparent transition-all duration-500 group-hover:w-20 group-hover:from-accent/50" />

        <h3 className="font-heading text-xl font-bold tracking-tight text-text transition-colors duration-300 group-hover:text-white">
          {title}
        </h3>

        <p className="mt-3 max-w-[34ch] text-[13.5px] leading-[1.8] text-[#8a929e] transition-colors duration-300 group-hover:text-[#a8afbb]">
          {body}
        </p>

        <div className="mt-auto pt-6">
          <Link
            to={slug ? `/${slug}` : "/services"}
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-accent/40 transition-all duration-300 group-hover:gap-2.5 group-hover:text-accent/70"
          >
            Learn more
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                d="M5.25 3.5L8.75 7L5.25 10.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.div>
  );
}
