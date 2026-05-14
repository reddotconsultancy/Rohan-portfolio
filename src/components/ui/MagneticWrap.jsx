import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function MagneticWrap({ children, strength = 0.3, className = "" }) {
  const ref = useRef(null);
  const finePointerRef = useRef(true);
  const frameRef = useRef(null);
  const rectRef = useRef(null);
  const latestPointRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

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

  const updatePosition = () => {
    const rect = rectRef.current;
    const point = latestPointRef.current;
    if (!rect || !point) return;

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((point.x - cx) * strength);
    y.set((point.y - cy) * strength);
    frameRef.current = null;
  };

  const handleEnter = () => {
    if (!finePointerRef.current) return;
    rectRef.current = ref.current?.getBoundingClientRect();
  };

  const handleMouse = (e) => {
    if (!finePointerRef.current) return;
    latestPointRef.current = { x: e.clientX, y: e.clientY };
    if (!rectRef.current) rectRef.current = ref.current?.getBoundingClientRect();
    if (frameRef.current) return;
    frameRef.current = window.requestAnimationFrame(updatePosition);
  };

  const handleLeave = () => {
    if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    rectRef.current = null;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerEnter={handleEnter}
      onPointerMove={handleMouse}
      onPointerLeave={handleLeave}
      style={{ x: springX, y: springY, willChange: "transform" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
