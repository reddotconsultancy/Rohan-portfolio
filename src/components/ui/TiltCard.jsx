import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";

const SPRING = { stiffness: 260, damping: 22, mass: 0.6 };

export function TiltCard({
  children,
  className = "",
  glare = true,
  tiltStrength = 14,
}) {
  const ref = useRef(null);
  const [hovering, setHovering] = useState(false);
  const finePointerRef = useRef(true);
  const frameRef = useRef(null);
  const rectRef = useRef(null);
  const latestPointRef = useRef(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const springX = useSpring(rotX, SPRING);
  const springY = useSpring(rotY, SPRING);
  const glareBackground = useMotionTemplate`radial-gradient(ellipse at ${glareX}% ${glareY}%, rgba(89,255,241,0.35), transparent 65%)`;

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

  const updateTilt = () => {
    const rect = rectRef.current;
    const point = latestPointRef.current;
    if (!rect) return;
    if (!point) return;

    const px = (point.x - rect.left) / rect.width;
    const py = (point.y - rect.top) / rect.height;
    rotX.set((py - 0.5) * -tiltStrength);
    rotY.set((px - 0.5) * tiltStrength);
    glareX.set(px * 100);
    glareY.set(py * 100);
    frameRef.current = null;
  };

  const handleEnter = () => {
    if (!finePointerRef.current) return;
    rectRef.current = ref.current?.getBoundingClientRect();
    setHovering(true);
  };

  const handleMove = (e) => {
    if (!finePointerRef.current) return;
    latestPointRef.current = { x: e.clientX, y: e.clientY };
    if (!rectRef.current) rectRef.current = ref.current?.getBoundingClientRect();
    if (frameRef.current) return;
    frameRef.current = window.requestAnimationFrame(updateTilt);
  };

  const handleLeave = () => {
    if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    rectRef.current = null;
    rotX.set(0);
    rotY.set(0);
    setHovering(false);
  };

  return (
    <motion.div
      ref={ref}
      onPointerEnter={handleEnter}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      className={`relative ${className}`}
    >
      {children}

      {glare && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit]"
          animate={{ opacity: hovering ? 0.12 : 0 }}
          transition={{ duration: 0.22 }}
          style={{
            background: glareBackground,
            willChange: "opacity",
          }}
        />
      )}
    </motion.div>
  );
}
