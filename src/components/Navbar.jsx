import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Me", href: "/about-me" },
  { label: "Services", href: "/services" },
];

const headerVariants = {
  hidden: { opacity: 0, y: -18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const mobileMenuVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolledRef = useRef(false);
  const rafRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const update = () => {
      const next = window.scrollY > 32;
      if (next !== scrolledRef.current) {
        scrolledRef.current = next;
        setScrolled(next);
      }
      rafRef.current = null;
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const isActive = (href) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <motion.header
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className={`fixed left-1/2 top-5 z-50 grid w-[min(88vw,1320px)] -translate-x-1/2 grid-cols-[1fr_auto_1fr] items-center gap-5 overflow-hidden rounded-[34px] border px-7 py-3.5 shadow-[0_28px_90px_rgba(0,0,0,0.48),inset_0_1px_0_rgba(255,255,255,0.085)] backdrop-blur-2xl transition-[top,background,border-color,box-shadow,padding,transform] duration-500 ease-out will-change-transform max-md:w-[calc(100vw-28px)] max-md:grid-cols-[1fr_auto] max-md:px-4 ${
          scrolled
            ? "top-3 border-accent/24 bg-[#05080b]/94 py-2.5 shadow-[0_20px_70px_rgba(0,0,0,0.58),0_0_0_1px_rgba(89,255,241,0.08)]"
            : "border-accent/12 bg-[#05080b]/82"
        }`}
        aria-label="Primary navigation"
      >
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
          animate={{ opacity: [0.35, 0.85, 0.35], scaleX: [0.78, 1, 0.78] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-1/2 h-28 w-52 -translate-y-1/2 rounded-full bg-accent/[0.075] blur-3xl"
          animate={{ x: [0, 18, 0], opacity: [0.45, 0.75, 0.45] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(110deg,transparent_10%,rgba(255,255,255,0.035)_42%,transparent_58%)] opacity-70"
        />
        <Link
          to="/"
          className="group relative z-10 flex items-center justify-self-start"
          aria-label="Rohan Dsouza home"
        >
          <img
            src="/images/Rohan-Dsouza-Monogram.png"
            alt="Rohan Dsouza"
            className="h-11 w-auto drop-shadow-[0_10px_28px_rgba(89,255,241,0.3)] transition-transform duration-500 ease-out group-hover:scale-[1.045] md:h-12"
          />
        </Link>

        <nav
          className="relative z-10 hidden items-center justify-center rounded-full border border-white/12 bg-black/46 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_16px_44px_rgba(0,0,0,0.26)] md:flex"
          aria-label="Main menu"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`group relative min-w-[124px] rounded-full px-6 py-3 text-center text-[0.78rem] font-black uppercase tracking-[0.16em] transition-colors duration-300 ${
                isActive(item.href)
                  ? "text-white"
                  : "text-white/62 hover:text-white"
              }`}
            >
              {isActive(item.href) && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-full bg-white/[0.065] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_10px_30px_rgba(0,0,0,0.18)]"
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                />
              )}
              <span className="absolute inset-0 rounded-full bg-accent/[0.045] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative z-10">{item.label}</span>
              <span
                className={`absolute inset-x-7 bottom-1.5 h-[2px] rounded-full bg-accent transition-transform duration-300 ${
                  isActive(item.href)
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </Link>
          ))}
        </nav>

        <Link
          to="/contact-us"
          className="navbar-cta group relative z-10 hidden justify-self-end overflow-hidden rounded-full border border-accent bg-black/20 px-7 py-3 text-[0.78rem] font-black uppercase tracking-[0.13em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:shadow-[0_0_34px_rgba(89,255,241,0.3)] md:inline-flex"
        >
          <span className="absolute inset-0 z-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
            Work With Me
          </span>
          <ArrowUpRight
            size={14}
            className="relative z-10 ml-2 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black"
          />
        </Link>

        <button
          className="relative z-10 flex h-11 w-11 items-center justify-center justify-self-end rounded-full border border-white/10 bg-white/[0.04] text-white transition-colors hover:border-accent/40 hover:text-accent md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-x-4 top-[86px] z-50 overflow-hidden rounded-[24px] border border-accent/14 bg-[#06090d]/96 p-3 shadow-[0_24px_70px_rgba(0,0,0,0.62)] backdrop-blur-2xl md:hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-black uppercase tracking-[0.13em] transition-colors ${
                  isActive(item.href)
                    ? "bg-accent/[0.08] text-accent"
                    : "text-white/62 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                )}
              </Link>
            ))}
            <Link
              to="/contact-us"
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex items-center justify-center rounded-full border border-accent/50 px-5 py-3.5 text-sm font-black uppercase tracking-[0.13em] text-white transition-all hover:bg-accent hover:text-[#031111]"
            >
              Work With Me
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
