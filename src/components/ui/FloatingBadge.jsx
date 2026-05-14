import { motion } from "framer-motion";

export function FloatingBadge({
  icon: Icon,
  label,
  delay = 0,
  className = "",
}) {
  return (
    <motion.div
      className={`inline-flex items-center gap-2 rounded-full border border-accent/20 bg-black/60 px-4 py-2 backdrop-blur-md ${className}`}
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        delay,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      animate={{
        y: [0, -8, 0],
      }}
      whileHover={{
        scale: 1.08,
        borderColor: "rgba(89,255,241,0.5)",
        boxShadow: "0 0 24px rgba(89,255,241,0.15)",
      }}
    >
      {Icon && (
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-accent">
          <Icon size={12} strokeWidth={2} />
        </div>
      )}
      <span className="text-xs font-semibold tracking-wide text-white/80">
        {label}
      </span>
    </motion.div>
  );
}
