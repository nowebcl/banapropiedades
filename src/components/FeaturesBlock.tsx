import React from 'react';
import { Shield, MapPin, Wallet, ArrowRight, Sparkles, Sliders } from 'lucide-react';

interface FeaturesBlockProps {
  onOpenRemodeling?: () => void;
}

export const FeaturesBlock: React.FC<FeaturesBlockProps> = ({ onOpenRemodeling }) => {
  const features = [
    {
      icon: Shield,
      title: 'Vida Exclusiva & Segura',
      desc: 'Condominios cerrados y edificios boutique de baja densidad con control de acceso 24/7, cámaras inteligentes y máxima privacidad en Santiago y la Costa.',
      link: '#propiedades',
    },
    {
      icon: MapPin,
      title: 'Ubicaciones Estratégicas',
      desc: 'Sectores consolidados de alta plusvalía en Vitacura, Las Condes, Lo Barnechea, y primera línea frente al mar en Zapallar, Cachagua y Concón.',
      link: '#propiedades',
    },
    {
      icon: Wallet,
      title: 'Rentabilidad & Plusvalía',
      desc: 'Tasaciones de alta precisión algorítmica y asesoría tributaria para maximizar el retorno de inversión y acelerar la venta sin rebajas innecesarias.',
      link: '#contact',
    },
  ];

  return (
    <div className="py-20 bg-[#060c18] border-t border-white/10 relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6 space-y-12">
        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="framed-box p-8 rounded-xl flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 hover:border-[#dfb86c]/50"
              >
                <div>
                  <div className="w-14 h-14 rounded-full bg-[#c5a059]/10 border border-[#dfb86c]/30 text-[#dfb86c] flex items-center justify-center mb-6 group-hover:bg-[#dfb86c] group-hover:text-black transition-colors">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>
                <a
                  href={item.link}
                  className="btn-rounded btn-framed-propper self-start text-xs"
                >
                  <span>Conocer Más</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Feature Spotlight: Remodelaciones Baná (Antes y Después) */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0b152b] via-[#101e3d] to-[#0b152b] border border-[#dfb86c]/40 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dfb86c]/15 text-[#dfb86c] text-[10px] font-mono font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NUEVO SERVICIO INTEGRAL</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              ¿Tu Propiedad Necesita una Renovación de Alto Impacto?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Descubre nuestro módulo interactivo de <strong>Antes y Después</strong>. Aumenta la plusvalía de tu departamento o casa hasta un <strong>35%</strong> con obras llave en mano y garantía escrita de 2 años.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full lg:w-auto">
            {onOpenRemodeling ? (
              <button
                onClick={onOpenRemodeling}
                className="w-full sm:w-auto btn-rounded btn-primary-propper justify-center text-xs py-3.5 px-6 shadow-xl shadow-[#dfb86c]/25 cursor-pointer"
              >
                <Sliders className="w-4 h-4" />
                <span>Ver Sección Remodelaciones (Antes / Después)</span>
              </button>
            ) : (
              <a
                href="#remodelaciones"
                className="w-full sm:w-auto btn-rounded btn-primary-propper justify-center text-xs py-3.5 px-6"
              >
                <Sliders className="w-4 h-4" />
                <span>Ver Remodelaciones</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
