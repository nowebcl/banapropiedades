import React, { useState } from 'react';
import { Scale, FileText, CheckCircle2, MessageCircle, Send, Building, ShieldCheck, HelpCircle } from 'lucide-react';

export const SpecializedServicesView: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    comuna: '',
    serviceType: 'Posesión Efectiva y Saneamiento de Títulos',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappInquiry = encodeURIComponent(
    `Hola BANÁ Propiedades, solicito asesoría técnica/legal para el servicio de: ${form.serviceType}. Mi nombre es ${form.name || 'Cliente'} en ${form.comuna || 'RM/Quinta Región'}.`
  );

  return (
    <div className="py-24 sm:py-28 bg-[#080e1b] min-h-screen text-slate-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-16">
        {/* ========================================================
            HEADER
            ======================================================== */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="framed text-[#dfb86c] border-[#dfb86c]/40 text-xs inline-block">
            Rigor Jurídico & Técnico
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white uppercase tracking-tight leading-tight">
            Asesoría Técnica y Legal Inmobiliaria.
          </h1>
          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            Resolvemos las trabas burocráticas, regularizamos construcciones y valoramos con rigor técnico tu inmueble para garantizar operaciones limpias y seguras.
          </p>
        </div>

        {/* ========================================================
            LOS 3 SERVICIOS ESPECIALIZADOS
            ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* 1. Tasación Profesional de Propiedades */}
          <div className="framed-box p-8 rounded-2xl flex flex-col justify-between group hover:border-[#dfb86c]/60 transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#dfb86c]/15 text-[#dfb86c] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Scale className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono text-[#dfb86c] tracking-widest uppercase block mb-1">
                // ANÁLISIS DE MERCADO REAL
              </span>
              <h3 className="text-xl font-bold text-white uppercase mb-4">
                1. Tasación Profesional de Propiedades
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Determinamos el valor real de tu propiedad basándonos en análisis de mercado reales, normativa urbana y estado constructivo del inmueble. Ideal para procesos de venta, herencias, subdivisiones o garantías bancarias.
              </p>
            </div>
            <ul className="text-xs text-slate-300 space-y-2 pt-4 border-t border-white/10 check-marks">
              <li>Informe técnico firmado por perito tasador</li>
              <li>Estudio comparativo de mercado (ofertas y transacciones reales)</li>
              <li>Valor en UF y pesos según plusvalía de la zona</li>
            </ul>
          </div>

          {/* 2. Posesión Efectiva y Saneamiento de Títulos */}
          <div className="framed-box p-8 rounded-2xl flex flex-col justify-between group hover:border-[#dfb86c]/60 transition-all duration-300 bg-gradient-to-b from-[#0b1428] to-[#101e3b]">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#dfb86c]/20 text-[#fae6be] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono text-[#fae6be] tracking-widest uppercase block mb-1">
                // HERENCIAS & CBR
              </span>
              <h3 className="text-xl font-bold text-white uppercase mb-4">
                2. Posesión Efectiva y Saneamiento de Títulos
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                ¿Heredaste una propiedad o terreno y no sabes cómo iniciar la venta? Nosotros resolvemos todo el trámite legal: tramitación de la Posesión Efectiva, declaración de impuesto a la herencia en el SII, e inscripción en el Conservador de Bienes Raíces (CBR) para dejar la propiedad en regla y lista para ser transferida.
              </p>
            </div>
            <ul className="text-xs text-slate-300 space-y-2 pt-4 border-t border-white/10 check-marks">
              <li>Tramitación Registro Civil y resolución exenta</li>
              <li>Cálculo de exenciones y declaración F4412 ante el SII</li>
              <li>Inscripción especial de herencia en el CBR respectivo</li>
            </ul>
          </div>

          {/* 3. Regularización de Edificaciones */}
          <div className="framed-box p-8 rounded-2xl flex flex-col justify-between group hover:border-[#dfb86c]/60 transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#dfb86c]/15 text-[#dfb86c] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono text-[#dfb86c] tracking-widest uppercase block mb-1">
                // RECEPCIÓN MUNICIPAL
              </span>
              <h3 className="text-xl font-bold text-white uppercase mb-4">
                3. Regularización de Edificaciones
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Regularizamos ampliaciones o construcciones sin recepción municipal para que tu propiedad cumpla con las normativas vigentes y pueda ser vendida mediante crédito hipotecario.
              </p>
            </div>
            <ul className="text-xs text-slate-300 space-y-2 pt-4 border-t border-white/10 check-marks">
              <li>Levantamiento de planos arquitectónicos actualizados</li>
              <li>Cumplimiento de la Ley del Mono u ordenanza general de urbanismo</li>
              <li>Obtención del Certificado de Recepción Definitiva DOM</li>
            </ul>
          </div>
        </div>

        {/* ========================================================
            FORMULARIO DIRECTO: "Solicita tu asesoría técnica o legal aquí"
            ======================================================== */}
        <div className="max-w-3xl mx-auto rounded-3xl bg-[#0b1428] border border-[#dfb86c]/40 p-8 sm:p-12 shadow-2xl">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <span className="text-[11px] font-mono text-[#dfb86c] uppercase tracking-widest block">
              // CONTACTO DIRECTO DE ASESORÍA
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
              Solicita tu asesoría técnica o legal aquí
            </h2>
            <p className="text-xs text-slate-300">
              Completa el formulario y un especialista legal y técnico de Baná Propiedades te responderá en menos de 24 horas.
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
                    placeholder="Ej. Francisca Valenzuela"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#dfb86c]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+56 9 1234 5678"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#dfb86c]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Correo Electrónico *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="nombre@email.cl"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#dfb86c]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Comuna / Región de la Propiedad *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Ej. Las Condes, Vitacura, Concón, etc."
                    value={form.comuna}
                    onChange={(e) => setForm({ ...form, comuna: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#dfb86c]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Trámite o Asesoría Requerida *
                </label>
                <select
                  value={form.serviceType}
                  onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-xs text-white font-bold focus:outline-none focus:border-[#dfb86c]"
                >
                  <option value="Tasación Profesional de Propiedades">Tasación Profesional de Propiedades</option>
                  <option value="Posesión Efectiva y Saneamiento de Títulos">Posesión Efectiva y Saneamiento de Títulos (Herencia)</option>
                  <option value="Regularización de Edificaciones">Regularización de Edificaciones / Ampliaciones DOM</option>
                  <option value="Estudio de Títulos para Compraventa">Estudio de Títulos para Compraventa</option>
                  <option value="Otro Trámite Legal / Inmobiliario">Otro Trámite Legal / Inmobiliario</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Detalles o Dudas sobre tu Caso
                </label>
                <textarea
                  rows={4}
                  placeholder="Explícanos brevemente la situación de la propiedad (si cuenta con rol, herederos involucrados, ampliación sin recepcionar, etc.)..."
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
                  <span>Enviar Solicitud de Asesoría</span>
                </button>

                <a
                  href={`https://wa.me/56923807285?text=${whatsappInquiry}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-rounded bg-emerald-600 hover:bg-emerald-500 text-white justify-center text-xs py-3.5 px-6 font-bold uppercase"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Consultar por WhatsApp</span>
                </a>
              </div>
            </form>
          ) : (
            <div className="py-12 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white uppercase">
                ¡Solicitud de Asesoría Recibida!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Hemos registrado tus datos para el servicio de <strong>{form.serviceType}</strong>. Nuestro equipo jurídico y técnico se comunicará contigo a la brevedad.
              </p>
              <div className="pt-2">
                <a
                  href={`https://wa.me/56923807285?text=${whatsappInquiry}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 btn-rounded btn-primary-propper text-xs py-3 px-6 uppercase"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>Escribir ahora a WhatsApp para atención inmediata</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
