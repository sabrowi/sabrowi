import { Code2, Box, Cpu, Server } from "lucide-react";
import Reveal from "@/components/Reveal";
import PcbCircuit from "@/components/PcbCircuit";
import { skillGroups } from "@/lib/data";

const icons = { code: Code2, cube: Box, cpu: Cpu, server: Server };

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-28">
      {/* PCB circuit pulse background */}
      <PcbCircuit className="pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="mb-3 font-mono2 text-xs uppercase tracking-[0.25em] text-primary">02 / Skills</p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
            From pixels to <span className="text-accent">PLCs</span>.
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            A toolkit that spans the whole stack — and then leaves the screen entirely.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {skillGroups.map((g, i) => {
            const Icon = icons[g.icon];
            return (
              <Reveal key={g.title} delay={i * 100}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50">
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: "hsl(217 91% 60% / 0.15)" }}
                  />
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-secondary transition-colors group-hover:border-primary/50">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-mono2 text-[10px] uppercase tracking-widest text-muted-foreground/60">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold">{g.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{g.blurb}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {g.skills.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-border bg-secondary/60 px-3 py-1 font-mono2 text-[11px] text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
