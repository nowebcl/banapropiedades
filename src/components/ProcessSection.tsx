import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Camera, ShieldCheck, ArrowRight, BarChart3, CheckCircle2 } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Valuar',
      subtitle: 'con precisión algorítmica',
      desc: 'Analizamos transacciones reales inscritas en el Conservador de Bienes Raíces y oferta viva para fijar el precio óptimo por m² que maximice tu retorno sin estancar la venta.',
      details: [
        'Estudio de mercado comparativo (CBR + Portales)',
        'Tasación certificada por peritos ASATCH',
        'Definición de estrategia fiscal y tributaria'
      ],
      color: '#99e9f2', // cyan pastel
      tag: 'FASE INICIAL'
    },
    {
      num: '02',
      title: 'Posicionar',
      subtitle: 'con curaduría audiovisual',
      desc: 'Transformamos tu propiedad en una pieza de deseo mediante fotografía HDR de arquitectura, video aéreo en dron 4K, recorridos 3D Matterport y campañas ultra-segmentadas a compradores de alto patrimonio.',
      details: [
        'Home Staging y estilismo de espacios',
        'Tour virtual 3D inmersivo Matterport Pro',
        'Pauta digital segmentada en Meta Ads & Google'
      ],
      color: '#a5d8ff', // blue pastel
      tag: 'MARKETING ELITE'
    },
    {
      num: '03',
      title: 'Cerrar',
      subtitle: '& acompañamiento notarial',
      desc: 'Filtramos a clientes con financiamiento aprobado o fondos líquidos inmediatos. Redactamos promesas y escrituras blindadas con acompañamiento de nuestros abogados hasta la entrega material de llaves.',
      details: [
        'Precalificación bancaria del comprador',
        'Estudio de títulos y redacción legal exprés',
        'Coordinación de firma notarial y entrega de fondos'
      ],
      color: '#d0bfff', // purple pastel
      tag: 'CIERRE SEGURO'
    }
  ];

  return (
    <section id="metodo" className="relative py-24 lg:py-32 bg-[#060b16] text-white overflow-hidden border-t border-white/5">
      {/* Ambient background blur */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-cyan-500/[0.04] blur-[120px] pointer-events-none"></div>
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section Heading with dynamic large typography */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-end mb-16">
          <div>
            <div className="inline-flex items-center gap-3 text-xs font-mono text-cyan-400 mb-6">
              <span className="w-10 h-px bg-cyan-400"></span>
              <span>02 // MÉTODO BANÁ</span>
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-8xl font-display tracking-tight leading-[0.88]">
              <span className="block">Valuar.</span>
              <span className="block text-slate-500">Posicionar.</span>
              <span className="block text-slate-700">Cerrar.</span>
            </h2>
          </div>

          <div className="pb-2">
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-lg">
              Un estándar inmobiliario contemporáneo que combina inteligencia de datos de mercado con producción estética de nivel internacional para comercializar propiedades en tiempo récord.
            </p>
          </div>
        </div>

        {/* 3 Step Interactive Cards (Replicating the exact Compute interactive mechanism) */}
        <div className="grid lg:grid-cols-3 gap-4 lg:gap-6">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <div
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`relative text-left p-8 lg:p-10 rounded-2xl border transition-all duration-500 cursor-pointer ${
                  isActive
                    ? 'bg-[#0c162e] border-cyan-500/50 shadow-2xl shadow-cyan-950/40'
                    : 'bg-[#080e1b] border-white/10 hover:border-white/20'
                }`}
              >
                {/* Step Top Bar with Progress Line */}
                <div className="flex items-center justify-between gap-4 mb-8">
                  <div className="flex items-center gap-4 flex-1">
                    <span
                      className="text-4xl font-display transition-colors duration-300"
                      style={{ color: isActive ? step.color : '#64748b' }}
                    >
                      {step.num}
                    </span>
                    <div className="flex-1 h-px bg-white/10 overflow-hidden relative">
                      <div
                        className="h-full transition-all duration-500"
                        style={{
                          backgroundColor: step.color,
                          width: isActive ? '100%' : '0%',
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-white/5">
                    {step.tag}
                  </span>
                </div>

                {/* Step Title & Subtitle */}
                <h3 className="text-3xl lg:text-4xl font-display text-white mb-1">
                  {step.title}
                </h3>
                <span className="text-sm font-mono text-cyan-300/80 block mb-4">
                  {step.subtitle}
                </span>

                {/* Description */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {step.desc}
                </p>

                {/* Bullets */}
                <div className="space-y-2 pt-4 border-t border-white/5">
                  {step.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2
                        className="w-3.5 h-3.5 shrink-0"
                        style={{ color: isActive ? step.color : '#64748b' }}
                      />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Active Indicator Underline */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 transition-transform duration-500 origin-left rounded-b-2xl"
                  style={{
                    backgroundColor: step.color,
                    transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
