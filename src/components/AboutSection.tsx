import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section id="about" className="py-16 sm:py-24 bg-[#080e1b] border-t border-white/10 relative">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <span className="framed text-[#dfb86c] border-[#dfb86c]/40 mb-2 sm:mb-3 inline-block text-xs">
          Sobre Baná Propiedades
        </span>
        <h2 className="text-2xl sm:text-5xl font-extrabold text-white uppercase tracking-tight mb-8 sm:mb-12">
          Arquitectura & Gestión Inmobiliaria.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* Left Column: Descriptions and Checkmarks */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white uppercase leading-snug">
              El lugar donde encuentras tu espacio ideal
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              En BANÁ Propiedades entendemos que un inmueble de alto estándar no es solo una transacción, sino un patrimonio y un estilo de vida. Seleccionamos rigurosamente cada propiedad por su calidad constructiva, orientación, entorno y potencial de plusvalía en la Región Metropolitana y la Costa Central.
            </p>

            <ul className="check-marks text-xs sm:text-sm text-slate-200 space-y-2.5 pt-1">
              <li>Ubicaciones privilegiadas y consolidadas cerca de la naturaleza</li>
              <li>Colegios de excelencia, centros comerciales y polo gastronómico cercano</li>
              <li>Estacionamientos amplios para residentes y visitas</li>
              <li>Seguridad perimetral y control de acceso monitoreado 24/7</li>
            </ul>

            <div className="pt-2 sm:pt-4">
              <a href="#contact" className="w-full sm:w-auto btn-rounded btn-primary-propper justify-center text-xs py-3 px-6">
                <span>Agendar una Reunión Privada</span>
              </a>
            </div>
          </div>

          {/* Right Column: Video Presentation Player */}
          <div className="lg:col-span-6">
            <h3 className="text-base sm:text-lg font-bold text-white uppercase mb-3 sm:mb-4">
              Presentación Audiovisual
            </h3>
            <div
              onClick={() => setIsVideoOpen(true)}
              className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-900 border border-white/10 group cursor-pointer shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
                alt="Presentación de Arquitectura"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#dfb86c] text-slate-950 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-slate-950 ml-1" />
                </div>
              </div>
            </div>
            <figure className="text-[11px] sm:text-xs text-slate-400 mt-2 italic text-center">
              * Conoce los beneficios y la visión de diseño de nuestros proyectos de autor
            </figure>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div
          onClick={() => setIsVideoOpen(false)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        >
          <div className="relative w-full max-w-4xl aspect-[16/9] bg-black rounded-2xl overflow-hidden">
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 text-white bg-black/60 rounded-full hover:bg-white hover:text-black"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Video Presentation"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};
