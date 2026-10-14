import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import RevealText from "@/components/fx/RevealText";
import ExpandedShowcase from "@/components/ExpandedShowcase";
import GearShowcase, { ShowcaseProject } from "@/components/GearShowcase";

const projects = [
  { title: "Utilix — Premium Toolkit", description: "An all-in-one Android utility suite — multiple everyday tools wrapped in a clean Compose UI. PDF tools, image utilities, unit converters, QR, text utilities and more, packaged like a premium app.", tags: ["Kotlin", "Jetpack Compose", "Multi-tool"], image: "🧰", featured: true, color: "from-violet-500 to-fuchsia-600", github: "https://github.com/Sahil-dev7", category: "completed", details: "Designed as a single home for the small tools people open ten apps for. Modular feature flags, shared design system across every utility, offline-first." },
  { title: "Dopamine Bar — Attention Meter", description: "An Android app that blocks Reels & Shorts and visualises your saved attention as a live dopamine bar. Built to fight short-form addiction.", tags: ["Kotlin", "Accessibility API", "Compose"], image: "🧠", featured: true, color: "from-emerald-500 to-teal-600", github: "https://github.com/Sahil-dev7", category: "completed", details: "Uses Android's Accessibility service to detect Shorts/Reels surfaces and gracefully redirect. The dopamine bar fills back up the longer you stay clean." },
  { title: "Aureo Music Player", description: "Next-gen media player with skeuomorphism design — audio & video player with AI recommendations.", tags: ["Kotlin", "Jetpack Compose", "MediaPlayer"], image: "🎵", featured: false, color: "from-rose-500 to-pink-600", github: "https://github.com/Sahil-dev7", category: "running", details: "Tactile skeuomorphic player UI, lock-screen controls, and a recommendation layer that learns from listening time, not skips." },
  { title: "Personal Portfolio", description: "This website — a cinematic portfolio built with React, Tailwind, and Framer Motion.", tags: ["React", "Tailwind", "Framer Motion"], image: "🌐", featured: false, color: "from-red-500 to-rose-600", github: "https://github.com/Sahil-dev7", category: "completed", details: "Three personas, persona-aware backgrounds, scroll-driven navigation and motion-first interactions." },
  { title: "Election Central", description: "Online voting system built as a university project. Secure, real-time results.", tags: ["Web", "Database", "Auth"], image: "🗳️", featured: false, color: "from-indigo-500 to-violet-600", github: "https://github.com/Sahil-dev7", category: "completed", details: "Role-based auth, audit logs, and live tallying with privacy-preserving aggregation." },
  { title: "PC Connect App", description: "Seamlessly bridge your phone and computer. File transfer, notifications, and more.", tags: ["Kotlin", "Networking", "Desktop"], image: "🔗", color: "from-cyan-500 to-blue-600", category: "upcoming", details: "Cross-device clipboard, push notifications mirror, and drag-and-drop file transfer over local network." },
  { title: "Your Idea Here?", description: "Got a project idea? Let me know what you want me to build next!", tags: ["Open for ideas"], image: "💡", color: "from-yellow-500 to-amber-600", isUserIdea: true, category: "upcoming" },
];

const HUES: Record<string, number> = { "Utilix": 285, "Dopamine": 160, "Aureo": 340, "Personal": 0, "Election": 245, "PC": 200 };

const ProjectsSection = () => {
  const [openProject, setOpenProject] = useState<ShowcaseProject | null>(null);
  const showcase: ShowcaseProject[] = projects.filter((p) => !p.isUserIdea).map((p) => ({
    ...p,
    device: /Portfolio|Election/.test(p.title) ? "laptop" : "phone",
    hue: HUES[p.title.split(" ")[0]] ?? 0,
  })) as ShowcaseProject[];

  return () => window.removeEventListener("keydown", onKey);
  }, [openProject]);

  return (
    <section id="projects" className="py-12 sm:py-20 relative overflow-x-clip">
      <div className="absolute inset-0 gradient-blinds opacity-20" />
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-5 sm:mb-8"
        >
          <span className="text-primary font-display text-xs sm:text-sm font-semibold uppercase tracking-widest">Portfolio</span>
          <h2 className="font-display text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-2">
            <RevealText><span className="text-foreground">My </span><span className="text-gradient">Projects</span></RevealText>
          </h2>
          <p className="text-muted-foreground font-body text-[11px] sm:text-sm md:text-base max-w-2xl mx-auto mt-2">
            From completed apps to works in progress — here's what I've been building.
          </p>
        </motion.div>

      </div>
      <GearShowcase projects={showcase} onOpen={setOpenProject} />
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* View all on GitHub */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-5 sm:mt-8"
        >
          <Button 
            variant="outline" 
            size="lg" 
            className="font-display font-semibold glass border-primary/30 hover:bg-primary/10 hover:scale-105 active:scale-95 transition-all duration-200 group btn-bounce click-spark text-[11px] sm:text-sm"
            asChild
          >
            <a href="https://github.com/Sahil-dev7" target="_blank" rel="noopener noreferrer">
              View All on GitHub
              <ArrowUpRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </Button>
        </motion.div>
      </div>

      <ExpandedShowcase item={openProject} onClose={() => setOpenProject(null)} />
    </section>
  );
};

export default ProjectsSection;
