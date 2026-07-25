import { djData } from "../../data/djData";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import Photo from "../Photo/Photo";
import StatItem from "../StatItem/StatItem";
import "./About.css";

export default function About() {
  const [textRef, textVisible] = useScrollReveal();
  const [photoRef, photoVisible] = useScrollReveal();

  return (
    <section id="sobre" className="section about">
      <div className="container about__grid">
        <div className="about__photo" ref={photoRef} data-visible={photoVisible}>
          <Photo
            name="dj-portrait-headphones"
            alt={`${djData.brand.name} em closeup, usando fone de ouvido`}
            width={1333}
            height={2000}
          />
          <span className="about__photo-frame" aria-hidden="true" />
        </div>

        <div className="about__text" ref={textRef} data-visible={textVisible}>
          <p className="eyebrow">{djData.about.eyebrow}</p>
          <h2 className="about__title">{djData.about.title}</h2>

          {djData.about.paragraphs.map((p) => (
            <p className="about__paragraph" key={p.slice(0, 12)}>
              {p}
            </p>
          ))}

          <div className="about__stats">
            {djData.about.stats.map((stat, i) => (
              <StatItem key={stat.label} value={stat.value} label={stat.label} delay={i * 90} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
