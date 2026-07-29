import { useState } from "react";
import { FaCommentDots, FaPaperPlane, FaCircleCheck, FaSpinner } from "react-icons/fa6";

interface Form {
  name: string;
  email: string;
  message: string;
}

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Suggestions() {
  const [form, setForm] = useState<Form>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Ingresa tu nombre completo";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Ingresa un correo válido";
    if (!form.message.trim() || form.message.trim().length < 15) e.message = "El mensaje debe tener al menos 15 caracteres";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-4 bg-cyan-50 border border-cyan-100 text-cyan-800 text-xs font-bold tracking-wide uppercase">
            <FaCommentDots className="text-cyan-600" />
            <span>Feedback</span>
          </div>

          <h2
            className="font-extrabold text-slate-800 tracking-tight mb-3"
            style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.4rem)" }}
          >
            Tu opinión nos importa
          </h2>

          <p className="text-slate-600 text-base max-w-md mx-auto leading-relaxed" style={{ fontFamily: "DM Sans, sans-serif" }}>
            Comparte tus sugerencias o comentarios. Juntos mejoramos la experiencia de cada paciente.
          </p>
        </div>

        {/* Success View */}
        {sent ? (
          <div className="text-center py-12 px-8 rounded-3xl bg-gradient-to-br from-cyan-50/80 via-sky-50/60 to-blue-50/50 border border-cyan-100 shadow-sm flex flex-col items-center animate-fadeIn">
            <FaCircleCheck className="text-emerald-500 text-5xl mb-4" />
            <h3
              className="font-extrabold text-slate-800 text-2xl mb-2"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              ¡Gracias por tu sugerencia!
            </h3>
            <p className="text-slate-600 text-sm max-w-md leading-relaxed mb-6" style={{ fontFamily: "DM Sans, sans-serif" }}>
              Tu mensaje ha sido recibido. Nuestro equipo lo revisará y trabajará para mejorar tu experiencia en SmileCare.
            </p>
            <button
              className="py-3 px-6 rounded-xl font-bold text-white bg-sky-600 hover:bg-sky-500 shadow-md shadow-sky-500/20 active:scale-[0.98] transition-all text-sm cursor-pointer"
              onClick={() => setSent(false)}
            >
              Enviar otra sugerencia
            </button>
          </div>
        ) : (
          /* Form View */
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col gap-5"
            noValidate
          >
            {/* Nombre */}
            <div>
              <label
                className="block text-sm font-bold text-slate-800 mb-1.5"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                Nombre completo *
              </label>
              <input
                type="text"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 bg-slate-50/50 transition-all focus:bg-white focus:outline-none ${
                  errors.name
                    ? "border-red-400 focus:ring-2 focus:ring-red-200"
                    : "border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                }`}
                placeholder="Tu nombre"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={{ fontFamily: "DM Sans, sans-serif" }}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label
                className="block text-sm font-bold text-slate-800 mb-1.5"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                Correo electrónico *
              </label>
              <input
                type="email"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 bg-slate-50/50 transition-all focus:bg-white focus:outline-none ${
                  errors.email
                    ? "border-red-400 focus:ring-2 focus:ring-red-200"
                    : "border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                }`}
                placeholder="tu@correo.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={{ fontFamily: "DM Sans, sans-serif" }}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.email}</p>}
            </div>

            {/* Mensaje */}
            <div>
              <label
                className="block text-sm font-bold text-slate-800 mb-1.5"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                Sugerencia o comentario *
              </label>
              <textarea
                rows={4}
                maxLength={500}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 bg-slate-50/50 transition-all resize-none focus:bg-white focus:outline-none ${
                  errors.message
                    ? "border-red-400 focus:ring-2 focus:ring-red-200"
                    : "border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                }`}
                placeholder="Comparte tu experiencia o sugerencia para mejorar nuestro servicio..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                style={{ fontFamily: "DM Sans, sans-serif" }}
              />
              <div className="flex justify-between items-center mt-1.5">
                <div>
                  {errors.message && <p className="text-xs text-red-500 font-medium">{errors.message}</p>}
                </div>
                <span className="text-xs text-slate-400 font-medium">{form.message.length}/500</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-sky-600 hover:bg-sky-500 shadow-md shadow-sky-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin text-base" />
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <FaPaperPlane className="text-xs" />
                  <span>Enviar sugerencia</span>
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </section>
  );
}