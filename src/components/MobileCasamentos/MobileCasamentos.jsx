import { Check } from "lucide-react";
import { djData } from "../../data/djData";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import Photo from "../Photo/Photo";
import CtaButton from "../CtaButton/CtaButton";
import PageShutter from "../PageShutter/PageShutter";
import MobilePageHeader from "../MobilePageHeader/MobilePageHeader";
import TestimonialSlider from "../TestimonialSlider/TestimonialSlider";
import MediaScroll from "../MediaScroll/MediaScroll";
import { useQuoteModal } from "../ContactModal/QuoteModalContext";
import "./MobileCasamentos.css";

function RevealBlock({ children, className = "" }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });
  return (
    <div ref={ref} data-visible={isVisible} className={`reveal-block ${className}`}>
      {children}
    </div>
  );
}

export default function MobileCasamentos() {
  const { openQuoteModal } = useQuoteModal();
  const w = djData.weddings;

  return (
    <div className="mobile-page mobile-casamentos">
      <PageShutter />
      <MobilePageHeader eyebrow={w.eyebrow} title="Casamentos" />

      <div className="mobile-casamentos__opening">
        <Photo name="dj-sunglasses-portrait" alt={`${djData.brand.name}, retrato elegante`} loading="eager" />
        <div className="mobile-casamentos__opening-scrim" aria-hidden="true" />
        <div className="mobile-casamentos__opening-content">
          <h2>{w.title}</h2>
          <p>{w.description}</p>
        </div>
      </div>

      <div className="mobile-page__content">
        <RevealBlock>
          <ul className="mobile-casamentos__features">
            {w.features.map((feature) => (
              <li key={feature}>
                <Check size={16} aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <CtaButton label={w.ctaLabel} onClick={openQuoteModal} variant="outline" className="mobile-casamentos__cta" />
        </RevealBlock>

        <RevealBlock>
          <p className="mobile-section-label">Relatos de quem já casou</p>
          <TestimonialSlider items={w.stories} />
        </RevealBlock>

        <RevealBlock>
          <p className="mobile-section-label">Bastidores</p>
          <MediaScroll items={w.media} />
        </RevealBlock>

        <RevealBlock className="mobile-casamentos__final">
          <h2>{w.finalCta.headline}</h2>
          <CtaButton label="Falar no WhatsApp agora" onClick={openQuoteModal} variant="whatsapp" />
        </RevealBlock>
      </div>
    </div>
  );
}
