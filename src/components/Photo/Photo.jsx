// Componente de imagem responsiva: serve WebP com fallback em JPEG,
// respeitando as dimensões reais (evita layout shift).

const modules = import.meta.glob("../../assets/images/*.{webp,jpg,jpeg,png}", {
  eager: true,
  import: "default",
});

function resolve(name, ext) {
  const match = Object.entries(modules).find(([path]) => path.endsWith(`/${name}.${ext}`));
  return match ? match[1] : null;
}

export default function Photo({
  name,
  alt,
  width,
  height,
  className,
  loading = "lazy",
  fetchPriority,
  sizes,
  style,
}) {
  const webp = resolve(name, "webp");
  const fallback = resolve(name, "jpg") || resolve(name, "jpeg") || resolve(name, "png");

  if (!fallback) return null;

  return (
    <picture>
      {webp && <source srcSet={webp} type="image/webp" sizes={sizes} />}
      <img
        src={fallback}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        // fetchPriority é reconhecido pelo React em minúsculas via prop custom
        fetchPriority={fetchPriority}
        className={className}
        style={style}
      />
    </picture>
  );
}
