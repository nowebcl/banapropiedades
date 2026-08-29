import React from 'react';

export const LogosSection: React.FC = () => {
  const partners = [
    'Portal Inmobiliario',
    'Banco de Chile Private',
    'Conservador Bienes Raíces',
    'Santander Select',
    'TocToc Inmobiliario',
    'ASATCH Tasadores',
    'Colegio de Arquitectos',
  ];

  return (
    <div className="py-16 bg-[#080e1b] border-t border-white/10 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6 text-center">
        <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 block mb-8">
          // ALIANZAS ESTRATÉGICAS & RED INSTITUCIONAL
        </span>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-60">
          {partners.map((partner, idx) => (
            <div
              key={idx}
              className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 hover:text-cyan-400 transition-colors border border-white/10 px-4 py-2 rounded-lg bg-slate-900/40"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
