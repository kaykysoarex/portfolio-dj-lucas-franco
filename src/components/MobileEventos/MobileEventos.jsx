import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { djData } from "../../data/djData";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { iconMap } from "../../utils/iconMap";
import Photo from "../Photo/Photo";
import PageShutter from "../PageShutter/PageShutter";
import MobilePageHeader from "../MobilePageHeader/MobilePageHeader";
import MediaScroll from "../MediaScroll/MediaScroll";
import CtaButton from "../CtaButton/CtaButton";
import { useQuoteModal } from "../ContactModal/QuoteModalContext";
import "./MobileEventos.css";

const IMPACT_PHRASES = ["Cada festa pede um repertório diferente.", "Da abertura de pista ao último set."];

function EventPoster({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  const [ref, isVisible] = useScrollReveal({ threshold: 0.15 });
  const { openQuoteModal } = useQuoteModal();
  const Icon = iconMap[item.icon] ?? iconMap.Sparkles;

  return (
    <li className="event-poster" ref={ref} data-visible={isVisible}>
      <button
        type="button"
        className="event-poster__cover"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <Photo name={item.photo} alt="" loading="lazy" />
        <span className="event-poster__scrim" aria-hidden="true" />
        <span className="event-poster__icon">
          <Icon size={18} aria-hidden="true" />
        </span>
        <span className="event-poster__title">{item.title}</span>
        <ChevronDown size={20} aria-hidden="true" className={`event-poster__chevron ${isOpen ? "is-open" : ""}`} />
      </button>

      <div className={`event-poster__expand ${isOpen ? "is-open" : ""}`}>
        <div className="event-poster__expand-inner">
          <p>{item.description}</p>
          <ul>
            {item.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <CtaButton label="Pedir orçamento" onClick={openQuoteModal} variant="outline" />
        </div>
      </div>
    </li>
  );
}

export default function MobileEventos() {
  const mediaItems = djData.gallery.items.slice(0, 4).map((item) => ({ type: "image", name: item.name, caption: item.alt }));

  return (
    <div className="mobile-page">
      <PageShutter />
      <MobilePageHeader eyebrow={djData.events.eyebrow} title={djData.events.title} />

      <div className="mobile-page__content">
        <ul className="event-poster-list">
          {djData.events.items.map((item) => (
            <EventPoster key={item.title} item={item} />
          ))}
        </ul>

        <div>
          <p className="mobile-section-label">{IMPACT_PHRASES[0]}</p>
          <MediaScroll items={mediaItems.slice(0, 2)} />
          <p className="mobile-section-label" style={{ marginTop: "var(--space-lg)" }}>
            {IMPACT_PHRASES[1]}
          </p>
          <MediaScroll items={mediaItems.slice(2, 4)} />
        </div>
      </div>
    </div>
  );
}
