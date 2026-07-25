import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import MobileHome from "./components/MobileHome/MobileHome";
import MobileNav from "./components/MobileNav/MobileNav";

const MobileSobre = lazy(() => import("./components/MobileSobre/MobileSobre"));
const MobileCasamentos = lazy(() => import("./components/MobileCasamentos/MobileCasamentos"));
const MobileEventos = lazy(() => import("./components/MobileEventos/MobileEventos"));

/**
 * Experiência para telas até 700px: 4 "modalidades" com rotas próprias
 * (/, /sobre, /casamentos, /eventos), em vez de uma página contínua.
 * "/" (Contrate) é a única tela sem rolagem.
 */
export default function MobileExperience() {
  return (
    <div className="mobile-experience">
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<MobileHome />} />
          <Route path="/sobre" element={<MobileSobre />} />
          <Route path="/casamentos" element={<MobileCasamentos />} />
          <Route path="/eventos" element={<MobileEventos />} />
          <Route path="*" element={<MobileHome />} />
        </Routes>
      </Suspense>
      <MobileNav />
    </div>
  );
}
