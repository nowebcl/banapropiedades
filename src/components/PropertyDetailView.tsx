import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageCircle,
  Printer,
  Share2,
  MapPin,
  Bed,
  Bath,
  Car,
  Maximize2,
  ShieldCheck,
  Mail,
  Check,
  Copy,
  Calendar,
  Sparkles,
  Building,
  CheckCircle2,
  Layers,
  Compass,
  DollarSign,
  ExternalLink
} from 'lucide-react';
import { Property, UF_VALUE } from '../data/properties';
import { JETBROKERS_ORG_ID, JETBROKERS_BROKER_ID } from '../services/jetbrokers';
import { sendContactMessage } from '../services/pocketbase';
import { PropertyCard } from './PropertyCard';

interface PropertyDetailViewProps {
  property: Property;
  allProperties: Property[];
  onBack: () => void;
  onSelectProperty: (property: Property) => void;
}

export const PropertyDetailView: React.FC<PropertyDetailViewProps> = ({
  property,
  allProperties,
  onBack,
  onSelectProperty,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Inquiry Form State
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientMessage, setClientMessage] = useState(
    `Hola BANÁ Propiedades, me interesa coordinar una visita presencial para la propiedad ${property.code} (${property.title}).`
  );
  const [sendingForm, setSendingForm] = useState(false);
  const [formSent, setFormSent] = useState(false);

  // Reset active image and message if property changes
  useEffect(() => {
    setActiveImageIndex(0);
    setFormSent(false);
    setClientMessage(
      `Hola BANÁ Propiedades, me interesa coordinar una visita presencial para la propiedad ${property.code} (${property.title}).`
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [property.id, property.code]);

  const images = property.images && property.images.length > 0
    ? property.images
    : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'];

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const formatPriceCLP = (clp: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0,
    }).format(clp);
  };

  const whatsappMessage = encodeURIComponent(
    `Hola BANÁ Propiedades, me interesa recibir asesoría y coordinar una visita para la propiedad ${property.code} (${property.title}) en ${property.comuna}.`
  );

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/#propiedad-${property.code.toLowerCase()}`;
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
      } catch {
        // Fallback
      }
    }
    setShowShareModal(true);
  };

  const copyToClipboard = () => {
    const shareUrl = `${window.location.origin}/#propiedad-${property.code.toLowerCase()}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim()) return;

    setSendingForm(true);
    try {
      await sendContactMessage({
        name: clientName.trim(),
        email: clientEmail.trim(),
        phone: clientPhone.trim(),
        propertyCode: property.code,
        propertyTitle: property.title,
        subject: `Consulta por ${property.title} (${property.code})`,
        message: clientMessage.trim(),
        source: 'property_detail_page',
      });
      setFormSent(true);
      setClientName('');
      setClientEmail('');
      setClientPhone('');
    } catch (err) {
      console.error('Error sending property inquiry:', err);
    } finally {
      setSendingForm(false);
    }
  };

  // Similar properties (exclude current, prefer same region or operation)
  const similarProperties = allProperties
    .filter((p) => p.id !== property.id)
    .slice(0, 3);

  return (
    <div className="pt-24 sm:pt-28 pb-24 bg-[#080e1b] min-h-screen text-slate-100 printable-property-sheet">
      {/* ========================================================
          PRINT-ONLY HEADER BANNER (PDF / A4)
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

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* ========================================================
            NAVIGATION BAR & BREADCRUMBS
            ======================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 no-print">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-2 text-xs font-semibold uppercase tracking-wider"
              title="Volver"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver</span>
            </button>

            {/* Breadcrumb Trail */}
            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-400">
              <span>Inicio</span>
              <span>/</span>
              <span>Propiedades</span>
              <span>/</span>
              <span>{property.comuna}</span>
              <span>/</span>
              <span className="text-[#dfb86c] font-bold">{property.code}</span>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handlePrint}
              title="Guardar en PDF o Imprimir Ficha Comercial"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold uppercase bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all border border-white/10 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#dfb86c]" />
              <span className="hidden sm:inline">Guardar PDF / Ficha</span>
            </button>

            <button
              onClick={handleShare}
              title="Compartir Propiedad"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold uppercase bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all border border-white/10 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-[#dfb86c]" />
              <span className="hidden sm:inline">Compartir</span>
            </button>

            <a
              href={`https://wa.me/56923807285?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp</span>
            </a>

            {property.id.startsWith('jet-') && (
              <a
                href={`https://jetgallery.jetbrokers.io/${JETBROKERS_ORG_ID}/${property.id.replace('jet-', '')}/${JETBROKERS_BROKER_ID}/${property.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Ver Ficha Oficial de Inmobiliaria"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold uppercase bg-[#dfb86c]/15 hover:bg-[#dfb86c]/25 text-[#dfb86c] transition-all border border-[#dfb86c]/30 cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Ficha Inmobiliaria</span>
              </a>
            )}
          </div>
        </div>

        {/* ========================================================
            HERO GALLERY SHOWCASE
            ======================================================== */}
        <div className="space-y-3">
          {/* Main Photo Container */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[21/9] max-h-[560px] bg-slate-900 border border-white/10 shadow-2xl group">
            <img
              src={images[activeImageIndex]}
              alt={`${property.title} - Foto ${activeImageIndex + 1}`}
              className="w-full h-full object-cover transition-all duration-700 ease-out"
            />

            {/* Gradient Overlays for High Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none"></div>

            {/* Photo Index Counter */}
            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs font-mono text-white font-semibold">
              {activeImageIndex + 1} / {images.length} Fotos
            </div>

            {/* Badges on Top Left */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-[#dfb86c] text-slate-950 font-mono text-xs font-bold uppercase shadow-lg">
                CÓDIGO: {property.code}
              </span>
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-mono text-xs font-bold uppercase">
                {property.operation}
              </span>
              {property.badge && (
                <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-white font-mono text-xs font-bold uppercase">
                  {property.badge}
                </span>
              )}
            </div>

            {/* Carousel Arrow Controls */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all opacity-80 group-hover:opacity-100 hover:scale-105 cursor-pointer no-print"
                  aria-label="Foto anterior"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all opacity-80 group-hover:opacity-100 hover:scale-105 cursor-pointer no-print"
                  aria-label="Foto siguiente"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2 text-white">
              <div>
                <span className="text-[11px] font-mono text-[#fae6be] uppercase tracking-wider block">
                  {property.regionName} • {property.comuna}
                </span>
                <h2 className="text-lg sm:text-2xl font-bold uppercase tracking-tight text-white drop-shadow-md">
                  {property.title}
                </h2>
              </div>
              <div className="text-right">
                <div className="text-xl sm:text-3xl font-extrabold text-[#dfb86c] drop-shadow-md">
                  {property.priceUF.toLocaleString('es-CL')} UF
                </div>
                <div className="text-xs sm:text-sm text-slate-300 font-mono">
                  {formatPriceCLP(property.priceCLP)}
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin no-print">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative rounded-xl overflow-hidden aspect-[4/3] w-20 sm:w-28 shrink-0 border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-[#dfb86c] scale-100 shadow-md shadow-[#dfb86c]/30'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Miniatura ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ========================================================
            MAIN DETAILS & SIDEBAR (Two Column Grid)
            ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: Property Specs, Description, Amenities */}
          <div className="lg:col-span-8 space-y-8">
            {/* Title & Tagline Box */}
            <div className="space-y-3 pb-6 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-[#dfb86c] uppercase">
                <MapPin className="w-4 h-4" />
                <span>
                  {property.addressApprox || `${property.comuna}, ${property.regionName}`}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal tracking-tight leading-[1.08]">
                {property.title}
              </h1>

              {property.tagline && (
                <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
                  {property.tagline}
                </p>
              )}
            </div>

            {/* Key Specs Card Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 rounded-2xl bg-[#0b1428] border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-[#dfb86c] text-xs font-mono uppercase">
                  <Bed className="w-4 h-4" />
                  <span>Dormitorios</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white">
                  {property.bedrooms || '—'}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0b1428] border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-[#dfb86c] text-xs font-mono uppercase">
                  <Bath className="w-4 h-4" />
                  <span>Baños</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white">
                  {property.bathrooms || '—'}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0b1428] border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-[#dfb86c] text-xs font-mono uppercase">
                  <Maximize2 className="w-4 h-4" />
                  <span>Sup. Útil</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white">
                  {property.surfaceUseful ? `${property.surfaceUseful} m²` : '—'}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0b1428] border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-[#dfb86c] text-xs font-mono uppercase">
                  <Layers className="w-4 h-4" />
                  <span>Sup. Total</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white">
                  {property.surfaceTotal ? `${property.surfaceTotal} m²` : '—'}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0b1428] border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-[#dfb86c] text-xs font-mono uppercase">
                  <Car className="w-4 h-4" />
                  <span>Estacionam.</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white">
                  {property.parking || '—'}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0b1428] border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-[#dfb86c] text-xs font-mono uppercase">
                  <Building className="w-4 h-4" />
                  <span>Bodegas</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white">
                  {property.storage || '—'}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0b1428] border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-[#dfb86c] text-xs font-mono uppercase">
                  <DollarSign className="w-4 h-4" />
                  <span>G. Comunes</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-white">
                  {property.gastosComunesUF ? `${property.gastosComunesUF} UF` : 'No informa'}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0b1428] border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-[#dfb86c] text-xs font-mono uppercase">
                  <Compass className="w-4 h-4" />
                  <span>Orientación</span>
                </div>
                <div className="text-sm sm:text-base font-bold text-white truncate">
                  {property.orientation || 'Nor-Oriente'}
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0b1428] border border-white/10 space-y-4">
              <h3 className="text-lg font-bold text-white uppercase tracking-tight pb-3 border-b border-white/10">
                Descripción de la Propiedad
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light whitespace-pre-wrap">
                {property.description || 'Contáctanos para conocer todos los detalles de esta exclusiva propiedad.'}
              </p>
            </div>

            {/* Highlights Section */}
            {property.highlights && property.highlights.length > 0 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0b1428] border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white uppercase tracking-tight pb-3 border-b border-white/10">
                  Puntos Clave & Terminaciones
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                      <span className="w-2 h-2 rounded-full bg-[#dfb86c] shrink-0 mt-1.5"></span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities Section */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0b1428] border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white uppercase tracking-tight pb-3 border-b border-white/10">
                  Equipamiento y Amenidades
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {property.amenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200 flex items-center gap-2"
                    >
                      <Check className="w-3.5 h-3.5 text-[#dfb86c]" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Remodeling & LCE Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#091122] via-[#101e3b] to-[#091122] border border-[#dfb86c]/30 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dfb86c]/15 text-[#dfb86c] text-[10px] font-mono uppercase font-bold tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                ALIANZA EXCLUSIVA BANÁ & LCE CONSTRUCCIONES
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white uppercase">
                ¿Deseas remodelar o ampliar este espacio?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Junto a LCE Construcciones entregamos proyectos llave en mano, diseño de autor y tarifas preferenciales para compradores Baná Propiedades.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Price & Lead Form */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            {/* Price Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0b1428] border border-[#dfb86c]/40 shadow-2xl space-y-4">
              <span className="text-[10px] font-mono text-[#dfb86c] uppercase tracking-widest font-semibold block">
                VALOR DE {property.operation.toUpperCase()}
              </span>

              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white">
                  {property.priceUF.toLocaleString('es-CL')} <span className="text-[#dfb86c]">UF</span>
                </div>
                <div className="text-xs sm:text-sm text-slate-300 font-mono mt-1">
                  {formatPriceCLP(property.priceCLP)} CLP aprox.
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-1">
                  (Valor referencial UF: ${UF_VALUE.toLocaleString('es-CL')} CLP)
                </div>
              </div>

              {/* Fast Action Buttons */}
              <div className="space-y-2 pt-2 no-print">
                <a
                  href={`https://wa.me/56923807285?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-rounded bg-emerald-600 hover:bg-emerald-500 text-white justify-center text-xs py-3 font-bold shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Coordinar Visita por WhatsApp</span>
                </a>

                <a
                  href="tel:+56923807285"
                  className="w-full btn-rounded btn-framed-propper justify-center text-xs py-3 font-semibold"
                >
                  <Phone className="w-4 h-4" />
                  <span>Llamar al Broker (+56 9 2380 7285)</span>
                </a>
              </div>
            </div>

            {/* Direct Inquiry Form (Connected to PocketBase) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0b1428] border border-white/10 space-y-5 no-print">
              <div>
                <span className="text-[10px] font-mono text-[#dfb86c] uppercase tracking-widest block mb-1">
                  ATENCIÓN INMEDIATA
                </span>
                <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                  Agenda tu Visita
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Déjanos tus datos y un gestor inmobiliario te contactará hoy mismo.
                </p>
              </div>

              {formSent ? (
                <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-xs space-y-2 text-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                  <p className="font-bold">¡Solicitud recibida con éxito!</p>
                  <p className="text-[11px] text-emerald-300">
                    Nos pondremos en contacto contigo a la brevedad para coordinar la visita a esta propiedad.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendInquiry} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Tu nombre completo *"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 text-xs text-white placeholder-slate-500 focus:border-[#dfb86c] outline-none"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Tu correo electrónico *"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 text-xs text-white placeholder-slate-500 focus:border-[#dfb86c] outline-none"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="Teléfono / WhatsApp (ej. +56 9 ...)"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 text-xs text-white placeholder-slate-500 focus:border-[#dfb86c] outline-none"
                    />
                  </div>

                  <div>
                    <textarea
                      rows={3}
                      value={clientMessage}
                      onChange={(e) => setClientMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 text-xs text-white placeholder-slate-500 focus:border-[#dfb86c] outline-none resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={sendingForm}
                    className="w-full btn-rounded btn-primary-propper py-3 justify-center text-xs font-bold uppercase cursor-pointer disabled:opacity-50"
                  >
                    {sendingForm ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></span>
                        <span>Enviando...</span>
                      </span>
                    ) : (
                      <span>Solicitar Información / Visita</span>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Broker Assigned Card */}
            <div className="p-5 rounded-2xl bg-[#0b1428] border border-white/10 flex items-center gap-4">
              <img
                src={property.agent?.avatar || '/giovanna-gonzalez.png'}
                alt={property.agent?.name || 'Giovanna González'}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#dfb86c]"
              />
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-[#dfb86c] uppercase block">
                  GESTOR INMOBILIARIO
                </span>
                <h4 className="text-sm font-bold text-white uppercase">
                  {property.agent?.name || 'Giovanna González'}
                </h4>
                <p className="text-xs text-slate-400">
                  {property.agent?.role || 'Directora & Broker Senior'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            SIMILAR / RECOMMENDED PROPERTIES
            ======================================================== */}
        {similarProperties.length > 0 && (
          <div className="pt-12 border-t border-white/10 space-y-8 no-print">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="framed text-[#dfb86c] border-[#dfb86c]/40 mb-2 inline-block text-xs">
                  Sugerencias
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
                  Otras Propiedades que te Pueden Interesar
                </h2>
              </div>
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-xs font-bold text-[#dfb86c] hover:text-white transition-colors cursor-pointer"
              >
                <span>Ver todo el catálogo</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {similarProperties.map((p) => (
                <PropertyCard
                  key={p.id}
                  property={p}
                  onSelect={(selected) => onSelectProperty(selected)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
          MOBILE BOTTOM STICKY CONVERSION BAR
          ======================================================== */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#080e1b]/98 backdrop-blur-md border-t border-white/15 p-3 flex items-center justify-between gap-3 no-print">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-mono block">VALOR</span>
          <span className="text-base font-extrabold text-[#dfb86c]">
            {property.priceUF.toLocaleString('es-CL')} UF
          </span>
        </div>
        <a
          href={`https://wa.me/56923807285?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 btn-rounded bg-emerald-600 hover:bg-emerald-500 text-white justify-center text-xs py-2.5 font-bold shadow-md"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>WhatsApp</span>
        </a>
      </div>

      {/* Share Modal Dialog */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="p-6 rounded-3xl bg-[#0c1830] border border-[#dfb86c]/40 max-w-md w-full space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white uppercase">
                Compartir Propiedad
              </h4>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-300">
              Copia el enlace directo o envíalo a tus contactos:
            </p>

            <div className="flex gap-2">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `Revisa esta propiedad en Baná Propiedades: ${property.title} - ${window.location.origin}/#propiedad-${property.code.toLowerCase()}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 btn-rounded bg-emerald-600 hover:bg-emerald-500 text-white justify-center text-xs py-2.5"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`mailto:?subject=${encodeURIComponent(
                  `Propiedad Baná: ${property.title}`
                )}&body=${encodeURIComponent(
                  `Hola, te comparto esta propiedad de Baná Propiedades: ${property.title} en ${property.comuna}.\n\nCódigo: ${property.code}\nPrecio: ${property.priceUF} UF\n\nVer más en: ${window.location.origin}/#propiedad-${property.code.toLowerCase()}`
                )}`}
                className="flex-1 btn-rounded bg-white/10 hover:bg-white/20 text-white justify-center text-xs py-2.5"
              >
                <Mail className="w-4 h-4" />
                <span>Correo</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={copyToClipboard}
                className="w-full btn-rounded btn-framed-propper justify-center text-xs py-2.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '¡Enlace copiado!' : 'Copiar Enlace'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
