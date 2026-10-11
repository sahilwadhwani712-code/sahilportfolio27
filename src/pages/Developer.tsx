import { portraits } from "@/data/portraits";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import MarqueeText from "@/components/MarqueeText";
import ContactSection from "@/components/ContactSection";
import WipTicker from "@/components/WipTicker";

const PERSONA = {
  label: "DEVELOPER",
  title: "SAHIL DEV",
  subtitle: "Android engineer building human-first products",
  description:
    "Passionate about AI and shipping tech that genuinely helps people. I turn ideas into clean, user-focused Android apps and explore how intelligent systems can create real-world impact.",
  bg: "https://i.postimg.cc/VLh5HfWP/Dev-bg.webp",
  png: portraits.developer,
  accent: "hsl(0 85% 55%)",
};

const Developer = () => {
  return (
    <div className="min-h-screen bg-background grain overflow-x-hidden">
      <Navbar />

      {/* ── Persona Hero ── */}
      <section className="relative min-h-[100svh] w-full overflow-hidden flex items-end sm:items-center">
        <div className="absolute inset-0 persona-backdrop persona-backdrop-developer" aria-hidden />

        <img
          src={PERSONA.png}
          alt={PERSONA.title}
          className="persona-portrait persona-portrait-developer"
          decoding="async"
          fetchPriority="high"
          loading="eager"
          draggable={false}
        />

        <div className="relative z-20 container mx-auto px-5 sm:px-8 lg:px-12 persona-copy">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-6 md:col-start-1 md:text-left">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-6">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Link>
              </motion.div>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="font-display text-sm sm:text-lg font-semibold text-foreground/80 mb-3"
              >
                {PERSONA.subtitle}
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                className="font-body text-xs sm:text-sm text-muted-foreground max-w-md leading-relaxed"
              >
                {PERSONA.description}
              </motion.p>
              <div className="mt-6"><WipTicker /></div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-6 sm:py-8 border-y border-border/30 overflow-hidden">
        <MarqueeText text="KOTLIN • JETPACK COMPOSE • FIREBASE • MVVM • CLEAN CODE • ANDROID" />
      </div>

      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Developer;