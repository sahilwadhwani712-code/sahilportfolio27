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

    const COUNT = 16;
    const mouse = { x: -100, y: -100 };
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
        "width:6px",
        "height:6px",
        "border-radius:3px",
        "transform:translate(-50%,-50%)",
        "background:hsl(28 95% 58%)",
        `opacity:${0.72 - t * 0.55}`,
        "box-shadow:0 0 10px hsl(28 95% 58% / 0.38)",
        "will-change:left,top",
      ].join(";");
      layer.appendChild(node);
      dots.push({ x: 0, y: 0, node });
    }

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf = 0;
    const draw = () => {
      let x = mouse.x;
      let y = mouse.y;
      dots.forEach((dot, index) => {
        const next = dots[index + 1] || dots[0];
        dot.x = x;
        dot.y = y;
        dot.node.style.left = x + "px";
        dot.node.style.top = y + "px";
        x += (next.x - dot.x) * 0.6;
        y += (next.y - dot.y) * 0.6;
      });
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