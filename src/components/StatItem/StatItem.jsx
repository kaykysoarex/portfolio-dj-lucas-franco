import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import "./StatItem.css";

/**
 * Número grande com contagem animada ao entrar na tela.
 * Usado em Sobre (desktop) e na tela Sobre do mobile.
 */
export default function StatItem({ value, label, delay = 0 }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.4 });
  const [display, setDisplay] = useState(value.replace(/[0-9.]+/, "0"));
  const animatedRef = useRef(false);

  useEffect(() => {
    if (!isVisible || animatedRef.current) return;
    animatedRef.current = true;

    const match = value.match(/[0-9]+(\.[0-9]+)?/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const target = parseFloat(match[0]);
    const isDecimal = match[0].includes(".");
    const prefix = value.slice(0, match.index);
    const suffix = value.slice(match.index + match[0].length);
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = isDecimal ? (target * eased).toFixed(1) : Math.round(target * eased);
      setDisplay(`${prefix}${current}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
    } else {
      requestAnimationFrame(tick);
    }
  }, [isVisible, value]);

  return (
    <div className="stat-item" ref={ref} style={{ transitionDelay: `${delay}ms` }} data-visible={isVisible}>
      <span className="stat-item__value">{display}</span>
      <span className="stat-item__label">{label}</span>
    </div>
  );
}
