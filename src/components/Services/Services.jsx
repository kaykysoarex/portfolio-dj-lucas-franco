import { iconMap } from "../../utils/iconMap";
import { djData } from "../../data/djData";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import "./Services.css";

function ServiceCard({ item, index }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.25 });
  const Icon = iconMap[item.icon] ?? iconMap.Music2;

  return (
    <li
      className="service-card"
      ref={ref}
      data-visible={isVisible}
      style={{ transitionDelay: `${(index % 3) * 90}ms` }}
    >
      <span className="service-card__index">{String(index + 1).padStart(2, "0")}</span>
      <div className="service-card__icon">
        <Icon size={22} aria-hidden="true" />
      </div>
      <h3 className="service-card__title">{item.title}</h3>
      <p className="service-card__desc">{item.description}</p>
      <div className="service-card__fader" aria-hidden="true">
        <span className="service-card__fader-track" />
        <span className="service-card__fader-knob" />
      </div>
    </li>
  );
}

export default function Services() {
  const [headerRef, headerVisible] = useScrollReveal();

  return (
    <section className="section services">
      <div className="container">
        <div className="services__header" ref={headerRef} data-visible={headerVisible}>
          <p className="eyebrow">{djData.services.eyebrow}</p>
          <h2 className="services__title">{djData.services.title}</h2>
        </div>

        <ul className="services__grid">
          {djData.services.items.map((item, i) => (
            <ServiceCard key={item.title} item={item} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
