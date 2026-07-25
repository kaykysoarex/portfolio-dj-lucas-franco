import { iconMap } from "../../utils/iconMap";
import { djData } from "../../data/djData";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import Photo from "../Photo/Photo";
import "./Events.css";

const FEATURED_PHOTOS = {
  Aniversários: "dj-holding-controller",
  "Debutantes (15 anos)": "dj-headphones-both-hands",
};

function EventTile({ item, index }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });
  const Icon = iconMap[item.icon] ?? iconMap.Sparkles;
  const photoName = FEATURED_PHOTOS[item.title];

  return (
    <li
      className={`event-tile ${photoName ? "event-tile--photo" : ""}`}
      ref={ref}
      data-visible={isVisible}
      style={{ transitionDelay: `${(index % 3) * 80}ms` }}
    >
      {photoName && (
        <div className="event-tile__bg">
          <Photo name={photoName} alt="" loading="lazy" />
        </div>
      )}
      <div className="event-tile__icon">
        <Icon size={20} aria-hidden="true" />
      </div>
      <h3 className="event-tile__title">{item.title}</h3>
      <p className="event-tile__desc">{item.description}</p>
    </li>
  );
}

export default function Events() {
  const [headerRef, headerVisible] = useScrollReveal();

  return (
    <section id="eventos" className="section events">
      <div className="container">
        <div className="events__header" ref={headerRef} data-visible={headerVisible}>
          <p className="eyebrow">{djData.events.eyebrow}</p>
          <h2 className="events__title">{djData.events.title}</h2>
        </div>

        <ul className="events__grid">
          {djData.events.items.map((item, i) => (
            <EventTile key={item.title} item={item} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
