import { motion } from "framer-motion";

const ORBS = [
  {
    size: 320,
    color: "rgba(89,255,241,0.07)",
    x: "12%",
    y: "18%",
    dur: 22,
    delay: 0,
  },
  {
    size: 220,
    color: "rgba(43,222,211,0.06)",
    x: "78%",
    y: "65%",
    dur: 26,
    delay: 2,
  },
  {
    size: 160,
    color: "rgba(89,255,241,0.05)",
    x: "55%",
    y: "10%",
    dur: 20,
    delay: 4,
  },
  {
    size: 260,
    color: "rgba(89,255,241,0.04)",
    x: "30%",
    y: "75%",
    dur: 28,
    delay: 1,
  },
  {
    size: 100,
    color: "rgba(89,255,241,0.08)",
    x: "85%",
    y: "20%",
    dur: 18,
    delay: 3,
  },
];

export function FloatingOrbs({ count = 5, className = "" }) {
  const orbs = ORBS.slice(0, count);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: o.size,
            height: o.size,
            left: o.x,
            top: o.y,
            background: `radial-gradient(circle, ${o.color}, transparent 70%)`,
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, 40, -30, 20, 0],
            y: [0, -35, 25, -15, 0],
            scale: [1, 1.15, 0.9, 1.05, 1],
          }}
          transition={{
            duration: o.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: o.delay,
          }}
        />
      ))}
    </div>
  );
}
