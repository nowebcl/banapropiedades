import React from 'react';
import { Sparkles, ArrowRight, Building, Hammer, Scale, Home as HomeIcon, CheckCircle2 } from 'lucide-react';
import { Property } from '../data/properties';
import { Hero } from './Hero';
import { PropertyCard } from './PropertyCard';
import { BonusNumbers } from './BonusNumbers';
import { TestimonialsPropper } from './TestimonialsPropper';
import { LogosSection } from './LogosSection';

interface HomeViewProps {
  onNavigate: (view: 'home' | 'propiedades' | 'construccion' | 'servicios' | 'publica' | 'nosotros' | 'contacto') => void;
  onSearch: (filters: { operation: string; propertyType: string; comuna: string }) => void;
  onSelectProperty: (property: Property) => void;
  featuredProperties: Property[];
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSearch,
  onSelectProperty,
  featuredProperties,
}) => {
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* ========================================================
          HERO SECTION (Minimalist Luxury Architecture)
          ======================================================== */}
      <Hero onNavigate={onNavigate} onSearch={onSearch} />

      {/* ========================================================
          BLOQUES DE ACCESO RÁPIDO (Tres tarjetas visuales elegantes)
          ======================================================== */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="framed text-[#dfb86c] border-[#dfb86c]/40 mb-3 inline-block text-xs">
            Gestión Integral
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
            ¿Cómo podemos ayudarte hoy?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Tarjeta 1: ¿Quieres Vender o Arrendar? */}
          <div className="framed-box p-7 sm:p-8 rounded-2xl flex flex-col justify-between group hover:border-[#dfb86c]/60 transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#dfb86c]/15 text-[#dfb86c] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono text-[#dfb86c] tracking-widest uppercase block mb-1">
                // CAPTACIÓN DIRECTA
              </span>
              <h3 className="text-xl font-bold text-white uppercase mb-3">
                ¿Quieres Vender o Arrendar?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Publica con nosotros. Te ayudamos con marketing profesional, tasación real y asesoría legal completa.
              </p>
            </div>
            <button
              onClick={() => onNavigate('publica')}
              className="w-full btn-rounded btn-primary-propper justify-between text-xs py-3 cursor-pointer"
            >
              <span>Publicar Propiedad</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Tarjeta 2: ¿Buscas tu Próximo Hogar o Terreno? */}
          <div className="framed-box p-7 sm:p-8 rounded-2xl flex flex-col justify-between group hover:border-[#dfb86c]/60 transition-all duration-300 bg-gradient-to-b from-[#0b1428] to-[#101e3b]">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#dfb86c]/20 text-[#fae6be] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <HomeIcon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono text-[#fae6be] tracking-widest uppercase block mb-1">
                // CATÁLOGO SELECCIONADO
              </span>
              <h3 className="text-xl font-bold text-white uppercase mb-3">
                ¿Buscas tu Próximo Hogar o Terreno?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Explora nuestro catálogo de propiedades seleccionadas y encuentra la opción ideal para ti.
              </p>
            </div>
            <button
              onClick={() => onNavigate('propiedades')}
              className="w-full btn-rounded btn-primary-propper justify-between text-xs py-3 cursor-pointer"
            >
              <span>Ver Catálogo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Tarjeta 3: ¿Papeles pendientes o dudas de valor? */}
          <div className="framed-box p-7 sm:p-8 rounded-2xl flex flex-col justify-between group hover:border-[#dfb86c]/60 transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#dfb86c]/15 text-[#dfb86c] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Scale className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono text-[#dfb86c] tracking-widest uppercase block mb-1">
                // LEGAL & TÉCNICO
              </span>
              <h3 className="text-xl font-bold text-white uppercase mb-3">
                ¿Papeles pendientes o dudas de valor?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Te ayudamos con la Posesión Efectiva de tu herencia o la Tasación Profesional de tu inmueble.
              </p>
            </div>
            <button
              onClick={() => onNavigate('servicios')}
              className="w-full btn-rounded btn-framed-propper justify-between text-xs py-3 cursor-pointer"
            >
              <span>Ver Servicios</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          ALIANZA LCE CONSTRUCCIONES (Banner Destacado en la Home)
          ======================================================== */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#091122] via-[#101d3a] to-[#091122] border border-[#dfb86c]/40 p-8 sm:p-12 shadow-2xl">
          {/* Decorative Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#dfb86c]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dfb86c]/15 border border-[#dfb86c]/40 text-[#dfb86c] text-[11px] font-mono tracking-wider uppercase font-semibold">
                <Hammer className="w-3.5 h-3.5" />
                ALIANZA EXCLUSIVA BANÁ & LCE CONSTRUCCIONES
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight leading-tight">
                ¿Compraste un terreno o quieres remodelar?
              </h2>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl font-light">
                Con nuestra alianza exclusiva con <strong className="text-white font-bold">LCE Construcciones</strong>, diseñamos y edificamos tu proyecto con total seguridad y tarifas preferenciales.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#dfb86c]" /> Llave en mano
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#dfb86c]" /> Comparativa Antes/Después
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#dfb86c]" /> Parcelas & Obras Exteriores
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={() => onNavigate('construccion')}
                className="btn-rounded btn-primary-propper py-4 px-6 justify-center text-xs sm:text-sm font-bold shadow-xl shadow-[#dfb86c]/20 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ver Proyectos de Construcción</span>
              </button>

              <button
                onClick={() => onNavigate('construccion')}
                className="btn-rounded btn-framed-propper py-3 px-6 justify-center text-xs font-semibold cursor-pointer"
              >
                <span>Explorar Antes / Después</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PROPIEDADES DESTACADAS DE LA SEMANA
          ======================================================== */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <span className="framed text-[#dfb86c] border-[#dfb86c]/40 mb-2 inline-block text-xs">
              Colección Seleccionada
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
              Oportunidades Destacadas.
            </h2>
          </div>
          <button
            onClick={() => onNavigate('propiedades')}
            className="flex items-center gap-2 text-xs font-bold text-[#dfb86c] hover:text-[#fae6be] transition-colors cursor-pointer"
          >
            <span>Ver Catálogo Completo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {featuredProperties.slice(0, 3).map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSelect={onSelectProperty}
            />
          ))}
        </div>
      </section>

      {/* Key Numbers / Trust Stats */}
      <BonusNumbers />

      {/* Client Testimonials */}
      <TestimonialsPropper />

      {/* Institutional Logos */}
      <LogosSection />
    </div>
  );
};
