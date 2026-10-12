import { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent, useReducedMotion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export type ShowcaseProject = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  category: string;
  device: "phone" | "laptop";
  hue: number;
  github?: string;
  details?: string;
};

const STATUS: Record<string, string> = { completed: "Shipped", running: "In progress", upcoming: "Upcoming" };

/** Gear with N teeth drawn as one SVG path. */
const Gear = ({ teeth = 12, className = "" }: { teeth?: number; className?: string }) => {
  const R = 100, r = 84, pts: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a = (i / teeth) * Math.PI * 2, s = (Math.PI * 2) / teeth;
    const p = (ang: number, rad: number) => `${110 + Math.cos(ang) * rad},${110 + Math.sin(ang) * rad}`;
    pts.push(p(a, r), p(a + s * 0.15, R), p(a + s * 0.45, R), p(a + s * 0.6, r));
  }
  return (
    <svg viewBox="0 0 220 220" className={className} aria-hidden>
      <polygon points={pts.join(" ")} fill="hsl(var(--foreground) / 0.05)" stroke="hsl(var(--foreground) / 0.22)" strokeWidth="1.2" />
      <circle cx="110" cy="110" r="58" fill="none" stroke="hsl(var(--foreground) / 0.15)" strokeWidth="1" />
      <circle cx="110" cy="110" r="14" fill="hsl(var(--foreground) / 0.12)" stroke="hsl(var(--foreground) / 0.3)" />
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i / 6) * Math.PI * 2;
        return <line key={i} x1={110 + Math.cos(a) * 16} y1={110 + Math.sin(a) * 16} x2={110 + Math.cos(a) * 56} y2={110 + Math.sin(a) * 56} stroke="hsl(var(--foreground) / 0.15)" strokeWidth="6" strokeLinecap="round" />;
      })}
    </svg>
  );
};

const Screen = ({ p }: { p: ShowcaseProject }) => (
  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center"
    style={{ background: `linear-gradient(160deg, hsl(${p.hue} 70% 22%), hsl(${p.hue + 30} 60% 8%))` }}>
    <span className="text-5xl sm:text-6xl drop-shadow-xl">{p.image}</span>
    <span className="font-display text-xs sm:text-sm font-semibold text-foreground/90">{p.title.split("—")[0].trim()}</span>
    <div className="w-2/3 space-y-1.5">
      <div className="h-1.5 rounded-full bg-foreground/15" />
      <div className="h-1.5 w-3/4 mx-auto rounded-full bg-foreground/10" />
    </div>
  </div>
);

const Device = ({ p }: { p: ShowcaseProject }) =>
  p.device === "phone" ? (
    <div className="relative w-[150px] sm:w-[190px] aspect-[9/19] rounded-[2rem] border-[6px] border-foreground/15 bg-background shadow-2xl overflow-hidden">
      <Screen p={p} />
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-background ring-1 ring-foreground/20" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-foreground/5 to-transparent pointer-events-none" />
    </div>
  ) : (
    <div className="flex flex-col items-center">
      <div className="relative w-[260px] sm:w-[380px] aspect-[16/10] rounded-t-xl border-[6px] border-b-[10px] border-foreground/15 bg-background shadow-2xl overflow-hidden">
        <Screen p={p} />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-foreground/5 to-transparent pointer-events-none" />
      </div>
      <div className="w-[300px] sm:w-[440px] h-3 rounded-b-xl bg-foreground/15" />
    </div>
  );

/** Scroll-linked showcase: each scroll step turns the gear and reveals the next project. */
const GearShowcase = ({ projects, onOpen }: { projects: ShowcaseProject[]; onOpen: (p: ShowcaseProject) => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const n = projects.length;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.6 });
  const rotate = useTransform(smooth, [0, 1], [0, (n - 1) * 60]);
  const counter = useTransform(rotate, (v) => -v * 1.5);
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(n - 1, Math.max(0, Math.round(v * (n - 1))));
    if (i !== active) setActive(i);
  });
  const p = projects[active];

  return (
    <div ref={ref} className="relative" style={{ height: `${n * 80}vh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden flex items-center">
        {/* Environment — one layer, colour transitions via CSS */}
        <div className="absolute inset-0 transition-[background] duration-700 ease-out"
          style={{ background: `radial-gradient(60% 55% at 70% 50%, hsl(${p.hue} 80% 50% / 0.22), transparent 70%), radial-gradient(40% 40% at 15% 80%, hsl(${p.hue + 40} 80% 50% / 0.12), transparent 70%)` }} />

        <div className="relative z-10 container mx-auto px-5 sm:px-8 grid md:grid-cols-2 gap-6 md:gap-10 items-center">
          {/* Text */}
          <div className="order-2 md:order-1">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
              {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")} · {STATUS[p.category]}
            </p>
            <AnimatePresence mode="wait">
              <motion.div key={p.title}
                initial={{ opacity: 0, y: reduce ? 0 : 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduce ? 0 : -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                <h3 className="font-display text-2xl sm:text-4xl font-bold text-foreground leading-tight">{p.title}</h3>
                <p className="font-body text-sm text-muted-foreground mt-3 max-w-md leading-relaxed">{p.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {p.tags.map((t) => <span key={t} className="text-[10px] font-body text-foreground/70 bg-muted/60 px-2 py-0.5 rounded-md">{t}</span>)}
                </div>
                <button onClick={() => onOpen(p)}
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-display font-semibold text-primary hover:underline">
                  View details <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            </AnimatePresence>
            <div className="flex gap-1.5 mt-6" aria-hidden>
              {projects.map((_, i) => (
                <span key={i} className="h-1 rounded-full transition-all duration-500"
                  style={{ width: i === active ? 28 : 8, background: i === active ? `hsl(${p.hue} 80% 60%)` : "hsl(var(--foreground) / 0.2)" }} />
              ))}
            </div>
          </div>

          {/* Gear + device */}
          <div className="order-1 md:order-2 relative h-[46svh] md:h-[70svh] flex items-center justify-center">
            <motion.div style={{ rotate: reduce ? 0 : rotate }} className="absolute w-[300px] h-[300px] sm:w-[480px] sm:h-[480px] will-change-transform">
              <Gear teeth={14} className="w-full h-full" />
            </motion.div>
            <motion.div style={{ rotate: reduce ? 0 : counter }} className="absolute -bottom-6 -right-4 sm:right-4 w-[120px] h-[120px] sm:w-[180px] sm:h-[180px] will-change-transform opacity-70">
              <Gear teeth={9} className="w-full h-full" />
            </motion.div>
            <AnimatePresence mode="wait">
              <motion.div key={p.title} className="relative"
                initial={{ opacity: 0, rotate: reduce ? 0 : 18, y: reduce ? 0 : 40 }}
                animate={{ opacity: 1, rotate: 0, y: 0 }}
                exit={{ opacity: 0, rotate: reduce ? 0 : -18, y: reduce ? 0 : -40 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "50% 160%" }}>
                <Device p={p} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GearShowcase;
