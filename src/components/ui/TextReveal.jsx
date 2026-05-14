import { motion } from "framer-motion";

export function TextReveal({
  text,
  className = "",
  as: Tag = "h2",
}) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.22, ease: "easeOut", delay: i * 0.04 }}
          style={{ display: "inline-block" }}
        >
          {word}{i === words.length - 1 ? "" : "\u00A0"}
        </motion.span>
      ))}
    </Tag>
  );
}
