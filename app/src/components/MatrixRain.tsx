import { useEffect, useRef } from "react";

const CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノ01";
const TRAIL = 16;

interface Drop {
  y: number; // head position in rows
  speed: number; // rows per second
  chars: string[];
  tick: number;
}

/**
 * Matrix digital rain, drawn on a transparent canvas.
 * Meant to sit behind content at the bottom of the page.
 */
export default function MatrixRain({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cv: HTMLCanvasElement = canvas;
    const ctx = cv.getContext("2d")!;
    const parent = cv.parentElement!;

    const FONT = 15;
    let drops: Drop[] = [];
    let cols = 0;
    let rows = 0;
    let raf = 0;
    let last = performance.now();

    const randChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

    function resize() {
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);
      cv.width = w * dpr;
      cv.height = h * dpr;
      cv.style.width = `${w}px`;
      cv.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${FONT}px "JetBrains Mono", monospace`;
      cols = Math.floor(w / FONT);
      rows = Math.ceil(h / FONT);
      drops = Array.from({ length: cols }, () => ({
        y: Math.random() * rows,
        speed: 3 + Math.random() * 7,
        chars: Array.from({ length: TRAIL }, randChar),
        tick: 0,
      }));
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      ctx.clearRect(0, 0, cv.width, cv.height);

      for (let i = 0; i < cols; i++) {
        const d = drops[i];
        d.y += d.speed * dt;
        d.tick += dt;
        // mutate a random trail char occasionally for shimmer
        if (d.tick > 0.09) {
          d.chars[Math.floor(Math.random() * TRAIL)] = randChar();
          d.tick = 0;
        }
        if (d.y - TRAIL > rows) {
          d.y = -Math.random() * rows * 0.6;
          d.speed = 3 + Math.random() * 7;
        }
        const x = i * FONT;
        for (let t = 0; t < TRAIL; t++) {
          const row = Math.floor(d.y) - t;
          if (row < 0 || row > rows) continue;
          const fade = 1 - t / TRAIL;
          if (t === 0) {
            ctx.fillStyle = `rgba(190, 255, 210, ${0.85 * fade + 0.15})`;
          } else {
            ctx.fillStyle = `rgba(74, 222, 128, ${fade * 0.55})`;
          }
          ctx.fillText(d.chars[t], x, row * FONT);
        }
      }
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
