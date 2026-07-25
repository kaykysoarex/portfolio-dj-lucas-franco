import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send } from "lucide-react";
import { buildQuoteMessage, buildWhatsAppLink } from "../../utils/whatsapp";
import "./ContactModal.css";

const EVENT_TYPES = [
  "Casamento",
  "Debutante (15 anos)",
  "Aniversário",
  "Formatura",
  "Evento corporativo",
  "Festa particular",
  "Evento temático",
  "Outro",
];

function createEmptyForm(eventType = "") {
  return {
    name: "",
    whatsapp: "",
    eventDate: "",
    city: "",
    eventType,
    guestCount: "",
    message: "",
  };
}

export default function ContactModal({ isOpen, onClose, defaultEventType = "" }) {
  const [form, setForm] = useState(() => createEmptyForm(defaultEventType));
  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return undefined;

    setForm(createEmptyForm(defaultEventType));
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => firstFieldRef.current?.focus(), 80);

    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, onClose, defaultEventType]);

  function handleChange(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const message = buildQuoteMessage({
      name: form.name,
      eventDate: form.eventDate,
      city: form.city,
      eventType: form.eventType,
      guestCount: form.guestCount,
      message: form.message,
    });
    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
    setForm(createEmptyForm());
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="quote-modal__backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="quote-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            ref={dialogRef}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <button type="button" className="quote-modal__close" onClick={onClose} aria-label="Fechar formulário de orçamento">
              <X size={20} aria-hidden="true" />
            </button>

            <p className="eyebrow">Orçamento rápido</p>
            <h2 id={titleId} className="quote-modal__title">
              Vamos falar sobre o seu evento
            </h2>
            <p className="quote-modal__hint">Preencha e enviaremos direto para o WhatsApp de Lucas Franco.</p>

            <form className="quote-modal__form" onSubmit={handleSubmit}>
              <label className="quote-field">
                <span>Nome</span>
                <input ref={firstFieldRef} type="text" required value={form.name} onChange={handleChange("name")} autoComplete="name" />
              </label>

              <label className="quote-field">
                <span>Seu WhatsApp</span>
                <input type="tel" required value={form.whatsapp} onChange={handleChange("whatsapp")} autoComplete="tel" placeholder="(31) 90000-0000" />
              </label>

              <div className="quote-field-row">
                <label className="quote-field">
                  <span>Data do evento</span>
                  <input type="date" value={form.eventDate} onChange={handleChange("eventDate")} />
                </label>
                <label className="quote-field">
                  <span>Cidade</span>
                  <input type="text" value={form.city} onChange={handleChange("city")} />
                </label>
              </div>

              <div className="quote-field-row">
                <label className="quote-field">
                  <span>Tipo de evento</span>
                  <select value={form.eventType} onChange={handleChange("eventType")}>
                    <option value="">Selecione</option>
                    {EVENT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="quote-field">
                  <span>Convidados (estimativa)</span>
                  <input type="number" min="0" value={form.guestCount} onChange={handleChange("guestCount")} />
                </label>
              </div>

              <label className="quote-field">
                <span>Mensagem</span>
                <textarea rows={3} value={form.message} onChange={handleChange("message")} placeholder="Conte um pouco mais sobre a festa" />
              </label>

              <button type="submit" className="quote-modal__submit">
                Enviar para o WhatsApp
                <Send size={18} aria-hidden="true" />
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
