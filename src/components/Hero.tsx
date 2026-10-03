import React, { useState } from 'react';
import { Home, MapPin, Search, ArrowRight, ChevronDown } from 'lucide-react';
import { PROPERTY_TYPES, COMUNAS } from '../data/properties';

interface HeroProps {
  onNavigate: (view: 'home' | 'propiedades' | 'construccion' | 'servicios' | 'publica' | 'nosotros' | 'contacto') => void;
  onSearch: (filters: { operation: string; propertyType: string; comuna: string }) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onSearch }) => {
  const [propertyType, setPropertyType] = useState('Todos los tipos');
  const [comuna, setComuna] = useState('Todas las comunas');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      operation: 'ALL',
      propertyType,
      comuna,
    });
    onNavigate('propiedades');
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#080e1b] pt-28 pb-20 sm:pb-24">
      {/* Background Architectural Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-villa.jpg"
          alt="BANÁ Propiedades - Santiago & Quinta Región"
          className="w-full h-full object-cover object-center scale-100 sm:scale-105 transition-transform duration-1000 ease-out"
        />

        {/* High-End Cinematic Gradient Overlays */}
        {/* Left Dark Gradient for ultra-crisp typography contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080e1b]/95 via-[#080e1b]/70 md:via-[#080e1b]/45 to-transparent"></div>

        {/* Top subtle vignette for clean navbar blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080e1b]/70 via-transparent to-[#080e1b]/90 sm:to-[#080e1b]"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-12 w-full my-auto">
        <div className="max-w-3xl">
          {/* Minimalist Top Tagline */}
          <div className="flex items-center gap-3 mb-5 sm:mb-6">
            <span className="w-8 h-[1px] bg-[#dfb86c]"></span>
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#dfb86c] font-semibold">
              SANTIAGO &nbsp;•&nbsp; QUINTA REGIÓN
            </span>
          </div>

          {/* Luxury Editorial Serif Title */}
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[90px] font-normal text-white tracking-tight leading-[1.02] mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
            Encuentra tu<br />
            próximo <span className="text-[#dfb86c]">espacio.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-200/95 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-xl mb-9">
            Gestión inmobiliaria y propiedades exclusivas en Santiago y Quinta Región.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-12 sm:mb-16">
            {/* Primary Gold Pill */}
            <button
              onClick={() => onNavigate('propiedades')}
              className="px-7 py-3.5 rounded-full bg-[#dfb86c] hover:bg-[#e8c882] text-[#080e1b] font-bold text-xs uppercase tracking-[0.14em] flex items-center gap-2.5 shadow-xl shadow-black/40 hover:shadow-[#dfb86c]/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer group"
            >
              <span>VER PROPIEDADES</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Secondary Text Link */}
            <button
              onClick={() => onNavigate('servicios')}
              className="px-4 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200 hover:text-white transition-colors cursor-pointer"
            >
              CONOCE NUESTROS SERVICIOS
            </button>
          </div>
        </div>

        {/* Minimalist Floating Glass Search Bar */}
        <div className="w-full max-w-3xl">
          <form
            onSubmit={handleSearch}
            className="p-2 sm:p-2.5 rounded-2xl md:rounded-full bg-[#0b1428]/85 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/70 flex flex-col md:flex-row items-stretch md:items-center gap-2 sm:gap-3"
          >
            {/* Field 1: Tipo de propiedad */}
            <div className="flex-1 flex items-center gap-3 px-4 py-2 sm:py-2.5 rounded-xl md:rounded-full hover:bg-white/5 transition-colors">
              <Home className="w-5 h-5 text-slate-300 shrink-0" />
              <div className="flex-1 text-left">
                <span className="text-[9px] uppercase font-mono tracking-wider text-slate-400 block font-medium">
                  TIPO DE PROPIEDAD
                </span>
                <div className="relative">
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full appearance-none bg-transparent text-xs sm:text-sm font-semibold text-white pr-6 focus:outline-none cursor-pointer"
                  >
                    {PROPERTY_TYPES.map((type) => (
                      <option key={type} value={type} className="bg-[#0b1428] text-white">
                        {type}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            {/* Vertical Divider (Desktop) */}
            <div className="hidden md:block w-[1px] h-8 bg-white/15"></div>

            {/* Field 2: Comuna */}
            <div className="flex-1 flex items-center gap-3 px-4 py-2 sm:py-2.5 rounded-xl md:rounded-full hover:bg-white/5 transition-colors">
              <MapPin className="w-5 h-5 text-slate-300 shrink-0" />
              <div className="flex-1 text-left">
                <span className="text-[9px] uppercase font-mono tracking-wider text-slate-400 block font-medium">
                  COMUNA
                </span>
                <div className="relative">
                  <select
                    value={comuna}
                    onChange={(e) => setComuna(e.target.value)}
                    className="w-full appearance-none bg-transparent text-xs sm:text-sm font-semibold text-white pr-6 focus:outline-none cursor-pointer"
                  >
                    {COMUNAS.map((c) => (
                      <option key={c} value={c} className="bg-[#0b1428] text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            {/* Action Search Button */}
            <button
              type="submit"
              className="rounded-full bg-[#dfb86c] hover:bg-[#e8c882] text-[#080e1b] font-bold text-xs uppercase tracking-wider px-8 py-3.5 flex items-center justify-center gap-2 shadow-md hover:shadow-[#dfb86c]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
            >
              <Search className="w-4 h-4 text-[#080e1b]" />
              <span>BUSCAR</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
