import { useMagnetic } from "../../hooks/useMagnetic";
import "./CtaButton.css";

/**
 * Botão de chamada principal do site. Usado em "CONTRATE AGORA",
 * "QUERO ESTE DJ NO MEU CASAMENTO" e na chamada final.
 */
export default function CtaButton({
  label,
  href,
  onClick,
  variant = "primary",
  icon: Icon,
  className = "",
  type = "button",
}) {
  const magneticRef = useMagnetic(0.22);
  const isExternal = typeof href === "string" && href.startsWith("http");
  const Tag = href ? "a" : "button";

  const tagProps = href
    ? { href, target: isExternal ? "_blank" : undefined, rel: isExternal ? "noopener noreferrer" : undefined }
    : { type };

  return (
    <span ref={magneticRef} className="cta-magnetic-wrap">
      <Tag className={`cta-button cta-button--${variant} ${className}`} onClick={onClick} {...tagProps}>
        <span className="cta-button__label">{label}</span>
        {Icon ? <Icon className="cta-button__icon" size={18} aria-hidden="true" /> : null}
      </Tag>
    </span>
  );
}
