import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import YouTubeSection from "@/components/YouTubeSection";
import InstagramFeed from "@/components/InstagramFeed";
import SpotifySection from "@/components/SpotifySection";
import FavouritesSection from "@/components/FavouritesSection";
import InterestsSection from "@/components/InterestsSection";
import ContactSection from "@/components/ContactSection";
import MarqueeText from "@/components/MarqueeText";

const PERSONA = {
  label: "ABOUT ME",
  title: "THE HUMAN",
  subtitle: "Off the keyboard — music, films, frames, friends",
  description:
    "When I'm not shipping code, I'm chasing songs on loop, films on repeat, and photographs that mean something. This is the slower, softer side of Sahil — the corners of the internet I call home.",
  bg: "https://i.postimg.cc/gk7rBzHF/Friend-Bg.webp",
  png: "https://i.postimg.cc/ncWMwFGJ/Friend.webp",
  accent: "hsl(28 90% 55%)",
};

const Friend = () => {
  return (
    <div className="min-h-screen bg-background grain overflow-x-hidden">
      <Navbar />

      <section className="relative min-h-[100svh] w-full overflow-hidden flex items-end sm:items-center">
        {/* Soft white-to-cream gradient — bright, editorial */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsl(36 100% 97%) 0%, hsl(28 60% 92%) 45%, hsl(20 40% 86%) 100%)" }} />
        <div className="absolute -top-32 -right-24 w-[60vw] h-[60vw] max-w-[720px] max-h-[720px] rounded-full pointer-events-none blur-[140px]" style={{ background: PERSONA.accent, opacity: 0.18 }} />
        <div className="absolute -bottom-32 -left-24 w-[55vw] h-[55vw] max-w-[640px] max-h-[640px] rounded-full pointer-events-none blur-[150px]" style={{ background: "hsl(36 100% 80%)", opacity: 0.35 }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 70% 60%, transparent 40%, hsl(28 30% 80% / 0.35) 100%)" }} />

        {/* Inside page → anchored lower-CENTER */}
        <img
          src={PERSONA.png}
          alt={PERSONA.title}
          className="pointer-events-none select-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[58svh] sm:h-[76svh] md:h-[88svh] lg:h-[96svh] w-auto object-contain object-bottom z-10"
          style={{ filter: "drop-shadow(0 24px 48px hsl(28 30% 30% / 0.35))" }}
          loading="eager" draggable={false}
        />

        <div className="relative z-20 container mx-auto px-5 sm:px-8 lg:px-12 pt-24 pb-10 sm:py-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-6 md:col-start-1 md:text-left">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <Link to="/" className="inline-flex items-center gap-2 text-stone-700 hover:text-stone-900 transition-colors text-sm mb-6">
                  <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-2 mb-5">
                <span className="px-3 py-1 font-display font-bold text-xs tracking-widest text-white" style={{ background: PERSONA.accent }}>
                  {PERSONA.label}
                </span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.9] mb-4 text-stone-900">
                {PERSONA.title}
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="font-display text-sm sm:text-lg font-semibold text-stone-800 mb-3">
                {PERSONA.subtitle}
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="font-body text-xs sm:text-sm text-stone-700 md:ml-auto max-w-md leading-relaxed">
                {PERSONA.description}
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      <div className="py-6 sm:py-8 border-y border-border/30 overflow-hidden">
        <MarqueeText text="MUSIC • FILMS • PHOTOGRAPHY • STORYTELLING • CULTURE" />
      </div>

      <InterestsSection />
      <YouTubeSection />
      <SpotifySection />
      <InstagramFeed />
      <FavouritesSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Friend;