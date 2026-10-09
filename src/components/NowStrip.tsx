import { motion } from "framer-motion";
import { Headphones, Film, Hammer, BookOpen } from "lucide-react";

const now = [
  { icon: Headphones, label: "Listening", value: "Lo-fi & Bollywood on loop" },
  { icon: Film, label: "Watching", value: "Slow cinema, weekend films" },
  { icon: Hammer, label: "Building", value: "Aureo Music Player" },
  { icon: BookOpen, label: "Learning", value: "On-device AI for Android" },
];

/** "Now" — what I'm into right now. */
const NowStrip = () => (
  <section aria-labelledby="now-title" className="container mx-auto px-4 sm:px-6 py-10 sm:py-14">
    <div className="flex items-center gap-3 mb-5">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
      </span>
      <h2 id="now-title" className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/70">Now</h2>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {now.map((n, i) => (
        <motion.div
          key={n.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
          className="rounded-2xl border border-border/50 bg-card/40 p-4 hover:border-primary/40 transition-colors"
        >
          <n.icon className="w-4 h-4 text-primary mb-3" />
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{n.label}</p>
          <p className="font-display text-sm text-foreground mt-1 leading-snug">{n.value}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default NowStrip;
