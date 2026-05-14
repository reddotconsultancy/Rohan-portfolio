import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const HOVER_SELECTORS = "a, button, [data-hover], .glass-card, .group";

export function CursorFollower() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hoveredRef = useRef(false);
  const frameRef = useRef(null);
  const latestPointRef = useRef({ x: -100, y: -100 });

  const springX = useSpring(x, { stiffness: 190, damping: 24, mass: 0.45 });
  const springY = useSpring(y, { stiffness: 190, damping: 24, mass: 0.45 });

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    const syncEnabled = () => setEnabled(media.matches);
    syncEnabled();

    media.addEventListener?.("change", syncEnabled);
    return () => media.removeEventListener?.("change", syncEnabled);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const setHoverState = (next) => {
      if (hoveredRef.current === next) return;
      hoveredRef.current = next;
      setHovered(next);
    };

    const move = (e) => {
      latestPointRef.current = { x: e.clientX, y: e.clientY };
      if (frameRef.current) return;

      frameRef.current = window.requestAnimationFrame(() => {
        x.set(latestPointRef.current.x);
        y.set(latestPointRef.current.y);
        frameRef.current = null;
      });
    };

    const over = (e) => {
      if (e.target.closest(HOVER_SELECTORS)) setHoverState(true);
    };

    const out = (e) => {
      if (e.target.closest(HOVER_SELECTORS)) setHoverState(false);
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointerout", out, { passive: true });
    return () => {
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", out);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-difference will-change-transform lg:block"
        style={{ x: springX, y: springY }}
        animate={{
          scale: hovered ? 1 : 0.42,
          backgroundColor: hovered
            ? "rgba(89,255,241,0.15)"
            : "transparent",
          borderColor: hovered
            ? "rgba(89,255,241,0.6)"
            : "rgba(89,255,241,0.4)",
          opacity: hovered ? 1 : 0.82,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent will-change-transform lg:block"
        style={{ x, y }}
        animate={{
          scale: hovered ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
