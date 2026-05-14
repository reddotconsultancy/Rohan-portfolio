import { motion } from "framer-motion";

export function AnimatedText({ text, className = "", as: Tag = "h1" }) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3 + i * 0.05,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: "inline-block", marginRight: "0.25em" }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
