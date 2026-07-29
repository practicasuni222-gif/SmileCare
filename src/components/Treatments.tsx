import { useState, ReactNode } from "react";
import { TREATMENTS } from "../data/clinicData";
import { 
  FaTooth, 
  FaClock, 
  FaTag, 
  FaCheck, 
  FaCalendarCheck, 
  FaTriangleExclamation, 
  FaCircleInfo, 
  FaStethoscope, 
  FaTeethOpen, 
  FaMicroscope, 
  FaWandMagicSparkles, 
  FaShieldHalved 
} from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

interface Props {
  onBook: (treatment?: string) => void;
}

export default function Treatments({ onBook }: Props) {
  const [selected, setSelected] = useState<(typeof TREATMENTS)[0] | null>(null);

  // Helper para asignar un icono vectorial profesional según el tratamiento
  const renderTreatmentIcon = (id: number | string) => {
    switch (Number(id)) {
      case 1:
        return <FaTooth />;
      case 2:
        return <FaWandMagicSparkles />;
      case 3:
        return <FaTeethOpen />;
      case 4:
        return <FaShieldHalved />;
      case 5:
        return <FaMicroscope />;
      default:
        return <FaStethoscope />;
    }
  };

  return (
    <section id="tratamientos" className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-4 bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold tracking-wide uppercase">
            <FaTooth className="text-sky-600" />
            <span>Servicios Especializados</span>
          </div>

          <h2
            className="font-extrabold text-slate-900 tracking-tight mb-3"
            style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}
          >
            Nuestros Tratamientos
          </h2>

          <p className="text-slate-600 text-base max-w-lg mx-auto leading-relaxed" style={{ fontFamily: "DM Sans, sans-serif" }}>
            Ofrecemos una amplia gama de tratamientos dentales con tecnología de última generación para cuidar tu salud bucal.
          </p>
        </div>

        {/* Treatments Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TREATMENTS.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
              onClick={() => setSelected(t)}
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center text-2xl mb-4 group-hover:bg-sky-600 group-hover:text-white transition-all duration-300 shadow-sm">
                  {renderTreatmentIcon(t.id)}
                </div>

                <h3
                  className="font-bold text-slate-900 text-lg mb-2 group-hover:text-sky-600 transition-colors"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {t.name}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-6" style={{ fontFamily: "DM Sans, sans-serif" }}>
                  {t.short}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="font-bold text-sky-600 text-sm" style={{ fontFamily: "Outfit, sans-serif" }}>
                  {t.price}
                </span>

                <button
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-sky-50 hover:text-sky-600 transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(t);
                  }}
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  Más información
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Treatment Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-fadeIn"
          onClick={(e) => e.target === e.currentTarget && setSelected(null)}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden border border-slate-100 flex flex-col transform transition-all max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <span className="text-xl text-sky-600">{renderTreatmentIcon(selected.id)}</span>
                <h2
                  className="font-bold text-slate-900 text-lg"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {selected.name}
                </h2>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="w-8 h-8 rounded-full bg-slate-200/60 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors text-xl cursor-pointer"
                aria-label="Cerrar modal"
              >
                <IoClose />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex flex-col gap-5">
              <p className="text-slate-600 text-sm leading-relaxed" style={{ fontFamily: "DM Sans, sans-serif" }}>
                {selected.description}
              </p>

              {/* Tiles Info */}
              <div className="grid grid-cols-2 gap-3">
                <InfoTile icon={<FaClock />} label="Duración estimada" value={selected.duration} />
                <InfoTile icon={<FaTag />} label="Precio aprox." value={selected.price} />
              </div>

              {/* Beneficios */}
              <div>
                <p className="font-bold text-sm text-slate-900 mb-2.5 flex items-center gap-1.5" style={{ fontFamily: "Outfit, sans-serif" }}>
                  <span>Beneficios principales</span>
                </p>
                <ul className="grid grid-cols-1 gap-2">
                  {selected.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-xs text-slate-700" style={{ fontFamily: "DM Sans, sans-serif" }}>
                      <FaCheck className="text-emerald-500 text-xs flex-shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Indicaciones */}
              <div className="rounded-xl p-4 bg-slate-50 border border-slate-100 flex items-start gap-3">
                <FaCircleInfo className="text-sky-600 text-sm flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-xs text-slate-800 mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>
                    Indicaciones
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    {selected.indications}
                  </p>
                </div>
              </div>

              {/* Contraindicaciones */}
              <div className="rounded-xl p-4 bg-amber-50/70 border border-amber-200/60 flex items-start gap-3">
                <FaTriangleExclamation className="text-amber-600 text-sm flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-xs text-amber-900 mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>
                    Contraindicaciones
                  </p>
                  <p className="text-xs text-amber-800 leading-relaxed" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    {selected.contraindications}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button
                className="w-full py-3 px-5 rounded-xl font-bold text-white bg-sky-600 hover:bg-sky-500 shadow-md shadow-sky-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-sm cursor-pointer mt-1"
                onClick={() => {
                  setSelected(null);
                  onBook(selected.name);
                }}
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                <FaCalendarCheck className="text-sm" />
                <span>Agendar cita para {selected.name}</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}

function InfoTile({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl p-3.5 bg-sky-50/80 border border-sky-100 flex flex-col justify-center">
      <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1" style={{ fontFamily: "DM Sans, sans-serif" }}>
        <span className="text-sky-600">{icon}</span>
        <span>{label}</span>
      </div>
      <p className="font-bold text-sky-900 text-xs" style={{ fontFamily: "Outfit, sans-serif" }}>
        {value}
      </p>
    </div>
  );
}