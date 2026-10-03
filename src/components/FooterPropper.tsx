import React from 'react';
import { ArrowUp, Phone, Mail, Sparkles, MapPin, Building, Hammer, Scale, UserCheck } from 'lucide-react';
import { AppView } from './Navbar';

interface FooterPropperProps {
  onNavigate: (view: AppView) => void;
}

export const FooterPropper: React.FC<FooterPropperProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLink = (view: AppView) => {
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="page-footer" className="py-16 pb-28 lg:pb-16 bg-[#050913] text-slate-400 border-t border-white/10 relative no-print">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-12">
        {/* Top Header in Footer */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/10">
          {/* Large Brand Logo */}
          <button
            onClick={() => handleLink('home')}
            className="flex items-center text-left focus:outline-none cursor-pointer"
          >
            <img
              src="/logo.png"
              alt="BANÁ PROPIEDADES"
              className="h-14 sm:h-18 md:h-20 w-auto object-contain drop-shadow-md"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </button>

          {/* Quick Contact Info */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-semibold text-slate-300">
            <button
              onClick={() => handleLink('construccion')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#dfb86c]/15 text-[#dfb86c] border border-[#dfb86c]/30 hover:bg-[#dfb86c]/25 transition-colors cursor-pointer"
            >
              <Hammer className="w-3.5 h-3.5" />
              <span>Alianza LCE Construcciones</span>
            </button>

            <a href="tel:+56923807285" className="flex items-center gap-2 hover:text-[#dfb86c] transition-colors">
              <Phone className="w-4 h-4 text-[#dfb86c]" />
              <span>+56 9 2380 7285</span>
            </a>

            <a href="mailto:contacto@banapropiedades.cl" className="flex items-center gap-2 hover:text-[#dfb86c] transition-colors">
              <Mail className="w-4 h-4 text-[#dfb86c]" />
              <span>contacto@banapropiedades.cl</span>
            </a>
          </div>
        </div>

        {/* 4 Columns of Links & Description */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-xs leading-relaxed">
          {/* Col 1: About */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">
              BANÁ PROPIEDADES
            </h4>
            <p className="text-slate-400">
              Gestión inmobiliaria, asesoría legal en herencias, posesión efectiva y proyectos de edificación llave en mano en Santiago Oriente y la Costa de la Quinta Región.
            </p>
            <p className="text-[11px] font-mono text-[#dfb86c]">
              // banapropiedades.cl
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-3">
              Secciones
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleLink('home')} className="hover:text-[#dfb86c] transition-colors cursor-pointer">
                  • Inicio
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('propiedades')} className="hover:text-[#dfb86c] transition-colors cursor-pointer">
                  • Propiedades (Venta y Arriendo)
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('construccion')} className="hover:text-[#dfb86c] transition-colors cursor-pointer">
                  • Remodelaciones / Construcción
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('servicios')} className="hover:text-[#dfb86c] transition-colors cursor-pointer">
                  • Servicios Especializados
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Captation */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-3">
              Servicios & Captación
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleLink('publica')} className="hover:text-[#dfb86c] transition-colors cursor-pointer">
                  • Publica con Nosotros
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('nosotros')} className="hover:text-[#dfb86c] transition-colors cursor-pointer">
                  • Nosotros (Giovanna González)
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('contacto')} className="hover:text-[#dfb86c] transition-colors cursor-pointer">
                  • Contacto Directo
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('servicios')} className="hover:text-[#dfb86c] transition-colors cursor-pointer">
                  • Tasación & Posesión Efectiva
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Physical Offices & Coverage */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">
              Sedes de Operación
            </h4>
            <div className="space-y-2 text-slate-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#dfb86c] shrink-0 mt-0.5" />
                <span><strong>RM:</strong> Av. El Golf 40, Las Condes, Santiago</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#dfb86c] shrink-0 mt-0.5" />
                <span><strong>Costa:</strong> Av. Libertad 1405, Viña del Mar</span>
              </p>
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              Atención presencial previa cita y asesoría continua vía WhatsApp.
            </p>
          </div>
        </div>

        {/* Copyright & To Top Button */}
        <div className="pt-8 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} BANÁ PROPIEDADES SpA. Todos los derechos reservados.
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Volver arriba"
            className="w-10 h-10 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-[#c5a059] hover:text-black hover:border-[#dfb86c] transition-all cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
