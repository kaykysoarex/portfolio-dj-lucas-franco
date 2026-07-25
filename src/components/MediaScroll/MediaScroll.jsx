import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import Photo from "../Photo/Photo";
import "./MediaScroll.css";

function MediaScrollItem({ item, index }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.3, once: false });
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  // Vídeo só toca quando realmente visível na tela, e pausa ao sair —
  // preserva dados/bateria do usuário no mobile.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isVisible) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isVisible]);

  return (
    <figure
      className={`media-scroll-item media-scroll-item--${index % 2 === 0 ? "left" : "right"}`}
      ref={ref}
      data-visible={isVisible}
    >
      <div className="media-scroll-item__frame">
        {item.type === "video" ? (
          <>
            <video
              ref={videoRef}
              src={item.src}
              poster={item.poster}
              muted={muted}
              playsInline
              loop
              preload="metadata"
            />
            <button
              type="button"
              className="media-scroll-item__mute"
              onClick={() => setMuted((prev) => !prev)}
              aria-label={muted ? "Ativar som do vídeo" : "Silenciar vídeo"}
            >
              {muted ? <VolumeX size={16} aria-hidden="true" /> : <Volume2 size={16} aria-hidden="true" />}
            </button>
          </>
        ) : (
          <Photo name={item.name} alt={item.caption ?? ""} loading="lazy" />
        )}
      </div>
      {item.caption && <figcaption>{item.caption}</figcaption>}
    </figure>
  );
}

/**
 * Experiência de rolagem com fotos/vídeos alternando alinhamento e
 * revelando por máscara conforme a rolagem — usada em Casamentos (mobile).
 * Já aceita itens do tipo "video" (muted/playsInline/preload=metadata,
 * toca apenas quando visível) para quando houver material real do cliente.
 */
export default function MediaScroll({ items }) {
  return (
    <div className="media-scroll">
      {items.map((item, i) => (
        <MediaScrollItem key={item.name ?? item.src} item={item} index={i} />
      ))}
    </div>
  );
}
