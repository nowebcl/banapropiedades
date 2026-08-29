import React from 'react';
import { Star, Quote, ShieldCheck } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      name: 'Ignacio Valdés Errázuriz',
      role: 'Inversionista Privado',
      location: 'Vitacura, RM',
      comment: 'La tasación algorítmica y la calidad del video en dron fueron determinantes. Vendimos nuestro departamento en Nueva Costanera en solo 14 días al valor exacto que buscábamos.',
      rating: 5,
      deal: 'Venta Penthouse Dúplex (26.500 UF)',
    },
    {
      name: 'Florencia Lyon Cousiño',
      role: 'Propietaria',
      location: 'Zapallar, V Región',
      comment: 'El trato discreto y la curaduría con que presentaron nuestra casa en Beranda superó todas las expectativas. El acompañamiento legal hasta el Conservador de La Ligua fue impecable.',
      rating: 5,
      deal: 'Venta Villa Frente al Mar (38.000 UF)',
    },
    {
      name: 'Rodrigo Astaburuaga M.',
      role: 'Comprador & Desarrollador',
      location: 'Las Condes, RM',
      comment: 'Excelente filtro de propiedades y seriedad en la información técnica. Es la tercera operación que cerramos con Baná Propiedades y seguirán siendo nuestros asesores de cabecera.',
      rating: 5,
      deal: 'Compra Residencia San Damián (34.900 UF)',
    },
  ];

  return (
    <section className="relative py-24 lg:py-32 bg-[#060b16] overflow-hidden border-t border-white/5">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 text-xs font-mono text-cyan-400 mb-4 justify-center">
            <span className="w-8 h-px bg-cyan-400"></span>
            <span>06 // REPUTACIÓN & CONFIANZA</span>
            <span className="w-8 h-px bg-cyan-400"></span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-normal text-white tracking-tight mb-4">
            Testimonios <br />
            <span className="text-slate-400">de clientes exclusivos.</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            La satisfacción de compradores y vendedores en los sectores más prestigiosos de Santiago y la Costa es nuestra mejor carta de presentación.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-[#0b1428] border border-white/10 flex flex-col justify-between hover:border-cyan-500/30 transition-all duration-300 relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-600 group-hover:text-cyan-400/40 transition-colors" />
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-6 italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-6 border-t border-white/5">
                <h4 className="text-base font-semibold text-white">{review.name}</h4>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mt-1">
                  <span>{review.role}</span>
                  <span className="text-cyan-300">{review.location}</span>
                </div>
                <div className="mt-3 px-2.5 py-1 rounded bg-slate-900/80 border border-white/5 text-[10px] font-mono text-slate-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-cyan-400" />
                  <span>{review.deal}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
