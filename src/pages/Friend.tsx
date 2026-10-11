import { portraits } from "@/data/portraits";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import NowStrip from "@/components/NowStrip";
import Guestbook from "@/components/Guestbook";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import YouTubeSection from "@/components/YouTubeSection";
import InstagramFeed from "@/components/InstagramFeed";
import PhotoGallery from "@/components/PhotoGallery";
import SpotifySection from "@/components/SpotifySection";
import FavouritesSection from "@/components/FavouritesSection";
import InterestsSection from "@/components/InterestsSection";
import ContactSection from "@/components/ContactSection";
import MarqueeText from "@/components/MarqueeText";

const PERSONA = {
  label: "ABOUT ME",
  title: "THE HUMAN",
  subtitle: "Off the keyboard — music, films, frames, friends",
  description:
    "When I'm not shipping code, I'm chasing songs on loop, films on repeat, and photographs that mean something. This is the slower, softer side of Sahil — the corners of the internet I call home.",
  bg: "https://i.postimg.cc/gk7rBzHF/Friend-Bg.webp",
  png: portraits.friend,
  accent: "hsl(28 90% 55%)",
};

const TABS = [
  { id: "interests", label: "Interests", render: () => <InterestsSection /> },
  { id: "watch", label: "Watch & Listen", render: () => (<><YouTubeSection /><SpotifySection /></>) },
  { id: "frames", label: "Frames", render: () => (<><InstagramFeed /><PhotoGallery /></>) },
  { id: "favourites", label: "Favourites", render: () => <FavouritesSection /> },
  { id: "guestbook", label: "Guestbook", render: () => <Guestbook /> },
];

const FriendTabs = () => {
  const [tab, setTab] = useState(TABS[0].id);
  const active = TABS.find((t) => t.id === tab) ?? TABS[0];
  return (
    <div>
      <div role="tablist" aria-label="About sections" className="sticky top-16 z-30 bg-background/80 backdrop-blur border-y border-border/30">
        <div className="container mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto py-2">
          {TABS.map((t) => (
            <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)}
              className={`relative shrink-0 px-4 py-2 rounded-full font-display text-xs sm:text-sm font-semibold transition-colors ${tab === t.id ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {tab === t.id && <motion.span layoutId="friend-tab" className="absolute inset-0 rounded-full bg-primary" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={tab} role="tabpanel" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
          {active.render()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const Friend = () => {
  return (
    <div className="min-h-screen bg-background grain overflow-x-hidden">
      <Navbar />

      <section className="relative min-h-[100svh] w-full overflow-hidden flex items-end sm:items-center">
        <div className="absolute inset-0 persona-backdrop persona-backdrop-friend" aria-hidden />

        <img
          src={PERSONA.png}
          alt={PERSONA.title}
          className="persona-portrait persona-portrait-friend"
          decoding="async"
          fetchPriority="high"
          loading="eager" draggable={false}
        />

        <div className="relative z-20 container mx-auto px-5 sm:px-8 lg:px-12 persona-copy">
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
                className="font-body text-xs sm:text-sm text-muted-foreground max-w-md leading-relaxed">
                {PERSONA.description}
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      <div className="py-6 sm:py-8 border-y border-border/30 overflow-hidden">
        <MarqueeText variant="italic" reverse text="MUSIC • FILMS • PHOTOGRAPHY • STORYTELLING • CULTURE" />
      </div>

      <NowStrip />
      <FriendTabs />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Friend;