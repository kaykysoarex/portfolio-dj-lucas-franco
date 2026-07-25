import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Photo from "../Photo/Photo";
import "./Lightbox.css";

export default function Lightbox({ items, activeIndex, onClose, onNavigate }) {
  const isOpen = activeIndex !== null;
  const touchStartX = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    document.body.style.overflow = "hidden";

    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((activeIndex + 1) % items.length);
      if (e.key === "ArrowLeft") onNavigate((activeIndex - 1 + items.length) % items.length);
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, activeIndex, items.length, onClose, onNavigate]);

  if (!isOpen) return null;

  const item = items[activeIndex];

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta > 0) onNavigate((activeIndex - 1 + items.length) % items.length);
      else onNavigate((activeIndex + 1) % items.length);
    }
    touchStartX.current = null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="lightbox"
        role="dialog"
        aria-modal="true"
        aria-label="Visualização ampliada da galeria"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button type="button" className="lightbox__close" onClick={onClose} aria-label="Fechar galeria">
          <X size={22} aria-hidden="true" />
        </button>

        <button
          type="button"
          className="lightbox__nav lightbox__nav--prev"
          onClick={() => onNavigate((activeIndex - 1 + items.length) % items.length)}
          aria-label="Foto anterior"
        >
          <ChevronLeft size={24} aria-hidden="true" />
        </button>

        <motion.div
          key={item.name}
          className="lightbox__frame"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Photo name={item.name} alt={item.alt} loading="eager" />
        </motion.div>

        <button
          type="button"
          className="lightbox__nav lightbox__nav--next"
          onClick={() => onNavigate((activeIndex + 1) % items.length)}
          aria-label="Próxima foto"
        >
          <ChevronRight size={24} aria-hidden="true" />
        </button>

        <p className="lightbox__counter">
          {activeIndex + 1} / {items.length}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
