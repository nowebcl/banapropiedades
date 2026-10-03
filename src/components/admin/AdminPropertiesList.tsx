import React, { useState } from 'react';
import { Plus, Search, Edit3, Trash2, Star, Eye, ExternalLink, Filter, MapPin, Building, CheckCircle2 } from 'lucide-react';
import { Property } from '../../data/properties';
import { deleteProperty, updateProperty } from '../../services/pocketbase';

interface AdminPropertiesListProps {
  properties: Property[];
  onAddNew: () => void;
  onEdit: (property: Property) => void;
  onRefresh: () => void;
}

export const AdminPropertiesList: React.FC<AdminPropertiesListProps> = ({
  properties,
  onAddNew,
  onEdit,
  onRefresh,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [operationFilter, setOperationFilter] = useState('ALL');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Metrics
  const totalCount = properties.length;
  const ventaCount = properties.filter((p) => p.operation === 'Venta').length;
  const arriendoCount = properties.filter((p) => p.operation === 'Arriendo').length;
  const featuredCount = properties.filter((p) => p.featured).length;

  // Filtered properties
  const filtered = properties.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.comuna.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.propertyType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesOp = operationFilter === 'ALL' || p.operation === operationFilter;
    return matchesSearch && matchesOp;
  });

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const res = await deleteProperty(id);
    setDeletingId(null);
    setConfirmDeleteId(null);
    if (res.success) {
      onRefresh();
    } else {
      alert(res.error || 'No se pudo eliminar la propiedad');
    }
  };

  const handleToggleFeatured = async (property: Property) => {
    await updateProperty(property.id, { featured: !property.featured });
    onRefresh();
  };

  return (
    <div className="space-y-8">
      {/* Top Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono text-[#dfb86c] uppercase tracking-widest block mb-1">
            // GESTIÓN DE CATÁLOGO
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
            Propiedades ({totalCount})
          </h1>
        </div>

        <button
          onClick={onAddNew}
          className="btn-rounded btn-primary-propper py-3 px-6 text-xs font-bold uppercase shadow-xl shadow-[#dfb86c]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Propiedad</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0b1428] border border-white/10 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400">Total en Base de Datos</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">{totalCount}</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#0b1428] border border-white/10 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400">En Venta</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#dfb86c]">{ventaCount}</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#0b1428] border border-white/10 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400">En Arriendo</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-200">{arriendoCount}</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#0b1428] border border-white/10 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400">Destacadas en Portada</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#fae6be]">{featuredCount}</div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#0b1428] border border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por código, título, comuna o tipo..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 text-xs text-white placeholder-slate-500 focus:border-[#dfb86c] outline-none"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'Venta', 'Arriendo', 'Inversion'].map((op) => (
            <button
              key={op}
              onClick={() => setOperationFilter(op)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
                operationFilter === op
                  ? 'bg-[#dfb86c] text-slate-950 font-bold'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              {op === 'ALL' ? 'Todas' : op}
            </button>
          ))}
        </div>
      </div>

      {/* Properties List (Cards / Rows) */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 rounded-3xl bg-[#0b1428] border border-white/10 space-y-3">
            <Building className="w-8 h-8 text-slate-500 mx-auto" />
            <p className="text-sm text-slate-300 font-semibold">No se encontraron propiedades.</p>
            <p className="text-xs text-slate-500">Prueba ajustando los términos de búsqueda o añade una nueva.</p>
          </div>
        ) : (
          filtered.map((property) => (
            <div
              key={property.id}
              className="p-4 sm:p-5 rounded-2xl bg-[#0b1428] border border-white/10 hover:border-[#dfb86c]/40 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              {/* Left: Thumbnail & Info */}
              <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                <img
                  src={property.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80'}
                  alt={property.title}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border border-white/10"
                />

                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white font-bold">
                      {property.code}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        property.operation === 'Venta'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                          : 'bg-blue-950 text-blue-300 border border-blue-500/30'
                      }`}
                    >
                      {property.operation}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {property.propertyType}
                    </span>
                    {property.featured && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#dfb86c]/20 text-[#dfb86c] border border-[#dfb86c]/40 flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 fill-[#dfb86c]" />
                        PORTADA
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-lg">
                    {property.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#dfb86c]" />
                      {property.comuna} {property.sector ? `• ${property.sector}` : ''}
                    </span>
                    <span>•</span>
                    <span>{property.bedrooms}D / {property.bathrooms}B</span>
                    <span>•</span>
                    <span>{property.surfaceTotal || property.surfaceUseful} m²</span>
                  </div>
                </div>
              </div>

              {/* Middle: Price */}
              <div className="text-left md:text-right shrink-0 px-2 sm:px-4">
                <div className="text-base sm:text-lg font-bold text-[#dfb86c]">
                  {property.priceUF.toLocaleString('es-CL')} UF
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  ${property.priceCLP?.toLocaleString('es-CL')} CLP
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                {/* Featured toggle */}
                <button
                  type="button"
                  onClick={() => handleToggleFeatured(property)}
                  title={property.featured ? 'Quitar de portada' : 'Destacar en portada'}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                    property.featured
                      ? 'border-[#dfb86c] bg-[#dfb86c]/20 text-[#dfb86c]'
                      : 'border-white/10 hover:border-white/30 text-slate-400'
                  }`}
                >
                  <Star className={`w-4 h-4 ${property.featured ? 'fill-[#dfb86c]' : ''}`} />
                </button>

                {/* Edit Button (Opens full-page form) */}
                <button
                  type="button"
                  onClick={() => onEdit(property)}
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-[#dfb86c] text-white hover:text-slate-950 font-bold text-xs uppercase flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Editar</span>
                </button>

                {/* Delete Button */}
                {confirmDeleteId === property.id ? (
                  <div className="flex items-center gap-1.5 bg-red-950/80 p-1 rounded-xl border border-red-500/50">
                    <button
                      type="button"
                      disabled={deletingId === property.id}
                      onClick={() => handleDelete(property.id)}
                      className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold uppercase transition-colors cursor-pointer"
                    >
                      {deletingId === property.id ? '...' : '¿Confirmar?'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteId(null)}
                      className="px-2 py-1 text-slate-300 hover:text-white text-[10px]"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmDeleteId(property.id)}
                    title="Eliminar propiedad"
                    className="p-2 rounded-xl border border-white/10 hover:border-red-500 hover:bg-red-500/20 text-slate-400 hover:text-red-300 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
