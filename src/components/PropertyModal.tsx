import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, MapPin, Bed, Bath, Car, Box, Maximize2, Shield, 
  Check, Phone, Mail, MessageCircle, Calculator, Sparkles, 
  ChevronLeft, ChevronRight, Share2, Compass
} from 'lucide-react';
import { Property, UF_VALUE } from '../data/properties';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({ property, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [years, setYears] = useState(25);
  const [interestRate, setInterestRate] = useState(4.5);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setActiveImageIndex(0);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (property) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [property, onClose]);

  if (!property) return null;

  const formatPriceCLP = (clp: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0,
    }).format(clp);
  };

  // Simple monthly mortgage calculation in UF
  const principalUF = property.priceUF * (1 - downPaymentPercent / 100);
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = years * 12;
  const dividendUF = monthlyRate > 0
    ? (principalUF * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    : principalUF / numberOfPayments;
  const dividendCLP = dividendUF * UF_VALUE;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappMessage = encodeURIComponent(
    `Hola ${property.agent.name}, deseo agendar una visita privada para la propiedad ${property.code}: ${property.title} en ${property.comuna}.`
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl bg-[#091022] border border-white/15 shadow-2xl shadow-black/80 overflow-hidden z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0c162e]/90 backdrop-blur-md sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs">
                {property.code}
              </span>
              <span className="font-mono text-xs text-slate-400">
                {property.regionName} • {property.comuna}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 rounded-full border border-white/10 hover:border-cyan-400 text-slate-300 hover:text-white transition-colors"
                title="Copiar enlace"
              >
                <Share2 className="w-4 h-4" />
              </button>
              {copied && (
                <span className="text-xs font-mono text-cyan-400 animate-pulse">¡Enlace copiado!</span>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-full border border-white/10 hover:border-red-400/50 text-slate-300 hover:text-white transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
            {/* Gallery Section */}
            <div className="space-y-3">
              {/* Main Active Image with Controls */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-950">
                <img
                  src={property.images[activeImageIndex]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {property.badge && (
                    <span className="px-3 py-1 rounded-full bg-cyan-950/90 backdrop-blur-md border border-cyan-400/50 text-xs font-mono text-cyan-300">
                      {property.badge}
                    </span>
                  )}
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono text-white">
                    {property.operation}
                  </span>
                </div>

                {/* Arrows */}
                <button
                  onClick={() =>
                    setActiveImageIndex(
                      (prev) => (prev - 1 + property.images.length) % property.images.length
                    )
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-cyan-500 hover:text-black transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setActiveImageIndex((prev) => (prev + 1) % property.images.length)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-cyan-500 hover:text-black transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Image counter */}
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 font-mono text-xs text-white">
                  {activeImageIndex + 1} / {property.images.length}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all ${
                      idx === activeImageIndex
                        ? 'border-cyan-400 scale-[1.02]'
                        : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Title & Pricing Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-6 border-b border-white/10">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{property.sector}, {property.comuna}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5" /> Orientación {property.orientation}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-display font-normal text-white mb-2 leading-tight">
                  {property.title}
                </h1>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {property.tagline}
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-center p-5 rounded-2xl bg-[#0c162e] border border-cyan-500/20">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Valor de Publicación
                </span>
                <span className="text-3xl sm:text-4xl font-display font-semibold text-cyan-300">
                  {property.operation === 'Arriendo'
                    ? `${property.priceUF} UF/mes`
                    : `${property.priceUF.toLocaleString('es-CL')} UF`}
                </span>
                <span className="text-xs font-mono text-slate-400 mt-1">
                  ≈ {formatPriceCLP(property.priceCLP)}
                </span>
                {property.gastosComunesUF && (
                  <span className="text-[11px] font-mono text-cyan-200/70 mt-2">
                    GG.CC: {property.gastosComunesUF} UF aprox.
                  </span>
                )}
              </div>
            </div>

            {/* Technical Specs Metric Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Sup. Útil</span>
                <span className="text-lg font-display text-white mt-1">{property.surfaceUseful} m²</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Sup. Total</span>
                <span className="text-lg font-display text-white mt-1">{property.surfaceTotal} m²</span>
              </div>
              {property.surfaceLand ? (
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Terreno</span>
                  <span className="text-lg font-display text-white mt-1">{property.surfaceLand} m²</span>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Bodegas</span>
                  <span className="text-lg font-display text-white mt-1">{property.storage}</span>
                </div>
              )}
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Dormitorios</span>
                <span className="text-lg font-display text-white mt-1">{property.bedrooms} Dorms</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Baños</span>
                <span className="text-lg font-display text-white mt-1">{property.bathrooms} Baños</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Estacionamientos</span>
                <span className="text-lg font-display text-white mt-1">{property.parking} Vehículos</span>
              </div>
            </div>

            {/* Description & Architecture Highlights */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="font-mono text-xs text-cyan-400 tracking-wider uppercase mb-3">
                    // DESCRIPCIÓN ARQUITECTÓNICA
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                    {property.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-mono text-xs text-cyan-400 tracking-wider uppercase mb-3">
                    // PUNTOS DESTACADOS
                  </h3>
                  <ul className="space-y-2">
                    {property.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-mono text-xs text-cyan-400 tracking-wider uppercase mb-3">
                    // EQUIPAMIENTO & COMODIDADES
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {property.amenities.map((amenity, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-2 rounded-lg bg-slate-900/40 border border-white/5 text-xs text-slate-300 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar with Mortgage Simulator & Agent Card */}
              <div className="lg:col-span-5 space-y-6">
                {/* Mortgage Simulator Box */}
                {property.operation === 'Venta' && (
                  <div className="p-5 rounded-2xl bg-[#0c162e] border border-white/10 space-y-4">
                    <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
                      <Calculator className="w-4 h-4" />
                      <span>SIMULADOR DE FINANCIAMIENTO</span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                          <span>Pie ({downPaymentPercent}%):</span>
                          <span className="text-cyan-300">
                            {((property.priceUF * downPaymentPercent) / 100).toLocaleString('es-CL')} UF
                          </span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="50"
                          step="5"
                          value={downPaymentPercent}
                          onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                          <span>Plazo:</span>
                          <span className="text-cyan-300">{years} años</span>
                        </div>
                        <input
                          type="range"
                          min="15"
                          max="30"
                          step="5"
                          value={years}
                          onChange={(e) => setYears(Number(e.target.value))}
                          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                        />
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-950/60 border border-cyan-500/20 text-center">
                        <span className="text-[10px] font-mono text-slate-400 uppercase">
                          Dividendo Mensual Estimado
                        </span>
                        <div className="text-xl font-display font-semibold text-cyan-300 mt-0.5">
                          {dividendUF.toFixed(1)} UF / mes
                        </div>
                        <span className="text-xs font-mono text-slate-400">
                          ≈ {formatPriceCLP(dividendCLP)} / mes
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Real Estate Broker Profile */}
                <div className="p-5 rounded-2xl bg-[#0c162e] border border-white/10 flex flex-col justify-between">
                  <div className="flex items-center gap-3.5 mb-4">
                    <img
                      src={property.agent.avatar}
                      alt={property.agent.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-cyan-400"
                    />
                    <div>
                      <span className="text-xs font-mono text-cyan-400">AGENTE A CARGO</span>
                      <h4 className="text-base font-semibold text-white">{property.agent.name}</h4>
                      <p className="text-xs text-slate-400">{property.agent.role}</p>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <a
                      href={`https://wa.me/56984529100?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Agendar Visita Privada vía WhatsApp</span>
                    </a>

                    <a
                      href={`tel:${property.agent.phone.replace(/\s+/g, '')}`}
                      className="w-full py-2.5 rounded-xl border border-white/15 hover:border-cyan-400 text-slate-300 hover:text-white font-mono text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Llamar Directo: {property.agent.phone}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
