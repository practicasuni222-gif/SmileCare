import { useState } from "react";
import { DOCTORS } from "../data/clinicData";

interface Props {
  onBook: (doctor?: string) => void;
}

export default function Doctors({ onBook }: Props) {
  const [selected, setSelected] = useState<(typeof DOCTORS)[0] | null>(null);

  return (
    <section id="doctores" className="py-20 px-4 md:px-8" style={{ background: "#F5F8FA" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="badge mb-4" style={{ background: "#E8F9FB", color: "#0D94A6" }}>🩺 Nuestros Especialistas</div>
          <h2 className="section-title" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", marginBottom: "1rem" }}>
            Conoce a nuestro equipo
          </h2>
          <div className="section-divider" />
          <p className="section-subtitle" style={{ maxWidth: 540, margin: "0 auto", lineHeight: 1.75 }}>
            Médicos especialistas certificados, con años de experiencia y el compromiso de brindarte la mejor atención odontológica.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DOCTORS.map((doc) => (
            <div key={doc.id} className="card p-0 overflow-hidden group cursor-pointer" onClick={() => setSelected(doc)}>
              <div className="relative overflow-hidden" style={{ height: 220 }}>
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ background: "#E8F9FB" }}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(17,181,201,0.3), transparent)" }} />
              </div>
              <div className="p-5">
                <div className="badge mb-2" style={{ background: "#E8F9FB", color: "#0D94A6", fontSize: "0.7rem" }}>
                  {doc.specialty}
                </div>
                <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#1A2B3C", marginBottom: 4 }}>
                  {doc.name}
                </h3>
                <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.8rem", color: "#6B7B8D", marginBottom: 16 }}>
                  {doc.experience}
                </p>
                <button
                  className="btn-outline w-full justify-center"
                  style={{ fontSize: "0.8rem", padding: "0.55rem 1rem" }}
                  onClick={(e) => { e.stopPropagation(); setSelected(doc); }}
                >
                  Ver perfil
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Doctor Modal */}
      {selected && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setSelected(null)}>
          <div className="modal-box w-full" style={{ maxWidth: 600 }}>
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "#E2EBF0" }}>
              <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.2rem", color: "#1A2B3C" }}>
                Perfil del Especialista
              </h2>
              <button
                onClick={() => setSelected(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
                style={{ background: "#F5F8FA", color: "#6B7B8D", border: "none", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="flex gap-5 mb-6">
                <img
                  src={selected.image}
                  alt={selected.name}
                  className="w-28 h-28 rounded-2xl object-cover flex-shrink-0"
                  style={{ background: "#E8F9FB", boxShadow: "0 4px 16px rgba(17,181,201,0.2)" }}
                />
                <div>
                  <div className="badge mb-2" style={{ background: "#E8F9FB", color: "#0D94A6" }}>{selected.specialty}</div>
                  <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#1A2B3C", marginBottom: 4 }}>
                    {selected.name}
                  </h3>
                  <p style={{ fontFamily: "DM Sans, sans-serif", color: "#6B7B8D", fontSize: "0.875rem" }}>{selected.experience}</p>
                </div>
              </div>

              <p style={{ fontFamily: "DM Sans, sans-serif", color: "#4A5C6D", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                {selected.bio}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <InfoBlock icon="🎓" label="Universidad" value={selected.university} />
                <InfoBlock icon="🕐" label="Horario" value={selected.schedule} />
              </div>

              <div className="mb-5">
                <p className="text-sm font-semibold mb-2" style={{ fontFamily: "Outfit, sans-serif", color: "#1A2B3C" }}>🏅 Certificaciones</p>
                <div className="flex flex-col gap-1.5">
                  {selected.certifications.map((c) => (
                    <div key={c} className="flex items-center gap-2">
                      <span style={{ color: "#11B5C9" }}>✓</span>
                      <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.875rem", color: "#4A5C6D" }}>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="btn-primary w-full justify-center"
                onClick={() => { setSelected(null); onBook(selected.name); }}
              >
                📅 Agendar cita con {selected.name.split(" ")[0]} {selected.name.split(" ")[1]}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function InfoBlock({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="rounded-xl p-3" style={{ background: "#F5F8FA" }}>
      <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.7rem", color: "#6B7B8D", marginBottom: 4 }}>{icon} {label}</p>
      <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.82rem", color: "#1A2B3C", fontWeight: 500 }}>{value}</p>
    </div>
  );
}
