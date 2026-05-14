import { lazy, Suspense } from "react";
import { motion } from "framer-motion";

const Spline = lazy(() => import("@splinetool/react-spline"));

function LoadingFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-32 w-32">
        <div className="absolute inset-0 rounded-full bg-accent/10 blur-[40px]" />
        <div className="absolute inset-4 animate-pulse rounded-full border border-accent/20 bg-accent/[0.04]" />
        <div className="absolute inset-8 animate-ping rounded-full bg-accent/10" />
      </div>
    </div>
  );
}

export function SplineRobot({ className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      className={`relative overflow-hidden ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-accent/[0.06] blur-[80px]" />

      <Suspense fallback={<LoadingFallback />}>
        <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
      </Suspense>
    </motion.div>
  );
}
