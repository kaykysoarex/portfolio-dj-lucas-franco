import { useEffect } from "react";
import { motion } from "framer-motion";
import { djData } from "../../data/djData";
import Photo from "../Photo/Photo";
import CtaButton from "../CtaButton/CtaButton";
import PageShutter from "../PageShutter/PageShutter";
import { useQuoteModal } from "../ContactModal/QuoteModalContext";
import "./MobileHome.css";

export default function MobileHome() {
  const { openQuoteModal } = useQuoteModal();

  // "Contrate" no mobile é uma tela fixa, sem rolagem — trava o scroll do body
  // enquanto essa rota estiver ativa (evita rubber-band scroll no iOS).
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return (
    <div className="mobile-home">
      <PageShutter />

      <div className="mobile-home__photo">
        <Photo name="dj-standing-console" alt={`${djData.brand.name}, DJ`} loading="eager" fetchPriority="high" />
      </div>
      <div className="mobile-home__scrim" aria-hidden="true" />
      <div className="mobile-home__glow mobile-home__glow--red" aria-hidden="true" />
      <div className="mobile-home__glow mobile-home__glow--blue" aria-hidden="true" />

      <div className="mobile-home__content">
        <motion.div
          className="mobile-home__logo"
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        >
          <Photo name="logo" alt={`${djData.brand.name} — logotipo`} loading="eager" fetchPriority="high" />
        </motion.div>

        <motion.div
          className="mobile-home__cta"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <CtaButton label={djData.hero.ctaLabel} onClick={openQuoteModal} />
        </motion.div>
      </div>
    </div>
  );
}
