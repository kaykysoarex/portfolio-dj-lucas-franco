import { Suspense, lazy } from "react";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";

// Abaixo da dobra: carregadas sob demanda, reduzindo o bundle inicial.
const About = lazy(() => import("./components/About/About"));
const Services = lazy(() => import("./components/Services/Services"));
const Weddings = lazy(() => import("./components/Weddings/Weddings"));
const Events = lazy(() => import("./components/Events/Events"));
const Gallery = lazy(() => import("./components/Gallery/Gallery"));
const Testimonials = lazy(() => import("./components/Testimonials/Testimonials"));
const BookingProcess = lazy(() => import("./components/BookingProcess/BookingProcess"));
const FinalCTA = lazy(() => import("./components/FinalCTA/FinalCTA"));
const Footer = lazy(() => import("./components/Footer/Footer"));

/**
 * Experiência para telas acima de 700px: página única, rolagem contínua,
 * exatamente como descrito no briefing original (não muda com os ajustes
 * de mobile).
 */
export default function DesktopExperience() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <Suspense fallback={null}>
          <About />
          <Services />
          <Weddings />
          <Events />
          <Gallery />
          <Testimonials />
          <BookingProcess />
          <FinalCTA />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}
