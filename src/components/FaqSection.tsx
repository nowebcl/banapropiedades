import React, { useState } from 'react';
import { ChevronDown, ArrowRight, Check } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const faqs = [
    {
      q: '¿Cómo funciona la compraventa y el estudio de títulos en Chile?',
      a: 'Nuestro equipo legal revisa el historial del dominio de los últimos 30 años en el Conservador de Bienes Raíces (CBR) respectivo, redacta la promesa de compraventa y coordina la escritura pública en notaría garantizando total certeza jurídica.',
    },
    {
      q: '¿Qué facilidades de crédito hipotecario gestionan?',
      a: 'Tenemos alianzas con la banca privada (Banco de Chile, Santander Select, BICE, Itaú) para conseguir financiamiento con tasas preferenciales y hasta un 80% u 85% del valor de la propiedad.',
    },
    {
      q: '¿Tienen cobertura de arriendo y administración?',
      a: 'Sí, seleccionamos arrendatarios calificados con verificación de antecedentes comerciales, redactamos contratos de arriendo y ofrecemos administración integral del inmueble.',
    },
  ];

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <section id="faq" className="py-24 bg-[#060c18] border-t border-white/10">
      <div className="max-w-[1240px] mx-auto px-6">
        <span className="framed text-[#dfb86c] border-[#dfb86c]/40 mb-3 inline-block">
          Dudas & Asesoría
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight mb-12">
          Preguntas Frecuentes.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* FAQ Accordion on Left */}
          <div className="lg:col-span-8 space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-[#0b1428] border border-white/10 overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 text-white font-bold text-sm sm:text-base hover:text-[#dfb86c] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#dfb86c] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Framed Newsletter Box on Right */}
          <div className="lg:col-span-4 framed-box p-8 rounded-2xl">
            <form onSubmit={handleNewsletter} className="space-y-4">
              <label className="text-xs uppercase tracking-wider font-bold text-white block">
                Suscríbete a nuestro boletín para recibir las últimas oportunidades
              </label>

              <div className="flex items-center rounded-full bg-slate-900 border border-white/20 p-1.5 focus-within:border-[#dfb86c] transition-colors">
                <input
                  type="email"
                  required
                  placeholder="Tu email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="btn-rounded btn-primary-propper py-2 px-3 shrink-0"
                  aria-label="Enviar"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {subscribed ? (
                <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <Check className="w-3 h-3" /> ¡Suscripción confirmada!
                </p>
              ) : (
                <p className="text-[10px] text-slate-400 italic">
                  * Solo información relevante, sin spam.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
