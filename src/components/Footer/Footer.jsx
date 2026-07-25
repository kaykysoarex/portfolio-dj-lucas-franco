import { djData } from "../../data/djData";
import { scrollToTarget } from "../../hooks/useLenis";
import Photo from "../Photo/Photo";
import AudioVisualizer from "../AudioVisualizer/AudioVisualizer";
import InstagramGlyph from "../icons/InstagramGlyph";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink, defaultWhatsAppMessage } from "../../utils/whatsapp";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__eq" aria-hidden="true">
        <AudioVisualizer bars={64} variant="subtle" />
      </div>

      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollToTarget("#top");
            }}
          >
            <Photo name="logo" alt={`${djData.brand.name} — logotipo`} width={120} height={80} loading="lazy" />
          </a>
          <p>{djData.contact.city}</p>
        </div>

        <nav className="site-footer__nav" aria-label="Navegação do rodapé">
          <ul>
            {djData.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToTarget(item.href);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer__contact">
          <a href={djData.contact.instagramUrl} target="_blank" rel="noopener noreferrer">
            <InstagramGlyph size={18} />
            {djData.contact.instagramHandle}
          </a>
          <a href={buildWhatsAppLink(defaultWhatsAppMessage)} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={18} aria-hidden="true" />
            {djData.contact.whatsappDisplay}
          </a>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <p>
          © {year} {djData.brand.name}. Todos os direitos reservados.
        </p>
        <p>{djData.footer.credit}</p>
      </div>
    </footer>
  );
}
