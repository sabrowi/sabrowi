import { Github, Linkedin, Facebook, Mail, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import MatrixRain from "@/components/MatrixRain";
import { profile } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="relative overflow-hidden border-t border-border/60">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 100%, hsl(217 91% 60% / 0.1) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-28">
        <Reveal className="text-center">
          <p className="mb-3 font-mono2 text-xs uppercase tracking-[0.25em] text-primary">04 / Contact</p>
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-6xl">
            Let's build something
            <br />
            <span className="text-glow text-primary">worth rendering</span>.
          </h2>
          <p className="mx-auto mt-6 max-w-md text-muted-foreground">
            Open for collaboration — product engineering, creative 3D for the web, or IoT systems that talk to the real world.
          </p>

          <a
            href={profile.socials.email}
            className="group mt-10 inline-flex items-center gap-3 rounded-full border border-primary/50 bg-primary/10 px-8 py-4 font-mono2 text-sm tracking-wider text-primary transition-all hover:bg-primary hover:text-primary-foreground"
          >
            <Mail className="h-4 w-4" />
            {profile.email}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <div className="mt-10 flex items-center justify-center gap-6">
            <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="text-muted-foreground transition-colors hover:text-primary">
              <Github className="h-5 w-5" />
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="text-muted-foreground transition-colors hover:text-primary">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href={profile.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
              className="text-muted-foreground transition-colors hover:text-primary">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </Reveal>

        <div className="mt-24 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 sm:flex-row">
          <p className="font-mono2 text-[11px] uppercase tracking-wider text-muted-foreground">
            © {year} {profile.name}
          </p>
          <p className="font-mono2 text-[11px] uppercase tracking-wider text-muted-foreground/60">
            react · three.js · tailwind — hand-built
          </p>
        </div>
      </div>

      {/* matrix rain at the very bottom */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 opacity-50"
        style={{
          maskImage: "linear-gradient(to top, black 30%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 30%, transparent 100%)",
        }}
      >
        <MatrixRain className="block h-full w-full" />
      </div>
    </footer>
  );
}
