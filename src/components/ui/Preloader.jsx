import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOAD_DURATION = 2400;
const REVEAL_DELAY = 200;
const SPLIT_DURATION = 1000;

export function Preloader() {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState("counting");
  const [visible, setVisible] = useState(true);

  const tick = useCallback(() => {
    setCount((prev) => {
      if (prev >= 100) return 100;
      const remaining = 100 - prev;
      const step = Math.max(1, Math.ceil(remaining * 0.06));
      return Math.min(prev + step, 100);
    });
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyOverflowY = document.body.style.overflowY;
    const previousRootOverflow = root.style.overflow;
    const previousRootOverflowY = root.style.overflowY;

    const lockScroll = () => {
      document.body.style.overflow = "hidden";
      document.body.style.overflowY = "hidden";
      root.style.overflow = "hidden";
      root.style.overflowY = "hidden";
    };

    const unlockScroll = () => {
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.overflowY = previousBodyOverflowY;
      root.style.overflow = previousRootOverflow;
      root.style.overflowY = previousRootOverflowY;
    };

    lockScroll();

    const interval = setInterval(tick, LOAD_DURATION / 60);

    const doneTimer = setTimeout(() => {
      clearInterval(interval);
      setCount(100);
    }, LOAD_DURATION);

    const revealTimer = setTimeout(() => {
      setPhase("revealing");
    }, LOAD_DURATION + REVEAL_DELAY);

    const unlockTimer = setTimeout(() => {
      unlockScroll();
    }, LOAD_DURATION + REVEAL_DELAY + SPLIT_DURATION * 0.6);

    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, LOAD_DURATION + REVEAL_DELAY + SPLIT_DURATION + 200);

    return () => {
      clearInterval(interval);
      clearTimeout(doneTimer);
      clearTimeout(revealTimer);
      clearTimeout(unlockTimer);
      clearTimeout(hideTimer);
      unlockScroll();
    };
  }, [tick]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <div
          className="fixed inset-0 z-[10000]"
          style={{
            pointerEvents: phase === "revealing" ? "none" : "auto",
          }}
        >
          <motion.div
            initial={{ y: 0 }}
            animate={
              phase === "revealing" ? { y: "-102%" } : { y: 0 }
            }
            transition={{
              duration: SPLIT_DURATION / 1000,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="absolute left-0 top-0 h-1/2 w-full bg-[#050606]"
          />

          <motion.div
            initial={{ y: 0 }}
            animate={
              phase === "revealing" ? { y: "102%" } : { y: 0 }
            }
            transition={{
              duration: SPLIT_DURATION / 1000,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="absolute bottom-0 left-0 h-1/2 w-full bg-[#050606]"
          />

          <motion.div
            initial={{ opacity: 1 }}
            animate={
              phase === "revealing"
                ? { opacity: 0, scale: 0.92 }
                : { opacity: 1, scale: 1 }
            }
            transition={{ duration: 0.35, ease: "easeIn" }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center"
          >
            <motion.img
              src="/images/Rohan-Dsouza-Monogram.png"
              alt=""
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-10 h-14 w-auto drop-shadow-[0_0_30px_rgba(89,255,241,0.25)]"
            />

            <div className="relative flex items-baseline gap-0.5">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="font-heading text-[clamp(64px,12vw,140px)] font-black leading-none tracking-tighter text-white"
              >
                {count}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 0.4, x: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="font-heading text-[clamp(24px,4vw,48px)] font-bold text-accent"
              >
                %
              </motion.span>
            </div>

            <div className="mt-8 w-48 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className="h-[2px] rounded-full bg-gradient-to-r from-accent via-[#7dfff2] to-accent-strong"
                initial={{ width: "0%" }}
                animate={{ width: `${count}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-5 font-heading text-[10px] font-semibold uppercase tracking-[0.4em] text-muted"
            >
              Loading
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={
              phase === "revealing"
                ? { scaleX: 0, opacity: 0 }
                : { scaleX: 1, opacity: 1 }
            }
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.2,
            }}
            className="absolute left-0 top-1/2 z-[5] h-px w-full origin-center -translate-y-1/2 bg-gradient-to-r from-transparent via-accent/30 to-transparent"
          />
        </div>
      )}
    </AnimatePresence>
  );
}
