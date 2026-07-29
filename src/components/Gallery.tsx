import { useState } from "react";
import { GALLERY_IMAGES } from "../data/clinicData";

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = () => setLightbox((i) => (i === null ? null : (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length));
  const next = () => setLightbox((i) => (i === null ? null : (i + 1) % GALLERY_IMAGES.length));

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
    if (e.key === "Escape") setLightbox(null);
  };

  return (
    <section className="py-20 px-4 md:px-8" style={{ background: "#F5F8FA" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="badge mb-4" style={{ background: "#E8F9FB", color: "#0D94A6" }}>📸 Galería</div>
          <h2 className="section-title" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", marginBottom: "1rem" }}>
            Conoce Nuestras Instalaciones
          </h2>
          <div className="section-divider" />
          <p className="section-subtitle" style={{ maxWidth: 480, margin: "0 auto" }}>
            Espacios diseñados para tu comodidad, con tecnología de punta y un ambiente cálido y profesional.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={img.id}
              className="relative rounded-2xl overflow-hidden cursor-pointer group"
              style={{ height: i % 5 === 0 ? 240 : 180 }}
              onClick={() => setLightbox(i)}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                style={{ background: "#E2EBF0" }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(17,181,201,0.7)" }}>
                <span className="text-white text-3xl mb-2">🔍</span>
                <span className="text-white text-sm font-medium" style={{ fontFamily: "Outfit, sans-serif" }}>{img.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="modal-overlay"
          style={{ padding: 0, background: "rgba(0,0,0,0.92)" }}
          onKeyDown={handleKey}
          tabIndex={-1}
          onClick={(e) => e.target === e.currentTarget && setLightbox(null)}
        >
          <div className="relative flex items-center justify-center w-full h-full" style={{ maxWidth: "90vw", maxHeight: "90vh" }}>
            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full text-white text-lg"
              style={{ background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer" }}
            >✕</button>

            {/* Prev */}
            <button
              onClick={prev}
              className="absolute left-4 w-12 h-12 flex items-center justify-center rounded-full text-white text-xl z-10 transition-colors"
              style={{ background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(17,181,201,0.7)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
            >←</button>

            {/* Image */}
            <div className="flex flex-col items-center gap-4">
              <img
                src={GALLERY_IMAGES[lightbox].url}
                alt={GALLERY_IMAGES[lightbox].alt}
                style={{ maxWidth: "80vw", maxHeight: "75vh", objectFit: "contain", borderRadius: 12 }}
              />
              <div className="text-white text-center">
                <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600, fontSize: "1rem" }}>
                  {GALLERY_IMAGES[lightbox].label}
                </p>
                <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.8rem", opacity: 0.6 }}>
                  {lightbox + 1} / {GALLERY_IMAGES.length}
                </p>
              </div>
            </div>

            {/* Next */}
            <button
              onClick={next}
              className="absolute right-4 w-12 h-12 flex items-center justify-center rounded-full text-white text-xl z-10 transition-colors"
              style={{ background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(17,181,201,0.7)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
            >→</button>
          </div>
        </div>
      )}
    </section>
  );
}
