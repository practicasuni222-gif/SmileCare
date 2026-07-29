import { WA_NUMBER } from "../data/clinicData";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa6";

interface Props {
  onBook: () => void;
}

export default function Footer({ onBook }: Props) {
  const waLink = `https://wa.me/${WA_NUMBER}`;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const socialLinks = [
    { icon: FaFacebookF, label: "Facebook", href: "https://facebook.com" },
    { icon: FaInstagram, label: "Instagram", href: "https://instagram.com" },
    { icon: FaWhatsapp, label: "WhatsApp", href: waLink },
  ];

  return (
    <footer style={{ background: "#0F1E2E" }}>
      {/* CTA band */}
      <div style={{ background: "linear-gradient(135deg, #11B5C9, #3B82F6)" }} className="py-14 px-4 text-center">
        <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: "#fff", marginBottom: 12 }}>
          ¿Listo para transformar tu sonrisa?
        </h2>
        <p style={{ fontFamily: "DM Sans, sans-serif", color: "rgba(255,255,255,0.85)", fontSize: "1rem", marginBottom: 24 }}>
          Agenda tu consulta hoy y da el primer paso hacia la sonrisa que siempre quisiste.
        </p>
        <button
          className="btn-primary"
          style={{ background: "#fff", color: "#11B5C9", fontSize: "1rem", padding: "0.85rem 2rem" }}
          onClick={onBook}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#E8F9FB"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; }}
        >
          📅 Agendar cita GRATIS
        </button>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-base" style={{ background: "linear-gradient(135deg, #11B5C9, #3B82F6)" }}>S</div>
            <div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1rem", color: "#fff" }}>SmileCare</div>
              <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.6rem", color: "#11B5C9", letterSpacing: "0.1em", textTransform: "uppercase" }}>Clínica Dental</div>
            </div>
          </div>
          <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.85rem", color: "#94A3B8", lineHeight: 1.7, marginBottom: 20 }}>
            Tu clínica dental de confianza en Toluca. Tecnología de vanguardia, especialistas certificados y el cuidado que mereces.
          </p>
          {/* Social */}
          <div className="flex gap-3">
            {socialLinks.map((s) => {
              const IconComponent = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-base transition-colors"
                  style={{ background: "rgba(255,255,255,0.08)", color: "#94A3B8" }}
                  title={s.label}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#11B5C9"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#94A3B8"; }}
                >
                  <IconComponent />
                </a>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#fff", marginBottom: 16 }}>Navegación</h4>
          <ul className="flex flex-col gap-2.5">
            {[
              { label: "Inicio", id: "inicio" },
              { label: "Doctores", id: "doctores" },
              { label: "Tratamientos", id: "tratamientos" },
              { label: "Promociones", id: "promociones" },
              { label: "Contacto", id: "contacto" },
            ].map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollTo(link.id)}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "DM Sans, sans-serif", fontSize: "0.875rem", color: "#94A3B8", textAlign: "left" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#11B5C9")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#94A3B8")}
                >
                  → {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#fff", marginBottom: 16 }}>Tratamientos</h4>
          <ul className="flex flex-col gap-2.5">
            {["Limpieza Dental", "Ortodoncia", "Blanqueamiento", "Implantes Dentales", "Coronas y Carillas", "Urgencias"].map((s) => (
              <li key={s}>
                <button
                  onClick={() => scrollTo("tratamientos")}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "DM Sans, sans-serif", fontSize: "0.875rem", color: "#94A3B8", textAlign: "left" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#11B5C9")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#94A3B8")}
                >
                  → {s}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#fff", marginBottom: 16 }}>Contacto</h4>
          <div className="flex flex-col gap-4">
            {[
              { icon: "📍", text: "Av. Miguel Hidalgo 456, Centro\nToluca, México" },
              { icon: "📞", text: "(998) 521-4562", href: "tel:+5219984000000" },
              { icon: "✉️", text: "contacto@smilecare.mx", href: "mailto:contacto@smilecare.mx" },
              { icon: "🕐", text: "Lun–Vie: 9:00–20:00\nSáb: 9:00–15:00" },
            ].map((c) => (
              <div key={c.icon} className="flex gap-3 items-start">
                <span style={{ fontSize: "1rem", marginTop: 2 }}>{c.icon}</span>
                {c.href ? (
                  <a
                    href={c.href}
                    style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.85rem", color: "#94A3B8", textDecoration: "none", lineHeight: 1.6, whiteSpace: "pre-line" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#11B5C9")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#94A3B8")}
                  >
                    {c.text}
                  </a>
                ) : (
                  <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.85rem", color: "#94A3B8", lineHeight: 1.6, whiteSpace: "pre-line" }}>
                    {c.text}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t px-4 md:px-8 py-5" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.8rem", color: "#64748B" }}>
            © 2026 SmileCare Clínica Dental. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            {["Aviso de Privacidad", "Términos y Condiciones"].map((l) => (
              <button
                key={l}
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "DM Sans, sans-serif", fontSize: "0.8rem", color: "#64748B", padding: 0 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#11B5C9")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#64748B")}
                onClick={() => alert(`Aquí iría el contenido de ${l}. Esta funcionalidad se conectará con el backend PHP/MySQL.`)}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}