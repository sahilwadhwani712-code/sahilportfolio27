import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Persona = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  bg: string;
  png: string;
  accent: string;
  accentSoft: string;
  ctaLabel: string;
  ctaTo: string;
  stats: { label: string; value: string }[];
  marquee: string[];
  socials?: { icon: LucideIcon; label: string; href: string }[];
};

/* Cursive name — single line, viral feel */
const CursiveName = ({ text, accent }: { text: string; accent: string }) => {
  const letters = Array.from(text);
  return (
    <h1
      className="leading-[0.9] text-foreground md:whitespace-nowrap"
      style={{
        fontFamily: "'Italianno', 'Caveat', cursive",
        fontWeight: 400,
        fontStyle: "italic",
          fontSize: "clamp(2.6rem, 7.4vw, 7.5rem)",
        textShadow: `0 18px 70px ${accent}66, 0 2px 0 ${accent}22`,
        letterSpacing: "-0.01em",
        wordSpacing: "0.12em",
      }}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline-block">
        {letters.map((ch, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ y: "55%", opacity: 0, rotate: -6, filter: "blur(6px)" }}
            animate={{ y: "0%", opacity: 1, rotate: 0, filter: "blur(0px)" }}
            exit={{ y: "-25%", opacity: 0, filter: "blur(6px)" }}
            transition={{
              duration: 0.6,
              delay: 0.06 + i * 0.03,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ transformOrigin: "50% 100%" }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        ))}
      </span>
    </h1>
  );
};

