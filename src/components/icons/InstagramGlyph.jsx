// lucide-react não inclui mais ícones de marcas (Instagram, etc.).
// Glifo genérico próprio (quadrado + círculo + ponto), no mesmo estilo
// de traço dos ícones lucide usados no resto do site.
export default function InstagramGlyph({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
