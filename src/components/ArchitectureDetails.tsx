import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ArchitectureDetails: React.FC = () => {
  const [slide1, setSlide1] = useState(0);
  const [slide2, setSlide2] = useState(0);

  const images1 = [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
  ];

  const images2 = [
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80'
  ];

  return (
    <section id="detalles" className="py-24 bg-[#080e1b] border-t border-white/10 space-y-24">
      <div className="max-w-[1240px] mx-auto px-6 space-y-24">
        {/* Detail 1: Left Gallery, Right Description */}
        <div>
          <div className="mb-8">
            <h3 className="framed text-[#dfb86c] border-[#dfb86c]/40 text-sm">
              Arquitectura & Diseño
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Gallery on Left */}
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-900 border border-white/10 group">
              <img
                src={images1[slide1]}
                alt="Arquitectura & Diseño"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <button
                onClick={() => setSlide1((prev) => (prev - 1 + images1.length) % images1.length)}
                aria-label="Foto anterior"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#c5a059] hover:text-black"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSlide1((prev) => (prev + 1) % images1.length)}
                aria-label="Foto siguiente"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#c5a059] hover:text-black"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Description on Right */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h4 className="text-xl font-bold text-white uppercase mb-2">
                  Materiales Nobles de Alta Gama
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Estructuras de hormigón visto combinadas con maderas nativas tratadas, mármoles importados y piedras locales que envejecen con elegancia y requieren mínimo mantenimiento.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-white uppercase mb-2">
                  Aislación Térmica & Acústica
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Ventanales termopanel con rotura de puente térmico y losa radiante zonificada para garantizar confort interior absoluto durante todas las estaciones del año.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detail 2: Right Gallery, Left Description */}
        <div>
          <div className="mb-8 text-right">
            <h3 className="framed text-[#dfb86c] border-[#dfb86c]/40 text-sm">
              Interiores Cálidos & Vistas Despejadas
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Description on Left */}
            <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
              <div>
                <h4 className="text-xl font-bold text-white uppercase mb-2">
                  Siente la Amplitud de tu Hogar
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Diseños de doble altura y plantas libres que integran living, terrazas y jardines. Espacios pensados para el descanso familiar y las reuniones sociales.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-white uppercase mb-2">
                  Cocinas de Autor & Terrazas Panorámicas
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Cocinas equipadas con artefactos Miele o Bosch, cubiertas de cuarzo o Silestone, y amplias terrazas con parrilla gourmet y vistas directas a la Cordillera o al Océano Pacífico.
                </p>
              </div>
            </div>

            {/* Gallery on Right */}
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-900 border border-white/10 group order-1 lg:order-2">
              <img
                src={images2[slide2]}
                alt="Interiores Cálidos"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <button
                onClick={() => setSlide2((prev) => (prev - 1 + images2.length) % images2.length)}
                aria-label="Foto anterior"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#c5a059] hover:text-black"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSlide2((prev) => (prev + 1) % images2.length)}
                aria-label="Foto siguiente"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#c5a059] hover:text-black"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
