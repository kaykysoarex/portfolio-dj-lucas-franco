import { useMemo, useState } from "react";
import { djData } from "../../data/djData";
import { scrollToTarget } from "../../hooks/useLenis";
import { useActiveSection } from "../../hooks/useActiveSection";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { useQuoteModal } from "../ContactModal/QuoteModalContext";
import Photo from "../Photo/Photo";
import CtaButton from "../CtaButton/CtaButton";
import MobileMenu from "../MobileMenu/MobileMenu";
import "./Header.css";

export default function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { scrolled, progress } = useScrollProgress();
  const sectionIds = useMemo(() => djData.nav.map((item) => item.href.replace("#", "")), []);
  const activeId = useActiveSection(sectionIds);
  const { openQuoteModal } = useQuoteModal();

  function handleNavClick(href) {
    return (e) => {
      e.preventDefault();
      setIsMobileOpen(false);
      scrollToTarget(href);
    };
  }

  return (
    <>
      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
        <div className="site-header__inner container">
          <a href="#top" className="site-header__logo" onClick={handleNavClick("#top")} aria-label={`${djData.brand.name} — início`}>
            <Photo name="logo" alt={`${djData.brand.name} — logotipo`} width={140} height={93} loading="eager" fetchPriority="high" />
          </a>

          <nav className="site-header__nav" aria-label="Navegação principal">
            <ul>
              {djData.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={handleNavClick(item.href)}
                    className={activeId === item.href.replace("#", "") ? "is-active" : ""}
                    data-cursor="link"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-header__cta">
            <CtaButton label="Contrate" variant="outline" onClick={openQuoteModal} />
          </div>

          <button
            type="button"
            className={`menu-trigger ${isMobileOpen ? "is-open" : ""}`}
            aria-label={isMobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMobileOpen}
            onClick={() => setIsMobileOpen((prev) => !prev)}
          >
            <span className="menu-trigger__bar" />
            <span className="menu-trigger__bar" />
            <span className="menu-trigger__bar" />
          </button>
        </div>

        <div className="site-header__progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      </header>

      <MobileMenu isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} onNavClick={handleNavClick} activeId={activeId} />
    </>
  );
}
