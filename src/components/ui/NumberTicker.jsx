import { useRef, useEffect, useState, useCallback } from "react";
import { useInView } from "framer-motion";

export function NumberTicker({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  const animate = useCallback(() => {
    let start = 0;
    const step = value / (duration * 60);
    let raf;
    const tick = () => {
      start += step;
      if (start >= value) {
        setDisplay(value);
        return;
      }
      setDisplay(Math.floor(start));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  useEffect(() => {
    if (!inView) return;
    return animate();
  }, [inView, animate]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
