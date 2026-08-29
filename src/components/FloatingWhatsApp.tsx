import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href="https://wa.me/56923807285?text=Hola%20BANÁ%20Propiedades,%20deseo%20hacer%20una%20consulta%20inmobiliaria."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-r from-[#dfb86c] to-[#c5a059] hover:from-[#fae6be] hover:to-[#dfb86c] text-slate-950 font-bold shadow-2xl shadow-black/80 hover:scale-110 transition-all duration-300 flex items-center gap-2 group border border-[#dfb86c]/40"
    >
      <MessageCircle className="w-6 h-6 fill-slate-950 text-slate-950" />
      <span className="hidden sm:inline-block font-sans text-xs text-slate-950 font-bold uppercase tracking-wider pr-1">
        Asesor en Línea
      </span>
    </a>
  );
};
