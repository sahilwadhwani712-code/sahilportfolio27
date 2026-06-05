import Navbar from "@/components/Navbar";
import PersonaSwitcher, { Persona } from "@/components/PersonaSwitcher";
import { Github, Linkedin, Mail, Instagram, Youtube, Music2, Gamepad2, Twitch, Disc3 } from "lucide-react";

const personas: Persona[] = [
  {
    id: "developer",
    label: "DEVELOPER",
    title: "Sahil Wadhwani",
    subtitle: "",
    description:
      "Android engineer working with AI and Jetpack Compose. Building tools that are calm, useful and quietly opinionated.",
    bg: "https://i.postimg.cc/VLh5HfWP/Dev-bg.webp",
    png: "https://i.postimg.cc/wTr3bqQ6/Dev.webp",
    accent: "hsl(0, 85%, 58%)",
    accentSoft: "hsl(0, 85%, 58%, 0.22)",
    ctaLabel: "Enter Dev Mode",
    ctaTo: "/developer",
    stats: [
      { value: "4", label: "Years of Experience" },
      { value: "7+", label: "Apps Shipped" },
      { value: "Compose", label: "Daily Stack" },
    ],
    marquee: [
      "KOTLIN", "JETPACK COMPOSE", "FIREBASE", "MVVM",
      "ANDROID SDK", "DART", "REST APIs", "CLEAN ARCHITECTURE",
    ],
    socials: [
      { icon: Github, label: "GitHub", href: "https://github.com/Sahil-dev7" },
      { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/sahil-w712" },
      { icon: Mail, label: "Email", href: "mailto:sahilwadhwani712@gmail.com" },
    ],
  },
  {
    id: "friend",
    label: "CREATOR",
    title: "Sahil Wadhwani",
    subtitle: "",
    description:
      "Off the keyboard — music on loop, a few frames worth keeping, films worth rewatching.",
    bg: "https://i.postimg.cc/gk7rBzHF/Friend-Bg.webp",
    png: "https://i.postimg.cc/ncWMwFGJ/Friend.webp",
    accent: "hsl(28, 95%, 58%)",
    accentSoft: "hsl(28, 95%, 58%, 0.22)",
    ctaLabel: "About Me",
    ctaTo: "/friend",
    stats: [
      { value: "Music", label: "Daily Loop" },
      { value: "Films", label: "Always Watching" },
      { value: "Frames", label: "Always Capturing" },
    ],
    marquee: [
      "YOUTUBE", "INSTAGRAM", "SPOTIFY", "MUSIC",
      "PHOTOGRAPHY", "FILMS", "CULTURE", "STORYTELLING",
    ],
    socials: [
      { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/__sahil_.27" },
      { icon: Youtube, label: "YouTube", href: "https://youtube.com/@SahilDev" },
      { icon: Music2, label: "Spotify", href: "https://open.spotify.com/" },
    ],
  },
  {
    id: "gamer",
    label: "GAMER",
    title: "Sahil Wadhwani",
    subtitle: "",
    description:
      "Weekend reset — squad drops, slow open-world drives, the odd race. No grind.",
    bg: "https://i.postimg.cc/7YRbQHnw/gamer-bg.webp",
    png: "https://i.postimg.cc/TYshHdqH/Gamer.webp",
    accent: "hsl(190, 95%, 55%)",
    accentSoft: "hsl(190, 95%, 55%, 0.22)",
    ctaLabel: "Open Player Card",
    ctaTo: "/gamer",
    stats: [
      { value: "BGMI", label: "Main Game" },
      { value: "Squad", label: "Mostly TPP" },
      { value: "Chill", label: "Play Style" },
    ],
    marquee: [
      "BGMI", "GTA V", "RDR 2", "NFS",
      "EFOOTBALL", "WEEKENDS", "SQUAD UP",
    ],
    socials: [
      { icon: Gamepad2, label: "BGMI", href: "https://www.battlegroundsmobileindia.com/" },
      { icon: Disc3, label: "Discord", href: "https://discord.com/" },
      { icon: Twitch, label: "Twitch", href: "https://twitch.tv/" },
    ],
  },
];

const Index = () => {
  return (
    <div className="h-screen w-screen bg-background grain overflow-hidden">
      <Navbar />
      <PersonaSwitcher personas={personas} />
    </div>
  );
};

export default Index;
