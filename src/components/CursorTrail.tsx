import { useEffect } from "react";

/**
 * Classic 90s-style trailing-dots cursor.
 * Ported from the requested snippet: 12 dots that chase the mouse,
 * each easing toward the next with a 0.6 lerp factor.
 */
const CursorTrail = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const COUNT = 12;
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let primed = false;
    const dots: { x: number; y: number; node: HTMLDivElement }[] = [];

    const layer = document.createElement("div");
    layer.style.cssText =
      "position:fixed;inset:0;pointer-events:none;z-index:9999;";
    document.body.appendChild(layer);

    for (let i = 0; i < COUNT; i++) {
      const node = document.createElement("div");
      const t = i / (COUNT - 1);
      node.className = "trail";
      node.style.cssText = [
        "position:absolute",
        `width:${Math.max(3, 7 - t * 4)}px`,
        `height:${Math.max(3, 7 - t * 4)}px`,
        "border-radius:9999px",
        "transform:translate3d(-50%,-50%,0)",
        "background:hsl(28 95% 58%)",
        `opacity:${0.6 - t * 0.45}`,
        "will-change:transform,left,top",
        "left:-100px",
        "top:-100px",
      ].join(";");
      layer.appendChild(node);
      dots.push({ x: mouse.x, y: mouse.y, node });
    }

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      primed = true;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf = 0;
    const draw = () => {
      if (primed) {
        // Each dot lerps toward the previous dot (or the mouse for the head).
        for (let i = 0; i < dots.length; i++) {
          const dot = dots[i];
          const target = i === 0 ? mouse : dots[i - 1];
          dot.x += (target.x - dot.x) * 0.35;
          dot.y += (target.y - dot.y) * 0.35;
          dot.node.style.left = dot.x + "px";
          dot.node.style.top = dot.y + "px";
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      layer.remove();
    };
  }, []);

  return null;
};

export default CursorTrail;