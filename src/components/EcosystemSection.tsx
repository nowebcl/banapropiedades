import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, Landmark, FileText, Camera, Scale, Award, 
  Layers, ShieldCheck, CheckCircle2, ArrowUpRight 
} from 'lucide-react';

export const EcosystemSection: React.FC = () => {
  const integrations = [
    {
      category: 'DIFUSIÓN',
      name: 'Portales Inmobiliarios Líderes',
      desc: 'Sincronización multi-portal con posicionamiento destacado en PortalInmobiliario, TocToc, Proppit y vitrinas internacionales.',
      icon: Globe,
      color: '#99e9f2',
    },
    {
      category: 'FINANZAS',
      name: 'Banca Privada & Créditos Hipotecarios',
      desc: 'Convenios preferenciales y tasas de crédito exclusivas con Banco de Chile Private, Santander Select, BICE e Itaú.',
      icon: Landmark,
      color: '#a5d8ff',
    },
    {
      category: 'LEGAL',
      name: 'Notarías & Conservadores (CBR)',
      desc: 'Gestión y firma notarial preferente con tramitación express en Conservador de Bienes Raíces de Santiago y Viña del Mar.',
      icon: FileText,
      color: '#d0bfff',
    },
    {
      category: 'TECNOLOGÍA',
      name: 'Tour Virtual 3D & Dron 4K',
      desc: 'Captura inmersiva con cámaras Matterport Pro 3D y filmación aérea HDR con drones DJI para exhibición virtual internacional.',
      icon: Camera,
      color: '#fcc2d7',
    },
    {
      category: 'TRIBUTARIO',
      name: 'Asesoría Legal & Exenciones DFL-2',
      desc: 'Optimización tributaria, estructuración patrimonial y estudio de títulos riguroso a cargo de abogados especialistas.',
      icon: Scale,
      color: '#ffe066',
    },
    {
      category: 'PERITAJE',
      name: 'Tasaciones Certificadas ASATCH',
      desc: 'Informes periciales de tasación válidos ante entidades bancarias, tributarias y juzgados civiles en todo Chile.',
      icon: Award,
      color: '#b2f2bb',
    },
  ];

  return (
    <section className="relative py-24 lg:py-32 bg-[#060b16] overflow-hidden border-t border-white/5">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 text-xs font-mono text-cyan-400 mb-4 justify-center">
            <span className="w-8 h-px bg-cyan-400"></span>
            <span>04 // ECOSISTEMA INTEGRADO</span>
            <span className="w-8 h-px bg-cyan-400"></span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-display font-normal text-white tracking-tight mb-4">
            Alianzas estratégicas <br />
            <span className="text-slate-400">y red de primer nivel.</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Conectamos cada propiedad con los principales actores del sistema financiero, legal y tecnológico chileno para una transacción impecable.
          </p>
        </div>

        {/* Dynamic Connected Grid (Replicating the reference integrations matrix) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {integrations.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative p-6 sm:p-8 rounded-2xl bg-[#0b1428] border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10"
                      style={{ backgroundColor: `${item.color}15`, color: item.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-900 border border-white/10 text-slate-400">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-display text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 text-cyan-300">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Red Activa 24/7
                  </span>
                  <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
