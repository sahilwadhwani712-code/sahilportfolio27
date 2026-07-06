import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Code2, Coffee, Gamepad2 } from "lucide-react";
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

const PERSONA_ICONS: Record<string, LucideIcon> = {
  developer: Code2,
  friend: Coffee,
  gamer: Gamepad2,
};

/* Per-persona PNG placement on the HOME / outside switcher.
   Each asset has different dimensions, so we tune them individually
   so nothing gets cut and they sit cleanly lower-right. */
const HOME_PLACEMENT: Record<
  string,
  {
    // mobile (below md)
    mobileH: string;       // Tailwind height class, e.g. "h-[62svh]"
    mobileRight: string;   // Tailwind right offset, e.g. "right-[-6%]"
    mobileBottom: string;
    // desktop (md+)
    desktopH: string;
    desktopRight: string;
    desktopBottom: string;
  }
> = {
  developer: {
    mobileH: "h-[68svh]",
    mobileRight: "right-[-2%]",
    mobileBottom: "bottom-0",
    desktopH: "md:h-[96svh] lg:h-[104svh]",
    desktopRight: "md:right-[2%] lg:right-[4%]",
    desktopBottom: "md:bottom-0",
  },
  friend: {
    mobileH: "h-[66svh]",
    mobileRight: "right-[0%]",
    mobileBottom: "bottom-0",
    desktopH: "md:h-[92svh] lg:h-[100svh]",
    desktopRight: "md:right-[4%] lg:right-[6%]",
    desktopBottom: "md:bottom-0",
  },
  gamer: {
    // wider asset (nunchuks) — give it more horizontal room
    mobileH: "h-[64svh]",
    mobileRight: "right-[-4%]",
    mobileBottom: "bottom-2",
    desktopH: "md:h-[88svh] lg:h-[96svh]",
    desktopRight: "md:right-[1%] lg:right-[3%]",
    desktopBottom: "md:bottom-2",
  },
};

