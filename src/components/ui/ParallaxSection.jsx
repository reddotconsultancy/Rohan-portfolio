import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ParallaxSection({
  children,
  speed = 0.3,
  className = "",
  as = "div",
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100]);

  const Tag = motion[as] || motion.div;

  return (
    <div ref={ref} className={className}>
      <Tag style={{ y }}>{children}</Tag>
    </div>
  );
}
