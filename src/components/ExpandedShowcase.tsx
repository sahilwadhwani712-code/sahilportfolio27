import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Device, type ShowcaseProject } from "@/components/GearShowcase";

type Props = {
  item: ShowcaseProject | null;
  onClose: () => void;
  kind?: "project" | "game";
};

export default function ExpandedShowcase({ item, onClose, kind = "project" }: Props) {
  return (
    <Dialog open={Boolean(item)} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="showcase-expanded max-w-[calc(100%-2rem)] sm:max-w-5xl max-h-[90svh] overflow-y-auto p-0 gap-0 rounded-lg border-border bg-background">
        {item && (
          <div className="grid md:grid-cols-[1fr_1.1fr]">
            <div className="showcase-environment relative min-h-64 md:min-h-[520px] flex items-center justify-center p-8" style={{ "--showcase-hue": item.hue } as React.CSSProperties}>
              <div className="relative scale-90 sm:scale-100"><Device p={item} /></div>
            </div>
            <div className="p-6 sm:p-10 flex flex-col items-start gap-6">
              <p className="font-mono text-xs uppercase text-muted-foreground">{kind === "game" ? "Game library" : item.category === "completed" ? "Completed" : item.category === "running" ? "In progress" : "Upcoming"}</p>
              <DialogTitle className="font-display text-2xl sm:text-3xl leading-tight pr-4">{item.title}</DialogTitle>
              <DialogDescription className="font-body text-sm leading-relaxed">{item.description}</DialogDescription>
              {item.details && <p className="font-body text-sm leading-relaxed text-foreground/80">{item.details}</p>}
              <ul className="flex flex-wrap gap-2" aria-label={kind === "game" ? "Game details" : "Technologies"}>
                {item.tags.map((tag) => <li key={tag} className="rounded-md bg-muted px-3 py-1 text-xs text-muted-foreground">{tag}</li>)}
              </ul>
              <div className="mt-auto flex flex-wrap gap-3 pt-4">
                {item.github && <Button asChild><a href={item.github} target="_blank" rel="noopener noreferrer">{kind === "project" ? <Github /> : <ArrowUpRight />}{kind === "project" ? "View on GitHub" : "Visit game"}</a></Button>}
                <Button variant="outline" onClick={onClose}><ArrowLeft />{kind === "project" ? "Back to Projects" : "Back to Games"}</Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}