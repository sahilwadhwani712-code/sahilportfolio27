import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Clock, Star, ExternalLink, Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarqueeText from "@/components/MarqueeText";

const PERSONA = {
  label: "GAMER",
  title: "S A A H O",
  subtitle: "Casual gamer — weekends only",
  description:
    "Gaming is how I unwind, not how I grind. A few BGMI squad matches with friends, an open-world drive in GTA, a quick race in NFS. This is the playlist of games I keep coming back to.",
  bg: "https://i.postimg.cc/7YRbQHnw/gamer-bg.webp",
  png: "https://i.postimg.cc/TYshHdqH/Gamer.webp",
  accent: "hsl(190 90% 55%)",
};

const games = [
  { name: "BGMI", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fb/Battlegrounds_Mobile_India_logo.png/220px-Battlegrounds_Mobile_India_logo.png", description: "My weekend squad ritual. A few rounds with friends and we're sorted.", url: "https://www.battlegroundsmobileindia.com/", playtime: "Weekends", rating: "Fun", genre: "Battle Royale", highlights: ["Squad TPP regular", "Drop-and-loot vibes", "Friends-only lobbies"], playerId: "5697409495", color: "from-yellow-500/30 to-yellow-600/10" },
  { name: "GTA V", logo: "https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png", description: "When I just want to drive around Los Santos with no agenda.", url: "https://www.rockstargames.com/gta-v", playtime: "Casual", rating: "Loved it", genre: "Action-Adventure", highlights: ["Story mode favourite", "Long open-world drives", "Background music on"], color: "from-green-500/30 to-green-600/10" },
  { name: "Need for Speed", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Need_for_Speed_2015.jpg/220px-Need_for_Speed_2015.jpg", description: "A quick race when I want pure adrenaline for 20 minutes.", url: "https://www.ea.com/games/need-for-speed", playtime: "Casual", rating: "Solid", genre: "Racing", highlights: ["Tuner builds I love", "Late-night street races", "Drift > grip, always"], color: "from-blue-500/30 to-blue-600/10" },
  { name: "Red Dead Redemption 2", logo: "https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg", description: "Slow, beautiful, cinematic. The story stayed with me.", url: "https://www.rockstargames.com/reddeadredemption2", playtime: "Story run", rating: "All-time", genre: "Action-Adventure", highlights: ["Played for the story", "Loved the world building", "Camp life > missions"], color: "from-amber-500/30 to-amber-600/10" },
  { name: "eFootball", logo: "https://upload.wikimedia.org/wikipedia/en/e/e0/EFootball_2022_cover.jpg", description: "Quick matches when friends are online. Football, but on the couch.", url: "https://www.konami.com/efootball/", playtime: "Now and then", rating: "Fun", genre: "Sports", highlights: ["Quick online matches", "Manager mode tinkering", "Squad of favourites"], color: "from-emerald-500/30 to-emerald-600/10" },
  { name: "Getting Over It", logo: "https://cdn.cloudflare.steamstatic.com/steam/apps/240720/header.jpg", description: "Played for the chaos. Mostly to laugh, sometimes to suffer.", url: "https://store.steampowered.com/app/240720/Getting_Over_It_with_Bennett_Foddy/", playtime: "Few sessions", rating: "Pain/10", genre: "Platformer", highlights: ["Tried, fell, repeated", "Streamed it for friends", "Lots of laughter"], color: "from-orange-500/30 to-orange-600/10" },
];

const Gamer = () => {
  return <GamerInner />;
};

const GameDeck = ({ games }: { games: any[] }) => {
  return (
    <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
      {games.map((g: any, idx: number) => (
        <motion.a
          key={g.name}
          href={g.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="group relative min-h-[420px] overflow-hidden rounded-[1.6rem] border border-stone-50/14 bg-stone-950/55 shadow-2xl"
        >
          <img
            src={g.logo}
            alt={g.name}
            className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-90"
            onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23080f12"/><text x="50" y="62" text-anchor="middle" font-size="50">🎮</text></svg>'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/55 to-transparent" />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
            <span className="rounded-full border border-stone-50/20 bg-stone-950/45 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-stone-100 backdrop-blur-md">{g.genre}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-stone-50 px-3 py-1 font-display text-xs font-bold text-stone-950">
              <Star className="h-3 w-3 fill-current" /> {g.rating}
            </span>
          </div>
          <div className="relative z-10 flex min-h-[420px] flex-col justify-end p-5 sm:p-6">
            <motion.h3 className="font-display text-3xl sm:text-4xl font-black leading-[0.9] text-stone-50" whileHover={{ x: 8 }}>
              {g.name}
            </motion.h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-stone-300">{g.description}</p>
            <div className="mt-4 space-y-2 border-t border-stone-50/14 pt-4">
              {g.highlights.slice(0, 2).map((h: string) => (
                <div key={h} className="flex items-center gap-2 text-xs text-stone-200">
                  <Trophy className="h-3.5 w-3.5 flex-shrink-0" style={{ color: PERSONA.accent }} />
                  <span>{h}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between gap-3">
              <span className="font-mono text-[11px] text-stone-400">{g.playtime}</span>
              <span className="inline-flex items-center gap-1.5 font-display text-xs font-semibold text-stone-50">
                Open <ExternalLink className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  );
};

const GamerInner = () => {
  return (
    <div className="min-h-screen grain overflow-x-hidden" style={{ background: "var(--persona-gamer-bg)" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[100svh] w-full overflow-hidden flex items-end sm:items-center">
        <div className="absolute inset-0" style={{ background: "var(--persona-gamer-bg)" }} />
        <div className="absolute -top-32 -right-24 w-[60vw] h-[60vw] max-w-[720px] max-h-[720px] rounded-full pointer-events-none blur-[140px]" style={{ background: PERSONA.accent, opacity: 0.14 }} />
        <div className="absolute -bottom-32 -left-24 w-[55vw] h-[55vw] max-w-[640px] max-h-[640px] rounded-full pointer-events-none blur-[150px]" style={{ background: "hsl(190 80% 55%)", opacity: 0.16 }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 70% 60%, transparent 40%, hsl(0 0% 0% / 0.58) 100%)" }} />

        {/* Inside page → anchored lower-CENTER. Wider asset (nunchuks) → slightly smaller heights */}
        <img
          src={PERSONA.png}
          alt={PERSONA.title}
          className="pointer-events-none select-none absolute bottom-0 left-[56%] -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[-2%] lg:right-[1%] h-[108svh] md:h-[102svh] lg:h-[110svh] w-auto max-w-[145vw] object-contain object-bottom z-10"
          style={{ filter: "drop-shadow(0 28px 46px hsl(0 0% 0% / 0.48))" }}
          loading="eager" draggable={false}
        />

        <div className="relative z-20 container mx-auto px-5 sm:px-8 lg:px-12 pt-24 pb-10 sm:py-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-6 md:col-start-1 md:text-left">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <Link to="/" className="inline-flex items-center gap-2 text-stone-300 hover:text-stone-50 transition-colors text-sm mb-6">
                  <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-2 mb-5">
                <span className="px-3 py-1 font-display font-bold text-xs tracking-widest text-primary-foreground" style={{ background: PERSONA.accent }}>
                  {PERSONA.label}
                </span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] leading-[0.95] mb-4 text-stone-50 whitespace-nowrap"
                style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: "0.08em" }}
              >
                {PERSONA.title}
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="font-display text-sm sm:text-lg font-semibold text-stone-200 mb-3">
                {PERSONA.subtitle}
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="font-body text-xs sm:text-sm text-stone-300 md:ml-auto max-w-md leading-relaxed mb-6">
                {PERSONA.description}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-3 md:justify-end">
                {[
                  { icon: Clock, label: "When", value: "Weekends" },
                  { icon: Trophy, label: "Vibe", value: "Casual" },
                  { icon: Star, label: "Mood", value: "Wind down" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-2 px-3 py-2 rounded-xl glass border border-border/50">
                    <s.icon className="w-4 h-4" style={{ color: PERSONA.accent }} />
                    <div>
                      <div className="font-display text-sm sm:text-base font-bold text-foreground">{s.value}</div>
                      <div className="text-[9px] sm:text-xs text-muted-foreground">{s.label}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-6 sm:py-8 border-y border-border/30 overflow-hidden">
        <MarqueeText text="BGMI • GTA V • RDR2 • NFS • EFOOTBALL • CONQUEROR" />
      </div>

      {/* Game library */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-4xl font-bold">
              <span className="text-foreground">My </span>
              <span className="text-gradient">Game Library</span>
            </h2>
            <p className="text-muted-foreground font-body text-xs sm:text-sm mt-2">Cards open the official game pages.</p>
          </motion.div>

          <GameDeck games={games} />
        </div>
      </section>

      {/* Squad up */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass-card rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-transparent to-primary/10" />
            <div className="relative z-10">
              <Gamepad2 className="w-10 h-10 mx-auto mb-3" style={{ color: PERSONA.accent }} />
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                <span className="text-foreground">Drop with </span>
                <span className="text-gradient">the Squad</span>
              </h2>
              <p className="font-body text-sm sm:text-base text-muted-foreground mb-6 max-w-xl mx-auto">
                Add me on BGMI for a casual weekend match. No pressure, just vibes.
              </p>
              <div className="inline-flex items-center gap-4 px-8 py-4 glass-strong rounded-2xl border border-primary/30">
                <Gamepad2 className="w-6 h-6" style={{ color: PERSONA.accent }} />
                <div className="text-left">
                  <div className="text-xs text-muted-foreground font-body">BGMI Player ID</div>
                  <div className="font-display text-2xl font-bold text-gradient">5697409495</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gamer;