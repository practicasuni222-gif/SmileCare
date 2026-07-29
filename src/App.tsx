import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Doctors from "./components/Doctors";
import Treatments from "./components/Treatments";
import Promotions from "./components/Promotions";
import Odontogram from "./components/Odontogram";
import ClinicalHistory from "./components/ClinicalHistory";
import Reviews from "./components/Reviews";
import Location from "./components/Location";
import DentalTips from "./components/DentalTips";
import Gallery from "./components/Gallery";
import Suggestions from "./components/Suggestions";
import Footer from "./components/Footer";
import AppointmentModal from "./components/AppointmentModal";

// Si tienes react-icons instalado, puedes importar el icono oficial así:
import { FaWhatsapp } from "react-icons/fa";

export default function App() {
  const [bookModal, setBookModal] = useState(false);
  const [preDoctor, setPreDoctor] = useState("");
  const [preTreatment, setPreTreatment] = useState("");

  const openBook = (doctor?: string, treatment?: string) => {
    setPreDoctor(doctor || "");
    setPreTreatment(treatment || "");
    setBookModal(true);
  };

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <Navbar onBook={() => openBook()} />

      <main>
        <Hero onBook={() => openBook()} />
        <Doctors onBook={(doc) => openBook(doc)} />
        <Treatments onBook={(t) => openBook("", t)} />
        <Promotions />
        <Odontogram />
        <ClinicalHistory />
        <Reviews />
        <Location />
        <DentalTips />
        <Gallery />
        <Suggestions />
      </main>

      <Footer onBook={() => openBook()} />

      {/* Floating WhatsApp button con Icono Oficial */}
      <a
        href={`https://wa.me/527292980141?text=${encodeURIComponent("Hola, quisiera obtener información sobre sus servicios dentales.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed flex items-center justify-center rounded-full text-white z-50 transition-all duration-300"
        style={{
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          background: "#25D366",
          boxShadow: "0 4px 20px rgba(37,211,102,0.45)",
        }}
        title="Chatea con nosotros en WhatsApp"
        onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(37,211,102,0.55)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,211,102,0.45)"; }}
      >
        {/* Opción A: Con react-icons */}
        <FaWhatsapp className="text-3xl text-white" />

        {/* Opción B: Si prefieres usar una imagen local, descomenta la siguiente línea y reemplaza el icono arriba */}
        {/* <img src="/whatsapp-logo.png" alt="WhatsApp" className="w-8 h-8 object-contain" /> */}
      </a>

      {bookModal && (
        <AppointmentModal
          onClose={() => setBookModal(false)}
          preDoctor={preDoctor}
          preTreatment={preTreatment}
        />
      )}
    </div>
  );
}