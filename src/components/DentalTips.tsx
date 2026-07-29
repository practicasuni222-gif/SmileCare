import { useState } from "react";
import { TIPS } from "../data/clinicData";
import { 
  FaLightbulb, 
  FaArrowRight, 
  FaTooth, 
  FaShieldHalved, 
  FaAppleWhole, 
  FaWandMagicSparkles, 
  FaHandHoldingHeart, 
  FaCircleInfo 
} from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

export default function DentalTips() {
  const [selected, setSelected] = useState<(typeof TIPS)[0] | null>(null);

  // Helper para asignar un icono vectorial limpio según el ID o tipo de consejo
  const renderTipIcon = (id: number | string) => {
    switch (Number(id)) {
      case 1:
        return <FaTooth />;
      case 2:
        return <FaShieldHalved />;
      case 3:
        return <FaAppleWhole />;
      case 4:
        return <FaWandMagicSparkles />;
      case 5:
        return <FaHandHoldingHeart />;
      default:
        return <FaLightbulb />;
    }
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-4 bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold tracking-wide uppercase">
            <FaLightbulb className="text-sky-600" />
            <span>Educación Dental</span>
          </div>

          <h2
            className="font-extrabold text-slate-900 tracking-tight mb-3"
            style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}
          >
            Consejos para tu Salud Bucal
          </h2>

          <p className="text-slate-600 text-base max-w-md mx-auto leading-relaxed" style={{ fontFamily: "DM Sans, sans-serif" }}>
            Pequeños hábitos diarios que marcan una gran diferencia en la salud de tu boca.
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TIPS.map((tip) => (
            <div
              key={tip.id}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
              onClick={() => setSelected(tip)}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center text-xl mb-4 group-hover:bg-sky-600 group-hover:text-white transition-all duration-300 shadow-sm">
                  {renderTipIcon(tip.id)}
                </div>

                <h3
                  className="font-bold text-slate-800 text-lg mb-2 group-hover:text-sky-600 transition-colors"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {tip.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-4" style={{ fontFamily: "DM Sans, sans-serif" }}>
                  {tip.summary}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-1.5 text-sky-600 font-semibold text-sm group-hover:translate-x-1 transition-transform" style={{ fontFamily: "DM Sans, sans-serif" }}>
                <span>Leer artículo</span>
                <FaArrowRight className="text-xs" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Tip Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-fadeIn"
          onClick={(e) => e.target === e.currentTarget && setSelected(null)}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100 flex flex-col transform transition-all max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <span className="text-xl text-sky-600">{renderTipIcon(selected.id)}</span>
                <h2
                  className="font-bold text-slate-800 text-lg"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {selected.title}
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
            <div className="p-6 overflow-y-auto">
              <div className="w-full h-28 rounded-xl bg-slate-50 border border-slate-100 text-sky-600 flex items-center justify-center text-4xl mb-5 shadow-inner">
                {renderTipIcon(selected.id)}
              </div>

              <p className="text-slate-500 text-sm font-medium mb-4 leading-relaxed" style={{ fontFamily: "DM Sans, sans-serif" }}>
                {selected.summary}
              </p>

              <p className="text-slate-700 text-sm leading-relaxed mb-6" style={{ fontFamily: "DM Sans, sans-serif" }}>
                {selected.content}
              </p>

              {/* Callout Info */}
              <div className="p-4 rounded-xl bg-sky-50/80 border border-sky-100 flex items-start gap-3">
                <FaCircleInfo className="text-sky-600 text-base flex-shrink-0 mt-0.5" />
                <p className="text-slate-700 text-xs leading-relaxed font-medium" style={{ fontFamily: "DM Sans, sans-serif" }}>
                  ¿Tienes dudas sobre tu higiene bucal? Agenda una revisión preventiva con nuestros especialistas.
                </p>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}