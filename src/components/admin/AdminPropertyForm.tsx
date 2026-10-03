import React, { useState } from 'react';
import { ArrowLeft, Save, Plus, Trash2, Image as ImageIcon, Check, Star, AlertCircle, Building, MapPin, DollarSign, Home } from 'lucide-react';
import { Property, COMUNAS, PROPERTY_TYPES } from '../../data/properties';
import { createProperty, updateProperty } from '../../services/pocketbase';

interface AdminPropertyFormProps {
  initialProperty?: Property | null;
  onSaved: (property: Property) => void;
  onCancel: () => void;
}

const COMMON_AMENITIES = [
  'Piscina',
  'Quincho Equipado',
  'Seguridad 24/7',
  'Calefacción Central',
  'Jardín Formado',
  'Vista Panorámica',
  'Gimnasio',
  'Bodega',
  'Logia',
  'Estacionamiento Visitas',
  'Rooftop Privado',
  'Walk-in Closet',
  'Cocina Isla',
  'Termopanel',
  'Portón Eléctrico',
  'Riego Automático',
];

export const AdminPropertyForm: React.FC<AdminPropertyFormProps> = ({
  initialProperty,
  onSaved,
  onCancel,
}) => {
  const isEditing = Boolean(initialProperty && initialProperty.id);

  // Form State
  const [code, setCode] = useState(initialProperty?.code || `BANA-RM-${Math.floor(100 + Math.random() * 900)}`);
  const [title, setTitle] = useState(initialProperty?.title || '');
  const [tagline, setTagline] = useState(initialProperty?.tagline || '');
  const [operation, setOperation] = useState<'Venta' | 'Arriendo' | 'Inversion'>(initialProperty?.operation || 'Venta');
  const [propertyType, setPropertyType] = useState<any>(initialProperty?.propertyType || 'Casa');
  const [condition, setCondition] = useState<'Nueva' | 'Usada'>(initialProperty?.condition || 'Usada');
  const [badge, setBadge] = useState(initialProperty?.badge || '');
  const [featured, setFeatured] = useState<boolean>(initialProperty?.featured || false);

  // Pricing
  const [priceUF, setPriceUF] = useState<number>(initialProperty?.priceUF || 0);
  const [priceCLP, setPriceCLP] = useState<number>(initialProperty?.priceCLP || 0);
  const [gastosComunesUF, setGastosComunesUF] = useState<number>(initialProperty?.gastosComunesUF || 0);

  // Location
  const [region, setRegion] = useState<'RM' | 'V_REGION'>(initialProperty?.region || 'RM');
  const [comuna, setComuna] = useState(initialProperty?.comuna || 'Vitacura');
  const [sector, setSector] = useState(initialProperty?.sector || '');
  const [addressApprox, setAddressApprox] = useState(initialProperty?.addressApprox || '');
  const [orientation, setOrientation] = useState(initialProperty?.orientation || 'Nor-Oriente');

  // Specs
  const [bedrooms, setBedrooms] = useState<number>(initialProperty?.bedrooms || 3);
  const [bathrooms, setBathrooms] = useState<number>(initialProperty?.bathrooms || 2);
  const [parking, setParking] = useState<number>(initialProperty?.parking || 2);
  const [storage, setStorage] = useState<number>(initialProperty?.storage || 1);
  const [surfaceUseful, setSurfaceUseful] = useState<number>(initialProperty?.surfaceUseful || 0);
  const [surfaceTotal, setSurfaceTotal] = useState<number>(initialProperty?.surfaceTotal || 0);
  const [surfaceLand, setSurfaceLand] = useState<number>(initialProperty?.surfaceLand || 0);

  // Images
  const [images, setImages] = useState<string[]>(
    initialProperty?.images && initialProperty.images.length > 0
      ? initialProperty.images
      : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80']
  );
  const [newImageUrl, setNewImageUrl] = useState('');

  // Description & Details
  const [description, setDescription] = useState(initialProperty?.description || '');
  const [highlights, setHighlights] = useState<string[]>(
    initialProperty?.highlights && initialProperty.highlights.length > 0
      ? initialProperty.highlights
      : ['Terminaciones de alta gama con maderas nobles y mármol', 'Excelente conectividad y entorno residencial exclusivo']
  );
  const [newHighlight, setNewHighlight] = useState('');

  const [amenities, setAmenities] = useState<string[]>(initialProperty?.amenities || ['Piscina', 'Quincho Equipado', 'Seguridad 24/7']);
  const [customAmenity, setCustomAmenity] = useState('');

  // Agent
  const [agentName, setAgentName] = useState(initialProperty?.agent?.name || 'Giovanna González');
  const [agentRole, setAgentRole] = useState(initialProperty?.agent?.role || 'Directora & Broker Senior');
  const [agentPhone, setAgentPhone] = useState(initialProperty?.agent?.phone || '+56 9 2380 7285');
  const [agentEmail, setAgentEmail] = useState(initialProperty?.agent?.email || 'contacto@banapropiedades.cl');

  // UI state
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto calculate CLP when UF changes
  const handlePriceUFChange = (uf: number) => {
    setPriceUF(uf);
    setPriceCLP(Math.round(uf * 39450));
  };

  // Add / Remove Images
  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setImages([...images, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Add / Remove Highlights
  const handleAddHighlight = () => {
    if (newHighlight.trim()) {
      setHighlights([...highlights, newHighlight.trim()]);
      setNewHighlight('');
    }
  };

  const handleRemoveHighlight = (index: number) => {
    setHighlights(highlights.filter((_, i) => i !== index));
  };

  // Toggle Amenity
  const toggleAmenity = (item: string) => {
    if (amenities.includes(item)) {
      setAmenities(amenities.filter((a) => a !== item));
    } else {
      setAmenities([...amenities, item]);
    }
  };

  const handleAddCustomAmenity = () => {
    if (customAmenity.trim() && !amenities.includes(customAmenity.trim())) {
      setAmenities([...amenities, customAmenity.trim()]);
      setCustomAmenity('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Por favor indica un título para la propiedad.');
      return;
    }

    setSaving(true);
    setError(null);

    const propertyPayload: Partial<Property> = {
      code: code.trim().toUpperCase(),
      title: title.trim(),
      slug: title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      tagline: tagline.trim(),
      region,
      regionName: region === 'V_REGION' ? 'Quinta Región' : 'Región Metropolitana',
      comuna,
      sector: sector.trim(),
      addressApprox: addressApprox.trim(),
      operation,
      propertyType,
      condition,
      priceUF: Number(priceUF) || 0,
      priceCLP: Number(priceCLP) || (Number(priceUF) || 0) * 39450,
      featured,
      badge: badge.trim(),
      bedrooms: Number(bedrooms) || 0,
      bathrooms: Number(bathrooms) || 0,
      parking: Number(parking) || 0,
      storage: Number(storage) || 0,
      surfaceUseful: Number(surfaceUseful) || 0,
      surfaceTotal: Number(surfaceTotal) || 0,
      surfaceLand: Number(surfaceLand) || 0,
      gastosComunesUF: Number(gastosComunesUF) || 0,
      orientation,
      coordinates: initialProperty?.coordinates || { lat: '-33.40', lng: '-70.58' },
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
      description: description.trim(),
      highlights,
      amenities,
      agent: {
        name: agentName,
        role: agentRole,
        phone: agentPhone,
        email: agentEmail,
        avatar: initialProperty?.agent?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
      }
    };

    try {
      if (isEditing && initialProperty?.id) {
        const res = await updateProperty(initialProperty.id, propertyPayload);
        if (res.success && res.data) {
          onSaved(res.data);
        } else {
          setError(res.error || 'No se pudo actualizar la propiedad.');
        }
      } else {
        const res = await createProperty(propertyPayload);
        if (res.success && res.data) {
          onSaved(res.data);
        } else {
          setError(res.error || 'No se pudo crear la propiedad.');
        }
      }
    } catch (err: any) {
      setError('Error inesperado al conectar con el servidor.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080e1b] text-slate-100 pb-28 sm:pb-20">
      {/* Top Sticky Header */}
      <div className="sticky top-0 z-30 bg-[#080e1b]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onCancel}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Volver"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <span className="text-[10px] font-mono text-[#dfb86c] uppercase tracking-wider block">
                {isEditing ? '// EDITAR PROPIEDAD' : '// NUEVA PROPIEDAD'}
              </span>
              <h1 className="text-base sm:text-xl font-bold text-white uppercase tracking-tight truncate max-w-xs sm:max-w-md">
                {title || (isEditing ? code : 'Nueva Propiedad')}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="hidden sm:inline-flex px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving}
              className="btn-rounded btn-primary-propper py-2.5 px-5 text-xs font-bold uppercase shadow-xl cursor-pointer disabled:opacity-50"
            >
              {saving ? (
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></span>
                  <span>Guardando...</span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  <span>Guardar</span>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs sm:text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Card 1: Identificación y Clasificación */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0b1428] border border-white/10 space-y-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-white/10">
              <Building className="w-5 h-5 text-[#dfb86c]" />
              <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-wide">
                1. Información Básica y Estado
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Código */}
              <div>
                <label className="text-[11px] font-mono text-slate-300 uppercase tracking-wider block mb-1.5 font-semibold">
                  Código de Publicación *
                </label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="ej. BANA-RM-802"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 text-xs text-white uppercase font-bold focus:border-[#dfb86c] outline-none"
                />
              </div>

              {/* Operación */}
              <div>
                <label className="text-[11px] font-mono text-slate-300 uppercase tracking-wider block mb-1.5 font-semibold">
                  Operación *
                </label>
                <select
                  value={operation}
                  onChange={(e) => setOperation(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 text-xs text-white font-bold focus:border-[#dfb86c] outline-none"
                >
                  <option value="Venta">Venta</option>
                  <option value="Arriendo">Arriendo</option>
                  <option value="Inversion">Inversión</option>
                </select>
              </div>

              {/* Tipo de Propiedad */}
              <div>
                <label className="text-[11px] font-mono text-slate-300 uppercase tracking-wider block mb-1.5 font-semibold">
                  Tipo de Propiedad *
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 text-xs text-white font-bold focus:border-[#dfb86c] outline-none"
                >
                  {PROPERTY_TYPES.filter((t) => t !== 'Todos los tipos').map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Título Principal */}
              <div className="sm:col-span-2">
                <label className="text-[11px] font-mono text-slate-300 uppercase tracking-wider block mb-1.5 font-semibold">
                  Título de la Propiedad *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="ej. Penthouse Exclusivo con Rooftop Privado"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 text-xs sm:text-sm text-white font-semibold focus:border-[#dfb86c] outline-none"
                />
              </div>

              {/* Tagline */}
              <div>
                <label className="text-[11px] font-mono text-slate-300 uppercase tracking-wider block mb-1.5 font-semibold">
                  Subtítulo / Frase Corta
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="ej. Vista despejada al Parque Bicentenario"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 text-xs text-white focus:border-[#dfb86c] outline-none"
                />
              </div>

              {/* Badge & Destacada */}
              <div>
                <label className="text-[11px] font-mono text-slate-300 uppercase tracking-wider block mb-1.5 font-semibold">
                  Distintivo / Badge
                </label>
                <input
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="ej. Exclusivo, Nuevo Precio, En Verde"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 text-xs text-white focus:border-[#dfb86c] outline-none"
                />
              </div>

              {/* Estado */}
              <div>
                <label className="text-[11px] font-mono text-slate-300 uppercase tracking-wider block mb-1.5 font-semibold">
                  Estado
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 text-xs text-white focus:border-[#dfb86c] outline-none"
                >
                  <option value="Nueva">Nueva / A Estrenar</option>
                  <option value="Usada">Usada / Impecable</option>
                </select>
              </div>

              {/* Destacada Switch */}
              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  id="featured-check"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-5 h-5 accent-[#dfb86c] rounded cursor-pointer"
                />
                <label htmlFor="featured-check" className="text-xs sm:text-sm font-bold text-white cursor-pointer flex items-center gap-1.5">
                  <Star className={`w-4 h-4 ${featured ? 'fill-[#dfb86c] text-[#dfb86c]' : 'text-slate-400'}`} />
                  <span>Destacar en Portada de la Web</span>
                </label>
              </div>
            </div>
          </div>

          {/* Card 2: Precios y Valores */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0b1428] border border-white/10 space-y-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-white/10">
              <DollarSign className="w-5 h-5 text-[#dfb86c]" />
              <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-wide">
                2. Precios y Finanzas
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="text-[11px] font-mono text-slate-300 uppercase tracking-wider block mb-1.5 font-semibold">
                  Precio en UF *
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  required
                  value={priceUF || ''}
                  onChange={(e) => handlePriceUFChange(parseFloat(e.target.value) || 0)}
                  placeholder="ej. 14500"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 text-sm text-[#fae6be] font-bold focus:border-[#dfb86c] outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-300 uppercase tracking-wider block mb-1.5 font-semibold">
                  Precio Referencial en CLP
                </label>
                <input
                  type="number"
                  min="0"
                  value={priceCLP || ''}
                  onChange={(e) => setPriceCLP(parseInt(e.target.value) || 0)}
                  placeholder="ej. 570000000"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 text-sm text-slate-200 focus:border-[#dfb86c] outline-none"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Aprox. ${priceCLP ? priceCLP.toLocaleString('es-CL') : 0} CLP
                </span>
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-300 uppercase tracking-wider block mb-1.5 font-semibold">
                  Gastos Comunes (UF / Mes)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={gastosComunesUF || ''}
                  onChange={(e) => setGastosComunesUF(parseFloat(e.target.value) || 0)}
                  placeholder="ej. 8.5"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 text-sm text-white focus:border-[#dfb86c] outline-none"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Ubicación */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0b1428] border border-white/10 space-y-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-white/10">
              <MapPin className="w-5 h-5 text-[#dfb86c]" />
              <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-wide">
                3. Ubicación y Entorno
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div>
                <label className="text-[11px] font-mono text-slate-300 uppercase tracking-wider block mb-1.5 font-semibold">
                  Región *
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 text-xs text-white font-bold focus:border-[#dfb86c] outline-none"
                >
                  <option value="RM">Región Metropolitana</option>
                  <option value="V_REGION">Quinta Región (Costa)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-300 uppercase tracking-wider block mb-1.5 font-semibold">
                  Comuna *
                </label>
                <select
                  value={comuna}
                  onChange={(e) => setComuna(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 text-xs text-white font-bold focus:border-[#dfb86c] outline-none"
                >
                  {COMUNAS.filter((c) => c !== 'Todas las comunas').map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-300 uppercase tracking-wider block mb-1.5 font-semibold">
                  Sector o Barrio
                </label>
                <input
                  type="text"
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  placeholder="ej. San Damián, Lo Curro, Reñaca"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 text-xs text-white focus:border-[#dfb86c] outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-300 uppercase tracking-wider block mb-1.5 font-semibold">
                  Dirección Aproximada
                </label>
                <input
                  type="text"
                  value={addressApprox}
                  onChange={(e) => setAddressApprox(e.target.value)}
                  placeholder="ej. Av. El Golf 40, Las Condes"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 text-xs text-white focus:border-[#dfb86c] outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-300 uppercase tracking-wider block mb-1.5 font-semibold">
                  Orientación
                </label>
                <input
                  type="text"
                  value={orientation}
                  onChange={(e) => setOrientation(e.target.value)}
                  placeholder="ej. Nor-Oriente, Poniente"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 text-xs text-white focus:border-[#dfb86c] outline-none"
                />
              </div>
            </div>
          </div>

          {/* Card 4: Superficies y Ambientes */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0b1428] border border-white/10 space-y-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-white/10">
              <Home className="w-5 h-5 text-[#dfb86c]" />
              <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-wide">
                4. Superficies y Ambientes
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
              <div>
                <label className="text-[10px] font-mono text-slate-300 uppercase block mb-1 font-semibold">
                  Dormitorios
                </label>
                <input
                  type="number"
                  min="0"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-white/15 text-xs text-white font-bold text-center outline-none focus:border-[#dfb86c]"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-300 uppercase block mb-1 font-semibold">
                  Baños
                </label>
                <input
                  type="number"
                  min="0"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-white/15 text-xs text-white font-bold text-center outline-none focus:border-[#dfb86c]"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-300 uppercase block mb-1 font-semibold">
                  Estacionam.
                </label>
                <input
                  type="number"
                  min="0"
                  value={parking}
                  onChange={(e) => setParking(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-white/15 text-xs text-white font-bold text-center outline-none focus:border-[#dfb86c]"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-300 uppercase block mb-1 font-semibold">
                  Bodegas
                </label>
                <input
                  type="number"
                  min="0"
                  value={storage}
                  onChange={(e) => setStorage(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-white/15 text-xs text-white font-bold text-center outline-none focus:border-[#dfb86c]"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-300 uppercase block mb-1 font-semibold">
                  Útil (m²)
                </label>
                <input
                  type="number"
                  min="0"
                  value={surfaceUseful || ''}
                  onChange={(e) => setSurfaceUseful(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-white/15 text-xs text-white font-bold text-center outline-none focus:border-[#dfb86c]"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-300 uppercase block mb-1 font-semibold">
                  Total (m²)
                </label>
                <input
                  type="number"
                  min="0"
                  value={surfaceTotal || ''}
                  onChange={(e) => setSurfaceTotal(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-white/15 text-xs text-white font-bold text-center outline-none focus:border-[#dfb86c]"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-300 uppercase block mb-1 font-semibold">
                  Terreno (m²)
                </label>
                <input
                  type="number"
                  min="0"
                  value={surfaceLand || ''}
                  onChange={(e) => setSurfaceLand(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-white/15 text-xs text-white font-bold text-center outline-none focus:border-[#dfb86c]"
                />
              </div>
            </div>
          </div>

          {/* Card 5: Galería de Fotos */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0b1428] border border-white/10 space-y-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-white/10">
              <ImageIcon className="w-5 h-5 text-[#dfb86c]" />
              <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-wide">
                5. Galería de Imágenes (URLs de Alta Resolución)
              </h2>
            </div>

            {/* Input to add URL */}
            <div className="flex gap-2">
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Pega la URL de una fotografía (ej. https://images.unsplash.com/...)"
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 text-xs text-white focus:border-[#dfb86c] outline-none"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="px-4 py-2.5 rounded-xl bg-[#dfb86c] hover:bg-[#e8c882] text-slate-950 font-bold text-xs uppercase flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar</span>
              </button>
            </div>

            {/* Image Preview Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-2">
              {images.map((img, idx) => (
                <div key={idx} className="relative group rounded-2xl overflow-hidden aspect-[4/3] border border-white/15 bg-slate-900">
                  <img src={img} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
                  {idx === 0 && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#dfb86c] text-slate-950 font-mono text-[9px] font-bold">
                      PORTADA
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600/90 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    title="Eliminar foto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Card 6: Descripción y Amenidades */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0b1428] border border-white/10 space-y-6">
            <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-wide pb-4 border-b border-white/10">
              6. Descripción, Puntos Clave y Amenidades
            </h2>

            {/* Descripción */}
            <div>
              <label className="text-[11px] font-mono text-slate-300 uppercase tracking-wider block mb-1.5 font-semibold">
                Descripción Completa de la Propiedad
              </label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detalla las características principales, remodelaciones, estilo arquitectónico y entorno..."
                className="w-full px-3.5 py-3 rounded-xl bg-slate-900/90 border border-white/15 text-xs text-white leading-relaxed focus:border-[#dfb86c] outline-none"
              ></textarea>
            </div>

            {/* Highlights */}
            <div className="space-y-3">
              <label className="text-[11px] font-mono text-slate-300 uppercase tracking-wider block font-semibold">
                Puntos Destacados (Highlights)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newHighlight}
                  onChange={(e) => setNewHighlight(e.target.value)}
                  placeholder="ej. Vista despejada al valle, Calefacción por losa radiante"
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 text-xs text-white focus:border-[#dfb86c] outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddHighlight}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
                >
                  + Agregar
                </button>
              </div>

              <div className="space-y-1.5">
                {highlights.map((h, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 text-xs text-slate-200">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#dfb86c]"></span>
                      {h}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveHighlight(idx)}
                      className="text-slate-400 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenidades */}
            <div className="space-y-3 pt-2">
              <label className="text-[11px] font-mono text-slate-300 uppercase tracking-wider block font-semibold">
                Amenidades y Equipamiento
              </label>

              <div className="flex flex-wrap gap-2">
                {COMMON_AMENITIES.map((am) => {
                  const isSelected = amenities.includes(am);
                  return (
                    <button
                      key={am}
                      type="button"
                      onClick={() => toggleAmenity(am)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-[#dfb86c] text-slate-950 font-bold'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                      <span>{am}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-2 max-w-sm pt-2">
                <input
                  type="text"
                  value={customAmenity}
                  onChange={(e) => setCustomAmenity(e.target.value)}
                  placeholder="Otra amenidad personalizada..."
                  className="flex-1 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-white/15 text-xs text-white outline-none focus:border-[#dfb86c]"
                />
                <button
                  type="button"
                  onClick={handleAddCustomAmenity}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Save Action Button */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 rounded-full text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="btn-rounded btn-primary-propper py-3.5 px-8 text-xs font-bold uppercase shadow-2xl cursor-pointer disabled:opacity-50"
            >
              {saving ? 'Guardando en Base de Datos...' : isEditing ? 'Guardar Cambios' : 'Crear Propiedad'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
