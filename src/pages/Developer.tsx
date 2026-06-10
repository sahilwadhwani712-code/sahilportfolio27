import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkillsSection from "@/components/SkillsSection";
import MarqueeText from "@/components/MarqueeText";
import ContactSection from "@/components/ContactSection";
import DevServicesBlock from "@/components/DevServicesBlock";

const PERSONA = {
  label: "DEVELOPER",
  title: "SAHIL DEV",
  subtitle: "Android engineer building clean, useful products",
  description:
    "I build Android apps with Kotlin, Jetpack Compose and AI-assisted workflows — focused on clean UI, reliable architecture and practical everyday use.",
  bg: "https://i.postimg.cc/VLh5HfWP/Dev-bg.webp",
  png: "https://i.postimg.cc/wTr3bqQ6/Dev.webp",
  accent: "hsl(0 85% 55%)",
};

const Developer = () => {
  return (
    <div className="min-h-screen grain overflow-x-hidden" style={{ background: "var(--persona-dev-bg)" }}>
      <Navbar />

      {/* ── Persona Hero ── */}
      <section className="relative min-h-[100svh] w-full overflow-hidden flex items-end sm:items-center">
        <div className="absolute inset-0" style={{ background: "var(--persona-dev-bg)" }} />
        <div
          className="absolute -top-32 -right-24 w-[60vw] h-[60vw] max-w-[720px] max-h-[720px] rounded-full pointer-events-none blur-[140px]"
          style={{ background: PERSONA.accent, opacity: 0.14 }}
        />
        <div
          className="absolute -bottom-32 -left-24 w-[55vw] h-[55vw] max-w-[640px] max-h-[640px] rounded-full pointer-events-none blur-[150px]"
          style={{ background: "hsl(22 88% 45%)", opacity: 0.18 }}
        />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 70% 60%, transparent 40%, hsl(0 0% 0% / 0.58) 100%)" }} />

        {/* Hero PNG — center anchored, text overlaps */}
        {/* Inside page → anchored lower-CENTER, sized so full figure stays visible */}
        <img
          src={PERSONA.png}
          alt={PERSONA.title}
          className="pointer-events-none select-none absolute bottom-0 left-[54%] -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[-1%] lg:right-[2%] h-[112svh] md:h-[108svh] lg:h-[116svh] w-auto max-w-[140vw] object-contain object-bottom z-10"
          style={{ filter: "drop-shadow(0 28px 46px hsl(0 0% 0% / 0.48))" }}
          loading="eager"
          draggable={false}
        />

        <div className="relative z-20 container mx-auto px-5 sm:px-8 lg:px-12 pt-24 pb-10 sm:py-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-6 md:col-start-1 md:text-left">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <Link to="/" className="inline-flex items-center gap-2 text-stone-300 hover:text-stone-50 transition-colors text-sm mb-6">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-2 mb-5">
                <span className="px-3 py-1 font-display font-bold text-xs tracking-widest text-primary-foreground" style={{ background: PERSONA.accent }}>
                  {PERSONA.label}
                </span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.9] mb-4 text-stone-50"
              >
                {PERSONA.title}
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="font-display text-sm sm:text-lg font-semibold text-stone-200 mb-3"
              >
                {PERSONA.subtitle}
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="font-body text-xs sm:text-sm text-stone-300 md:ml-auto max-w-md leading-relaxed"
              >
                {PERSONA.description}
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      <div className="py-6 sm:py-8 border-y border-border/30 overflow-hidden">
        <MarqueeText text="KOTLIN • JETPACK COMPOSE • FIREBASE • MVVM • CLEAN CODE • ANDROID" />
      </div>

      <DevServicesBlock />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Developer;