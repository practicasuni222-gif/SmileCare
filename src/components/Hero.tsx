import { FaWhatsapp, FaChevronDown, FaStar, FaCheck, FaTooth } from "react-icons/fa6";

interface Props {
  onBook: () => void;
}

// Ruta de la imagen de la clínica configurada
const FOTO_CLINICA = "img/clinic.png"; 

export default function Hero({ onBook }: Props) {
  const scrollToTreatments = () => {
    const el = document.getElementById("tratamientos");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-cyan-50/60 via-sky-50/40 to-blue-50/30"
      style={{ paddingTop: 80 }}
    >
      {/* Decorative background circles */}
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full opacity-20 bg-cyan-400 blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-20 bg-blue-400 blur-3xl pointer-events-none -translate-x-1/3 translate-y-1/3" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 w-full py-12 md:py-20 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Column */}
        <div className="flex flex-col items-start z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6 bg-cyan-100/60 border border-cyan-200/80 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-xs font-semibold text-cyan-800 tracking-wide" style={{ fontFamily: "DM Sans, sans-serif" }}>
              Clínica de alta especialidad • Toluca, México
            </span>
          </div>

          <h1 
            className="font-extrabold text-slate-800 tracking-tight leading-tight mb-5" 
            style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }}
          >
            Tu sonrisa perfecta{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-sky-600">
              comienza aquí
            </span>
          </h1>

          <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl" style={{ fontFamily: "DM Sans, sans-serif" }}>
            En SmileCare combinamos tecnología de vanguardia con el cuidado más humano para brindarte tratamientos dentales de excelencia. Más de <strong className="text-slate-800 font-bold">10,000 sonrisas transformadas.</strong>
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-8 w-full max-w-md py-4 border-y border-slate-200/60">
            {[
              { num: "4+", label: "Especialistas" },
              { num: "15+", label: "Años experiencia" },
              { num: "10K+", label: "Pacientes felices" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="font-extrabold text-2xl md:text-3xl text-cyan-600 leading-none mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>
                  {s.num}
                </span>
                <span className="text-xs text-slate-500 font-medium" style={{ fontFamily: "DM Sans, sans-serif" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 w-full sm:w-auto">
            <button 
              className="py-3.5 px-6 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 text-base cursor-pointer"
              onClick={onBook}
            >
              <FaWhatsapp className="text-xl" />
              <span>Agendar cita por WhatsApp</span>
            </button>
            
            <button 
              className="py-3.5 px-6 rounded-xl font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
              onClick={scrollToTreatments}
            >
              <span>Conocer más</span>
              <FaChevronDown className="text-xs text-slate-400" />
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-4 mt-8 pt-2">
            {["Sin dolor", "Tecnología digital", "Precios accesibles", "Atención inmediata"].map((badge) => (
              <div key={badge} className="flex items-center gap-1.5 text-xs font-semibold text-slate-600" style={{ fontFamily: "DM Sans, sans-serif" }}>
                <FaCheck className="text-emerald-500 text-xs" />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Image & Floating Badges */}
        <div className="relative hidden md:block">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            
            {/* Imagen de la clínica */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-cyan-900/10 border-4 border-white">
              <img
                src={FOTO_CLINICA}
                alt="SmileCare Clínica Dental — interior"
                className="w-full h-[460px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 via-transparent to-transparent" />
            </div>

            {/* Floating Card 1: Reviews */}
            <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3.5 animate-bounce-slow">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center text-lg shadow-inner">
                <FaStar />
              </div>
              <div>
                <div className="font-extrabold text-slate-800 text-base leading-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
                  4.9 / 5.0
                </div>
                <div className="text-xs text-slate-500 font-medium" style={{ fontFamily: "DM Sans, sans-serif" }}>
                  +800 reseñas verificadas
                </div>
              </div>
            </div>

            {/* Floating Card 2: Treatments */}
            <div className="absolute -top-5 -right-5 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center text-base border border-sky-100">
                <FaTooth />
              </div>
              <div>
                <div className="font-bold text-slate-800 text-sm leading-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
                  15+ tratamientos
                </div>
                <div className="text-[11px] text-slate-500 font-medium" style={{ fontFamily: "DM Sans, sans-serif" }}>
                  Especializados
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 leading-none z-0">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full h-12 text-white fill-current">
          <path d="M0 60L1440 60L1440 30C1200 0 960 60 720 30C480 0 240 60 0 30L0 60Z" />
        </svg>
      </div>
    </section>
  );
}