import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageCircle, Calendar } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', comuna: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', phone: '', comuna: '', message: '' });
    }, 5000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hola BANÁ Propiedades, me comunico a través del formulario de contacto web. Mi nombre es ${form.name || 'Cliente'}.`
  );

  return (
    <div className="py-24 sm:py-28 bg-[#080e1b] min-h-screen text-slate-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="framed text-[#dfb86c] border-[#dfb86c]/40 text-xs inline-block">
            Atención Personalizada
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white uppercase tracking-tight leading-tight">
            Contacto Directo.
          </h1>
          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            Estamos disponibles para responder tus dudas inmobiliarias, coordinar visitas a propiedades o agendar reuniones con nuestro equipo legal y técnico.
          </p>
        </div>

        {/* Info Grid (Teléfonos, Horarios Flexibles, Correos) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Teléfono & WhatsApp */}
          <div className="framed-box p-7 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#dfb86c]/15 text-[#dfb86c] flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white uppercase">
              Teléfono Directo & WhatsApp
            </h3>
            <p className="text-sm font-bold text-[#dfb86c]">
              +56 9 2380 7285
            </p>
            <p className="text-xs text-slate-400">
              Llamada directa o mensaje vía WhatsApp con respuesta inmediata de nuestro equipo.
            </p>
          </div>

          {/* Correos Corporativos */}
          <div className="framed-box p-7 rounded-2xl space-y-3 bg-gradient-to-b from-[#0b1428] to-[#101e3b]">
            <div className="w-10 h-10 rounded-xl bg-[#dfb86c]/20 text-[#fae6be] flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white uppercase">
              Correos Corporativos
            </h3>
            <p className="text-xs text-slate-300 font-mono">
              contacto@banapropiedades.cl
            </p>
            <p className="text-xs text-slate-400">
              Para consultas de corredaje, tasaciones o saneamiento de herencias.
            </p>
          </div>

          {/* Horarios de Atención Flexibles */}
          <div className="framed-box p-7 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#dfb86c]/15 text-[#dfb86c] flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white uppercase">
              Horarios Flexibles
            </h3>
            <div className="text-xs text-slate-300 space-y-1">
              <p><strong className="text-white">Lunes a Viernes:</strong> 08:30 a 20:00 hrs</p>
              <p><strong className="text-white">Sábados y Domingos:</strong> Visitas programadas</p>
              <p className="text-[#dfb86c] text-[11px] font-semibold">Atención de urgencias vía WhatsApp</p>
            </div>
          </div>
        </div>

        {/* Form and Map Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          {/* Form */}
          <div className="lg:col-span-6 framed-box p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-white uppercase mb-2">
              Envíanos un Mensaje
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Completa el formulario y nos contactaremos contigo a la brevedad.
            </p>

            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Correo Electrónico *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="tu@correo.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                      placeholder="+56 9 ..."
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#dfb86c]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Comuna de Interés
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Las Condes, Vitacura, Concón, Chicureo..."
                    value={form.comuna}
                    onChange={(e) => setForm({ ...form, comuna: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#dfb86c]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Consulta o Mensaje *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Escribe tu consulta sobre compra, venta, arriendo o asesoría..."
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
                    <span>Enviar Mensaje</span>
                  </button>

                  <a
                    href={`https://wa.me/56923807285?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-rounded bg-emerald-600 hover:bg-emerald-500 text-white justify-center text-xs py-3.5 px-6 font-bold uppercase"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white uppercase">
                  ¡Mensaje Enviado con Éxito!
                </h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Un broker especialista de BANÁ Propiedades se pondrá en contacto contigo a la brevedad.
                </p>
              </div>
            )}
          </div>

          {/* Map and Physical Offices */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative rounded-3xl overflow-hidden aspect-[16/10] bg-slate-900 border border-white/10 shadow-xl">
              <iframe
                title="Santiago Oriente Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53282.83606990264!2d-70.61287418296068!3d-33.398254425667794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf55ec5c93cb%3A0xe54d39ee263625f3!2sVitacura%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1700000000000!5m2!1ses-419!2scl"
                className="w-full h-full border-0 grayscale invert opacity-75 hover:opacity-100 transition-opacity"
                loading="lazy"
              ></iframe>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#0b1428] border border-white/10 space-y-2">
                <span className="text-[10px] font-mono text-[#dfb86c] uppercase block">
                  SEDE PRINCIPAL RM
                </span>
                <h4 className="text-sm font-bold text-white uppercase">
                  Santiago Oriente
                </h4>
                <p className="text-xs text-slate-300 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#dfb86c] shrink-0 mt-0.5" />
                  <span>Av. El Golf 40, Las Condes, Santiago</span>
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0b1428] border border-white/10 space-y-2">
                <span className="text-[10px] font-mono text-[#dfb86c] uppercase block">
                  SEDE COSTA
                </span>
                <h4 className="text-sm font-bold text-white uppercase">
                  Quinta Región
                </h4>
                <p className="text-xs text-slate-300 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#dfb86c] shrink-0 mt-0.5" />
                  <span>Av. Libertad 1405, Viña del Mar</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
