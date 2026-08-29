import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Activity, BarChart2, ShieldCheck, MapPin, Zap, ArrowUpRight } from 'lucide-react';

export const MetricsSection: React.FC = () => {
  const [activeZone, setActiveZone] = useState<'RM' | 'COSTA'>('RM');

  const zoneData = {
    RM: [
      { comuna: 'Vitacura (Nueva Costanera / Lo Curro)', priceUFm2: '94.8 UF/m²', growth: '+8.4%', speed: '16 días' },
      { comuna: 'Las Condes (El Golf / San Damián)', priceUFm2: '89.2 UF/m²', growth: '+7.6%', speed: '19 días' },
      { comuna: 'Lo Barnechea (Los Trapenses / La Dehesa)', priceUFm2: '82.5 UF/m²', growth: '+6.9%', speed: '24 días' },
      { comuna: 'Providencia (Pedro de Valdivia / El Bosque)', priceUFm2: '78.4 UF/m²', growth: '+5.8%', speed: '14 días' },
    ],
    COSTA: [
      { comuna: 'Zapallar & Cachagua (Primera Línea)', priceUFm2: '112.0 UF/m²', growth: '+12.4%', speed: '21 días' },
      { comuna: 'Maitencillo (Aguas Blancas / Cerro)', priceUFm2: '74.5 UF/m²', growth: '+9.8%', speed: '28 días' },
      { comuna: 'Concón (Costa de Montemar / Bosques)', priceUFm2: '71.2 UF/m²', growth: '+8.9%', speed: '17 días' },
      { comuna: 'Viña del Mar & Reñaca (Cochoa)', priceUFm2: '68.0 UF/m²', growth: '+7.1%', speed: '22 días' },
    ],
  };

  return (
    <section id="metricas" className="relative py-24 lg:py-32 bg-[#080e1b] overflow-hidden border-t border-white/5">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none"></div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16 items-end">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center gap-2 px-3 py-1 bg-cyan-950/70 border border-cyan-400/30 text-cyan-300 text-xs font-mono rounded-full">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                DATOS EN TIEMPO REAL
              </span>
              <span className="text-xs font-mono text-slate-400">03 // INTELIGENCIA INMOBILIARIA</span>
            </div>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-normal text-white tracking-tight leading-[0.95]">
              Métricas de mercado <br />
              <span className="text-slate-400">en RM & Costa.</span>
            </h2>
          </div>

          <div className="lg:col-span-4">
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              Monitoreamos transacciones efectivas y plusvalía en tiempo real para brindarte recomendaciones de precio y retorno con fundamento estadístico.
            </p>
          </div>
        </div>

        {/* Real-time Metrics Big Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-12">
          {/* Card 1 */}
          <div className="p-8 rounded-2xl bg-[#0c162e] border border-white/10 flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/30 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl"></div>
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
                <span>UF / METRO CUADRADO</span>
                <span className="text-cyan-400 font-semibold">+8.2% interanual</span>
              </div>
              <div className="text-4xl sm:text-5xl font-display text-white mb-2">
                86.4 UF<span className="text-xl text-slate-400 font-normal">/m²</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Promedio ponderado sector oriente (Vitacura, Las Condes, Lo Barnechea).
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-slate-400">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>Actualizado este trimestre</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-2xl bg-[#0c162e] border border-white/10 flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/30 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl"></div>
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
                <span>VELOCIDAD DE VENTA</span>
                <span className="text-emerald-400 font-semibold">-82% vs mercado</span>
              </div>
              <div className="text-4xl sm:text-5xl font-display text-white mb-2">
                18.5 Días
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tiempo promedio de cierre con el Método Baná vs 110 días promedio industria.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-slate-400">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cartera de compradores activos</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-2xl bg-[#0c162e] border border-white/10 flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/30 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl"></div>
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
                <span>RATIO DE CIERRE EFECTIVO</span>
                <span className="text-cyan-400 font-semibold">99.2% de éxito</span>
              </div>
              <div className="text-4xl sm:text-5xl font-display text-white mb-2">
                98.4%
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Precio de venta final obtenido vs valor de tasación inicial publicado.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Sin rebajas especulativas</span>
            </div>
          </div>
        </div>

        {/* Detailed Comuna Price Breakdown Table with interactive tab switch */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0c162e] border border-white/10 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <h3 className="text-xl sm:text-2xl font-display text-white mb-1">
                Comparativa por Comuna & Micro-Sectores
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Valores de metro cuadrado útil promedio y velocidad de transacción
              </p>
            </div>

            <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-white/10 self-start sm:self-auto">
              <button
                onClick={() => setActiveZone('RM')}
                className={`px-4 py-2 rounded-lg text-xs font-mono transition-all ${
                  activeZone === 'RM'
                    ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Santiago Oriente (RM)
              </button>
              <button
                onClick={() => setActiveZone('COSTA')}
                className={`px-4 py-2 rounded-lg text-xs font-mono transition-all ${
                  activeZone === 'COSTA'
                    ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Quinta Región Costa
              </button>
            </div>
          </div>

          <div className="divide-y divide-white/5 pt-2">
            {zoneData[activeZone].map((item, idx) => (
              <div
                key={idx}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-900/30 px-3 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-cyan-400 w-6">0{idx + 1}</span>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-white">{item.comuna}</span>
                    <span className="text-[11px] font-mono text-slate-500">Zona Prime Certificada</span>
                  </div>
                </div>

                <div className="flex items-center gap-6 sm:gap-12 text-xs font-mono">
                  <div className="flex flex-col sm:items-end">
                    <span className="text-[10px] text-slate-400 uppercase">Valor Promedio</span>
                    <span className="text-sm text-cyan-300 font-semibold">{item.priceUFm2}</span>
                  </div>

                  <div className="flex flex-col sm:items-end">
                    <span className="text-[10px] text-slate-400 uppercase">Plusvalía 12M</span>
                    <span className="text-emerald-400 font-semibold">{item.growth}</span>
                  </div>

                  <div className="flex flex-col sm:items-end">
                    <span className="text-[10px] text-slate-400 uppercase">Velocidad</span>
                    <span className="text-white">{item.speed}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
