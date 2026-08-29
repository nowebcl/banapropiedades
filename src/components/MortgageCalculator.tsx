import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';
import { UF_VALUE } from '../data/properties';

export const MortgageCalculator: React.FC = () => {
  const [propertyValueUF, setPropertyValueUF] = useState<number>(18000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [termYears, setTermYears] = useState<number>(25);
  const [interestRate, setInterestRate] = useState<number>(4.6);

  // Calculations
  const downPaymentUF = (propertyValueUF * downPaymentPercent) / 100;
  const loanAmountUF = propertyValueUF - downPaymentUF;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = termYears * 12;

  const monthlyDividendUF =
    monthlyRate > 0
      ? (loanAmountUF * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : loanAmountUF / totalMonths;

  const monthlyDividendCLP = monthlyDividendUF * UF_VALUE;
  const minRequiredIncomeCLP = monthlyDividendCLP * 4; // Renta requerida suele ser 4x dividendo

  const formatCLP = (val: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="calculadora" className="relative py-24 lg:py-32 bg-[#080e1b] overflow-hidden border-t border-white/5">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Context */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-3 text-xs font-mono text-cyan-400">
              <span className="w-8 h-px bg-cyan-400"></span>
              <span>05 // SIMULADOR HIPOTECARIO</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-normal text-white tracking-tight leading-[1.05]">
              Planifica tu inversión <br />
              <span className="text-slate-400">con números claros.</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Calcula dividendos en UF y pesos chilenos según el valor de la propiedad, porcentaje de pie y plazo. Nuestros ejecutivos te gestionan la aprobación bancaria preferencial con las mejores tasas del mercado.
            </p>

            <div className="space-y-3 pt-4 border-t border-white/10 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Valor referencial UF: ${UF_VALUE.toLocaleString('es-CL')} CLP</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Convenio con 5 bancos líderes de plaza</span>
              </div>
            </div>
          </div>

          {/* Right Column: Calculator Box */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl bg-[#0c162e] border border-white/10 shadow-2xl shadow-black/60 space-y-8">
              {/* Sliders Grid */}
              <div className="space-y-6">
                {/* Property Value UF */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-mono text-slate-300 uppercase">
                      Valor de la Propiedad (UF)
                    </label>
                    <span className="text-lg font-display font-semibold text-cyan-300">
                      {propertyValueUF.toLocaleString('es-CL')} UF
                      <span className="text-xs font-mono text-slate-400 font-normal ml-2">
                        (≈ {formatCLP(propertyValueUF * UF_VALUE)})
                      </span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3000"
                    max="50000"
                    step="500"
                    value={propertyValueUF}
                    onChange={(e) => setPropertyValueUF(Number(e.target.value))}
                    className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                    <span>3.000 UF</span>
                    <span>25.000 UF</span>
                    <span>50.000 UF</span>
                  </div>
                </div>

                {/* Down Payment % */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-mono text-slate-300 uppercase">
                      Pie Inicial ({downPaymentPercent}%)
                    </label>
                    <span className="text-sm font-mono text-cyan-300">
                      {downPaymentUF.toLocaleString('es-CL')} UF
                      <span className="text-xs text-slate-400 ml-1.5">
                        (≈ {formatCLP(downPaymentUF * UF_VALUE)})
                      </span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    step="5"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>

                {/* Term & Rate Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-mono text-slate-300 uppercase">
                        Plazo del Crédito
                      </label>
                      <span className="text-sm font-mono text-cyan-300">{termYears} años</span>
                    </div>
                    <select
                      value={termYears}
                      onChange={(e) => setTermYears(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono text-white focus:outline-none"
                    >
                      <option value={15}>15 Años</option>
                      <option value={20}>20 Años</option>
                      <option value={25}>25 Años</option>
                      <option value={30}>30 Años</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-mono text-slate-300 uppercase">
                        Tasa Anual Estimada
                      </label>
                      <span className="text-sm font-mono text-cyan-300">{interestRate}%</span>
                    </div>
                    <select
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono text-white focus:outline-none"
                    >
                      <option value={4.0}>4.0% (Tasa Preferencial Prime)</option>
                      <option value={4.6}>4.6% (Tasa Promedio Mercado)</option>
                      <option value={5.2}>5.2% (Tasa Convencional)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Simulation Result Callout Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#101d3b] to-[#091224] border border-cyan-500/30 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <span className="text-[11px] font-mono text-cyan-300/80 uppercase">
                    Dividendo Mensual Estimado
                  </span>
                  <div className="text-3xl sm:text-4xl font-display font-semibold text-white mt-1">
                    {monthlyDividendUF.toFixed(1)} UF
                  </div>
                  <span className="text-xs font-mono text-slate-400 mt-1 block">
                    ≈ {formatCLP(monthlyDividendCLP)} / mes
                  </span>
                </div>

                <div className="sm:border-l sm:border-white/10 sm:pl-6">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">
                    Renta Familiar Sugerida
                  </span>
                  <div className="text-2xl sm:text-3xl font-display font-semibold text-slate-200 mt-1">
                    {formatCLP(minRequiredIncomeCLP)}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 mt-1 block">
                    (Se puede complementar renta)
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <a
                href="https://wa.me/56984529100?text=Hola%20BANÁ%20Propiedades,%20deseo%20evaluar%20mi%20capacidad%20de%20financiamiento%20para%20una%20propiedad."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs sm:text-sm font-mono flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20 transition-all"
              >
                <span>Solicitar Pre-Aprobación Bancaria Sin Costo</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
