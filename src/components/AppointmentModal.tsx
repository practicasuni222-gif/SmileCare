import { useState } from "react";
import { WA_NUMBER, DOCTORS, TREATMENTS } from "../data/clinicData";
import { FaWhatsapp, FaCalendarPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

interface Props {
  onClose: () => void;
  preDoctor?: string;
  preTreatment?: string;
}

interface FormData {
  name: string;
  phone: string;
  date: string;
  time: string;
  doctor: string;
  treatment: string;
}

interface Errors {
  name?: string;
  phone?: string;
  date?: string;
  time?: string;
  doctor?: string;
  treatment?: string;
}

const TIME_SLOTS = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "02:00 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM",
];

export default function AppointmentModal({ onClose, preDoctor = "", preTreatment = "" }: Props) {
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    date: "",
    time: "",
    doctor: preDoctor,
    treatment: preTreatment,
  });
  const [errors, setErrors] = useState<Errors>({});

  const today = new Date().toISOString().split("T")[0];

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.name.trim() || form.name.trim().length < 3) e.name = "Ingresa tu nombre completo";
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Teléfono debe tener 10 dígitos";
    if (!form.date) e.date = "Selecciona una fecha";
    if (!form.time) e.time = "Selecciona una hora";
    if (!form.doctor) e.doctor = "Selecciona un doctor";
    if (!form.treatment) e.treatment = "Selecciona un tratamiento";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const [year, month, day] = form.date.split("-");
    const dateStr = `${day}/${month}/${year}`;
    const msg = encodeURIComponent(
      `Hola, quiero agendar una cita en SmileCare Clínica Dental.\n\n` +
      `*Nombre:* ${form.name}\n` +
      `*Teléfono:* ${form.phone}\n` +
      `*Fecha:* ${dateStr}\n` +
      `*Hora:* ${form.time}\n` +
      `*Doctor:* ${form.doctor}\n` +
      `*Tratamiento:* ${form.treatment}`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
    onClose();
  };

  const field = (key: keyof FormData, label: string, node: React.ReactNode) => (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "Outfit, sans-serif" }}>
        {label} <span className="text-rose-500">*</span>
      </label>
      {node}
      {errors[key] && <p className="text-xs text-rose-500 font-medium mt-0.5">{errors[key]}</p>}
    </div>
  );

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-fadeIn"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100 flex flex-col transform transition-all">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 md:p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-sky-600 bg-sky-50 border border-sky-100 text-xl shadow-sm">
              <FaCalendarPlus />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-extrabold text-slate-800" style={{ fontFamily: "Outfit, sans-serif" }}>
                Agendar Cita
              </h2>
              <p className="text-xs text-slate-500 font-medium">Te confirmaremos de inmediato por WhatsApp</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-all text-xl"
            aria-label="Cerrar modal"
          >
            <IoClose />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 flex flex-col gap-4 max-h-[75vh] overflow-y-auto">
          {field("name", "Nombre completo",
            <input
              type="text"
              className={`input-field w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-800 focus:outline-none transition-all ${errors.name ? "border-rose-400 bg-rose-50/20" : "border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"}`}
              placeholder="Ej: Juan Pérez García"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          )}

          {field("phone", "Teléfono celular (10 dígitos)",
            <input
              type="tel"
              className={`input-field w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-800 focus:outline-none transition-all ${errors.phone ? "border-rose-400 bg-rose-50/20" : "border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"}`}
              placeholder="Ej: 9984000000"
              value={form.phone}
              maxLength={10}
              onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })}
            />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {field("date", "Fecha",
              <input
                type="date"
                className={`input-field w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-800 focus:outline-none transition-all ${errors.date ? "border-rose-400 bg-rose-50/20" : "border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"}`}
                min={today}
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            )}

            {field("time", "Hora",
              <select
                className={`input-field w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-800 focus:outline-none transition-all bg-white ${errors.time ? "border-rose-400 bg-rose-50/20" : "border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"}`}
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
              >
                <option value="">Seleccionar hora</option>
                {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            )}
          </div>

          {field("doctor", "Doctor de preferencia",
            <select
              className={`input-field w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-800 focus:outline-none transition-all bg-white ${errors.doctor ? "border-rose-400 bg-rose-50/20" : "border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"}`}
              value={form.doctor}
              onChange={(e) => setForm({ ...form, doctor: e.target.value })}
            >
              <option value="">Seleccionar doctor</option>
              {DOCTORS.map((d) => <option key={d.id} value={d.name}>{d.name} – {d.specialty}</option>)}
            </select>
          )}

          {field("treatment", "Tratamiento o motivo",
            <select
              className={`input-field w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-800 focus:outline-none transition-all bg-white ${errors.treatment ? "border-rose-400 bg-rose-50/20" : "border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"}`}
              value={form.treatment}
              onChange={(e) => setForm({ ...form, treatment: e.target.value })}
            >
              <option value="">Seleccionar tratamiento</option>
              {TREATMENTS.map((t) => <option key={t.id} value={t.name}>{t.name}</option>)}
              <option value="Consulta de valoración">Consulta de valoración</option>
              <option value="Revisión general">Revisión general</option>
            </select>
          )}

          {/* Submit Action */}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={handleSubmit}
              className="w-full py-3 px-4 rounded-xl font-bold text-white shadow-lg shadow-emerald-500/20 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-base"
            >
              <FaWhatsapp className="text-xl" />
              <span>Continuar por WhatsApp</span>
            </button>

            <p className="text-center text-xs text-slate-400 font-medium mt-1">
              Al presionar serás redirigido a WhatsApp con tus datos listos para enviar.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
