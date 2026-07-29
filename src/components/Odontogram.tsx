import { useState, ReactNode } from "react";
import {
  FaTooth,
  FaCircleCheck,
  FaWrench,
  FaViruses,
  FaXmark,
  FaCrown,
  FaTriangleExclamation,
  FaFloppyDisk,
  FaClipboardList,
  FaPenToSquare,
  FaRotateLeft
} from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

type ToothStatus = "sano" | "tratamiento" | "caries" | "extraccion" | "protesis" | "urgente";

interface ToothState {
  status: ToothStatus;
  note: string;
}

interface StatusConfig {
  label: string;
  fill: string;
  stroke: string;
  badgeBg: string;
  icon: ReactNode;
}

const STATUS_CONFIG: Record<ToothStatus, StatusConfig> = {
  sano: { label: "Sano", fill: "#E2F7ED", stroke: "#10B981", badgeBg: "#DCFCE7", icon: <FaCircleCheck className="text-emerald-600" /> },
  tratamiento: { label: "Tratamiento", fill: "#FEF3C7", stroke: "#F59E0B", badgeBg: "#FEF3C7", icon: <FaWrench className="text-amber-600" /> },
  caries: { label: "Caries", fill: "#FEE2E2", stroke: "#EF4444", badgeBg: "#FEE2E2", icon: <FaViruses className="text-red-600" /> },
  extraccion: { label: "Extracción", fill: "#EDE9FE", stroke: "#8B5CF6", badgeBg: "#EDE9FE", icon: <FaXmark className="text-purple-600" /> },
  protesis: { label: "Prótesis", fill: "#DBEAFE", stroke: "#3B82F6", badgeBg: "#DBEAFE", icon: <FaCrown className="text-blue-600" /> },
  urgente: { label: "Urgente", fill: "#FEE2E2", stroke: "#B91C1C", badgeBg: "#FEE2E2", icon: <FaTriangleExclamation className="text-red-700 animate-pulse" /> },
};

// Coordenadas anatómicas en arco SVG para los 32 dientes (FDI)
const TEETH_NODES: { id: number; cx: number; cy: number; type: "molar" | "premolar" | "incisivo" }[] = [
  // CUADRANTE 1 (Superior Derecho: 18 al 11)
  { id: 18, cx: 105, cy: 300, type: "molar" },
  { id: 17, cx: 115, cy: 250, type: "molar" },
  { id: 16, cx: 130, cy: 200, type: "molar" },
  { id: 15, cx: 152, cy: 155, type: "premolar" },
  { id: 14, cx: 180, cy: 118, type: "premolar" },
  { id: 13, cx: 215, cy: 88, type: "incisivo" },
  { id: 12, cx: 255, cy: 68, type: "incisivo" },
  { id: 11, cx: 298, cy: 58, type: "incisivo" },

  // CUADRANTE 2 (Superior Izquierdo: 21 al 28)
  { id: 21, cx: 352, cy: 58, type: "incisivo" },
  { id: 22, cx: 395, cy: 68, type: "incisivo" },
  { id: 23, cx: 435, cy: 88, type: "incisivo" },
  { id: 24, cx: 470, cy: 118, type: "premolar" },
  { id: 25, cx: 498, cy: 155, type: "premolar" },
  { id: 26, cx: 520, cy: 200, type: "molar" },
  { id: 27, cx: 535, cy: 250, type: "molar" },
  { id: 28, cx: 545, cy: 300, type: "molar" },

  // CUADRANTE 4 (Inferior Derecho: 48 al 41)
  { id: 48, cx: 105, cy: 450, type: "molar" },
  { id: 47, cx: 115, cy: 500, type: "molar" },
  { id: 46, cx: 130, cy: 550, type: "molar" },
  { id: 45, cx: 152, cy: 595, type: "premolar" },
  { id: 44, cx: 180, cy: 632, type: "premolar" },
  { id: 43, cx: 215, cy: 662, type: "incisivo" },
  { id: 42, cx: 255, cy: 682, type: "incisivo" },
  { id: 41, cx: 298, cy: 692, type: "incisivo" },

  // CUADRANTE 3 (Inferior Izquierdo: 31 al 38)
  { id: 31, cx: 352, cy: 692, type: "incisivo" },
  { id: 32, cx: 395, cy: 682, type: "incisivo" },
  { id: 33, cx: 435, cy: 662, type: "incisivo" },
  { id: 34, cx: 470, cy: 632, type: "premolar" },
  { id: 35, cx: 498, cy: 595, type: "premolar" },
  { id: 36, cx: 520, cy: 550, type: "molar" },
  { id: 37, cx: 535, cy: 500, type: "molar" },
  { id: 38, cx: 545, cy: 450, type: "molar" },
];

