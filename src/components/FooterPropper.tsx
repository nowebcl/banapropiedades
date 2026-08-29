import React from 'react';
import { ArrowUp, Phone, Mail, Sparkles } from 'lucide-react';

interface FooterPropperProps {
  onOpenRemodeling?: () => void;
}

export const FooterPropper: React.FC<FooterPropperProps> = ({ onOpenRemodeling }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="page-footer" className="py-16 pb-28 lg:pb-16 bg-[#050913] text-slate-400 border-t border-white/10 relative">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
          {/* Large Brand Logo */}
          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="BANÁ PROPIEDADES"
              className="h-14 sm:h-18 md:h-20 w-auto object-contain drop-shadow-md"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          {/* Contact Data & Quick Links on Right */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-semibold text-slate-300">
            {onOpenRemodeling && (
              <button
                onClick={onOpenRemodeling}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#dfb86c]/15 text-[#dfb86c] border border-[#dfb86c]/30 hover:bg-[#dfb86c]/25 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Servicio de Remodelaciones (Antes y Después)</span>
              </button>
            )}

            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#dfb86c]" />
              <span>+56 9 2380 7285</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#dfb86c]" />
              <span>contacto@banapropiedades.cl</span>
            </div>
          </div>
        </div>

        {/* Short Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10 border-b border-white/10 text-xs sm:text-sm text-slate-400 leading-relaxed">
          <p>
            Corredora boutique de alta gama especializada en propiedades residenciales y comerciales exclusivas en la Región Metropolitana (Vitacura, Las Condes, Lo Barnechea, Providencia) y la Costa de la Quinta Región (Zapallar, Cachagua, Maitencillo, Concón y Viña del Mar), junto con arquitectura y remodelaciones integrales de alta rentabilidad.
          </p>
          <p className="md:text-right text-xs font-mono text-slate-500">
            Av. El Golf 40, Las Condes, Santiago • Av. Libertad 1405, Viña del Mar
          </p>
        </div>

        {/* Copyright & To Top Button */}
        <div className="pt-8 flex items-center justify-between">
          <div className="text-xs font-mono text-slate-500">
            (C) {new Date().getFullYear()} BANÁ PROPIEDADES SpA. Todos los derechos reservados.
          </div>

          {/* To Top Button */}
          <button
            onClick={scrollToTop}
            aria-label="Volver arriba"
            className="w-11 h-11 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-[#c5a059] hover:text-black hover:border-[#dfb86c] transition-all active:scale-95"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
