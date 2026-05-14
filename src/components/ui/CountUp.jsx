import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

export function CountUp({
  target,
  duration = 2,
  suffix = "",
  prefix = "",
  className = "",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const step = target / (duration * 60);
    let raf;

    const tick = () => {
      start += step;
      if (start >= target) {
        setCount(target);
        return;
      }
      setCount(Math.floor(start));
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}
