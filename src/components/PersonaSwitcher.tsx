import {
  motion,
  AnimatePresence,
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
  gradient: string;
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
  return <h1 className="persona-name leading-[0.9] text-foreground md:whitespace-nowrap">{text}</h1>;
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
          <AnimatePresence mode="sync" initial={false}>
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
  const decoded = useRef(new Map<string, Promise<void>>());
  const requested = useRef(0);
  const decodePortrait = (src: string) => {
    const existing = decoded.current.get(src);
    if (existing) return existing;
    const image = new Image();
    image.src = src;
    const ready = image.decode().catch(() => undefined);
    decoded.current.set(src, ready);
    return ready;
  };
  useEffect(() => {
    const timer = window.setTimeout(() => {
      personas.forEach((p) => { void decodePortrait(p.png); });
    }, 300);
    return () => window.clearTimeout(timer);
  }, [personas]);
  const go = (n: number) => {
    const target = (n + personas.length) % personas.length;
    requested.current = target;
    const next = personas[target];
    if (!next) return;
    void decodePortrait(next.png).then(() => {
      if (requested.current === target) setIndex(target);
    });
  };

  /* Wheel / touch / key → change persona */
  useEffect(() => {
    const tryAdvance = (delta: number) => {
      const now = Date.now();
      if (now - lastSwapRef.current < SCROLL_COOLDOWN) return;
      if (Math.abs(delta) < 14) return;
      lastSwapRef.current = now;
      const len = personas.length;
      go(delta > 0 ? requested.current + 1 : requested.current - 1);
    };

    const onWheel = (e: WheelEvent) => {
      if ((e.target as Element).closest("[role=dialog], nav, input, textarea")) return;
      e.preventDefault();
      tryAdvance(e.deltaY);
    };
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      const dy = touchStartY - (e.touches[0]?.clientY ?? 0);
      if (Math.abs(dy) > 50) {
        tryAdvance(dy);
        touchStartY = e.touches[0]?.clientY ?? 0;
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as Element).closest("input, textarea, [role=dialog], nav")) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") tryAdvance(50);
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") tryAdvance(-50);
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
  }, [personas.length]);

  const stageRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={stageRef}
      className="relative w-full h-[100svh] overflow-hidden bg-background"
      aria-label="Persona showcase"
    >
      <div className="absolute inset-0" aria-hidden>
        {personas.map((p, i) => (
          <motion.div key={p.id} className={`absolute inset-0 ${p.gradient}`}
            initial={false} animate={{ opacity: i === index ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 0.55 }} />
        ))}
        <div className="absolute inset-0 persona-readability" />
      </div>

      {/* Vertical persona rail (desktop) */}
      {/* Vertical persona rail (desktop) — quiet, editorial */}
      <div className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-5">
        <span className="font-mono text-[9px] tracking-[0.42em] text-foreground/35 [writing-mode:vertical-rl] rotate-180">
          PORTFOLIO · MMXXVI
        </span>
        <span className="block w-px h-16 bg-foreground/15" />
        <span className="font-mono text-[9px] tracking-[0.42em] text-foreground/35">
          0{index + 1} / 0{personas.length}
        </span>
      </div>

      {/* Character layer — dominant on both breakpoints */}
      <div className="absolute inset-0 z-[8] pointer-events-none overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-[80svh] portrait:h-[78svh] landscape:h-[94svh] sm:h-[86svh] md:h-[108svh] flex items-end justify-center md:justify-end">
          {personas.map((p, i) => {
            const active = i === index;
            const isFriend = p.id === "friend";
            return (
              <div
                key={p.id}
                className={
                  "absolute bottom-0 h-[92svh] portrait:h-[92svh] landscape:h-[94svh] sm:h-[92svh] md:h-[108svh] flex items-end justify-center pointer-events-none " +
                  (isFriend
                    ? "left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[10%] md:-bottom-[4svh]"
                    : "left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[3%]")
                }
              >
                <motion.img
                  src={p.png}
                  alt={active ? p.title : ""}
                  initial={false}
                  animate={{
                    opacity: active ? 1 : 0,
                  }}
                  transition={{ duration: reduce ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full w-auto max-w-none object-contain object-bottom select-none"
                  style={{
                    transformOrigin: "50% 100%",
                    willChange: "opacity",
                  }}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  // @ts-expect-error fetchpriority is valid HTML but not yet in React types
                  fetchpriority={i === 0 ? "high" : "low"}
                  draggable={false}
                />
              </div>
            );
          })}
          <div className="absolute inset-x-0 bottom-0 h-[22svh] md:h-[22svh] bg-gradient-to-t from-background via-background/70 to-transparent" />
        </div>
      </div>

      {/* Content grid — editorial, bottom-left anchored, tight rhythm */}
      <div className="relative z-20 h-full container mx-auto px-5 sm:px-8 lg:px-16 pt-16 pb-8 sm:pt-20 sm:pb-14 flex items-end md:items-center">
        <div className="w-full md:max-w-[560px] lg:max-w-[600px] pt-[58svh] portrait:pt-[58svh] landscape:pt-[72svh] sm:pt-[58svh] md:pt-0">

          {/* Eyebrow — persona label + tick */}
          <AnimatePresence mode="sync">
            <motion.div
              key={`eyebrow-${persona.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 mb-3 sm:mb-4"
            >
              <span
                className="block h-px w-8"
                style={{ background: persona.accent }}
              />
              <span
                className="font-mono text-[10px] sm:text-[11px] tracking-[0.42em] uppercase"
                style={{ color: persona.accent }}
              >
                {persona.label}
              </span>
            </motion.div>
          </AnimatePresence>

          <div className="relative mb-3 sm:mb-5 min-h-[1.05em]">
            <AnimatePresence mode="sync">
              <CursiveName
                text={persona.title}
                accent={persona.accent}
              />
            </AnimatePresence>
          </div>

          {/* Description */}
          <div className="relative mb-5 sm:mb-6 h-[6.5rem] sm:h-[5rem]">
            <AnimatePresence mode="sync">
              <motion.p
                key={`desc-${persona.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, delay: 0.06 }}
                className="absolute inset-x-0 top-0 font-body text-[13px] sm:text-[14.5px] text-foreground/75 max-w-md leading-[1.65] drop-shadow-[0_2px_14px_hsl(0_0%_0%_/_0.85)]"
              >
                {persona.description}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* CTA + socials — single row */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap mb-5 sm:mb-7">
            <EnterPill to={persona.ctaTo} label={persona.ctaLabel} accent={persona.accent} />
            <AnimatePresence mode="sync">
              <motion.div
                key={`pers-socials-${persona.id}`}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                transition={{ duration: 0.35 }}
                className="flex items-center gap-1.5"
              >
                {(persona.socials ?? []).map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="group relative inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-foreground/10 hover:border-foreground/30 transition-colors"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: `${persona.accent}1f`, boxShadow: `0 0 22px ${persona.accent}55` }}
                    />
                    <s.icon className="relative z-10 w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground/70 group-hover:text-foreground transition-colors" />
                  </a>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Meta strip — editorial, no chunky tiles */}
          <AnimatePresence mode="sync">
            <motion.div
              key={`stats-${persona.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="hidden md:flex items-stretch gap-4 sm:gap-6 pt-4 border-t border-foreground/10 max-w-md"
            >
              {persona.stats.map((s, i) => (
                <div key={s.label} className="flex items-stretch gap-4 sm:gap-6">
                  {i > 0 && <span className="w-px bg-foreground/10" aria-hidden />}
                  <div className="flex flex-col">
                    <span
                      className="font-display font-semibold text-sm sm:text-base leading-tight"
                      style={{ color: persona.accent }}
                    >
                      {s.value}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-foreground/50 font-mono tracking-[0.14em] uppercase mt-1">
                      {s.label}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Scroll hint — bottom center */}
      <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <motion.span
          className="font-mono text-[9px] sm:text-[10px] tracking-[0.4em] text-foreground/40 uppercase"
          animate={reduce ? { opacity: 0.6 } : { y: [0, 4, 0], opacity: [0.4, 0.7, 0.4] }}
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
