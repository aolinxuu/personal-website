import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const mouse   = useRef({ x: -200, y: -200 });
  const ring    = useRef({ x: -200, y: -200 });
  const rafRef  = useRef(null);

  // Drive the dot and lagging ring
  useEffect(() => {
    const onMove = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove);

    const loop = () => {
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px)`;
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Grow/shrink on interactive elements — re-runs on every render so new
  // elements added by route changes are always picked up
  useEffect(() => {
    const grow   = () => {
      ringRef.current?.classList.add("cursor-ring--hover");
      dotRef.current?.classList.add("cursor-dot--hover");
    };
    const shrink = () => {
      ringRef.current?.classList.remove("cursor-ring--hover");
      dotRef.current?.classList.remove("cursor-dot--hover");
    };
    const targets = document.querySelectorAll("a, button, .chip");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });
    return () => targets.forEach((el) => {
      el.removeEventListener("mouseenter", grow);
      el.removeEventListener("mouseleave", shrink);
    });
  });

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}