import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { djData } from "../../data/djData";
import { buildWhatsAppLink, defaultWhatsAppMessage } from "../../utils/whatsapp";
import { useQuoteModal } from "../ContactModal/QuoteModalContext";
import InstagramGlyph from "../icons/InstagramGlyph";
import "./MobileMenu.css";

const panelVariants = {
  hidden: { scaleY: 0 },
  visible: (i) => ({
    scaleY: 1,
    transition: { duration: 0.45, ease: [0.65, 0, 0.35, 1], delay: i * 0.06 },
  }),
  exit: (i) => ({
    scaleY: 0,
    transition: { duration: 0.35, ease: [0.65, 0, 0.35, 1], delay: i * 0.04 },
  }),
};

const linkVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.25 + i * 0.06 },
  }),
  exit: { opacity: 0, y: 12, transition: { duration: 0.15 } },
};

export default function MobileMenu({ isOpen, onClose, onNavClick, activeId }) {
  const { openQuoteModal } = useQuoteModal();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu de navegação">
          <div className="mobile-menu__panels" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="mobile-menu__panel"
                custom={i}
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              />
            ))}
          </div>

          <nav className="mobile-menu__content">
            <ul>
              {djData.nav.map((item, i) => (
                <motion.li key={item.href} custom={i} variants={linkVariants} initial="hidden" animate="visible" exit="exit">
                  <a
                    href={item.href}
                    onClick={onNavClick(item.href)}
                    className={activeId === item.href.replace("#", "") ? "is-active" : ""}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.button
              type="button"
              className="mobile-menu__cta"
              custom={djData.nav.length}
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => {
                onClose();
                openQuoteModal();
              }}
            >
              Contrate agora
            </motion.button>

            <motion.div
              className="mobile-menu__socials"
              custom={djData.nav.length + 1}
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <a href={djData.contact.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <InstagramGlyph size={20} />
              </a>
              <a href={buildWhatsAppLink(defaultWhatsAppMessage)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <MessageCircle size={20} aria-hidden="true" />
              </a>
            </motion.div>
          </nav>
        </div>
      )}
    </AnimatePresence>
  );
}
