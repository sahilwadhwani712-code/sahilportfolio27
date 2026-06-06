import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

type Item = {
  num: string;
  title: string;
  category: string;
  year: string;
  preview: string; // emoji or short label
  color: string;   // gradient classes
  href: string;
};

const items: Item[] = [
  { num: "01", title: "Utilix — Premium Toolkit", category: "Android · Compose", year: "2025", preview: "🧰", color: "from-violet-500 to-fuchsia-600", href: "https://github.com/Sahil-dev7" },
  { num: "02", title: "Dopamine Bar", category: "Attention · Accessibility", year: "2025", preview: "🧠", color: "from-emerald-500 to-teal-600", href: "https://github.com/Sahil-dev7" },
  { num: "03", title: "Aureo Music Player", category: "Media · Skeuomorphic UI", year: "2025", preview: "🎵", color: "from-rose-500 to-pink-600", href: "https://github.com/Sahil-dev7" },
  { num: "04", title: "Personal Portfolio", category: "Web · Cinematic", year: "2026", preview: "🌐", color: "from-orange-500 to-red-500", href: "https://github.com/Sahil-dev7" },
  { num: "05", title: "Election Central", category: "Web · Secure Voting", year: "2024", preview: "🗳️", color: "from-indigo-500 to-violet-600", href: "https://github.com/Sahil-dev7" },
];

const Row = ({ item, index }: { item: Item; index: number }) => {
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
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative block border-t border-stone-900/15 last:border-b py-6 sm:py-8 overflow-hidden"
    >
      {/* Sliding wash on hover */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10"
        initial={false}
        animate={{ x: hover ? "0%" : "-101%" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            "linear-gradient(90deg, hsl(28 95% 58% / 0.10) 0%, hsl(28 95% 58% / 0.02) 100%)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 grid grid-cols-12 items-center gap-4">
        {/* Number */}
        <div className="col-span-2 sm:col-span-1 font-mono text-[11px] sm:text-xs text-stone-500 tabular-nums">
          {item.num}
        </div>

        {/* Title slides slightly right on hover */}
        <motion.div
          className="col-span-10 sm:col-span-6"
          animate={{ x: hover ? 10 : 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="font-display font-bold text-xl sm:text-3xl md:text-4xl tracking-tight text-stone-900 leading-tight">
            {item.title}
          </h3>
        </motion.div>

        {/* Category */}
        <div className="hidden sm:block col-span-3 font-body text-xs sm:text-sm text-stone-600">
          {item.category}
        </div>

        {/* Year + arrow */}
        <div className="col-span-12 sm:col-span-2 flex items-center justify-end gap-3">
          <span className="font-mono text-[11px] sm:text-xs text-stone-500 tabular-nums">
            {item.year}
          </span>
          <motion.span
            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-stone-900 text-white"
            animate={{ rotate: hover ? 0 : -45, scale: hover ? 1.05 : 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <ArrowUpRight className="w-4 h-4" />
          </motion.span>
        </div>
      </div>

      {/* Floating thumbnail preview that tracks hover (desktop only) */}
      <motion.div
        aria-hidden
        className={`pointer-events-none hidden md:flex absolute top-1/2 right-[18%] -translate-y-1/2 w-40 h-28 rounded-2xl bg-gradient-to-br ${item.color} items-center justify-center text-4xl shadow-2xl`}
        initial={false}
        animate={{
          opacity: hover ? 1 : 0,
          scale: hover ? 1 : 0.85,
          y: hover ? "-50%" : "-30%",
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {item.preview}
      </motion.div>
    </motion.a>
  );
};

const DevServicesBlock = () => {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-stone-500">
              Selected Work · 2024 — 2026
            </span>
            <h2 className="mt-3 font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight text-stone-900 leading-[0.95]">
              Things I’ve been building.
            </h2>
          </div>
          <a
            href="https://github.com/Sahil-dev7"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 font-display text-sm font-semibold text-stone-900 border-b border-stone-900 pb-1 hover:gap-3 transition-all"
          >
            View all on GitHub <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div>
        {items.map((it, i) => (
          <Row key={it.num} item={it} index={i} />
        ))}
      </div>
    </section>
  );
};

export default DevServicesBlock;