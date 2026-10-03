import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Phone, MessageCircle, Printer, Share2, Check, Copy, MapPin, Bed, Bath, Car, Maximize2, ShieldCheck, Mail } from 'lucide-react';
import { Property, UF_VALUE } from '../data/properties';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({ property, onClose }) => {
  const [activeTab, setActiveTab] = useState<'gallery' | 'floorplan'>('gallery');
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  if (!property) return null;

  const formatPriceCLP = (clp: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0,
    }).format(clp);
  };

  const whatsappMessage = encodeURIComponent(
    `Hola Baná Propiedades, me interesa coordinar una visita para la propiedad código ${property.code}`
  );

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/#propiedad-${property.code}`;
    const shareTitle = `${property.title} | BANÁ PROPIEDADES`;
    const shareText = `Revisa esta propiedad en ${property.comuna}: ${property.title} (${property.priceUF} UF).`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (err) {
        // Fallback to copy link
      }
    }
    setShowShareModal(true);
  };

  const copyToClipboard = () => {
    const shareUrl = `${window.location.origin}/#propiedad-${property.code}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="printable-property-sheet relative w-full max-w-5xl rounded-t-3xl sm:rounded-2xl bg-[#091224] border-t sm:border border-[#dfb86c]/40 shadow-2xl overflow-hidden max-h-[94vh] sm:max-h-[90vh] flex flex-col"
      >
        {/* ========================================================
            PRINT-ONLY HEADER BANNER (Visible ONLY when printing to PDF/A4)
            ======================================================== */}
        <div className="hidden print:flex items-center justify-between pb-4 mb-4 border-b-2 border-[#9a7322]">
          <div>
            <h1 className="text-xl font-bold uppercase tracking-tight text-black">
              BANÁ PROPIEDADES
            </h1>
            <p className="text-xs text-slate-600">
              Gestión Inmobiliaria & Soluciones de Construcción • banapropiedades.cl
            </p>
          </div>
          <div className="text-right">
            <span className="text-sm font-mono font-bold text-[#9a7322]">
              CÓDIGO: {property.code}
            </span>
            <p className="text-xs text-slate-600">+56 9 2380 7285 • contacto@banapropiedades.cl</p>
          </div>
        </div>

        {/* Mobile Drag Indicator Handle */}
        <div className="sm:hidden pt-3 pb-1 flex justify-center bg-[#0c1830] no-print">
          <div className="w-12 h-1 bg-white/25 rounded-full"></div>
        </div>

        {/* ========================================================
            TOP BAR WITH HIGH CONVERSION ACTION BUTTONS (Interactive)
            ======================================================== */}
        <div className="p-4 sm:p-6 bg-[#0c1830] border-b border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0 no-print">
          <div className="flex items-center gap-2">
            <span className="framed text-[10px] sm:text-xs bg-[#080e1b] py-1 px-3 border-[#dfb86c]">
              CÓDIGO: {property.code}
            </span>
            <span className="text-xs font-mono uppercase text-[#dfb86c] font-semibold hidden md:inline">
              {property.regionName} • {property.comuna}
            </span>
          </div>

          {/* Core Interactive Action Buttons Requested by User */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* 1. Botón "Guardar en PDF / Imprimir Ficha" */}
            <button
              onClick={handlePrint}
              title="Guardar en PDF / Imprimir Ficha"
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold uppercase bg-white/10 hover:bg-[#dfb86c] text-white hover:text-black transition-all cursor-pointer border border-white/15"
            >
              <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#dfb86c] group-hover:text-black" />
              <span className="hidden sm:inline">Guardar en PDF / Imprimir</span>
              <span className="sm:hidden">PDF</span>
            </button>

            {/* 2. Botón "Agendar Visita por WhatsApp" */}
            <a
              href={`https://wa.me/56923807285?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold uppercase bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md shadow-emerald-900/30"
            >
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
              <span className="hidden sm:inline">Agendar Visita por WhatsApp</span>
              <span className="sm:hidden">Visita WA</span>
            </a>

            {/* 3. Botón "Compartir" */}
            <button
              onClick={handleShare}
              title="Compartir propiedad"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#142345] hover:bg-[#1b305d] text-slate-200 transition-all border border-white/10 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#dfb86c]" />
              <span className="hidden sm:inline">Compartir</span>
            </button>

            {/* Close Modal Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-black/60 text-white hover:bg-red-500/80 transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {/* Header Title & Pricing */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#dfb86c] uppercase mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{property.comuna} — {property.sector} ({property.regionName})</span>
              </div>
              <h1 className="text-xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
                {property.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                {property.tagline}
              </p>
            </div>

            <div className="md:text-right shrink-0">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">
                Valor {property.operation}
              </span>
              <div className="text-2xl sm:text-4xl font-extrabold text-[#dfb86c]">
                {property.operation === 'Arriendo'
                  ? `${property.priceUF} UF/mes`
                  : `${property.priceUF.toLocaleString('es-CL')} UF`}
              </div>
              <span className="text-xs font-mono text-slate-400 block mt-0.5">
                ≈ {formatPriceCLP(property.priceCLP)}
              </span>
            </div>
          </div>

          {/* Grid Layout: Visuals & Specifications */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Visuals Column (Gallery & Floor Plan) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Tab Selector */}
              <div className="flex items-center gap-2 border-b border-white/10 pb-2 no-print">
                <button
                  onClick={() => setActiveTab('gallery')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors ${
                    activeTab === 'gallery'
                      ? 'bg-[#dfb86c] text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Fotografías ({property.images.length})
                </button>
                <button
                  onClick={() => setActiveTab('floorplan')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors ${
                    activeTab === 'floorplan'
                      ? 'bg-[#dfb86c] text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Plano / Esquema
                </button>
              </div>

              {activeTab === 'gallery' ? (
                <div className="space-y-3">
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-black border border-white/10">
                    <img
                      src={property.images[galleryIndex]}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    {property.images.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            setGalleryIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
                          }
                          aria-label="Foto anterior"
                          className="no-print absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-[#dfb86c] hover:text-black transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() =>
                            setGalleryIndex((prev) => (prev + 1) % property.images.length)
                          }
                          aria-label="Foto siguiente"
                          className="no-print absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-[#dfb86c] hover:text-black transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnails row */}
                  <div className="flex gap-2 overflow-x-auto pb-1 no-print">
                    {property.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setGalleryIndex(idx)}
                        className={`w-16 h-12 rounded-lg overflow-hidden shrink-0 border transition-all ${
                          idx === galleryIndex
                            ? 'border-[#dfb86c] ring-2 ring-[#dfb86c]/30'
                            : 'border-white/10 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 border border-white/10 flex items-center justify-center p-4">
                    <img
                      src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
                      alt="Plano referencial"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 text-center italic">
                    * Plano y distribución esquemática referencial.
                  </p>
                </div>
              )}
            </div>

            {/* Specifications Column */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <h3 className="text-xs font-mono uppercase text-[#dfb86c] font-bold tracking-wider mb-2">
                  // FICHA TÉCNICA & SUPERFICIES
                </h3>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs border-y border-white/10 py-3">
                  <dt className="text-slate-400">Superficie Útil:</dt>
                  <dd className="font-bold text-white text-right">{property.surfaceUseful > 0 ? `${property.surfaceUseful} m²` : 'N/A'}</dd>

                  <dt className="text-slate-400">Superficie Total:</dt>
                  <dd className="font-bold text-white text-right">{property.surfaceTotal} m²</dd>

                  {property.surfaceLand && property.surfaceLand > 0 && (
                    <>
                      <dt className="text-slate-400">Terreno / Parcela:</dt>
                      <dd className="font-bold text-white text-right">{property.surfaceLand} m²</dd>
                    </>
                  )}

                  <dt className="text-slate-400">Dormitorios:</dt>
                  <dd className="font-bold text-white text-right">{property.bedrooms > 0 ? `${property.bedrooms} Dorms` : 'Planta libre / Terreno'}</dd>

                  <dt className="text-slate-400">Baños:</dt>
                  <dd className="font-bold text-white text-right">{property.bathrooms > 0 ? `${property.bathrooms} Baños` : 'N/A'}</dd>

                  <dt className="text-slate-400">Estacionamientos:</dt>
                  <dd className="font-bold text-white text-right">{property.parking} Vehículos</dd>

                  <dt className="text-slate-400">Orientación:</dt>
                  <dd className="font-bold text-white text-right">{property.orientation || 'N/A'}</dd>

                  {property.gastosComunesUF && (
                    <>
                      <dt className="text-slate-400">Gastos Comunes:</dt>
                      <dd className="font-bold text-white text-right">{property.gastosComunesUF} UF/mes</dd>
                    </>
                  )}
                </dl>
              </div>

              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                  Descripción de la Propiedad
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {property.description}
                </p>
              </div>

              {property.highlights && property.highlights.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                    Puntos Destacados
                  </h3>
                  <ul className="space-y-1.5 text-xs text-slate-300 check-marks">
                    {property.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Broker Contact Box */}
              <div className="p-4 rounded-xl bg-[#0e1830] border border-white/10 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#dfb86c] text-slate-950 font-bold flex items-center justify-center uppercase">
                    BP
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#dfb86c] uppercase block">
                      GESTOR INMOBILIARIO ASIGNADO
                    </span>
                    <h4 className="text-xs font-bold text-white uppercase">
                      BANÁ PROPIEDADES • RM & QUINTA REGIÓN
                    </h4>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-1 no-print">
                  <a
                    href={`https://wa.me/56923807285?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 btn-rounded bg-emerald-600 hover:bg-emerald-500 text-white justify-center text-xs py-2.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>WhatsApp Directo</span>
                  </a>
                  <a
                    href="tel:+56923807285"
                    className="btn-rounded btn-framed-propper justify-center text-xs py-2.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Llamar</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Share Dialog / Modal */}
        {showShareModal && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
            <div className="p-6 rounded-2xl bg-[#0c1830] border border-[#dfb86c]/40 max-w-md w-full space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white uppercase">
                  Compartir Propiedad
                </h4>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-slate-300">
                Envía esta propiedad de forma rápida a tus contactos o copia el enlace:
              </p>

              <div className="flex gap-2">
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    `Revisa esta propiedad en Baná Propiedades: ${property.title} - ${window.location.origin}/#propiedad-${property.code}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 btn-rounded bg-emerald-600 hover:bg-emerald-500 text-white justify-center text-xs py-2.5"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Por WhatsApp</span>
                </a>

                <a
                  href={`mailto:?subject=${encodeURIComponent(
                    `Propiedad Baná: ${property.title}`
                  )}&body=${encodeURIComponent(
                    `Hola, te comparto esta propiedad de Baná Propiedades: ${property.title} en ${property.comuna}.\n\nCódigo: ${property.code}\nPrecio: ${property.priceUF} UF\n\nVer más en: ${window.location.origin}/#propiedad-${property.code}`
                  )}`}
                  className="flex-1 btn-rounded bg-white/10 hover:bg-white/20 text-white justify-center text-xs py-2.5"
                >
                  <Mail className="w-4 h-4" />
                  <span>Por Correo</span>
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={copyToClipboard}
                  className="w-full btn-rounded btn-framed-propper justify-center text-xs py-2.5"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">¡Enlace Copiado al Portapapeles!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar Enlace Directo</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
