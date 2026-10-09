import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Code2, User, Gamepad2, Camera, Home, Wrench, Youtube, Github, Linkedin, Mail, FileText, Command } from "lucide-react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";

const pages = [
  { label: "Home", to: "/", icon: Home },
  { label: "Developer", to: "/developer", icon: Code2 },
  { label: "About Me", to: "/friend", icon: User },
  { label: "Gamer", to: "/gamer", icon: Gamepad2 },
  { label: "Photo Gallery", to: "/gallery", icon: Camera },
  { label: "Skills", to: "/skills", icon: Wrench },
  { label: "YouTube", to: "/youtube", icon: Youtube },
];

const links = [
  { label: "GitHub", href: "https://github.com/Sahil-dev7", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sahil-w712", icon: Linkedin },
  { label: "Email me", href: "mailto:sahilwadhwani712@gmail.com", icon: Mail },
  { label: "Resume / CV", href: "https://raw.githubusercontent.com/Sahil-dev7/Sahil-dev7/main/Resume.pdf", icon: FileText },
];

/** Ctrl/Cmd + K quick jump. Also opens via the floating "⌘K" chip. */
const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((o) => !o); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open quick search"
        className="hidden md:inline-flex fixed bottom-5 left-5 z-[90] items-center gap-1.5 rounded-full border border-border/60 bg-card/70 backdrop-blur px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
      >
        <Command className="w-3 h-3" /> K · Jump
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Where to? Type a page or link…" />
        <CommandList>
          <CommandEmpty>Nothing found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {pages.map((p) => (
              <CommandItem key={p.to} onSelect={() => { setOpen(false); navigate(p.to); }}>
                <p.icon className="mr-2 h-4 w-4" /> {p.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Links">
            {links.map((l) => (
              <CommandItem key={l.label} onSelect={() => { setOpen(false); window.open(l.href, "_blank", "noopener"); }}>
                <l.icon className="mr-2 h-4 w-4" /> {l.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CommandPalette;
