import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, X, Check, ArrowRight, ChevronDown, 
  MapPin, Home, Phone, Mail, User, ShieldCheck, CheckCircle2 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ValuationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ValuationModalAndSection: React.FC<ValuationProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    comuna: 'Vitacura',
    region: 'RM',
    tipoPropiedad: 'Departamento',
    metros: '',
    dormitorios: '3',
    mensaje: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#a5d8ff', '#d0bfff', '#ffffff'],
    });
  };

  const resetForm = () => {
    setSubmitted(false);
    onClose();
  };

  const faqs = [
    {
      q: '¿Cómo calculan el valor de tasación de mi propiedad?',
      a: 'Utilizamos un modelo híbrido que combina datos reales de transacciones inscritas en el Conservador de Bienes Raíces (CBR), oferta activa comparable, estado de conservación, orientación, piso y atributos arquitectónicos específicos.',
    },
    {
      q: '¿Tiene algún costo o compromiso la tasación inicial?',
      a: 'No. La tasación y el estudio de mercado preliminar que elaboramos para propietarios en la Región Metropolitana y Quinta Región es 100% gratuito y sin compromiso de exclusividad obligatorio.',
    },
    {
      q: '¿En qué zonas tienen cobertura para venta y arriendo?',
      a: 'Nos especializamos en Santiago Oriente (Vitacura, Las Condes, Lo Barnechea, Providencia, La Reina) y en el corredor costero de la Quinta Región (Zapallar, Cachagua, Maitencillo, Concón, Reñaca, Viña del Mar y Santo Domingo).',
    },
    {
      q: '¿Qué incluye el servicio de comercialización boutique?',
      a: 'Incluye sesión de fotos HDR profesional, tour virtual Matterport 3D, video con dron 4K, difusión en los principales portales inmobiliarios, pauta digital segmentada en redes y acompañamiento legal integral hasta la firma de escritura y entrega de llaves.',
    },
  ];

  return (
    <>
      {/* Valuation CTA Section */}
      <section className="relative py-20 lg:py-28 bg-[#080e1b] overflow-hidden border-t border-white/5">
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Banner Box */}
          <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 bg-gradient-to-r from-[#0d1830] via-[#102042] to-[#0d1830] border border-cyan-500/30 overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>

            <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 font-mono text-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  VALUACIÓN PRIVADA Y CONFIDENCIAL
                </span>

                <h2 className="text-3xl sm:text-5xl font-display font-normal text-white tracking-tight leading-[1.05]">
                  ¿Conoces el valor real de mercado <br />
                  <span className="text-cyan-300">de tu propiedad hoy?</span>
                </h2>

                <p className="text-sm sm:text-base text-slate-300 max-w-xl font-normal leading-relaxed">
                  Solicita una tasación profesional sin costo. Te entregamos un informe exhaustivo con el precio óptimo de venta y la estrategia para comercializarla en tiempo récord.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                <button
                  onClick={onClose} // trigger modal
                  className="w-full py-4 px-6 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm font-mono flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/25 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Solicitar Tasación Gratuita</span>
                </button>

                <a
                  href="https://wa.me/56984529100?text=Hola%20BANÁ%20Propiedades,%20deseo%20solicitar%20una%20tasación%20para%20mi%20propiedad."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-2xl border border-white/20 hover:border-emerald-400 text-white font-medium text-xs font-mono flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Hablar directo por WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-2">
                // PREGUNTAS FRECUENTES
              </span>
              <h3 className="text-3xl font-display text-white">
                Todo lo que necesitas saber
              </h3>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpenFaq = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-[#0c162e] border border-white/10 overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpenFaq ? null : idx)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 text-white hover:text-cyan-300 transition-colors"
                    >
                      <span className="font-medium text-sm sm:text-base font-sans">{faq.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-300 ${
                          isOpenFaq ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpenFaq && (
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Valuation Request Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl rounded-3xl bg-[#0b1428] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl shadow-black/90 z-10 my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-5 right-5 p-2 rounded-full border border-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {!submitted ? (
                <div>
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span>SOLICITUD DE TASACIÓN EXCLUSIVA</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display text-white mb-2">
                    Tasación Profesional Gratuita
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mb-6">
                    Completa los datos de tu propiedad y uno de nuestros socios directores te contactará en menos de 2 horas hábiles.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 uppercase">
                          Tu Nombre Completo *
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="Ej: Francisca Silva"
                          value={formData.nombre}
                          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                          className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-mono text-slate-400 uppercase">
                          Teléfono / WhatsApp *
                        </label>
                        <input
                          required
                          type="tel"
                          placeholder="+56 9 1234 5678"
                          value={formData.telefono}
                          onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                          className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-slate-400 uppercase">
                        Correo Electrónico *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="francisca@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 uppercase">
                          Región
                        </label>
                        <select
                          value={formData.region}
                          onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                          className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none"
                        >
                          <option value="RM">Región Metropolitana</option>
                          <option value="V_REGION">Quinta Región Costa</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-mono text-slate-400 uppercase">
                          Comuna
                        </label>
                        <input
                          type="text"
                          placeholder="Ej: Vitacura, Zapallar..."
                          value={formData.comuna}
                          onChange={(e) => setFormData({ ...formData, comuna: e.target.value })}
                          className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 uppercase">
                          Tipo Inmueble
                        </label>
                        <select
                          value={formData.tipoPropiedad}
                          onChange={(e) => setFormData({ ...formData, tipoPropiedad: e.target.value })}
                          className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none"
                        >
                          <option value="Departamento">Departamento</option>
                          <option value="Penthouse">Penthouse</option>
                          <option value="Casa">Casa</option>
                          <option value="Villa">Villa de Playa</option>
                          <option value="Terreno">Terreno</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-mono text-slate-400 uppercase">
                          Metros Aprox (m²)
                        </label>
                        <input
                          type="number"
                          placeholder="Ej: 220"
                          value={formData.metros}
                          onChange={(e) => setFormData({ ...formData, metros: e.target.value })}
                          className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-slate-400 uppercase">
                        Detalles o comentarios adicionales (opcional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Ej: Vista despejada, recién remodelado..."
                        value={formData.mensaje}
                        onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                        className="w-full mt-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs sm:text-sm font-mono flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all mt-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Enviar Solicitud de Tasación</span>
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-400/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-display text-white">
                    ¡Solicitud Recibida con Éxito!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Hemos registrado tu solicitud para la propiedad en <strong className="text-cyan-300">{formData.comuna}</strong>. Nuestro equipo de tasadores periciales revisará los antecedentes y te contactará a la brevedad al <strong className="text-cyan-300">{formData.telefono}</strong>.
                  </p>
                  <button
                    onClick={resetForm}
                    className="px-6 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-xs font-mono text-white transition-colors"
                  >
                    Cerrar ventana
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
