import React, { useState } from 'react';
import { Hammer, CheckCircle2, MessageCircle, Sparkles, Compass, ShieldCheck, Ruler, ArrowRight, HardHat } from 'lucide-react';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { RemodelingCalculator } from './RemodelingCalculator';
import { REMODELING_PROJECTS } from '../data/remodelingData';

export const ConstructionView: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(REMODELING_PROJECTS[0].id);
  const activeProject = REMODELING_PROJECTS.find((p) => p.id === selectedProjectId) || REMODELING_PROJECTS[0];

  const michaelWaMessage = encodeURIComponent(
    'Hola Michael Montecinos (Gerente de Proyectos LCE Construcciones / Baná Propiedades), deseo cotizar un proyecto de construcción/remodelación.'
  );

  return (
    <div className="py-24 sm:py-28 bg-[#080e1b] min-h-screen text-slate-100">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 space-y-16 sm:space-y-20">
        {/* ========================================================
            HEADER & INTRO SECTION
            ======================================================== */}
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#dfb86c]/15 border border-[#dfb86c]/40 text-[#dfb86c] text-[11px] font-mono tracking-widest uppercase font-semibold">
            <Hammer className="w-3.5 h-3.5" />
            ALIANZA ESTRATÉGICA BANÁ PROPIEDADES & LCE CONSTRUCCIONES
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white uppercase tracking-tight leading-tight">
            Soluciones de Construcción: De la idea a las llaves en mano.
          </h1>

          <div className="p-6 rounded-2xl bg-[#0b1428] border border-white/10 text-left sm:text-center shadow-xl">
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light">
              "En Baná Propiedades te acompañamos en todo el camino. Si compraste un terreno o quieres renovar tu propiedad, ponemos a tu disposición nuestra alianza estratégica permanente con <strong className="text-white font-bold">LCE Construcciones</strong>. Nos encargamos del diseño, la planificación y la ejecución técnica de tu proyecto con profesionalismo, transparencia y la confianza de un equipo familiar."
            </p>
          </div>

          {/* Core WhatsApp CTA to Michael Montecinos */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/56923807285?text=${michaelWaMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-rounded btn-primary-propper py-4 px-8 text-xs sm:text-sm font-bold shadow-xl shadow-[#dfb86c]/25 uppercase"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950 text-slate-950" />
              <span>Cotizar Proyecto de Construcción vía WhatsApp</span>
            </a>
            <span className="text-[11px] font-mono text-slate-400">
              Conecta directo con <strong>Michael Montecinos</strong> (Gerente de Proyectos)
            </span>
          </div>
        </div>

        {/* ========================================================
            NUESTROS SERVICIOS DE CONSTRUCCIÓN (3 Pilares)
            ======================================================== */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="framed text-[#dfb86c] border-[#dfb86c]/40 mb-2 inline-block text-xs">
              Servicios Integrales
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
              Nuestros Servicios de Construcción
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Solución integral para propietarios de parcelas, terrenos y viviendas que buscan tranquilidad absoluta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* 1. Casas a Medida (Llave en Mano) */}
            <div className="framed-box p-7 sm:p-8 rounded-2xl flex flex-col justify-between group hover:border-[#dfb86c]/60 transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#dfb86c]/15 text-[#dfb86c] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <HardHat className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono text-[#dfb86c] tracking-widest uppercase block mb-1">
                  01 / RESIDENCIAL
                </span>
                <h3 className="text-xl font-bold text-white uppercase mb-3">
                  Casas a Medida (Llave en Mano)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  Diseños personalizados que se adaptan a tu presupuesto y estilo de vida, gestionando permisos y construcción de principio a fin.
                </p>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-white/10 check-marks">
                <li>Planos arquitectónicos y render 3D</li>
                <li>Tramitación municipal y recepción final</li>
                <li>Presupuesto cerrado sin sorpresas</li>
              </ul>
            </div>

            {/* 2. Obras Complementarias */}
            <div className="framed-box p-7 sm:p-8 rounded-2xl flex flex-col justify-between group hover:border-[#dfb86c]/60 transition-all duration-300 bg-gradient-to-b from-[#0b1428] to-[#101e3b]">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#dfb86c]/20 text-[#fae6be] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Ruler className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono text-[#fae6be] tracking-widest uppercase block mb-1">
                  02 / EXTERIORES & RECREACIÓN
                </span>
                <h3 className="text-xl font-bold text-white uppercase mb-3">
                  Obras Complementarias
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  Quinchos, piscinas, terrazas, cobertizos y cierres perimetrales para disfrutar al máximo tu parcela o patio.
                </p>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-white/10 check-marks">
                <li>Quinchos modernos y rústicos a leña/gas</li>
                <li>Piscinas de hormigón armado e infinity</li>
                <li>Cierres perimetrales y portones automáticos</li>
              </ul>
            </div>

            {/* 3. Evaluación Técnica en Terreno */}
            <div className="framed-box p-7 sm:p-8 rounded-2xl flex flex-col justify-between group hover:border-[#dfb86c]/60 transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#dfb86c]/15 text-[#dfb86c] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono text-[#dfb86c] tracking-widest uppercase block mb-1">
                  03 / FACTIBILIDAD PREVIA
                </span>
                <h3 className="text-xl font-bold text-white uppercase mb-3">
                  Evaluación Técnica en Terreno
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  Te asesoramos antes de comprar analizando la factibilidad de agua, luz, pendientes y tipo de suelo.
                </p>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-white/10 check-marks">
                <li>Estudio de mecánicas de suelo y pendientes</li>
                <li>Factibilidad de empalme eléctrico y APR</li>
                <li>Cálculo de movimiento de tierras</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ========================================================
            INTERACTIVE BEFORE / AFTER SLIDER SHOWCASE
            ======================================================== */}
        <section className="space-y-8 pt-4">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="framed text-[#dfb86c] border-[#dfb86c]/40 text-xs">
              Galería Interactiva
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
              Transformaciones Antes y Después
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Desliza el divisor central para comparar el estado original y la entrega final ejecutada.
            </p>
          </div>

          {/* Project Switcher Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {REMODELING_PROJECTS.map((p) => {
              const isSelected = p.id === selectedProjectId;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedProjectId(p.id)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-[#dfb86c] text-slate-950 font-bold shadow-lg shadow-[#dfb86c]/25 scale-105'
                      : 'bg-[#0f1b35] text-slate-300 hover:bg-[#15264a] border border-white/10'
                  }`}
                >
                  {p.comuna} — {p.categoryLabel}
                </button>
              );
            })}
          </div>

          {/* Visual Slider */}
          <div className="w-full flex justify-center pt-2">
            <BeforeAfterSlider project={activeProject} />
          </div>
        </section>

        {/* ========================================================
            REMODELING & CONSTRUCTION CALCULATOR
            ======================================================== */}
        <section className="pt-4">
          <RemodelingCalculator />
        </section>

        {/* ========================================================
            FINAL BANNER CTA CONVERSATION
            ======================================================== */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0b1428] via-[#111f3d] to-[#0b1428] border border-[#dfb86c]/40 text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
            ¿Tienes un terreno o parcela y quieres dar el primer paso?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Coordinamos una reunión técnica en terreno con Michael Montecinos para revisar factibilidad, diseño preliminar y presupuesto exacto.
          </p>
          <div>
            <a
              href={`https://wa.me/56923807285?text=${michaelWaMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-rounded btn-primary-propper py-4 px-8 text-xs sm:text-sm font-bold uppercase shadow-xl shadow-[#dfb86c]/20"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>Contactar a Michael Montecinos vía WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
