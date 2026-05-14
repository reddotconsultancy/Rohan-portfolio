import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { SectionLabel } from "./ui/SectionLabel";
import { SmoothReveal } from "./ui/SmoothReveal";
import { testimonials } from "../data/testimonials";

const AUTO_PLAY_MS = 5000;

function StarRating() {
  return (
    <div className="flex items-center justify-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={18}
          className="fill-yellow-400 text-yellow-400"
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const [active, setActive] = useState(0);
  const total = testimonials.length;

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    const timer = setInterval(next, AUTO_PLAY_MS);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[active];

  return (
    <section className="relative z-10 py-28 lg:py-36">
      <div className="mx-auto max-w-[900px] px-6 lg:px-10">
        <SmoothReveal>
          <div className="text-center">
            <SectionLabel text="Testimonials" />
            <h2 className="mt-4 font-heading text-3xl font-black text-text sm:text-4xl lg:text-5xl">
              What People{" "}
              <span className="bg-gradient-to-r from-accent via-[#7dfff2] to-accent-strong bg-clip-text text-transparent">
                Say About Us
              </span>
            </h2>
          </div>
        </SmoothReveal>

        {/* Card */}
        <div className="relative mt-14">
          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 backdrop-blur-sm sm:p-12 lg:p-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center"
              >
                <StarRating />

                <blockquote className="mt-6 max-w-[600px] text-base leading-[1.8] text-white/70 sm:text-lg sm:leading-[1.9] lg:text-xl lg:leading-[1.8]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="mt-8 flex flex-col items-center">
                  <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-accent/25 shadow-[0_0_20px_rgba(89,255,241,0.08)] sm:h-[72px] sm:w-[72px]">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h4 className="mt-3 font-heading text-base font-bold text-white">
                    {t.name}
                  </h4>
                  <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">
                    {t.role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.03] text-white/60 transition-all hover:border-accent/30 hover:bg-accent/[0.06] hover:text-accent"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="relative h-2 transition-all duration-300"
                  style={{ width: i === active ? 24 : 8 }}
                >
                  <span
                    className={`absolute inset-0 rounded-full transition-all duration-300 ${
                      i === active
                        ? "bg-accent shadow-[0_0_8px_rgba(89,255,241,0.4)]"
                        : "bg-white/20 hover:bg-white/30"
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.03] text-white/60 transition-all hover:border-accent/30 hover:bg-accent/[0.06] hover:text-accent"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
