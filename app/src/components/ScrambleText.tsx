import { useEffect, useRef, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}=+*^?#________ABCDEFGHJKMNPQRSTUVWXYZ0123456789";

interface ScrambleTextProps {
  text: string;
  className?: string;
  /** ms before the effect starts after entering viewport */
  delay?: number;
}

/**
 * Hacker-style scramble reveal: random glyphs resolve into the final text,
 * left to right. Re-triggers on hover AND at random intervals.
 */
export default function ScrambleText({ text, className, delay = 300 }: ScrambleTextProps) {
  const [output, setOutput] = useState(text.replace(/./g, " "));
  const ref = useRef<HTMLParagraphElement>(null);
  const rafRef = useRef(0);
  const timerRef = useRef(0);
  const runningRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const run = () => {
      if (runningRef.current) return;
      runningRef.current = true;
      const start = performance.now();
      const perChar = 14; // ms between each char resolving
      const scrambleDuration = 420; // ms a char scrambles before settling

      const tick = (now: number) => {
        const elapsed = now - start;
        let done = true;
        let out = "";
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (ch === " " || ch === "—" || ch === "&") {
            out += ch;
            continue;
          }
          const resolveAt = i * perChar + scrambleDuration;
          if (elapsed >= resolveAt) {
            out += ch;
          } else if (elapsed >= i * perChar) {
            out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            done = false;
          } else {
            out += " ";
            done = false;
          }
        }
        setOutput(out);
        if (!done) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          runningRef.current = false;
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    // random re-trigger loop
    const scheduleRandom = () => {
      timerRef.current = window.setTimeout(() => {
        run();
        scheduleRandom();
      }, 7000 + Math.random() * 10000); // every 7–17s
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            io.disconnect();
            setTimeout(() => {
              run();
              scheduleRandom();
            }, delay);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    const onEnter = () => run();
    el.addEventListener("mouseenter", onEnter);

    return () => {
      io.disconnect();
      el.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timerRef.current);
      runningRef.current = false;
    };
  }, [text, delay]);

  return (
    <p ref={ref} className={className} aria-label={text}>
      {output}
    </p>
  );
}
