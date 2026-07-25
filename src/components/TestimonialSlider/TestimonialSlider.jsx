import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import "./TestimonialSlider.css";

const AUTOPLAY_MS = 7000;
const RESUME_DELAY_MS = 5000;

export default function TestimonialSlider({ items }) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(null);
  const autoplayTimer = useRef(null);
  const resumeTimer = useRef(null);
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  function goTo(i) {
    setIndex(Math.max(0, Math.min(items.length - 1, i)));
  }

  function stopAutoplay() {
    clearInterval(autoplayTimer.current);
  }

  function startAutoplay() {
    if (reduceMotion.current || items.length < 2) return;
    stopAutoplay();
    autoplayTimer.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, AUTOPLAY_MS);
  }

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  function pauseAndScheduleResume() {
    stopAutoplay();
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(startAutoplay, RESUME_DELAY_MS);
  }

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
    pauseAndScheduleResume();
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      goTo(delta > 0 ? index - 1 : index + 1);
    }
    touchStartX.current = null;
  }

  return (
    <div className="testimonial-slider">
      <div
        className="testimonial-slider__viewport"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="testimonial-slider__track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {items.map((item) => (
            <article className="testimonial-slide" key={item.names}>
              <div className="testimonial-slide__rating" aria-label={`Avaliação: ${item.rating} de 5`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={14} fill={i < item.rating ? "currentColor" : "none"} aria-hidden="true" />
                ))}
              </div>
              <p className="testimonial-slide__quote">&ldquo;{item.quote}&rdquo;</p>
              <p className="testimonial-slide__names">{item.names}</p>
              {item.place && <p className="testimonial-slide__place">{item.place}</p>}
            </article>
          ))}
        </div>
      </div>

      <div className="testimonial-slider__controls">
        <button
          type="button"
          onClick={() => {
            goTo(index - 1);
            pauseAndScheduleResume();
          }}
          disabled={index === 0}
          aria-label="Relato anterior"
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>

        <div className="testimonial-slider__dots">
          {items.map((item, i) => (
            <button
              key={item.names}
              type="button"
              className={i === index ? "is-active" : ""}
              aria-label={`Ir para o relato ${i + 1}`}
              onClick={() => {
                goTo(i);
                pauseAndScheduleResume();
              }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            goTo(index + 1);
            pauseAndScheduleResume();
          }}
          disabled={index === items.length - 1}
          aria-label="Próximo relato"
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
