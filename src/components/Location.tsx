import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaDirections } from "react-icons/fa";

export default function Location() {
  // Coordenadas orientadas al centro de Toluca, Estado de México
  const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=19.2925,-99.6569&travelmode=driving";

  const contactInfo = [
    { 
      icon: FaMapMarkerAlt, 
      label: "Dirección", 
      value: "Av. Miguel Hidalgo Ote. 405, Col. Centro\nToluca de Lerdo, Méx., C.P. 50000" 
    },
    { 
      icon: FaPhone, 
      label: "Teléfono", 
      value: "(722) 458-00152\n(722) 400-7854" 
    },
    { 
      icon: FaEnvelope, 
      label: "Correo", 
      value: "contacto@smilecare.mx" 
    },
    { 
      icon: FaClock, 
      label: "Horario de atención", 
      value: "Lunes a Viernes: 9:00 AM – 8:00 PM\nSábados: 9:00 AM – 3:00 PM" 
    },
  ];

  return (
    <section id="contacto" className="py-20 px-4 md:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-4 bg-cyan-100/60 border border-cyan-200/80 text-cyan-800 text-xs font-bold tracking-wide uppercase">
            <FaMapMarkerAlt className="text-cyan-600" />
            <span>Ubicación</span>
          </div>
          
          <h2 
            className="font-extrabold text-slate-800 tracking-tight mb-3"
            style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}
          >
            ¿Dónde estamos?
          </h2>
          
          <p className="text-slate-600 text-base max-w-lg mx-auto leading-relaxed" style={{ fontFamily: "DM Sans, sans-serif" }}>
            Visítanos en nuestras instalaciones de última generación, ubicadas en el centro de Toluca.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-5 gap-8 items-stretch">
          
          {/* Information Cards */}
          <div className="md:col-span-2 flex flex-col gap-4 justify-between">
            <div className="flex flex-col gap-3.5">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <div key={info.label} className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-sm flex gap-4 items-start hover:border-cyan-200 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center text-lg flex-shrink-0 border border-cyan-100">
                      <Icon />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-slate-800 mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>
                        {info.label}
                      </p>
                      <p className="text-xs md:text-sm text-slate-600 leading-relaxed whitespace-pre-line" style={{ fontFamily: "DM Sans, sans-serif" }}>
                        {info.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-sky-600 hover:bg-sky-500 shadow-lg shadow-sky-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-base cursor-pointer mt-2"
              onClick={() => window.open(directionsUrl, "_blank")}
            >
              <FaDirections className="text-xl" />
              <span>Cómo llegar</span>
            </button>
          </div>

          {/* Interactive Map */}
          <div className="md:col-span-3 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/60 border border-slate-200 min-h-[380px] md:min-h-[440px]">
            <iframe
              title="SmileCare Clínica Dental - Toluca"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.811382903513!2d-99.65910262412853!3d19.29253494519965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cd89e13d33e5c9%3A0x6b6d5f7f32d8cf0!2sCentro%2C%2050000%20Toluca%20de%20Lerdo%2C%20M%C3%A9x.!5e0!3m2!1ses!2smx!4v1710000000000!5m2!1ses!2smx"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "100%" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>
      </div>
    </section>
  );
}