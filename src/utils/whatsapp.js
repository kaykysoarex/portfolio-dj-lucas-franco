import { djData } from "../data/djData";

/**
 * Monta um link wa.me com mensagem pré-preenchida.
 * @param {string} message - texto da mensagem (sem necessidade de encodeURIComponent)
 * @returns {string} URL pronta para usar em href
 */
export function buildWhatsAppLink(message) {
  const number = djData.contact.whatsapp;
  const text = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${text}`;
}

export const defaultWhatsAppMessage =
  "Olá, Lucas! Vi o seu site e quero saber mais sobre a contratação para o meu evento.";

/**
 * Monta a mensagem estruturada a partir dos dados do formulário de orçamento.
 */
export function buildQuoteMessage({ name, eventDate, city, eventType, guestCount, message }) {
  const lines = [
    "Olá, Lucas! Gostaria de um orçamento:",
    name ? `Nome: ${name}` : null,
    eventType ? `Tipo de evento: ${eventType}` : null,
    eventDate ? `Data: ${eventDate}` : null,
    city ? `Cidade: ${city}` : null,
    guestCount ? `Convidados (estimativa): ${guestCount}` : null,
    message ? `Mensagem: ${message}` : null,
  ].filter(Boolean);

  return lines.join("\n");
}
