import { photos } from "@/data/photos";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Camera, X, ChevronLeft, ChevronRight, ArrowLeft, ArrowUpRight, LayoutGrid, Film, Shuffle, Share2, Download } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
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
          className="group relative block w-full overflow-hidden rounded-2xl border border-border/40 bg-card/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={`Open photo ${index + 1}`}
        >
          <img
            src={src}
            alt={`Gallery photo ${index + 1}`}
            loading="lazy"
            decoding="async"
            className="w-full h-auto object-contain transition-transform duration-700 ease-out group-hover:scale-[1.05]"
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
  const gridRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(() => setActive((i) => (i === null ? i : (i + 1) % photos.length)), []);
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
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
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, next, prev]);

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
  const speeds = isMobile ? [0, -40, 0] : [-70, 60, -110];

  // Swipe controls for the lightbox
  const touchX = useRef<number | null>(null);

  return (
    <div className="min-h-screen bg-background grain overflow-x-hidden">
      <Navbar />

      {/* Header */}
      <header className="relative pt-28 sm:pt-36 pb-10 sm:pb-16">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto px-5 sm:px-8 relative z-10">
          <Link
            to="/friend"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to About
          </Link>

          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-primary font-display text-[11px] sm:text-xs font-semibold uppercase tracking-[0.3em]"
          >
            <Camera className="w-3.5 h-3.5" /> Frames I Kept
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="font-display font-bold mt-3 leading-[0.95] text-foreground"
            style={{ fontSize: "clamp(2.4rem, 8vw, 6rem)" }}
          >
            Photo <span className="text-gradient">Gallery</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.16 }}
            className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 font-body text-xs sm:text-sm text-muted-foreground"
          >
            <span>{photos.length} frames</span>
            <span className="hidden sm:inline text-border">/</span>
            <span>Shot on phone, kept for the mood</span>
            <span className="hidden sm:inline text-border">/</span>
            <span>Tap any frame to view full size</span>
          </motion.div>
        </div>
      </header>

      {/* Parallax masonry */}
      <main ref={gridRef} className="container mx-auto px-5 sm:px-8 pb-24 sm:pb-36">
        <div role="tablist" aria-label="Gallery view" className="mb-6 inline-flex gap-1 rounded-full border border-border/50 bg-card/40 p-1">
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

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md p-4"
            onClick={close}
            onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (dx < -50) next();
              if (dx > 50) prev();
              touchX.current = null;
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
          >
            <button
              onClick={close}
              aria-label="Close viewer"
              className="absolute top-4 right-4 p-2 rounded-full border border-border/50 bg-card/60 text-foreground hover:text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous photo"
              className="absolute left-2 sm:left-6 p-2 rounded-full border border-border/50 bg-card/60 text-foreground hover:text-primary transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next photo"
              className="absolute right-2 sm:right-6 p-2 rounded-full border border-border/50 bg-card/60 text-foreground hover:text-primary transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <motion.img
              key={photos[active]}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              src={photos[active]}
              alt={`Gallery photo ${active + 1}`}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[84svh] max-w-[92vw] w-auto h-auto object-contain rounded-xl"
            />
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => share(photos[active])} aria-label="Share photo"
                className="p-2 rounded-full border border-border/50 bg-card/60 text-foreground hover:text-primary transition-colors"><Share2 className="w-4 h-4" /></button>
              <span className="font-body text-xs text-muted-foreground">{active + 1} / {photos.length}</span>
              <button onClick={() => download(photos[active], active)} aria-label="Download photo"
                className="p-2 rounded-full border border-border/50 bg-card/60 text-foreground hover:text-primary transition-colors"><Download className="w-4 h-4" /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
