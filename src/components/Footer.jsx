import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, ArrowUp, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { siteInfo } from "../data/team";

const serviceLinks = [
  { label: "Go-To-Market", href: "/go-to-market" },
  { label: "GenAI & Agents", href: "/genai-and-agents" },
  { label: "Influence and Inbound", href: "/influence-and-inbound" },
  { label: "Product & Design", href: "/product-and-design" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Me", href: "/about-me" },
  { label: "Services", href: "/services" },
  { label: "Book a 30-min Strategy Call", href: "/contact-us" },
];

const footerLinkClass =
  "group/link inline-flex items-center gap-2 text-sm font-semibold text-white/56 transition-all duration-300 ease-out hover:translate-x-1 hover:text-accent";

const footerDotClass =
  "h-1.5 w-1.5 rounded-full bg-accent/0 transition-all duration-300 group-hover/link:bg-accent/80 group-hover/link:shadow-[0_0_12px_rgba(89,255,241,0.45)]";

const LOTTIE_ITEMS = [
  {
    src: "/lottie/instagram.json",
    href: siteInfo.instagram,
    label: "Instagram",
  },
  {
    src: "/lottie/linkedin.json",
    href: siteInfo.linkedin,
    label: "LinkedIn",
  },
  {
    src: "/lottie/email.json",
    href: `mailto:${siteInfo.email}`,
    label: "Email",
  },
];

function LottieIcon({ src, href, label, delay }) {
  const containerRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    import("lottie-web").then((lottieModule) => {
      const lottie = lottieModule.default || lottieModule;
      if (cancelled || !containerRef.current) return;

      animRef.current = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: src,
      });
    });

    return () => {
      cancelled = true;
      if (animRef.current) {
        animRef.current.destroy();
      }
    };
  }, [src]);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        scale: 1.15,
        filter: "drop-shadow(0 0 24px rgba(89,255,241,0.4))",
        transition: { type: "spring", stiffness: 400, damping: 15 },
      }}
      whileTap={{ scale: 0.95 }}
      className="block w-[82px] sm:w-[130px] lg:w-[150px]"
    >
      <div
        ref={containerRef}
        className="h-[82px] w-[82px] sm:h-[130px] sm:w-[130px] lg:h-[150px] lg:w-[150px]"
      />
    </motion.a>
  );
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function Footer() {
  return (
    <footer className="relative z-10 bg-[#050607]">
      {/* LET US CONNECT Section */}
      <div className="relative overflow-hidden border-t border-accent/10 py-24 lg:py-32">
        {/* Animated background gradient */}
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute left-1/2 top-1/2 h-[600px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.04] blur-[120px]"
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute left-[20%] top-[20%] h-[200px] w-[200px] rounded-full bg-accent/[0.03] blur-[80px]"
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[15%] bottom-[25%] h-[180px] w-[180px] rounded-full bg-accent/[0.025] blur-[70px]"
            animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(89,255,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(89,255,241,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative mx-auto max-w-[1380px] px-6 text-center lg:px-10">
          <motion.h3
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-3xl font-black uppercase tracking-[0.15em] text-accent sm:text-4xl lg:text-5xl"
            style={{
              textShadow: "0 0 40px rgba(89,255,241,0.3), 0 0 80px rgba(89,255,241,0.1)",
            }}
          >
            Let Us Connect:
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mx-auto mt-4 max-w-md text-sm text-white/40"
          >
            Let&apos;s build something that matters. Reach out on any platform.
          </motion.p>

          {/* Lottie Animated Icons */}
          <div className="mt-14 flex items-center justify-center gap-5 sm:mt-16 sm:gap-20 lg:gap-28">
            {LOTTIE_ITEMS.map((item, i) => (
              <LottieIcon
                key={item.label}
                src={item.src}
                href={item.href}
                label={item.label}
                delay={0.2 + i * 0.1}
              />
            ))}
          </div>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            whileHover={{
              scale: 1.06,
              borderColor: "rgba(89,255,241,0.5)",
              backgroundColor: "rgba(89,255,241,0.08)",
              boxShadow: "0 0 30px rgba(89,255,241,0.2)",
            }}
            className="group mx-auto mt-16 flex items-center gap-2.5 rounded-full border border-white/15 px-10 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white/60 transition-all duration-300 hover:text-accent"
          >
            <motion.span
              className="inline-block"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowUp size={14} />
            </motion.span>
            Back to Top
          </motion.button>
        </div>
      </div>

      {/* MAIN FOOTER GRID */}
      <div className="relative overflow-hidden border-t border-white/[0.06] bg-[#030506]">
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute left-[7%] top-8 h-48 w-48 rounded-full bg-accent/[0.035] blur-[72px]"
            animate={{ y: [0, -10, 0], opacity: [0.35, 0.65, 0.35] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[10%] bottom-0 h-56 w-56 rounded-full bg-accent/[0.025] blur-[86px]"
            animate={{ x: [0, -14, 0], opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-[1380px] px-6 py-14 lg:px-10 lg:py-16">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_0.8fr]">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <img
                src="/images/Rohan-Dsouza-Monogram.png"
                alt="Rohan Dsouza"
                className="mb-5 h-12 w-auto drop-shadow-[0_10px_26px_rgba(89,255,241,0.2)] transition-transform duration-500 group-hover:scale-[1.035]"
                loading="lazy"
              />
              <p className="font-heading text-sm font-extrabold text-white/78">
                {siteInfo.brand}
              </p>
              <p className="mt-1 max-w-[260px] text-xs leading-relaxed text-white/42">
                {siteInfo.tagline}
              </p>
              <div className="mt-5 flex gap-3">
                <a
                  href={siteInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/22 bg-accent/[0.055] text-accent transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:text-[#031111] hover:shadow-[0_0_18px_rgba(89,255,241,0.28)]"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a
                  href={siteInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/22 bg-accent/[0.055] text-accent transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:text-[#031111] hover:shadow-[0_0_18px_rgba(89,255,241,0.28)]"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <h4 className="mb-5 font-heading text-xs font-black uppercase tracking-[0.2em] text-white/82">
                Work with me
              </h4>
              <ul className="space-y-3.5">
                <li>
                  <a
                    href={siteInfo.phoneHref}
                    className="group flex items-center gap-2.5 text-sm font-semibold text-white/56 transition-all duration-300 hover:translate-x-1 hover:text-accent"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-accent/10 bg-accent/[0.08] transition-all duration-300 group-hover:border-accent/35 group-hover:bg-accent/14">
                      <Phone size={11} className="text-accent/70 transition-colors group-hover:text-accent" />
                    </span>
                    {siteInfo.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${siteInfo.email}`}
                    className="group flex items-center gap-2.5 text-sm font-semibold text-white/56 transition-all duration-300 hover:translate-x-1 hover:text-accent"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-accent/10 bg-accent/[0.08] transition-all duration-300 group-hover:border-accent/35 group-hover:bg-accent/14">
                      <Mail size={11} className="text-accent/70 transition-colors group-hover:text-accent" />
                    </span>
                    {siteInfo.email}
                  </a>
                </li>
                <li className="flex items-center gap-2.5 text-sm font-semibold text-white/48">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-accent/10 bg-accent/[0.08]">
                    <MapPin size={11} className="text-accent/70" />
                  </span>
                  {siteInfo.location}
                </li>
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h4 className="mb-5 font-heading text-xs font-black uppercase tracking-[0.2em] text-white/82">
                Services
              </h4>
              <ul className="space-y-3">
                {serviceLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className={footerLinkClass}
                    >
                      <span className={footerDotClass} />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h4 className="mb-5 font-heading text-xs font-black uppercase tracking-[0.2em] text-white/82">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className={footerLinkClass}
                    >
                      <span className={footerDotClass} />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/[0.04] bg-[#030506]">
        <div className="mx-auto flex max-w-[1380px] items-center justify-between px-6 py-5 lg:px-10">
          <p className="text-[11px] text-white/30">
            &copy; {new Date().getFullYear()} {siteInfo.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent/60" />
            <span className="text-[10px] text-white/25">Bangalore & Goa</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
