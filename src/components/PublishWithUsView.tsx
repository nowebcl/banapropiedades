import React, { useState } from 'react';
import { Camera, TrendingUp, ShieldCheck, CheckCircle2, MessageCircle, Send, Home, Sparkles } from 'lucide-react';
import { COMUNAS } from '../data/properties';

import { sendContactMessage } from '../services/pocketbase';

export const PublishWithUsView: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    comuna: 'Vitacura',
    propertyType: 'Casa',
    operation: 'Venta',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await sendContactMessage({
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: `Captación: ${form.operation} de ${form.propertyType} en ${form.comuna}`,
        message: form.message || `El cliente solicita captación y comercialización para su propiedad (${form.propertyType} en ${form.comuna}) en modalidad ${form.operation}.`,
        source: 'publish_form',
      });
    } catch (err) {
      console.error('Error submitting publish form:', err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  const whatsappPublishMessage = encodeURIComponent(
    `Hola BANÁ Propiedades, deseo publicar mi propiedad para ${form.operation}. Es un(a) ${form.propertyType} en la comuna de ${form.comuna}. Mi nombre es ${form.name || 'Propietario'}.`
  );

  return (
    <div className="py-24 sm:py-28 bg-[#080e1b] min-h-screen text-slate-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-16">
        {/* ========================================================
            HEADER
            ======================================================== */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="framed text-[#dfb86c] border-[#dfb86c]/40 text-xs inline-block">
            Captación & Comercialización
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white uppercase tracking-tight leading-tight">
            Publica con Nosotros.
          </h1>
          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            Confía la venta o arriendo de tu propiedad a un equipo que cuida tu patrimonio con estrategia comercial, difusión de alto estándar y respaldo legal absoluto.
          </p>
        </div>

        {/* ========================================================
            NUESTROS COMPROMISOS PARA TU VENTA O ARRIENDO
            ======================================================== */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
              Nuestros Compromisos para tu Venta o Arriendo
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Maximizamos el valor de tu propiedad desde el primer día.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Compromiso 1 */}
            <div className="framed-box p-8 rounded-2xl flex flex-col justify-between group hover:border-[#dfb86c]/60 transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#dfb86c]/15 text-[#dfb86c] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Camera className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono text-[#dfb86c] tracking-widest uppercase block mb-1">
                  COMPROMISO 01
                </span>
                <h3 className="text-xl font-bold text-white uppercase mb-3">
                  1. Presentación Destacada
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Nos preocupamos de que cada foto y descripción muestre el mejor potencial de tu propiedad. Fotografía profesional, planos y redacción persuasiva que atraen compradores calificados.
                </p>
              </div>
            </div>

            {/* Compromiso 2 */}
            <div className="framed-box p-8 rounded-2xl flex flex-col justify-between group hover:border-[#dfb86c]/60 transition-all duration-300 bg-gradient-to-b from-[#0b1428] to-[#101e3b]">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#dfb86c]/20 text-[#fae6be] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono text-[#fae6be] tracking-widest uppercase block mb-1">
                  COMPROMISO 02
                </span>
                <h3 className="text-xl font-bold text-white uppercase mb-3">
                  2. Estrategia Comercial
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Analizamos el mercado local para definir un precio de salida competitivo y estratégico. Evitamos que tu propiedad se queme en portales y aceleramos los tiempos de cierre.
                </p>
              </div>
            </div>

            {/* Compromiso 3 */}
            <div className="framed-box p-8 rounded-2xl flex flex-col justify-between group hover:border-[#dfb86c]/60 transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#dfb86c]/15 text-[#dfb86c] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono text-[#dfb86c] tracking-widest uppercase block mb-1">
                  COMPROMISO 03
                </span>
                <h3 className="text-xl font-bold text-white uppercase mb-3">
                  3. Tranquilidad Legal
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Te acompañamos en todo el proceso de contratos, escrituras y el resguardo de tus pagos. Verificamos solvencia de compradores y gestionamos el cierre en notaría y CBR sin imprevistos.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            FORMULARIO DE CAPTACIÓN SIMPLE
            ======================================================== */}
        <div className="max-w-3xl mx-auto rounded-3xl bg-[#0b1428] border border-[#dfb86c]/40 p-8 sm:p-12 shadow-2xl">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <span className="text-[11px] font-mono text-[#dfb86c] uppercase tracking-widest block">
              // FORMULARIO DE CAPTACIÓN SIMPLE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
              Ingresa los datos de tu propiedad
            </h2>
            <p className="text-xs text-slate-300">
              Nos contactaremos contigo en menos de 24 horas para coordinar la tasación inicial y sesión fotográfica.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Tu nombre y apellido"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#dfb86c]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Correo Electrónico *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="tu@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#dfb86c]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Teléfono / Celular *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+56 9 ..."
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#dfb86c]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Comuna de la Propiedad *
                  </label>
                  <select
                    value={form.comuna}
                    onChange={(e) => setForm({ ...form, comuna: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-xs text-white font-bold focus:outline-none focus:border-[#dfb86c]"
                  >
                    {COMUNAS.filter((c) => c !== 'Todas las comunas').map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Operación Deseada *
                  </label>
                  <select
                    value={form.operation}
                    onChange={(e) => setForm({ ...form, operation: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-xs text-white font-bold focus:outline-none focus:border-[#dfb86c]"
                  >
                    <option value="Venta">Venta</option>
                    <option value="Arriendo">Arriendo</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Tipo de Propiedad *
                </label>
                <select
                  value={form.propertyType}
                  onChange={(e) => setForm({ ...form, propertyType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-xs text-white font-bold focus:outline-none focus:border-[#dfb86c]"
                >
                  <option value="Casa">Casa</option>
                  <option value="Parcela">Parcela</option>
                  <option value="Terreno">Terreno</option>
                  <option value="Departamento">Departamento / Penthouse</option>
                  <option value="Local Comercial">Local Comercial u Oficina</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Mensaje / Características del Inmueble
                </label>
                <textarea
                  rows={4}
                  placeholder="Cuéntanos brevemente sobre los m², dormitorios, baños, estado o expectativas de valor..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#dfb86c] resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 btn-rounded btn-primary-propper py-3.5 justify-center text-xs font-bold uppercase shadow-xl cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Datos de Propiedad</span>
                </button>

                <a
                  href={`https://wa.me/56923807285?text=${whatsappPublishMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-rounded bg-emerald-600 hover:bg-emerald-500 text-white justify-center text-xs py-3.5 px-6 font-bold uppercase"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Publicar por WhatsApp</span>
                </a>
              </div>
            </form>
          ) : (
            <div className="py-12 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white uppercase">
                ¡Solicitud de Captación Recibida!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Gracias <strong>{form.name}</strong>. Nos comunicaremos contigo para iniciar el proceso de tasación y plan de marketing exclusivo para tu <strong>{form.propertyType}</strong> en <strong>{form.comuna}</strong>.
              </p>
              <div className="pt-2">
                <a
                  href={`https://wa.me/56923807285?text=${whatsappPublishMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 btn-rounded btn-primary-propper text-xs py-3 px-6 uppercase"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>Contactar al Broker por WhatsApp ahora</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
