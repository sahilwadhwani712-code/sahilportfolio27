import { motion } from "framer-motion";
import { Gamepad2, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import GameShowcase from "@/components/GameShowcase";
import efootballLogo from "@/assets/efootball-logo.png";

const games = [
  {
    name: "GTA V",
    logo: "https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png",
    description: "Open world action-adventure masterpiece",
    url: "https://www.rockstargames.com/gta-v",
    color: "from-green-500/20 to-green-600/10",
  },
  {
    name: "Red Dead Redemption 2",
    logo: "https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg",
    description: "Epic tale of life in America's unforgiving heartland",
    url: "https://www.rockstargames.com/reddeadredemption2",
    color: "from-amber-500/20 to-amber-600/10",
  },
  {
    name: "Getting Over It",
    logo: "https://cdn.cloudflare.steamstatic.com/steam/apps/240720/header.jpg",
    description: "A game I made for a certain kind of person",
    url: "https://store.steampowered.com/app/240720/Getting_Over_It_with_Bennett_Foddy/",
    color: "from-orange-500/20 to-orange-600/10",
  },
  {
    name: "BGMI",
    logo: "https://www.seekpng.com/png/detail/889-8897281_pubg-logo-png.png",
    description: "Battle Royale · Weekend squads",
    url: "https://www.battlegroundsmobileindia.com/",
    color: "from-yellow-500/20 to-yellow-600/10",
  },
  {
    name: "Need for Speed",
    logo: "https://wallpapers.com/images/featured-full/iphone-xs-max-need-for-speed-heat-background-3whzpe7dasppzbv0.jpg",
    description: "Speed is life - Racing enthusiast",
    url: "https://www.ea.com/games/need-for-speed",
    color: "from-blue-500/20 to-blue-600/10",
  },
  {
    name: "eFootball",
    logo: efootballLogo,
    description: "The beautiful game, digitized",
    url: "https://www.konami.com/efootball/",
    color: "from-emerald-500/20 to-emerald-600/10",
  },
];

const GamingSection = () => {
  return (
    <section id="gaming" className="py-12 sm:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 gradient-blinds opacity-15" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 sm:mb-10"
        >
          <span className="text-primary font-display text-xs sm:text-sm font-semibold uppercase tracking-widest flex items-center justify-center gap-2">
            <Gamepad2 className="w-3 h-3 sm:w-4 sm:h-4" />
            Gaming World
          </span>
          <h2 className="font-display text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-2">
            <span className="text-foreground" style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: "0.15em" }}>Player Name: </span>
            <span className="text-gradient" style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: "0.25em" }}>S A A H O</span>
          </h2>
          <p className="text-muted-foreground font-body text-[11px] sm:text-sm md:text-base max-w-2xl mx-auto mt-2">
            Games that defined my journey — from casual to competitive.
          </p>
        </motion.div>

      </div>
      <GameShowcase games={games} />
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* BGMI ID + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-5 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 glass-strong rounded-full border border-primary/30">
            <span className="text-base sm:text-lg">🎯</span>
            <span className="font-display text-[11px] sm:text-sm text-foreground">
              BGMI ID: <span className="text-primary font-bold">5697409495</span>
            </span>
          </div>
          
          <Button
            asChild
            size="sm"
            className="bg-gradient-primary text-primary-foreground font-display font-semibold px-4 sm:px-5 shadow-glow hover:scale-105 active:scale-95 transition-all duration-200 btn-bounce text-[11px] sm:text-sm"
          >
            <Link to="/gaming">
              View Full Gaming Profile
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default GamingSection;
