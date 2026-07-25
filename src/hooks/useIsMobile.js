import { useEffect, useState } from "react";

/**
 * true quando a largura da tela é <= breakpoint (padrão 700px, conforme
 * o requisito de experiência mobile totalmente separada do site).
 * Reage a resize/orientação — importante porque troca a árvore de
 * componentes inteira (desktop contínuo vs. mobile por rotas).
 */
export function useIsMobile(breakpoint = 700) {
  const query = `(max-width: ${breakpoint}px)`;
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handleChange = (e) => setIsMobile(e.matches);
    setIsMobile(mql.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, [query]);

  return isMobile;
}