export default function OdontogramInteractive() {
  const [teeth, setTeeth] = useState<Record<number, ToothState>>({});
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null);
  const [noteInput, setNoteInput] = useState("");
  const [globalNote, setGlobalNote] = useState("");
  const [saved, setSaved] = useState(false);

  const getTooth = (id: number): ToothState => teeth[id] || { status: "sano", note: "" };

  const handleSelectTooth = (id: number) => {
    setSelectedTooth(id);
    setNoteInput(getTooth(id).note);
  };

  const updateStatus = (status: ToothStatus) => {
    if (!selectedTooth) return;
    setTeeth((prev) => ({
      ...prev,
      [selectedTooth]: { ...getTooth(selectedTooth), status },
    }));
  };

  const saveToothNote = () => {
    if (!selectedTooth) return;
    setTeeth((prev) => ({
      ...prev,
      [selectedTooth]: { ...getTooth(selectedTooth), note: noteInput },
    }));
    setSelectedTooth(null);
  };

  const handleSaveAll = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const resetOdontogram = () => {
    if (confirm("¿Deseas reiniciar todos los registros del odontograma?")) {
      setTeeth({});
      setSelectedTooth(null);
      setGlobalNote("");
    }
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-3 bg-white border border-slate-200 text-slate-700 text-xs font-semibold tracking-wide uppercase shadow-sm">
            <FaTooth className="text-sky-600" />
            <span>Sistema Clínico </span>
          </div>

          <h2 className="font-extrabold text-slate-900 tracking-tight mb-2 text-2xl md:text-4xl" style={{ fontFamily: "Outfit, sans-serif" }}>
            Odontograma Digital
          </h2>

          <p className="text-slate-600 text-sm md:text-base max-w-lg mx-auto" style={{ fontFamily: "DM Sans, sans-serif" }}>
            Haz clic en cualquier pieza dental para cambiar su diagnóstico, inspeccionar detalles o ingresar notas clínicas.
          </p>
        </div>

        {/* Legend bar */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {(Object.entries(STATUS_CONFIG) as [ToothStatus, StatusConfig][]).map(([key, cfg]) => (
            <span
              key={key}
              className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 bg-white border border-slate-200 shadow-sm"
              style={{ color: cfg.stroke, fontFamily: "DM Sans, sans-serif" }}
            >
              {cfg.icon}
              <span>{cfg.label}</span>
            </span>
          ))}
        </div>

        {/* Main Canvas & SVG Container */}
        <div className="bg-white rounded-3xl p-4 md:p-8 border border-slate-200 shadow-xl relative overflow-hidden">
          
          {/* Action buttons on top of chart */}
          <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest" style={{ fontFamily: "Outfit, sans-serif" }}>
              Vista Anatómica Superior e Inferior
            </span>
            <button
              onClick={resetOdontogram}
              className="text-xs text-slate-500 hover:text-red-600 flex items-center gap-1.5 transition-colors font-medium cursor-pointer"
            >
              <FaRotateLeft />
              <span>Limpiar todo</span>
            </button>
          </div>

          <div className="w-full flex justify-center items-center overflow-x-auto py-2">
            <svg
              viewBox="0 0 650 750"
              className="w-full max-w-[580px] h-auto select-none"
              style={{ filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.03))" }}
            >
              <defs>
                {/* Paladar soft gradient */}
                <radialGradient id="palateGrad" cx="50%" cy="30%" r="60%">
                  <stop offset="0%" stopColor="#FECDD3" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#FDA4AF" stopOpacity="0.25" />
                </radialGradient>

                {/* Lengua soft gradient */}
                <linearGradient id="tongueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#E2E8F0" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.5" />
                </linearGradient>
              </defs>

              {/* ===== FONDO ANATÓMICO ===== */}
              {/* Paladar */}
              <path
                d="M 110,300 C 110,100 200,45 325,45 C 450,45 540,100 540,300 C 420,330 230,330 110,300 Z"
                fill="url(#palateGrad)"
                stroke="#FDA4AF"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <text x="325" y="210" textAnchor="middle" fill="#E11D48" opacity="0.35" fontWeight="bold" fontSize="22" letterSpacing="6" fontFamily="Outfit, sans-serif">
                PALADAR
              </text>

              {/* Lengua */}
              <path
                d="M 140,460 C 180,680 250,700 325,700 C 400,700 470,680 510,460 C 410,430 240,430 140,460 Z"
                fill="url(#tongueGrad)"
                stroke="#94A3B8"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <text x="325" y="560" textAnchor="middle" fill="#64748B" opacity="0.35" fontWeight="bold" fontSize="22" letterSpacing="6" fontFamily="Outfit, sans-serif">
                LENGUA
              </text>

              {/* ===== LÍNEAS DIVISIONES Y ETANQUETAS DE CUADRANTES ===== */}
              {/* Línea Vertical (Línea Media) */}
              <line x1="325" y1="20" x2="325" y2="730" stroke="#0284C7" strokeWidth="2" strokeDasharray="6 4" opacity="0.7" />
              
              {/* Línea Horizontal (Separación de Arcadas) */}
              <line x1="30" y1="375" x2="620" y2="375" stroke="#0284C7" strokeWidth="2" strokeDasharray="6 4" opacity="0.7" />

              {/* Indicadores Cuadrantes */}
              <text x="45" y="360" fill="#94A3B8" fontSize="11" fontWeight="bold" fontFamily="DM Sans, sans-serif">IZQUIERDA (DERECHA PACIENTE)</text>
              <text x="470" y="360" fill="#94A3B8" fontSize="11" fontWeight="bold" fontFamily="DM Sans, sans-serif">DERECHA (IZQ PACIENTE)</text>

              <text x="325" y="35" textAnchor="middle" fill="#0369A1" fontSize="12" fontWeight="bold" fontFamily="Outfit, sans-serif">1° CUADRANTE | 2° CUADRANTE</text>
              <text x="325" y="740" textAnchor="middle" fill="#0369A1" fontSize="12" fontWeight="bold" fontFamily="Outfit, sans-serif">4° CUADRANTE | 3° CUADRANTE</text>

              {/* ===== PIEZAS DENTALES VECTORIALES ===== */}
              {TEETH_NODES.map((node) => {
                const toothData = getTooth(node.id);
                const config = STATUS_CONFIG[toothData.status];
                const isSelected = selectedTooth === node.id;
                const radius = node.type === "molar" ? 19 : node.type === "premolar" ? 16 : 14;

                return (
                  <g
                    key={node.id}
                    onClick={() => handleSelectTooth(node.id)}
                    className="cursor-pointer group transition-all duration-200"
                  >
                    {/* Anillo de selección activa */}
                    {isSelected && (
                      <circle
                        cx={node.cx}
                        cy={node.cy}
                        r={radius + 7}
                        fill="none"
                        stroke="#0284C7"
                        strokeWidth="3"
                        className="animate-pulse"
                      />
                    )}

                    {/* Forma de la pieza dental */}
                    {node.type === "molar" ? (
                      <rect
                        x={node.cx - radius}
                        y={node.cy - radius}
                        width={radius * 2}
                        height={radius * 2}
                        rx={6}
                        fill={config.fill}
                        stroke={config.stroke}
                        strokeWidth={isSelected ? "2.5" : "1.8"}
                        className="group-hover:stroke-sky-500 transition-colors"
                      />
                    ) : (
                      <circle
                        cx={node.cx}
                        cy={node.cy}
                        r={radius}
                        fill={config.fill}
                        stroke={config.stroke}
                        strokeWidth={isSelected ? "2.5" : "1.8"}
                        className="group-hover:stroke-sky-500 transition-colors"
                      />
                    )}

                    {/* Indicador interno de corona o tratamiento */}
                    <circle
                      cx={node.cx}
                      cy={node.cy}
                      r={radius * 0.45}
                      fill="none"
                      stroke={config.stroke}
                      strokeWidth="1"
                      opacity="0.6"
                    />

                    {/* Número del diente */}
                    <text
                      x={node.cx}
                      y={node.cy + 3.5}
                      textAnchor="middle"
                      fill="#1E293B"
                      fontSize={node.type === "molar" ? "11" : "10"}
                      fontWeight="bold"
                      fontFamily="Outfit, sans-serif"
                      className="pointer-events-none"
                    >
                      {node.id}
                    </text>

                    {/* Dot de nota si existe */}
                    {toothData.note && (
                      <circle
                        cx={node.cx + radius - 2}
                        cy={node.cy - radius + 2}
                        r="4"
                        fill="#0284C7"
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* ===== MODAL DE EDICIÓN DEL DIENTE SELECCIONADO ===== */}
          {selectedTooth && (
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-20 animate-fadeIn">
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 max-w-sm w-full flex flex-col gap-4">
                
                {/* Header Modal */}
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-sm" style={{ fontFamily: "Outfit, sans-serif" }}>
                      {selectedTooth}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm" style={{ fontFamily: "Outfit, sans-serif" }}>
                        Pieza Dental #{selectedTooth}
                      </h3>
                      <p className="text-[11px] text-slate-500">Selecciona el diagnóstico actual</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedTooth(null)}
                    className="text-slate-400 hover:text-slate-700 text-xl cursor-pointer"
                  >
                    <IoClose />
                  </button>
                </div>

                {/* Grid de estados */}
                <div className="grid grid-cols-2 gap-2">
                  {(Object.entries(STATUS_CONFIG) as [ToothStatus, StatusConfig][]).map(([key, cfg]) => {
                    const isCurrent = getTooth(selectedTooth).status === key;
                    return (
                      <button
                        key={key}
                        onClick={() => updateStatus(key)}
                        className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                          isCurrent
                            ? "border-sky-500 bg-sky-50 shadow-xs"
                            : "border-slate-200 hover:bg-slate-50"
                        }`}
                        style={{ fontFamily: "DM Sans, sans-serif" }}
                      >
                        <span className="text-sm">{cfg.icon}</span>
                        <span className="text-slate-800">{cfg.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Input de Nota */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700" style={{ fontFamily: "Outfit, sans-serif" }}>
                    Nota específica de la pieza
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Caries oclusal profunda, curación previa..."
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-sky-500 bg-slate-50"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  />
                </div>

                {/* Acciones */}
                <button
                  onClick={saveToothNote}
                  className="w-full py-2.5 rounded-xl font-bold text-white bg-sky-600 hover:bg-sky-500 transition-colors text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-sky-600/20"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  <FaPenToSquare />
                  <span>Confirmar Registro</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Resumen & Notas Generales */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          
          {/* Card Resumen */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <p className="font-bold text-sm text-slate-900 mb-4 flex items-center gap-2" style={{ fontFamily: "Outfit, sans-serif" }}>
                <FaClipboardList className="text-sky-600" />
                <span>Resumen Diagnóstico de Arcada</span>
              </p>

              <div className="flex flex-col gap-2">
                {(Object.entries(STATUS_CONFIG) as [ToothStatus, StatusConfig][]).map(([key, cfg]) => {
                  const count = Object.values(teeth).filter((t) => t.status === key).length;
                  if (!count && key === "sano") return null;
                  return (
                    <div key={key} className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-none">
                      <span className="text-xs font-semibold flex items-center gap-2" style={{ color: cfg.stroke, fontFamily: "DM Sans, sans-serif" }}>
                        {cfg.icon}
                        <span>{cfg.label}</span>
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold" style={{ background: cfg.badgeBg, color: cfg.stroke }}>
                        {count} {count === 1 ? "pieza" : "piezas"}
                      </span>
                    </div>
                  );
                })}

                {Object.keys(teeth).length === 0 && (
                  <p className="text-xs text-slate-400 py-3 italic" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    Todas las piezas se encuentran registradas en estado sano por defecto.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Card Notas Generales */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <p className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2" style={{ fontFamily: "Outfit, sans-serif" }}>
                <FaPenToSquare className="text-sky-600" />
                <span>Observaciones Clínicas Generales</span>
              </p>
              <textarea
                className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-500 transition-all resize-none"
                rows={4}
                placeholder="Escribe observaciones de la articulación temporomandibular, higiene general, encías..."
                value={globalNote}
                onChange={(e) => setGlobalNote(e.target.value)}
                style={{ fontFamily: "DM Sans, sans-serif" }}
              />
            </div>

            <div className="flex items-center gap-3 mt-4 justify-end">
              {saved && (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 animate-fadeIn" style={{ fontFamily: "DM Sans, sans-serif" }}>
                  <FaCircleCheck />
                  <span>Odontograma guardado</span>
                </span>
              )}
              <button
                className="py-2.5 px-5 rounded-xl font-bold text-white bg-sky-600 hover:bg-sky-500 shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2 text-xs cursor-pointer"
                onClick={handleSaveAll}
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                <FaFloppyDisk />
                <span>Guardar Expediente</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}