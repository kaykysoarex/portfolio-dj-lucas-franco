import { djData } from "../../data/djData";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import Photo from "../Photo/Photo";
import StatItem from "../StatItem/StatItem";
import PageShutter from "../PageShutter/PageShutter";
import MobilePageHeader from "../MobilePageHeader/MobilePageHeader";
import InstagramGlyph from "../icons/InstagramGlyph";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink, defaultWhatsAppMessage } from "../../utils/whatsapp";
import "./MobileSobre.css";

function RevealBlock({ children, className = "" }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });
  return (
    <div ref={ref} data-visible={isVisible} className={`reveal-block ${className}`}>
      {children}
    </div>
  );
}

export default function MobileSobre() {
  return (
    <div className="mobile-page">
      <PageShutter />
      <MobilePageHeader eyebrow={djData.about.eyebrow} title={djData.about.title} />

      <div className="mobile-sobre__photo">
        <Photo name="dj-portrait-headphones" alt={`${djData.brand.name} em closeup, usando fone de ouvido`} loading="eager" />
      </div>

      <div className="mobile-page__content">
        <RevealBlock>
          {djData.about.paragraphs.map((p) => (
            <p className="mobile-sobre__paragraph" key={p.slice(0, 12)}>
              {p}
            </p>
          ))}
        </RevealBlock>

        <RevealBlock className="mobile-sobre__stats">
          {djData.about.stats.map((stat, i) => (
            <StatItem key={stat.label} value={stat.value} label={stat.label} delay={i * 80} />
          ))}
        </RevealBlock>

        <RevealBlock>
          <p className="mobile-sobre__label">Estilos musicais</p>
          <ul className="mobile-sobre__pills">
            {djData.about.genres.map((genre) => (
              <li key={genre}>{genre}</li>
            ))}
          </ul>
        </RevealBlock>

        <RevealBlock>
          <p className="mobile-sobre__label">Regiões atendidas</p>
          <ul className="mobile-sobre__pills mobile-sobre__pills--outline">
            {djData.about.regions.map((region) => (
              <li key={region}>{region}</li>
            ))}
          </ul>
        </RevealBlock>

        <RevealBlock>
          <p className="mobile-sobre__label">Redes sociais</p>
          <div className="mobile-sobre__socials">
            <a href={djData.contact.instagramUrl} target="_blank" rel="noopener noreferrer">
              <InstagramGlyph size={18} />
              {djData.contact.instagramHandle}
            </a>
            <a href={buildWhatsAppLink(defaultWhatsAppMessage)} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} aria-hidden="true" />
              {djData.contact.whatsappDisplay}
            </a>
          </div>
        </RevealBlock>
      </div>
    </div>
  );
}
