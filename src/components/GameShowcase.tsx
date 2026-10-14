import { useMemo, useState } from "react";
import GearShowcase, { type ShowcaseProject } from "@/components/GearShowcase";
import ExpandedShowcase from "@/components/ExpandedShowcase";

export type LibraryGame = {
  name: string;
  logo: string;
  description: string;
  url: string;
  genre?: string;
  highlights?: string[];
  playerId?: string;
};

export default function GameShowcase({ games }: { games: LibraryGame[] }) {
  const [open, setOpen] = useState<ShowcaseProject | null>(null);
  const items = useMemo(() => games.map((game, index): ShowcaseProject => ({
    title: game.name,
    description: game.description,
    image: game.logo,
    artwork: true,
    tags: game.genre ? [game.genre] : ["Game library"],
    details: [...(game.highlights ?? []), ...(game.playerId ? [`BGMI ID: ${game.playerId}`] : [])].join(" · "),
    github: game.url,
    category: "library",
    device: game.name === "BGMI" ? "phone" : "laptop",
    hue: [42, 145, 210, 0, 165, 28][index % 6],
  })), [games]);

  return <><GearShowcase projects={items} onOpen={setOpen} kind="game" /><ExpandedShowcase item={open} onClose={() => setOpen(null)} kind="game" /></>;
}