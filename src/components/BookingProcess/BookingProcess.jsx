import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { djData } from "../../data/djData";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import "./BookingProcess.css";

gsap.registerPlugin(ScrollTrigger);

function StepItem({ step, index }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.35 });

  return (
    <li className="booking-step" ref={ref} data-visible={isVisible}>
      <span className="booking-step__number">{String(index + 1).padStart(2, "0")}</span>
      <div>
        <h3 className="booking-step__title">{step.title}</h3>
        <p className="booking-step__desc">{step.description}</p>
      </div>
    </li>
  );
}

export default function BookingProcess() {
  const [headerRef, headerVisible] = useScrollReveal();
  const trackRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const fill = fillRef.current;
    if (!track || !fill) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fill,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: track,
            start: "top 75%",
            end: "bottom 65%",
            scrub: 0.6,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="section booking">
      <div className="container">
        <div className="booking__header" ref={headerRef} data-visible={headerVisible}>
          <p className="eyebrow">{djData.bookingProcess.eyebrow}</p>
          <h2 className="booking__title">{djData.bookingProcess.title}</h2>
        </div>

        <div className="booking__track" ref={trackRef}>
          <div className="booking__line">
            <span className="booking__line-fill" ref={fillRef} />
          </div>
          <ol className="booking__steps">
            {djData.bookingProcess.steps.map((step, i) => (
              <StepItem key={step.title} step={step} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
