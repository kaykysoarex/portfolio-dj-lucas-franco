import "./AudioVisualizer.css";

/**
 * Equalizador decorativo (CSS puro) — usado na Hero, no header ao rolar
 * e na chamada final. Nunca depende de áudio real.
 */
export default function AudioVisualizer({ bars = 24, className = "", variant = "default" }) {
  const items = Array.from({ length: bars }, (_, i) => i);

  return (
    <div className={`equalizer equalizer--${variant} ${className}`} aria-hidden="true">
      {items.map((i) => (
        <span
          key={i}
          className="equalizer__bar"
          style={{
            "--i": i,
            "--delay": `${(i % 8) * 0.09}s`,
            "--duration": `${0.6 + (i % 5) * 0.11}s`,
          }}
        />
      ))}
    </div>
  );
}
