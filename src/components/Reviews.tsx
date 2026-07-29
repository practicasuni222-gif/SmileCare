import { useState } from "react";
import { REVIEWS } from "../data/clinicData";
import { FaStar, FaTooth, FaChevronDown, FaChevronUp, FaQuoteLeft } from "react-icons/fa6";

export default function Reviews() {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? REVIEWS : REVIEWS.slice(0, 3);

  return (
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-4 bg-amber-100/70 border border-amber-200 text-amber-800 text-xs font-bold tracking-wide uppercase">
            <FaStar className="text-amber-500" />
            <span>Testimonios</span>
          </div>

          <h2
            className="font-extrabold text-slate-800 tracking-tight mb-3"
            style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}
          >
            Lo que dicen nuestros pacientes
          </h2>

          <p className="text-slate-600 text-base max-w-lg mx-auto leading-relaxed" style={{ fontFamily: "DM Sans, sans-serif" }}>
            Más de 800 reseñas verificadas. La satisfacción de nuestros pacientes es nuestra mayor recompensa.
          </p>
        </div>

        {/* Overall Rating Summary */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 px-8 py-6 rounded-2xl bg-gradient-to-br from-cyan-50/80 via-sky-50/50 to-blue-50/50 border border-cyan-100 shadow-sm">
            <div className="text-center">
              <div
                className="font-black text-5xl text-cyan-600 leading-none mb-1"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                4.9
              </div>
              <div className="flex gap-1 justify-center my-1.5 text-amber-400 text-sm">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <div className="text-xs font-medium text-slate-500" style={{ fontFamily: "DM Sans, sans-serif" }}>
                de 5.0
              </div>
            </div>

            <div className="hidden sm:block w-px h-16 bg-cyan-200/60" />

            {/* Rating Breakdown */}
            <div className="flex flex-col gap-2">
              {[5, 4, 3].map((stars) => {
                const count = REVIEWS.filter((r) => r.rating === stars).length;
                const pct = Math.round((count / REVIEWS.length) * 100);
                return (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-600 w-5 flex items-center gap-0.5">
                      {stars} <FaStar className="text-amber-400 text-[10px]" />
                    </span>
                    <div className="w-28 sm:w-36 h-2 rounded-full bg-slate-200/80 overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-400 font-medium w-4">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayed.map((r) => (
            <div
              key={r.id}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-4 relative"
            >
              <div className="flex flex-col gap-3">
                {/* User & Rating */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-full bg-gradient-to-tr from-cyan-500 to-sky-600 flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0 shadow-sm"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {r.avatar}
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="font-bold text-sm text-slate-800 truncate" style={{ fontFamily: "Outfit, sans-serif" }}>
                      {r.name}
                    </p>
                    <p className="text-xs text-slate-400" style={{ fontFamily: "DM Sans, sans-serif" }}>
                      {r.date}
                    </p>
                  </div>
                  <div className="flex gap-0.5 text-amber-400 text-xs flex-shrink-0">
                    {[...Array(r.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <div className="relative pt-1">
                  <FaQuoteLeft className="text-cyan-100 text-2xl absolute -top-1 -left-1 -z-0" />
                  <p className="text-slate-600 text-sm leading-relaxed relative z-10" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    "{r.text}"
                  </p>
                </div>
              </div>

              {/* Treatment Badge */}
              <div className="pt-2 border-t border-slate-100 mt-auto">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-800 text-[11px] font-semibold">
                  <FaTooth className="text-cyan-600" />
                  <span>{r.treatment}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Toggle Button */}
        <div className="text-center mt-10">
          <button
            className="py-3 px-6 rounded-xl font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm active:scale-[0.99] transition-all inline-flex items-center gap-2 text-sm cursor-pointer"
            onClick={() => setShowAll(!showAll)}
          >
            <span>{showAll ? "Ver menos" : "Ver todas las reseñas"}</span>
            {showAll ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
          </button>
        </div>

      </div>
    </section>
  );
}