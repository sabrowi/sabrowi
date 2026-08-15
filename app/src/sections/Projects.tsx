import { useState } from "react";
import { ExternalLink, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Reveal from "@/components/Reveal";
import TerminalRain from "@/components/TerminalRain";
import { projects, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const [imgIdx, setImgIdx] = useState(0);

  const open = (p: Project) => {
    setActive(p);
    setImgIdx(0);
  };

  return (
    <section id="work" className="relative overflow-hidden py-28">
      {/* hacker terminal background, kept subtle */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.13]"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
        }}
      >
        <TerminalRain className="block h-full w-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="mb-3 font-mono2 text-xs uppercase tracking-[0.25em] text-primary">03 / Selected Work</p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
            Apps that serve <span className="text-primary">real people</span>.
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Production software for police departments, health agencies, cooperatives and travelers.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 100}>
              <button
                onClick={() => open(p)}
                className="group block w-full overflow-hidden rounded-2xl border border-border bg-card text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_20px_50px_-20px_hsl(217_91%_60%/0.25)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                  <img
                    src={`images/portfolio/${p.images[0]}`}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />
                  <span className="absolute left-4 top-4 rounded-full border border-border/60 bg-background/70 px-3 py-1 font-mono2 text-[10px] uppercase tracking-wider text-primary backdrop-blur">
                    {p.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold transition-colors group-hover:text-primary">
                    {p.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 3).map((s) => (
                      <span key={s} className="rounded border border-border px-2 py-0.5 font-mono2 text-[10px] text-muted-foreground">
                        {s}
                      </span>
                    ))}
                    {p.stack.length > 3 && (
                      <span className="rounded border border-border px-2 py-0.5 font-mono2 text-[10px] text-muted-foreground">
                        +{p.stack.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* detail dialog */}
      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-3xl border-border bg-popover p-0 overflow-hidden [&>button]:hidden">
          <DialogTitle className="sr-only">{active?.name}</DialogTitle>
          {active && (
            <div>
              <div className="relative aspect-[16/10] bg-secondary">
                <img
                  src={`images/portfolio/${active.images[imgIdx]}`}
                  alt={`${active.name} screenshot ${imgIdx + 1}`}
                  className="h-full w-full object-contain"
                />
                <button
                  onClick={() => setActive(null)}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/70 text-foreground backdrop-blur transition-colors hover:text-primary"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
                {active.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setImgIdx((i) => (i - 1 + active.images.length) % active.images.length)}
                      className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/70 text-foreground backdrop-blur transition-colors hover:text-primary"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setImgIdx((i) => (i + 1) % active.images.length)}
                      className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/70 text-foreground backdrop-blur transition-colors hover:text-primary"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                      {active.images.map((_, i) => (
                        <span
                          key={i}
                          className={cn(
                            "h-1.5 rounded-full transition-all",
                            i === imgIdx ? "w-5 bg-primary" : "w-1.5 bg-foreground/30",
                          )}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-mono2 text-[10px] uppercase tracking-widest text-primary">{active.category}</span>
                    <h3 className="mt-1 font-display text-2xl font-bold">{active.name}</h3>
                  </div>
                  {active.link && (
                    <a
                      href={active.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex shrink-0 items-center gap-2 rounded-full bg-primary px-4 py-2 font-mono2 text-[11px] font-medium uppercase tracking-wider text-primary-foreground transition-transform hover:scale-105"
                    >
                      {active.linkName}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{active.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {active.stack.map((s) => (
                    <span key={s} className="rounded-full border border-border bg-secondary/60 px-3 py-1 font-mono2 text-[11px] text-muted-foreground">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
