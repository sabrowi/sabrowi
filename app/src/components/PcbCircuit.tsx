import { useEffect, useRef } from "react";

/**
 * Animated PCB-circuit background (canvas).
 * Dark FR4 board, drifting teal grid (CSS), static non-crossing copper
 * traces with gold pads (offscreen canvas, drawn once), and mint "current"
 * pulses traveling along the traces with comet tails.
 */

const CELL = 44;
const PULSES = 16;
const TRACE_RGB = "19, 84, 72"; // #135448
const PAD = "201, 162, 39"; // #c9a227
const MINT = "85, 247, 207"; // #55f7cf

interface Trace {
  pts: { x: number; y: number }[];
  cum: number[]; // cumulative length at each point
  total: number;
}

const DIRS = [
  [1, 0], [1, 1], [0, 1], [-1, 1],
  [-1, 0], [-1, -1], [0, -1], [1, -1],
];

function generateTraces(w: number, h: number): Trace[] {
  const gw = Math.floor(w / CELL);
  const gh = Math.floor(h / CELL);
  const occupied = new Set<number>();
  const key = (x: number, y: number) => y * gw + x;
  const traces: Trace[] = [];
  const target = Math.floor((gw * gh) / 22);

  let guard = target * 30;
  while (traces.length < target && guard-- > 0) {
    let cx = 2 + Math.floor(Math.random() * (gw - 4));
    let cy = 2 + Math.floor(Math.random() * (gh - 4));
    if (occupied.has(key(cx, cy))) continue;

    const pts = [{ x: cx * CELL + CELL / 2, y: cy * CELL + CELL / 2 }];
    const used: number[] = [key(cx, cy)];
    let dir = Math.floor(Math.random() * 8);
    const segments = 1 + Math.floor(Math.random() * 6); // up to 7

    for (let s = 0; s < segments; s++) {
      // turn ±45° or ±90° (never reverse)
      const turn = [1, -1, 2, -2][Math.floor(Math.random() * 4)];
      dir = (dir + turn + 8) % 8;
      const [dx, dy] = DIRS[dir];
      const steps = 2 + Math.floor(Math.random() * 8); // 2–9 cells
      let advanced = false;
      for (let i = 0; i < steps; i++) {
        const nx = cx + dx;
        const ny = cy + dy;
        if (nx < 1 || ny < 1 || nx >= gw - 1 || ny >= gh - 1 || occupied.has(key(nx, ny))) break;
        cx = nx;
        cy = ny;
        used.push(key(cx, cy));
        advanced = true;
      }
      if (advanced) pts.push({ x: cx * CELL + CELL / 2, y: cy * CELL + CELL / 2 });
      else break;
    }

    if (pts.length < 2) continue;
    used.forEach((k) => occupied.add(k));

    const cum = [0];
    let total = 0;
    for (let i = 1; i < pts.length; i++) {
      total += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
      cum.push(total);
    }
    traces.push({ pts, cum, total });
  }
  return traces;
}

function pointAt(tr: Trace, s: number) {
  const sClamped = Math.max(0, Math.min(s, tr.total));
  let i = 1;
  while (i < tr.cum.length - 1 && tr.cum[i] < sClamped) i++;
  const segLen = tr.cum[i] - tr.cum[i - 1] || 1;
  const t = (sClamped - tr.cum[i - 1]) / segLen;
  return {
    x: tr.pts[i - 1].x + (tr.pts[i].x - tr.pts[i - 1].x) * t,
    y: tr.pts[i - 1].y + (tr.pts[i].y - tr.pts[i - 1].y) * t,
  };
}

