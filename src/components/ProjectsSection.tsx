import { motion, AnimatePresence } from "framer-motion";
import { Github, Star, ArrowUpRight, Mail, Rocket, Clock, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useEffect } from "react";
import TiltCard from "@/components/fx/TiltCard";
import RevealText from "@/components/fx/RevealText";

const categories = [
  { key: "completed", label: "Completed", icon: CheckCircle2, color: "text-green-400" },
  { key: "running", label: "In Progress", icon: Rocket, color: "text-primary" },
  { key: "upcoming", label: "Upcoming", icon: Clock, color: "text-secondary" },
];

const projects = [
  { title: "Utilix — Premium Toolkit", description: "An all-in-one Android utility suite — multiple everyday tools wrapped in a clean Compose UI. PDF tools, image utilities, unit converters, QR, text utilities and more, packaged like a premium app.", tags: ["Kotlin", "Jetpack Compose", "Multi-tool"], image: "🧰", featured: true, color: "from-violet-500 to-fuchsia-600", github: "https://github.com/Sahil-dev7", category: "completed", details: "Designed as a single home for the small tools people open ten apps for. Modular feature flags, shared design system across every utility, offline-first." },
  { title: "Dopamine Bar — Attention Meter", description: "An Android app that blocks Reels & Shorts and visualises your saved attention as a live dopamine bar. Built to fight short-form addiction.", tags: ["Kotlin", "Accessibility API", "Compose"], image: "🧠", featured: true, color: "from-emerald-500 to-teal-600", github: "https://github.com/Sahil-dev7", category: "completed", details: "Uses Android's Accessibility service to detect Shorts/Reels surfaces and gracefully redirect. The dopamine bar fills back up the longer you stay clean." },
  { title: "Aureo Music Player", description: "Next-gen media player with skeuomorphism design — audio & video player with AI recommendations.", tags: ["Kotlin", "Jetpack Compose", "MediaPlayer"], image: "🎵", featured: false, color: "from-rose-500 to-pink-600", github: "https://github.com/Sahil-dev7", category: "running", details: "Tactile skeuomorphic player UI, lock-screen controls, and a recommendation layer that learns from listening time, not skips." },
  { title: "Personal Portfolio", description: "This website — a cinematic portfolio built with React, Tailwind, and Framer Motion.", tags: ["React", "Tailwind", "Framer Motion"], image: "🌐", featured: false, color: "from-red-500 to-rose-600", github: "https://github.com/Sahil-dev7", category: "completed", details: "Three personas, persona-aware backgrounds, scroll-driven navigation and motion-first interactions." },
  { title: "Election Central", description: "Online voting system built as a university project. Secure, real-time results.", tags: ["Web", "Database", "Auth"], image: "🗳️", featured: false, color: "from-indigo-500 to-violet-600", github: "https://github.com/Sahil-dev7", category: "completed", details: "Role-based auth, audit logs, and live tallying with privacy-preserving aggregation." },
  { title: "PC Connect App", description: "Seamlessly bridge your phone and computer. File transfer, notifications, and more.", tags: ["Kotlin", "Networking", "Desktop"], image: "🔗", color: "from-cyan-500 to-blue-600", category: "upcoming", details: "Cross-device clipboard, push notifications mirror, and drag-and-drop file transfer over local network." },
  { title: "Your Idea Here?", description: "Got a project idea? Let me know what you want me to build next!", tags: ["Open for ideas"], image: "💡", color: "from-yellow-500 to-amber-600", isUserIdea: true, category: "upcoming" },
];

