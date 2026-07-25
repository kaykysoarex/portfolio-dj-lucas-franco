import { MessageCircle } from "lucide-react";
import { djData } from "../../data/djData";
import { buildWhatsAppLink, defaultWhatsAppMessage } from "../../utils/whatsapp";
import "./WhatsAppButton.css";

export default function WhatsAppButton() {
  return (
    <a
      className="whatsapp-fab"
      href={buildWhatsAppLink(defaultWhatsAppMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Falar com ${djData.brand.name} no WhatsApp`}
    >
      <span className="whatsapp-fab__ping" aria-hidden="true" />
      <MessageCircle size={26} aria-hidden="true" strokeWidth={2.2} />
    </a>
  );
}
