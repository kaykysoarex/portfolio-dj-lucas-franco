import { useState } from "react";
import { djData } from "../../data/djData";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import Photo from "../Photo/Photo";
import Lightbox from "./Lightbox";
import "./Gallery.css";

function GalleryTile({ item, index, onOpen }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.15 });

  return (
    <li
      className={`gallery-tile gallery-tile--${item.size}`}
      ref={ref}
      data-visible={isVisible}
      style={{ transitionDelay: `${(index % 4) * 70}ms` }}
    >
      <button type="button" className="gallery-tile__btn" onClick={() => onOpen(index)} data-cursor="link" aria-label={`Ampliar foto: ${item.alt}`}>
        <Photo name={item.name} alt={item.alt} loading="lazy" style={{ objectPosition: item.pos }} />
      </button>
    </li>
  );
}

export default function Gallery() {
  const [headerRef, headerVisible] = useScrollReveal();
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section id="galeria" className="section gallery">
      <div className="container">
        <div className="gallery__header" ref={headerRef} data-visible={headerVisible}>
          <p className="eyebrow">{djData.gallery.eyebrow}</p>
          <h2 className="gallery__title">{djData.gallery.title}</h2>
        </div>

        <ul className="gallery__grid">
          {djData.gallery.items.map((item, i) => (
            <GalleryTile key={item.name} item={item} index={i} onOpen={setActiveIndex} />
          ))}
        </ul>
      </div>

      <Lightbox
        items={djData.gallery.items}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </section>
  );
}