/* Cursive name — single line, viral feel */
const CursiveName = ({ text, accent, isLight }: { text: string; accent: string; isLight: boolean }) => {
  const letters = Array.from(text);
  return (
    <h1
      className={`leading-[0.9] md:whitespace-nowrap ${isLight ? "text-stone-900" : "text-stone-50"}`}
      style={{
        fontFamily: "'Italianno', 'Caveat', cursive",
        fontWeight: 400,
        fontStyle: "italic",
        fontSize: "clamp(2.75rem, 7vw, 5.25rem)",
        textShadow: `0 12px 40px ${accent}55, 0 1px 0 ${accent}22`,
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
  isLight,
}: {
  to: string;
  label: string;
  accent: string;
  isLight: boolean;
}) => {
  return (
    <div className="inline-block">
      <Link
        to={to}
        className={`group relative inline-flex items-center gap-2.5 sm:gap-3 pl-4 sm:pl-5 pr-1.5 py-1.5 sm:py-2 rounded-full font-display font-medium text-[10px] sm:text-[11px] uppercase tracking-[0.22em] overflow-hidden ${isLight ? "text-stone-900" : "text-stone-50"}`}
        style={{
          background: isLight ? "hsl(0 0% 100% / 0.55)" : "hsl(0 0% 100% / 0.08)",
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
          className="relative z-10 inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-colors group-hover:bg-white/20"
          style={{ background: accent }}
        >
          <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    </div>
  );
};

const PersonaSwitcher = ({ personas }: { personas: Persona[] }) => {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const persona = personas[index];
  const isLight = persona.id === "friend";

  const go = (n: number) => setIndex(n);

  /* Hero image stays static — no mouse-follow parallax */
  const stageRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={stageRef}
      className="relative w-full h-screen overflow-hidden bg-background"
      aria-label="Persona showcase"
    >
      {/* Layered backgrounds — heavy blur + dark blend so PNG sits cleanly */}
      <div className="absolute inset-0">
        {/* Dark cinematic base — used for developer & gamer */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, hsl(24 8% 5%) 0%, hsl(24 8% 8%) 50%, hsl(24 8% 4%) 100%)",
          }}
        />
        {/* Soft white-to-cream editorial gradient — only for the Friend (nunchuks) persona */}
        <motion.div
          aria-hidden
          className="absolute inset-0"
          animate={{ opacity: isLight ? 1 : 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background:
              "linear-gradient(135deg, hsl(36 100% 97%) 0%, hsl(28 60% 92%) 45%, hsl(20 40% 86%) 100%)",
          }}
        />
        {/* Persona-tinted accent wash — subtle, follows active persona */}
        <motion.div
          aria-hidden
          className="absolute inset-0"
          animate={{
            background: `radial-gradient(60% 70% at 78% 60%, ${persona.accent}26 0%, transparent 60%), radial-gradient(50% 60% at 18% 30%, ${persona.accentSoft} 0%, transparent 70%)`,
          }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        />
        {/* Soft vignette so edges feel finished — adapts to tone */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: isLight
              ? "radial-gradient(ellipse at 70% 60%, transparent 40%, hsl(28 30% 80% / 0.35) 100%)"
              : "radial-gradient(ellipse at 70% 60%, transparent 40%, hsl(0 0% 0% / 0.55) 100%)",
          }}
          transition={{ duration: 0.7 }}
        />
      </div>

      {/* Vertical persona rail (desktop) */}
      <div className="hidden lg:flex absolute left-5 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-6">
        <span className="font-mono text-[9px] tracking-[0.4em] text-stone-600/70 [writing-mode:vertical-rl] rotate-180">
          SAHIL · WADHWANI
        </span>
        <span className="block w-px h-14 bg-stone-500/30" />
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
        <span className="block w-px h-14 bg-stone-500/30" />
      </div>

      {/* Character layer — per-persona placement, lower-right on home,
          tuned per asset so nothing gets cut on either device */}
      <div className="absolute inset-0 z-[8] pointer-events-none overflow-hidden">
        <div className="absolute inset-0">
          {/* Soft warm glow behind the active subject */}
          <motion.div
            aria-hidden
            className="absolute bottom-0 right-[-5%] md:right-[5%] w-[70%] md:w-[42%] h-[55%] rounded-full blur-[110px]"
            animate={{
              background: persona.accent,
              opacity: reduce ? 0.22 : [0.18, 0.32, 0.18],
            }}
            transition={{
              background: { duration: 0.8 },
              opacity: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            }}
          />
          {personas.map((p, i) => {
            const active = i === index;
            const place = HOME_PLACEMENT[p.id] ?? HOME_PLACEMENT.developer;
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
                className={[
                  "absolute w-auto max-w-none object-contain object-bottom select-none pointer-events-none",
                  place.mobileBottom,
                  place.mobileRight,
                  place.mobileH,
                  place.desktopBottom,
                  place.desktopRight,
                  place.desktopH,
                ].join(" ")}
                style={{
                  transformOrigin: "100% 100%",
                  filter:
                    "drop-shadow(0 26px 44px hsl(28 30% 30% / 0.32)) drop-shadow(0 0 22px hsl(28 30% 30% / 0.18))",
                  willChange: "opacity, transform",
                }}
                loading={i === 0 ? "eager" : "lazy"}
                draggable={false}
              />
            );
          })}
        </div>
      </div>

      {/* Content grid — bottom anchored, safe top clearance under navbar,
          right padding reserved for icon rail so nothing sits under it */}
      <div className="relative z-20 h-full container mx-auto px-5 sm:px-8 lg:px-16 pt-24 pb-8 sm:pt-28 sm:pb-12 pr-16 sm:pr-20 flex flex-col justify-end">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-end w-full">
          {/* LEFT — copy */}
          <div className={`md:col-span-7 lg:col-span-6 relative max-w-xl ${isLight ? "text-stone-900" : "text-stone-100"}`}>

            <div className="relative mb-2 sm:mb-3 min-h-[1.1em]">
              <AnimatePresence mode="wait">
                <CursiveName
                  key={`title-${persona.id}`}
                  text={persona.title}
                  accent={persona.accent}
                  isLight={isLight}
                />
              </AnimatePresence>
            </div>

            {/* Description — visible on mobile too, more breathing room */}
            <div className="mb-3 sm:mb-4 min-h-[3.5rem] sm:min-h-[3rem]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`desc-${persona.id}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.5, delay: 0.08 }}
                  className={`font-body text-[13px] sm:text-[14px] max-w-md leading-[1.55] ${isLight ? "text-stone-700" : "text-stone-300/90"}`}
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
                isLight={isLight}
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
                className="flex items-center gap-2 mt-3 sm:mt-4"
              >
                {(persona.socials ?? []).map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className={`group relative inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border transition-colors ${isLight ? "border-stone-500/30 hover:border-stone-700/60" : "border-white/15 hover:border-white/35"}`}
                    style={{
                      background: isLight ? "hsl(0 0% 100% / 0.55)" : "hsl(0 0% 100% / 0.06)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                    }}
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: `${persona.accent}33`, boxShadow: `0 0 22px ${persona.accent}66` }}
                    />
                    <s.icon className={`relative z-10 w-[15px] h-[15px] transition-colors ${isLight ? "text-stone-800 group-hover:text-stone-900" : "text-stone-200 group-hover:text-white"}`} />
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
                    className="rounded-xl px-3.5 py-2 cursor-default"
                    style={{
                      background: isLight ? "hsl(0 0% 100% / 0.6)" : "hsl(0 0% 100% / 0.045)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      boxShadow: isLight
                        ? `0 8px 24px hsl(28 30% 30% / 0.18), inset 0 0 0 1px ${persona.accent}55`
                        : `0 10px 28px hsl(0 0% 0% / 0.35), inset 0 0 0 1px ${persona.accent}44`,
                    }}
                  >
                    <div
                      className="font-display text-base sm:text-xl font-bold leading-none"
                      style={{ color: persona.accent }}
                    >
                      {s.value}
                    </div>
                    <div className={`text-[10px] sm:text-[11px] font-body mt-1 tracking-wide ${isLight ? "text-stone-700" : "text-stone-400"}`}>
                      {s.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Right rail — persona icon switcher (replaces scroll) */}
      <div className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3">
        {personas.map((p, i) => {
          const isActive = i === index;
          const Icon = PERSONA_ICONS[p.id] ?? Code2;
          return (
            <button
              key={p.id}
              onClick={() => go(i)}
              aria-label={`Switch to ${p.label}`}
              title={p.label}
              className="group relative inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full transition-transform hover:scale-105 active:scale-95"
              style={{
                background: isActive
                  ? `${p.accent}`
                  : isLight
                    ? "hsl(0 0% 100% / 0.6)"
                    : "hsl(0 0% 100% / 0.08)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow: isActive
                  ? `0 10px 28px -8px ${p.accent}cc, 0 0 0 1px ${p.accent}`
                  : `0 0 0 1px ${isLight ? "hsl(24 8% 20% / 0.15)" : "hsl(0 0% 100% / 0.18)"}`,
              }}
            >
              <Icon
                className="w-4 h-4 sm:w-[18px] sm:h-[18px] transition-colors"
                style={{
                  color: isActive
                    ? "white"
                    : isLight
                      ? "hsl(24 8% 20%)"
                      : "hsl(0 0% 92%)",
                }}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default PersonaSwitcher;
