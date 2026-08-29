import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const BigGallery: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const galleryItems = [
    {
      title: 'Vista Frontal & Accesos',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
      tag: 'Vitacura • RM',
    },
    {
      title: 'Piscina Infinity & Océano',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
      tag: 'Zapallar • V Región',
    },
    {
      title: 'Living Doble Altura',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      tag: 'Las Condes • RM',
    },
    {
      title: 'Terraza Panorámica & Jacuzzi',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85',
      tag: 'Concón • V Región',
    },
    {
      title: 'Master Suite & Spa',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
      tag: 'Lo Barnechea • RM',
    },
  ];

  const next = () => setActiveIndex((prev) => (prev + 1) % galleryItems.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-[#060c18] border-t border-white/10 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="framed text-[#dfb86c] border-[#dfb86c]/40 mb-2 sm:mb-3 inline-block text-xs">
            Exploración Visual
          </span>
          <h2 className="text-2xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">
            Galería Arquitectónica.
          </h2>
        </div>

        {/* Gallery Navigation Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            aria-label="Anterior"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-slate-900 text-white flex items-center justify-center hover:bg-[#c5a059] hover:text-black hover:border-[#dfb86c] transition-colors"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={next}
            aria-label="Siguiente"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-slate-900 text-white flex items-center justify-center hover:bg-[#c5a059] hover:text-black hover:border-[#dfb86c] transition-colors"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>

      {/* Main Big Slide Display */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] bg-slate-950 border border-white/15 shadow-2xl">
          <img
            src={galleryItems[activeIndex].image}
            alt={galleryItems[activeIndex].title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-4 sm:p-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between w-full gap-2 sm:gap-4">
              <div>
                <span className="text-[10px] sm:text-xs font-mono text-[#dfb86c] uppercase tracking-widest block mb-1">
                  {galleryItems[activeIndex].tag}
                </span>
                <h3 className="framed text-white bg-black/60 border-white/40 text-xs sm:text-lg">
                  {galleryItems[activeIndex].title}
                </h3>
              </div>

              <div className="text-[10px] sm:text-xs font-mono text-slate-300">
                {activeIndex + 1} / {galleryItems.length} FOTOGRAFÍAS
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail bar */}
        <div className="grid grid-cols-5 gap-2 sm:gap-3 mt-3 sm:mt-4">
          {galleryItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative aspect-[16/10] rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all ${
                idx === activeIndex
                  ? 'border-[#dfb86c] scale-[1.03]'
                  : 'border-white/10 opacity-50 hover:opacity-100'
              }`}
            >
              <img src={item.image} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
