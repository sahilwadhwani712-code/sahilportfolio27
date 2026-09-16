import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, ChevronLeft, ChevronRight } from "lucide-react";

const photos = [
  "https://i.postimg.cc/HnxHJTX9/1000325079.jpg",
  "https://i.postimg.cc/XqJ3Znd8/1000325081.jpg",
  "https://i.postimg.cc/1XjSwbr0/1000325082.jpg",
  "https://i.postimg.cc/hv5nTN0K/1000325083.jpg",
  "https://i.postimg.cc/8zWGfKJ0/1000325084.jpg",
  "https://i.postimg.cc/QN4h2WZ7/1000325085.jpg",
  "https://i.postimg.cc/Gh6r2w2x/1000325087.jpg",
  "https://i.postimg.cc/kXL9434G/1000325088.jpg",
  "https://i.postimg.cc/fL5DTVtN/1000325090.png",
  "https://i.postimg.cc/50pbNXHr/1000325102.webp",
  "https://i.postimg.cc/cHT04vKP/1000326222.jpg",
  "https://i.postimg.cc/rmgMFDdv/1000326223.jpg",
  "https://i.postimg.cc/HxTTgwxD/1000326224.jpg",
];

const PhotoGallery = () => {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % photos.length)),
    []
  );
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

  return (
    <section id="gallery" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="text-primary font-display text-xs sm:text-sm font-semibold uppercase tracking-widest flex items-center justify-center gap-2">
            <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
            Frames I Kept
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-2">
            <span className="text-foreground">Photo </span>
            <span className="text-gradient">Gallery</span>
          </h2>
        </motion.div>

        {/* Masonry — natural dimensions, never cropped */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 sm:gap-4 [column-fill:_balance]">
          {photos.map((src, i) => (
            <motion.button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
              className="group mb-3 sm:mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl border border-border/40 bg-card/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={`Open photo ${i + 1}`}
            >
              <img
                src={src}
                alt={`Gallery photo ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md p-4"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
          >
            <button
              onClick={close}
              aria-label="Close"
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
              className="max-h-[85svh] max-w-[92vw] w-auto h-auto object-contain rounded-xl"
            />
            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 font-body text-xs text-muted-foreground">
              {active + 1} / {photos.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhotoGallery;
