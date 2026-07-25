import { Quote } from "lucide-react";
import { djData } from "../../data/djData";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import "./Testimonials.css";

export default function Testimonials() {
  const [headerRef, headerVisible] = useScrollReveal();
  const items = djData.testimonials.items;
  const loop = [...items, ...items];

  return (
    <section id="depoimentos" className="section testimonials">
      <div className="container">
        <div className="testimonials__header" ref={headerRef} data-visible={headerVisible}>
          <p className="eyebrow">{djData.testimonials.eyebrow}</p>
          <h2 className="testimonials__title">{djData.testimonials.title}</h2>
          <p className="testimonials__disclaimer">{djData.testimonials.disclaimer}</p>
        </div>
      </div>

      <div className="testimonials__marquee-wrap">
        <div className="testimonials__marquee">
          {loop.map((item, i) => (
            <blockquote className="testimonial-card" key={`${item.name}-${i}`}>
              <Quote size={18} className="testimonial-card__icon" aria-hidden="true" />
              <p className="testimonial-card__quote">&ldquo;{item.quote}&rdquo;</p>
              <footer>
                <span className="testimonial-card__name">{item.name}</span>
                <span className="testimonial-card__context">{item.context}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
