import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href="https://wa.me/56923807285?text=Hola%20BANÁ%20Propiedades,%20deseo%20hacer%20una%20consulta%20inmobiliaria."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="floating-whatsapp no-print fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 p-3.5 sm:p-4 rounded-full bg-gradient-to-r from-[#dfb86c] to-[#c5a059] hover:from-[#fae6be] hover:to-[#dfb86c] text-slate-950 font-bold shadow-2xl shadow-black/80 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center gap-2 group border border-[#dfb86c]/60"
    >
      <div className="relative">
        <MessageCircle className="w-6 h-6 fill-slate-950 text-slate-950" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
      </div>
      <span className="hidden sm:inline-block font-sans text-xs text-slate-950 font-extrabold uppercase tracking-wider pr-1">
        Asesor en Línea
      </span>
    </a>
  );
};
