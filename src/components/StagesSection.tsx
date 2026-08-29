import React from 'react';
import { Check, Clock, Key } from 'lucide-react';

export const StagesSection: React.FC = () => {
  const stages = [
    {
      num: '1. Etapa',
      title: 'Planificación & Tasación',
      status: 'Completado',
      icon: Check,
      color: 'text-emerald-400 border-emerald-400/40 bg-emerald-950/40',
      badgeClass: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30',
    },
    {
      num: '2. Etapa',
      title: 'Curaduría Audiovisual',
      status: 'Completado',
      icon: Check,
      color: 'text-emerald-400 border-emerald-400/40 bg-emerald-950/40',
      badgeClass: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30',
    },
    {
      num: '3. Etapa',
      title: 'Comercialización & Visitas',
      status: 'En Progreso',
      icon: Clock,
      color: 'text-[#dfb86c] border-[#dfb86c]/40 bg-[#dfb86c]/10',
      badgeClass: 'bg-[#0f1d38] text-[#dfb86c] border-[#dfb86c]/40',
    },
    {
      num: '4. Etapa',
      title: 'Cierre Notarial & Llaves',
      status: 'Próxima Entrega',
      icon: Key,
      color: 'text-slate-400 border-slate-500/30 bg-slate-900/40',
      badgeClass: 'bg-slate-900 text-slate-400 border-slate-700',
    },
  ];

  return (
    <section id="etapas" className="py-20 bg-[#060c18] border-t border-white/10">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="framed text-[#dfb86c] border-[#dfb86c]/40 mb-3 inline-block">
            Proceso & Tiempos
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">
            Etapas del Proyecto.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Acompañamos cada fase de la compraventa con transparencia y reportes en tiempo real.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <div
                key={idx}
                className="framed-box p-6 rounded-xl flex flex-col justify-between transition-all duration-300 hover:border-[#dfb86c]/50"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-5 ${stage.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono uppercase text-slate-400 block mb-1">
                    {stage.num}
                  </span>
                  <h3 className="text-lg font-bold text-white uppercase leading-snug mb-3">
                    {stage.title}
                  </h3>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <span className={`inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${stage.badgeClass}`}>
                    {stage.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
