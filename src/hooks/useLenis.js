import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

/**
 * Inicializa o Lenis (scroll suave) e sincroniza com o ticker do GSAP,
 * para que o ScrollTrigger acompanhe o scroll virtual corretamente.
 * Deve ser chamado uma única vez, no App.
 */
export function useLenis() {
  const tickerFn = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0.1 : 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReducedMotion,
      touchMultiplier: 1.3,
    });

    lenisInstance = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time) => {
      lenis.raf(time * 1000);
    };
    tickerFn.current = onTick;

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerFn.current);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}

/**
 * Rola suavemente até um elemento (usado pelo header, menu mobile e CTAs).
 * @param {string | HTMLElement} target - seletor CSS (ex: "#sobre") ou elemento
 */
export function scrollToTarget(target) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset: -72, duration: 1.3 });
    return;
  }
  const el = typeof target === "string" ? document.querySelector(target) : target;
  el?.scrollIntoView({ behavior: "smooth" });
}