const ProjectCard = ({ project, index, onOpen }: { project: any; index: number; onOpen: (p: any) => void }) => (
  <motion.button
    type="button"
    onClick={(e: React.MouseEvent) => {
      if (project.isUserIdea) {
        e.preventDefault();
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      onOpen(project);
    }}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.08 }}
    className={`block group w-full h-full text-left ${project.featured ? "sm:col-span-2" : ""}`}
  >
    <TiltCard className="relative h-full">
      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
      
      <div className={`relative h-full collection-card hover:border-primary/40 transition-all duration-300 ${project.featured ? "p-5 sm:p-7" : "p-4 sm:p-5"}`}>
        <div className="flex items-start gap-3 sm:gap-4">
          <motion.span 
            className="text-2xl sm:text-3xl flex-shrink-0 w-12 h-12 rounded-lg bg-muted flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
            whileHover={{ rotate: [0, -10, 10, 0] }}
          >
            {project.image}
          </motion.span>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-display text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors break-words">
                {project.title}
              </h3>
              {project.featured && (
                <span className="inline-flex items-center gap-0.5 text-[9px] font-display text-primary bg-primary/20 px-1.5 py-0.5 rounded-full flex-shrink-0">
                  <Star className="w-2 h-2" /> Featured
                </span>
              )}
            </div>
            
            <p className="font-body text-muted-foreground text-[10px] sm:text-xs leading-relaxed mb-2 line-clamp-2">
              {project.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-[8px] sm:text-[10px] font-body text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex-shrink-0 ml-2">
                {project.isUserIdea ? (
                  <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                ) : (
                  <Github className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  </motion.button>
);

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("completed");
  const [openProject, setOpenProject] = useState<any | null>(null);
  const filteredProjects = projects.filter(p => p.category === activeCategory);

  useEffect(() => {
    if (!openProject) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenProject(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openProject]);

  return (
    <section id="projects" className="py-12 sm:py-20 relative overflow-hidden">
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

        {/* Horizontal category tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-5 sm:mb-8">
          {categories.map((cat) => (
            <motion.button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-1 sm:gap-2 px-2.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full font-display text-[10px] sm:text-sm font-semibold transition-all duration-300 click-spark ${
                activeCategory === cat.key
                  ? "bg-gradient-primary text-primary-foreground shadow-glow"
                  : "glass-strong text-muted-foreground hover:text-foreground border border-border/50"
              }`}
            >
              <cat.icon className={`w-3 h-3 sm:w-4 sm:h-4 ${activeCategory === cat.key ? "text-primary-foreground" : cat.color}`} />
              {cat.label}
              <span className={`text-[9px] sm:text-xs px-1 py-0.5 rounded-full ${
                activeCategory === cat.key ? "bg-white/20" : "bg-muted/50"
              }`}>
                {projects.filter(p => p.category === cat.key).length}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Vertical project cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 auto-rows-fr"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} onOpen={setOpenProject} />
            ))}
          </motion.div>
        </AnimatePresence>

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

      {/* Project preview popup */}
      <AnimatePresence>
        {openProject && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={() => setOpenProject(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md glass-strong rounded-3xl overflow-hidden border border-primary/30"
            >
              <div className={`relative h-32 sm:h-40 bg-gradient-to-br ${openProject.color}`}>
                <div className="absolute inset-0 flex items-center justify-center text-6xl sm:text-7xl drop-shadow-xl">{openProject.image}</div>
                <button onClick={() => setOpenProject(null)} aria-label="Close project details"
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/60 backdrop-blur flex items-center justify-center hover:bg-background/90 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <h3 id="project-modal-title" className="font-display text-lg sm:text-xl font-bold text-foreground">{openProject.title}</h3>
                  {openProject.featured && (
                    <span className="inline-flex items-center gap-0.5 text-[9px] font-display text-primary bg-primary/20 px-1.5 py-0.5 rounded-full">
                      <Star className="w-2 h-2" /> Featured
                    </span>
                  )}
                </div>
                <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3">{openProject.description}</p>
                {openProject.details && (
                  <p className="font-body text-[11px] sm:text-xs text-foreground/70 leading-relaxed mb-4 italic border-l-2 border-primary/50 pl-3">{openProject.details}</p>
                )}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {openProject.tags.map((tag: string) => (
                    <span key={tag} className="text-[10px] font-body text-foreground/70 bg-muted/60 px-2 py-0.5 rounded-md">{tag}</span>
                  ))}
                </div>
                {openProject.github && (
                  <a href={openProject.github} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-display font-semibold text-primary hover:underline">
                    <Github className="w-3.5 h-3.5" /> View on GitHub <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
