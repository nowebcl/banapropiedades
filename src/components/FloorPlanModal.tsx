import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Phone, MessageCircle } from 'lucide-react';
import { Property } from '../data/properties';

interface FloorPlanModalProps {
  property: Property | null;
  onClose: () => void;
}

export const FloorPlanModal: React.FC<FloorPlanModalProps> = ({ property, onClose }) => {
  const [activeTab, setActiveTab] = useState<'floorplan' | 'gallery'>('floorplan');
  const [galleryIndex, setGalleryIndex] = useState(0);

  if (!property) return null;

  const formatPriceCLP = (clp: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0,
    }).format(clp);
  };

  const whatsappMessage = encodeURIComponent(
    `Hola BANÁ Propiedades, deseo consultar por la propiedad ${property.code} (${property.title}) en ${property.comuna}.`
  );

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl rounded-t-3xl sm:rounded-2xl bg-[#091224] border-t sm:border border-[#dfb86c]/30 shadow-2xl overflow-hidden max-h-[92vh] sm:max-h-[85vh] flex flex-col"
      >
        {/* Mobile Drag Indicator Handle */}
        <div className="sm:hidden pt-3 pb-1 flex justify-center bg-[#0c1830]">
          <div className="w-12 h-1 bg-white/25 rounded-full"></div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-[#dfb86c] hover:text-black transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-5 sm:p-8 bg-[#0c1830] border-b border-white/10 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h4 className="text-[11px] font-mono uppercase text-[#dfb86c] tracking-wider">
                {property.regionName} • {property.sector}
              </h4>
              <h3 className="text-[10px] text-slate-400 uppercase font-semibold">
                Orientación {property.orientation} • Código {property.code}
              </h3>
              <h1 className="text-xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mt-1">
                {property.title}
              </h1>
            </div>

            <div className="sm:text-right">
              <h2 className="text-xl sm:text-3xl font-extrabold text-[#dfb86c]">
                {property.operation === 'Arriendo'
                  ? `${property.priceUF} UF/mes`
                  : `${property.priceUF.toLocaleString('es-CL')} UF`}
              </h2>
              <span className="text-[11px] text-slate-400 font-mono block">
                ≈ {formatPriceCLP(property.priceCLP)}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-y-auto flex-1 pb-24 sm:pb-8">
          {/* Left Column: Floor Plan & Gallery Tabs */}
          <div className="lg:col-span-7 space-y-4">
            {/* Tabs bar */}
            <div className="flex border-b border-white/10">
              <button
                onClick={() => setActiveTab('floorplan')}
                className={`px-3 sm:px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                  activeTab === 'floorplan'
                    ? 'border-[#dfb86c] text-[#dfb86c]'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Plano Arquitectónico
              </button>
              <button
                onClick={() => setActiveTab('gallery')}
                className={`px-3 sm:px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                  activeTab === 'gallery'
                    ? 'border-[#dfb86c] text-[#dfb86c]'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Fotos ({property.images.length})
              </button>
            </div>

            {/* Tab 1: Floor Plan */}
            {activeTab === 'floorplan' && (
              <div className="space-y-2">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-white/10 flex items-center justify-center p-3">
                  <img
                    src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80"
                    alt="Plano Arquitectónico"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-[10px] text-slate-400 italic text-center">
                  * Plano referencial a escala. Solicita el archivo CAD oficial a tu asesor.
                </div>
              </div>
            )}

            {/* Tab 2: Gallery */}
            {activeTab === 'gallery' && (
              <div className="space-y-3">
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-black border border-white/10">
                  <img
                    src={property.images[galleryIndex]}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() =>
                      setGalleryIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
                    }
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-[#dfb86c] hover:text-black"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setGalleryIndex((prev) => (prev + 1) % property.images.length)
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-[#dfb86c] hover:text-black"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1">
                  {property.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setGalleryIndex(idx)}
                      className={`w-14 h-10 rounded-lg overflow-hidden shrink-0 border ${
                        idx === galleryIndex ? 'border-[#dfb86c]' : 'border-white/10 opacity-50'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Parameters & Description */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                Parámetros & Superficies
              </h3>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs border-y border-white/10 py-2.5">
                <dt className="text-slate-400">Sup. Útil:</dt>
                <dd className="font-bold text-white text-right">{property.surfaceUseful} m²</dd>

                <dt className="text-slate-400">Sup. Total:</dt>
                <dd className="font-bold text-white text-right">{property.surfaceTotal} m²</dd>

                <dt className="text-slate-400">Dormitorios:</dt>
                <dd className="font-bold text-white text-right">{property.bedrooms} Dorms</dd>

                <dt className="text-slate-400">Baños:</dt>
                <dd className="font-bold text-white text-right">{property.bathrooms} Baños</dd>

                <dt className="text-slate-400">Estacionamientos:</dt>
                <dd className="font-bold text-white text-right">{property.parking} Vehículos</dd>

                <dt className="text-slate-400">Bodegas:</dt>
                <dd className="font-bold text-white text-right">{property.storage}</dd>
              </dl>
            </div>

            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-1.5">
                Descripción
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden sm:flex flex-col gap-2 pt-2">
              <a
                href={`https://wa.me/56923807285?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-rounded btn-primary-propper justify-center text-xs py-3"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Solicitar Visita Privada</span>
              </a>

              <a
                href={`tel:+56923807285`}
                className="w-full btn-rounded btn-framed-propper justify-center text-xs py-2.5"
              >
                <Phone className="w-4 h-4 text-[#dfb86c]" />
                <span>Llamar al Broker: +56 9 2380 7285</span>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Bottom Floating Action Bar */}
        <div className="sm:hidden fixed bottom-0 left-0 right-0 p-3 bg-[#080e1b]/95 backdrop-blur-xl border-t border-white/10 z-30 flex items-center gap-2">
          <a
            href={`https://wa.me/56923807285?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 btn-rounded btn-primary-propper justify-center text-xs py-3.5"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Visita WhatsApp</span>
          </a>
          <a
            href={`tel:+56923807285`}
            className="btn-rounded btn-framed-propper py-3.5 px-4"
            aria-label="Llamar"
          >
            <Phone className="w-4 h-4 text-[#dfb86c]" />
          </a>
        </div>
      </div>
    </div>
  );
};
