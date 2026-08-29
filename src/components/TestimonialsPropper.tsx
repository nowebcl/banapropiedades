import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const TestimonialsPropper: React.FC = () => {
  const [active, setActive] = useState(0);

  const testimonials = [
    {
      quote: 'El acompañamiento técnico y la discreción con que vendieron nuestra residencia en Lo Curro fue sobresaliente. Cerramos en menos de 20 días al valor de tasación esperado.',
      author: 'Ignacio Valdés Errázuriz',
      project: 'Propietario en Vitacura, RM',
    },
    {
      quote: 'Buscábamos una casa de playa en Zapallar con acceso directo y arquitectura sustentable. El equipo de Baná nos presentó opciones off-market que no estaban en ningún portal.',
      author: 'Florencia Lyon Cousiño',
      project: 'Compradora en Beranda, Zapallar',
    },
    {
      quote: 'Excelente gestión legal y coordinación con el Conservador de Bienes Raíces. Es la tercera inversión que realizamos con ellos y son nuestros corredores de total confianza.',
      author: 'Rodrigo Astaburuaga M.',
      project: 'Inversionista en Las Condes & Concón',
    },
  ];

  const next = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="py-24 bg-[#080e1b] border-t border-white/10 relative">
      <div className="max-w-[900px] mx-auto px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-[#c5a059]/10 border border-[#dfb86c]/30 text-[#dfb86c] flex items-center justify-center mx-auto mb-8">
          <Quote className="w-8 h-8" />
        </div>

        <blockquote className="text-lg sm:text-2xl text-slate-100 font-light italic leading-relaxed mb-8">
          "{testimonials[active].quote}"
        </blockquote>

        <div className="mb-8">
          <cite className="font-bold text-white text-base not-italic block uppercase tracking-wider">
            {testimonials[active].author}
          </cite>
          <span className="text-xs font-mono text-[#dfb86c] uppercase tracking-widest block mt-1">
            {testimonials[active].project}
          </span>
        </div>

        {/* Carousel Dots & Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prev}
            aria-label="Anterior"
            className="w-10 h-10 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-[#c5a059] hover:text-black hover:border-[#dfb86c] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === active ? 'w-6 bg-[#dfb86c]' : 'w-2 bg-white/30'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Siguiente"
            className="w-10 h-10 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-[#c5a059] hover:text-black hover:border-[#dfb86c] transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
