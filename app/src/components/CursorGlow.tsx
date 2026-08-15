import { useEffect, useRef } from "react";

/**
 * Soft blue glow that trails the cursor across the whole page.
 * Fixed, pointer-events-none, sits behind all content.
 */
export default function CursorGlow() {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blob = blobRef.current;
    if (!blob) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight * 0.7;
    let x = targetX;
    let y = targetY;
    let raf = 0;
    let visible = false;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) {
        visible = true;
        blob.style.opacity = "1";
      }
    };
    const onLeave = () => {
      visible = false;
      blob.style.opacity = "0";
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      blob.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        ref={blobRef}
        className="h-[600px] w-[600px] rounded-full opacity-0 transition-opacity duration-700 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, hsl(217 91% 60% / 0.14) 0%, hsl(217 91% 60% / 0.05) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}
