import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Bed, Bath, Car, Maximize2, MapPin, MessageCircle } from 'lucide-react';
import { Property, UF_VALUE } from '../data/properties';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onSelect }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const formatPriceCLP = (clp: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0,
    }).format(clp);
  };

  const whatsappMessage = encodeURIComponent(
    `Hola BANÁ Propiedades, me interesa recibir más información sobre la propiedad ${property.code} (${property.title}) en ${property.comuna}.`
  );

  return (
    <div
      onClick={() => onSelect(property)}
      className="framed-box rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-300 group cursor-pointer bg-[#0b1428]"
    >
      {/* Property Image with Slideshow */}
      <div className="relative aspect-[16/10] overflow-hidden bg-black">
        <img
          src={property.images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {property.badge && (
            <span className="framed text-[10px] bg-[#080e1b]/90 border-[#dfb86c]/70 text-[#dfb86c] py-1 px-2.5">
              {property.badge}
            </span>
          )}
          <span className="text-[10px] font-bold uppercase tracking-wider bg-black/70 text-white px-2.5 py-1 rounded">
            {property.operation}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <span className="text-[10px] font-mono bg-black/70 text-[#dfb86c] px-2 py-1 rounded border border-white/10">
            {property.code}
          </span>
        </div>

        {/* Slide navigation controls */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              aria-label="Foto anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-[#c5a059] hover:text-black"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              aria-label="Foto siguiente"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-[#c5a059] hover:text-black"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Property Details */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-[#dfb86c] uppercase font-semibold tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>{property.comuna}, {property.region === 'RM' ? 'Santiago' : 'Quinta Región'}</span>
          </div>

          <h3 className="text-xl font-bold text-white group-hover:text-[#dfb86c] transition-colors line-clamp-1 mb-2">
            {property.title}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
            {property.tagline}
          </p>
        </div>

        <div>
          {/* Key Parameters */}
          <div className="grid grid-cols-4 gap-2 py-3 border-y border-white/10 text-center text-xs font-semibold text-slate-300 mb-4">
            <div>
              <span className="block text-[10px] text-slate-400 uppercase font-normal">Superficie</span>
              <span>{property.surfaceUseful} m²</span>
            </div>
            <div>
              <span className="block text-[10px] text-slate-400 uppercase font-normal">Dorms</span>
              <span>{property.bedrooms}</span>
            </div>
            <div>
              <span className="block text-[10px] text-slate-400 uppercase font-normal">Baños</span>
              <span>{property.bathrooms}</span>
            </div>
            <div>
              <span className="block text-[10px] text-slate-400 uppercase font-normal">Estac.</span>
              <span>{property.parking}</span>
            </div>
          </div>

          {/* Pricing & Propper Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <div className="text-xl font-extrabold text-white">
                {property.operation === 'Arriendo'
                  ? `${property.priceUF} UF/mes`
                  : `${property.priceUF.toLocaleString('es-CL')} UF`}
              </div>
              <div className="text-[11px] text-slate-400">
                ≈ {formatPriceCLP(property.priceCLP)}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/56923807285?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Consultar por WhatsApp"
                className="p-2.5 rounded-full border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <button
                onClick={() => onSelect(property)}
                className="btn-rounded btn-framed-propper text-xs py-2 px-4"
              >
                <span>Ficha & Planos</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
