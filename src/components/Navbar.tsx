import { useState, useEffect } from "react";
import { FaPhone, FaCalendarCheck, FaBars, FaXmark } from "react-icons/fa6";

interface Props {
  onBook: () => void;
}

export default function Navbar({ onBook }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3"
          : "bg-white/80 backdrop-blur-sm py-4 border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        
        {/* LOGO CON IMAGEN Y TEXTO */}
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => scrollToSection("inicio")}
        >
          <img 
            src="img/smile.png" 
            alt="SmileCare Logo" 
            className="h-10 w-auto object-contain" 
          />
          <div>
            <span className="font-extrabold text-slate-800 text-lg leading-none block" style={{ fontFamily: "Outfit, sans-serif" }}>
              SmileCare
            </span>
            <span className="text-[10px] tracking-wider text-cyan-600 font-bold uppercase" style={{ fontFamily: "DM Sans, sans-serif" }}>
              Clínica Dental
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60 shadow-inner">
          {[
            { label: "Inicio", id: "inicio" },
            { label: "Doctores", id: "doctores" },
            { label: "Tratamientos", id: "tratamientos" },
            { label: "Promociones", id: "promociones" },
            { label: "Contacto", id: "contacto" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="px-4 py-2 rounded-full text-xs font-bold text-slate-600 hover:text-cyan-600 hover:bg-white transition-all cursor-pointer"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Phone & CTA */}
        <div className="hidden lg:flex items-center gap-6">
          <a
            href="tel:7292980141"
            className="flex items-center gap-2 text-slate-600 hover:text-cyan-600 font-semibold text-sm transition-colors"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            <FaPhone className="text-cyan-500 text-xs" />
            <span>(729) 298-0141</span>
          </a>

          <button
            onClick={onBook}
            className="py-2.5 px-5 rounded-xl font-bold text-white bg-cyan-600 hover:bg-cyan-500 shadow-md shadow-cyan-500/20 active:scale-[0.99] transition-all flex items-center gap-2 text-sm cursor-pointer"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            <FaCalendarCheck />
            <span>Agenda tu cita</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FaXmark className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl p-6 flex flex-col gap-4 md:hidden animate-fadeIn">
          {[
            { label: "Inicio", id: "inicio" },
            { label: "Doctores", id: "doctores" },
            { label: "Tratamientos", id: "tratamientos" },
            { label: "Promociones", id: "promociones" },
            { label: "Contacto", id: "contacto" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-left py-2.5 px-4 rounded-xl font-bold text-slate-700 hover:bg-cyan-50 hover:text-cyan-600 transition-colors"
            >
              {item.label}
            </button>
          ))}

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <a
              href="tel:7292980141"
              className="flex items-center justify-center gap-2 text-slate-700 font-semibold py-2"
            >
              <FaPhone className="text-cyan-500" />
              <span>(729) 2980141</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBook();
              }}
              className="w-full py-3 rounded-xl font-bold text-white bg-cyan-600 hover:bg-cyan-500 shadow-md flex items-center justify-center gap-2"
            >
              <FaCalendarCheck />
              <span>Agenda tu cita</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}