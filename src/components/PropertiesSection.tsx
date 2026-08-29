import React, { useState, useMemo } from 'react';
import { Property, PROPERTIES, COMUNAS } from '../data/properties';
import { PropertyCard } from './PropertyCard';
import { ArrowRight, SlidersHorizontal, MapPin } from 'lucide-react';

interface PropertiesSectionProps {
  onSelectProperty: (property: Property) => void;
}

export const PropertiesSection: React.FC<PropertiesSectionProps> = ({ onSelectProperty }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [selectedOperation, setSelectedOperation] = useState<string>('ALL');
  const [selectedComuna, setSelectedComuna] = useState<string>('Todas las comunas');

  const filtered = useMemo(() => {
    return PROPERTIES.filter((item) => {
      if (selectedRegion !== 'ALL' && item.region !== selectedRegion) return false;
      if (selectedOperation !== 'ALL' && item.operation !== selectedOperation) return false;
      if (selectedComuna !== 'Todas las comunas' && item.comuna !== selectedComuna) return false;
      return true;
    });
  }, [selectedRegion, selectedOperation, selectedComuna]);

  return (
    <section id="propiedades" className="py-16 sm:py-24 bg-[#080e1b] border-t border-white/10">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div>
            <span className="framed text-[#dfb86c] border-[#dfb86c]/40 mb-2 sm:mb-3 inline-block text-xs">
              Catálogo Exclusivo
            </span>
            <h2 className="text-2xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">
              Propiedades Disponibles.
            </h2>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md">
            Selección exclusiva de residencias, casas de playa y penthouses de autor en Santiago Oriente y la Costa de la V Región.
          </p>
        </div>

        {/* Mobile App Filter Bar (Horizontal Snap Chips) */}
        <div className="p-3 sm:p-4 rounded-2xl bg-[#0b1428] border border-white/10 mb-8 space-y-3">
          {/* Horizontally scrollable category pills for mobile */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'ALL', label: 'Todas las Regiones' },
              { id: 'RM', label: 'Región Metropolitana' },
              { id: 'V_REGION', label: 'Quinta Región Costa' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedRegion(tab.id)}
                className={`btn-rounded text-[11px] sm:text-xs py-2 px-3.5 sm:px-4 whitespace-nowrap shrink-0 transition-all ${
                  selectedRegion === tab.id
                    ? 'btn-primary-propper'
                    : 'btn-framed-propper text-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Operation & Comuna Dropdowns */}
          <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-end gap-2 pt-1 border-t border-white/5">
            <select
              value={selectedOperation}
              onChange={(e) => setSelectedOperation(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-[11px] sm:text-xs text-white uppercase font-bold focus:outline-none focus:border-[#dfb86c]"
            >
              <option value="ALL">Todo (Venta & Arriendo)</option>
              <option value="Venta">Solo Venta</option>
              <option value="Arriendo">Solo Arriendo</option>
            </select>

            <select
              value={selectedComuna}
              onChange={(e) => setSelectedComuna(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-[11px] sm:text-xs text-white uppercase font-bold focus:outline-none focus:border-[#dfb86c]"
            >
              {COMUNAS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid of Properties */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSelect={onSelectProperty}
            />
          ))}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0b1428] via-[#111f3d] to-[#0b1428] border border-[#dfb86c]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <h3 className="text-lg sm:text-2xl font-bold text-white uppercase">
              ¿Buscas una propiedad off-market o a medida?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Contamos con una cartera privada de inmuebles que no se publican en portales abiertos.
            </p>
          </div>
          <a
            href="https://wa.me/56923807285?text=Hola%20BANÁ%20Propiedades,%20busco%20asesoría%20para%20comprar%20una%20propiedad."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto btn-rounded btn-primary-propper justify-center text-xs py-3 px-6 shrink-0"
          >
            <span>Consultar con un Broker</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
