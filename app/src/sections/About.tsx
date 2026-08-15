import { Code2, Palette, CircuitBoard } from "lucide-react";
import Reveal from "@/components/Reveal";
import { profile } from "@/lib/data";

const traits = [
  { icon: Code2, label: "Code", desc: "products shipped to real users" },
  { icon: Palette, label: "Craft", desc: "design, art & real-time 3D" },
  { icon: CircuitBoard, label: "Circuits", desc: "microcontrollers to PLCs" },
];

export default function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="mb-3 font-mono2 text-xs uppercase tracking-[0.25em] text-primary">01 / About</p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
            Engineer by trade,
            <br />
            <span className="text-muted-foreground">artist at heart, maker by curiosity.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* avatar card */}
          <Reveal className="lg:col-span-2" delay={100}>
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card">
              <img
                src="images/avatar.jpg"
                alt={profile.name}
                className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 border-t border-border/60 bg-background/80 p-5 backdrop-blur-md">
                <p className="font-display text-lg font-bold">{profile.name}</p>
                <p className="mt-1 font-mono2 text-[11px] uppercase tracking-wider text-muted-foreground">
                  {profile.tagline}
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {traits.map((t) => (
                <div
                  key={t.label}
                  className="rounded-xl border border-border bg-card p-4 text-center transition-colors hover:border-primary/50"
                >
                  <t.icon className="mx-auto h-5 w-5 text-primary" />
                  <p className="mt-2 font-display text-sm font-semibold">{t.label}</p>
                  <p className="mt-1 text-[10px] leading-snug text-muted-foreground">{t.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* bio */}
          <Reveal className="lg:col-span-3" delay={200}>
            <div className="flex h-full flex-col justify-between gap-10">
              <div className="space-y-6">
                {profile.about.map((p, i) => (
                  <p key={i} className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {i === 0 && (
                      <span className="float-left mr-3 mt-1 font-display text-6xl font-bold leading-[0.8] text-primary">
                        {p.charAt(0)}
                      </span>
                    )}
                    {i === 0 ? p.slice(1) : p}
                  </p>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
                {[
                  ["6+", "products shipped"],
                  ["4", "app-store releases"],
                  ["3", "disciplines fused"],
                  ["∞", "curiosity"],
                ].map(([n, l]) => (
                  <div key={l} className="bg-card p-5 text-center">
                    <p className="font-display text-2xl font-bold text-primary">{n}</p>
                    <p className="mt-1 font-mono2 text-[10px] uppercase tracking-wider text-muted-foreground">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
