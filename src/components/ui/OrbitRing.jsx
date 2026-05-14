import { motion } from "framer-motion";

export function OrbitRing({
  size = 400,
  duration = 20,
  dotCount = 6,
  className = "",
}) {
  const dots = Array.from({ length: dotCount });

  return (
    <div
      className={`pointer-events-none absolute ${className}`}
      style={{ width: size, height: size }}
    >
      <motion.div
        className="absolute inset-0 rounded-full border border-accent/[0.08]"
        animate={{ rotate: 360 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {dots.map((_, i) => {
          const angle = (360 / dotCount) * i;
          const rad = (angle * Math.PI) / 180;
          const r = size / 2;
          const x = r + r * Math.cos(rad) - 4;
          const y = r + r * Math.sin(rad) - 4;

          return (
            <motion.div
              key={i}
              className="absolute h-2 w-2 rounded-full bg-accent/40"
              style={{ left: x, top: y }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.3, 0.8],
                boxShadow: [
                  "0 0 4px rgba(89,255,241,0.2)",
                  "0 0 12px rgba(89,255,241,0.6)",
                  "0 0 4px rgba(89,255,241,0.2)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </motion.div>

      <motion.div
        className="absolute inset-[15%] rounded-full border border-accent/[0.05]"
        animate={{ rotate: -360 }}
        transition={{
          duration: duration * 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
