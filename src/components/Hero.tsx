import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenRemodeling?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRemodeling }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
      tag: '01 / GESTIÓN LEGAL',
      title: 'Posesión Efectiva.',
      subtitle: 'Herencias, saneamiento de títulos y venta sin trabas.',
      waQuery: 'Hola BANÁ Propiedades, deseo consultar por el servicio de Posesión Efectiva y saneamiento de títulos.',
      isRemodeling: false,
    },
    {
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85',
      tag: '02 / VALORACIÓN',
      title: 'Tasación Profesional.',
      subtitle: 'Estudio de mercado y tasación comercial de alta precisión.',
      waQuery: 'Hola BANÁ Propiedades, deseo cotizar una Tasación Profesional para mi inmueble.',
      isRemodeling: false,
    },
    {
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85',
      tag: '03 / REVALORIZACIÓN & REMODELACIONES',
      title: 'Remodelaciones & Antes y Después.',
      subtitle: 'Transformaciones integrales de alta gama con +32% de plusvalía y diseño de autor.',
      waQuery: 'Hola BANÁ Propiedades, deseo cotizar una Remodelación Integral para mi propiedad.',
      isRemodeling: true,
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#080e1b] w-full" id="page-top">
      {/* Background Slides with Crossfade */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          style={{ transitionProperty: 'opacity, transform' }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle Dark Navy Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#080e1b]/95 via-[#080e1b]/70 to-[#080e1b]/60"></div>
        </div>
      ))}

      {/* Ultra Minimal Hero Content */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-6 sm:px-10 pt-28 sm:pt-32 pb-16 w-full">
        <div className="max-w-2xl">
          {/* Subtle Monospace Tag */}
          <div className="mb-4">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#dfb86c] font-semibold border-b border-[#dfb86c]/40 pb-1 inline-block">
              {slides[currentSlide].tag}
            </span>
          </div>

          {/* Clean Editorial Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white uppercase tracking-tight leading-[1.05] mb-4">
            {slides[currentSlide].title}
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-lg sm:text-2xl font-light leading-relaxed mb-8 max-w-xl">
            {slides[currentSlide].subtitle}
          </p>

          {/* Minimalist Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {slides[currentSlide].isRemodeling && onOpenRemodeling ? (
              <button
                onClick={onOpenRemodeling}
                className="btn-rounded btn-primary-propper py-3 px-6 text-xs sm:text-sm font-bold shadow-xl shadow-[#dfb86c]/25 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ver Antes y Después Completo</span>
              </button>
            ) : (
              <a
                href={`https://wa.me/56923807285?text=${encodeURIComponent(slides[currentSlide].waQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-rounded btn-primary-propper py-3 px-6 text-xs sm:text-sm font-bold shadow-xl shadow-black/60"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Consultar por WhatsApp</span>
              </a>
            )}

            <a
              href="#propiedades"
              className="btn-rounded btn-framed-propper py-3 px-6 text-xs sm:text-sm font-semibold text-white hover:text-black"
            >
              <span>Ver Propiedades</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            {onOpenRemodeling && !slides[currentSlide].isRemodeling && (
              <button
                onClick={onOpenRemodeling}
                className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-[#dfb86c] py-3 px-4 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Remodelaciones</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Desktop-only Minimal Slider Controls */}
      <button
        onClick={prevSlide}
        aria-label="Slide anterior"
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm text-white items-center justify-center hover:bg-[#c5a059] hover:text-black hover:border-[#dfb86c] transition-all z-20"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Slide siguiente"
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm text-white items-center justify-center hover:bg-[#c5a059] hover:text-black hover:border-[#dfb86c] transition-all z-20"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Minimal Progress Lines */}
      <div className="absolute bottom-8 left-6 sm:left-10 flex items-center gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`h-1 rounded-full transition-all duration-500 ${
              idx === currentSlide ? 'w-10 bg-[#dfb86c]' : 'w-3 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