/* Minimal "Enter" pill */
const EnterPill = ({
  to,
  label,
  accent,
}: {
  to: string;
  label: string;
  accent: string;
}) => {
  return (
    <div className="inline-block">
      <Link
        to={to}
        className="group relative inline-flex items-center gap-3 sm:gap-4 pl-5 sm:pl-6 pr-2 py-2 sm:py-2.5 rounded-full font-display font-medium text-[11px] sm:text-xs uppercase tracking-[0.24em] text-foreground overflow-hidden"
        style={{
          background: "hsl(0 0% 100% / 0.05)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full pointer-events-none"
          animate={{
            boxShadow: `0 0 0 1px ${accent}55, 0 14px 44px -10px ${accent}99`,
          }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
        <span
          aria-hidden
          className="absolute inset-0 rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"
          style={{ background: accent }}
        />
        <span className="relative z-10 transition-colors group-hover:text-white">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={label}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              {label}
            </motion.span>
          </AnimatePresence>
        </span>
        <span
          className="relative z-10 inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full transition-colors group-hover:bg-white/20"
          style={{ background: accent }}
        >
          <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    </div>
  );
};

const SCROLL_COOLDOWN = 950;

const PersonaSwitcher = ({ personas }: { personas: Persona[] }) => {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const persona = personas[index];
  const lastSwapRef = useRef(0);

  const go = (n: number) => setIndex(n);

  /* Wheel / touch / key → change persona */
  useEffect(() => {
    const tryAdvance = (delta: number) => {
      const now = Date.now();
      if (now - lastSwapRef.current < SCROLL_COOLDOWN) return;
      if (Math.abs(delta) < 14) return;
      lastSwapRef.current = now;
      if (delta > 0) go((index + 1) % personas.length);
      else go((index - 1 + personas.length) % personas.length);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      tryAdvance(e.deltaY);
    };
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      const dy = touchStartY - e.touches[0].clientY;
      if (Math.abs(dy) > 50) {
        tryAdvance(dy);
        touchStartY = e.touches[0].clientY;
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") tryAdvance(1);
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") tryAdvance(-1);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
    };
  }, [index, personas.length]);

  /* Mouse parallax */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 18 });
  const py = useSpring(my, { stiffness: 60, damping: 18 });
  const stageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduce) return;
    const el = stageRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set(((e.clientX - (r.left + r.width / 2)) / r.width) * 18);
      my.set(((e.clientY - (r.top + r.height / 2)) / r.height) * 12);
    };
    const onLeave = () => {
      mx.set(0);
      my.set(0);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [mx, my, reduce]);

  return (
    <section
      ref={stageRef}
      className="relative w-full h-screen overflow-hidden bg-background"
      aria-label="Persona showcase"
    >
      {/* Layered backgrounds — heavy blur + dark blend so PNG sits cleanly */}
      <div className="absolute inset-0">
        {personas.map((p, i) => (
          <motion.img
            key={p.id}
            src={p.bg}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: "blur(28px) saturate(1.2) brightness(0.65)",
              transform: "scale(1.18)",
              willChange: "opacity",
            }}
            initial={false}
            animate={{ opacity: i === index ? 1 : 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            loading={i === 0 ? "eager" : "lazy"}
            draggable={false}
          />
        ))}

        {/* Accent wash that follows persona */}
        <motion.div
          aria-hidden
          className="absolute inset-0"
          animate={{
            background: `radial-gradient(60% 70% at 75% 50%, ${persona.accent}22 0%, transparent 60%), radial-gradient(50% 60% at 15% 30%, ${persona.accentSoft} 0%, transparent 70%)`,
          }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        />

        {/* Unified blend overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/55 to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 45%, hsl(0 0% 0% / 0.55) 100%)",
          }}
        />
      </div>

      {/* Vertical persona rail (desktop) */}
      <div className="hidden lg:flex absolute left-5 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-6">
        <span className="font-mono text-[9px] tracking-[0.4em] text-foreground/40 [writing-mode:vertical-rl] rotate-180">
          SAHIL · WADHWANI
        </span>
        <span className="block w-px h-14 bg-foreground/15" />
        <AnimatePresence mode="wait">
          <motion.span
            key={`rail-${persona.id}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.5 }}
            className="font-display font-bold text-xs tracking-[0.5em] [writing-mode:vertical-rl] rotate-180"
            style={{ color: persona.accent }}
          >
            {persona.label}
          </motion.span>
        </AnimatePresence>
        <span className="block w-px h-14 bg-foreground/15" />
      </div>

      {/* Character layer — bigger on home, anchored bottom-right on desktop, centered on mobile */}
      <div className="absolute inset-0 z-[8] pointer-events-none overflow-hidden">
        <motion.div
          style={{ x: px, y: py }}
          className="absolute inset-x-0 bottom-0 h-[68svh] sm:h-[88svh] md:h-[112svh] flex items-end justify-center md:justify-end"
        >
          <motion.div
            aria-hidden
            className="absolute bottom-0 left-1/2 -translate-x-1/2 md:left-auto md:right-[8%] md:translate-x-0 w-[82%] md:w-[48%] h-[50%] rounded-full blur-[110px]"
            animate={{
              background: persona.accent,
              opacity: reduce ? 0.24 : [0.22, 0.4, 0.22],
            }}
            transition={{
              background: { duration: 0.8 },
              opacity: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            }}
          />
          {personas.map((p, i) => {
            const active = i === index;
            return (
              <motion.img
                key={p.id}
                src={p.png}
                alt={active ? p.title : ""}
                initial={false}
                animate={{
                  opacity: active ? 1 : 0,
                  x: active ? 0 : i < index ? -28 : 28,
                  scale: active ? 1 : 0.99,
                }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[3%] h-[68svh] sm:h-[90svh] md:h-[112svh] w-auto max-w-[100vw] md:max-w-none object-contain object-bottom select-none pointer-events-none"
                style={{
                  transformOrigin: "50% 100%",
                  filter:
                    "drop-shadow(0 42px 64px hsl(0 0% 0% / 0.78)) drop-shadow(0 0 28px hsl(0 0% 0% / 0.42))",
                  willChange: "opacity, transform",
                }}
                loading={i === 0 ? "eager" : "lazy"}
                draggable={false}
              />
            );
          })}
          <div className="absolute inset-x-0 bottom-0 h-[22svh] bg-gradient-to-t from-background/85 via-background/25 to-transparent" />
        </motion.div>
      </div>

      {/* Content grid */}
      <div className="relative z-20 h-full container mx-auto px-5 sm:px-8 lg:px-16 pt-20 pb-10 sm:pt-24 sm:pb-14 flex items-end">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-end w-full">
          {/* LEFT — copy */}
          <div className="md:col-span-6 lg:col-span-5 relative max-w-xl pb-4 sm:pb-2 pt-[26svh] sm:pt-[40svh] md:pt-0">

            <div className="relative mb-3 sm:mb-4 min-h-[1.2em]">
              <AnimatePresence mode="wait">
                <CursiveName
                  key={`title-${persona.id}`}
                  text={persona.title}
                  accent={persona.accent}
                />
              </AnimatePresence>
            </div>

            {/* Description — visible on mobile too, more breathing room */}
            <div className="mb-4 sm:mb-5 min-h-[5rem] sm:min-h-[4rem]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`desc-${persona.id}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.5, delay: 0.08 }}
                  className="font-body text-[12px] sm:text-[14px] text-foreground/75 max-w-md leading-relaxed drop-shadow-[0_2px_18px_hsl(0_0%_0%_/_0.9)]"
                >
                  {persona.description}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-4">
              <EnterPill
                to={persona.ctaTo}
                label={persona.ctaLabel}
                accent={persona.accent}
              />
            </div>

            {/* Persona socials — inline under the CTA */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`pers-socials-${persona.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex items-center gap-2 mt-4"
              >
                {(persona.socials ?? []).map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="group relative inline-flex items-center justify-center w-9 h-9 rounded-full border border-foreground/15 hover:border-foreground/40 transition-colors"
                    style={{
                      background: "hsl(0 0% 100% / 0.04)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                    }}
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: `${persona.accent}33`, boxShadow: `0 0 22px ${persona.accent}66` }}
                    />
                    <s.icon className="relative z-10 w-4 h-4 text-foreground/85 group-hover:text-foreground transition-colors" />
                  </a>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Stat tiles */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`stats-${persona.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="hidden md:flex flex-wrap gap-2.5 mt-5"
              >
                {persona.stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                    whileHover={{ y: -4, scale: 1.04 }}
                    className="rounded-xl px-4 py-2.5 cursor-default"
                    style={{
                      background: "hsl(0 0% 100% / 0.04)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      boxShadow: `0 8px 24px hsl(0 0% 0% / 0.3), inset 0 0 0 1px ${persona.accent}33`,
                    }}
                  >
                    <div
                      className="font-display text-lg sm:text-2xl font-bold leading-none"
                      style={{ color: persona.accent }}
                    >
                      {s.value}
                    </div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground font-body mt-1 tracking-wide">
                      {s.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Scroll hint — bottom center */}
      <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <motion.span
          className="font-mono text-[9px] sm:text-[10px] tracking-[0.4em] text-foreground/40 uppercase"
          animate={{ y: [0, 4, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          Scroll to switch
        </motion.span>
      </div>

      {/* Right-center: persona dots only (socials moved inline next to CTA) */}
      <div className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-4 sm:gap-5">
        {/* Persona indicator dots — vertical, clickable */}
        <div className="flex flex-col items-center gap-2">
          {personas.map((p, i) => {
            const isActive = i === index;
            return (
              <button
                key={p.id}
                onClick={() => go(i)}
                aria-label={`Go to ${p.label}`}
                className="group relative flex items-center justify-center w-5 h-5"
              >
                <motion.span
                  aria-hidden
                  className="block w-[3px] rounded-full"
                  animate={{
                    height: isActive ? 32 : 10,
                    background: isActive ? p.accent : "hsl(0 0% 100% / 0.3)",
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PersonaSwitcher;
