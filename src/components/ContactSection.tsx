import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2, MessageCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', phone: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 bg-[#060c18] border-t border-white/10">
      <div className="max-w-[1240px] mx-auto px-6">
        <span className="framed text-[#dfb86c] border-[#dfb86c]/40 mb-3 inline-block">
          Ubicaciones & Contacto
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight mb-12">
          Contacto Directo.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Map Preview + Addresses & Socials */}
          <div className="lg:col-span-6 space-y-8">
            {/* Styled Map Box */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-slate-900 border border-white/10">
              <iframe
                title="Santiago Oriente Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53282.83606990264!2d-70.61287418296068!3d-33.398254425667794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf55ec5c93cb%3A0xe54d39ee263625f3!2sVitacura%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1700000000000!5m2!1ses-419!2scl"
                className="w-full h-full border-0 grayscale invert opacity-75 hover:opacity-100 transition-opacity"
                loading="lazy"
              ></iframe>
            </div>

            {/* Address Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Oficina Santiago Oriente
                </h3>
                <address className="not-italic text-xs text-slate-300 space-y-1">
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#dfb86c] shrink-0" />
                    <span>Av. El Golf 40, Las Condes, RM</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#dfb86c] shrink-0" />
                    <span>+56 9 2380 7285</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#dfb86c] shrink-0" />
                    <span>santiago@banapropiedades.cl</span>
                  </p>
                </address>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Oficina Quinta Región
                </h3>
                <address className="not-italic text-xs text-slate-300 space-y-1">
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#dfb86c] shrink-0" />
                    <span>Av. Libertad 1405, Viña del Mar</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#dfb86c] shrink-0" />
                    <span>+56 9 2380 7285</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#dfb86c] shrink-0" />
                    <span>costa@banapropiedades.cl</span>
                  </p>
                </address>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-4">
              <a
                href="https://wa.me/56923807285"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-rounded btn-framed-propper text-xs"
              >
                <MessageCircle className="w-4 h-4 text-[#dfb86c]" />
                <span>WhatsApp Directo</span>
              </a>
            </div>
          </div>

          {/* Right Column: Propper Contact Form */}
          <div className="lg:col-span-6 framed-box p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-white uppercase mb-6">
              Envíanos un Mensaje
            </h3>

            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Nombre Completo *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Tu nombre"
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

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Teléfono / Celular
                  </label>
                  <input
                    type="tel"
                    placeholder="+56 9 ..."
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#dfb86c]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Mensaje o Consulta *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Escribe tu consulta sobre compra, venta o arriendo..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#dfb86c] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-rounded btn-primary-propper py-3 px-8 text-xs font-bold uppercase"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Mensaje</span>
                </button>
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
        </div>
      </div>
    </section>
  );
};
