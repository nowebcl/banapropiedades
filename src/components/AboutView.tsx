import React from 'react';
import { Award, ShieldCheck, HeartHandshake, Building, MessageCircle, Phone, Mail, Sparkles, CheckCircle2 } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="py-24 sm:py-28 bg-[#080e1b] min-h-screen text-slate-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-16 sm:space-y-20">
        {/* ========================================================
            HEADER
            ======================================================== */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="framed text-[#dfb86c] border-[#dfb86c]/40 text-xs inline-block">
            Liderazgo & Valores
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white uppercase tracking-tight leading-tight">
            Nosotros.
          </h1>
          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            Una visión inmobiliaria cercana, rigurosa y humana, respaldada por experiencia legal y técnica en la Región Metropolitana y la Quinta Región.
          </p>
        </div>

        {/* ========================================================
            SECCIÓN DE LIDERAZGO: GIOVANNA GONZÁLEZ
            ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center rounded-3xl bg-[#0b1428] border border-[#dfb86c]/35 p-6 sm:p-12 shadow-2xl">
          {/* Fotografía Corporativa de Alta Resolución */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-900 border-2 border-[#dfb86c]/40 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=85"
                alt="Giovanna González - Fundadora y Directora de Baná Propiedades"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080e1b] via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#080e1b]/90 backdrop-blur-md border border-white/10">
                <span className="text-[10px] font-mono text-[#dfb86c] uppercase tracking-wider block">
                  FUNDADORA & DIRECTORA
                </span>
                <h3 className="text-lg font-bold text-white uppercase">
                  Giovanna González
                </h3>
                <p className="text-xs text-slate-300">
                  Líder de Gestión Inmobiliaria • BANÁ Propiedades
                </p>
              </div>
            </div>
          </div>

          {/* Carta de Presentación de Giovanna González */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dfb86c]/15 text-[#dfb86c] text-[11px] font-mono uppercase tracking-wider">
              <HeartHandshake className="w-3.5 h-3.5" />
              CARTA DE NUESTRA DIRECTORA
            </div>

            <div className="space-y-4 text-slate-200 text-sm sm:text-base leading-relaxed font-light border-l-2 border-[#dfb86c] pl-4 sm:pl-6 italic">
              <p>
                "Bienvenidos a Baná Propiedades. Mi nombre es Giovanna González y fundé este espacio con el firme compromiso de ofrecer una gestión inmobiliaria diferente: transparente, cercana y libre de complicaciones.
              </p>
              <p>
                Sé que detrás de cada propiedad, terreno o parcela hay un esfuerzo inmenso y un sueño familiar. Por eso, mi prioridad es darte un trato directo y profesional, donde te sientas escuchado y respaldado en cada paso legal, comercial y técnico.
              </p>
              <p>
                Junto a nuestro equipo y nuestra alianza con LCE Construcciones, trabajamos para que tu próximo paso inmobiliario sea seguro, tranquilo y exitoso. Tu confianza es nuestra mayor responsabilidad."
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="https://wa.me/56923807285?text=Hola%20Giovanna%20González,%20me%20gustaría%20conversar%20sobre%20una%20gestión%20inmobiliaria."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-rounded btn-primary-propper py-3 px-6 text-xs font-bold uppercase shadow-xl"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contactar a Giovanna vía WhatsApp</span>
              </a>

              <a
                href="mailto:giovanna@banapropiedades.cl"
                className="btn-rounded btn-framed-propper py-3 px-6 text-xs font-semibold"
              >
                <Mail className="w-4 h-4" />
                <span>giovanna@banapropiedades.cl</span>
              </a>
            </div>
          </div>
        </div>

        {/* ========================================================
            NUESTRA VISIÓN & PILARES CORPORATIVOS
            ======================================================== */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="framed text-[#dfb86c] border-[#dfb86c]/40 text-xs inline-block mb-2">
              Nuestra Esencia
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
              ¿Por qué confiar en Baná Propiedades?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="framed-box p-7 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#dfb86c]/15 text-[#dfb86c] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white uppercase">
                Trato Humano y Cercano
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Sin intermediarios innecesarios. Cada cliente cuenta con la atención directa de profesionales comprometidos que conocen su historia y cuidan sus intereses.
              </p>
            </div>

            <div className="framed-box p-7 rounded-2xl space-y-3 bg-gradient-to-b from-[#0b1428] to-[#101e3b]">
              <div className="w-10 h-10 rounded-lg bg-[#dfb86c]/20 text-[#fae6be] flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white uppercase">
                Rigor Legal y Técnico
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Saneamiento de títulos, posesiones efectivas ante el SII y Conservadores, tasaciones con metodología profesional y regularizaciones municipales.
              </p>
            </div>

            <div className="framed-box p-7 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#dfb86c]/15 text-[#dfb86c] flex items-center justify-center">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white uppercase">
                Alianza Constructiva
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Con LCE Construcciones entregamos soluciones integrales: desde la compra del terreno hasta las llaves en mano, con total transparencia y garantía de obra.
              </p>
            </div>
          </div>
        </div>

        {/* Resumen de Presencia Territorial */}
        <div className="p-8 rounded-2xl bg-[#091122] border border-white/10 text-center space-y-4">
          <h3 className="text-xl font-bold text-white uppercase">
            Presencia en la RM & Quinta Región
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            Operamos con sedes en Las Condes (Santiago Oriente) y Viña del Mar, cubriendo activamente Vitacura, Lo Barnechea, Providencia, Chicureo, Zapallar, Cachagua, Maitencillo y Concón.
          </p>
        </div>
      </div>
    </div>
  );
};
