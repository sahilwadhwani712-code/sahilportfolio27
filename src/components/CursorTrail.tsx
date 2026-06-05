import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Dot = { x: number; y: number; id: number };

const CursorTrail = () => {
  const reduce = useReducedMotion();
  const [dots, setDots] = useState<Dot[]>([]);
  const idRef = useRef(0);
  const lastRef = useRef({ x: -100, y: -100, active: false });

  useEffect(() => {
    if (reduce) return;
    // hide on touch / coarse-pointer devices
    if (window.matchMedia("(hover: none)").matches) return;

    const onMove = (e: MouseEvent) => {
      lastRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const onLeave = () => {
      lastRef.current.active = false;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    let timer = 0 as unknown as number;
    const tick = () => {
      const { x, y, active } = lastRef.current;
      setDots((d) => {
        if (!active) return d.length ? d.slice(1) : d;
        const next = [...d, { x, y, id: idRef.current++ }];
        if (next.length > 12) next.shift();
        return next;
      });
      timer = window.setTimeout(tick, 35);
    };
    tick();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      clearTimeout(timer);
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {dots.map((d, i) => {
        const t = (i + 1) / dots.length; // 0..1, newest = 1
        const size = 2 + t * 4;
        return (
          <span
            key={d.id}
            style={{
              position: "absolute",
              left: d.x,
              top: d.y,
              width: size,
              height: size,
              borderRadius: "9999px",
              transform: "translate(-50%, -50%)",
              background: "hsl(28 95% 58%)",
              opacity: t * 0.55,
              boxShadow: `0 0 ${6 + t * 10}px hsl(28 95% 58% / ${0.35 * t})`,
              transition: "opacity 200ms linear",
            }}
          />
        );
      })}
    </div>
  );
};

export default CursorTrail;