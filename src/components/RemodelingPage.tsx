import React, { useState } from 'react';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { REMODELING_PROJECTS } from '../data/remodelingData';

interface RemodelingPageProps {
  onBackToHome: () => void;
}

export const RemodelingPage: React.FC<RemodelingPageProps> = ({ onBackToHome }) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(REMODELING_PROJECTS[0].id);

  const activeProject = REMODELING_PROJECTS.find(p => p.id === selectedProjectId) || REMODELING_PROJECTS[0];

  return (
    <main className="min-h-screen bg-[#080e1b] text-slate-100 pt-24 pb-20 selection:bg-[#dfb86c]/30 selection:text-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-10">
        
        {/* 1. Minimal Header & Back Navigation */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-[#dfb86c] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a Propiedades</span>
          </button>

          <span className="text-[11px] font-mono text-[#dfb86c] uppercase tracking-widest">
            BANÁ ARQUITECTURA
          </span>
        </div>

        {/* 2. Hero Title (Clean & Minimalist) */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            Remodelaciones
          </h1>
          <p className="text-sm sm:text-base text-slate-400 font-light">
            Baja o desliza la cortina central para comparar el antes y el después.
          </p>
        </div>

        {/* 3. Minimal Project Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {REMODELING_PROJECTS.map((p) => {
            const isSelected = p.id === selectedProjectId;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedProjectId(p.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-[#dfb86c] text-slate-950 font-bold shadow-lg shadow-[#dfb86c]/25 scale-105'
                    : 'bg-[#0f1b35] text-slate-300 hover:bg-[#15264a] border border-white/10'
                }`}
              >
                {p.comuna} — {p.categoryLabel}
              </button>
            );
          })}
        </div>

        {/* 4. The Grand Interactive Before & After Canvas (Full Focus & Space) */}
        <section className="w-full flex justify-center pt-2">
          <BeforeAfterSlider project={activeProject} />
        </section>

        {/* 5. Minimal Guarantees Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-10 border-t border-white/10 text-center">
          <div className="space-y-1">
            <span className="text-sm font-bold text-white block">Llave en Mano</span>
            <p className="text-xs text-slate-400">Diseño 3D, compras y ejecución sin sobrecostos.</p>
          </div>
          <div className="space-y-1">
            <span className="text-sm font-bold text-white block">+32% Plusvalía</span>
            <p className="text-xs text-slate-400">Aumentamos el valor comercial de tu patrimonio.</p>
          </div>
          <div className="space-y-1">
            <span className="text-sm font-bold text-white block">2 Años de Garantía</span>
            <p className="text-xs text-slate-400">Garantía escrita de Baná Propiedades.</p>
          </div>
        </div>

        {/* 6. Direct WhatsApp CTA */}
        <div className="text-center pt-2">
          <a
            href="https://wa.me/56923807285?text=Hola%20BANÁ%20Propiedades,%20deseo%20coordinar%20una%20visita%20técnica%20de%20remodelación."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-rounded btn-primary-propper py-4 px-8 text-xs sm:text-sm font-bold shadow-xl shadow-[#dfb86c]/20"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Agendar Visita Técnica Gratuita</span>
          </a>
        </div>

      </div>
    </main>
  );
};
