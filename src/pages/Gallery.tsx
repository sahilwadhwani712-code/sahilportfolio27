import { photos } from "@/data/photos";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { Camera, X, ChevronLeft, ChevronRight, ArrowLeft, ArrowUpRight, LayoutGrid, Film, Shuffle, Share2, Download } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";


/** Distribute photos round-robin into N columns so heights stay balanced. */
const toColumns = (items: string[], count: number) => {
  const cols: { src: string; index: number }[][] = Array.from({ length: count }, () => []);
  items.forEach((src, index) => cols[index % count].push({ src, index }));
  return cols;
};

const ParallaxColumn = ({
  items,
  speed,
  onOpen,
  progress,
}: {
  items: { src: string; index: number }[];
  speed: number;
  onOpen: (i: number) => void;
  progress: ReturnType<typeof useSpring>;
}) => {
  const y = useTransform(progress, [0, 1], [0, speed]);

  return (
    <motion.div style={{ y }} className="flex flex-col gap-3 sm:gap-5 will-change-transform">
      {items.map(({ src, index }) => (
        <motion.button
          key={src}
          type="button"
          onClick={() => onOpen(index)}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="group relative block w-full overflow-hidden rounded-lg border border-border/40 bg-card/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={`Open photo ${index + 1}`}
        >
          <img
            src={src}
            alt={`Gallery photo ${index + 1}`}
            loading={index < 3 ? "eager" : "lazy"}
            decoding="async"
            className="w-full h-auto object-contain transition-transform duration-700 ease-out group-hover:scale-[1.015]"
          />
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <span className="font-body text-[11px] tracking-[0.2em] uppercase text-foreground/90">
              {String(index + 1).padStart(2, "0")}
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
};

const Gallery = () => {
  const [active, setActive] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const reduce = useReducedMotion();
  const [direction, setDirection] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(() => { setDirection(1); setActive((i) => (i === null ? i : (i + 1) % photos.length)); }, []);
  const prev = useCallback(
    () => { setDirection(-1); setActive((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)); },
    []
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);

    };
  }, [active !== null, close, next, prev]);

  const [mode, setMode] = useState<"masonry" | "film" | "shuffle">("masonry");
  const [order, setOrder] = useState<string[]>(photos);
  const pickMode = (m: typeof mode) => {
    setMode(m);
    setOrder(m === "shuffle" ? [...photos].sort(() => Math.random() - 0.5) : photos);
  };
  const columnCount = isMobile ? 2 : 3;
  const columns = toColumns(order, columnCount).map((c) => c.map((it) => ({ ...it, index: photos.indexOf(it.src) })));

  const share = async (src: string) => {
    try {
      if (navigator.share) await navigator.share({ title: "Photo by Sahil Wadhwani", url: src });
      else { await navigator.clipboard.writeText(src); toast.success("Link copied"); }
    } catch { /* user cancelled */ }
  };
  const download = async (src: string, i: number) => {
    try {
      const blob = await (await fetch(src)).blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `sahil-frame-${String(i + 1).padStart(2, "0")}.${src.split(".").pop()}`;
      a.click();
      URL.revokeObjectURL(a.href);
    } catch { window.open(src, "_blank", "noopener"); }
  };
  const speeds = reduce ? [0, 0, 0] : isMobile ? [0, -16, 0] : [0, 32, -32];

  // Swipe controls for the lightbox
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);

  return (
    <div className="min-h-screen bg-background grain overflow-x-hidden">
      <Navbar />

      <header className="relative pt-24 sm:pt-28 pb-6 sm:pb-8">
        <div className="container mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between gap-4 mb-5">
            <Button asChild variant="link" className="p-0 h-auto text-muted-foreground"><Link to="/friend"><ArrowLeft /> About</Link></Button>
            <span className="font-mono text-xs text-muted-foreground">{String(photos.length).padStart(2, "0")} frames</span>
          </div>
          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="font-display font-semibold text-4xl sm:text-6xl text-foreground leading-none">Photo <span className="text-muted-foreground">Gallery</span></motion.h1>
          <div className="mt-5 h-px bg-border" />
        </div>
      </header>

      {/* Parallax masonry */}
      <main ref={gridRef} className="container mx-auto px-5 sm:px-8 pb-24 sm:pb-36">
        <div role="tablist" aria-label="Gallery view" className="mb-6 inline-flex gap-1 rounded-lg border border-border/50 bg-card p-1">
          {([["masonry", "Masonry", LayoutGrid], ["film", "Film strip", Film], ["shuffle", "Shuffle", Shuffle]] as const).map(([m, label, Icon]) => (
            <button key={m} role="tab" aria-selected={mode === m} onClick={() => pickMode(m)}
              className={`relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-display font-semibold transition-colors ${mode === m ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {mode === m && <motion.span layoutId="gal-mode" className="absolute inset-0 rounded-full bg-primary" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
              <Icon className="relative w-3.5 h-3.5" /><span className="relative">{label}</span>
            </button>
          ))}
        </div>
        {mode === "film" ? (
          <div className="-mx-5 sm:-mx-8 px-5 sm:px-8 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4">
            {photos.map((src, i) => (
              <motion.button key={src} type="button" onClick={() => setActive(i)}
                initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                className="snap-center shrink-0 h-[60svh] rounded-2xl overflow-hidden border border-border/40 bg-card/30"
                aria-label={`Open photo ${i + 1}`}>
                <img src={src} alt={`Gallery photo ${i + 1}`} loading="lazy" decoding="async" className="h-full w-auto object-contain" />
              </motion.button>
            ))}
          </div>
        ) : (
        <div key={mode + order[0]} className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 items-start">
          {columns.map((col, i) => (
            <ParallaxColumn
              key={i}
              items={col}
              speed={speeds[i] ?? 0}
              onOpen={setActive}
              progress={progress}
            />
          ))}
        </div>
        )}
      </main>

      <Footer />

      <Dialog open={active !== null} onOpenChange={(open) => { if (!open) close(); }}>
        <DialogContent aria-describedby={undefined} className="gallery-viewer fixed inset-0 left-0 top-0 z-[100] max-w-none w-full h-[100dvh] translate-x-0 translate-y-0 rounded-none border-0 bg-background p-4 sm:p-8 gap-0 shadow-none">
          <DialogTitle className="sr-only">Photo viewer</DialogTitle>
          {active !== null && <>
            <div className="absolute left-5 top-5 z-20 font-mono text-xs text-muted-foreground" aria-live="polite">{String(active + 1).padStart(2, "0")} / {photos.length}</div>
            <div className="flex items-center justify-center w-full h-full pb-16 pt-12 overflow-hidden"
              onTouchStart={(e) => {
                swiped.current = false;
                if (e.touches.length !== 1) { touchStart.current = null; return; }
                touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
              }}
              onTouchMove={(e) => { if (e.touches.length > 1) touchStart.current = null; }}
              onTouchEnd={(e) => {
                const start = touchStart.current;
                touchStart.current = null;
                if (!start) return;
                const dx = e.changedTouches[0].clientX - start.x;
                const dy = e.changedTouches[0].clientY - start.y;
                if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.3) { swiped.current = true; dx < 0 ? next() : prev(); }
                else if (dy > 100 && dy > Math.abs(dx) * 1.5) close();
              }}>
              <AnimatePresence initial={false} mode="popLayout" custom={direction}>
                <motion.img key={photos[active]} custom={direction}
                  variants={{ enter: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * 45 }), center: { opacity: 1, x: 0 }, leave: (d: number) => ({ opacity: 0, x: reduce ? 0 : -d * 45 }) }}
                  initial="enter" animate="center" exit="leave" transition={{ duration: reduce ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
                  src={photos[active]} alt={`Gallery photo ${active + 1}`} decoding="async" draggable={false}
                  className="max-h-full max-w-full w-auto h-auto object-contain select-none" />
              </AnimatePresence>
            </div>
            <div className="absolute inset-x-4 bottom-5 sm:inset-x-8 flex items-center justify-between gap-3">
              <Button variant="outline" size="icon" onClick={prev} aria-label="Previous photo" className="rounded-full viewer-arrow"><ChevronLeft /></Button>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={() => share(photos[active])} aria-label="Share photo"><Share2 /></Button>
                <Button variant="ghost" size="icon" onClick={() => download(photos[active], active)} aria-label="Download photo"><Download /></Button>
              </div>
              <Button variant="outline" size="icon" onClick={next} aria-label="Next photo" className="rounded-full viewer-arrow"><ChevronRight /></Button>
            </div>
          </>}
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default Gallery;
