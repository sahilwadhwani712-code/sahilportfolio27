import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/** Top reading-progress line + back-to-top chip. Hidden on the single-screen home. */
const ScrollProgress = () => {
  const { pathname, hash } = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const [show, setShow] = useState(false);

  useEffect(() => {
    const update = () => setShow((current) => current ? window.scrollY > 320 : window.scrollY > 560);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [pathname]);
  useEffect(() => {
    if (!hash) { window.scrollTo({ top: 0, behavior: "instant" }); return; }
    const id = window.setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" }), 350);
    return () => clearTimeout(id);
  }, [pathname, hash]);

  if (pathname === "/") return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] origin-left bg-primary z-[90]"
      />
      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="fixed bottom-5 right-5 z-[90] inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/80 backdrop-blur px-3.5 py-2 text-[11px] font-display font-semibold uppercase tracking-widest text-foreground hover:text-primary hover:border-primary/50 transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" /> Top
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScrollProgress;
