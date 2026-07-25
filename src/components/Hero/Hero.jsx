import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import { djData } from "../../data/djData";
import Photo from "../Photo/Photo";
import CtaButton from "../CtaButton/CtaButton";
import AudioVisualizer from "../AudioVisualizer/AudioVisualizer";
import { useQuoteModal } from "../ContactModal/QuoteModalContext";
import "./Hero.css";

export default function Hero() {
  const rootRef = useRef(null);
  const photoRef = useRef(null);
  const { openQuoteModal } = useQuoteModal();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.set(".hero__word", { yPercent: 120, opacity: 0 })
        .set([".hero__eyebrow", ".hero__sub", ".hero__cta", ".hero__scrollhint"], { opacity: 0, y: 16 });

      if (!reduceMotion) {
        tl.to(".hero__flash", { opacity: 0, duration: 0.6, ease: "power2.out" })
          .to(".hero__photo img", { scale: 1, duration: 1.6, ease: "power2.out" }, "<")
          .to(".hero__eyebrow", { opacity: 1, y: 0, duration: 0.6 }, "-=1.1")
          .to(".hero__word", { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.05 }, "-=0.4")
          .to(".hero__sub", { opacity: 1, y: 0, duration: 0.6 }, "-=0.5")
          .to(".hero__cta", { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
          .to(".hero__scrollhint", { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");
      } else {
        gsap.set(".hero__flash", { opacity: 0 });
        gsap.set([".hero__word", ".hero__eyebrow", ".hero__sub", ".hero__cta", ".hero__scrollhint"], {
          opacity: 1,
          y: 0,
          yPercent: 0,
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const photo = photoRef.current;
    if (!photo) return undefined;
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let raf;
    function handleMove(e) {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        photo.style.transform = `translate3d(${x * -10}px, ${y * -8}px, 0) scale(1.04)`;
      });
    }
    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="top" className="hero" ref={rootRef}>
      <div className="hero__flash" aria-hidden="true" />

      <div className="hero__photo" ref={photoRef}>
        <Photo
          name="dj-standing-console"
          alt={`${djData.brand.name}, DJ, ao lado do controlador, iluminação vermelha e azul de estúdio`}
          width={1333}
          height={2000}
          loading="eager"
          fetchPriority="high"
        />
      </div>

      <div className="hero__scrim" aria-hidden="true" />
      <div className="hero__glow hero__glow--red" aria-hidden="true" />
      <div className="hero__glow hero__glow--blue" aria-hidden="true" />
      <div className="hero__ring" aria-hidden="true" />

      <div className="hero__content container">
        <p className="hero__eyebrow eyebrow">{djData.hero.eyebrow}</p>

        <h1 className="hero__headline">
          {djData.hero.headline.map((line) => (
            <span className="hero__line" key={line}>
              {line.split(" ").map((word, i) => (
                <span className="hero__word-mask" key={`${line}-${i}`}>
                  <span className="hero__word">{word}</span>
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p className="hero__sub">{djData.hero.sub}</p>

        <div className="hero__cta">
          <CtaButton label={djData.hero.ctaLabel} onClick={openQuoteModal} />
        </div>
      </div>

      <div className="hero__eq" aria-hidden="true">
        <AudioVisualizer bars={40} variant="subtle" />
      </div>

      <div className="hero__scrollhint" aria-hidden="true">
        <span className="hero__scrollhint-line" />
        <ChevronDown size={16} />
      </div>
    </section>
  );
}
