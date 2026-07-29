import { useState } from "react";
import { PROMOTIONS, WA_NUMBER } from "../data/clinicData";
import { FaTag, FaCalendarAlt, FaWhatsapp, FaEye, FaInfoCircle, FaFileContract } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function Promotions() {
  const [selected, setSelected] = useState<(typeof PROMOTIONS)[0] | null>(null);

  const requestPromo = (promo: (typeof PROMOTIONS)[0]) => {
    const msg = encodeURIComponent(
      `Hola, me interesa la promoción:\n\n*${promo.title}* (${promo.discount})\n\n¿Podría darme más información y agendar una cita?`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
    setSelected(null);
  };

  return (
    <section id="promociones" className="py-20 px-4 md:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-4 bg-amber-100/70 border border-amber-200 text-amber-800 text-xs font-bold tracking-wide uppercase">
            <FaTag className="text-amber-600" />
            <span>Ofertas Especiales</span>
          </div>

          <h2
            className="font-extrabold text-slate-800 tracking-tight mb-3"
            style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}
          >
            Promociones del Mes
          </h2>

          <p className="text-slate-600 text-base max-w-lg mx-auto leading-relaxed" style={{ fontFamily: "DM Sans, sans-serif" }}>
            Aprovecha nuestras promociones exclusivas y transforma tu sonrisa al mejor precio.
          </p>
        </div>

        {/* Grid de Promociones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PROMOTIONS.map((promo) => (
            <div
              key={promo.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col justify-between"
              onClick={() => setSelected(promo)}
            >
              <div>
                {/* Header con imagen y overlay */}
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${promo.color} opacity-85`} />
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
                    <span
                      className="font-black text-3xl sm:text-4xl drop-shadow-md tracking-tight"
                      style={{ fontFamily: "Outfit, sans-serif" }}
                    >
                      {promo.discount}
                    </span>
                    <span className="font-bold text-lg opacity-95 mt-1" style={{ fontFamily: "Outfit, sans-serif" }}>
                      {promo.title}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5">
                  <p className="text-slate-600 text-sm leading-relaxed mb-4" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    {promo.description}
                  </p>
                </div>
              </div>

              {/* Footer de la tarjeta */}
              <div className="px-5 pb-5 pt-0 flex items-center justify-between border-t border-slate-100 pt-4">
                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium" style={{ fontFamily: "DM Sans, sans-serif" }}>
                  <FaCalendarAlt className="text-cyan-600 text-xs" />
                  <span>Válido: {promo.validUntil}</span>
                </div>

                <button
                  className="py-2 px-3.5 rounded-lg text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 transition-colors flex items-center gap-1.5 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(promo);
                  }}
                >
                  <FaEye className="text-xs" />
                  <span>Ver detalles</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Promo Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-fadeIn"
          onClick={(e) => e.target === e.currentTarget && setSelected(null)}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100 flex flex-col transform transition-all">
            
            {/* Modal Header */}
            <div className={`relative p-8 bg-gradient-to-br ${selected.color} text-white text-center flex flex-col items-center`}>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors text-xl"
                aria-label="Cerrar"
              >
                <IoClose />
              </button>

              <span className="text-xs uppercase tracking-wider font-bold bg-white/20 px-3 py-1 rounded-full mb-2">
                Promoción Especial
              </span>
              <div className="font-black text-4xl mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>
                {selected.discount}
              </div>
              <div className="font-bold text-xl" style={{ fontFamily: "Outfit, sans-serif" }}>
                {selected.title}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 flex flex-col gap-4">
              <div>
                <p className="font-bold text-xs uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1.5" style={{ fontFamily: "Outfit, sans-serif" }}>
                  <FaInfoCircle className="text-sky-600" />
                  Descripción
                </p>
                <p className="text-slate-600 text-sm leading-relaxed" style={{ fontFamily: "DM Sans, sans-serif" }}>
                  {selected.description}
                </p>
              </div>

              <div className="rounded-xl p-4 bg-amber-50/80 border border-amber-200/60">
                <p className="font-bold text-xs uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1.5" style={{ fontFamily: "Outfit, sans-serif" }}>
                  <FaFileContract className="text-amber-600" />
                  Condiciones
                </p>
                <p className="text-amber-800 text-xs leading-relaxed" style={{ fontFamily: "DM Sans, sans-serif" }}>
                  {selected.conditions}
                </p>
              </div>

              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-800 text-xs font-semibold">
                <FaCalendarAlt className="text-cyan-600" />
                <span>Vigencia: {selected.validUntil}</span>
              </div>

              {/* WhatsApp Action */}
              <button
                className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-base cursor-pointer mt-1"
                onClick={() => requestPromo(selected)}
              >
                <FaWhatsapp className="text-xl" />
                <span>Solicitar esta promoción</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}