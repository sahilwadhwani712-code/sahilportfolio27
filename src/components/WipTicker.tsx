import { motion } from "framer-motion";

/** Live "currently building" badge with a progress bar. */
const WipTicker = ({ project = "Aureo Music Player", progress = 62, note = "Building the recommendation layer" }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    className="inline-flex flex-col gap-2 rounded-2xl border border-border/60 bg-card/60 backdrop-blur px-4 py-3 min-w-[240px]"
    role="status"
  >
    <div className="flex items-center gap-2">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Now building</span>
      <span className="ml-auto font-mono text-[10px] text-foreground/70">{progress}%</span>
    </div>
    <p className="font-display text-sm font-semibold text-foreground">{project}</p>
    <p className="font-body text-[11px] text-muted-foreground -mt-1">{note}</p>
    <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
      <motion.div
        className="h-full bg-primary rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  </motion.div>
);

export default WipTicker;
