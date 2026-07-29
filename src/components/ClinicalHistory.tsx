import { useState } from "react";
import { DOCTORS, TREATMENTS } from "../data/clinicData";

interface Record {
  id: number;
  date: string;
  doctor: string;
  treatment: string;
  observations: string;
}

const INITIAL: Record[] = [
  { id: 1, date: "2026-06-15", doctor: "Dra. Adalay Velazquez", treatment: "Limpieza Dental", observations: "Paciente con acumulación moderada de sarro. Se realizó raspado y pulido. Próxima cita en 6 meses." },
  { id: 2, date: "2026-04-02", doctor: "Dr. Miguel Torres", treatment: "Endodoncia", observations: "Tratamiento de conducto en pieza 36. Sin complicaciones. Se colocó poste de fibra y corona provisional." },
  { id: 3, date: "2026-01-20", doctor: "Dra. Adalay Velazquez", treatment: "Ortodoncia", observations: "Ajuste mensual de brackets. Se activaron las ligas en sector anterior. Progreso satisfactorio." },
];

interface FormState {
  date: string;
  doctor: string;
  treatment: string;
  observations: string;
}

interface FormErrors {
  date?: string;
  doctor?: string;
  treatment?: string;
  observations?: string;
}

export default function ClinicalHistory() {
  const [records, setRecords] = useState<Record[]>(INITIAL);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>({ date: "", doctor: "", treatment: "", observations: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.date) e.date = "Selecciona una fecha";
    if (!form.doctor) e.doctor = "Selecciona un doctor";
    if (!form.treatment) e.treatment = "Selecciona un tratamiento";
    if (!form.observations.trim() || form.observations.trim().length < 10) e.observations = "Escribe al menos 10 caracteres";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const openAdd = () => {
    setEditId(null);
    setForm({ date: "", doctor: "", treatment: "", observations: "" });
    setErrors({});
    setShowForm(true);
  };

  const openEdit = (rec: Record) => {
    setEditId(rec.id);
    setForm({ date: rec.date, doctor: rec.doctor, treatment: rec.treatment, observations: rec.observations });
    setErrors({});
    setShowForm(true);
  };

  const handleSave = () => {
    if (!validate()) return;
    if (editId !== null) {
      setRecords((prev) => prev.map((r) => r.id === editId ? { ...r, ...form } : r));
    } else {
      setRecords((prev) => [...prev, { id: Date.now(), ...form }]);
    }
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
    setDeleteConfirm(null);
  };

  const formatDate = (d: string) => {
    if (!d) return "—";
    const [y, m, day] = d.split("-");
    const months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
    return `${parseInt(day)} ${months[parseInt(m) - 1]} ${y}`;
  };

  return (
    <section className="py-20 px-4 md:px-8" style={{ background: "#F5F8FA" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <div className="badge mb-3" style={{ background: "#E8F9FB", color: "#0D94A6" }}>📋 Expediente</div>
            <h2 className="section-title" style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)" }}>
              Historial Clínico
            </h2>
            <p className="section-subtitle mt-2">Registro completo de tratamientos y visitas del paciente.</p>
          </div>
          <button className="btn-primary flex-shrink-0" onClick={openAdd}>
            ➕ Agregar nuevo registro
          </button>
        </div>

        {/* Table */}
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #E2EBF0", background: "#fff" }}>
          <div className="overflow-x-auto">
            <table className="w-full" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "linear-gradient(90deg, #11B5C9, #3B82F6)", color: "#fff" }}>
                  {["Fecha", "Doctor", "Tratamiento", "Observaciones", "Acciones"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-4"
                      style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600, fontSize: "0.85rem", whiteSpace: "nowrap" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {records.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-12" style={{ fontFamily: "DM Sans, sans-serif", color: "#A0ADB8" }}>
                      No hay registros aún. Agrega el primero.
                    </td>
                  </tr>
                )}
                {records.map((rec, i) => (
                  <tr
                    key={rec.id}
                    style={{ borderTop: "1px solid #E2EBF0", background: i % 2 === 0 ? "#fff" : "#FAFCFD" }}
                  >
                    <td className="px-5 py-4" style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.85rem", color: "#1A2B3C", whiteSpace: "nowrap" }}>
                       {formatDate(rec.date)}
                    </td>
                    <td className="px-5 py-4" style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.85rem", color: "#1A2B3C", whiteSpace: "nowrap" }}>
                      🩺 {rec.doctor}
                    </td>
                    <td className="px-5 py-4">
                      <span className="badge" style={{ background: "#E8F9FB", color: "#0D94A6", fontSize: "0.75rem" }}>
                        {rec.treatment}
                      </span>
                    </td>
                    <td className="px-5 py-4" style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.82rem", color: "#4A5C6D", maxWidth: 280 }}>
                      <span title={rec.observations}>
                        {rec.observations.length > 80 ? rec.observations.slice(0, 80) + "…" : rec.observations}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(rec)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                          style={{ background: "#E8F9FB", color: "#0D94A6", border: "none", cursor: "pointer", fontFamily: "DM Sans, sans-serif" }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "#B2EDF5")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "#E8F9FB")}
                        >
                           Editar
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(rec.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                          style={{ background: "#FEE2E2", color: "#DC2626", border: "none", cursor: "pointer", fontFamily: "DM Sans, sans-serif" }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "#FECACA")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "#FEE2E2")}
                        >
                           Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { label: "Total de visitas", value: records.length, icon: "" },
            { label: "Último tratamiento", value: records[0]?.treatment || "—", icon: "" },
            { label: "Última visita", value: formatDate(records[0]?.date || ""), icon: "" },
          ].map((s) => (
            <div key={s.label} className="card p-4 text-center">
              <div className="text-xl mb-1">{s.icon}</div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#11B5C9" }}>{s.value}</div>
              <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.75rem", color: "#6B7B8D" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowForm(false)}>
          <div className="modal-box w-full" style={{ maxWidth: 520 }}>
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "#E2EBF0" }}>
              <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.2rem", color: "#1A2B3C" }}>
                {editId ? "Editar registro" : "Nuevo registro clínico"}
              </h2>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 flex items-center justify-center rounded-full" style={{ background: "#F5F8FA", border: "none", cursor: "pointer", color: "#6B7B8D" }}>✕</button>
            </div>

            <div className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ fontFamily: "Outfit, sans-serif", color: "#1A2B3C" }}>Fecha *</label>
                <input type="date" className={`input-field ${errors.date ? "error" : ""}`} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                {errors.date && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.date}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1" style={{ fontFamily: "Outfit, sans-serif", color: "#1A2B3C" }}>Doctor *</label>
                <select className={`input-field ${errors.doctor ? "error" : ""}`} value={form.doctor} onChange={(e) => setForm({ ...form, doctor: e.target.value })}>
                  <option value="">Seleccionar doctor</option>
                  {DOCTORS.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
                </select>
                {errors.doctor && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.doctor}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1" style={{ fontFamily: "Outfit, sans-serif", color: "#1A2B3C" }}>Tratamiento *</label>
                <select className={`input-field ${errors.treatment ? "error" : ""}`} value={form.treatment} onChange={(e) => setForm({ ...form, treatment: e.target.value })}>
                  <option value="">Seleccionar tratamiento</option>
                  {TREATMENTS.map((t) => <option key={t.id} value={t.name}>{t.name}</option>)}
                </select>
                {errors.treatment && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.treatment}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1" style={{ fontFamily: "Outfit, sans-serif", color: "#1A2B3C" }}>Observaciones *</label>
                <textarea
                  className={`input-field ${errors.observations ? "error" : ""}`}
                  rows={4}
                  placeholder="Descripción del tratamiento, indicaciones, notas..."
                  value={form.observations}
                  onChange={(e) => setForm({ ...form, observations: e.target.value })}
                  style={{ resize: "none" }}
                />
                {errors.observations && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.observations}</p>}
              </div>

              <div className="flex gap-3 mt-1">
                <button className="btn-primary flex-1 justify-center" onClick={handleSave}>
                  💾 Guardar
                </button>
                <button className="btn-outline flex-1 justify-center" onClick={() => setShowForm(false)}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm !== null && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal-box w-full p-8 text-center" style={{ maxWidth: 380 }} onClick={(e) => e.stopPropagation()}>
            <div className="text-4xl mb-4">⚠️</div>
            <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#1A2B3C", marginBottom: 8 }}>
              ¿Eliminar este registro?
            </h3>
            <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.875rem", color: "#6B7B8D", marginBottom: 24 }}>
              Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3 justify-center">
              <button className="btn-primary" style={{ background: "#DC2626" }} onClick={() => handleDelete(deleteConfirm)}>
                Eliminar
              </button>
              <button className="btn-outline" onClick={() => setDeleteConfirm(null)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
