import React from 'react';
import { Check } from 'lucide-react';
import { UF_VALUE } from '../data/properties';

interface PricingProps {
  onOpenApartmentModal: (typeIndex: number) => void;
}

export const PricingSection: React.FC<PricingProps> = ({ onOpenApartmentModal }) => {
  const formatCLP = (clp: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0,
    }).format(clp);
  };

  const types = [
    {
      title: 'Departamento 2 Dorms',
      oldPriceUF: 9400,
      priceUF: 8900,
      areaUseful: '83 m²',
      areaBalcony: '26 m²',
      parking: true,
      freeUnits: 4,
      promoted: false,
    },
    {
      title: 'Departamento 3 Dorms',
      oldPriceUF: 13900,
      priceUF: 12800,
      areaUseful: '135 m²',
      areaBalcony: '45 m²',
      parking: true,
      freeUnits: 7,
      promoted: true,
      promotionTag: 'Mejor Relación m² / Precio',
    },
    {
      title: 'Penthouse Dúplex 4 Dorms',
      oldPriceUF: 28900,
      priceUF: 26500,
      areaUseful: '285 m²',
      areaBalcony: '140 m²',
      parking: true,
      freeUnits: 2,
      promoted: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-[#080e1b] border-t border-white/10">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="framed text-[#dfb86c] border-[#dfb86c]/40 mb-3 inline-block">
            Tipologías & Valores
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">
            Tabla de Precios.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Valores preferenciales de preventa e inversión en los mejores ejes urbanos y costeros.
          </p>
        </div>

        {/* Propper 4-Column Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
          {/* Column 1: Labels Description */}
          <div className="hidden md:flex flex-col justify-between p-6 rounded-2xl bg-[#060c18] border border-white/5">
            <div>
              <h3 className="text-lg font-bold text-white uppercase mb-4">
                Selecciona tu tipología
              </h3>
              <div className="text-xs text-slate-500 line-through py-2">Precio Lista</div>
              <div className="text-sm font-bold text-[#dfb86c] py-2">Precio Oportunidad</div>
            </div>

            <div className="space-y-4 text-xs font-semibold uppercase tracking-wider text-slate-400 py-6 border-y border-white/5">
              <figure className="m-0">Superficie Útil</figure>
              <figure className="m-0">Terraza Panorámica</figure>
              <figure className="m-0">Estacionamiento Subt.</figure>
              <figure className="m-0">Unidades Disponibles</figure>
            </div>

            <div className="text-xs font-mono text-slate-500">
              * Valores calculados en UF
            </div>
          </div>

          {/* Columns 2, 3, 4: Property Types */}
          {types.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 relative ${
                item.promoted
                  ? 'bg-[#0f1d38] border-2 border-[#dfb86c] shadow-2xl shadow-black/80 scale-[1.02]'
                  : 'bg-[#0b1428] border border-white/10 hover:border-[#dfb86c]/30'
              }`}
            >
              {item.promoted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#dfb86c] to-[#c5a059] text-slate-950 text-[10px] font-extrabold uppercase tracking-wider py-1 px-4 rounded-full shadow-lg shadow-black/40">
                  {item.promotionTag}
                </div>
              )}

              <div>
                <h3 className="text-lg font-bold text-white uppercase mb-2">
                  {item.title}
                </h3>
                <div className="text-xs text-slate-500 line-through">
                  {item.oldPriceUF.toLocaleString('es-CL')} UF
                </div>
                <div className="text-2xl font-extrabold text-[#dfb86c] mb-1">
                  {item.priceUF.toLocaleString('es-CL')} UF
                </div>
                <span className="text-[11px] text-slate-400 block mb-6">
                  ≈ {formatCLP(item.priceUF * UF_VALUE)}
                </span>

                {/* Values list */}
                <div className="space-y-4 text-xs font-bold text-white py-6 border-y border-white/10 text-center">
                  <div>
                    <span className="md:hidden text-slate-400 block font-normal text-[10px] uppercase">Superficie útil</span>
                    <span>{item.areaUseful}</span>
                  </div>
                  <div>
                    <span className="md:hidden text-slate-400 block font-normal text-[10px] uppercase">Terraza</span>
                    <span>{item.areaBalcony}</span>
                  </div>
                  <div>
                    <span className="md:hidden text-slate-400 block font-normal text-[10px] uppercase">Estacionamiento</span>
                    <span className="text-emerald-400 flex items-center justify-center gap-1">
                      <Check className="w-4 h-4" /> Incluido
                    </span>
                  </div>
                  <div>
                    <span className="md:hidden text-slate-400 block font-normal text-[10px] uppercase">Disponibles</span>
                    <span className="text-[#dfb86c]">{item.freeUnits} unidades</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 space-y-2">
                <button
                  onClick={() => onOpenApartmentModal(idx)}
                  className="w-full btn-rounded btn-framed-propper justify-center text-xs py-2.5"
                >
                  <span>Ver Ficha & Planos</span>
                </button>

                <a
                  href={`https://wa.me/56984529100?text=Hola%20BANÁ%20Propiedades,%20deseo%20cotizar%20la%20tipología%20${encodeURIComponent(item.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-rounded btn-primary-propper justify-center text-xs py-2.5"
                >
                  <span>Cotizar Unidad</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
