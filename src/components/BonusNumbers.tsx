import React from 'react';

export const BonusNumbers: React.FC = () => {
  const numbers = [
    { num: '+140', label: 'Propiedades Gestionadas' },
    { num: '18 Días', label: 'Promedio de Cierre' },
    { num: '99.2%', label: 'Asertividad en Tasación' },
    { num: '12 Años', label: 'Trayectoria Inmobiliaria' },
  ];

  return (
    <div className="py-16 bg-[#060c18] border-t border-white/10">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="mb-10">
          <span className="framed text-[#dfb86c] border-[#dfb86c]/40 mb-2 inline-block text-xs">
            Cifras & Resultados
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
            Nuestros Números.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {numbers.map((item, idx) => (
            <div key={idx} className="border-l-2 border-[#dfb86c] pl-5">
              <figure className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-1">
                {item.num}
              </figure>
              <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
