import "./PageShutter.css";

/**
 * Transição cinematográfica ao entrar em cada "modalidade" mobile:
 * dois painéis (vermelho/azul) cobrem a tela e se abrem do centro para
 * fora, como cortinas/luzes de show. Roda uma vez a cada montagem —
 * ou seja, a cada troca de rota no mobile.
 */
export default function PageShutter() {
  return (
    <div className="page-shutter" aria-hidden="true">
      <span className="page-shutter__panel page-shutter__panel--red" />
      <span className="page-shutter__panel page-shutter__panel--blue" />
    </div>
  );
}
