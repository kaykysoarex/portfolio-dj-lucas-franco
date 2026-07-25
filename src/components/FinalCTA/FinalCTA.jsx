import { djData } from "../../data/djData";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import Photo from "../Photo/Photo";
import CtaButton from "../CtaButton/CtaButton";
import AudioVisualizer from "../AudioVisualizer/AudioVisualizer";
import InstagramGlyph from "../icons/InstagramGlyph";
import { buildWhatsAppLink, defaultWhatsAppMessage } from "../../utils/whatsapp";
import "./FinalCTA.css";

export default function FinalCTA() {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.3 });

  return (
    <section className="final-cta">
      <div className="final-cta__photo">
        <Photo name="dj-console-detail" alt="" loading="lazy" />
      </div>
      <div className="final-cta__scrim" aria-hidden="true" />
      <div className="final-cta__glow final-cta__glow--red" aria-hidden="true" />
      <div className="final-cta__glow final-cta__glow--blue" aria-hidden="true" />

      <div className="final-cta__eq" aria-hidden="true">
        <AudioVisualizer bars={56} variant="subtle" />
      </div>

      <div className="container final-cta__content" ref={ref} data-visible={isVisible}>
        <h2 className="final-cta__headline">{djData.finalCta.headline}</h2>

        <CtaButton
          label={djData.finalCta.ctaLabel}
          href={buildWhatsAppLink(defaultWhatsAppMessage)}
          variant="whatsapp"
        />

        <div className="final-cta__meta">
          <span>{djData.contact.city}</span>
          <a href={djData.contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="final-cta__social">
            <InstagramGlyph size={16} />
            {djData.contact.instagramHandle}
          </a>
        </div>
      </div>
    </section>
  );
}