export default function PcbCircuit({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const cv: HTMLCanvasElement = canvas;
    const wr: HTMLDivElement = wrap;
    const ctx = cv.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let traces: Trace[] = [];
    const off = document.createElement("canvas");
    let raf = 0;
    let last = performance.now();
    let resizeTimer = 0;

    function build() {
      const w = wr.clientWidth;
      const h = wr.clientHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);
      cv.width = w * dpr;
      cv.height = h * dpr;
      cv.style.width = `${w}px`;
      cv.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      traces = generateTraces(w, h);

      // static layer: traces + pads + vias, painted once
      off.width = w * dpr;
      off.height = h * dpr;
      const o = off.getContext("2d")!;
      o.setTransform(dpr, 0, 0, dpr, 0, 0);
      o.lineCap = "round";
      o.lineJoin = "round";
      traces.forEach((tr) => {
        o.strokeStyle = `rgba(${TRACE_RGB}, 0.34)`;
        o.lineWidth = 1.2;
        o.beginPath();
        o.moveTo(tr.pts[0].x, tr.pts[0].y);
        for (let i = 1; i < tr.pts.length; i++) o.lineTo(tr.pts[i].x, tr.pts[i].y);
        o.stroke();
        // via ring mid-run (sometimes)
        if (tr.pts.length > 2 && Math.random() < 0.5) {
          const v = tr.pts[1 + Math.floor(Math.random() * (tr.pts.length - 2))];
          o.strokeStyle = `rgba(${PAD}, 0.55)`;
          o.lineWidth = 1;
          o.beginPath();
          o.arc(v.x, v.y, 3, 0, Math.PI * 2);
          o.stroke();
        }
        // terminal pad
        const end = tr.pts[tr.pts.length - 1];
        o.fillStyle = `rgba(${PAD}, 0.55)`;
        if (Math.random() < 0.5) {
          o.beginPath();
          o.arc(end.x, end.y, 2.6, 0, Math.PI * 2);
          o.fill();
        } else {
          o.fillRect(end.x - 2.6, end.y - 2.6, 5.2, 5.2);
        }
      });
    }

    interface Pulse {
      ti: number;
      s: number;
      speed: number;
    }
    let pulses: Pulse[] = [];
    function seedPulses() {
      pulses = Array.from({ length: PULSES }, () => ({
        ti: Math.floor(Math.random() * traces.length),
        s: Math.random() * 200,
        speed: 45 + Math.random() * 70,
      }));
    }

    function draw(now: number) {
      raf = requestAnimationFrame(draw);
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.drawImage(off, 0, 0, cv.width / Math.min(window.devicePixelRatio, 2), cv.height / Math.min(window.devicePixelRatio, 2));

      pulses.forEach((p) => {
        const tr = traces[p.ti];
        if (!tr) return;
        p.s += p.speed * dt;
        if (p.s > tr.total + 8) {
          p.ti = Math.floor(Math.random() * traces.length);
          p.s = 0;
          p.speed = 45 + Math.random() * 70;
          return;
        }
        // comet tail (~70px)
        for (let back = 70; back >= 0; back -= 5) {
          const s2 = p.s - back;
          if (s2 < 0) continue;
          const pt = pointAt(tr, s2);
          const a = (1 - back / 70) * 0.6;
          ctx.fillStyle = `rgba(${MINT}, ${a})`;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, back === 0 ? 1.8 : 1.1, 0, Math.PI * 2);
          ctx.fill();
        }
        // head glow
        const head = pointAt(tr, p.s);
        const g = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 10);
        g.addColorStop(0, `rgba(${MINT}, 0.5)`);
        g.addColorStop(1, `rgba(${MINT}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(head.x, head.y, 10, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    build();
    seedPulses();
    if (reduced) {
      ctx.drawImage(off, 0, 0);
    } else {
      raf = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        build();
        seedPulses();
        if (reduced) ctx.drawImage(off, 0, 0);
      }, 200);
    });
    ro.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={className}
      aria-hidden="true"
      style={{
        animation: "pcb-fadein 1.2s ease-out both",
        maskImage: "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)",
      }}
    >
      {/* drifting grid */}
      <div className="pcb-grid absolute inset-0" />
      <canvas ref={canvasRef} className="absolute inset-0 block" />
      {/* vignette: keep the center readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 45%, rgba(13,14,18,0.92) 0%, rgba(13,14,18,0.4) 55%, transparent 100%)",
        }}
      />
    </div>
  );
}
