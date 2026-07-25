import { Check } from "lucide-react";
import { djData } from "../../data/djData";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import Photo from "../Photo/Photo";
import CtaButton from "../CtaButton/CtaButton";
import { useQuoteModal } from "../ContactModal/QuoteModalContext";
import "./Weddings.css";

export default function Weddings() {
  const [textRef, textVisible] = useScrollReveal();
  const [photoRef, photoVisible] = useScrollReveal();
  const { openQuoteModal } = useQuoteModal();

  return (
    <section id="casamentos" className="section weddings">
      <div className="weddings__wash" aria-hidden="true" />
      <div className="container weddings__grid">
        <div className="weddings__text" ref={textRef} data-visible={textVisible}>
          <p className="eyebrow">{djData.weddings.eyebrow}</p>
          <h2 className="weddings__title">{djData.weddings.title}</h2>
          <p className="weddings__desc">{djData.weddings.description}</p>

          <ul className="weddings__features">
            {djData.weddings.features.map((feature) => (
              <li key={feature}>
                <Check size={16} aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <CtaButton label={djData.weddings.ctaLabel} onClick={() => openQuoteModal("Casamento")} variant="outline" />
        </div>

        <div className="weddings__photo" ref={photoRef} data-visible={photoVisible}>
          <Photo
            name="dj-sunglasses-portrait"
            alt={`${djData.brand.name}, retrato elegante ajustando os óculos escuros`}
            width={1289}
            height={1987}
          />
        </div>
      </div>
    </section>
  );
}
