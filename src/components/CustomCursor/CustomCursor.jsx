import { useEffect, useRef, useState } from "react";
import "./CustomCursor.css";

/**
 * Cursor customizado — apenas desktop (hover: hover + pointer: fine).
 * Cresce sobre elementos interativos ([data-cursor="link"]).
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const supportsFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(supportsFinePointer && !reduceMotion);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const ring = ringRef.current;
    const dot = dotRef.current;
    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    let targetX = ringX;
    let targetY = ringY;
    let raf;

    function handleMove(e) {
      targetX = e.clientX;
      targetY = e.clientY;
      if (dot) dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;

      const hovered = e.target.closest('[data-cursor="link"]');
      setActive(Boolean(hovered));
    }

    function tick() {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      if (ring) ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", handleMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="custom-cursor__dot" aria-hidden="true" />
      <div ref={ringRef} className={`custom-cursor__ring ${active ? "is-active" : ""}`} aria-hidden="true" />
    </>
  );
}
