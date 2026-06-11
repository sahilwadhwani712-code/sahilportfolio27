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
  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="group relative block overflow-hidden border-t border-stone-100/15 last:border-b transition-colors hover:bg-stone-50/[0.04]"
    >
      <div className="relative container mx-auto px-4 sm:px-6 py-4 sm:py-5 grid grid-cols-12 gap-3 sm:gap-4 items-center">
        <span className="col-span-2 sm:col-span-1 font-mono text-[10px] sm:text-xs text-stone-400 tabular-nums">{item.num}</span>
        <div className="col-span-10 sm:col-span-6 transition-transform duration-500 ease-out group-hover:translate-x-2">
          <h3 className="font-display font-black text-lg sm:text-2xl md:text-3xl tracking-tight text-stone-50 leading-[0.95]">
            {item.title}
          </h3>
        </div>
        <p className="col-span-8 col-start-3 sm:col-span-3 sm:col-start-auto font-body text-[11px] sm:text-xs text-stone-300 leading-snug">
          {item.meta}
        </p>
        <div className="col-span-4 sm:col-span-2 flex items-center justify-end gap-2 sm:gap-3">
          <span className="font-mono text-[10px] sm:text-xs text-stone-400 tabular-nums">{item.year}</span>
          <span className="inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-stone-50 text-stone-950 transition-transform duration-500 ease-out -rotate-45 group-hover:rotate-0">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </motion.a>
  );
};

const DevServicesBlock = () => {
  const [active, setActive] = useState<ProjectStatus>("completed");
  const visible = projects.filter((project) => project.status === active);

  return (
    <section className="relative py-10 sm:py-16 overflow-hidden" style={{ background: "var(--persona-dev-bg)" }}>
      <div className="container mx-auto px-4 sm:px-6 mb-6 sm:mb-8">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-stone-400">
              Dev Projects · 2024 — 2026
            </span>
            <h2 className="mt-2 max-w-3xl font-display text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-stone-50 leading-[0.95]">
              Code that ships, learns, and evolves.
            </h2>
          </div>
          <div className="md:col-span-4 flex md:justify-end">
            <div className="inline-flex flex-wrap gap-1 rounded-full border border-stone-100/20 bg-stone-950/40 p-1 backdrop-blur-md">
              {categories.map((category) => {
                const selected = active === category.key;
                return (
                  <button
                    key={category.key}
                    type="button"
                    onClick={() => setActive(category.key)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-display text-[10px] sm:text-xs font-semibold transition-colors ${selected ? "bg-stone-50 text-stone-950" : "text-stone-300 hover:text-stone-50"}`}
                  >
                    <category.icon className="h-3 w-3" />
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
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