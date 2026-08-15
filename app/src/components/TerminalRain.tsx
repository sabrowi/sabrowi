import { useEffect, useRef } from "react";

/**
 * Hacker-terminal background: a live "session" typing itself on a canvas —
 * prompts, build logs, MQTT publishes, PLC reads. Drawn at low opacity
 * behind section content.
 */

interface ScriptLine {
  p?: string; // prompt prefix ("$"), absent = output line
  t: string;
}

const SCRIPT: ScriptLine[] = [
  { p: "$", t: "ssh kukuh@makerlab.local" },
  { t: "Welcome to Ubuntu 24.04.1 LTS (GNU/Linux 6.8.0-generic)" },
  { p: "$", t: "cd ~/projects/portfolio && git status" },
  { t: "On branch main — nothing to commit, working tree clean" },
  { p: "$", t: "npm run build" },
  { t: "✓ 1784 modules transformed  ·  built in 2.3s" },
  { p: "$", t: "mosquitto_pub -h 10.0.0.8 -t home/studio/lamp -m '{\"state\":\"ON\"}'" },
  { t: "PUBLISH ack · qos 1 · home/studio/lamp" },
  { p: "$", t: "pio run --target upload -e esp32dev" },
  { t: "Writing at 0x00010000... (100 %) · Hard resetting via RTS pin..." },
  { p: "$", t: "glslangValidator shaders/room.frag" },
  { t: "shaders/room.frag: no errors · 1 shader compiled" },
  { p: "$", t: "curl -s https://api.mobiltravel.id/health | jq .status" },
  { t: '"ok"  ·  uptime 412d 07:22:41' },
  { p: "$", t: "snap7-cli read 192.168.1.10 DB100.DBW0" },
  { t: "DB100.DBW0 = 1734 · cycle time 12 ms" },
  { p: "$", t: "docker compose up -d --build" },
  { t: "[+] Running 3/3 · api ✓  db ✓  mqtt-broker ✓" },
  { p: "$", t: "nmap -sS 10.0.0.0/24 --open" },
  { t: "14 hosts up · 6 services discovered" },
  { p: "$", t: "./deploy.sh --prod" },
  { t: "▲ deployed · 200 OK · 84 ms TTFB" },
];

const FONT = 12;
const LINE_H = 20;

export default function TerminalRain({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cv: HTMLCanvasElement = canvas;
    const ctx = cv.getContext("2d")!;
    const parent = cv.parentElement!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let lines: { text: string; prompt: boolean }[] = [];
    let scriptIdx = 0;
    let charIdx = 0;
    let pauseUntil = 0;
    let last = performance.now();
    let carry = 0;

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
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    function drawStatic() {
      ctx.clearRect(0, 0, cv.width, cv.height);
      const maxLines = Math.floor(parent.clientHeight / LINE_H);
      const view = SCRIPT.slice(0, maxLines + 4);
      view.forEach((l, i) => {
        ctx.fillStyle = l.p ? "rgba(74,222,128,0.9)" : "rgba(134,239,172,0.55)";
        ctx.fillText(l.p ? `${l.p} ${l.t}` : l.t, 12, (i + 1) * LINE_H);
      });
    }

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;

      // typing state machine
      if (now < pauseUntil) {
        // waiting between lines
      } else if (scriptIdx < SCRIPT.length) {
        const line = SCRIPT[scriptIdx];
        if (line.p) {
          // type prompt lines char by char (~55 chars/s)
          carry += dt * 55;
          const n = Math.floor(carry);
          if (n > 0) {
            carry -= n;
            charIdx = Math.min(charIdx + n, line.t.length);
          }
          if (charIdx >= line.t.length) {
            lines.push({ text: `${line.p} ${line.t}`, prompt: true });
            scriptIdx++;
            charIdx = 0;
            pauseUntil = now + 250 + Math.random() * 500;
          }
        } else {
          // output appears instantly
          lines.push({ text: line.t, prompt: false });
          scriptIdx++;
          pauseUntil = now + 150 + Math.random() * 350;
        }
      } else {
        // restart session
        pauseUntil = now + 2200;
        lines = [];
        scriptIdx = 0;
        charIdx = 0;
      }

      // render
      ctx.clearRect(0, 0, cv.width, cv.height);
      const maxLines = Math.floor(parent.clientHeight / LINE_H) - 1;
      const view = lines.slice(-maxLines);
      view.forEach((l, i) => {
        ctx.fillStyle = l.prompt ? "rgba(74,222,128,0.9)" : "rgba(134,239,172,0.55)";
        ctx.fillText(l.text, 12, (i + 1) * LINE_H);
      });
      // currently-typing line + cursor
      if (scriptIdx < SCRIPT.length && SCRIPT[scriptIdx].p) {
        const cur = `$ ${SCRIPT[scriptIdx].t.slice(0, charIdx)}`;
        const y = (view.length + 1) * LINE_H;
        ctx.fillStyle = "rgba(74,222,128,0.9)";
        ctx.fillText(cur, 12, y);
        if (Math.floor(now / 500) % 2 === 0) {
          const w = ctx.measureText(cur).width;
          ctx.fillRect(12 + w + 4, y - FONT + 2, 7, FONT);
        }
      }
    }

    if (reduced) drawStatic();
    else raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
