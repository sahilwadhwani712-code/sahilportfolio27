import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Clock3, Rocket } from "lucide-react";
import { useState } from "react";

type ProjectStatus = "completed" | "progress" | "upcoming";

type ProjectItem = {
  num: string;
  title: string;
  meta: string;
  year: string;
  preview: string;
  status: ProjectStatus;
  href: string;
};

const categories: { key: ProjectStatus; label: string; icon: typeof CheckCircle2 }[] = [
  { key: "completed", label: "Completed", icon: CheckCircle2 },
  { key: "progress", label: "In Progress", icon: Rocket },
  { key: "upcoming", label: "Upcoming", icon: Clock3 },
];

const projects: ProjectItem[] = [
  { num: "01", title: "Utilix", meta: "Premium Android toolkit · Compose", year: "2025", preview: "🧰", status: "completed", href: "https://github.com/Sahil-dev7" },
  { num: "02", title: "Dopamine Bar", meta: "Short-form blocker · Accessibility API", year: "2025", preview: "🧠", status: "completed", href: "https://github.com/Sahil-dev7" },
  { num: "03", title: "Personal Portfolio", meta: "Cinematic React experience", year: "2026", preview: "🌐", status: "completed", href: "https://github.com/Sahil-dev7" },
  { num: "04", title: "Election Central", meta: "University voting system", year: "2024", preview: "🗳️", status: "completed", href: "https://github.com/Sahil-dev7" },
  { num: "05", title: "Aureo Music Player", meta: "Skeuomorphic media player", year: "2026", preview: "🎵", status: "progress", href: "https://github.com/Sahil-dev7" },
  { num: "06", title: "PC Connect", meta: "Phone-to-computer bridge", year: "2026", preview: "🔗", status: "upcoming", href: "https://github.com/Sahil-dev7" },
  { num: "07", title: "AI Study Companion", meta: "Notes, reminders, focus flows", year: "2026", preview: "📚", status: "upcoming", href: "https://github.com/Sahil-dev7" },
];

const ProjectRow = ({ item, index }: { item: ProjectItem; index: number }) => {
  const [hover, setHover] = useState(false);

  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative block overflow-hidden border-t border-stone-100/14 last:border-b"
    >
      <motion.div
        aria-hidden
        className="absolute inset-0"
        initial={false}
        animate={{ x: hover ? "0%" : "-102%" }}
        transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: "linear-gradient(90deg, hsl(0 85% 58% / 0.22), hsl(22 88% 60% / 0.08))" }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 py-6 sm:py-8 grid grid-cols-12 gap-4 items-center">
        <span className="col-span-2 sm:col-span-1 font-mono text-[11px] sm:text-xs text-stone-400 tabular-nums">{item.num}</span>
        <motion.div
          className="col-span-10 sm:col-span-6"
          animate={{ x: hover ? 14 : 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="font-display font-black text-2xl sm:text-4xl md:text-6xl tracking-tight text-stone-50 leading-[0.9]">
            {item.title}
          </h3>
        </motion.div>
        <p className="col-span-8 col-start-3 sm:col-span-3 sm:col-start-auto font-body text-xs sm:text-sm text-stone-300 leading-relaxed">
          {item.meta}
        </p>
        <div className="col-span-4 sm:col-span-2 flex items-center justify-end gap-3">
          <span className="font-mono text-[11px] sm:text-xs text-stone-400 tabular-nums">{item.year}</span>
          <motion.span
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-stone-50 text-stone-950"
            animate={{ rotate: hover ? 0 : -45, scale: hover ? 1.06 : 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <ArrowUpRight className="h-4 w-4" />
          </motion.span>
        </div>
      </div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[16%] top-1/2 hidden h-32 w-44 -translate-y-1/2 items-center justify-center rounded-[1.5rem] border border-stone-50/20 bg-stone-950/80 text-5xl shadow-2xl backdrop-blur-md md:flex"
        initial={false}
        animate={{ opacity: hover ? 1 : 0, scale: hover ? 1 : 0.86, rotate: hover ? -2 : 0 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      >
        {item.preview}
      </motion.div>
    </motion.a>
  );
};

const DevServicesBlock = () => {
  const [active, setActive] = useState<ProjectStatus>("completed");
  const visible = projects.filter((project) => project.status === active);

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden" style={{ background: "var(--persona-dev-bg)" }}>
      <div className="container mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-stone-400">
              Dev Projects · 2024 — 2026
            </span>
            <h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-stone-50 leading-[0.86]">
              Code that ships, learns, and evolves.
            </h2>
          </div>
          <div className="md:col-span-4 flex md:justify-end">
            <div className="inline-flex flex-wrap gap-2 rounded-full border border-stone-100/15 bg-stone-950/45 p-1 backdrop-blur-md">
              {categories.map((category) => {
                const selected = active === category.key;
                return (
                  <button
                    key={category.key}
                    type="button"
                    onClick={() => setActive(category.key)}
                    className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 font-display text-[11px] sm:text-xs font-semibold transition-colors ${selected ? "bg-stone-50 text-stone-950" : "text-stone-300 hover:text-stone-50"}`}
                  >
                    <category.icon className="h-3.5 w-3.5" />
                    {category.label}
                    <span className="font-mono opacity-70">{projects.filter((project) => project.status === category.key).length}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          {visible.map((item, index) => (
            <ProjectRow key={item.num} item={item} index={index} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default DevServicesBlock;