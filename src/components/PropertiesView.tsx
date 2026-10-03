import React, { useState, useMemo, useEffect } from 'react';
import { Property, PROPERTIES, COMUNAS, PROPERTY_TYPES, PROPERTY_CONDITIONS } from '../data/properties';
import { PropertyCard } from './PropertyCard';
import { Search, Filter, RotateCcw, Building2, MapPin, ArrowRight } from 'lucide-react';

interface PropertiesViewProps {
  onSelectProperty: (property: Property) => void;
  initialFilters?: {
    operation?: string;
    propertyType?: string;
    comuna?: string;
  };
}

export const PropertiesView: React.FC<PropertiesViewProps> = ({
  onSelectProperty,
  initialFilters,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOperation, setSelectedOperation] = useState<string>(initialFilters?.operation || 'ALL');
  const [selectedType, setSelectedType] = useState<string>(initialFilters?.propertyType || 'Todos los tipos');
  const [selectedCondition, setSelectedCondition] = useState<string>('Todas');
  const [selectedComuna, setSelectedComuna] = useState<string>(initialFilters?.comuna || 'Todas las comunas');
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');

  // Update filters if initialFilters change
  useEffect(() => {
    if (initialFilters) {
      if (initialFilters.operation) setSelectedOperation(initialFilters.operation);
      if (initialFilters.propertyType) setSelectedType(initialFilters.propertyType);
      if (initialFilters.comuna) setSelectedComuna(initialFilters.comuna);
    }
  }, [initialFilters]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedOperation('ALL');
    setSelectedType('Todos los tipos');
    setSelectedCondition('Todas');
    setSelectedComuna('Todas las comunas');
    setSelectedRegion('ALL');
  };

  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((item) => {
      // Search term
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchCode = item.code.toLowerCase().includes(query);
        const matchComuna = item.comuna.toLowerCase().includes(query);
        const matchSector = item.sector.toLowerCase().includes(query);
        if (!matchTitle && !matchCode && !matchComuna && !matchSector) return false;
      }

      // Region
      if (selectedRegion !== 'ALL' && item.region !== selectedRegion) return false;

      // Operation
      if (selectedOperation !== 'ALL' && item.operation !== selectedOperation) return false;

      // Comuna
      if (selectedComuna !== 'Todas las comunas' && item.comuna !== selectedComuna) return false;

      // Condition: Nuevas y Usadas
      if (selectedCondition !== 'Todas') {
        const itemCondition = item.condition || 'Usada';
        if (itemCondition !== selectedCondition) return false;
      }

      // Property Type
      if (selectedType !== 'Todos los tipos') {
        if (selectedType === 'Casas' && item.propertyType !== 'Casa' && item.propertyType !== 'Villa') return false;
        if (selectedType === 'Parcelas' && item.propertyType !== 'Parcela') return false;
        if (selectedType === 'Terrenos' && item.propertyType !== 'Terreno') return false;
        if (selectedType === 'Departamentos' && item.propertyType !== 'Departamento' && item.propertyType !== 'Penthouse') return false;
        if (selectedType === 'Locales Comerciales' && item.propertyType !== 'Local Comercial') return false;
      }

      return true;
    });
  }, [searchTerm, selectedRegion, selectedOperation, selectedComuna, selectedCondition, selectedType]);

  return (
    <div className="py-24 sm:py-28 bg-[#080e1b] min-h-screen">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="framed text-[#dfb86c] border-[#dfb86c]/40 mb-2 inline-block text-xs">
              Catálogo Oficial
            </span>
            <h1 className="text-2xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">
              Propiedades en Venta y Arriendo
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              Explora nuestra cartera de propiedades nuevas y usadas, parcelas y terrenos en la Región Metropolitana y la Costa de la Quinta Región.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono text-[#dfb86c] bg-[#dfb86c]/10 px-3 py-1.5 rounded-full border border-[#dfb86c]/30">
              {filteredProperties.length} {filteredProperties.length === 1 ? 'Propiedad encontrada' : 'Propiedades encontradas'}
            </span>
          </div>
        </div>

        {/* Filter Controls Panel */}
        <div className="p-5 rounded-2xl bg-[#0b1428] border border-white/10 shadow-xl space-y-4">
          {/* Top row: Search input & Region Pills */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por código, comuna, sector o palabras clave..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#dfb86c]"
              />
            </div>

            {/* Region Selector Pills */}
            <div className="md:col-span-7 flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {[
                { id: 'ALL', label: 'Todas las Regiones' },
                { id: 'RM', label: 'Región Metropolitana' },
                { id: 'V_REGION', label: 'Quinta Región Costa' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedRegion(tab.id)}
                  className={`btn-rounded text-[11px] sm:text-xs py-2 px-3 sm:px-4 shrink-0 transition-all ${
                    selectedRegion === tab.id
                      ? 'btn-primary-propper'
                      : 'btn-framed-propper text-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}

              <button
                onClick={resetFilters}
                title="Limpiar filtros"
                className="ml-auto text-xs text-slate-400 hover:text-[#dfb86c] flex items-center gap-1 shrink-0 px-2 py-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Restablecer</span>
              </button>
            </div>
          </div>

          {/* Bottom row: Dropdown Filters (Operación, Tipo, Condición, Comuna) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/5">
            {/* Operación */}
            <div>
              <label className="text-[10px] font-mono text-[#dfb86c] uppercase block mb-1">
                Operación
              </label>
              <select
                value={selectedOperation}
                onChange={(e) => setSelectedOperation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-xs text-white uppercase font-bold focus:outline-none focus:border-[#dfb86c]"
              >
                <option value="ALL">Venta & Arriendo</option>
                <option value="Venta">Venta</option>
                <option value="Arriendo">Arriendo</option>
              </select>
            </div>

            {/* Tipo de Propiedad */}
            <div>
              <label className="text-[10px] font-mono text-[#dfb86c] uppercase block mb-1">
                Tipo de Inmueble
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-xs text-white uppercase font-bold focus:outline-none focus:border-[#dfb86c]"
              >
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Condición: Nuevas y Usadas */}
            <div>
              <label className="text-[10px] font-mono text-[#dfb86c] uppercase block mb-1">
                Condición (Nuevas/Usadas)
              </label>
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-xs text-white uppercase font-bold focus:outline-none focus:border-[#dfb86c]"
              >
                <option value="Todas">Nuevas y Usadas (Todas)</option>
                <option value="Nueva">Solo Nuevas / En Verde</option>
                <option value="Usada">Solo Usadas / Consolidadas</option>
              </select>
            </div>

            {/* Comuna / Sector */}
            <div>
              <label className="text-[10px] font-mono text-[#dfb86c] uppercase block mb-1">
                Comuna
              </label>
              <select
                value={selectedComuna}
                onChange={(e) => setSelectedComuna(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-xs text-white uppercase font-bold focus:outline-none focus:border-[#dfb86c]"
              >
                {COMUNAS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelect={onSelectProperty}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-4 rounded-2xl bg-[#0b1428] border border-white/10">
            <Building2 className="w-12 h-12 text-[#dfb86c] mx-auto opacity-60" />
            <h3 className="text-xl font-bold text-white uppercase">
              No se encontraron propiedades con estos filtros
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Intenta cambiar la comuna, tipo de propiedad u operación, o contáctanos directamente para buscar en nuestra cartera off-market privada.
            </p>
            <div className="pt-2">
              <button
                onClick={resetFilters}
                className="btn-rounded btn-primary-propper py-2.5 px-6 text-xs uppercase"
              >
                <span>Ver Todas las Propiedades</span>
              </button>
            </div>
          </div>
        )}

        {/* Banner Off-Market / Asesoría Personalizada */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0b1428] via-[#111f3d] to-[#0b1428] border border-[#dfb86c]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mt-12">
          <div>
            <h3 className="text-lg sm:text-2xl font-bold text-white uppercase">
              ¿No encuentras la propiedad exacta?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Tenemos acuerdos de captación continua y propiedades privadas no publicadas en portales. Cuéntanos qué buscas.
            </p>
          </div>
          <a
            href="https://wa.me/56923807285?text=Hola%20BANÁ%20Propiedades,%20busco%20asesoría%20para%20encontrar%20una%20propiedad%20específica."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto btn-rounded btn-primary-propper justify-center text-xs py-3 px-6 shrink-0"
          >
            <span>Asesoría por WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
