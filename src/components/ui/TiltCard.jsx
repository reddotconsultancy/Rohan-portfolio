import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const SPRING = { stiffness: 260, damping: 22, mass: 0.6 };

export function TiltCard({
  children,
  className = "",
  glare = true,
  tiltStrength = 14,
}) {
  const ref = useRef(null);
  const [hovering, setHovering] = useState(false);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const springX = useSpring(rotX, SPRING);
  const springY = useSpring(rotY, SPRING);

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotX.set((py - 0.5) * -tiltStrength);
    rotY.set((px - 0.5) * tiltStrength);
    glareX.set(px * 100);
    glareY.set(py * 100);
  };

  const handleLeave = () => {
    rotX.set(0);
    rotY.set(0);
    setHovering(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
    >
      {children}

      {glare && hovering && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          exit={{ opacity: 0 }}
          style={{
            background:
              "radial-gradient(ellipse at var(--gx) var(--gy), rgba(89,255,241,0.35), transparent 65%)",
            "--gx": `${glareX.get()}%`,
            "--gy": `${glareY.get()}%`,
          }}
        />
      )}
    </motion.div>
  );
}
