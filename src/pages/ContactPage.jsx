import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ScrollProgress } from "../components/ui/ScrollProgress";
import { FloatingOrbs } from "../components/ui/FloatingOrbs";
import { GlowLine } from "../components/ui/GlowLine";
import { TiltCard } from "../components/ui/TiltCard";
import { SmoothReveal } from "../components/ui/SmoothReveal";
import { siteInfo } from "../data/team";

const CONTACT_WIDGETS = [
  {
    icon: MapPin,
    label: "Our Location",
    value: siteInfo.location,
    href: "https://maps.google.com/?q=Bangalore+India",
    color: "from-accent/25 to-[#7dfff2]/10",
    delay: 0,
    floatY: [-6, 6, -6],
    floatDur: 5,
  },
  {
    icon: Phone,
    label: "Phone Number",
    value: siteInfo.phone,
    href: siteInfo.phoneHref,
    color: "from-[#7dfff2]/25 to-accent/10",
    delay: 0.8,
    floatY: [5, -5, 5],
    floatDur: 5.5,
  },
  {
    icon: Mail,
    label: "Email Us",
    value: siteInfo.email,
    href: `mailto:${siteInfo.email}`,
    color: "from-accent-strong/25 to-accent/10",
    delay: 1.6,
    floatY: [-4, 7, -4],
    floatDur: 6,
  },
  {
    icon: Calendar,
    label: "Book a Call",
    value: "Schedule 30 min",
    href: siteInfo.calendly,
    color: "from-accent/20 to-[#5ce0d0]/15",
    delay: 2.4,
    floatY: [6, -4, 6],
    floatDur: 5.2,
  },
];

const SOCIAL_LINKS = [
  {
    icon: FaLinkedinIn,
    label: "LinkedIn",
    href: siteInfo.linkedin,
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    href: siteInfo.instagram,
  },
];

