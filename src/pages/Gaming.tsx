import { motion } from "framer-motion";
import { Gamepad2, ExternalLink, ArrowLeft, Trophy, Clock, Star, Users, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GameShowcase from "@/components/GameShowcase";

const heroImage = "https://i.postimg.cc/J4M53SsL/1000085130.png";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const games = [
  {
    name: "GTA V",
    logo: "https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png",
    description: "Open world action-adventure masterpiece by Rockstar Games.",
    url: "https://www.rockstargames.com/gta-v",
    playtime: "500+ hours",
    rating: "10/10",
    genre: "Action-Adventure",
    highlights: ["Completed main story 3 times", "Online level 200+", "All heists completed"],
    color: "from-green-500/30 to-green-600/10",
  },
  {
    name: "Red Dead Redemption 2",
    logo: "https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg",
    description: "Epic tale of life in America's unforgiving heartland.",
    url: "https://www.rockstargames.com/reddeadredemption2",
    playtime: "300+ hours",
    rating: "10/10",
    genre: "Action-Adventure",
    highlights: ["100% Story completion", "All legendary animals hunted", "Max honor playthrough"],
    color: "from-amber-500/30 to-amber-600/10",
  },
  {
    name: "Getting Over It",
    logo: "https://cdn.cloudflare.steamstatic.com/steam/apps/240720/header.jpg",
    description: "The ultimate test of patience and skill.",
    url: "https://store.steampowered.com/app/240720/Getting_Over_It_with_Bennett_Foddy/",
    playtime: "50+ hours",
    rating: "9/10",
    genre: "Platformer",
    highlights: ["Completed under 10 minutes", "Golden pot achieved", "Only 1 rage quit"],
    color: "from-orange-500/30 to-orange-600/10",
  },
  {
    name: "BGMI",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fb/Battlegrounds_Mobile_India_logo.png/220px-Battlegrounds_Mobile_India_logo.png",
    description: "Battle Royale at its finest. Where legends are born.",
    url: "https://www.battlegroundsmobileindia.com/",
    playtime: "1000+ hours",
    rating: "9/10",
    genre: "Battle Royale",
    highlights: ["Weekend squad drops", "Friends-only lobbies", "TPP, casual pace"],
    playerId: "5697409495",
    color: "from-yellow-500/30 to-yellow-600/10",
  },
  {
    name: "Need for Speed",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Need_for_Speed_2015.jpg/220px-Need_for_Speed_2015.jpg",
    description: "Speed is life. The thrill never ends.",
    url: "https://www.ea.com/games/need-for-speed",
    playtime: "400+ hours",
    rating: "9/10",
    genre: "Racing",
    highlights: ["Highest rank achieved", "All cars unlocked", "Drift king status"],
    color: "from-blue-500/30 to-blue-600/10",
  },
  {
    name: "eFootball",
    logo: "https://upload.wikimedia.org/wikipedia/en/e/e0/EFootball_2022_cover.jpg",
    description: "The beautiful game, digitized.",
    url: "https://www.konami.com/efootball/",
    playtime: "200+ hours",
    rating: "8/10",
    genre: "Sports",
    highlights: ["Division 1 player", "Full legendary squad", "Online win rate: 70%"],
    color: "from-emerald-500/30 to-emerald-600/10",
  },
];

const GamingPage = () => {
  return (
    <div className="min-h-screen bg-background grain">
      <Navbar />

      {/* ── Cinematic Hero ── */}
      <section className="relative min-h-[100svh] w-full overflow-hidden flex items-end sm:items-center">
        {/* Dark gaming-vibe bg */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/10 to-background" />
        <div
          className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-15 blur-[120px]"
          style={{ background: "hsl(0 70% 40%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-10 blur-[100px]"
          style={{ background: "hsl(45 80% 50%)" }}
        />

        <div className="container mx-auto px-5 sm:px-8 lg:px-12 relative z-10 py-24 sm:py-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 items-center">
            {/* Left — Text */}
            <div className="order-2 md:order-1 pb-12 sm:pb-0">
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-6"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.5}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-5"
              >
                <Gamepad2 className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-body text-foreground/80">Player Profile</span>
              </motion.div>

              <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
                className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.95] mb-2"
              >
                <span className="text-foreground" style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: "0.1em" }}>
                  Player Name:
                </span>
              </motion.h1>
              <motion.h2 variants={fadeUp} initial="hidden" animate="visible" custom={1.5}
                className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.95] mb-4"
              >
                <span className="text-gradient" style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: "0.25em" }}>
                  S A A H O
                </span>
              </motion.h2>

              <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
                className="font-body text-xs sm:text-sm text-muted-foreground max-w-md leading-relaxed mb-6"
              >
                Games that defined my journey — from casual sessions to competitive grinds. 
                Each title has its own story, its own challenges, and its own victories.
              </motion.p>

              {/* Stats */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}
                className="flex flex-wrap gap-3 sm:gap-4"
              >
                {[
                  { icon: Clock, label: "Total Playtime", value: "2500+ hrs" },
                  { icon: Trophy, label: "Games Completed", value: "50+" },
                  { icon: Star, label: "Avg Rating", value: "9/10" },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-2 px-3 py-2 rounded-xl glass border border-border/50">
                    <stat.icon className="w-4 h-4 text-primary" />
                    <div>
                      <div className="font-display text-sm sm:text-lg font-bold text-foreground">{stat.value}</div>
                      <div className="text-[9px] sm:text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — Character PNG */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 md:order-2 relative flex justify-center md:justify-end"
            >
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full blur-[80px] opacity-20 pointer-events-none"
                style={{ background: "hsl(0 70% 40%)" }}
              />
              <img
                src={heroImage}
                alt="Sahil — Gamer"
                className="relative z-10 h-[45svh] sm:h-[55svh] md:h-[70svh] lg:h-[78svh] w-auto object-contain object-bottom select-none"
                style={{
                  maskImage: "linear-gradient(to bottom, black 90%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 90%, transparent 100%)",
                  filter: "drop-shadow(0 20px 40px hsl(0 0% 0% / 0.5))",
                }}
                loading="eager"
                draggable={false}
              />

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="hidden md:block absolute bottom-[25%] left-0 glass-strong rounded-lg px-3 py-2 border border-primary/20 z-20"
              >
                <div className="font-mono text-[10px] text-primary font-bold">
                  🎮 BGMI ID: 5697409495
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-muted-foreground/50"
        >
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Games Grid ── */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-2xl sm:text-4xl font-bold">
              <span className="text-foreground">My </span>
              <span className="text-gradient">Game Library</span>
            </h2>
          </motion.div>

        </div>
        <GameShowcase games={games} />
      </section>

      {/* Squad Up CTA */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-transparent to-primary/10" />
            <div className="relative z-10">
              <div className="text-4xl sm:text-6xl mb-4">🎯</div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                <span className="text-foreground">Let's </span>
                <span className="text-gradient">Squad Up!</span>
              </h2>
              <p className="font-body text-sm sm:text-base text-muted-foreground mb-6 max-w-xl mx-auto">
                Add me on BGMI and let's drop together. Winner winner chicken dinner! 🍗
              </p>
              <div className="inline-flex items-center gap-4 px-8 py-4 glass-strong rounded-2xl border border-primary/30">
                <span className="text-3xl">🎮</span>
                <div>
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

export default GamingPage;
