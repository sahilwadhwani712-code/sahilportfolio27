import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Clock, Star, ExternalLink, Users, Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";
import GameShowcase from "@/components/GameShowcase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarqueeText from "@/components/MarqueeText";

const PERSONA = {
  label: "GAMER",
  title: "S A A H O",
  subtitle: "Casual gamer — weekends only",
  description:
    "Gaming is how I unwind, not how I grind. A few BGMI squad matches with friends, an open-world drive in GTA, a quick race in NFS. This is the playlist of games I keep coming back to.",
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

const GamerInner = () => {
  return (
    <div className="min-h-screen bg-background grain overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[100svh] w-full overflow-hidden flex items-end sm:items-center">
        <div className="absolute inset-0 persona-gradient-gamer" />

        <img
          src={PERSONA.png}
          alt={PERSONA.title}
          className="pointer-events-none select-none absolute -bottom-2 sm:-bottom-3 right-0 sm:right-2 md:right-[3%] h-[68svh] sm:h-[82svh] md:h-[92svh] lg:h-[100svh] w-auto object-contain object-bottom z-10"
          style={{ filter: "drop-shadow(0 30px 60px hsl(0 0% 0% / 0.7))" }}
          loading="eager" draggable={false}
        />

        <div className="relative z-20 container mx-auto px-5 sm:px-8 lg:px-12 pt-24 pb-10 sm:py-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-6 md:col-start-1 md:text-left">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-6">
                  <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
              </motion.div>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="font-display text-sm sm:text-lg font-semibold text-foreground/80 mb-3">
                {PERSONA.subtitle}
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                className="font-body text-xs sm:text-sm text-muted-foreground md:ml-auto max-w-md leading-relaxed mb-6">
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
        <MarqueeText variant="solid" text="BGMI • GTA V • RDR2 • NFS • EFOOTBALL • WEEKENDS" />
      </div>

      {/* Game library */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-4xl font-bold">
              <span className="text-foreground">My </span>
              <span className="text-gradient">Game Library</span>
            </h2>
          </motion.div>

        </div>
        <GameShowcase games={games} />
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