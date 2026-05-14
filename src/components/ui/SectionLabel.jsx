import { motion } from "framer-motion";

export function SectionLabel({ text, className = "" }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-accent ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {text}
    </motion.span>
  );
}
