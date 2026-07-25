import { djData } from "../../data/djData";
import Photo from "../Photo/Photo";
import "./MobilePageHeader.css";

/**
 * Cabeçalho compacto e "grudento" (sticky) das telas mobile por rota —
 * dá contexto de qual modalidade está ativa, sem repetir o header do desktop.
 */
export default function MobilePageHeader({ eyebrow, title }) {
  return (
    <header className="mobile-page-header">
      <Photo name="logo" alt="" loading="eager" className="mobile-page-header__logo" width={80} height={53} />
      <div>
        <p className="mobile-page-header__eyebrow">{eyebrow}</p>
        <h1 className="mobile-page-header__title">{title}</h1>
      </div>
    </header>
  );
}
