import React, { useState, useMemo } from 'react';
import { Calculator, MessageCircle, ArrowRight } from 'lucide-react';
import { UF_VALUE } from '../data/properties';

export const RemodelingCalculator: React.FC = () => {
  const [surfaceM2, setSurfaceM2] = useState<number>(100);
  const [scope, setScope] = useState<'integral' | 'luxury'>('integral');

  const rateUF = scope === 'integral' ? 8.5 : 13.5;
  const estimatedUF = Math.round(surfaceM2 * rateUF);
  const estimatedCLP = estimatedUF * UF_VALUE;

  const formatCLP = (val: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(val);
  };

  const whatsappMessage = encodeURIComponent(
    `Hola BANÁ Propiedades, utilicé el cotizador web para una remodelación ${
      scope === 'integral' ? 'Integral Premium' : 'Ultra Lujo Signature'
    } de ${surfaceM2} m² (aprox. ${estimatedUF} UF). Deseo agendar visita técnica.`
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl bg-[#0a1224] border border-white/10 shadow-2xl">
      <div className="text-center max-w-xl mx-auto mb-8 space-y-1.5">
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Calculadora de Remodelación
        </h3>
        <p className="text-xs text-slate-400">
          Estima el valor de tu proyecto en segundos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Inputs */}
        <div className="space-y-6">
          {/* Surface slider */}
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-slate-300 font-medium">Superficie a remodelar</span>
              <span className="font-mono text-base font-bold text-[#dfb86c]">
                {surfaceM2} m²
              </span>
            </div>
            <input
              type="range"
              min={30}
              max={300}
              step={5}
              value={surfaceM2}
              onChange={(e) => setSurfaceM2(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#dfb86c]"
            />
          </div>

          {/* Scope selection */}
          <div>
            <span className="text-xs text-slate-300 font-medium block mb-2">
              Nivel de Terminaciones
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setScope('integral')}
                className={`py-3 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  scope === 'integral'
                    ? 'bg-[#dfb86c] text-slate-950 border-[#dfb86c] font-bold shadow-md'
                    : 'bg-[#0f1b35] text-slate-300 border-white/10 hover:border-white/20'
                }`}
              >
                Integral Premium
              </button>

              <button
                type="button"
                onClick={() => setScope('luxury')}
                className={`py-3 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  scope === 'luxury'
                    ? 'bg-[#dfb86c] text-slate-950 border-[#dfb86c] font-bold shadow-md'
                    : 'bg-[#0f1b35] text-slate-300 border-white/10 hover:border-white/20'
                }`}
              >
                Ultra Lujo Baná
              </button>
            </div>
          </div>
        </div>

        {/* Right Result Card */}
        <div className="p-6 rounded-2xl bg-[#0f1b35] border border-[#dfb86c]/30 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
              Presupuesto Estimado
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
                {estimatedUF.toLocaleString('es-CL')}
              </span>
              <span className="text-base font-bold text-[#dfb86c]">UF</span>
            </div>
            <p className="text-xs font-mono text-slate-400 mt-1">
              ≈ {formatCLP(estimatedCLP)} CLP
            </p>
          </div>

          <a
            href={`https://wa.me/56923807285?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-rounded btn-primary-propper justify-center text-xs py-3.5 shadow-lg shadow-[#dfb86c]/20"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Consultar por WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
