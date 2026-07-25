import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CalendarCheck } from "lucide-react";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { useQuoteModal } from "../ContactModal/QuoteModalContext";
import "./AvailabilityToast.css";

const DISMISS_KEY = "lf_availability_toast_dismissed";
const TRIGGER_PROGRESS = 0.55;

export default function AvailabilityToast() {
  const { progress } = useScrollProgress();
  const { openQuoteModal } = useQuoteModal();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setDismissed(sessionStorage.getItem(DISMISS_KEY) === "1");
  }, []);

  useEffect(() => {
    if (!dismissed && progress > TRIGGER_PROGRESS) {
      setVisible(true);
    }
  }, [progress, dismissed]);

  function handleClose() {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem(DISMISS_KEY, "1");
  }

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          className="availability-toast"
          initial={{ opacity: 0, y: 20, x: -10 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <button type="button" className="availability-toast__close" onClick={handleClose} aria-label="Fechar aviso">
            <X size={14} aria-hidden="true" />
          </button>
          <CalendarCheck size={20} className="availability-toast__icon" aria-hidden="true" />
          <div>
            {/* EDITAR: mensagem de disponibilidade real, se fizer sentido usar esse aviso */}
            <p className="availability-toast__title">Ainda há datas disponíveis este mês</p>
            <button
              type="button"
              className="availability-toast__cta"
              onClick={() => {
                handleClose();
                openQuoteModal();
              }}
            >
              Ver disponibilidade
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
