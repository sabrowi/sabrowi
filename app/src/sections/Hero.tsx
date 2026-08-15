import { useEffect, useState } from "react";
import { ArrowDown, Github, Linkedin, Mail, MapPin } from "lucide-react";
import RoomCanvas from "@/components/RoomCanvas";
import ScrambleText from "@/components/ScrambleText";
import { profile } from "@/lib/data";

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % profile.roles.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="top" className="relative min-h-screen overflow-hidden">
      {/* backdrop */}
      <div className="absolute inset-0 bg-grid mask-fade-b" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 40%, hsl(217 91% 60% / 0.08) 0%, transparent 70%), radial-gradient(40% 40% at 20% 80%, hsl(174 72% 50% / 0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-6 px-6 pb-20 pt-24 lg:grid-cols-2 lg:gap-2 lg:pb-10 lg:pt-16">
        {/* text */}
        <div className="order-2 lg:order-1">
          <p className="mb-4 flex items-center gap-2 font-mono2 text-xs uppercase tracking-[0.25em] text-primary">
            <span className="inline-block h-px w-8 bg-primary" />
            Hello, I'm
          </p>
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Kukuh
            <br />
            Sabrowi<span className="text-primary">.</span>
          </h1>

          <div className="mt-6 flex h-8 items-center font-mono2 text-sm text-muted-foreground sm:text-base">
            <span className="mr-2 text-accent">&gt;_</span>
            <span key={roleIdx} className="role-in text-foreground">
              {profile.roles[roleIdx]}
            </span>
            <span className="caret ml-1 inline-block h-5 w-[9px] bg-primary" />
          </div>

          <ScrambleText
            text="I turn ideas into web & mobile products, immersive interfaces, and connected devices that speak to the physical world — with a designer's eye and an artist's heart."
            className="mt-6 min-h-[4.5rem] max-w-md font-mono2 text-sm leading-relaxed text-muted-foreground sm:text-base"
          />

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="rounded-full bg-primary px-6 py-3 font-mono2 text-xs font-medium uppercase tracking-widest text-primary-foreground transition-transform hover:scale-[1.03] active:scale-95"
            >
              View my work
            </a>
            <a
              href="#contact"
              className="rounded-full border border-border px-6 py-3 font-mono2 text-xs uppercase tracking-widest text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Get in touch
            </a>
          </div>

          <div className="mt-10 flex items-center gap-5">
            <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="text-muted-foreground transition-colors hover:text-primary">
              <Github className="h-5 w-5" />
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="text-muted-foreground transition-colors hover:text-primary">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href={profile.socials.email} aria-label="Email"
              className="text-muted-foreground transition-colors hover:text-primary">
              <Mail className="h-5 w-5" />
            </a>
            <span className="flex items-center gap-1.5 font-mono2 text-[11px] uppercase tracking-wider text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-accent" />
              {profile.location}
            </span>
          </div>
        </div>

        {/* 3D room */}
        <div className="order-1 lg:order-2">
          <div className="relative mx-auto aspect-square w-full max-w-[560px] lg:max-w-none">
            <div
              className="absolute inset-0 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, hsl(217 91% 60% / 0.12) 0%, transparent 65%)" }}
            />
            <RoomCanvas />
            <p className="pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
              my workspace — rendered live in three.js
            </p>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-muted-foreground transition-colors hover:text-primary lg:block"
        aria-label="Scroll down"
      >
        <ArrowDown className="float-y h-5 w-5" />
      </a>
    </section>
  );
}
