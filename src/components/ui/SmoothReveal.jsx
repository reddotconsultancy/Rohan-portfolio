import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

export function SmoothReveal({
  children,
  className = "",
  direction = "up",
  distance = 80,
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.4"],
  });

  const yInitial = direction === "up" ? distance : -distance;
  const xInitial = direction === "left" ? distance
    : direction === "right" ? -distance : 0;

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "up" || direction === "down" ? [yInitial, 0] : [0, 0]
  );
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "left" || direction === "right" ? [xInitial, 0] : [0, 0]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const filter = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["blur(8px)", "blur(0px)"]
  );

  return (
    <motion.div
      ref={ref}
      style={{ y, x, opacity, filter }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
