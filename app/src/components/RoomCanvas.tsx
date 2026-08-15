import { useEffect, useRef, useState } from "react";
import { createRoomScene, type RoomHandle } from "@/three/room";
import { Moon, Sun, Rotate3d } from "lucide-react";

export default function RoomCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<RoomHandle | null>(null);
  const [night, setNight] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;
    const handle = createRoomScene(mountRef.current);
    handleRef.current = handle;
    return () => {
      handle.dispose();
      handleRef.current = null;
    };
  }, []);

  useEffect(() => {
    handleRef.current?.setNight(night);
  }, [night]);

  return (
    <div className="relative h-full w-full">
      <div ref={mountRef} className="absolute inset-0" />

      {/* controls */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        <div className="pointer-events-none hidden items-center gap-1.5 rounded-full border border-border/60 bg-background/60 px-3 py-1.5 font-mono2 text-[10px] uppercase tracking-wider text-muted-foreground backdrop-blur sm:flex">
          <Rotate3d className="h-3 w-3" />
          drag to rotate
        </div>
        <button
          onClick={() => setNight((n) => !n)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/60 text-muted-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary"
          aria-label={night ? "Switch to day" : "Switch to night"}
        >
          {night ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