function FloatingWidget({ widget, index }) {
  const Icon = widget.icon;

  return (
    <motion.a
      href={widget.href}
      target={widget.href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: index * 0.15,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        animate={{ y: widget.floatY }}
        transition={{
          duration: widget.floatDur,
          repeat: Infinity,
          ease: "easeInOut",
          delay: widget.delay,
        }}
      >
        <TiltCard
          tiltStrength={12}
          className="group relative overflow-hidden rounded-2xl border border-line/40 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-500 hover:border-accent/30 hover:shadow-[0_0_50px_rgba(89,255,241,0.1)] sm:p-6"
        >
          <motion.div
            className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${widget.color} blur-[40px] opacity-40 transition-opacity duration-500 group-hover:opacity-70`}
          />

          <div className="relative z-10">
            <motion.div
              className="flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/15 to-accent/[0.04] text-accent shadow-[0_0_20px_rgba(89,255,241,0.1)]"
              whileHover={{
                scale: 1.1,
                rotate: 5,
                boxShadow: "0 0 30px rgba(89,255,241,0.2)",
              }}
              transition={{ duration: 0.3 }}
            >
              <Icon size={22} strokeWidth={1.5} />
            </motion.div>

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted/60">
              {widget.label}
            </p>
            <p className="mt-1 break-words font-heading text-base font-bold text-white transition-colors duration-400 group-hover:text-accent sm:text-lg">
              {widget.value}
            </p>

            <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-accent/60 transition-colors duration-400 group-hover:text-accent">
              <span>Connect</span>
              <ArrowRight
                size={12}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </div>
          </div>

          <motion.div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-px origin-left bg-gradient-to-r from-accent/40 via-accent/20 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.5, duration: 0.8 }}
          />
        </TiltCard>
      </motion.div>
    </motion.a>
  );
}

function ContactForm() {
  const [focused, setFocused] = useState("");

  const fields = [
    { id: "name", label: "Your Name", type: "text" },
    { id: "email", label: "Email Address", type: "email" },
    { id: "subject", label: "Subject", type: "text" },
  ];

  return (
    <TiltCard
      tiltStrength={4}
      className="relative overflow-hidden rounded-2xl border border-line/40 bg-white/[0.03] p-5 backdrop-blur-xl sm:p-8 lg:p-10"
    >
      <motion.div
        className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-accent/[0.04] blur-[80px]"
      />
      <motion.div
        className="pointer-events-none absolute -bottom-16 -left-16 h-[250px] w-[250px] rounded-full bg-accent/[0.03] blur-[60px]"
      />

      <div className="relative z-10">
        <h3 className="font-heading text-2xl font-bold text-white lg:text-3xl">
          Send{" "}
          <span className="bg-gradient-to-r from-accent to-[#7dfff2] bg-clip-text text-transparent">
            Message
          </span>
        </h3>
        <p className="mt-2 text-sm text-muted">
          Drop us a line and we will get back within 24 hours.
        </p>

        <form
          className="mt-8 space-y-5"
          onSubmit={(e) => e.preventDefault()}
        >
          {fields.map((f) => (
            <div key={f.id} className="relative">
              <motion.label
                className={`pointer-events-none absolute left-4 text-[12px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 ${
                  focused === f.id
                    ? "top-2 text-accent"
                    : "top-4 text-muted/50"
                }`}
                animate={
                  focused === f.id
                    ? { y: 0, fontSize: "10px" }
                    : { y: 0, fontSize: "12px" }
                }
              >
                {f.label}
              </motion.label>
              <input
                type={f.type}
                onFocus={() => setFocused(f.id)}
                onBlur={(e) => {
                  if (!e.target.value) setFocused("");
                }}
                className={`w-full rounded-xl border bg-white/[0.02] px-4 pb-3 pt-7 text-sm text-white outline-none backdrop-blur-md transition-all duration-300 ${
                  focused === f.id
                    ? "border-accent/40 shadow-[0_0_20px_rgba(89,255,241,0.06)]"
                    : "border-line/40 hover:border-line/60"
                }`}
              />
            </div>
          ))}

          <div className="relative">
            <motion.label
              className={`pointer-events-none absolute left-4 text-[12px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 ${
                focused === "message"
                  ? "top-2 text-accent"
                  : "top-4 text-muted/50"
              }`}
            >
              Your Message
            </motion.label>
            <textarea
              rows={4}
              onFocus={() => setFocused("message")}
              onBlur={(e) => {
                if (!e.target.value) setFocused("");
              }}
              className={`w-full resize-none rounded-xl border bg-white/[0.02] px-4 pb-3 pt-7 text-sm text-white outline-none backdrop-blur-md transition-all duration-300 ${
                focused === "message"
                  ? "border-accent/40 shadow-[0_0_20px_rgba(89,255,241,0.06)]"
                  : "border-line/40 hover:border-line/60"
              }`}
            />
          </div>

          <motion.button
            type="submit"
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-8 py-4 font-heading text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_40px_rgba(89,255,241,0.25)]"
            style={{ color: "#000000" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Send
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
            Send Message
          </motion.button>
        </form>
      </div>
    </TiltCard>
  );
}

function SocialFloat({ link, index }) {
  const Icon = link.icon;

  return (
    <motion.a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        delay: 0.3 + index * 0.15,
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="group"
    >
      <motion.div
        className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/20 bg-white/[0.04] text-accent backdrop-blur-xl transition-all duration-400 hover:border-accent/40 hover:bg-accent/10 hover:shadow-[0_0_30px_rgba(89,255,241,0.15)]"
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 4,
          delay: index * 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.15 }}
      >
        <Icon size={20} />
      </motion.div>
      <p className="mt-2 text-center text-[10px] font-semibold uppercase tracking-widest text-muted/50 transition-colors duration-300 group-hover:text-accent">
        {link.label}
      </p>
    </motion.a>
  );
}

export function ContactPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -40]);
  const contentOp = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <div className="site-shell">
      <ScrollProgress />
      <Navbar />
      <main>
        <section
          ref={heroRef}
          className="relative z-10 flex min-h-[50svh] items-center overflow-hidden pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-20"
        >
          <motion.div
            className="absolute inset-0 -z-10"
            style={{ y: bgY }}
          >
            <img
              src="/images/bg-footer2-1.jpg"
              alt=""
              className="h-[120%] w-full object-cover brightness-[0.2]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
          </motion.div>

          <FloatingOrbs count={4} className="-z-5 opacity-30" />

          <motion.div
            style={{ y: contentY, opacity: contentOp }}
            className="mx-auto max-w-[1380px] px-6 text-center lg:px-10"
          >
            <SmoothReveal>
              <motion.span
                className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-white/[0.04] px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent backdrop-blur-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [1, 0.6, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                Contact
              </motion.span>
            </SmoothReveal>

            <motion.h1
              className="mt-6 font-heading text-[2.35rem] font-black leading-[1.08] text-white sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Get In Touch{" "}
              <span className="bg-gradient-to-r from-accent via-[#7dfff2] to-accent-strong bg-clip-text text-transparent">
                With Us
              </span>
            </motion.h1>

            <motion.p
              className="mx-auto mt-4 max-w-lg text-base text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Let us build something meaningful together. Reach out
              and let us start the conversation.
            </motion.p>
          </motion.div>
        </section>

        <GlowLine />

        <section className="relative z-10 py-16 lg:py-24">
          <FloatingOrbs count={3} className="-z-10 opacity-25" />

          <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              {CONTACT_WIDGETS.map((w, i) => (
                <FloatingWidget key={w.label} widget={w} index={i} />
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 py-12 lg:py-20">
          <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[1fr_480px] lg:gap-16">
              <SmoothReveal direction="left">
                <ContactForm />
              </SmoothReveal>

              <SmoothReveal direction="right">
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-white lg:text-3xl">
                      Let&apos;s Create Something{" "}
                      <span className="bg-gradient-to-r from-accent to-[#7dfff2] bg-clip-text text-transparent">
                        Great Together
                      </span>
                    </h3>

                    <motion.p
                      className="mt-3 font-heading text-xs font-semibold uppercase tracking-[0.3em] text-accent/60"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      {siteInfo.tagline
                        .split(".")
                        .join(" | ")
                        .replace(/^ \| /, "")
                        .replace(/ \| $/, "")}
                    </motion.p>

                    <p className="mt-6 text-sm leading-[1.8] text-muted">
                      Whether you have a project in mind, a problem
                      to solve, or just want to explore what is
                      possible — we are always up for the
                      conversation. No pitch decks required. Just
                      real talk about what you need and how we can
                      help.
                    </p>

                    <motion.a
                      href={siteInfo.calendly}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-8 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/[0.08] px-6 py-3 text-sm font-bold text-accent backdrop-blur-md transition-all duration-400 hover:border-accent/40 hover:bg-accent/15 hover:shadow-[0_0_30px_rgba(89,255,241,0.1)]"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      <Calendar size={16} />
                      Schedule a Quick Chat
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </motion.a>
                  </div>

                  <div className="mt-12">
                    <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted/40">
                      Find us on
                    </p>
                    <div className="flex gap-4">
                      {SOCIAL_LINKS.map((link, i) => (
                        <SocialFloat
                          key={link.label}
                          link={link}
                          index={i}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </SmoothReveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
